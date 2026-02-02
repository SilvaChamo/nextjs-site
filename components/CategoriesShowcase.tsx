"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface CategoriesShowcaseProps {
    companies: any[];
}

export function CategoriesShowcase({ companies }: CategoriesShowcaseProps) {
    const items = companies || [];

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', skipSnaps: false },
        [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    if (items.length === 0) return null;

    return (
        <section className="w-full bg-transparent pt-[60px] pb-[60px] relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/30 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-orange-50/20 blur-[80px] pointer-events-none" />

            <div className="container-site relative z-10">
                {/* Header - Fixed margins as requested: mb-[35px] for card spacing, no top/bottom margin for section/title area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 px-[10px]">
                    <div className="flex items-center gap-4">
                        <div className="w-[5px] h-[30px] bg-[#f97316] rounded-none" />
                        <h2 className="text-[30px] leading-none font-heading font-extrabold text-slate-600 uppercase tracking-tight m-0">
                            Empresas em destaque
                        </h2>
                    </div>
                    {/* Navigation Arrows relocated here */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={scrollPrev}
                            className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#f97316] hover:bg-[#f97316] hover:text-white transition-all"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#f97316] hover:bg-[#f97316] hover:text-white transition-all"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Slider Container */}
                <div className="relative group/embla">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -mr-[15px]">
                            {items.map((company, i) => {
                                const Icon = company.icon || Building2;
                                const parts = (company.sub || "").split(" - ");

                                // Função para refinar texto: Remove "agrário/a" e limita a 2 palavras
                                const refineText = (text: string) => {
                                    if (!text) return "";
                                    return text
                                        .replace(/agrár[io]a?/gi, "") // Remove variações de "agrário"
                                        .split(/\s+/) // Divide por espaços
                                        .filter(word => word.length > 0) // Remove espaços vazios
                                        .slice(0, 2) // Pega apenas as primeiras 2 palavras
                                        .join(" "); // Junta novamente
                                };

                                const category = refineText(parts[0] || "Empresa");
                                const activity = refineText(parts[1] || company.sub || "Actividade");
                                const location = company.location || "Moçambique";

                                return (
                                    <div
                                        key={i}
                                        className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pr-[15px] pb-10"
                                    >
                                        <Link href={`/empresas/${company.slug || i}`} className="group block h-full">
                                            <div className="bg-white p-4 rounded-agro border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative overflow-hidden">

                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="shrink-0">
                                                        {company.logo ? (
                                                            <div className="w-[60px] h-[60px] rounded-[10px] overflow-hidden border border-gray-100 bg-white flex items-center justify-center p-1">
                                                                <Image
                                                                    src={company.logo}
                                                                    alt={company.title || "Empresa"}
                                                                    width={60}
                                                                    height={60}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-[60px] h-[60px] rounded-[10px] flex items-center justify-center bg-emerald-50 text-emerald-600 group-hover:bg-[#f97316] group-hover:text-white transition-all duration-500">
                                                                <Icon className="w-8 h-8" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex flex-col items-end">
                                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#f97316] transition-colors line-clamp-1 text-right">
                                                            {category}
                                                        </div>
                                                        <div className="text-[10px] text-slate-300 font-medium mt-1">
                                                            {location}
                                                        </div>
                                                    </div>
                                                </div>

                                                <h3 className="text-[15px] font-bold text-slate-600 mb-1 group-hover:text-[#3a3f47] transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                                                    {company.title}
                                                </h3>

                                                <p className="text-slate-400 text-xs leading-relaxed mb-2 flex-1 line-clamp-2">
                                                    {activity}
                                                </p>

                                                <div className="pt-2 border-t border-slate-50 flex items-center justify-start gap-2 text-slate-400 group-hover:text-[#f97316] transition-colors">
                                                    <span className="text-[10px] font-black uppercase tracking-wider">Ver detalhes</span>
                                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
