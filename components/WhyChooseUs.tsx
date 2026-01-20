import React from "react";
import { TrendingUp, MapPin, Users, Target, Eye, Globe, Building2, Tractor, Briefcase, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export function WhyChooseUs() {
    return (

        <section className="bg-white py-[100px] overflow-hidden">
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Column: Text Content */}
                <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 sticky top-24">
                    <div className="space-y-4">
                        <h2 className="text-[35px] md:text-[48px] font-extrabold text-slate-500 leading-[1.1] tracking-tight">
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
                                className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#f97316] text-white px-8 py-[10px] rounded-[9px] font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-orange-500/30 hover:-translate-y-1 group"
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
                            href="/pesquisa?cat=empresas"
                            className="bg-emerald-600 text-white p-6 rounded-[16px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer relative overflow-hidden flex flex-col gap-2 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center before:absolute before:inset-0 before:bg-emerald-600/90 before:z-0 min-h-[180px]"
                        >
                            <div className="relative z-10 flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <Building2 className="w-5 h-5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg leading-tight text-white">
                                        Empresas<br />Registadas
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
                            href="/pesquisa?cat=profissionais"
                            className="bg-white p-6 rounded-[16px] shadow-md border border-slate-100 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col gap-2 min-h-[180px]"
                        >
                            <div className="relative z-10 flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3 transition-transform group-hover:rotate-12">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-700 text-lg leading-tight">
                                        Profissionais<br />Cadastrados
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-blue-600 transition-colors flex items-center gap-2">
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
                            href="/pesquisa?cat=propriedades"
                            className="bg-white p-6 rounded-[16px] shadow-md border border-slate-100 hover:border-[#f97316]/30 transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col gap-2 min-h-[180px]"
                        >
                            <div className="relative z-10 flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mb-3 transition-transform group-hover:rotate-12">
                                    <Tractor className="w-5 h-5 text-[#f97316]" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-slate-700 text-lg leading-tight">
                                        Propriedades<br />Cadastrados
                                    </h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-[#f97316] transition-colors flex items-center gap-2">
                                        Explorar <ArrowRight className="w-3 h-3" />
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* Card 4: Products */}
                        <Link
                            href="/pesquisa?cat=produtos"
                            className="bg-[#f97316] text-white p-6 rounded-[16px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer relative overflow-hidden flex flex-col gap-2 bg-[url('https://images.unsplash.com/photo-1625246333195-bf791369018e?q=80&w=1770&auto=format&fit=crop')] bg-cover bg-center before:absolute before:inset-0 before:bg-[#f97316]/90 before:z-0 min-h-[180px]"
                        >
                            <div className="relative z-10 flex flex-col items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <ShoppingBag className="w-5 h-5 text-white" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="font-bold text-lg leading-tight text-white">
                                        Produtos<br />Cadastrados
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
