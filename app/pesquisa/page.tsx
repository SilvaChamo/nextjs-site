"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Search, Bell, Building2, CheckCircle,
    Star, MapPin, Maximize, Droplets,
    ChevronLeft, ChevronRight, Globe,
    Mail, Share2, Filter, Tractor,
    User, HardHat, LandPlot
} from "lucide-react";

export default function SearchResultsPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">

            <main className="max-w-[1350px] mx-auto px-4 md:px-[60px] pt-24 pb-12">
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
                    <div className="flex-1 space-y-8">
                        {/* Header Stats */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-100 pb-8">
                            <div>
                                <h2 className="text-3xl font-black text-slate-600">Resultados para <span className="italic text-emerald-600 font-serif">"Fertilizante Orgânico"</span></h2>
                                <p className="text-sm text-slate-400 mt-2">Mostrando 1-10 de 450 resultados em Moçambique.</p>
                            </div>
                        </div>

                        {/* Results List */}
                        <div className="grid grid-cols-1 gap-6">

                            {/* Result Card: Product (Featured) */}
                            <div className="bg-white border border-slate-100 rounded-[10px] p-5 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:-translate-y-0.5 transition-all relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-bl-[10px] uppercase tracking-widest">Destaque</div>
                                <div className="w-full md:w-44 h-36 bg-slate-100 rounded-[10px] overflow-hidden shrink-0 relative">
                                    <Image
                                        src="https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400"
                                        alt="Fertilizante"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-[10px] uppercase tracking-widest">Produto</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">• Maputo, MZ</span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-600 mb-2 group-hover:text-emerald-600 transition-colors">Composto Bio-Ativo Premium</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl line-clamp-2">Fertilizante orgânico de alto teor de nitrogénio fabricado a partir de matéria vegetal reciclada e estrume de aves.</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-black text-[#f97316] tracking-tight">2,500 <span className="text-xs">MTN</span></span>
                                        </div>
                                        <button className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-[10px] hover:bg-[#f97316] transition-all">Ver detalhes</button>
                                    </div>
                                </div>
                            </div>

                            {/* Result Card: Company */}
                            <div className="bg-white border border-slate-100 rounded-[10px] p-5 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:-translate-y-0.5 transition-all group">
                                <div className="w-full md:w-44 h-36 bg-slate-50 rounded-[10px] flex items-center justify-center shrink-0 border border-slate-100">
                                    <Building2 className="text-slate-200 w-12 h-12" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-black rounded-[10px] uppercase tracking-widest">Empresa</span>
                                            <CheckCircle className="text-emerald-500 w-3.5 h-3.5" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-600 mb-2 group-hover:text-blue-600 transition-colors">Moçambique Soluções Orgânicas Lda</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl line-clamp-2">Distribuidor líder de insumos agrícolas sustentáveis. Somos especializados no fornecimento a granel.</p>
                                    </div>
                                    <div className="mt-4 flex items-center gap-6">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                                            <Star className="text-[#f97316] w-3.5 h-3.5 fill-[#f97316]" />
                                            <span>4.9 <span className="text-slate-400 font-medium">(124)</span></span>
                                        </div>
                                        <button className="ml-auto text-emerald-600 font-black text-[10px] uppercase tracking-widest hover:underline">Ver Perfil</button>
                                    </div>
                                </div>
                            </div>

                            {/* Result Card: Professional */}
                            <div className="bg-white border border-slate-100 rounded-[10px] p-5 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:-translate-y-0.5 transition-all group">
                                <div className="w-full md:w-44 h-36 rounded-[10px] overflow-hidden shrink-0 relative">
                                    <Image
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
                                        alt="Profissional"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[9px] font-black rounded-[10px] uppercase tracking-widest">Profissional</span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">• 8 anos exp.</span>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-600 mb-2 group-hover:text-purple-600 transition-colors">Dr. Samuel Tembe</h3>
                                        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl line-clamp-2">Especialista em Enriquecimento Orgânico do Solo e Gestão de Culturas Tropicais.</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-2 text-[9px] font-bold text-slate-400">
                                            <span className="uppercase tracking-tighter">#SaúdeDoSolo</span>
                                        </div>
                                        <button className="px-5 py-2 border border-emerald-600 text-emerald-600 text-xs font-bold rounded-[10px] hover:bg-emerald-600 hover:text-white transition-all">Consultar</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-3 pt-12 pb-24">
                            <button className="w-10 h-10 flex items-center justify-center rounded-[10px] border border-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {[1, 2, 3].map(n => (
                                <button key={n} className={`w-10 h-10 flex items-center justify-center rounded-[10px] font-black text-sm transition-all ${n === 1 ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'border border-slate-100 hover:bg-emerald-50 hover:text-emerald-600'}`}>
                                    {n}
                                </button>
                            ))}
                            <span className="px-2 text-slate-300">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-[10px] border border-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition-all font-black text-sm">23</button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-[10px] border border-slate-100 hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
