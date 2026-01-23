"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, MapPin, Users, Target, Eye, Globe, Building2, Tractor, Briefcase, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export function WhyChooseUs() {
    const [counts, setCounts] = useState({
        empresas: 0,
        profissionais: 0,
        propriedades: 0,
        produtos: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            const [c, p, prop, prod] = await Promise.all([
                supabase.from('companies').select('*', { count: 'exact', head: true }),
                supabase.from('professionals').select('*', { count: 'exact', head: true }),
                supabase.from('properties').select('*', { count: 'exact', head: true }),
                supabase.from('products').select('*', { count: 'exact', head: true })
            ]);

            setCounts({
                empresas: c.count || 0,
                profissionais: p.count || 0,
                propriedades: prop.count || 0,
                produtos: prod.count || 0
            });
        };
        fetchCounts();
    }, []);

    return (

        <section className="bg-transparent py-10 md:py-[100px] overflow-hidden">
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] grid lg:grid-cols-2 gap-16 lg:gap-12 items-start">
                {/* Left Column: Text Content */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 sticky top-24">
                    <div className="space-y-4">
                        <h2 className="text-[32px] md:text-[50px] font-heading font-black text-slate-600 leading-[1.1] tracking-tight">
                            Porque fazer parte da <br />
                            maior <span className="text-[#f97316]">plataforma agrária</span>
                        </h2>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Num mercado agrário dinâmico como o moçambicano, a visibilidade e o acesso à informação certa não é apenas um luxo, é uma necessidade de sobrevivência. A nossa plataforma conecta produtores, fornecedores e compradores.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex gap-3 group sm:border-r sm:border-slate-200 sm:pr-5">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                    <Eye className="w-5 h-5 text-[#f97316]" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-700">Visibilidade no Sector</h3>
                                    <p className="text-slate-500 text-sm mt-0.5">Apareça nos primeiros resultados para quem procura produtos.</p>
                                </div>
                            </div>

                            <div className="flex gap-3 group">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-700">Crescimento Exponencial</h3>
                                    <p className="text-slate-500 text-sm mt-0.5">Aumente as suas vendas através de campanhas segmentadas.</p>
                                </div>
                            </div>
                        </div>

                        {/* New Button Positioned at Bottom */}
                        <div className="pt-2">
                            <Link
                                href="/registar"
                                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-[#f97316] text-white px-8 py-[10px] rounded-[9px] font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 group"
                            >
                                Cadastre sua empresa
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Column: Split Columns for Staggered Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
                    {/* Column 1 - Staggered with padding top */}
                    <div className="space-y-5 pt-[35px]">
                        {/* Card 1: Companies */}
                        <Link
                            href="/repositorio?cat=empresas"
                            className="bg-emerald-600 text-white p-6 rounded-[16px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer relative overflow-hidden flex flex-col gap-2 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center before:absolute before:inset-0 before:bg-emerald-600/90 before:z-0 min-h-[180px]"
                        >
                            <div className="relative z-10 flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg leading-tight text-white">
                                        {counts.empresas > 0 ? `${counts.empresas} ` : ''}Empresas<br />Registadas
                                    </h4>
                                    <p className="text-emerald-50 text-[10px] uppercase font-bold tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Ver arquivo <ArrowRight className="w-3 h-3" />
                                    </p>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-125 transition-transform duration-500 z-0">
                                <Building2 className="w-24 h-24 text-white" />
                            </div>
                        </Link>

                        {/* Card 3: Professionals - Moved to Col 1 */}
                        <Link
                            href="/repositorio?cat=profissionais"
                            className="bg-white p-6 rounded-[16px] shadow-md border border-slate-100 hover:border-[#f97316]/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col gap-2 min-h-[180px]"
                        >
                            <div className="relative z-10 flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-3 transition-transform group-hover:rotate-12">
                                    <Users className="w-5 h-5 text-[#f97316]" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-700 text-lg leading-tight">
                                        {counts.profissionais > 0 ? `${counts.profissionais} ` : ''}Profissionais<br />Cadastrados
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-[#f97316] transition-colors flex items-center gap-2">
                                        Explorar <ArrowRight className="w-3 h-3" />
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Column 2 - Normal alignment */}
                    <div className="space-y-5">
                        {/* Card 2: Properties */}
                        <Link
                            href="/repositorio?cat=propriedades"
                            className="bg-white p-6 rounded-[16px] shadow-md border border-slate-100 hover:border-[#f97316]/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col gap-2 min-h-[180px]"
                        >
                            <div className="relative z-10 flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-3 transition-transform group-hover:rotate-12">
                                    <Tractor className="w-5 h-5 text-[#f97316]" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-700 text-lg leading-tight">
                                        {counts.propriedades > 0 ? `${counts.propriedades} ` : ''}Propriedades<br />Cadastrados
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-[#f97316] transition-colors flex items-center gap-2">
                                        Explorar <ArrowRight className="w-3 h-3" />
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Card 4: Products */}
                        <Link
                            href="/repositorio?cat=produtos"
                            className="bg-[#f97316] text-white p-6 rounded-[16px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer relative overflow-hidden flex flex-col gap-2 bg-[url('https://images.unsplash.com/photo-1625246333195-bf791369018e?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center before:absolute before:inset-0 before:bg-[#f97316]/90 before:z-0 min-h-[180px]"
                        >
                            <div className="relative z-10 flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <ShoppingBag className="w-5 h-5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg leading-tight text-white">
                                        {counts.produtos > 0 ? `${counts.produtos} ` : ''}Produtos<br />Cadastrados
                                    </h4>
                                    <p className="text-orange-50 text-[10px] uppercase font-bold tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                                        Ver arquivo <ArrowRight className="w-3 h-3" />
                                    </p>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 group-hover:rotate-12 transition-transform duration-500 z-0">
                                <ShoppingBag className="w-24 h-24 text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
