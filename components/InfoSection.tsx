"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Tractor, Cpu, Landmark, Leaf, Wallet, Book,
    BarChart3, Newspaper, TrendingUp, PieChart, FileText,
    ArrowRight,
    Scale,
    Warehouse
} from "lucide-react";

type CategoryCard = {
    title: string;
    description: string;
    icon: any;
    dark?: boolean;
    iconBg?: string;
    iconColor?: string;
    href: string;
};

export function InfoSection() {
    const [activeTab, setActiveTab] = useState("categorias");

    const categoryCards: CategoryCard[] = [
        {
            title: "Turismo rural",
            description: "Encontre aqui locais de turismo rural, fazendas turísticas, pousadas, estabelecimentos de alojamento e locais históricos.",
            icon: Tractor,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
            href: "/pesquisa?cat=turismo"
        },
        {
            title: "Tecnologias Agrárias",
            description: "Tecnologia agrária, equipamentos agrícolas, máquinas e informações agrícolas sobre inovações e práticas modernas.",
            icon: Cpu,
            dark: true,
            iconBg: "bg-white/10",
            iconColor: "text-white",
            href: "/pesquisa?cat=tec"
        },
        {
            title: "Políticas Agrárias",
            description: "Acesse aqui informações essenciais sobre o quadro legal e regulamentação, incluindo política agrária em Moçambique.",
            icon: Scale,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            href: "/pesquisa?cat=politicas"
        },
        {
            title: "Insumos Agrários",
            description: "Soluções agrícolas, pesticidas, fertilizantes, soluções para doenças de plantas e agro-pecuária.",
            icon: Leaf,
            dark: true,
            iconBg: "bg-white/10",
            iconColor: "text-white",
            href: "/pesquisa?cat=insumos"
        },
        {
            title: "Financiamento agrário",
            description: "Descubra as melhores opções de apoio financeiro agrícola e soluções de financiamento para impulsionar sua produção.",
            icon: Wallet,
            iconBg: "bg-yellow-50",
            iconColor: "text-yellow-600",
            href: "/pesquisa?cat=financa"
        },
        {
            title: "Artigos Científicos",
            description: "Resultados de pesquisa agrícola, estudos de campo, experimentos e projetos técnicos científicos sobre o sector.",
            icon: Book,
            dark: true,
            iconBg: "bg-white/10",
            iconColor: "text-white",
            href: "/pesquisa?cat=artigos"
        }
    ];

    return (
        <section className="w-full bg-[#f8fafc] py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto text-center space-y-6">
                {/* Header */}
                <div className="space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-600 tracking-tight">
                        Mantenha-se informado
                    </h2>
                    <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                        Oferecemos serviços dinâmicos para facilitar suas actividades com vista a melhorar a produção. Explore as categorias disponíveis abaixo
                    </p>
                </div>

                {/* Custom Tabs Refined */}
                <div className="inline-flex bg-white p-1.5 rounded-[10px] shadow-sm border border-slate-100 gap-2">
                    <button
                        onClick={() => setActiveTab("categorias")}
                        className={`px-8 py-3 rounded-[10px] text-sm font-bold uppercase tracking-wider transition-all ${activeTab === "categorias"
                            ? "text-[#f97316]"
                            : "text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        Categorias
                    </button>
                    <button
                        onClick={() => setActiveTab("estatisticas")}
                        className={`px-8 py-3 rounded-[10px] text-sm font-bold uppercase tracking-wider transition-all ${activeTab === "estatisticas"
                            ? "text-[#f97316]"
                            : "text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        Estatísticas
                    </button>
                    <button
                        onClick={() => setActiveTab("informacoes")}
                        className={`px-8 py-3 rounded-[10px] text-sm font-bold uppercase tracking-wider transition-all ${activeTab === "informacoes"
                            ? "text-[#f97316]"
                            : "text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        Informações
                    </button>
                </div>

                {/* Tabs Content */}
                <div className="mt-16 animate-in fade-in duration-700">
                    {activeTab === "categorias" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryCards.map((card, idx) => (
                                <Link
                                    key={idx}
                                    href={card.href}
                                    className={`p-8 rounded-[10px] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-6 group cursor-pointer ${card.dark
                                        ? "bg-[#334155] text-white shadow-blue-900/10"
                                        : "bg-white text-slate-900 shadow-xl shadow-slate-200/50"
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                                        <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-bold group-hover:text-[#f97316] transition-colors text-slate-600">{card.title}</h3>
                                        <p className={`text-sm leading-relaxed ${card.dark ? "text-slate-300" : "text-slate-500"}`}>
                                            {card.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {activeTab === "estatisticas" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div className="bg-white p-8 rounded-[10px] shadow-xl shadow-slate-200 border border-slate-50 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                                        <BarChart3 className="text-[#f97316] h-6 w-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-600">Mercado Agrário</h3>
                                </div>
                                <p className="text-slate-500">Dados em tempo real sobre a flutuação de preços e volume de produção nas principais províncias moçambicanas.</p>
                                <div className="space-y-4">
                                    {[
                                        { label: "Milho Branco", val: "+12%", color: "text-emerald-500" },
                                        { label: "Feijão Bôer", val: "-5%", color: "text-red-500" },
                                        { label: "Arroz de Chokwé", val: "+8%", color: "text-emerald-500" }
                                    ].map((stat, i) => (
                                        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-[10px]">
                                            <span className="font-bold text-slate-700">{stat.label}</span>
                                            <span className={`font-black ${stat.color}`}>{stat.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#334155] p-8 rounded-[10px] shadow-2xl text-white space-y-6">
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
                        <div className="max-w-4xl mx-auto space-y-4 text-left">
                            {[
                                { title: "Boas Práticas: Irrigação", sub: "Reduza o desperdício de água com técnicas de gota-a-gota.", date: "15 Jan 2024", type: "Técnico", slug: "irrigacao" },
                                { title: "Novo Fundo de Fomento", sub: "Governo anuncia 500M Meticais para pequenos produtores.", date: "12 Jan 2024", type: "Notícia", slug: "fundo" },
                                { title: "Controle de Pragas", sub: "Manual prático para identificação de lagarta do funil.", date: "08 Jan 2024", type: "Guia", slug: "pragas" }
                            ].map((news, i) => (
                                <Link
                                    key={i}
                                    href={`/artigos/${news.slug}`}
                                    className="bg-white p-6 rounded-[10px] shadow-md border border-slate-100 flex flex-col md:flex-row md:items-center justify-between group cursor-pointer hover:border-[#f97316] transition-all gap-6"
                                >
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#f97316]">
                                            <span>{news.type}</span>
                                            <span className="text-slate-300">•</span>
                                            <span className="text-slate-400">{news.date}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-600 group-hover:text-[#f97316] transition-colors">{news.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-1">{news.sub}</p>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                                        Explorar <ArrowRight className="h-3 w-3" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
