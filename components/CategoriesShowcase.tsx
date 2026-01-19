"use client";

import React from "react";
import { Building2, LandPlot, Users, ShoppingBag, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CategoriesShowcase() {
    const categories = [
        {
            title: "Empresas",
            desc: "Conecte-se com os principais players do setor agrário em Moçambique. Investimentos, logística e infraestrutura.",
            icon: Building2,
            color: "emerald",
            link: "/pesquisa?cat=empresas",
            stats: "547+ Empresas"
        },
        {
            title: "Propriedades",
            desc: "Explore terras férteis e fazendas disponíveis para expansão e novos projetos agrícolas em todo o país.",
            icon: LandPlot,
            color: "amber",
            link: "/pesquisa?cat=propriedades",
            stats: "1.2k+ Hectares"
        },
        {
            title: "Profissionais",
            desc: "Encontre especialistas, consultores e técnicos qualificados prontos para otimizar sua produção e colheita.",
            icon: Users,
            color: "blue",
            link: "/pesquisa?cat=profissionais",
            stats: "320+ Consultores"
        },
        {
            title: "Produtos",
            desc: "Acesse o melhor catálogo de sementes, fertilizantes, maquinários e insumos de alta tecnologia.",
            icon: ShoppingBag,
            color: "orange",
            link: "/pesquisa?cat=produtos",
            stats: "2.5k+ Insumos"
        }
    ];

    return (
        <section className="w-full bg-[#fdfdfd] py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/30 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-orange-50/20 blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-heading font-black text-slate-600 mb-4 uppercase tracking-tight">
                        Explorar Ecossistema <span className="text-[#f97316]">Agrário</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                        A BaseAgroData centraliza todas as vertentes do setor para fomentar o crescimento,
                        sustentabilidade e inovação tecnológica no campo moçambicano.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, i) => (
                        <Link key={i} href={cat.link} className="group">
                            <div className="bg-white p-8 rounded-[10px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
                                {/* Color Bar Accent */}
                                <div className={`absolute top-0 left-0 w-1 h-full bg-${cat.color}-500/20 group-hover:bg-[#f97316] transition-colors duration-500`} />

                                <div className={`w-14 h-14 rounded-[10px] flex items-center justify-center mb-6 bg-${cat.color}-50 text-${cat.color}-600 group-hover:bg-[#f97316] group-hover:text-white transition-all duration-500`}>
                                    <cat.icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-600 mb-3 group-hover:text-slate-900 transition-colors">{cat.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{cat.desc}</p>

                                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                    <span className={`text-[10px] font-black uppercase tracking-wider text-${cat.color}-600/70`}>{cat.stats}</span>
                                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#f97316] group-hover:text-white transition-all">
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
