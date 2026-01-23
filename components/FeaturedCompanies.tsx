"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CompanyCard } from './CompanyCard';
import { FEATURED_COMPANIES } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function FeaturedCompanies() {
    const items = FEATURED_COMPANIES;

    const getVisibleItems = () => {
        // Check if window is defined (client-side)
        if (typeof window === 'undefined') return 4;
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 4; // Default to 4 for consistency with design
    };

    // State
    const [visibleItems, setVisibleItems] = useState(4); // Start with default
    const [mounting, setMounting] = useState(true);

    // Initialize correct visible items on client mount
    useEffect(() => {
        setVisibleItems(getVisibleItems());
        setMounting(false);

        const handleResize = () => setVisibleItems(getVisibleItems());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Infinite Scroll Logic
    const extendedItems = useMemo(() => [
        ...items.slice(-visibleItems),
        ...items,
        ...items.slice(0, visibleItems)
    ], [items, visibleItems]);

    const [currentIndex, setCurrentIndex] = useState(visibleItems);
    const [isTransitioning, setIsTransitioning] = useState(false);

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


    // Helper for onTransitionEnd prop
    const onTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex >= items.length + visibleItems) {
            setCurrentIndex(visibleItems);
        } else if (currentIndex < visibleItems) {
            setCurrentIndex(currentIndex + items.length);
        }
    };


    useEffect(() => {
        const timer = setInterval(nextSlide, 7000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    if (mounting) return <div className="h-[600px] w-full bg-gray-50/50 animate-pulse"></div>;

    return (
        <div className="w-full bg-[#fdfdfd] overflow-hidden">
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] py-24 flex flex-col justify-center animate-in fade-in duration-[1200ms] w-full">
                <div className="mb-16 w-full">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-slate-900 font-black text-[11px] md:text-[13px] tracking-[0.7em] uppercase">Empresas em Destaque</h2>
                        <div className="flex space-x-4">
                            <button
                                onClick={prevSlide}
                                className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#f97316] hover:border-[#f97316] hover:bg-orange-50 transition-all duration-500 bg-white shadow-xl active:scale-90"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#f97316] hover:border-[#f97316] hover:bg-orange-50 transition-all duration-500 bg-white shadow-xl active:scale-90"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-visible w-full">
                        <div className="overflow-hidden py-5">
                            <div
                                className={`flex -mx-[10px] ${isTransitioning ? 'transition-transform duration-[1000ms] cubic-bezier(0.19, 1, 0.22, 1)' : ''}`}
                                style={{
                                    transform: `translateX(-${currentIndex * (100 / extendedItems.length)}%)`,
                                    width: `${(extendedItems.length / visibleItems) * 100}%`
                                }}
                                onTransitionEnd={onTransitionEnd}
                            >
                                {extendedItems.map((company, idx) => (
                                    <div key={`${company.id}-${idx}`} className="px-[10px]" style={{ width: `${100 / extendedItems.length}%`, flexShrink: 0 }}>
                                        <CompanyCard company={company} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
