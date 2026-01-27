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
        slug: "impacto-clima-milho-beira",
        date: "2024-01-10",
        type: "article",
        image_url: "https://images.unsplash.com/photo-1507842217121-9e871299ee18?q=80&w=800",
        subtitle: "Estudo analítico sobre as variações pluviométricas e seu efeito no rendimento das culturas."
    },
    {
        id: 'a2',
        title: "Estudo sobre a Eficácia do Biocarvão em Solos Arenosos",
        slug: "estudo-biocarvao-solos-arenosos",
        date: "2023-11-20",
        type: "article",
        image_url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800",
        subtitle: "Investigação sobre a retenção de nutrientes e melhoria da estrutura do solo com uso de biochar."
    },
    {
        id: 'a3',
        title: "Diversidade Genética do Embondeiro na Região Sul",
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

    useEffect(() => {
        async function fetchArticles() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('type', 'article')
                    .order('date', { ascending: false })
                    .limit(3);

                if (error) throw error;
                const allArticles = [...(data || []), ...FALLBACK_ARTICLES];
                setArticles(allArticles.slice(0, 3));
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const filteredArticles = articles.filter(art =>
        art.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">Pesquisa</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Procurar artigos..."
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            }
        >
            <div className="grid grid-cols-1 gap-8 max-w-4xl">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white p-4 rounded-lg h-32 w-full" />
                    ))
                ) : filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <Link key={article.id} href={`/artigos/${article.slug}`} className="group block mb-2 font-sans">
                            <div className="flex flex-col gap-1">
                                {/* URL / Breadcrumb-like line */}
                                <div className="flex items-center gap-2 text-sm text-[#202124] mb-1">
                                    <div className="bg-slate-100 rounded-full w-7 h-7 flex items-center justify-center shrink-0">
                                        {/* Small favicon-like icon */}
                                        <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className="font-semibold text-[14px]">BaseAgroData</span>
                                        <span className="text-xs text-slate-500">https://baseagrodata.com › artigos › {article.slug ? article.slug.substring(0, 15) + "..." : "view"}</span>
                                    </div>
                                </div>

                                {/* Title - Google Blue */}
                                <h3 className="text-xl text-[#1a0dab] group-hover:underline font-normal cursor-pointer leading-snug">
                                    {article.title}
                                </h3>

                                {/* Date and Snippet */}
                                <div className="text-sm text-[#4d5156] leading-relaxed max-w-2xl">
                                    <span className="text-slate-500 text-[12px] mr-2">{new Date(article.date).toLocaleDateString()} —</span>
                                    {article.subtitle || article.content?.substring(0, 160).replace(/<[^>]*>/g, '') + "..."}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-slate-400">
                        Nenhum artigo encontrado.
                    </div>
                )}
            </div>
        </StandardBlogTemplate>
    );
}
