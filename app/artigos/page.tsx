"use client";

import React, { useEffect, useState, useRef } from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { BookOpen, Search, ArrowRight, Calendar, User, ChevronDown, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@supabase/supabase-js";

// DEMO FALLBACK DATA
const FALLBACK_ARTICLES = [
    {
        id: 'a1',
        title: "Impacto do Clima na Produção de Milho no Corredor da Beira",
        author: "Carlos Mondlane",
        source: "IIAM - Instituto de Investigação Agrária",
        source_url: "https://iiam.gov.mz/publicacoes/milho-beira",
        slug: "impacto-clima-milho-beira",
        date: "2024-01-10",
        type: "article",
        image_url: "https://images.unsplash.com/photo-1507842217121-9e871299ee18?q=80&w=800",
        subtitle: "Estudo analítico sobre as variações pluviométricas e seu efeito no rendimento das culturas."
    },
    {
        id: 'a2',
        title: "Estudo sobre a Eficácia do Biocarvão em Solos Arenosos",
        author: "Dr. Ana Paula",
        source: "UEM - Faculdade de Agronomia",
        source_url: "https://uem.mz/agronomia/estudos/biocarvao",
        slug: "estudo-biocarvao-solos-arenosos",
        date: "2023-11-20",
        type: "article",
        image_url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800",
        subtitle: "Investigação sobre a retenção de nutrientes e melhoria da estrutura do solo com uso de biochar."
    },
    {
        id: 'a3',
        title: "Diversidade Genética do Embondeiro na Região Sul",
        author: "Samuel Chivambo",
        source: "Revista Científica de Moçambique",
        source_url: "https://revistacientifica.org.mz/chivambo-2023",
        slug: "diversidade-genetica-embondeiro-sul",
        date: "2023-09-05",
        type: "article",
        image_url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800",
        subtitle: "Mapeamento genético e conservação de uma das espécies mais icónicas de Moçambique."
    }
];

export default function ArticlesArchivePage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [localArticles, setLocalArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(3);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [isScanningGlobal, setIsScanningGlobal] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchInitial() {
            setLoading(true);
            try {
                // 1. Fetch Local Verified Content
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('type', 'article')
                    .order('date', { ascending: false });

                const combinedLocal = [...(data || []), ...FALLBACK_ARTICLES];
                setLocalArticles(combinedLocal);
                setArticles(combinedLocal);

                // 2. Auto-Scan Global Scientific Database for Mozambique
                // This fulfills the "national priority" and "auto-reload/scan" request
                const mozPapers = await fetchExternalArticles("Moçambique Agricultura");
                setArticles(prev => [...prev, ...mozPapers]);

            } catch (error) {
                console.error("Error fetching initial articles:", error);
                setLocalArticles(FALLBACK_ARTICLES);
                setArticles(FALLBACK_ARTICLES);
            } finally {
                setLoading(false);
            }
        }
        fetchInitial();
    }, []);

    const fetchExternalArticles = async (query: string) => {
        if (!query || query.length < 3) return [];
        setIsScanningGlobal(true);
        try {
            // Updated to use internal proxy to avoid CORS/NetworkErrors
            const response = await fetch(`/api/articles/search?query=${encodeURIComponent(query)}&limit=10`);
            const data = await response.json();

            if (data && data.data) {
                return data.data.map((paper: any) => ({
                    id: paper.paperId,
                    title: paper.title,
                    author: paper.authors && paper.authors.length > 0 ? paper.authors[0].name : "Pesquisador Académico",
                    source: paper.venue || "Global Science Database",
                    source_url: paper.url,
                    slug: `ext-${paper.paperId}`,
                    date: `${paper.year || new Date().getFullYear()}-01-01`,
                    type: "external_article",
                    subtitle: paper.abstract ? paper.abstract.substring(0, 160) + "..." : "Documento científico recuperado de base de dados global."
                }));
            }
            return [];
        } catch (err) {
            console.error("Global search error:", err);
            return [];
        } finally {
            setIsScanningGlobal(false);
        }
    };

    const handleSearch = async (e?: React.KeyboardEvent | React.MouseEvent) => {
        if (e && 'key' in e && e.key !== 'Enter') return;

        setIsSearchActive(true);
        const query = searchQuery.toLowerCase();
        const filteredLocal = localArticles.filter(art =>
            art.title?.toLowerCase().includes(query) ||
            art.author?.toLowerCase().includes(query) ||
            art.source?.toLowerCase().includes(query)
        );
        if (query.length >= 3) {
            setArticles(filteredLocal);
            const external = await fetchExternalArticles(searchQuery);
            setArticles([...filteredLocal, ...external]);
        } else {
            setArticles(filteredLocal);
        }
        setVisibleCount(3);
    };

    const displayedArticles = articles.slice(0, visibleCount);

    const handleLoadMore = () => {
        if (isFetchingMore) return;
        setIsFetchingMore(true);
        setTimeout(() => {
            setVisibleCount(prev => prev + 3);
            setIsFetchingMore(false);
        }, 500); // Reduced delay for smoother automatic feel
    };

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetchingMore && visibleCount < articles.length) {
                handleLoadMore();
            }
        }, { threshold: 0.1 });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [isFetchingMore, visibleCount, articles.length]);

    return (
        <StandardBlogTemplate
            title="Artigos científicos"
            backgroundImage="https://images.unsplash.com/photo-1507842217121-19e871299ee18?q=80&w=2000&auto=format&fit=crop"
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Repositório", href: "/repositorio" },
                { label: "Artigos científicos", href: undefined }
            ]}
            titleClassName="text-[20px] md:text-[28px] lg:text-[34px] font-black uppercase tracking-[0.5em]"
            sidebarComponents={
                <div className="space-y-agro">
                    <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Info className="w-4 h-4 text-emerald-600" />
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-0">Informação</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Acesse a maior biblioteca científica do agronegócio em Moçambique, com curadoria local e parcerias globais.
                        </p>
                    </div>
                </div>
            }
        >
            {/* Scientific Search Input - EXACT Home Style + Enter Trigger */}
            <div className="mb-[20px]">
                <div className={`relative bg-white rounded-[10px] shadow-sm h-12 flex items-center border transition-all duration-300 overflow-hidden ${isScanningGlobal ? 'border-emerald-300 ring-2 ring-emerald-50' : 'border-gray-200'}`}>
                    <button
                        onClick={() => handleSearch()}
                        className="pl-6 text-gray-400 hover:text-emerald-600 transition-colors"
                        disabled={isScanningGlobal}
                    >
                        {isScanningGlobal ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent" />
                        ) : (
                            <Search className="h-5 w-5" />
                        )}
                    </button>
                    <input
                        className="border-none shadow-none focus-visible:ring-0 text-base h-full bg-transparent placeholder:text-gray-400 flex-1 px-4 outline-none"
                        placeholder="Em que podemos te ajudar hoje?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                    {/* Visual Label - Clean Scientific Indicator */}
                    <div className="flex items-center gap-2 px-6 h-full border-l border-gray-100 bg-gray-50 transition-colors">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block whitespace-nowrap">
                            {isScanningGlobal ? "Escaneando..." : "Artigos científicos"}
                        </span>
                    </div>
                </div>
                {isScanningGlobal && (
                    <p className="text-[11px] text-emerald-600 font-bold mt-2 animate-pulse uppercase tracking-wider pl-1">
                        Varrendo bibliotecas digitais e bases acadêmicas globais...
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 border-t border-slate-200">
                {!isSearchActive ? (
                    /* Hero Scientific Advertisement */
                    <div className="py-[25px] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="relative group overflow-hidden rounded-[15px] border border-slate-100 shadow-xl bg-white aspect-[21/9] md:aspect-[3/1]">
                            <Image
                                src="/images/scientific-ad-natural-v3.png"
                                alt="AgroCientífico Moçambique"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-center px-10">
                                <div className="max-w-md space-y-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Destaque Científico</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-white leading-tight uppercase">O FUTURO DO CAMPO É <span className="text-emerald-400">DIGITAL</span></h2>
                                    <p className="text-slate-200 text-sm font-medium leading-relaxed">
                                        Accesse o maior repositório de inteligência agrícola de Moçambique. Pesquise teses, relatórios e papers globais validados academicamente.
                                    </p>
                                    <Link
                                        href="/repositorio"
                                        className="mt-4 px-8 py-3 bg-emerald-600 hover:bg-[#f97316] text-white rounded-[7px] text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2 group/btn w-fit"
                                    >
                                        Explorar Repositório
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Scientific Cards / Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                            <div className="bg-emerald-50/50 p-6 rounded-[15px] border border-emerald-100/50 flex gap-4 items-start">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-emerald-100">
                                    <BookOpen className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">Curadoria Nacional</h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Artigos verificados por especialistas do IIAM e UEM focado no solo moçambicano.</p>
                                </div>
                            </div>
                            <div className="bg-orange-50/50 p-6 rounded-[15px] border border-orange-100/50 flex gap-4 items-start">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 border border-orange-100">
                                    <Search className="w-6 h-6 text-[#f97316]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">Varredura Global</h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">Conexão directa com Semantic Scholar para trazer as últimas inovações do agronegócio mundial.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="animate-pulse bg-white p-4 h-32 w-full border-b border-slate-200" />
                            ))
                        ) : (
                            <>
                                {displayedArticles.length > 0 ? (
                                    displayedArticles.map((article, index) => (
                                        <div key={article.id} className={`group block py-6 bg-white border-b border-slate-200 hover:bg-slate-50 transition-colors pl-[25px] pr-4 ${index === 0 ? 'rounded-t-[10px]' : ''}`}>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2 text-sm text-[#202124] mb-1">
                                                    <div className="bg-slate-50 rounded-full w-7 h-7 flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden">
                                                        <Image
                                                            src="/icon.png"
                                                            alt="Icon"
                                                            width={24}
                                                            height={24}
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col leading-tight">
                                                        <div className="flex items-center gap-1.5 font-semibold text-[14px]">
                                                            <span>{article.author || "Autor Desconhecido"}</span>
                                                            {article.source && <span className="text-slate-400 font-normal">› {article.source}</span>}
                                                        </div>
                                                        <a
                                                            href={article.source_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-slate-500 hover:underline decoration-slate-300"
                                                        >
                                                            {article.source_url ? article.source_url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0] + " › ..." : `baseagrodata.com › ...`}
                                                        </a>
                                                    </div>
                                                </div>

                                                {article.type === 'external_article' ? (
                                                    <a
                                                        href={article.source_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-lg font-bold text-[#1a0dab] hover:underline cursor-pointer leading-snug tracking-tight mb-0.5"
                                                    >
                                                        {article.title}
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href={`/artigos/${article.slug}`}
                                                        className="text-lg font-bold text-[#1a0dab] hover:underline cursor-pointer leading-snug tracking-tight mb-0.5"
                                                    >
                                                        {article.title}
                                                    </Link>
                                                )}

                                                <div className="text-sm text-[#4d5156] leading-relaxed max-w-3xl">
                                                    <span className="text-slate-500 text-[12px] mr-2">{new Date(article.date).getFullYear()} —</span>
                                                    {article.subtitle || (article.content ? article.content.substring(0, 160).replace(/<[^>]*>/g, '') + "..." : "Documento científico.")}
                                                </div>

                                                {article.type === 'external_article' && (
                                                    <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-[4px] w-fit">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                        Base de Dados Global
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center text-slate-400">
                                        Nenhum artigo encontrado.
                                    </div>
                                )}

                                {/* Automatic Load More Sentinel */}
                                {visibleCount < articles.length && (
                                    <div ref={loaderRef} className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent" />
                                        <p className="text-xs font-bold uppercase tracking-widest animate-pulse">
                                            Carregando mais documentos científicos...
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </StandardBlogTemplate>
    );
}
