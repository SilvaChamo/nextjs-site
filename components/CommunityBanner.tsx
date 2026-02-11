import React from "react";
import { AgroCastSection } from "@/components/AgroCastSection";

export function CommunityBanner() {
    return (
        <section
            className="w-full py-12 md:py-14 relative overflow-hidden bg-center bg-cover"
            style={{ backgroundImage: "url('/assets/cta-gradient-bg.webp')" }}
        >
            {/* Dark Overlay to make background subtle as requested */}
            <div className="absolute inset-0 bg-black/80 z-0" />

            {/* Dynamic Particles Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute top-[80%] left-[10%] w-2 h-2 bg-[#f97316]/20 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
                <div className="absolute top-[30%] left-[80%] w-1.5 h-1.5 bg-emerald-500/20 rounded-full animate-ping" style={{ animationDuration: '5s' }} />
                <div className="absolute top-[60%] left-[90%] w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
                <div className="absolute top-[20%] left-[40%] w-2 h-2 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '6s' }} />
                <div className="absolute top-[70%] left-[50%] w-1.5 h-1.5 bg-[#f97316]/10 rounded-full animate-ping" style={{ animationDuration: '4.5s' }} />
                <div className="absolute top-[40%] left-[20%] w-1 h-1 bg-white/20 rounded-full animate-ping" style={{ animationDuration: '3.5s' }} />
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
            </div>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

            <div className="container-site relative z-10">
                <AgroCastSection embedded />
            </div>
        </section>
    );
}
