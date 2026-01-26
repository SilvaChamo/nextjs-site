"use client";

import React from "react";
import { Cloud, CloudDrizzle, CloudSun, Sun, Thermometer, Wind } from "lucide-react";

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
        <div className="bg-gradient-to-br from-blue-50 via-white to-white rounded-[15px] border border-blue-100/50 shadow-lg p-6 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full -mr-12 -mt-12"></div>
            <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-[10px] flex items-center justify-center">
                        <Thermometer className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Clima Local</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Previsão 5 dias</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-2xl font-black text-slate-800">28°</span>
                    <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">Maputo, MZ</p>
                </div>
            </div>

            <div className="space-y-4">
                {forecast.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-500 w-8">{item.day}</span>
                            <item.icon className="w-4 h-4 text-blue-400 group-hover:text-blue-500 transition-colors" />
                            <span className="text-[11px] text-slate-400 font-medium">{item.desc}</span>
                        </div>
                        <span className="text-sm font-black text-slate-700">{item.temp}</span>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-400">
                    <Wind className="w-3.5 h-3.5" />
                    <span className="font-bold">12km/h</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                    <Cloud className="w-3.5 h-3.5" />
                    <span className="font-bold">20% Hum.</span>
                </div>
            </div>
        </div>
    );
}
