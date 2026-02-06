"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bold, Italic, List, ListOrdered, Indent, Outdent, Image as ImageIcon, Loader2, Trash2, ZoomIn, ZoomOut, AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null);
    const supabase = createClient();

    // Initial value sync (only once to avoid cursor jumping)
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            if (value === "" && editorRef.current.innerHTML === "<br>") return;
            if (editorRef.current.innerHTML === "") {
                editorRef.current.innerHTML = value;
            }
        }
    }, []);

    // Clear selected image when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectedImage && !selectedImage.contains(e.target as Node)) {
                setSelectedImage(null);
                // Remove selection styling
                document.querySelectorAll('.rich-text-image-selected').forEach(img => {
                    img.classList.remove('rich-text-image-selected');
                });
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [selectedImage]);

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    // Compress image if > 1MB
    const compressImage = async (file: File, maxSizeMB: number = 1): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new window.Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let { width, height } = img;

                    // Calculate compression quality based on file size
                    const fileSizeMB = file.size / (1024 * 1024);
                    let quality = 0.8;

                    if (fileSizeMB > maxSizeMB) {
                        // Resize if too large
                        const scale = Math.sqrt(maxSizeMB / fileSizeMB);
                        width = Math.round(width * scale);
                        height = Math.round(height * scale);
                        quality = 0.7;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                reject(new Error('Failed to compress image'));
                            }
                        },
                        'image/jpeg',
                        quality
                    );
                };
                img.onerror = reject;
                img.src = e.target?.result as string;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Handle image upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Por favor seleccione um ficheiro de imagem');
            return;
        }

        setIsUploading(true);

        try {
            let fileToUpload: Blob = file;
            const fileSizeMB = file.size / (1024 * 1024);

            // Compress if > 1MB
            if (fileSizeMB > 1) {
                toast.info(`Comprimindo imagem (${fileSizeMB.toFixed(1)}MB)...`);
                fileToUpload = await compressImage(file, 1);
                toast.success(`Imagem comprimida para ${(fileToUpload.size / (1024 * 1024)).toFixed(1)}MB`);
            }

            // Generate unique filename
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(7);
            const ext = 'jpg';
            const fileName = `content-images/${timestamp}-${randomStr}.${ext}`;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('public-assets')
                .upload(fileName, fileToUpload, {
                    cacheControl: '3600',
                    contentType: 'image/jpeg'
                });

            if (error) throw error;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('public-assets')
                .getPublicUrl(fileName);

            const imageUrl = urlData.publicUrl;

            // Create image element and insert it
            if (editorRef.current) {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Imagem';
                img.style.cssText = 'max-width: 100%; height: auto; cursor: pointer; border-radius: 8px; margin: 8px 0; display: block;';
                img.className = 'content-image';
                img.setAttribute('data-resizable', 'true');

                // Insert at cursor or append to end
                const selection = window.getSelection();
                if (selection && selection.rangeCount > 0 && editorRef.current.contains(selection.anchorNode)) {
                    const range = selection.getRangeAt(0);
                    range.insertNode(img);
                    range.setStartAfter(img);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else {
                    editorRef.current.appendChild(img);
                }

                // Add line break after image
                const br = document.createElement('br');
                img.after(br);

                handleInput();
                toast.success('Imagem inserida com sucesso!');
            }

        } catch (error: any) {
            console.error('Upload error:', error);
            toast.error('Erro ao fazer upload: ' + error.message);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    // Handle image click for selection/resize
    const handleEditorClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        if (target.tagName === 'IMG') {
            e.preventDefault();
            const img = target as HTMLImageElement;

            // Remove previous selection
            document.querySelectorAll('.rich-text-image-selected').forEach(el => {
                el.classList.remove('rich-text-image-selected');
            });

            // Add selection to clicked image
            img.classList.add('rich-text-image-selected');
            setSelectedImage(img);
        }
    };

    // Resize selected image
    const resizeImage = (factor: number) => {
        if (!selectedImage) return;

        const currentWidth = selectedImage.offsetWidth;
        const newWidth = Math.max(100, Math.min(800, currentWidth * factor));

        selectedImage.style.width = `${newWidth}px`;
        selectedImage.style.height = 'auto';
        handleInput();
    };

    // Delete selected image
    const deleteImage = () => {
        if (!selectedImage) return;
        selectedImage.remove();
        setSelectedImage(null);
        handleInput();
        toast.success('Imagem removida');
    };

    // Center selected image
    const centerImage = () => {
        if (!selectedImage) return;
        selectedImage.style.display = 'block';
        selectedImage.style.marginLeft = 'auto';
        selectedImage.style.marginRight = 'auto';
        handleInput();
    };

    // Align left selected image
    const alignLeft = () => {
        if (!selectedImage) return;
        selectedImage.style.display = 'block';
        selectedImage.style.marginLeft = '0';
        selectedImage.style.marginRight = 'auto';
        handleInput();
    };

    // Align right selected image
    const alignRight = () => {
        if (!selectedImage) return;
        selectedImage.style.display = 'block';
        selectedImage.style.marginLeft = 'auto';
        selectedImage.style.marginRight = '0';
        handleInput();
    };

    return (
        <div className={cn("flex flex-col bg-white overflow-hidden transition-all relative", className)}>
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50 flex-wrap">
                <ToolbarButton onClick={() => execCommand("bold")} icon={<span className="font-black text-lg leading-none font-serif">B</span>} title="Bold" />
                <ToolbarButton onClick={() => execCommand("italic")} icon={<Italic className="w-4 h-4" />} title="Italic" />

                <div className="w-px h-4 bg-slate-300 mx-1" />

                {/* Text Alignment */}
                <ToolbarButton onClick={() => execCommand("justifyLeft")} icon={<AlignLeft className="w-4 h-4" />} title="Alinhar à Esquerda" />
                <ToolbarButton onClick={() => execCommand("justifyCenter")} icon={<AlignCenter className="w-4 h-4" />} title="Centralizar Texto" />
                <ToolbarButton onClick={() => execCommand("justifyRight")} icon={<AlignRight className="w-4 h-4" />} title="Alinhar à Direita" />

                <div className="w-px h-4 bg-slate-300 mx-1" />

                {/* Heading Selector */}
                <select
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val) {
                            execCommand("formatBlock", val);
                            e.target.value = ""; // Reset
                        }
                    }}
                    className="h-7 text-xs border border-slate-200 rounded bg-white text-slate-600 px-1 outline-none hover:border-emerald-500 transition-colors"
                >
                    <option value="">Cabeçalho</option>
                    <option value="H1">Título 1 (H1)</option>
                    <option value="H2">Título 2 (H2)</option>
                    <option value="H3">Título 3 (H3)</option>
                    <option value="H4">Título 4 (H4)</option>
                    <option value="H5">Título 5 (H5)</option>
                    <option value="H6">Título 6 (H6)</option>
                    <option value="P">Parágrafo</option>
                </select>

                <div className="w-px h-4 bg-slate-300 mx-1" />

                <ToolbarButton onClick={() => execCommand("insertUnorderedList")} icon={<List className="w-4 h-4" />} title="Bullet List" />
                <ToolbarButton onClick={() => execCommand("insertOrderedList")} icon={<ListOrdered className="w-4 h-4" />} title="Numbered List" />

                <div className="w-px h-4 bg-slate-300 mx-1" />

                <ToolbarButton onClick={() => execCommand("outdent")} icon={<Outdent className="w-4 h-4" />} title="Diminuir Recuo (Tab)" />
                <ToolbarButton onClick={() => execCommand("indent")} icon={<Indent className="w-4 h-4" />} title="Aumentar Recuo (Tab)" />

                <div className="w-px h-4 bg-slate-300 mx-1" />

                {/* Image Upload Button */}
                <ToolbarButton
                    onClick={() => fileInputRef.current?.click()}
                    icon={isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                    title="Inserir Imagem"
                    disabled={isUploading}
                />
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />

                {/* Image Resize Controls (show when image selected) */}
                {selectedImage && (
                    <>
                        <div className="w-px h-4 bg-slate-300 mx-1" />
                        <div className="flex items-center gap-1 bg-emerald-50 rounded-md px-2 py-1">
                            <ToolbarButton
                                onClick={() => resizeImage(0.8)}
                                icon={<ZoomOut className="w-4 h-4" />}
                                title="Reduzir"
                            />
                            <ToolbarButton
                                onClick={() => resizeImage(1.25)}
                                icon={<ZoomIn className="w-4 h-4" />}
                                title="Aumentar"
                            />
                            <div className="w-px h-3 bg-emerald-200 mx-1" />
                            <ToolbarButton
                                onClick={alignLeft}
                                icon={
                                    <div className="flex items-center gap-1 px-1">
                                        <AlignLeft className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase">Esquerda</span>
                                    </div>
                                }
                                title="Alinhar à Esquerda"
                            />
                            <ToolbarButton
                                onClick={centerImage}
                                icon={
                                    <div className="flex items-center gap-1 px-1">
                                        <AlignCenter className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase">Centralizar</span>
                                    </div>
                                }
                                title="Centralizar"
                            />
                            <ToolbarButton
                                onClick={alignRight}
                                icon={
                                    <div className="flex items-center gap-1 px-1">
                                        <AlignRight className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase">Direita</span>
                                    </div>
                                }
                                title="Alinhar à Direita"
                            />
                            <div className="w-px h-3 bg-emerald-200 mx-1" />
                            <ToolbarButton
                                onClick={deleteImage}
                                icon={
                                    <div className="flex items-center gap-1 px-1">
                                        <Trash2 className="w-4 h-4 text-rose-500" />
                                        <span className="text-[9px] font-black uppercase text-rose-500">Desactivar</span>
                                    </div>
                                }
                                title="Desactivar"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                className="flex-1 p-4 min-h-[150px] outline-none text-slate-600 text-sm overflow-y-visible prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 [&_b]:font-black [&_strong]:font-black prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 marker:text-emerald-600 [&_.rich-text-image-selected]:ring-2 [&_.rich-text-image-selected]:ring-emerald-500 [&_.rich-text-image-selected]:ring-offset-2"
                onInput={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onClick={handleEditorClick}
                data-placeholder={placeholder}
                style={{ fontWeight: 400 }} // Base weight
            />
            {/* Placeholder Overlay */}
            {!value && (
                <div className="absolute top-[50px] left-4 text-slate-400 text-sm pointer-events-none select-none">
                    {placeholder}
                </div>
            )}

            {/* Upload Progress Overlay */}
            {isUploading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20">
                    <div className="flex items-center gap-3 bg-emerald-50 px-6 py-3 rounded-lg border border-emerald-200 shadow-lg">
                        <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                        <span className="text-sm font-bold text-emerald-700">A carregar imagem...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function ToolbarButton({ onClick, icon, title, disabled }: { onClick: () => void; icon: React.ReactNode; title: string; disabled?: boolean }) {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                if (!disabled) onClick();
            }}
            disabled={disabled}
            className={cn(
                "p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors",
                disabled && "opacity-50 cursor-not-allowed"
            )}
            title={title}
        >
            {icon}
        </button>
    );
}
