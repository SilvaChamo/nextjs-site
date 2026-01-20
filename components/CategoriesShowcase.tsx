"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SEARCH_DATA } from "@/lib/constants";

export function CategoriesShowcase() {
    // Get all companies
    const items = SEARCH_DATA.empresas;
    const itemsPerPage = 4;

    // --- SLIDER STATE ---
    const [currentIndex, setCurrentIndex] = useState(itemsPerPage);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Infinite Loop Logic: Clone items (Head & Tail)
    const extendedItems = useMemo(() => [
        ...items.slice(-itemsPerPage),
        ...items,
        ...items.slice(0, itemsPerPage)
    ], [items, itemsPerPage]);

    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    }, [isTransitioning]);

    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    }, [isTransitioning]);

    // Handle Transition End (Infinite Loop Jump)
    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex >= items.length + itemsPerPage) {
            setCurrentIndex(itemsPerPage);
        } else if (currentIndex < itemsPerPage) {
            setCurrentIndex(items.length + currentIndex); // Jump near end
        }
    };

    // Auto Play
    useEffect(() => {
        const timer = setInterval(nextSlide, 7000); // Slower auto-play
        return () => clearInterval(timer);
    }, [nextSlide]);


    return (
        <section className="w-full bg-transparent py-14 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/30 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-orange-50/20 blur-[80px] pointer-events-none" />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">

                {/* Header: Title Left + Arrows Right */}
                <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <div className="w-1 h-8 bg-[#f97316]"></div> {/* Orange Vertical Line */}
                        <h2 className="text-[25px] font-heading font-semibold text-slate-600 uppercase tracking-tight">
                            Empresas em destaque
                        </h2>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-[#f97316] hover:border-[#f97316] transition-all rounded-full"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-[#f97316] hover:border-[#f97316] transition-all rounded-full"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* SLIDER CONTAINER - Strict 4 columns, no bleeding, with padding for shadows */}
                <div className="w-full overflow-hidden py-4 pb-10">
                    <div
                        className={`flex ${isTransitioning ? 'transition-transform duration-[800ms] ease-out' : ''}`}
                        style={{
                            transform: `translateX(-${currentIndex * (100 / extendedItems.length)}%)`,
                            width: `${(extendedItems.length / itemsPerPage) * 100}%`
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {extendedItems.map((company, i) => {
                            const Icon = company.icon || Building2;
                            const parts = company.sub.split(" - ");
                            const category = parts[0] || "Empresa";
                            const activity = parts[1] || company.sub;
                            // @ts-ignore
                            const location = company.location || "Moçambique";

                            return (
                                <div key={i} className="px-3" style={{ width: `${100 / extendedItems.length}%` }}>
                                    <Link href={`/detalhes/${i}`} className="group block h-full">
                                        <div className="bg-white p-6 rounded-[15px] border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative overflow-hidden">

                                            {/* Header: Logo Left - Category/Location Right */}
                                            <div className="flex justify-between items-start mb-6">
                                                {/* Logo Left */}
                                                <div className="shrink-0">
                                                    {company.logo ? (
                                                        <div className="w-12 h-12 rounded-[10px] overflow-hidden border border-gray-100 bg-white flex items-center justify-center">
                                                            <img src={company.logo} alt={company.title} className="w-full h-full object-contain p-1" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-[10px] flex items-center justify-center bg-emerald-50 text-emerald-600 group-hover:bg-[#f97316] group-hover:text-white transition-all duration-500">
                                                            <Icon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Category & Location Right */}
                                                <div className="flex flex-col items-end">
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#f97316] transition-colors line-clamp-1 text-right">
                                                        {category}
                                                    </div>
                                                    <div className="text-[10px] text-slate-300 font-medium mt-1">
                                                        {location}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Title: Company Name (Weight 700, 8px padding below) */}
                                            <h3 className="text-[15px] font-bold text-slate-600 mb-[8px] group-hover:text-slate-900 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                                                {company.title}
                                            </h3>

                                            {/* Body: Activity (Single Line, 8px padding below, text-xs) */}
                                            <p className="text-slate-400 text-xs leading-relaxed mb-[8px] flex-1 line-clamp-1">
                                                {activity}
                                            </p>

                                            {/* Footer: Ver detalhes + Arrow Right */}
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
        </section>
    );
}
