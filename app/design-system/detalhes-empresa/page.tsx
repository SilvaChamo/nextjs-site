"use client";

import React, { useState, useEffect, useCallback } from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { CheckCircle2, MapPin, Globe, Phone, Mail, ChevronLeft, ChevronRight, Package } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';

export default function StandardCompanyDetailsPage() {
    // Product Carousel Logic
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const products = [
        { name: "Castanha de Caju Refinada", price: "500 MT/kg", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800", available: true },
        { name: "Algodão em Fardo", price: "Sob Consulta", img: "https://images.unsplash.com/photo-1589923188905-a759330d638d?q=80&w=800", available: true },
        { name: "Sementes Selecionadas", price: "250 MT/pk", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800", available: false },
        { name: "Óleo Vegetal Natural", price: "120 MT/L", img: "https://images.unsplash.com/photo-1474440692490-2e83afef4841?q=80&w=800", available: true },
    ];

    return (
        <StandardBlogTemplate
            title="Agro-Indústria Zambézia"
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Directório", href: "/directory" },
                { label: "Agro-Indústria Zambézia" }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    {/* Status Card */}
                    <div className="card-agro group">
                        <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                            <span className="font-bold text-sm text-emerald-700 uppercase tracking-wider">Empresa Verificada</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">Verificado em: 12 Jan 2024</p>
                        <button className="btn-primary w-full text-xs">Contactar Empresa</button>
                    </div>

                    {/* Contacts Card */}
                    <div className="card-agro group">
                        <h4 className="mb-4">Contactos Diretos</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-slate-400 mt-1" />
                                <span className="text-sm font-medium">Av. 25 de Setembro, Quelimane</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-slate-400 mt-1" />
                                <span className="text-sm font-medium">+258 84 123 4567</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-slate-400 mt-1" />
                                <span className="text-sm font-medium">info@zambezia.co.mz</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Globe className="w-4 h-4 text-slate-400 mt-1" />
                                <span className="text-sm font-medium">www.zambezia.co.mz</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        >
            <div className="space-y-agro">
                {/* Facebook Style Banner (Reduced Height) */}
                <div className="relative w-full h-[280px] rounded-[20px] overflow-hidden shadow-lg border border-slate-100/50">
                    <Image
                        src="https://images.unsplash.com/photo-1605000797499-95a059e5e4bb?q=80&w=2671&auto=format&fit=crop"
                        alt="Company Cover"
                        fill
                        className="object-cover"
                    />
                    {/* Darker gradient at bottom for text, but transparent at top to see image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                        <div className="flex items-end gap-6 w-full">
                            <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-2xl shrink-0 border border-slate-100">
                                <img src="https://placehold.co/100x100/f97316/white?text=LOGO" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="text-white mb-2 flex-1">
                                <h1 className="text-3xl md:text-4xl font-black mb-1 text-white leading-tight drop-shadow-md uppercase tracking-tighter">Agro-Indústria Zambézia</h1>
                                <p className="text-white/90 font-medium drop-shadow-sm">Processamento de Castanha de Caju e Algodão</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-agro-lg">
                    <h2 className="mb-4">Sobre a Empresa</h2>
                    <div className="prose prose-slate max-w-none font-sans text-slate-500">
                        <p>
                            A <strong>Agro-Indústria Zambézia</strong> é líder no processamento e exportação de castanha de caju na região centro de Moçambique. Fundada em 2010, nossa missão é agregar valor à produção local e garantir preços justos aos pequenos produtores.
                        </p>
                        <p>
                            Atuamos em toda a cadeia produtiva, desde o fomento agrícola junto às comunidades locais até a exportação final para mercados internacionais de alta exigência.
                        </p>
                        <h3>Nossos Serviços</h3>
                        <ul>
                            <li>Processamento industrial de caju de alta qualidade</li>
                            <li>Comercialização de algodão e matérias-primas têxteis</li>
                            <li>Apoio técnico e distribuição de insumos a produtores</li>
                        </ul>
                    </div>
                </div>

                {/* Product Carousel Section */}
                <div className="card-agro-lg">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5" />
                            </div>
                            <h3 className="mb-0">Catálogo de Produtos</h3>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                <ChevronLeft className="w-5 h-5 text-slate-400" />
                            </button>
                            <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                <ChevronRight className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-6 -mr-6">
                            {products.map((product, i) => (
                                <div key={i} className="flex-[0_0_300px] min-w-0 pr-6 pb-2">
                                    <div className="group/item relative h-[320px] rounded-[20px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer">
                                        {/* Background Image */}
                                        <Image
                                            src={product.img}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover/item:scale-110 transition-transform duration-700"
                                        />

                                        {/* Status Badge */}
                                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm z-10 ${product.available ? 'bg-emerald-500 text-white' : 'bg-slate-400 text-white'}`}>
                                            {product.available ? 'Disponível' : 'Indisponível'}
                                        </div>

                                        {/* Clean Overlay (No inner box) */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end">
                                            <h4 className="text-[20px] font-black text-white mb-1 line-clamp-2 leading-tight drop-shadow-md uppercase tracking-tight">
                                                {product.name}
                                            </h4>
                                            <p className="text-[#f97316] font-black text-[18px] drop-shadow-sm">
                                                {product.price}
                                            </p>
                                        </div>

                                        {/* Hover Indicator */}
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-white opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 border border-white/20">
                                            <Package className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </StandardBlogTemplate>
    );
}
