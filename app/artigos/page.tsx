"use client";

import React, { useEffect, useState } from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { BookOpen, Search, ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

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
                setArticles(data || []);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white rounded-[15px] h-[300px]" />
                    ))
                ) : filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <Link key={article.id} href={`/artigos/${article.slug}`} className="group h-full">
                            <div className="bg-white rounded-[15px] border border-slate-100 shadow-md hover:shadow-xl transition-all h-full overflow-hidden flex flex-col">
                                <div className="relative h-48">
                                    <Image
                                        src={article.image_url || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800"}
                                        alt={article.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.date).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 uppercase">{article.title}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1 leading-relaxed">
                                        {article.subtitle || article.content?.substring(0, 150).replace(/<[^>]*>/g, '') + "..."}
                                    </p>
                                    <div className="flex items-center text-xs font-bold text-slate-700 group-hover:text-emerald-600">
                                        Ler Artigo Inteiro <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                    </div>
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
