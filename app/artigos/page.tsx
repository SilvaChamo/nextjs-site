"use client";

import React, { useEffect, useState } from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { BookOpen, Search, ArrowRight, Calendar, User } from "lucide-react";
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
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(3);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        async function fetchArticles() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('type', 'article')
                    .order('date', { ascending: false });

                if (error) throw error;
                const allArticles = [...(data || []), ...FALLBACK_ARTICLES];
                setArticles(allArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setArticles(FALLBACK_ARTICLES);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const filteredArticles = articles.filter(art =>
        art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.source?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedArticles = filteredArticles.slice(0, visibleCount);

    const handleLoadMore = () => {
        setIsFetchingMore(true);
        // Simulate network delay for "infinite" feel
        setTimeout(() => {
            setVisibleCount(prev => prev + 3);
            setIsFetchingMore(false);
        }, 800);
    };

    return (
        <StandardBlogTemplate
            title="Artigos Científicos"
            backgroundImage="https://images.unsplash.com/photo-1507842217121-9e871299ee18?q=80&w=2000&auto=format&fit=crop"
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Repositório", href: "/repositorio" },
                { label: "Artigos Científicos", href: undefined }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">Informação</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Acesse a maior biblioteca científica do agronegócio em Moçambique, com curadoria local e parcerias globais.
                        </p>
                    </div>
                </div>
            }
        >
            {/* Scientific Search Input - Home Style */}
            <div className="max-w-4xl mb-8">
                <div className="relative bg-white rounded-[5px] shadow-sm h-12 flex items-center border border-gray-200 transition-all duration-300 overflow-hidden">
                    <div className="pl-6 text-gray-400">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        className="border-none shadow-none focus:ring-0 text-base h-full bg-transparent placeholder:text-gray-400 flex-1 px-4 outline-none"
                        placeholder="Pesquisar por título, autor ou instituição..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 max-w-4xl border-t border-slate-200">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white p-4 h-32 w-full border-b border-slate-200" />
                    ))
                ) : displayedArticles.length > 0 ? (
                    <>
                        {displayedArticles.map((article) => (
                            <Link key={article.id} href={`/artigos/${article.slug}`} className="group block py-6 bg-white border-b border-slate-200 hover:bg-slate-50 transition-colors pl-[25px] pr-4">
                                <div className="flex flex-col gap-0.5">
                                    {/* Identity Line: Icon + Author & Source */}
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
                                            {/* Pure Source URL Link */}
                                            <span className="text-xs text-slate-500">
                                                {article.source_url || `https://baseagrodata.com/artigos/${article.slug}`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title - Google Blue */}
                                    <h3 className="text-lg font-bold text-[#1a0dab] group-hover:underline cursor-pointer leading-snug tracking-tight mb-0.5">
                                        {article.title}
                                    </h3>

                                    {/* Date and Snippet */}
                                    <div className="text-sm text-[#4d5156] leading-relaxed max-w-3xl">
                                        <span className="text-slate-500 text-[12px] mr-2">{new Date(article.date).toLocaleDateString()} —</span>
                                        {article.subtitle || article.content?.substring(0, 160).replace(/<[^>]*>/g, '') + "..."}
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* Load More Trigger / Button */}
                        {visibleCount < filteredArticles.length && (
                            <div className="py-10 text-center">
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isFetchingMore}
                                    className="px-8 py-3 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center gap-2 mx-auto disabled:opacity-50"
                                >
                                    {isFetchingMore ? (
                                        <>Carregando mais artigos...</>
                                    ) : (
                                        <>
                                            Ver mais documentos
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="col-span-full py-20 text-center text-slate-400">
                        Nenhum artigo encontrado.
                    </div>
                )}
            </div>
        </StandardBlogTemplate>
    );
}
