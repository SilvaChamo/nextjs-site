"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import {
    Calendar, Clock, ArrowRight, Search,
    Filter, ChevronRight, Tag, Newspaper,
    ThumbsUp, MessageCircle, RefreshCw, FileText, FolderOpen
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { WeatherSidebar } from "@/components/WeatherSidebar";
import { NewsletterCard } from "@/components/NewsletterCard";
import { NewsCard } from "@/components/NewsCard";

function BlogContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const supabase = createClient();

    const [articles, setArticles] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [activeTab, setActiveTab] = useState("noticias");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const cat = searchParams?.get('cat');
        if (cat) {
            setActiveCategory(cat);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            try {
                console.log("Fetching content from blog page...");
                
                // Fetch news articles (exclude all document types)
                const { data: articlesData, error: articlesError } = await supabase
                    .from('articles')
                    .select('id, title, subtitle, image_url, date, slug, type')
                    .is('deleted_at', null)
                    .not('type', 'in', '("document", "Relatório", "PDF", "Documento")')
                    .order('date', { ascending: false });

                // Fetch documents (all document types)
                const { data: documentsData, error: documentsError } = await supabase
                    .from('articles')
                    .select('id, title, subtitle, image_url, date, slug, type')
                    .is('deleted_at', null)
                    .in('type', '("document", "Relatório", "PDF", "Documento")')
                    .order('date', { ascending: false });

                if (articlesError) {
                    console.error("Articles error:", articlesError);
                    throw articlesError;
                }
                
                if (documentsError) {
                    console.error("Documents error:", documentsError);
                    throw documentsError;
                }
                
                console.log("Articles fetched:", articlesData?.length || 0);
                console.log("Documents fetched:", documentsData?.length || 0);
                setArticles(articlesData || []);
                setDocuments(documentsData || []);
            } catch (error) {
                console.error("Error fetching content:", error);
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        };

        fetchContent();
        
        // Add refresh interval to ensure data is current
        const interval = setInterval(fetchContent, 30000); // Refresh every 30 seconds
        
        return () => clearInterval(interval);
    }, []);

    const manualRefresh = async () => {
        setRefreshing(true);
        try {
            console.log("Manual refresh triggered...");
            
            // Refresh articles (exclude all document types)
            const { data: articlesData, error: articlesError } = await supabase
                .from('articles')
                .select('id, title, subtitle, image_url, date, slug, type')
                .is('deleted_at', null)
                .not('type', 'in', '("document", "Relatório", "PDF", "Documento")')
                .order('date', { ascending: false })
                .abortSignal(new AbortController().signal);

            // Refresh documents (all document types)
            const { data: documentsData, error: documentsError } = await supabase
                .from('articles')
                .select('id, title, subtitle, image_url, date, slug, type')
                .is('deleted_at', null)
                .in('type', '("document", "Relatório", "PDF", "Documento")')
                .order('date', { ascending: false })
                .abortSignal(new AbortController().signal);

            if (articlesError) {
                console.error("Manual refresh articles error:", articlesError);
                throw articlesError;
            }
            
            if (documentsError) {
                console.error("Manual refresh documents error:", documentsError);
                throw documentsError;
            }
            
            console.log("Manual refresh - Articles fetched:", articlesData?.length || 0);
            console.log("Manual refresh - Documents fetched:", documentsData?.length || 0);
            setArticles(articlesData || []);
            setDocuments(documentsData || []);
        } catch (error) {
            console.error("Manual refresh failed:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = activeCategory === "Todos" || article.type === activeCategory;

        return matchesSearch && matchesCategory;
    });

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesSearch;
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

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">


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
                    <div className="flex gap-3 items-center">
                        <button
                            onClick={manualRefresh}
                            disabled={refreshing}
                            className="bg-white border border-slate-200 rounded-[8px] p-3 text-slate-500 hover:border-[#f97316] hover:text-[#f97316] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Atualizar conteúdo"
                        >
                            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit">
                    <button
                        onClick={() => setActiveTab("noticias")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                            activeTab === "noticias"
                                ? "bg-emerald-600 text-white shadow-lg"
                                : "text-slate-500 hover:bg-slate-50"
                        }`}
                    >
                        <Newspaper className="w-4 h-4" />
                        Notícias
                    </button>
                    <button
                        onClick={() => setActiveTab("documentos")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                            activeTab === "documentos"
                                ? "bg-emerald-600 text-white shadow-lg"
                                : "text-slate-500 hover:bg-slate-50"
                        }`}
                    >
                        <FolderOpen className="w-4 h-4" />
                        Documentos
                    </button>
                </div>

                {/* Category Filter - Only show for news */}
                {activeTab === "noticias" && (
                    <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
                        {["Todos", "Guia", "Notícia", "Internacional", "Recursos", "Artigo Técnico", "Oportunidade", "Evento"].map((tag, i) => (
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
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        {/* Content based on active tab */}
                        {activeTab === "noticias" ? (
                            /* News Articles */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredArticles.map((article, i) => (
                                    <NewsCard
                                        key={i}
                                        title={article.title}
                                        subtitle={article.subtitle}
                                        category={article.type}
                                        date={article.date}
                                        image={article.image_url}
                                        slug={article.slug}
                                    />
                                ))}
                            </div>
                        ) : (
                            /* Documents */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filteredDocuments.map((doc, i) => (
                                    <NewsCard
                                        key={i}
                                        title={doc.title}
                                        subtitle={doc.subtitle}
                                        category={doc.type}
                                        date={doc.date}
                                        image={doc.image_url}
                                        slug={doc.slug}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {((activeTab === "noticias" && filteredArticles.length === 0) || 
                          (activeTab === "documentos" && filteredDocuments.length === 0)) && (
                            <div className="text-center py-20">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                        {activeTab === "noticias" ? (
                                            <Newspaper className="w-8 h-8 text-slate-400" />
                                        ) : (
                                            <FolderOpen className="w-8 h-8 text-slate-400" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-700">
                                        {activeTab === "noticias" ? "Nenhuma notícia encontrada" : "Nenhum documento encontrado"}
                                    </h3>
                                    <p className="text-slate-500 max-w-md">
                                        {activeTab === "noticias" 
                                            ? "Não há notícias correspondentes aos filtros selecionados."
                                            : "Não há documentos disponíveis no momento."
                                        }
                                    </p>
                                </div>
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
