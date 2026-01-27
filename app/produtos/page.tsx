"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { ShoppingBag, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

// DEMO FALLBACK DATA
const FALLBACK_PRODUCTS_MAP: Record<string, any[]> = {
    '99999999-9999-9999-9999-999999999991': [
        { id: 'f1', nome: "MILHO", preco: "120 MT/kg", category: "INSUMO", image_url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800", description: "Descrição de alta qualidade para este insumo agrícola.", available: true },
        { id: 'f2', nome: "ARROZ", preco: "95.5 MT/kg", category: "INSUMO", image_url: "https://images.unsplash.com/photo-1586201327693-86619dadb279?q=80&w=800", description: "Descrição de alta qualidade para este insumo agrícola.", available: true },
        { id: 'f3', nome: "FEIJÃO", preco: "150 MT/kg", category: "INSUMO", image_url: "/images/Prototipo/feijao.jpg", description: "Descrição de alta qualidade para este insumo agrícola.", available: true },
        { id: 'f3b', nome: "CAJU", preco: "450 MT/kg", category: "PROCESSADO", image_url: "/images/Prototipo/caju.webp", description: "Castanha de caju de alta qualidade.", available: true },
    ],
    '99999999-9999-9999-9999-999999999992': [
        { id: 'f4', nome: "FEIJÃO", preco: "150 MT/kg", category: "INSUMO", image_url: "/images/Prototipo/feijao.jpg", description: "Descrição de alta qualidade para este insumo agrícola.", available: true },
        { id: 'f5', nome: "MILHO", preco: "120 MT/kg", category: "INSUMO", image_url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800", description: "Descrição de alta qualidade para este insumo agrícola.", available: true },
        { id: 'f5b', nome: "ARROZ", preco: "95.5 MT/kg", category: "INSUMO", image_url: "https://images.unsplash.com/photo-1586201327693-86619dadb279?q=80&w=800", description: "Descrição de alta qualidade para este insumo agrícola.", available: true },
        { id: 'f5c', nome: "SOJA", preco: "85 MT/kg", category: "CEREAL", image_url: "https://images.unsplash.com/photo-1582284540020-8acaf01f344a?q=80&w=800", description: "Soja de alta qualidade para processamento.", available: true },
    ],
    '99999999-9999-9999-9999-999999999993': [
        { id: 'f6', nome: "ARROZ", preco: "95.5 MT/kg", category: "INSUMO", image_url: "https://images.unsplash.com/photo-1586201327693-86619dadb279?q=80&w=800", description: "Descrição de alta qualidade para este insumo agrícola.", available: true },
        { id: 'f6b', nome: "TOMATE", preco: "45 MT/kg", category: "HORTA", image_url: "https://images.unsplash.com/photo-1582284540020-8acaf01f344a?q=80&w=800", description: "Tomates frescos do vale.", available: true },
        { id: 'f6c', nome: "CEBOLA", preco: "30 MT/kg", category: "HORTA", image_url: "https://images.unsplash.com/photo-1580201092675-a0bc6bd6c317?q=80&w=800", description: "Cebolas selecionadas.", available: true },
        { id: 'f6d', nome: "PIMENTÃO", preco: "55 MT/kg", category: "HORTA", image_url: "https://images.unsplash.com/photo-1566385101042-1a0f08154b9d?q=80&w=800", description: "Pimentões coloridos e frescos.", available: true },
    ]
};

const FALLBACK_COMPANY_NAMES: Record<string, string> = {
    '99999999-9999-9999-9999-999999999991': "Agro-Indústria Zambézia",
    '99999999-9999-9999-9999-999999999992': "Cooperativa do Norte",
    '99999999-9999-9999-9999-999999999993': "Hortas do Vale"
};

const FALLBACK_COMPANY_SLUGS: Record<string, string> = {
    '99999999-9999-9999-9999-999999999991': "agro-industria-zambezia",
    '99999999-9999-9999-9999-999999999992': "cooperativa-do-norte",
    '99999999-9999-9999-9999-999999999993': "hortas-do-vale"
};

function ProductsContent() {
    const searchParams = useSearchParams();
    const empresaId = searchParams.get("empresa_id");
    const professionalId = searchParams.get("professional_id");
    const initialQuery = searchParams.get("q") || "";

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [contextName, setContextName] = useState<string | null>(null);

    const slugify = (text: string) => (text || "").toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let allItems: any[] = [];
                let cName: string | null = null;

                // 1. Handle Context Name and JSONB/Fallback data
                if (empresaId) {
                    // Check fallbacks first
                    if (FALLBACK_COMPANY_NAMES[empresaId]) {
                        cName = FALLBACK_COMPANY_NAMES[empresaId];
                        const cSlug = FALLBACK_COMPANY_SLUGS[empresaId];
                        allItems = FALLBACK_PRODUCTS_MAP[empresaId].map(p => ({ ...p, company_slug: cSlug }));
                    } else {
                        // Real DB fetch
                        const { data: company } = await supabase
                            .from('companies')
                            .select('name, slug, products')
                            .eq('id', empresaId)
                            .single();

                        if (company) {
                            cName = company.name;
                            if (Array.isArray(company.products)) {
                                const jsonProducts = company.products.map((p: any) => ({
                                    ...p,
                                    id: `json-${Math.random()}`,
                                    nome: p.name || p.nome || "Produto",
                                    preco: p.price || p.preco || "Sob Consulta",
                                    image_url: p.img || p.photo || p.image_url || "https://images.unsplash.com/photo-1595152248447-c93d5006b00b?q=80&w=400",
                                    category: p.category || "Destaque",
                                    company_slug: company.slug
                                }));
                                allItems = [...allItems, ...jsonProducts];
                            }
                        }
                    }
                } else if (professionalId) {
                    const { data: pro } = await supabase
                        .from('professionals')
                        .select('name')
                        .eq('id', professionalId)
                        .single();
                    if (pro) cName = pro.name;
                } else {
                    // Global Marketplace - Add all fallbacks for demo purposes
                    Object.keys(FALLBACK_PRODUCTS_MAP).forEach(cId => {
                        const cSlug = FALLBACK_COMPANY_SLUGS[cId];
                        const productsWithSlug = FALLBACK_PRODUCTS_MAP[cId].map(p => ({
                            ...p,
                            company_slug: cSlug
                        }));
                        allItems = [...allItems, ...productsWithSlug];
                    });
                }

                setContextName(cName);

                // 2. Fetch Products from main DB table
                let query = supabase.from('produtos').select('*, companies(slug)');

                if (empresaId) {
                    query = query.eq('empresa_id', empresaId);
                } else if (professionalId) {
                    query = query.eq('professional_id', professionalId);
                }

                const { data, error } = await query;
                if (!error && data) {
                    // Merge DB products, avoiding duplicates by name if they came from JSONB too
                    const dbProducts = data.map(p => ({
                        ...p,
                        // Ensure key fields are mapped for consistency
                        nome: p.nome || p.name,
                        preco: p.preco || p.price,
                        company_slug: Array.isArray(p.companies) ? p.companies[0]?.slug : (p.companies?.slug || p.company_slug)
                    }));

                    // Simple merge for now
                    allItems = [...allItems, ...dbProducts];
                }

                setProducts(allItems);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [empresaId, professionalId]);

    const filteredProducts = products.filter(p =>
        (p.nome || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const pageTitle = contextName ? `Produtos de ${contextName}` : "Mercado de Produtos";

    return (
        <StandardBlogTemplate
            title={pageTitle}
            backgroundImage="https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=2000&auto=format&fit=crop"
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Repositório", href: "/repositorio" },
                { label: contextName ? "Produtos" : "Mercado", href: contextName ? "/produtos" : undefined },
                { label: contextName || "Ver Todos", href: undefined }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">Procurar</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="O que você procura?"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                    </div>

                    {contextName && (
                        <Link href="/produtos" className="block p-4 bg-slate-50 border border-slate-200 rounded-[10px] text-center text-xs font-black uppercase text-slate-500 hover:bg-slate-100 transition-colors">
                            Ver Todos os Produtos
                        </Link>
                    )}
                </div>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white rounded-[15px] h-[300px]" />
                    ))
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product, i) => {
                        const resolvedCompanySlug = product.company_slug || (empresaId && FALLBACK_COMPANY_SLUGS[empresaId]);
                        const prodUrl = resolvedCompanySlug
                            ? `/empresas/${resolvedCompanySlug}/produto/${slugify(product.nome || product.name)}`
                            : "#";

                        return (
                            <Link
                                key={product.id || i}
                                href={prodUrl}
                                className="group bg-white rounded-agro border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full cursor-pointer"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={product.image_url || product.img || product.photo || "https://images.unsplash.com/photo-1595152248447-c93d5006b00b?q=80&w=400"}
                                        alt={product.nome}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[9px] font-black text-emerald-600 uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
                                        {product.category || "Insumo"}
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-[17px] font-black text-slate-800 mb-1 uppercase tracking-tight line-clamp-1">{product.nome}</h3>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed mb-2 line-clamp-2">
                                        {product.description || "Descrição de alta qualidade para este insumo agrícola."}
                                    </p>

                                    <div>
                                        <div className="text-emerald-600 font-black text-[18px] mb-1.5">
                                            {product.preco || product.price ? `${product.preco || product.price}` : "Sob Consulta"}
                                        </div>

                                        <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                                            <div className="text-[11px] font-black uppercase tracking-wider text-[#f97316] flex items-center gap-1 group-hover:gap-2 transition-all">
                                                DETALHES <ArrowRight className="w-3.5 h-3.5" />
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${product.available !== false ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${product.available !== false ? 'text-emerald-500' : 'text-red-500'}`}>
                                                    {product.available !== false ? 'Disponível' : 'Indisponível'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center text-slate-400 bg-white rounded-[20px] border border-dashed border-slate-100">
                        <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="font-medium text-sm">Nenhum produto encontrado nesta categoria.</p>
                    </div>
                )}
            </div>
        </StandardBlogTemplate>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 animate-pulse" />}>
            <ProductsContent />
        </Suspense>
    );
}
