"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import {
    Calendar, Clock, ArrowRight, Search,
    Filter, ChevronRight, Tag, Newspaper,
    ThumbsUp, MessageCircle
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { WeatherSidebar } from "@/components/WeatherSidebar";
import { NewsletterCard } from "@/components/NewsletterCard";

function BlogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Todos");

    useEffect(() => {
        const cat = searchParams?.get('cat');
        if (cat) {
            setActiveCategory(cat);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('id, title, subtitle, image_url, date, slug, type')
                    .neq('type', 'document')
                    .order('date', { ascending: false });

                if (error) throw error;
                setArticles(data || []);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = activeCategory === "Todos" || article.type === activeCategory;

        return matchesSearch && matchesCategory;
    });



    const handleCategoryClick = (cat: string) => {
        setActiveCategory(cat);
        // Update URL without reloading
        const params = new URLSearchParams(window.location.search);
        if (cat === "Todos") params.delete('cat');
        else params.set('cat', cat);
        router.push(`/blog?${params.toString()}`, { scroll: false });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center pt-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Actualizando o Blog do Agro...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fcfcfd]">
            <PageHeader
                title={<>Blog do <span className="text-[#f97316]">Agro</span></>}
                icon={Newspaper}
                backgroundImage="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Blog", href: undefined }
                ]}
            />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 py-16">


                <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
                    <div className="relative w-full md:max-w-[640px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#f97316] transition-colors" />
                        <input
                            type="text"
                            placeholder="Pesquisar artigos..."
                            className="w-full bg-white border border-slate-200 rounded-[10px] pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] shadow-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        {["Todos", "Técnico", "Mercado", "Comunidade"].map((tag, i) => (
                            <button
                                key={i}
                                onClick={() => handleCategoryClick(tag)}
                                className={`px-5 py-2.5 rounded-[8px] text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap shadow-sm border ${activeCategory === tag
                                    ? "bg-emerald-600 text-white border-emerald-600"
                                    : "bg-white text-slate-500 border-slate-200 hover:border-[#f97316] hover:text-[#f97316]"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>



                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredArticles.map((article, i) => (
                                <Link key={i} href={`/artigos/${article.slug}`} className="group flex flex-col h-full bg-white rounded-[15px] shadow-lg border border-slate-100 hover:border-[#f97316] transition-all overflow-hidden">
                                    <div className="relative aspect-[16/10] overflow-hidden">
                                        <Image
                                            src={article.image_url || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop"}
                                            alt={article.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 left-4 bg-[#f97316] text-white text-[10px] font-black uppercase px-3 py-1 rounded-[5px]">
                                            {article.type || "Artigo"}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                                                <Calendar className="w-3 h-3 text-[#f97316]" />
                                                <span>{new Date(article.date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }).replace('.', '').replace(' de ', ' ')}</span>
                                            </div>
                                            <h3 className="text-lg font-black text-slate-600 group-hover:text-[#f97316] transition-colors line-clamp-2 first-letter:uppercase lowercase my-0" suppressHydrationWarning>
                                                <span>{article.title}</span>
                                            </h3>
                                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                                                {article.subtitle}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 group-hover:text-[#f97316] transition-colors mt-auto pt-6">
                                            Explorar <ArrowRight className="h-3 w-3" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredArticles.length === 0 && (
                            <div className="text-center py-32 bg-white rounded-[15px] border border-dashed border-slate-200">
                                <Search className="w-12 h-12 text-slate-200 mx-auto mb-6" />
                                <h3 className="text-xl font-black text-slate-600 mb-2">Sem resultados para sua busca</h3>
                                <p className="text-slate-400">Tente pesquisar por outros termos ou categorias.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setActiveCategory("Todos"); }}
                                    className="mt-8 text-emerald-600 font-bold hover:underline"
                                >
                                    Limpar pesquisa
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-3 space-y-5 sticky top-32 hidden lg:block">

                        {/* 2. Clima */}
                        <WeatherSidebar />

                        {/* 3. Newsletter */}
                        <NewsletterCard />

                        {/* 4. Publicidade */}
                        <div className="relative aspect-[4/5] rounded-[15px] overflow-hidden group shadow-xl border border-emerald-500/20 bg-emerald-600 p-5">
                            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            <div className="absolute top-0 right-0 size-32 bg-emerald-400/20 blur-3xl rounded-full -mr-16 -mt-16"></div>

                            <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                <p className="text-emerald-100 text-[10px] font-black uppercase tracking-widest mb-2">Publicidade</p>
                                <h4 className="text-white font-black text-xl mb-6 leading-tight">Sua marca aqui em destaque no blog</h4>
                                <Link href="/contactos">
                                    <button className="bg-white text-emerald-700 px-8 py-4 rounded-[10px] text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-all font-bold shadow-lg">Anunciar Agora</button>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default function BlogListingPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <BlogContent />
        </Suspense>
    );
}
