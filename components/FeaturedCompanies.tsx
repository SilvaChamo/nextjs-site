"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { CompanyCard } from './CompanyCard';
import { FEATURED_COMPANIES } from '@/lib/constants';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export function FeaturedCompanies() {
    const items = FEATURED_COMPANIES;

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', skipSnaps: false },
        [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })]
    );

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

                        {/* Navigation elements removed per user request */}
                    </div>
                </div>
            </div>
        </div>
    );
}
