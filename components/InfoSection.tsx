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
import { MarketPriceTable } from "./MarketPriceTable";
import Autoplay from 'embla-carousel-autoplay';
import { AgroCastSection } from "@/components/AgroCastSection";

const EXEMPLARY_CATEGORIES: CategoryCard[] = [
    {
        title: "Empresas",
        description: "Encontre fornecedores, parceiros e instituições do agronegócio.",
        icon: LucideIcons.Building2,
        href: "/empresas"
    },
    {
        title: "Produtos",
        description: "Explore insumos, maquinaria e produtos agrícolas disponíveis.",
        icon: LucideIcons.ShoppingBag,
        href: "/produtos"
    },
    {
        title: "Profissionais",
        description: "Contrate especialistas, agrónomos e técnicos qualificados.",
        icon: LucideIcons.User,
        href: "/servicos/talentos"
    },
    {
        title: "Propriedades",
        description: "Invista em terras, fazendas e infra-estruturas rurais.",
        icon: LucideIcons.LandPlot,
        href: "/propriedades"
    },
    {
        title: "Documentos",
        description: "Aceda a legislação, relatórios e manuais técnicos do sector.",
        icon: LucideIcons.FileText,
        href: "/documentos"
    },
    {
        title: "Artigos Científicos",
        description: "Pesquisas, teses e inovações do agronegócio moçambicano.",
        icon: LucideIcons.BookOpen,
        href: "/artigos"
    }
];

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
    const bgRef = useRef<HTMLImageElement>(null);

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
                supabase.from('articles').select('id, title, subtitle, image_url, date, slug, type').order('created_at', { ascending: false }).limit(3)
            ]);

            if (cats.data) {
                const formattedCats = cats.data.map(c => {
                    // @ts-ignore
                    const Icon = LucideIcons[c.icon_name] || LucideIcons.TreePalm;
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

                // Combine with exemplary to ensure all are present, then filter to the 6 we want
                const allCats = [...EXEMPLARY_CATEGORIES];
                setCategoryCards(allCats.slice(0, 6));
            } else {
                setCategoryCards(EXEMPLARY_CATEGORIES);
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

    // Helper to get local image overrides for news
    const getArticleImage = (article: any) => {
        const title = article.title?.toLowerCase() || "";
        if (title.includes("brasil") && title.includes("africa")) {
            return "/images/Prototipo/brasilafrica.jpg";
        }
        return article.image_url || "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop";
    };

    return (
        <section className="w-full bg-transparent relative" id="informacao">
            <div className="w-full bg-[#111827] relative h-[320px] overflow-hidden flex items-center">
                {/* Dynamic Glowing Blobs for Premium Feel */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-[#f97316]/20 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[90%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-delayed" />
                    <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" />
                </div>

                <img
                    ref={bgRef}
                    src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2672&auto=format&fit=crop"
                    alt="Background"
                    className="absolute inset-x-0 top-0 w-full h-[150%] object-cover z-0 opacity-40 pointer-events-none transition-transform duration-100 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/90 via-[#111827]/40 to-[#111827]/90 z-[1]" />

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] text-center space-y-4 relative z-10">
                    <div className="space-y-4 max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-4">
                            <span className="w-[20px] h-[1px] bg-white opacity-60"></span>
                            <span className="text-[#f97316] text-xs font-black uppercase tracking-[0.3em] shadow-sm">
                                Inovação e Crescimento
                            </span>
                            <span className="w-[20px] h-[1px] bg-white opacity-60"></span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-3">
                            Mantenha-se informado
                        </h2>
                        <p className="text-slate-200 text-sm leading-tight max-w-3xl mx-auto font-medium">
                            Oferecemos serviços dinâmicos para facilitar suas actividades com vista a melhorar a produção. Fornecemos auxílio na busca por soluções assertivas de forma eficiente. Explore as categorias disponíveis abaixo
                        </p>
                    </div>

                    <div className="inline-flex items-center gap-4 flex-wrap justify-center mt-[25px]">
                        <button
                            onClick={() => setActiveTab("informacoes")}
                            className={`px-8 py-[8.5px] rounded-[7px] text-sm font-medium transition-all backdrop-blur-md border transition-all duration-300 ${activeTab === "informacoes"
                                ? "bg-[#f97316] border-[#f97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-[#f97316]"
                                }`}
                        >
                            Informações
                        </button>
                        <button
                            onClick={() => setActiveTab("agrocast")}
                            className={`px-8 py-[8.5px] rounded-[7px] text-sm font-medium transition-all backdrop-blur-md border transition-all duration-300 ${activeTab === "agrocast"
                                ? "bg-[#f97316] border-[#f97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-[#f97316]"
                                }`}
                        >
                            AgroCast
                        </button>
                        <button
                            onClick={() => setActiveTab("categorias")}
                            className={`px-8 py-[8.5px] rounded-[7px] text-sm font-medium transition-all backdrop-blur-md border transition-all duration-300 ${activeTab === "categorias"
                                ? "bg-[#f97316] border-[#f97316] text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                : "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-[#f97316]"
                                }`}
                        >
                            Categorias
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[70px] pb-24">
                <div className="animate-in fade-in duration-700 slide-in-from-bottom-8">
                    {loading ? (
                        <div className="bg-white p-12 rounded-[4px] shadow-lg text-center text-gray-400 border border-slate-100">
                            A carregar informações...
                        </div>
                    ) : (
                        <>
                            {activeTab === "categorias" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {categoryCards.map((card, idx) => (
                                        <Link
                                            key={idx}
                                            href={card.href || "#"}
                                            className={`p-10 md:p-12 rounded-agro text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-agro group cursor-pointer border h-full ${card.dark
                                                ? "bg-[#374151] text-white border-slate-600 shadow-xl shadow-slate-900/20"
                                                : "bg-white text-[#3a3f47] border-slate-200 shadow-lg shadow-slate-200/50"
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-[5px] flex items-center justify-center shrink-0 ${card.dark ? card.iconBg : "bg-slate-100"} ${card.title.toLowerCase().includes('visibilidade') ||
                                                    card.title.toLowerCase().includes('crescimento') ||
                                                    card.title.toLowerCase().includes('scanner') ||
                                                    card.title.toLowerCase().includes('doctor')
                                                    ? "border-2 border-[#f97316]"
                                                    : ""
                                                    }`}>
                                                    <card.icon className={`h-6 w-6 ${card.dark ? card.iconColor : "text-slate-600"}`} />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className={`text-xl font-black leading-tight first-letter:uppercase lowercase ${card.dark ? "text-white" : "text-[#3a3f47]"}`} suppressHydrationWarning>
                                                        <span>{card.title}</span>
                                                    </h3>
                                                </div>
                                            </div>
                                            <p className={`text-sm leading-relaxed ${card.dark ? "text-slate-300" : "text-slate-500"} line-clamp-4`}>
                                                {card.description}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {activeTab === "agrocast" && (
                                <AgroCastSection embedded />
                            )}

                            {activeTab === "informacoes" && (
                                <div className="relative group/embla mt-[70px]">
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
                                                                src={getArticleImage(news)}
                                                                alt={news.title}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                            <div className="absolute top-4 left-4 bg-[#f97316] text-white text-[10px] font-black uppercase px-3 py-1 rounded-[5px]">
                                                                {news.type || "Artigo"}
                                                            </div>
                                                        </div>
                                                        <div className="p-5 flex flex-col flex-1">
                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                                    <span>{new Date(news.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '').replace(' de ', ' ')}</span>
                                                                </div>
                                                                <h3 className="text-lg font-black text-slate-600 group-hover:text-[#f97316] transition-colors line-clamp-2 first-letter:uppercase lowercase my-0" suppressHydrationWarning>
                                                                    <span>{news.title}</span>
                                                                </h3>
                                                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
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
        </section >
    );
}
