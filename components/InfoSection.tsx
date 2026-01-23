"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
    BarChart3, TrendingUp, ArrowRight
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

export function InfoSection() {
    const [activeTab, setActiveTab] = useState<"categorias" | "estatisticas" | "informacoes">("categorias");
    const [statsData, setStatsData] = useState<any[]>([]);
    const [articlesData, setArticlesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch stats
                const { data: stats } = await supabase
                    .from('statistics_cards')
                    .select('*')
                    .limit(3);
                if (stats) setStatsData(stats);

                // Fetch latest 3 news
                const { data: news } = await supabase
                    .from('articles')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(3);
                if (news) setArticlesData(news);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        const handleScroll = () => {
            if (bgRef.current) {
                const scrolled = window.scrollY;
                bgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="w-full bg-transparent relative" id="informacao">
            {/* Top Banner Area - Fixed to 300px */}
            <div className="w-full bg-[#000000] relative h-[300px] overflow-hidden flex flex-col justify-center">
                {/* Background Image - Seedlings - Parallax Enabled */}
                <div
                    ref={bgRef}
                    className="absolute -top-[25%] left-0 w-full h-[150%] bg-cover bg-center opacity-60 pointer-events-none transition-transform duration-100 will-change-transform z-0"
                    style={{ backgroundImage: "url('/info-banner-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-[#000000]/40 to-[#000000]/70 z-10" />

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] text-center space-y-6 relative z-20">
                    <div className="space-y-3 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                            Mantenha-se informado
                        </h2>
                        <p className="text-white text-base md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                            Oferecemos serviços dinâmicos para facilitar suas actividades com vista a melhorar a produção e o mercado agrário em Moçambique.
                        </p>
                    </div>

                    {/* Custom Tabs - Sliding Style - Rectangle rounding */}
                    <div className="relative inline-flex items-center bg-white/10 p-1 rounded-sm border border-white/20 backdrop-blur-md mx-auto">
                        {/* Sliding Indicator */}
                        <div
                            className="absolute h-[calc(100%-12px)] rounded-sm bg-[#f97316] transition-all duration-300 ease-out shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                            style={{
                                width: 'calc(33.333% - 8px)',
                                left: activeTab === "categorias" ? '4px' : activeTab === "estatisticas" ? '33.333%' : '66.666%',
                                transform: activeTab === "estatisticas" ? 'translateX(2px)' : activeTab === "informacoes" ? 'translateX(0px)' : 'none'
                            }}
                        />

                        <button
                            onClick={() => setActiveTab("categorias")}
                            className={`relative z-10 px-10 py-3 rounded-sm text-xs font-black transition-colors uppercase tracking-widest min-w-[140px] ${activeTab === "categorias" ? "text-white" : "text-white hover:text-white/80"
                                }`}
                        >
                            Soluções
                        </button>
                        <button
                            onClick={() => setActiveTab("estatisticas")}
                            className={`relative z-10 px-10 py-3 rounded-sm text-xs font-black transition-colors uppercase tracking-widest min-w-[140px] ${activeTab === "estatisticas" ? "text-white" : "text-white hover:text-white/80"
                                }`}
                        >
                            Mercado
                        </button>
                        <button
                            onClick={() => setActiveTab("informacoes")}
                            className={`relative z-10 px-10 py-3 rounded-sm text-xs font-black transition-colors uppercase tracking-widest min-w-[140px] ${activeTab === "informacoes" ? "text-white" : "text-white hover:text-white/80"
                                }`}
                        >
                            Informações
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Container - No Overlap */}
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-16 pb-24">
                <div className="animate-in fade-in duration-700 slide-in-from-bottom-8">
                    {loading ? (
                        <div className="bg-white p-12 rounded-[4px] shadow-lg text-center text-gray-400 border border-slate-100">
                            A carregar informações...
                        </div>
                    ) : (
                        <>
                            {activeTab === "categorias" && (
                                <div className="space-y-12">
                                    {/* Header Section for Solutions */}
                                    <div className="text-center space-y-4 max-w-4xl mx-auto mb-12">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-px w-12 bg-gray-300"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Nossas Soluções</span>
                                            <div className="h-px w-12 bg-gray-300"></div>
                                        </div>
                                        <h3 className="text-3xl md:text-4xl font-black text-slate-800">Ao serviço do produtor</h3>
                                        <p className="text-slate-500 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                                            Além de fornecer informações cruciais sobre técnicas de produção, prestamos serviços que auxiliam na produtividade e acções pós-produção. Solicite um dos serviços abaixo.
                                        </p>
                                    </div>

                                    {/* Solutions Grid - 3 Large Cards */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {/* Card 1: Venda */}
                                        <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all text-center flex flex-col items-center gap-6 group">
                                            <div className="w-20 h-20 flex items-center justify-center">
                                                <img src="https://cdn-icons-png.flaticon.com/512/3258/3258522.png" alt="Icon" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-70" />
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="text-xl font-black text-slate-800">Quer vender um produto?</h4>
                                                <p className="text-sm text-slate-500 font-medium">Cadastre aqui o seu produto e encontre um comprador profissional rapidamente.</p>
                                            </div>
                                            <Button variant="ghost" className="mt-4 text-[#f97316] font-black uppercase text-[10px] tracking-widest hover:bg-orange-50">Saber mais →</Button>
                                        </div>

                                        {/* Card 2: Compra */}
                                        <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all text-center flex flex-col items-center gap-6 group">
                                            <div className="w-20 h-20 flex items-center justify-center">
                                                <img src="https://cdn-icons-png.flaticon.com/512/3502/3502601.png" alt="Icon" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-70" />
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="text-xl font-black text-slate-800">Quer comprar?</h4>
                                                <p className="text-sm text-slate-500 font-medium">Poupe tempo e recursos, pague suas taxas, impostos e aceda a fornecedores aqui!</p>
                                            </div>
                                            <Button variant="ghost" className="mt-4 text-[#f97316] font-black uppercase text-[10px] tracking-widest hover:bg-orange-50">Saber mais →</Button>
                                        </div>

                                        {/* Card 3: Logística */}
                                        <div className="bg-white p-10 rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all text-center flex flex-col items-center gap-6 group">
                                            <div className="w-20 h-20 flex items-center justify-center">
                                                <img src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png" alt="Icon" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-70" />
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="text-xl font-black text-slate-800">Ou quer transportar?</h4>
                                                <p className="text-sm text-slate-500 font-medium">Faça aqui a solicitação de DUAT, transporte logístico ou licença de construção.</p>
                                            </div>
                                            <Button variant="ghost" className="mt-4 text-[#f97316] font-black uppercase text-[10px] tracking-widest hover:bg-orange-50">Saber mais →</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "estatisticas" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                    <div className="bg-white p-8 rounded-[12px] shadow-xl shadow-slate-200 border border-slate-100 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                                                <BarChart3 className="text-[#f97316] h-6 w-6" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-600">Mercado Agrário</h3>
                                        </div>
                                        <p className="text-slate-500">Dados em tempo real sobre a flutuação de preços e volume de produção nas principais províncias moçambicanas.</p>
                                        <div className="space-y-4">
                                            {statsData.length > 0 ? statsData.map((stat, i) => (
                                                <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-[10px]">
                                                    <span className="font-bold text-slate-700">{stat.label}</span>
                                                    <span className={`font-black ${stat.color}`}>{stat.val}</span>
                                                </div>
                                            )) : (
                                                <div className="text-gray-400 text-sm">Sem dados recentes de mercado.</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-[#1e293b] p-8 rounded-[12px] shadow-2xl text-white space-y-6 border border-slate-600">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                                <TrendingUp className="text-white h-6 w-6" />
                                            </div>
                                            <h3 className="text-2xl font-bold">Projecções 2024</h3>
                                        </div>
                                        <p className="text-slate-300">Análise predictiva baseada no histórico de colheitas e condições meteorológicas actuais.</p>
                                        <div className="h-48 flex items-end gap-3 px-4">
                                            {[40, 70, 45, 90, 65, 80].map((h, i) => (
                                                <div key={i} className="flex-1 bg-emerald-500 rounded-t-lg transition-all hover:bg-[#f97316] cursor-pointer" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "informacoes" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {articlesData.map((news, i) => (
                                        <Link
                                            key={i}
                                            href={`/blog/${news.slug || news.id}`}
                                            className="bg-white rounded-xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all overflow-hidden group flex flex-col h-full"
                                        >
                                            <div className="h-48 overflow-hidden relative">
                                                <img
                                                    src={news.image_url || "https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?q=80&w=1000&auto=format&fit=crop"}
                                                    alt={news.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Notícias</span>
                                                </div>
                                            </div>
                                            <div className="p-6 space-y-3 flex-1 flex flex-col">
                                                <h4 className="text-lg font-bold text-slate-800 line-clamp-2">{news.title}</h4>
                                                <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed flex-1">{news.summary}</p>
                                                <div className="pt-4 flex items-center text-emerald-600 font-black text-[10px] uppercase tracking-widest group-hover:gap-3 transition-all">
                                                    Ler Artigo <ArrowRight className="w-3 h-3 ml-2" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
