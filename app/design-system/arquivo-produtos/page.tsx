"use client";

import React, { useState } from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { Package, ArrowRight, Share2, Facebook, Twitter, Linkedin, Search, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsArchiveExamplePage() {
    // Mocking a larger list of products "reading all products from companies"
    const allProducts = [
        { id: 1, name: "Castanha de Caju Refinada", price: "500 MT/kg", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800", available: true, company: "Agro-Indústria Zambézia" },
        { id: 2, name: "Algodão em Fardo", price: "Sob Consulta", img: "https://images.unsplash.com/photo-1589923188905-a759330d638d?q=80&w=800", available: true, company: "Agro-Indústria Zambézia" },
        { id: 3, name: "Óleo Vegetal Natural", price: "120 MT/L", img: "https://images.unsplash.com/photo-1474440692490-2e83afef4841?q=80&w=800", available: true, company: "Agro-Indústria Zambézia" },
        { id: 4, name: "Milho Branco", price: "18 MT/kg", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800", available: true, company: "Cooperativa do Norte" },
        { id: 5, name: "Feijão Manteiga", price: "65 MT/kg", img: "https://images.unsplash.com/photo-1549488390-bf384ae26d5c?q=80&w=800", available: true, company: "Cooperativa do Norte" },
        { id: 6, name: "Soja em Grão", price: "45 MT/kg", img: "https://images.unsplash.com/photo-1533237264878-592d3792cb83?q=80&w=800", available: false, company: "Sementes de Moçambique" },
        { id: 7, name: "Tomate Fresco", price: "80 MT/kg", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=800", available: true, company: "Hortas do Vale" },
        { id: 8, name: "Cebola Roxa", price: "55 MT/kg", img: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?q=80&w=800", available: true, company: "Hortas do Vale" },
        { id: 9, name: "Banana Verde", price: "25 MT/kg", img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=800", available: true, company: "Frutas de Manica" },
    ];

    const [activeShareProduct, setActiveShareProduct] = useState<number | null>(null);

    const shareOptions = [
        { name: 'WhatsApp', icon: <Share2 className="w-4 h-4" />, color: 'hover:bg-green-500', url: '#' },
        { name: 'Facebook', icon: <Facebook className="w-4 h-4" />, color: 'hover:bg-blue-600', url: '#' },
        { name: 'Twitter', icon: <Twitter className="w-4 h-4" />, color: 'hover:bg-sky-500', url: '#' },
    ];

    return (
        <StandardBlogTemplate
            title="Catálogo Geral de Produtos"
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Kit Padrão", href: "/design-system" },
                { label: "Arquivo de Produtos" }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    {/* Filters Card */}
                    <div className="card-agro">
                        <h4 className="flex items-center gap-2 mb-6">
                            <Filter className="w-4 h-4 text-emerald-600" />
                            Filtrar Resultados
                        </h4>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Categorias</label>
                                <div className="space-y-2">
                                    {['Todos', 'Cereais', 'Leguminosas', 'Frutas', 'Processados'].map((cat, i) => (
                                        <label key={i} className="flex items-center gap-2 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" defaultChecked={i === 0} />
                                            <span className="text-sm font-medium text-slate-600 group-hover:text-emerald-700">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Província</label>
                                <select className="w-full h-10 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none px-3 bg-slate-50">
                                    <option>Todas as Províncias</option>
                                    <option>Zambézia</option>
                                    <option>Nampula</option>
                                    <option>Sofala</option>
                                </select>
                            </div>

                            <button className="btn-primary w-full shadow-emerald-200/50">
                                Pesquisar
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats Card */}
                    <div className="card-agro">
                        <div className="flex items-center gap-3 mb-4">
                            <Package className="w-8 h-8 text-orange-500 bg-orange-50 p-1.5 rounded-lg" />
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Base de Dados</p>
                                <p className="text-xl font-black text-slate-800">1.2k+ Itens</p>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-500 italic">Atualizado em tempo real pelas empresas parceiras.</p>
                    </div>
                </div>
            }
        >
            <div className="space-y-8">
                {/* Search Bar Refined */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative group max-w-lg flex-1">
                        <input
                            type="text"
                            placeholder="Pesquisar por produto ou empresa..."
                            className="w-full h-12 pl-12 pr-4 bg-white rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ordenar por:</span>
                        <select className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer hover:text-emerald-600 transition-colors">
                            <option>Mais recentes</option>
                            <option>Preço (Menor)</option>
                            <option>Preço (Maior)</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid - Using the standard Refined Design */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-agro">
                    {allProducts.map((product, i) => (
                        <div key={i} className="group relative h-[260px] rounded-[12px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100/50 bg-white">
                            {/* Background Image */}
                            <Image
                                src={product.img}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Share Product Button */}
                            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveShareProduct(activeShareProduct === i ? null : i);
                                        }}
                                        className={`bg-white/20 backdrop-blur-md hover:bg-white ${activeShareProduct === i ? 'bg-white text-orange-600' : 'text-white'} hover:text-orange-600 w-8 h-8 rounded-full flex items-center justify-center border border-white/30 transition-all shadow-lg`}
                                    >
                                        <Share2 className="w-4 h-4" />
                                    </button>

                                    {activeShareProduct === i && (
                                        <div className="absolute right-0 top-full mt-2 bg-white border border-slate-100 shadow-xl rounded-xl p-2 z-50 flex gap-1 animate-in fade-in slide-in-from-top-2 w-max">
                                            {shareOptions.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${opt.color} hover:text-white text-slate-400`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {opt.icon}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end">
                                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1 truncate">
                                    {product.company}
                                </p>
                                <h4 className="text-[18px] font-black text-white mb-1 line-clamp-2 leading-tight drop-shadow-md uppercase tracking-tight group-hover:mb-2 transition-all">
                                    {product.name}
                                </h4>
                                <div className="max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden mb-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${product.available ? 'text-emerald-400' : 'text-red-400'}`}>
                                        ● {product.available ? 'Disponível' : 'Indisponível'}
                                    </span>
                                </div>
                                <p className="text-[#f97316] font-black text-[16px] drop-shadow-sm">
                                    {product.price}
                                </p>
                                <div className="mt-2">
                                    <div className="flex items-center gap-1 text-white/90 text-[11px] font-bold hover:text-white transition-colors">
                                        <span>Ver detalhes</span>
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StandardBlogTemplate>
    );
}
