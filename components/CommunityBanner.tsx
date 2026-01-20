import React from "react";
import Link from "next/link";

export function CommunityBanner() {
    return (
        <section className="bg-[#374151] py-16">
            <div className="max-w-[1350px] mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                {/* Left Side: EXISTEM MAIS DE */}
                <div className="flex flex-col items-center md:items-end text-right">
                    <h2 className="text-white font-bold text-3xl md:text-5xl uppercase leading-none tracking-tight">
                        Existem mais<br />de
                    </h2>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-px h-32 bg-white/30"></div>

                {/* Right Side: 1 300 + Text + Button */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 max-w-md">
                    <h2 className="text-white font-black text-6xl md:text-8xl leading-none tracking-tighter">
                        1 300
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed">
                        Empresas agrárias identificadas. Não perca tempo, junte se esta comunidade agrícola em constante crescimento
                    </p>
                    <Link
                        href="/registar"
                        className="inline-block border border-[#22c55e] bg-[#22c55e]/10 backdrop-blur-sm text-[#22c55e] hover:bg-[#f97316]/10 hover:text-[#f97316] hover:border-[#f97316] text-sm font-bold px-8 py-3 rounded-[10px] shadow-md transition-all duration-300 uppercase"
                    >
                        Registe se aqui
                    </Link>
                </div>
            </div>
        </section>
    );
}
