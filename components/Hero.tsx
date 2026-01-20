"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface HeroProps {
    onToggleSearch: () => void;
    isSearchOpen: boolean;
}

export function Hero({ onToggleSearch, isSearchOpen }: HeroProps) {
    return (
        <section className="relative w-full h-[calc(100vh-30px)] min-h-[670px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.jpg"
                    alt="Agriculture Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1350px] mx-auto px-4 md:px-[60px] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">

                {/* Left Column: Text & Actions */}
                <div className="space-y-8 animate-in slide-in-from-left-6 duration-700">
                    <div className="space-y-4">
                        <h1 className="text-[48px] font-heading font-black text-white leading-[1.1] tracking-tight">
                            <span className="block">Cultivando um futuro</span>
                            <span className="block">melhor para</span>
                            <span className="block text-[#22c55e]">Moçambique</span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-200 max-w-xl font-sans leading-relaxed">
                            Onde a terra fértil encontra inovação e prosperidade. Promovemos o crescimento sustentável facilitando investimentos agrários.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-6 rounded-[10px] text-base font-bold uppercase tracking-wider shadow-md">
                            Seja nosso parceiro
                        </Button>
                        <Button variant="outline" className="bg-[#f97316]/20 border-[#f97316] text-white hover:bg-[#f97316]/20 hover:border-[#f97316] hover:text-[#f97316] px-8 py-6 rounded-[10px] text-base font-bold uppercase tracking-wider backdrop-blur-sm transition-all duration-300">
                            Saiba mais
                        </Button>
                    </div>
                </div>

                {/* Right Column: Stats Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in slide-in-from-right-6 duration-700 delay-200">
                    {/* Card 1: Prices */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-[10px] shadow-lg hover:bg-white/15 transition-all group">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Preços</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-green-500 uppercase">Live</span>
                        </div>
                        <h3 className="text-4xl font-heading font-black text-white">1,240</h3>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Produtos</p>
                    </div>

                    {/* Card 2: Data Usage */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-[10px] shadow-lg hover:bg-white/15 transition-all group">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-4">Dados</h4>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-green-400">496GB IN</span>
                                <div className="h-1.5 w-12 bg-green-500/20 rounded-full overflow-hidden"><div className="h-full w-[70%] bg-green-500"></div></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-white">381GB OUT</span>
                                <div className="h-1.5 w-12 bg-white/20 rounded-full overflow-hidden"><div className="h-full w-[50%] bg-white"></div></div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Active Companies */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-[10px] shadow-sm hover:bg-white/10 transition-all group md:col-span-2 lg:col-span-1">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#f97316] mb-2">Ativas</h4>
                        <h3 className="text-4xl font-heading font-black text-white mb-2">547</h3>
                        <div className="w-full h-1 bg-gray-600/30 rounded-full overflow-hidden">
                            <div className="h-full bg-[#f97316] w-[85%]"></div>
                        </div>
                    </div>

                    {/* Card 4: Provisions Coverage */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-[10px] shadow-lg hover:bg-white/15 transition-all group md:col-span-2 lg:col-span-1">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2">Províncias</h4>
                        <div className="flex items-end gap-2">
                            <h3 className="text-4xl font-heading font-black text-white leading-none">11</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1.5">Cobertura nacional</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Floating Search Button - Bottom Right */}
            <div className="absolute bottom-12 right-12 z-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <button
                    onClick={onToggleSearch}
                    className={`w-16 h-16 rounded-[10px] flex items-center justify-center transition-all duration-300 shadow-2xl ${isSearchOpen
                        ? "bg-slate-900 text-white rotate-90"
                        : "bg-[#22c55e] text-white hover:bg-[#f97316] hover:scale-110"
                        }`}
                >
                    {isSearchOpen ? <X className="w-8 h-8" /> : <Search className="w-8 h-8" />}
                </button>
            </div>
        </section>
    );
}
