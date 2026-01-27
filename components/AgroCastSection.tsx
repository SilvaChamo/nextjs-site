"use client";

import React, { useState } from "react";
import { Play, Mic, Video, Users, ArrowRight, PlayCircle, Star } from "lucide-react";
import Image from "next/image";

const episodes = [
    {
        id: 1,
        title: "O Futuro do Milho em Moçambique: Estratégias 2026",
        specialist: "Eng. Arlindo Chilundo",
        duration: "45 min",
        type: "Entrevista",
        image: "/assets/podcast_featured.png",
        category: "Cereais"
    },
    {
        id: 2,
        title: "5 Dicas para Aumentar a Produtividade de Macadâmia",
        specialist: "Dra. Sara Manuel",
        duration: "12 min",
        type: "Dicas",
        image: "/assets/podcast_tips.png",
        category: "Produção"
    },
    {
        id: 3,
        title: "Tendências do Mercado de Caju em Nampula",
        specialist: "Dr. João Matusse",
        duration: "30 min",
        type: "Podcast",
        image: "/assets/podcast_market.png",
        category: "Economia"
    }
];

export function AgroCastSection() {
    const [activeEpisode, setActiveEpisode] = useState(episodes[0]);

    return (
        <section className="py-24 bg-[#F8FAFC] relative overflow-hidden" id="agrocast">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[50%] bg-orange-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <span className="w-12 h-[2px] bg-emerald-600"></span>
                            <span className="text-emerald-600 text-sm font-black uppercase tracking-[0.3em]">
                                AgroCast & Media
                            </span>
                        </div>
                        <h2 className="text-[40px] md:text-[50px] font-heading font-black text-slate-800 leading-tight tracking-tight">
                            Ouvir quem <span className="text-emerald-600">Semeia</span> o Conhecimento
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            Assista a entrevistas exclusivas com especialistas renomados, dicas práticas de produção e debates sobre o futuro do agronegócio em Moçambique.
                        </p>
                    </div>

                    <button className="hidden lg:flex items-center gap-3 text-slate-400 hover:text-emerald-600 font-bold transition-all group">
                        Ver todos os episódios
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
                    {/* Main Video Interface */}
                    <div className="relative group cursor-pointer overflow-hidden rounded-[30px] shadow-2xl bg-slate-900 aspect-video lg:aspect-auto lg:h-[550px]">
                        <Image
                            src={activeEpisode.image}
                            alt={activeEpisode.title}
                            fill
                            className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-500">
                                <div className="w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                                </div>
                            </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full">
                                    {activeEpisode.type}
                                </span>
                                <span className="text-white/60 text-xs font-bold flex items-center gap-1.5">
                                    <Mic className="w-3.5 h-3.5" /> {activeEpisode.duration}
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight max-w-2xl">
                                {activeEpisode.title}
                            </h3>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-500/20 overflow-hidden">
                                    <Users className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{activeEpisode.specialist}</p>
                                    <p className="text-white/50 text-[10px] uppercase font-black tracking-widest">Especialista Agro</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Playlist Sidebar */}
                    <div className="space-y-6">
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                            Próximos para si
                            <span className="flex-1 h-[1px] bg-slate-200"></span>
                        </h4>

                        <div className="space-y-4">
                            {episodes.map((ep) => (
                                <div
                                    key={ep.id}
                                    onClick={() => setActiveEpisode(ep)}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer group flex gap-4 ${activeEpisode.id === ep.id
                                        ? "bg-white border-emerald-100 shadow-xl shadow-emerald-600/5 ring-1 ring-emerald-50"
                                        : "bg-transparent border-transparent hover:bg-white hover:border-slate-100"
                                        }`}
                                >
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                        <Image
                                            src={ep.image}
                                            alt={ep.title}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <PlayCircle className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter mb-1">
                                            {ep.type} • {ep.category}
                                        </span>
                                        <h5 className={`text-sm font-black leading-tight mb-2 line-clamp-2 transition-colors ${activeEpisode.id === ep.id ? "text-emerald-700" : "text-slate-700 group-hover:text-emerald-600"}`}>
                                            {ep.title}
                                        </h5>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] text-slate-400 font-bold">{ep.duration}</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-2.5 h-2.5 text-orange-400 fill-orange-400" />
                                                <span className="text-[10px] text-slate-400 font-bold">Destaque</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-emerald-600/20 group cursor-pointer">
                            <div className="relative z-10 space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Quero participar</p>
                                <h4 className="text-xl font-black leading-tight">Sugira um tema ou especialista</h4>
                                <button className="bg-white text-emerald-600 px-6 py-2 rounded-full font-bold text-xs hover:bg-[#f97316] hover:text-white transition-all flex items-center gap-2 mt-2">
                                    Contactar Agora <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <Mic className="absolute -bottom-10 -right-10 w-40 h-40 text-white/10 -rotate-12 transition-transform group-hover:scale-110 duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
