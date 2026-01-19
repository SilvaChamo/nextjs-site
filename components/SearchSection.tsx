"use client";

import React, { useState } from "react";
import { Search, Sparkles, Building2, ShoppingBag, Users, FileText, LandPlot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SEARCH_DATA } from "@/lib/constants";

export function SearchSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const categories = [
        { id: "all", label: "Tudo", icon: Search },
        { id: "empresas", label: "Empresas", icon: Building2 },
        { id: "produtos", label: "Produtos", icon: ShoppingBag },
        { id: "profissionais", label: "Profissionais", icon: Users },
        { id: "propriedades", label: "Propriedades", icon: LandPlot },
        { id: "artigos", label: "Artigos", icon: FileText },
    ];

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
        <section className="w-full bg-white relative pb-0">
            {/* Search Bar Container - Google Style */}
            <div className="w-full px-6 md:px-12 pt-0 pb-12 bg-white">
                <div className="max-w-3xl mx-auto -mt-10 relative z-20 space-y-4">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gray-200 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                        <div className="relative bg-white rounded-full shadow-lg h-12 flex items-center border border-gray-200 hover:shadow-xl transition-all duration-300">
                            <div className="pl-5 text-gray-400">
                                <Search className="h-5 w-5" />
                            </div>
                            <Input
                                className="border-none shadow-none focus-visible:ring-0 text-base h-full bg-transparent placeholder:text-gray-400 flex-1"
                                placeholder="Pesquise por IA ou por categorias..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="pr-2 flex items-center gap-1">
                                <button
                                    className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 h-8 px-4 rounded-full font-bold text-[10px] uppercase tracking-wider transition-all border border-emerald-100"
                                    title="Busca com Inteligência Artificial"
                                >
                                    <Sparkles className="h-3 w-3" />
                                    <span>IA Search</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all border ${activeCategory === cat.id
                                        ? "bg-gray-900 text-white border-gray-900 shadow-md"
                                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                                    }`}
                            >
                                <cat.icon className="h-3 w-3" />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {searchQuery && (
                <div className="max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-700 px-6 md:px-12 pb-24">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="text-3xl font-heading font-bold text-gray-900 uppercase">Motor do Acervo</h2>
                        <span className="text-gray-300 text-3xl">/</span>
                        <span className="text-orange-500 text-xl font-bold uppercase">"{searchQuery}"</span>
                    </div>

                    {!filteredResults ? (
                        <div className="text-center py-20 text-gray-400">
                            <p className="text-xl">Nenhum resultado encontrado no centro de dados.</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {filteredResults.empresas.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black text-emerald-900/40 uppercase tracking-[0.3em] border-l-4 border-emerald-500 pl-4">Centro de Empresas</h3>
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
                                    <h3 className="text-sm font-black text-orange-900/40 uppercase tracking-[0.3em] border-l-4 border-orange-500 pl-4">Catálogo de Produtos</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredResults.produtos.map((item: any, i: number) => (
                                            <SearchResultCard key={i} item={item} colorClass="bg-orange-50 text-orange-600" />
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
        </section>
    );
}

function SearchResultCard({ item, colorClass }: { item: any, colorClass: string }) {
    const Icon = item.icon;
    return (
        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${colorClass} group-hover:bg-gray-900 group-hover:text-white`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-orange-500 transition-colors">{item.title}</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">{item.sub}</p>
            </div>
        </div>
    );
}
