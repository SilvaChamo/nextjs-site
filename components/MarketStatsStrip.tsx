"use client";

import React from "react";
import { Users, MapPin, TrendingUp, Award } from "lucide-react";

export function MarketStatsStrip() {
    const stats = [
        {
            label: "Produtores Activos",
            value: "+12k",
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/20"
        },
        {
            label: "Cobertura Nacional",
            value: "100%",
            icon: MapPin,
            color: "text-emerald-400",
            bg: "bg-emerald-500/20"
        },
        {
            label: "Crescimento Anual",
            value: "45%",
            icon: TrendingUp,
            color: "text-orange-400",
            bg: "bg-orange-500/20"
        },
        {
            label: "Parceiros Confiam",
            value: "+150",
            icon: Award,
            color: "text-purple-400",
            bg: "bg-purple-500/20"
        }
    ];

    return (
        <section className="relative w-full py-[50px] overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1625246333195-bf7d7fb37568?q=80&w=2000&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50"></div>
            </div>

            <div className="container-site relative z-10 text-white">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-8">

                    {/* Header Text */}
                    <div className="lg:max-w-md text-center lg:text-left">
                        <h3 className="text-[28px] md:text-[45px] font-[900] leading-[1.1] tracking-tight mb-4 text-white">
                            Nossa Posição no <br />
                            <span className="text-[#f97316]">Mercado Agrário</span>
                        </h3>
                        <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                            A maior base de dados interativa de Moçambique, conectando produtores e mercados com dados em tempo real.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className={`w-14 h-14 rounded-full ${stat.bg} backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                </div>
                                <span className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
