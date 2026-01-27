"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Mic, Users, ArrowRight, PlayCircle, Star } from "lucide-react";

const episodes = [
    {
        id: 1,
        title: "O Futuro do Agronegócio em Moçambique: Desafios e Oportunidades",
        specialist: "Eng. Armindo de Castro",
        duration: "45 min",
        type: "Entrevista",
        category: "Estratégia",
        image: "/assets/uploaded_media_1769502614927.png"
    },
    {
        id: 2,
        title: "Dicas Práticas para Aumentar a Produtividade da sua Machamba",
        specialist: "Dra. Maria Chilaule",
        duration: "15 min",
        type: "Dicas Técnicas",
        category: "Produção",
        image: "/assets/agro_tips_video_thumb_1769508103985.png"
    },
    {
        id: 3,
        title: "Tendências do Mercado de Preços: O que esperar da próxima colheita?",
        specialist: "Dr. João Munguambe",
        duration: "30 min",
        type: "Mercado",
        category: "Economia",
        image: "/assets/agro_market_podcast_thumb_1769508227034.png"
    }
];

export function AgroCastSection() {
    const [activeEpisode, setActiveEpisode] = useState(episodes[0]);

    return (
        <section className="section-agro bg-[#F8FAFC] relative overflow-hidden" id="agrocast">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[50%] bg-orange-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container-site relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-agro mb-[40px]">
                    <div className="space-y-4 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <span className="w-12 h-[2px] bg-emerald-600"></span>
                            <span className="text-emerald-600 text-sm font-black uppercase tracking-[0.3em]">
                                AgroCast & Media
                            </span>
                        </div>
                        <h2 className="text-[32px] md:text-[45px] font-heading font-black text-slate-800 leading-tight tracking-tight m-0">
                            Ouvir quem <span className="text-emerald-600">Semeia</span> o Conhecimento
                        </h2>
                        <p className="text-slate-500 text-base leading-relaxed max-w-xl">
                            Assista a entrevistas exclusivas com especialistas renomados, dicas práticas de produção e debates sobre o futuro do agronegócio em Moçambique.
                        </p>
                    </div>

                    <button className="hidden lg:flex items-center gap-3 text-slate-400 hover:text-emerald-600 font-bold transition-all group text-sm">
                        Ver todos os episódios
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid lg:grid-cols-[1fr_400px] gap-agro items-stretch">
                    {/* TV SCREEN FRAME - Main Video */}
                    <div className="relative group p-2 bg-slate-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-[5px]">
                        {/* Physical Bezels */}
                        <div className="relative overflow-hidden bg-slate-900 aspect-video lg:aspect-auto lg:h-[650px] border-[10px] border-slate-900 rounded-[2px] shadow-inner">
                            <Image
                                src={activeEpisode.image}
                                alt={activeEpisode.title}
                                fill
                                className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Inner Screen Shadow effect */}
                            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                            {/* Play Button Overlay - ORANGE */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-500">
                                    <div className="w-14 h-14 bg-[#f97316] rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 w-full p-8 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="bg-[#f97316] text-white text-[10px] font-black uppercase px-3 py-1">
                                        {activeEpisode.type}
                                    </span>
                                    <span className="text-white/80 text-xs font-bold flex items-center gap-1.5">
                                        <Mic className="w-3.5 h-3.5 text-[#f97316]" /> {activeEpisode.duration}
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-[32px] font-black text-white leading-tight max-w-2xl m-0">
                                    {activeEpisode.title}
                                </h3>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-500/20 overflow-hidden">
                                        <Users className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm m-0 leading-none">{activeEpisode.specialist}</p>
                                        <p className="text-white/50 text-[10px] uppercase font-black tracking-widest mt-1">Especialista Agro</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Power Indicator Light */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">BaseAgro Ultra</span>
                        </div>
                    </div>

                    {/* Sidebar section - 5px rounding */}
                    <div className="flex flex-col gap-6">
                        {/* 1. NEXT VIDEO CARD */}
                        <div className="relative group cursor-pointer overflow-hidden shadow-xl h-[300px] border-[6px] border-slate-800 rounded-[5px] bg-slate-900">
                            <Image
                                src={episodes[1].image}
                                alt={episodes[1].title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-90" />

                            <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="bg-[#f97316] text-white text-[10px] font-black uppercase px-2 py-0.5">PRÓXIMO VÍDEO</span>
                                    <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{episodes[1].category}</span>
                                </div>
                                <h3 className="text-lg font-black text-white leading-tight m-0 group-hover:text-[#f97316] transition-colors line-clamp-2">
                                    {episodes[1].title}
                                </h3>
                                <div className="pt-2 flex items-center gap-2 text-white/90 group-hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest">
                                    <PlayCircle className="w-4 h-4 text-[#f97316]" />
                                    <span>Ver Teaser</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. PLAYLIST - 5px rounding items */}
                        <div className="space-y-4">
                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-3 m-0">
                                Playlist do AgroCast
                                <span className="flex-1 h-[1px] bg-slate-200"></span>
                            </h4>
                            <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                                {episodes.map((ep) => (
                                    <div
                                        key={ep.id}
                                        onClick={() => setActiveEpisode(ep)}
                                        className={`p-3 border transition-all cursor-pointer group flex gap-4 rounded-[5px] ${activeEpisode.id === ep.id
                                            ? "bg-white border-emerald-100 shadow-md ring-1 ring-emerald-50"
                                            : "bg-transparent border-transparent hover:bg-white hover:border-slate-100"
                                            }`}
                                    >
                                        <div className="relative w-16 h-16 shrink-0 overflow-hidden rounded-[2px] bg-slate-100">
                                            <Image src={ep.image} alt={ep.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0">
                                            <h5 className={`text-[13px] font-bold leading-tight mb-1 truncate ${activeEpisode.id === ep.id ? "text-emerald-700" : "text-slate-700 group-hover:text-[#f97316]"}`}>
                                                {ep.title}
                                            </h5>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase truncate">{ep.specialist} • {ep.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. CTA CARD - 5px rounding */}
                        <div className="bg-emerald-600 p-6 text-white relative overflow-hidden group cursor-pointer rounded-[5px] mt-auto shadow-lg shadow-emerald-500/10">
                            <div className="relative z-10 space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 m-0">Interação</p>
                                <h4 className="text-base font-black leading-tight text-white m-0">Sugira um novo episódio</h4>
                                <button className="bg-white text-emerald-600 px-5 py-2 rounded-[2px] font-black text-[10px] uppercase tracking-wider hover:bg-[#f97316] hover:text-white transition-all flex items-center gap-2 mt-1">
                                    Enviar Sugestão <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                            <Mic className="absolute -bottom-6 -right-6 w-24 h-24 text-white/10 -rotate-12 transition-transform group-hover:scale-110 duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
