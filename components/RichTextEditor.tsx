"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bold, Italic, List, ListOrdered, Indent, Outdent } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    // Initial value sync (only once to avoid cursor jumping)
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            if (value === "" && editorRef.current.innerHTML === "<br>") return;
            if (editorRef.current.innerHTML === "") {
                editorRef.current.innerHTML = value;
            }
        }
    }, []);

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

    return (
        <div className={cn("flex flex-col bg-white overflow-hidden transition-all", className)}>
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-slate-100 bg-slate-50 flex-wrap">
                <ToolbarButton onClick={() => execCommand("bold")} icon={<span className="font-black text-lg leading-none font-serif">B</span>} title="Bold" />
                <ToolbarButton onClick={() => execCommand("italic")} icon={<Italic className="w-4 h-4" />} title="Italic" />

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
            </div>

            {/* Editor Area */}
            <div
                ref={editorRef}
                contentEditable
                className="flex-1 p-4 min-h-[150px] outline-none text-slate-600 text-sm overflow-y-visible prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 [&_b]:font-black [&_strong]:font-black prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5 marker:text-emerald-600"
                onInput={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                data-placeholder={placeholder}
                style={{ fontWeight: 400 }} // Base weight
            />
            {/* Placeholder Overlay */}
            {!value && (
                <div className="absolute top-[50px] left-4 text-slate-400 text-sm pointer-events-none select-none">
                    {placeholder}
                </div>
            )}
        </div>
    );
}

function ToolbarButton({ onClick, icon, title }: { onClick: () => void; icon: React.ReactNode; title: string }) {
    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-md transition-colors"
            title={title}
        >
            {icon}
        </button>
    );
}
