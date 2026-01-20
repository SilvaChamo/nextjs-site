"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { InfoSection } from "@/components/InfoSection";
import { StickyDivider } from "@/components/StickyDivider";
import { CategoriesShowcase } from "@/components/CategoriesShowcase";
import { CommunityBanner } from "@/components/CommunityBanner";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Hero onToggleSearch={() => setIsSearchOpen(!isSearchOpen)} isSearchOpen={isSearchOpen} />
      <StickyDivider />
      <SearchSection isOpen={isSearchOpen} />
      <CategoriesShowcase />
      <CommunityBanner />
      <WhyChooseUs />
      <InfoSection />
    </main>
  );
}
