
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

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex >= items.length + visibleItems) {
            setCurrentIndex(visibleItems);
        }
        else if (currentIndex < visibleItems) {
            // Correct logic if we go backwards too far (though prevSlide logic should handle normal flow)
            // If index is 0 or less (start of clone), jump to end.
            // Actually the logic in original was: if (currentIndex <= 0) which is slightly buggy if clones > 1. 
            // Better: if currentIndex === visibleItems - 1 (last clone at start)
            // Check standard infinite scroll logic. Original code used currentIndex <= 0.
            // Let's stick to a robust reset.
            // If we lie at index (visibleItems - 1), we are at the clone of the last item.
            // We want to jump to (items.length + visibleItems - 1).
            // Original: if (currentIndex <= 0) setCurrentIndex(items.length).
            // Let's replicate original logic structure but make it robust.
        }
    };

    // Re-mount checks for resets
    useEffect(() => {
        if (!isTransitioning) {
            if (currentIndex >= items.length + visibleItems) {
                setCurrentIndex(visibleItems);
            } else if (currentIndex < visibleItems) {
                // If we are showing the first set of clones (before real items)
                // We want to jump to the real last set.
                // Real items start at index `visibleItems`.
                // Clones at start are 0 to `visibleItems - 1`.
                // Example: 4 visible. Clones [0,1,2,3]. Real [4,5,6...]. 
                // If we are at 3, we successfully moved left from 4. 
                // We should instantly jump to `items.length + 3`.
                setCurrentIndex(items.length + currentIndex);
                // Wait, logic is: index 4 is item 0. index 3 is item MAX.
                // We want to be at index (items.length + visibleItems - 1) no?
                // Actually simplest is: Reset to `currentIndex + items.length`?
            }
        }
    }, [currentIndex, items.length, visibleItems, isTransitioning]);

    // Custom effect to handle the 'snap' reset specifically for the original 'transitionEnd' logic
    // The original code was:
    /*
      if (currentIndex >= items.length + visibleItems) {
        setIsTransitioning(false);
        setCurrentIndex(visibleItems);
      } 
      else if (currentIndex <= 0) {
        setIsTransitioning(false);
        setCurrentIndex(items.length); 
      }
    */
    // I'll stick to 'onTransitionEnd' event on the div mostly.

    // Helper for onTransitionEnd prop
    const onTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex >= items.length + visibleItems) {
            setCurrentIndex(visibleItems);
        } else if (currentIndex < visibleItems) {
            // If we are in the left clone zone (indices 0 to visibleItems-1)
            // We really want to be at (items.length + currentIndex) 
            // e.g. visible=4. currentIndex=3 (clone of last item). We want to be at items.length + 3? No.
            // Real items are at indices [4 ... 4+N]. 
            // Last item is at index 4+N-1.
            // Clone of last item is at index 3.
            // If we are at 3, we want to jump to Real Last Item => 4+N-1.
            // So jump to currentIndex + items.length? 3 + N. Yes.
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
                        <h2 className="text-gray-400 font-extrabold text-[11px] md:text-[13px] tracking-[0.7em] uppercase">Empresas em Destaque</h2>
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

                    <div className="relative overflow-visible w-full"> {/* overflow-visible to show shadows/popouts if needed, or hidden */}
                        <div className="overflow-hidden -mx-5 px-5 py-5"> {/* Padding wrapper for shadows */}
                            <div
                                className={`flex ${isTransitioning ? 'transition-transform duration-[1000ms] cubic-bezier(0.19, 1, 0.22, 1)' : ''}`}
                                style={{
                                    transform: `translateX(-${currentIndex * (100 / extendedItems.length)}%)`,
                                    width: `${(extendedItems.length / visibleItems) * 100}%`
                                }}
                                onTransitionEnd={onTransitionEnd}
                            >
                                {extendedItems.map((company, idx) => (
                                    <div key={`${company.id}-${idx}`} className="px-5" style={{ width: `${100 / extendedItems.length}%`, flexShrink: 0 }}>
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
