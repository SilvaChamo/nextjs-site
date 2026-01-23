"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { CompanyCard } from './CompanyCard';
import { FEATURED_COMPANIES } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export function FeaturedCompanies() {
    const items = FEATURED_COMPANIES;

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', skipSnaps: false },
        [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, setScrollSnaps, onSelect]);

    return (
        <div className="w-full bg-[#fdfdfd] overflow-hidden">
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] py-24 flex flex-col justify-center animate-in fade-in duration-[1200ms] w-full">
                <div className="mb-16 w-full">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-slate-900 font-black text-[11px] md:text-[13px] tracking-[0.7em] uppercase">
                            Empresas em Destaque
                        </h2>
                    </div>

                    <div className="relative group/embla">
                        <div className="overflow-hidden" ref={emblaRef}>
                            <div className="flex -mr-[15px]">
                                {items.map((company, idx) => (
                                    <div
                                        key={`${company.id}-${idx}`}
                                        className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 pr-[15px]"
                                    >
                                        <CompanyCard company={company} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows - Match InfoSection position and style */}
                        <button
                            onClick={scrollPrev}
                            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#f97316] hover:bg-[#f97316] hover:text-white transition-all z-10"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#f97316] hover:bg-[#f97316] hover:text-white transition-all z-10"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>

                        <div className="flex justify-center gap-2 mt-10">
                            {scrollSnaps.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => scrollTo(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex
                                        ? "bg-[#f97316] w-12"
                                        : "bg-slate-300 hover:bg-slate-400"
                                        }`}
                                    aria-label={`Ir para slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
