"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { StickyDivider } from "@/components/StickyDivider";

interface HomeHeaderSectionProps {
    stats: Record<string, any>;
}

export function HomeHeaderSection({ stats }: HomeHeaderSectionProps) {
    const [isSearchOpen, setIsSearchOpen] = useState(true);

    return (
        <>
            <Hero
                onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
                isSearchOpen={isSearchOpen}
                stats={stats}
            />
            <StickyDivider />
            <SearchSection isOpen={isSearchOpen} />
        </>
    );
}
