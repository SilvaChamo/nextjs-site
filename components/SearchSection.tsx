"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FEATURED_COMPANIES, SEARCH_DATA } from "@/lib/constants";
import Image from "next/image";

export function SearchSection() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredResults = React.useMemo(() => {
        if (!searchQuery) return null;
        const query = searchQuery.toLowerCase();

        // Helper to safely filter if array exists, otherwise return empty
        const filterData = (data: any[]) => data ? data.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.sub.toLowerCase().includes(query)
        ) : [];

        const result = {
            produtos: filterData(SEARCH_DATA.produtos),
            profissionais: filterData(SEARCH_DATA.profissionais),
            empresas: filterData(SEARCH_DATA.empresas),
            artigos: filterData(SEARCH_DATA.artigos),
            propriedades: filterData((SEARCH_DATA as any).propriedades || [])
        };

        const totalCount = result.produtos.length + result.profissionais.length + result.empresas.length + result.artigos.length + result.propriedades.length;
        return totalCount > 0 ? result : null;
    }, [searchQuery]);

    return (
        <section className="w-full bg-white relative pb-0">
            {/* Search Bar Container */}
            <div className="w-full px-6 md:px-12 pt-0 pb-12 bg-white">
                <div className="max-w-4xl mx-auto -mt-24 relative z-20">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative bg-white rounded-full shadow-2xl p-2 flex items-center border border-gray-100">
                            <div className="pl-6 text-gray-400">
                                <Search className="h-6 w-6" />
                            </div>
                            <Input
                                className="border-none shadow-none focus-visible:ring-0 text-lg h-14 bg-transparent placeholder:text-gray-300"
                                placeholder="Explore o acervo: Empresas, Produtos, Propriedades..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="pr-6 text-[10px] font-black uppercase tracking-widest text-emerald-600/50 animate-pulse hidden md:block">
                                Busca Inteligente
                            </div>
                        </div>
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
                                        {filteredResults.empresas.map((item, i) => (
                                            <SearchResultCard key={i} item={item} colorClass="bg-emerald-50 text-emerald-600" />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {filteredResults.propriedades.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black text-amber-900/40 uppercase tracking-[0.3em] border-l-4 border-amber-500 pl-4">Acervo de Propriedades</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredResults.propriedades.map((item, i) => (
                                            <SearchResultCard key={i} item={item} colorClass="bg-amber-50 text-amber-600" />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {filteredResults.produtos.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black text-orange-900/40 uppercase tracking-[0.3em] border-l-4 border-orange-500 pl-4">Catálogo de Produtos</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredResults.produtos.map((item, i) => (
                                            <SearchResultCard key={i} item={item} colorClass="bg-orange-50 text-orange-600" />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {filteredResults.profissionais.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-black text-blue-900/40 uppercase tracking-[0.3em] border-l-4 border-blue-500 pl-4">Base de Profissionais</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredResults.profissionais.map((item, i) => (
                                            <SearchResultCard key={i} item={item} colorClass="bg-blue-50 text-blue-600" />
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
    )
}
