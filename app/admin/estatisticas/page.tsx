"use client";

import { PageHeader } from "@/components/PageHeader";
import { StatsEntryForm } from "@/components/stats/StatsEntryForm";
import { Settings, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminStatsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Estatísticas Agrícolas</h1>
                    <p className="text-slate-500 font-medium text-sm">Adicione e giram os dados estatísticos nacionais e provinciais.</p>
                </div>
                <Link
                    href="/admin"
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Painel Principal
                </Link>
            </div>

            <div className="max-w-4xl mx-auto py-10">
                <StatsEntryForm />

                {/* Quick Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex gap-4 transition-all hover:bg-blue-50">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0 text-white font-bold shadow-lg shadow-blue-500/20">1</div>
                        <div>
                            <h4 className="font-bold text-blue-900 text-sm mb-1 uppercase tracking-tight">Cuidado com os Valores</h4>
                            <p className="text-xs text-blue-800 leading-relaxed font-medium">
                                Insira valores numéricos simples. O sistema formata automaticamente para Moneda (MZN) ou Toneladas dependendo da categoria.
                            </p>
                        </div>
                    </div>
                    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex gap-4 transition-all hover:bg-emerald-50">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 text-white font-bold shadow-lg shadow-emerald-500/20">2</div>
                        <div>
                            <h4 className="font-bold text-emerald-900 text-sm mb-1 uppercase tracking-tight">Província "Todas"</h4>
                            <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                                Use a opção "Todas" para dados que representam o somatório nacional ou indicadores gerais.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
