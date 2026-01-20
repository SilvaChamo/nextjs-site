"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Building2, ShoppingBag, Users, FileText, LandPlot, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SEARCH_DATA } from "@/lib/constants";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface SearchSectionProps {
    isOpen: boolean;
}

export function SearchSection({ isOpen }: SearchSectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const categories = [
        { id: "all", label: "Todas categorias", icon: Search },
        { id: "empresas", label: "Empresas", icon: Building2 },
        { id: "produtos", label: "Produtos", icon: ShoppingBag },
        { id: "profissionais", label: "Profissionais", icon: Users },
        { id: "propriedades", label: "Propriedades", icon: LandPlot },
        { id: "artigos", label: "Artigos", icon: FileText },
    ];

    const currentCat = categories.find(c => c.id === activeCategory) || categories[0];

    const filteredResults = React.useMemo(() => {
        if (!searchQuery) return null;
        const query = searchQuery.toLowerCase();

        const filterData = (data: any[]) => data ? data.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.sub.toLowerCase().includes(query)
        ) : [];

        const result: any = {
            produtos: activeCategory === "all" || activeCategory === "produtos" ? filterData(SEARCH_DATA.produtos) : [],
            profissionais: activeCategory === "all" || activeCategory === "profissionais" ? filterData(SEARCH_DATA.profissionais) : [],
            empresas: activeCategory === "all" || activeCategory === "empresas" ? filterData(SEARCH_DATA.empresas) : [],
            artigos: activeCategory === "all" || activeCategory === "artigos" ? filterData(SEARCH_DATA.artigos) : [],
            propriedades: activeCategory === "all" || activeCategory === "propriedades" ? filterData((SEARCH_DATA as any).propriedades || []) : []
        };

        const totalCount = result.produtos.length + result.profissionais.length + result.empresas.length + result.artigos.length + result.propriedades.length;
        return totalCount > 0 ? result : null;
    }, [searchQuery, activeCategory]);

    return (
        <section className={`w-full bg-white relative overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "max-h-[2000px] opacity-100 py-[20px]" : "max-h-0 opacity-0 py-0"}`}>
            <div className={`transition-all duration-700 delay-100 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
                {/* Search Bar Container - Google Style Refined */}
                <div className="w-full px-4 md:px-[60px]">
                    <div className="max-w-3xl mx-auto relative z-20">
                        <div className="relative">
                            <div className="relative bg-white rounded-[10px] shadow-sm h-14 flex items-center border border-gray-200 transition-all duration-300">

                                <div className="pl-6 text-gray-400">
                                    <Search className="h-5 w-5" />
                                </div>

                                <Input
                                    className="border-none shadow-none focus-visible:ring-0 text-base h-full bg-transparent placeholder:text-gray-400 flex-1 px-4"
                                    placeholder="O que procura hoje?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />

                                {/* Category Selector inside Search Bar (RIGHT SIDE) */}
                                <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
                                    <PopoverTrigger asChild>
                                        <button className="flex items-center gap-2 px-6 h-full border-l border-gray-100 hover:bg-gray-50 transition-colors rounded-r-full group">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:block whitespace-nowrap">
                                                {currentCat.label}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56 p-2 rounded-2xl shadow-2xl border-gray-100" align="end">
                                        <div className="space-y-1">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => {
                                                        setActiveCategory(cat.id);
                                                        setIsCategoryOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === cat.id
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "text-gray-500 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <cat.icon className="h-4 w-4" />
                                                        {cat.label}
                                                    </div>
                                                    {activeCategory === cat.id && <Check className="h-3 w-3" />}
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>

                {searchQuery && (
                    <div className="max-w-[1350px] mx-auto animate-in slide-in-from-bottom-4 duration-700 px-[60px] pb-24 mt-16">
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="text-3xl font-heading font-bold text-slate-600 uppercase">Motor do Acervo</h2>
                            <span className="text-gray-300 text-3xl">/</span>
                            <span className="text-[#f97316] text-xl font-bold uppercase">"{searchQuery}"</span>
                        </div>

                        {!filteredResults ? (
                            <div className="text-center py-20 text-gray-400">
                                <p className="text-xl">Nenhum resultado encontrado no centro de dados.</p>
                            </div>
                        ) : (
                            <div className="space-y-16">
                                {filteredResults.empresas.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] border-l-4 border-slate-200 pl-4">Centro de Empresas</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredResults.empresas.map((item: any, i: number) => (
                                                <SearchResultCard key={i} item={item} colorClass="bg-emerald-50 text-emerald-600" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {filteredResults.propriedades.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-black text-amber-900/40 uppercase tracking-[0.3em] border-l-4 border-amber-500 pl-4">Acervo de Propriedades</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredResults.propriedades.map((item: any, i: number) => (
                                                <SearchResultCard key={i} item={item} colorClass="bg-amber-50 text-amber-600" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {filteredResults.produtos.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-black text-orange-900/40 uppercase tracking-[0.3em] border-l-4 border-[#f97316] pl-4">Catálogo de Produtos</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredResults.produtos.map((item: any, i: number) => (
                                                <SearchResultCard key={i} item={item} colorClass="bg-orange-50 text-[#f97316]" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {filteredResults.profissionais.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-black text-blue-900/40 uppercase tracking-[0.3em] border-l-4 border-blue-500 pl-4">Base de Profissionais</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredResults.profissionais.map((item: any, i: number) => (
                                                <SearchResultCard key={i} item={item} colorClass="bg-blue-50 text-blue-600" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {filteredResults.artigos.length > 0 && (
                                    <div className="space-y-6">
                                        <h3 className="text-sm font-black text-gray-900/40 uppercase tracking-[0.3em] border-l-4 border-gray-500 pl-4">Artigos Diversos</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {filteredResults.artigos.map((item: any, i: number) => (
                                                <SearchResultCard key={i} item={item} colorClass="bg-gray-50 text-gray-600" />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

function SearchResultCard({ item, colorClass }: { item: any, colorClass: string }) {
    const Icon = item.icon;
    // Determine the link based on category or item type
    const href = item.id ? `/detalhes/${item.id}` : "#";

    return (
        <Link href={href} className="block">
            <div className="bg-white border border-gray-100 p-4 rounded-[10px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 group">
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${colorClass} group-hover:bg-gray-900 group-hover:text-white`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-slate-600 text-base leading-tight group-hover:text-[#f97316] transition-colors">{item.title}</h4>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold mt-0.5">{item.sub}</p>
                </div>
            </div>
        </Link>
    );
}
