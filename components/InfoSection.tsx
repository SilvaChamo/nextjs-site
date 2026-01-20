"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    Cpu, Leaf, Book,
    BarChart3, TrendingUp, ArrowRight,
    Scale, TreePalm, Sprout, Coins, FileText
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type CategoryCard = {
    title: string;
    description: string;
    icon: any;
    dark?: boolean;
    iconBg?: string;
    iconColor?: string;
    href: string;
};

// Section labeled as "Informação" for easier identification
export function InfoSection() {
    const [activeTab, setActiveTab] = useState("categorias");
    const bgRef = useRef<HTMLDivElement>(null);

    // Dynamic Data State
    const [categoryCards, setCategoryCards] = useState<CategoryCard[]>([]);
    const [statsData, setStatsData] = useState<any[]>([]);
    const [articlesData, setArticlesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (bgRef.current) {
                const scrolled = window.scrollY;
                // Parallax speed 0.4: Moves slower than the scroll
                bgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        // Fetch Data
        const fetchData = async () => {
            const [cats, stats, arts] = await Promise.all([
                supabase.from('info_categories').select('*'),
                supabase.from('agricultural_stats').select('*').limit(3),
                supabase.from('articles').select('*').limit(3)
            ]);

            // Format Categories
            if (cats.data) {
                const formattedCats = cats.data.map(c => {
                    // @ts-ignore
                    const Icon = LucideIcons[c.icon_name] || TreePalm;
                    return {
                        title: c.title,
                        description: c.description,
                        icon: Icon,
                        dark: c.is_dark,
                        iconBg: c.bg_color,
                        iconColor: c.text_color,
                        href: c.href
                    };
                });
                setCategoryCards(formattedCats);
            }

            // Format Stats
            if (stats.data) {
                setStatsData(stats.data.map(s => ({
                    label: s.label || s.category, // Fallback if label missing
                    val: s.variation ? `${s.variation > 0 ? '+' : ''}${s.variation}%` : `${s.value}`,
                    color: s.variation && s.variation < 0 ? "text-red-500" : "text-emerald-500"
                })));
            }

            // Format Articles
            if (arts.data) {
                setArticlesData(arts.data);
            }

            setLoading(false);
        };

        fetchData();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="w-full bg-transparent relative" id="informacao">
            {/* Top Banner Area - Dark Background */}
            <div className="w-full bg-[#111827] relative pt-20 pb-32 overflow-hidden">
                {/* Background Image - Seedlings - Parallax Enabled */}
                <div
                    ref={bgRef}
                    className="absolute -top-[25%] left-0 w-full h-[150%] bg-[url('/info-banner-bg.jpg')] bg-cover bg-center opacity-60 pointer-events-none will-change-transform"
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] text-center space-y-8 relative z-10">
                    {/* Header Restored - White Text */}
                    <div className="space-y-4 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            Mantenha-se informado
                        </h2>
                        <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
                            Oferecemos serviços dinâmicos para facilitar suas actividades com vista a melhorar a produção. Fornecemos auxílio na busca por soluções assertivas de forma eficiente. Explore as categorias disponíveis abaixo
                        </p>
                    </div>

                    {/* Custom Tabs - Pill Style - Clean, no background container */}
                    <div className="inline-flex items-center gap-4 flex-wrap justify-center">
                        <button
                            onClick={() => setActiveTab("categorias")}
                            className={`px-8 py-2 rounded-md text-base font-bold transition-all shadow-lg hover:bg-[#f97316] hover:text-white ${activeTab === "categorias"
                                ? "bg-[#f97316] text-white"
                                : "bg-white text-slate-700"
                                }`}
                        >
                            Categorias
                        </button>
                        <button
                            onClick={() => setActiveTab("estatisticas")}
                            className={`px-8 py-2 rounded-md text-base font-bold transition-all shadow-lg hover:bg-[#f97316] hover:text-white ${activeTab === "estatisticas"
                                ? "bg-[#f97316] text-white"
                                : "bg-white text-slate-700"
                                }`}
                        >
                            Estatísticas
                        </button>
                        <button
                            onClick={() => setActiveTab("informacoes")}
                            className={`px-8 py-2 rounded-md text-base font-bold transition-all shadow-lg hover:bg-[#f97316] hover:text-white ${activeTab === "informacoes"
                                ? "bg-[#f97316] text-white"
                                : "bg-white text-slate-700"
                                }`}
                        >
                            Informações
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlapping Content Container */}
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 -mt-20 pb-24">
                <div className="animate-in fade-in duration-700 slide-in-from-bottom-8">
                    {loading ? (
                        <div className="bg-white p-12 rounded-[12px] shadow-lg text-center text-gray-400">
                            A carregar informações...
                        </div>
                    ) : (
                        <>
                            {activeTab === "categorias" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categoryCards.map((card, idx) => (
                                        <Link
                                            key={idx}
                                            href={card.href || "#"}
                                            className={`p-6 md:p-8 rounded-[12px] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 group cursor-pointer border h-full ${card.dark
                                                ? "bg-[#374151] text-white border-slate-600 shadow-xl shadow-slate-900/20"
                                                : "bg-white text-slate-900 border-slate-200 shadow-lg shadow-slate-200/50"
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${card.iconBg}`}>
                                                    <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-bold leading-tight">{card.title}</h3>
                                                </div>
                                            </div>
                                            <p className={`text-sm leading-relaxed ${card.dark ? "text-slate-300" : "text-slate-500"} line-clamp-4`}>
                                                {card.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {activeTab === "estatisticas" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                    <div className="bg-white p-8 rounded-[12px] shadow-xl shadow-slate-200 border border-slate-100 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                                                <BarChart3 className="text-[#f97316] h-6 w-6" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-600">Mercado Agrário</h3>
                                        </div>
                                        <p className="text-slate-500">Dados em tempo real sobre a flutuação de preços e volume de produção nas principais províncias moçambicanas.</p>
                                        <div className="space-y-4">
                                            {statsData.length > 0 ? statsData.map((stat, i) => (
                                                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-[10px]">
                                                    <span className="font-bold text-slate-700">{stat.label}</span>
                                                    <span className={`font-black ${stat.color}`}>{stat.val}</span>
                                                </div>
                                            )) : (
                                                <div className="text-gray-400 text-sm">Sem dados recentes de mercado.</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-[#374151] p-8 rounded-[12px] shadow-2xl text-white space-y-6 border border-slate-600">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                                <TrendingUp className="text-white h-6 w-6" />
                                            </div>
                                            <h3 className="text-2xl font-bold">Projecções 2024</h3>
                                        </div>
                                        <p className="text-slate-300">Análise predictiva baseada no histórico de colheitas e condições meteorológicas actuais.</p>
                                        <div className="h-48 flex items-end gap-3 px-4">
                                            {/* Dummy chart bars - could be dynamic later */}
                                            {[40, 70, 45, 90, 65, 80].map((h, i) => (
                                                <div key={i} className="flex-1 bg-emerald-500 rounded-t-lg transition-all hover:bg-[#f97316] cursor-pointer" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "informacoes" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {articlesData.map((news, i) => (
                                        <Link
                                            key={i}
                                            href={news.slug ? `/artigos/${news.slug}` : "#"}
                                            className="bg-white p-6 rounded-[12px] shadow-lg border border-slate-100 flex flex-col justify-between group cursor-pointer hover:border-[#f97316] transition-all gap-4 h-full"
                                        >
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#f97316]">
                                                    <span>{news.type || "Artigo"}</span>
                                                    <span className="text-slate-300">•</span>
                                                    <span className="text-slate-400">{news.date}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-600 group-hover:text-[#f97316] transition-colors">{news.title}</h3>
                                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{news.subtitle || news.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors mt-auto pt-4">
                                                Explorar <ArrowRight className="h-3 w-3" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
