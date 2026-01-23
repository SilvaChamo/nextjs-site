"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    Cpu, Leaf, Book,
    BarChart3, TrendingUp, ArrowRight,
    Scale, TreePalm, Sprout, Coins, FileText,
    ChevronLeft, ChevronRight
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

type CategoryCard = {
    title: string;
    description: string;
    icon: any;
    dark?: boolean;
    iconBg?: string;
    iconColor?: string;
    href: string;
};

export function InfoSection() {
    const [activeTab, setActiveTab] = useState("informacoes");
    const bgRef = useRef<HTMLDivElement>(null);

    const [categoryCards, setCategoryCards] = useState<CategoryCard[]>([]);
    const [statsData, setStatsData] = useState<any[]>([]);
    const [articlesData, setArticlesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (bgRef.current) {
                const section = bgRef.current.parentElement;
                if (!section) return;

                const rect = section.getBoundingClientRect();
                const scrolled = window.scrollY;
                const offsetTop = rect.top + scrolled;

                const distance = scrolled - offsetTop;
                bgRef.current.style.transform = `translateY(${distance * 0.3}px)`;
            }
        };

        const fetchData = async () => {
            const [cats, stats, arts] = await Promise.all([
                supabase.from('info_categories').select('*'),
                supabase.from('agricultural_stats').select('*').limit(3),
                supabase.from('articles').select('*').limit(6)
            ]);

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

            if (stats.data) {
                setStatsData(stats.data.map(s => ({
                    label: s.label || s.category,
                    val: s.variation ? `${s.variation > 0 ? '+' : ''}${s.variation}%` : `${s.value}`,
                    color: s.variation && s.variation < 0 ? "text-red-500" : "text-emerald-500"
                })));
            }

            if (arts.data) {
                setArticlesData(arts.data);
            }

            setLoading(false);
        };

        fetchData();

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', skipSnaps: false },
        [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = React.useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, setScrollSnaps, onSelect]);

    return (
        <section className="w-full bg-transparent relative" id="informacao">
            <div className="w-full bg-[#111827] relative h-[400px] overflow-hidden flex items-center">
                {/* Dynamic Glowing Blobs for Premium Feel */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-[#f97316]/20 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[90%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-delayed" />
                    <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" />
                </div>

                <img
                    src="https://images.unsplash.com/photo-1625246333195-5819acf4261b?q=80&w=2672&auto=format&fit=crop"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 pointer-events-none mix-blend-overlay"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/95 via-[#111827]/75 to-[#111827]/95 z-[1]" />

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] text-center space-y-6 relative z-10 pt-[20px]">
                    <div className="space-y-4 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-4">
                            <span className="w-[20px] h-[1px] bg-white opacity-60"></span>
                            <span className="text-[#f97316] text-xs font-black uppercase tracking-[0.3em] shadow-sm">
                                Inovação e Crescimento
                            </span>
                            <span className="w-[20px] h-[1px] bg-white opacity-60"></span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-6">
                            Mantenha-se informado
                        </h2>
                        <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium">
                            Oferecemos serviços dinâmicos para facilitar suas actividades com vista a melhorar a produção. Fornecemos auxílio na busca por soluções assertivas de forma eficiente. Explore as categorias disponíveis abaixo
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-4 flex-wrap justify-center mt-5">
                        <button
                            onClick={() => setActiveTab("informacoes")}
                            className={`px-8 py-3 rounded-[5px] text-base font-bold transition-all backdrop-blur-md border transition-all duration-300 ${activeTab === "informacoes"
                                ? "bg-[#f97316] border-[#f97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                                }`}
                        >
                            Informações
                        </button>
                        <button
                            onClick={() => setActiveTab("estatisticas")}
                            className={`px-8 py-3 rounded-[5px] text-base font-bold transition-all backdrop-blur-md border transition-all duration-300 ${activeTab === "estatisticas"
                                ? "bg-[#f97316] border-[#f97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                                }`}
                        >
                            Estatísticas
                        </button>
                        <button
                            onClick={() => setActiveTab("categorias")}
                            className={`px-8 py-3 rounded-[5px] text-base font-bold transition-all backdrop-blur-md border transition-all duration-300 ${activeTab === "categorias"
                                ? "bg-[#f97316] border-[#f97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                                }`}
                        >
                            Categorias
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-10 pb-24">
                <div className="animate-in fade-in duration-700 slide-in-from-bottom-8">
                    {loading ? (
                        <div className="bg-white p-12 rounded-[4px] shadow-lg text-center text-gray-400 border border-slate-100">
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
                                            className={`p-6 md:p-8 rounded-none text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 group cursor-pointer border h-full ${card.dark
                                                ? "bg-[#374151] text-white border-slate-600 shadow-xl shadow-slate-900/20"
                                                : "bg-white text-[#3a3f47] border-slate-200 shadow-lg shadow-slate-200/50"
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-[5px] flex items-center justify-center shrink-0 ${card.iconBg} ${card.title.toLowerCase().includes('visibilidade') ||
                                                    card.title.toLowerCase().includes('crescimento') ||
                                                    card.title.toLowerCase().includes('scanner') ||
                                                    card.title.toLowerCase().includes('doctor')
                                                    ? "border-2 border-[#f97316]"
                                                    : ""
                                                    }`}>
                                                    <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-xl font-black leading-tight first-letter:uppercase lowercase">{card.title}</h3>
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
                                            <div className="w-12 h-12 rounded-[5px] bg-orange-50 flex items-center justify-center">
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
                                    <div className="bg-[#1e293b] p-8 rounded-[12px] shadow-2xl text-white space-y-6 border border-slate-600">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                                <TrendingUp className="text-white h-6 w-6" />
                                            </div>
                                            <h3 className="text-2xl font-bold">Projecções 2024</h3>
                                        </div>
                                        <p className="text-slate-300">Análise predictiva baseada no histórico de colheitas e condições meteorológicas actuais.</p>
                                        <div className="h-48 flex items-end gap-3 px-4">
                                            {[40, 70, 45, 90, 65, 80].map((h, i) => (
                                                <div key={i} className="flex-1 bg-emerald-500 rounded-t-lg transition-all hover:bg-[#f97316] cursor-pointer" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "informacoes" && (
                                <div className="relative group/embla">
                                    <div className="overflow-hidden" ref={emblaRef}>
                                        <div className="flex -mr-[15px]">
                                            {articlesData.map((news, i) => (
                                                <div key={i} className="flex-[0_0_100%] md:flex-[0_0_33.33%] min-w-0 pr-[15px]">
                                                    <Link
                                                        href={news.slug ? `/artigos/${news.slug}` : "#"}
                                                        className="bg-white rounded-[12px] shadow-lg border border-slate-100 flex flex-col group cursor-pointer hover:border-[#f97316] transition-all overflow-hidden h-full"
                                                    >
                                                        <div className="relative h-48 w-full overflow-hidden">
                                                            <img
                                                                src={news.image_url || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop"}
                                                                alt={news.title}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="absolute top-4 left-4 bg-[#f97316] text-white text-[10px] font-black uppercase px-3 py-1 rounded-[5px]">
                                                                {news.type || "Artigo"}
                                                            </div>
                                                        </div>
                                                        <div className="p-6 flex flex-col flex-1">
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                                    <span>{news.date}</span>
                                                                </div>
                                                                <h3 className="text-lg font-black text-slate-600 group-hover:text-[#f97316] transition-colors line-clamp-2 first-letter:uppercase lowercase my-0">
                                                                    {news.title}
                                                                </h3>
                                                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">
                                                                    {news.subtitle || news.description}
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 group-hover:text-[#f97316] transition-colors mt-auto pt-6">
                                                                Explorar <ArrowRight className="h-3 w-3" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={scrollPrev}
                                        className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#f97316] hover:bg-[#f97316] hover:text-white transition-all z-10"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={scrollNext}
                                        className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#f97316] hover:bg-[#f97316] hover:text-white transition-all z-10"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>

                                    <div className="flex justify-center gap-2 mt-10">
                                        {scrollSnaps.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => scrollTo(index)}
                                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                                                    ? "bg-[#f97316] w-12"
                                                    : "bg-slate-300 hover:bg-slate-400"
                                                    }`}
                                                aria-label={`Ir para notícia ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
