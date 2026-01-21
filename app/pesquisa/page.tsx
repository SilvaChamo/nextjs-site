"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import {
    Search, Bell, Building2, CheckCircle,
    Star, MapPin, Maximize, Droplets,
    ChevronLeft, ChevronRight, Globe,
    Mail, Share2, Filter, Tractor,
    User, HardHat, LandPlot, ShoppingBag, ArrowRight,
    FileText, BookOpen
} from "lucide-react";

export default function SearchResultsPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            <PageHeader
                title="Repositório"
                backgroundImage="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Repositório", href: undefined }
                ]}
            />

            <main className="max-w-[1350px] mx-auto px-4 md:px-[60px] py-12">
                <div className="flex flex-col lg:flex-row gap-12">


                    {/* Sidebar Filter */}
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="sticky top-24 space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Filtros</h2>
                                <button className="text-xs font-bold text-[#f97316] hover:underline">Limpar tudo</button>
                            </div>

                            {/* Categories */}
                            <div className="bg-slate-50 p-6 rounded-[10px] space-y-4 border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900">Categorias</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: "Todos os resultados", checked: true },
                                        { label: "Produtos", checked: false },
                                        { label: "Empresas", checked: false },
                                        { label: "Profissionais", checked: false },
                                        { label: "Propriedades", checked: false },
                                    ].map((cat, i) => (
                                        <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                defaultChecked={cat.checked}
                                                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                                            />
                                            <span className="text-sm font-medium text-slate-600 group-hover:text-emerald-600 transition-colors">
                                                {cat.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Sort By */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-slate-900">Ordenar por</h3>
                                <select className="w-full bg-white border border-slate-200 rounded-[10px] py-2.5 px-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all">
                                    <option>Relevância</option>
                                    <option>Mais recentes</option>
                                    <option>Preço: Menor para Maior</option>
                                    <option>Preço: Maior para Menor</option>
                                </select>
                            </div>

                            {/* Promo Banner */}
                            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[10px] space-y-4">
                                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Dica Pro</p>
                                <p className="text-sm text-emerald-900 font-medium">Registe-se como vendedor para listar os seus produtos gratuitamente.</p>
                                <button className="w-full py-3 bg-emerald-600 text-white text-xs font-bold rounded-[10px] hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                                    Tornar-se Vendedor
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Results Content Area */}
                    <div className="flex-1 min-h-[400px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Artigos Científicos",
                                    description: "Teses, dissertações, revistas científicas e pesquisas académicas sobre o agronegócio.",
                                    count: "540 Arquivos",
                                    icon: BookOpen,
                                    bg: "bg-cyan-50",
                                    color: "text-cyan-600",
                                    border: "border-cyan-100"
                                },
                                {
                                    title: "Documentos",
                                    description: "Relatórios, legislação, políticas agrárias, manuais técnicos e estatísticas governamentais.",
                                    count: "920 Arquivos",
                                    icon: FileText,
                                    bg: "bg-rose-50",
                                    color: "text-rose-600",
                                    border: "border-rose-100"
                                },
                                {
                                    title: "Empresas",
                                    description: "Fornecedores, distribuidores, instituições públicas e ONGs, associações e cooperativas agrícolas do país.",
                                    count: "850 Arquivos",
                                    icon: Building2,
                                    bg: "bg-blue-50",
                                    color: "text-blue-600",
                                    border: "border-blue-100"
                                },
                                {
                                    title: "Produtos",
                                    description: "Insumos, maquinaria agrícolas, equipamentos e material de segurança disponível para venda imediata.",
                                    count: "2,450 Arquivos",
                                    icon: ShoppingBag,
                                    bg: "bg-emerald-50",
                                    color: "text-emerald-600",
                                    border: "border-emerald-100"
                                },
                                {
                                    title: "Profissionais",
                                    description: "Agrónomos, veterinários, técnicos e especialistas, engenheiros e agricultores prontos para atender as suas necessidades.",
                                    count: "1,200 Arquivos",
                                    icon: User,
                                    bg: "bg-purple-50",
                                    color: "text-purple-600",
                                    border: "border-purple-100"
                                },
                                {
                                    title: "Propriedades",
                                    description: "Terrenos, machambas, infra-estruturas rurais, campos arráveis e fazendas prontas para investimento.",
                                    count: "320 Arquivos",
                                    icon: LandPlot,
                                    bg: "bg-orange-50",
                                    color: "text-orange-600",
                                    border: "border-orange-100"
                                }
                            ].map((item, i) => (
                                <div key={i} className={`p-6 rounded-[15px] border ${item.border} ${item.bg} hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col items-center text-center gap-6`}>
                                    <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm ${item.color} group-hover:scale-110 transition-transform`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-2 w-full">
                                        <h3 className="text-xl font-black text-slate-800 group-hover:text-slate-900 transition-colors">{item.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.description}</p>
                                    </div>
                                    <div className="mt-auto pt-2 flex items-center justify-between w-full">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">{item.count}</span>
                                        <div className="flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-[#f97316] hover:text-[#f97316] transition-colors">
                                            Ver Detalhes
                                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
