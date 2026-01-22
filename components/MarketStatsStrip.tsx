"use client";

import React from "react";
import { Users, MapPin, TrendingUp, Award } from "lucide-react";

export function MarketStatsStrip() {
    const stats = [
        {
            label: "Produtores Activos",
            value: "+12k",
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            label: "Cobertura Nacional",
            value: "100%",
            icon: MapPin,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            label: "Crescimento Anual",
            value: "45%",
            icon: TrendingUp,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        },
        {
            label: "Parceiros Confiam",
            value: "+150",
            icon: Award,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ];

    return (
        <div className="py-10">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="md:pr-8 text-center md:text-left min-w-[200px]">
                        <h3 className="text-lg font-black text-slate-800 leading-tight">
                            Nossa Posição no <br />
                            <span className="text-[#f97316]">Mercado Agrário</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-2">
                            Dados em tempo real da nossa base.
                        </p>
                    </div>

                    <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 md:pt-0 md:pl-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <span className={`text-2xl md:text-3xl font-black ${stat.color} mb-1`}>
                                    {stat.value}
                                </span>
                                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
