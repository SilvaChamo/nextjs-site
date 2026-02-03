"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rocket, LayoutTemplate, Image as ImageIcon, Type, Save } from "lucide-react";
import Link from "next/link";

export default function NewsletterBuilderPage() {
    return (
        <div className="w-full max-w-full min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/mensagens" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            Criador de Newsletter
                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] rounded-full uppercase font-bold tracking-wider">Beta</span>
                        </h1>
                        <p className="text-xs text-slate-500">Crie emails visualmente ricos com arrastar e soltar (Em Breve).</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="gap-2 text-xs font-bold uppercase">
                        <Save className="w-4 h-4" /> Salvar Rascunho
                    </Button>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 text-xs font-bold uppercase">
                        <Rocket className="w-4 h-4" /> Enviar Campanha
                    </Button>
                </div>
            </div>

            {/* Builder Workspace (Placeholder) */}
            <div className="flex p-6 gap-6 h-[calc(100vh-80px)]">

                {/* Sidebar Tools */}
                <div className="w-72 bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex flex-col gap-4">
                    <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Blocos</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <ToolBlock icon={<LayoutTemplate className="w-5 h-5" />} label="Layout" />
                        <ToolBlock icon={<Type className="w-5 h-5" />} label="Texto" />
                        <ToolBlock icon={<ImageIcon className="w-5 h-5" />} label="Imagem" />
                        <ToolBlock icon={<div className="w-5 h-5 border-2 border-current rounded-md flex items-center justify-center text-[10px] font-bold">BTN</div>} label="Botão" />
                    </div>

                    <div className="mt-auto p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <h4 className="font-bold text-indigo-900 text-sm mb-1">Coming Soon</h4>
                        <p className="text-xs text-indigo-700 leading-relaxed">
                            O editor "Drag & Drop" tipo Mailchimp está em desenvolvimento. Por enquanto, utilize o editor padrão ou HTML direto.
                        </p>
                    </div>
                </div>

                {/* Canvas */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex items-center justify-center bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                    <div className="w-[600px] min-h-[800px] bg-white shadow-2xl rounded-lg p-8 border border-slate-100 flex flex-col gap-4 items-center justify-center text-center">
                        <img src="/placeholder-email-builder.png" alt="" className="w-32 h-32 opacity-20 mb-4" />
                        <h2 className="text-2xl font-bold text-slate-300">Área de Construção</h2>
                        <p className="text-slate-400 max-w-xs">Arraste blocos para aqui para começar a construir seu email.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

function ToolBlock({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group cursor-grab active:cursor-grabbing">
            <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                {icon}
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-900">{label}</span>
        </button>
    )
}
