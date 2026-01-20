"use client";

import React, { useState, useEffect, useRef } from "react";

export function StickyDivider() {
    const [isSticky, setIsSticky] = useState(false);
    const dividerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!dividerRef.current) return;
            const rect = dividerRef.current.getBoundingClientRect();
            // Navbar height: 64px on mobile, 72px on desktop approx.
            if (rect.top <= 72) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div ref={dividerRef} className="relative z-[49]">
            {/* Real Divider in flow */}
            <div className="w-full bg-transparent">
                <div className="container-site">
                    <div className="w-full h-[6px] bg-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                </div>
            </div>

            {/* Sticky clone when active */}
            {isSticky && (
                <div className="fixed top-[64px] md:top-[72px] left-0 w-full pointer-events-none z-[100]">
                    <div className="container-site">
                        <div className="w-full h-[6px] bg-[#f97316]" />
                    </div>
                </div>
            )}
        </div>
    );
}
