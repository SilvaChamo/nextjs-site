"use client";

import React from "react";
import Image from "next/image";
import {
    Cloud, CloudDrizzle, CloudSun, Sun, Thermometer, Wind,
} from "lucide-react";

export function WeatherSidebar() {
    // Mock data for 5 days forecast
    const forecast = [
        { day: "Hoje", temp: "28°C", icon: Sun, desc: "Ensolarado" },
        { day: "Ter", temp: "26°C", icon: CloudSun, desc: "Parcialmente Nublado" },
        { day: "Qua", temp: "24°C", icon: CloudDrizzle, desc: "Chuva Leve" },
        { day: "Qui", temp: "27°C", icon: Cloud, desc: "Nublado" },
        { day: "Sex", temp: "29°C", icon: Sun, desc: "Céu Limpo" },
    ];

    return (
        <div className="relative rounded-[20px] text-white overflow-hidden shadow-2xl border border-white/5 group min-h-max">
            {/* Background: Using the local 'tempo.webp' image provided by the user */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/tempo.webp"
                    alt="Céu nublado"
                    fill
                    className="object-cover transition-transform duration-[10s] group-hover:scale-110"
                    priority
                />
                {/* Deep Overlay to ensure text legibility regardless of the image content */}
                <div className="absolute inset-0 bg-[#0f172a]/60 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b]/40 via-transparent to-[#0f172a]/80"></div>
            </div>

            {/* Content Container - No extra bottom padding beyond the standard symmetrical padding */}
            <div className="relative z-10 p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md text-white rounded-[10px] flex items-center justify-center border border-white/20">
                            <Thermometer className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-tight">Clima Local</h3>
                            <p className="text-[10px] text-blue-200/70 font-bold uppercase tracking-widest">Previsão 5 dias</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-black text-white drop-shadow-md">28°</span>
                        <p className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">Maputo, MZ</p>
                    </div>
                </div>

                {/* Forecast List */}
                <div className="space-y-4">
                    {forecast.map((item, i) => (
                        <div key={i} className="flex items-center justify-between group/item">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-300 w-8">{item.day}</span>
                                <item.icon className="w-4 h-4 text-blue-300 group-hover/item:text-white transition-colors" />
                                <span className="text-[11px] text-white/90 font-medium">{item.desc}</span>
                            </div>
                            <span className="text-sm font-black text-white">{item.temp}</span>
                        </div>
                    ))}
                </div>

                {/* Footer Metrics */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 text-slate-200">
                        <Wind className="w-3.5 h-3.5" />
                        <span className="font-bold">12km/h</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-200">
                        <Cloud className="w-3.5 h-3.5" />
                        <span className="font-bold">20% Hum.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
