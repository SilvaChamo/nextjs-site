"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
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
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">

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
                        <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-6 rounded-md text-base font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                            Cadastre sua empresa
                        </Button>
                        <Button variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white hover:text-green-900 px-8 py-6 rounded-md text-base font-bold uppercase tracking-wider backdrop-blur-sm">
                            Saiba mais
                        </Button>
                    </div>
                </div>

                {/* Right Column: Stats Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in slide-in-from-right-6 duration-700 delay-200">
                    {/* Card 1: Prices */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg hover:bg-white/15 transition-all group">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Preços</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-green-500 uppercase">Live</span>
                        </div>
                        <h3 className="text-4xl font-heading font-black text-white">1,240</h3>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Produtos</p>
                    </div>

                    {/* Card 2: Data Usage */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg hover:bg-white/15 transition-all group">
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
                    <div className="bg-orange-500/10 backdrop-blur-md border border-orange-500/20 p-6 rounded-xl shadow-lg hover:bg-orange-500/20 transition-all group md:col-span-2 lg:col-span-1">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-200 mb-2">Ativas</h4>
                        <h3 className="text-4xl font-heading font-black text-white mb-4">547</h3>
                        <div className="w-full h-1.5 bg-gray-600/50 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[85%] shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                        </div>
                    </div>

                    {/* Card 4: Provisions Coverage */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg hover:bg-white/15 transition-all group md:col-span-2 lg:col-span-1">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2">Províncias</h4>
                        <div className="flex items-end gap-2">
                            <h3 className="text-4xl font-heading font-black text-white leading-none">11</h3>
                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1.5">Cobertura nacional</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
