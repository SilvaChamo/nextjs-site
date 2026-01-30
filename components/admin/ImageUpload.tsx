"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label: string;
    description?: string;
    recommendedSize?: string;
    maxSizeMB?: number;
    bucket?: string;
    folder?: string;
    aspectRatio?: "square" | "video" | "any";
    imageClassName?: string;
    showRecommendedBadge?: boolean;
    maxWidth?: number;
    maxHeight?: number;
    className?: string; // Container class override
    useBackgroundImage?: boolean; // If true, use background-image instead of img element
    backgroundSize?: "cover" | "contain"; // Background size mode when useBackgroundImage is true
}

export function ImageUpload({
    value,
    onChange,
    label,
    description,
    recommendedSize,
    maxSizeMB = 1,
    bucket = "public-assets",
    folder = "admin",
    aspectRatio = "any",
    imageClassName,
    showRecommendedBadge = true,
    maxWidth,
    maxHeight,
    className,
    useBackgroundImage = false,
    backgroundSize = "cover"
}: ImageUploadProps) {
    const supabase = createClient();
    const [uploading, setUploading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showResizeModal, setShowResizeModal] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUserId(session.user.id);
            }
        };
        getSession();
    }, []);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [resizeDetails, setResizeDetails] = useState<{ width: number, height: number } | null>(null);
    const [resolveResize, setResolveResize] = useState<((value: boolean) => void) | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const checkAndResize = (file: File): Promise<boolean> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const width = img.width;
                    const height = img.height;
                    const needsResizing = (maxWidth && width > maxWidth) || (maxHeight && height > maxHeight);

                    if (needsResizing) {
                        setResizeDetails({ width, height });
                        setPendingFile(file);
                        setShowResizeModal(true);
                        setResolveResize(() => resolve);
                    } else {
                        resolve(false);
                    }
                };
            };
        });
    };

    const convertToWebP = (file: File, forceResize: boolean): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let targetWidth = img.width;
                    let targetHeight = img.height;

                    if (forceResize && maxWidth && maxHeight) {
                        targetWidth = maxWidth;
                        targetHeight = maxHeight;
                    } else if (forceResize) {
                        if (maxWidth && targetWidth > maxWidth) {
                            targetHeight *= maxWidth / targetWidth;
                            targetWidth = maxWidth;
                        }
                        if (maxHeight && targetHeight > maxHeight) {
                            targetWidth *= maxHeight / targetHeight;
                            targetHeight = maxHeight;
                        }
                    }

                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return reject(new Error("Não foi possível criar o contexto do canvas"));

                    if (forceResize && maxWidth && maxHeight) {
                        // Center crop logic
                        const imgSize = img.width / img.height;
                        const targetSize = targetWidth / targetHeight;
                        let sWidth, sHeight, sx, sy;

                        if (imgSize > targetSize) {
                            sHeight = img.height;
                            sWidth = img.height * targetSize;
                            sx = (img.width - sWidth) / 2;
                            sy = 0;
                        } else {
                            sWidth = img.width;
                            sHeight = img.width / targetSize;
                            sx = 0;
                            sy = (img.height - sHeight) / 2;
                        }
                        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
                    } else {
                        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                    }

                    canvas.toBlob(
                        (blob) => {
                            if (blob) resolve(blob);
                            else reject(new Error("Erro na conversão WebP"));
                        },
                        "image/webp",
                        0.85 // Quality
                    );
                };
                img.onerror = () => reject(new Error("Erro ao carregar imagem"));
            };
            reader.onerror = () => reject(new Error("Erro ao ler ficheiro"));
        });
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setError(null);

        // 10MB limit for raw file (we will compress it)
        if (file.size > 10 * 1024 * 1024) {
            setError(`O ficheiro excede o limite de 10MB.`);
            return;
        }

        const shouldResize = await checkAndResize(file);
        if (shouldResize === undefined) return; // Modal will handle it

        await startUpload(file, shouldResize);
    };

    const startUpload = async (file: File, shouldResize: boolean) => {
        setUploading(true);
        try {
            const webpBlob = await convertToWebP(file, shouldResize);

            // Re-check size after compression
            if (webpBlob.size > maxSizeMB * 1024 * 1024) {
                setError(`A imagem comprimida ainda excede o limite de ${maxSizeMB}MB.`);
                setUploading(false);
                return;
            }

            const userPrefix = userId ? `${userId}-` : "";
            const fileName = `${folder}/${userPrefix}${Date.now()}.webp`;

            const { data, error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(fileName, webpBlob, {
                    contentType: 'image/webp',
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(data.path);

            onChange(publicUrl);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError("Erro ao carregar imagem: " + (err.message || "Tente novamente."));
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleResizeConfirm = (confirm: boolean) => {
        setShowResizeModal(false);
        if (resolveResize && pendingFile) {
            startUpload(pendingFile, confirm);
            setPendingFile(null);
            setResizeDetails(null);
        }
    };

    const removeImage = () => {
        onChange("");
        setError(null);
    };

    return (
        <div className={cn("flex flex-col gap-2", useBackgroundImage && "h-full")}>
            {!useBackgroundImage && (
                <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">{label}</label>
                    {showRecommendedBadge && recommendedSize && (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            recomendado: {recommendedSize}
                        </span>
                    )}
                </div>
            )}

            <div
                className={cn(
                    "relative rounded-xl border border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all cursor-pointer group flex items-center justify-center overflow-hidden w-full",
                    !className?.includes('aspect-') && (aspectRatio === "square" ? "aspect-square max-h-[220px] max-w-[220px] mx-auto p-[10px]" : "aspect-[3/1] max-h-[220px]"),
                    error ? "border-red-200 bg-red-50/10" : "",
                    useBackgroundImage && "h-full flex-1",
                    className
                )}
                onClick={() => !uploading && fileInputRef.current?.click()}
            >
                {showRecommendedBadge && recommendedSize && (
                    <div className="absolute top-3 right-3 z-10">
                        <div className="bg-emerald-50/90 backdrop-blur-sm border border-emerald-100 px-2.5 py-1 rounded-full shadow-sm">
                            <span className="text-[10px] font-black text-emerald-600 tracking-tight">
                                recomendado: <span className="font-bold">{recommendedSize}</span>
                            </span>
                        </div>
                    </div>
                )}
                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-tight">Processando...</span>
                    </div>
                ) : value ? (
                    useBackgroundImage ? (
                        <div
                            className="relative w-full h-full flex items-center justify-center overflow-hidden group"
                            style={{
                                backgroundImage: `url(${value})`,
                                backgroundSize: backgroundSize,
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage();
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                            <img
                                src={value}
                                alt={label}
                                className={cn(
                                    "w-full h-full transition-transform group-hover:scale-105 object-cover rounded-lg",
                                    imageClassName
                                )}
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage();
                                }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col items-center gap-2 p-6 text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-600">Clique para carregar</p>
                            {recommendedSize && (
                                <p className="text-[10px] text-emerald-600 font-bold tracking-tight">recomendado: {recommendedSize}</p>
                            )}
                        </div>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                />
            </div>

            {
                error && (
                    <div className="flex items-center gap-1.5 text-red-500 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase">{error}</span>
                    </div>
                )
            }

            <Dialog open={showResizeModal} onOpenChange={(open) => !open && handleResizeConfirm(false)}>
                <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
                    <div className="p-8 space-y-6">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight">
                                Imagem muito grande
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 text-sm font-medium leading-relaxed pt-2">
                                A imagem selecionada excede o limite de {maxSizeMB}MB ou as dimensões recomendadas. Deseja que optimizemos o tamanho automaticamente?
                            </DialogDescription>
                        </DialogHeader>

                        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                            <p className="text-xs font-bold text-orange-700 leading-relaxed">
                                Nota: A qualidade visual será mantida, mas o tamanho do ficheiro será reduzido para cumprir os requisitos.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <Button
                                variant="outline"
                                onClick={() => handleResizeConfirm(false)}
                                className="flex-1 h-12 rounded-xl text-sm font-black text-slate-600 uppercase tracking-widest border-slate-200 hover:bg-slate-50"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => handleResizeConfirm(true)}
                                className="flex-1 h-12 rounded-xl text-sm font-black text-white uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                            >
                                Sim
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
}
