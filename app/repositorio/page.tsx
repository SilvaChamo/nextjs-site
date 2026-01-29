"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SearchSection } from "@/components/SearchSection";
import {
    Search, X, Building2,
    User, LandPlot, ShoppingBag, ArrowRight,
    FileText, BookOpen
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function SearchResultsPage() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [counts, setCounts] = useState({
        articles: 0,
        companies: 0,
        products: 0,
        professionals: 0,
        properties: 0,
        documents: 0
    });
    const [previews, setPreviews] = useState<{
        articles: any[],
        companies: any[],
        products: any[],
        professionals: any[],
        properties: any[],
        documents: any[]
    }>({
        articles: [],
        companies: [],
        products: [],
        professionals: [],
        properties: [],
        documents: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const [
                    articlesData,
                    companiesData,
                    productsData,
                    prosData,
                    propsData,
                    docsData
                ] = await Promise.all([
                    supabase.from('articles').select('*').eq('type', 'article').order('date', { ascending: false }).limit(3),
                    supabase.from('companies').select('*').order('created_at', { ascending: false }).limit(4),
                    supabase.from('produtos').select('*, companies(slug)').order('created_at', { ascending: false }).limit(4),
                    supabase.from('professionals').select('*').order('created_at', { ascending: false }).limit(3),
                    supabase.from('properties').select('*').order('created_at', { ascending: false }).limit(3),
                    supabase.from('articles').select('*').eq('type', 'document').order('date', { ascending: false }).limit(3)
                ]);

                // Map products with slugs
                const mappedProducts = (productsData.data || []).map(p => ({
                    ...p,
                    company_slug: p.companies?.slug
                }));

                setPreviews({
                    articles: articlesData.data || [],
                    companies: companiesData.data || [],
                    products: mappedProducts,
                    professionals: prosData.data || [],
                    properties: propsData.data || [],
                    documents: docsData.data || []
                });

                // Fetch real counts
                const [
                    cArticles, cCompanies, cProducts, cPros, cProps, cDocs
                ] = await Promise.all([
                    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('type', 'article'),
                    supabase.from('companies').select('*', { count: 'exact', head: true }),
                    supabase.from('produtos').select('*', { count: 'exact', head: true }),
                    supabase.from('professionals').select('*', { count: 'exact', head: true }),
                    supabase.from('properties').select('*', { count: 'exact', head: true }),
                    supabase.from('articles').select('*', { count: 'exact', head: true }).eq('type', 'document')
                ]);

                setCounts({
                    articles: cArticles.count || 0,
                    companies: cCompanies.count || 0,
                    products: cProducts.count || 0,
                    professionals: cPros.count || 0,
                    properties: cProps.count || 0,
                    documents: cDocs.count || 0
                });
            } catch (error) {
                console.error("Error fetching repository data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const items = [
        {
            title: "Artigos Científicos",
            description: "Teses, dissertações, revistas científicas e pesquisas académicas sobre o agronegócio.",
            count: `${counts.articles} Arquivos`,
            icon: BookOpen,
            bg: "bg-cyan-50",
            color: "text-cyan-600",
            href: "/artigos"
        },
        {
            title: "Directório",
            description: "Lista completa de empresas, cooperativas, associações e parceiros do sector.",
            count: `${counts.companies} Arquivos`,
            icon: Building2,
            bg: "bg-indigo-50",
            color: "text-indigo-600",
            href: "/empresas"
        },
        {
            title: "Produtos",
            description: "Insumos, maquinaria agrícolas, equipamentos e material de segurança.",
            count: `${counts.products} Arquivos`,
            icon: ShoppingBag,
            bg: "bg-emerald-50",
            color: "text-emerald-600",
            href: "/produtos"
        },
        {
            title: "Profissionais",
            description: "Agrónomos, veterinários, técnicos e especialistas prontos para atender.",
            count: `${counts.professionals} Arquivos`,
            icon: User,
            bg: "bg-purple-50",
            color: "text-purple-600",
            href: "/servicos/talentos"
        },
        {
            title: "Propriedades",
            description: "Terrenos, machambas e fazendas prontas para investimento.",
            count: `${counts.properties} Arquivos`,
            icon: LandPlot,
            bg: "bg-orange-50",
            color: "text-orange-600",
            href: "/propriedades"
        },
        {
            title: "Legislação",
            description: "Leis, decretos, regulamentos e documentos oficiais do sector.",
            count: `${counts.documents} Arquivos`,
            icon: FileText,
            bg: "bg-rose-50",
            color: "text-rose-600",
            href: "/documentos"
        }
    ];

    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans relative">
            <div className="relative">
                <PageHeader
                    title="Repositório Digital"
                    backgroundImage="https://images.unsplash.com/photo-1507842217121-9e871299ee18?q=80&w=2000&auto=format&fit=crop"
                    breadcrumbs={[
                        { label: "Início", href: "/" },
                        { label: "Repositório", href: undefined }
                    ]}
                />

                <div className="absolute bottom-6 w-full z-20 pointer-events-none">
                    <div className="container-site mx-auto flex justify-end">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`w-12 h-12 rounded-[7px] flex items-center justify-center transition-all duration-300 shadow-xl pointer-events-auto animate-in fade-in slide-in-from-bottom-8 duration-700 ${isSearchOpen
                                ? "bg-[#f97316] text-white rotate-90 border border-[#f97316]"
                                : "bg-[#22c55e] text-white hover:bg-[#f97316] hover:scale-110"
                                }`}
                        >
                            {isSearchOpen ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <SearchSection isOpen={isSearchOpen} withBottomBorder={true} />

            <main className="max-w-[1350px] mx-auto px-4 md:px-[60px] py-12">

                {/* 1. Quick Directory Section (The Cards) */}
                <div className="mb-20">
                    <div className="mb-8 border-b border-slate-100 pb-4">
                        <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Directório Rápido</h2>
                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Categorias de Consulta</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className={`group p-8 rounded-[15px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative flex flex-col justify-between aspect-[4/3] md:aspect-auto`}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-30 group-hover:bg-emerald-50 transition-colors"></div>
                                <div className={`size-14 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-2 group-hover:text-[#f97316] transition-colors">{item.title}</h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 line-clamp-2">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#f97316] bg-orange-50 px-3 py-1 rounded-full">
                                            {item.count}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#f97316] group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 2. Companies Section - Segmented */}
                <section className="mb-24 scroll-mt-20" id="empresas">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div className="space-y-1">
                            <h2 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Base de Dados</h2>
                            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Empresas & Parceiros</h3>
                        </div>
                        <Link href="/empresas" className="text-xs font-black text-slate-400 hover:text-[#f97316] uppercase tracking-widest flex items-center gap-2 transition-all">
                            Ver todas as empresas <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-white animate-pulse rounded-2xl border border-slate-100" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {previews.companies.map((company) => (
                                <Link key={company.id} href={`/empresas/${company.slug}`} className="group p-6 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all text-center flex flex-col items-center">
                                    <div className="size-20 bg-slate-50 rounded-2xl mb-4 p-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                                        {company.logo_url ? (
                                            <img src={company.logo_url} alt={company.company_name} className="max-w-full max-h-full object-contain" />
                                        ) : (
                                            <Building2 className="w-8 h-8 text-slate-300" />
                                        )}
                                    </div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-1 line-clamp-1">{company.company_name}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{company.category || "Consultoria"}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* 3. Products Section - Segmented */}
                <section className="mb-24 scroll-mt-20" id="produtos">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div className="space-y-1">
                            <h2 className="text-[10px] font-black text-[#f97316] uppercase tracking-widest">Catálogo Digital</h2>
                            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Insumos & Equipamentos</h3>
                        </div>
                        <Link href="/produtos" className="text-xs font-black text-slate-400 hover:text-emerald-600 uppercase tracking-widest flex items-center gap-2 transition-all">
                            Explorar marketplace <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-2xl border border-slate-100" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {previews.products.map((product) => (
                                <Link
                                    key={product.id}
                                    href={product.company_slug ? `/empresas/${product.company_slug}/produto/${slugify(product.nome || product.name)}` : "/produtos"}
                                    className="group bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
                                >
                                    <div className="h-40 relative">
                                        <img src={product.image_url || "https://images.unsplash.com/photo-1595152248447-c93d5006b00b?q=80&w=400"} alt={product.nome} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-black text-emerald-600">
                                            {product.preco || "Consulta"}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight line-clamp-1">{product.nome || product.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{product.category || "Insumo"}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* 4. Professionals Section - Segmented */}
                <section className="mb-24 scroll-mt-20" id="talentos">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div className="space-y-1">
                            <h2 className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Capital Humano</h2>
                            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Especialistas & Técnicos</h3>
                        </div>
                        <Link href="/servicos/talentos" className="text-xs font-black text-slate-400 hover:text-purple-600 uppercase tracking-widest flex items-center gap-2 transition-all">
                            Ver todos os talentos <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white animate-pulse rounded-2xl border border-slate-100" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {previews.professionals.map((pro) => (
                                <div key={pro.id} className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                                    <div className="size-16 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-50 shrink-0">
                                        <img src={pro.photo_url || "https://images.unsplash.com/photo-1595152248447-c93d5006b00b?q=80&w=100"} alt={pro.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{pro.name}</h4>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-[#f97316]">{pro.role || pro.specialty}</p>
                                        <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                                            <LandPlot className="w-3 h-3 text-rose-500" />
                                            {pro.location || pro.province}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* 5. Scientific Articles Section */}
                <section className="mb-24 scroll-mt-20" id="artigos">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div className="space-y-1">
                            <h2 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">Inteligência</h2>
                            <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">Artigos Científicos</h3>
                        </div>
                        <Link href="/artigos" className="text-xs font-black text-slate-400 hover:text-cyan-600 uppercase tracking-widest flex items-center gap-2 transition-all">
                            Portal científico <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white animate-pulse rounded-2xl border border-slate-100" />)}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {previews.articles.map((art) => (
                                <Link key={art.id} href={`/artigos/${art.slug}`} className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="size-12 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors shrink-0">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-base font-bold text-slate-800 line-clamp-1 group-hover:text-cyan-600 transition-colors uppercase">{art.title}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{art.author} — {art.source}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase px-3 py-1 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                                        Ver Detalhes
                                    </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                {/* 6. Documents & Properties Section Combined */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-slate-100">
                    <section>
                        <div className="flex items-end justify-between mb-8">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Leis & Documentos</h3>
                            <Link href="/documentos" className="text-[10px] font-black text-[#f97316] uppercase tracking-widest">Ver Todos</Link>
                        </div>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => <div key={i} className="h-12 bg-white animate-pulse rounded-xl border border-slate-50" />)}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {previews.documents.map(doc => (
                                    <Link key={doc.id} href={`/artigos/${doc.slug}`} className="flex items-center gap-4 p-4 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100">
                                        <div className="bg-slate-100 size-10 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 line-clamp-2 uppercase leading-tight font-sans tracking-tight">{doc.title}</p>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>

                    <section>
                        <div className="flex items-end justify-between mb-8">
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Imóveis & Terras</h3>
                            <Link href="/propriedades" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Ver Todos</Link>
                        </div>
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white animate-pulse rounded-xl border border-slate-50" />)}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {previews.properties.map(p => (
                                    <Link key={p.id} href={`/propriedades?q=${encodeURIComponent(p.title)}`} className="flex items-center gap-4 group">
                                        <div className="size-20 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                                            <img src={p.image_url || "https://images.unsplash.com/photo-1500382017468-9049fee74a62?q=80&w=200"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-800 uppercase line-clamp-1">{p.title}</p>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">{p.location || "Gaza"}</p>
                                            <p className="text-xs font-black text-emerald-600 mt-1">{p.price ? `${p.price} MT` : "Consulta"}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

            </main>
        </div>
    );
}
