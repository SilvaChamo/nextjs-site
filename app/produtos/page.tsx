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
        { id: 'f1', nome: "MILHO HÍBRIDO", preco: "120 MT/kg", category: "INSUMO", image_url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800", description: "Sementes de milho de alta produtividade para zonas secas.", available: true },
        { id: 'f2', nome: "NPK 12-24-12", preco: "3500 MT/50kg", category: "INSUMO", image_url: "https://images.unsplash.com/photo-1628173516104-aa263884cb95?q=80&w=800", description: "Adubo composto para base de culturas alimentares.", available: true },
        { id: 'f3', nome: "CALCÁRIO", preco: "1500 MT/Tona", category: "INSUMO", image_url: "https://images.unsplash.com/photo-1587049488737-2954a7f92021?q=80&w=800", description: "Corretivo de acidez de solo de acção rápida.", available: true },
    ],
    '99999999-9999-9999-9999-999999999992': [
        { id: 't1', nome: "DRONE AGRAS T40", preco: "Sob Consulta", category: "TECNOLOGIA", image_url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800", description: "Drone de pulverização e mapeamento agrícola.", available: true },
        { id: 't2', nome: "SENSOR DE SOLO IOT", preco: "15.000 MT", category: "TECNOLOGIA", image_url: "https://images.unsplash.com/photo-1581093588401-fbb0739829ff?q=80&w=800", description: "Monitoramento em tempo real de humidade e nutrientes.", available: true },
        { id: 't3', nome: "GPS AGRÍCOLA", preco: "45.000 MT", category: "TECNOLOGIA", image_url: "https://images.unsplash.com/photo-1595166687295-8a24558e8055?q=80&w=800", description: "Sistema de orientação para tratores.", available: true },
    ],
    '99999999-9999-9999-9999-999999999993': [
        { id: 'fin1', nome: "CRÉDITO CAMPANHA", preco: "Taxa 12%", category: "FINANCIAMENTO", image_url: "https://images.unsplash.com/photo-1554224155-972d256ebe27?q=80&w=800", description: "Financiamento para insumos e sementes.", available: true },
        { id: 'fin2', nome: "SEGURO COLHEITA", preco: "2% do Valor", category: "FINANCIAMENTO", image_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800", description: "Proteção contra secas e inundações.", available: true },
        { id: 'tur1', nome: "FAZENDA ECO-RESORT", preco: "5.000 MT/Noite", category: "TURISMO", image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800", description: "Experiência de agro-turismo em Gaza.", available: true },
    ]
};

const FALLBACK_COMPANY_NAMES: Record<string, string> = {
    '99999999-9999-9999-9999-999999999991': "Casa do Agricultor",
    '99999999-9999-9999-9999-999999999992': "AgroTech Moz",
    '99999999-9999-9999-9999-999999999993': "Banco Verde"
};

const FALLBACK_COMPANY_SLUGS: Record<string, string> = {
    '99999999-9999-9999-9999-999999999991': "casa-do-agricultor",
    '99999999-9999-9999-9999-999999999992': "agrotech-moz",
    '99999999-9999-9999-9999-999999999993': "banco-verde"
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

    const filteredProducts = products.filter(p => {
        const query = searchQuery.toLowerCase();
        // Strict category filtering for main navigation links
        if (query === 'insumo' || query === 'insumos') {
            return (p.category || "").toLowerCase() === 'insumo';
        }
        if (query === 'tecnologia' || query === 'tecnologias') {
            return (p.category || "").toLowerCase() === 'tecnologia';
        }
        if (query === 'financiamento') {
            return (p.category || "").toLowerCase() === 'financiamento';
        }
        if (query === 'turismo') {
            return (p.category || "").toLowerCase() === 'turismo';
        }

        // Default broad search
        return (p.nome || "").toLowerCase().includes(query) ||
            (p.category || "").toLowerCase().includes(query) ||
            (p.description || "").toLowerCase().includes(query);
    });

    const pageTitle = contextName ? `Produtos de ${contextName}` :
        (searchQuery === 'insumo' ? 'Insumos Agrários' :
            searchQuery === 'tecnologia' ? 'Tecnologias Agrárias' :
                searchQuery === 'financiamento' ? 'Financiamento Agrário' :
                    searchQuery === 'turismo' ? 'Turismo Rural' :
                        "Mercado de Produtos");

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
