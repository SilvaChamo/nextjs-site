"use client";

import { PageHeader } from "@/components/PageHeader";
import { Info, ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function SobrePage() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <PageHeader
                title={<>Sobre <span className="text-[#f97316]">Nós</span></>}
                icon={Info}
                backgroundImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Sobre Nós", href: undefined }
                ]}
            />

            {/* 1. Introdução Premium (Redesigned - Left Image) */}
            <div className="w-full relative bg-white overflow-hidden">
                <div className="absolute top-0 left-0 w-[45%] h-full hidden lg:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="assets/Agotec.jpg"
                        alt="Background Tech"
                        className="w-full h-full object-cover"
                        style={{ clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)" }} // Cut on the right side now
                    />
                </div>

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10 py-12 md:py-20 flex justify-end">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-600/10 border border-emerald-500/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Nossa Identidade é:</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-600 leading-[1.1] mb-8 tracking-tight py-[6px]">
                            Impulsionar o <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-orange-600">Futuro da Agricultura</span> moçambicana
                        </h1>

                        <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed border-l-4 border-emerald-500 pl-6">
                            <p>
                                A <strong>Base de Dados Agrícola</strong> é mais do que uma plataforma; somos o motor digital que conecta produtores rurais aos mercados globais.
                            </p>
                            <p className="text-base">
                                Utilizamos tecnologia de ponta para democratizar o acesso à informação, transformar dados brutos em inteligência de mercado e criar um ecossistema onde o pequeno produtor e a grande indústria crescem juntos.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-5 py-[5px] bg-white/70 backdrop-blur-sm rounded border border-slate-200/50 shadow-sm">
                                <LucideIcons.CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="font-bold text-slate-600 text-sm">Dados Oficiais</span>
                            </div>
                            <div className="flex items-center gap-2 px-5 py-[5px] bg-white/70 backdrop-blur-sm rounded border border-slate-200/50 shadow-sm">
                                <LucideIcons.Zap className="w-5 h-5 text-emerald-500" />
                                <span className="font-bold text-slate-600 text-sm">Inovação</span>
                            </div>
                            <div className="flex items-center gap-2 px-5 py-[5px] bg-white/70 backdrop-blur-sm rounded border border-slate-200/50 shadow-sm">
                                <LucideIcons.Globe2 className="w-5 h-5 text-emerald-500" />
                                <span className="font-bold text-slate-600 text-sm">Tecnologia de Ponta</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Propósito Corporativo (Updated with BG Image + More Values) */}
            <div className="w-full relative py-24 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2000&auto=format&fit=crop"
                        alt="Field Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90"></div>
                </div>

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Missão Card */}
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10 hover:bg-white/15 transition-all group flex items-start gap-4">
                            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                                <LucideIcons.Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white mb-1">Nossa Missão</h3>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                    Potencializar o agronegócio através da inclusão digital e transações transparentes em toda a cadeia de valor.
                                </p>
                            </div>
                        </div>

                        {/* Visão Card */}
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10 hover:bg-white/15 transition-all group flex items-start gap-4">
                            <div className="w-10 h-10 bg-[#f97316] rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
                                <LucideIcons.Eye className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white mb-1">Nossa Visão</h3>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                    Ser a referência digital do sector agrário na África Austral.
                                </p>
                            </div>
                        </div>

                        {/* Valores Card */}
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/10 hover:bg-white/15 transition-all group flex items-start gap-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                                <LucideIcons.Diamond className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white mb-1">Nossos Valores</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {[
                                        "Transparência", "Inovação", "Impacto"
                                    ].map((val, i) => (
                                        <span key={i} className="px-2 py-0.5 bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded border border-white/10">
                                            {val}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Dados e Monitoria (SECÇÃO DE CIMA - TRANSPARENTE) */}
            <div className="w-full py-24 border-b border-slate-200">
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px]">
                    <div className="text-center mb-16">
                        <span className="text-[#f97316] font-bold tracking-widest uppercase text-xs mb-3 block">— Ecossistema de Informação —</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-600 tracking-tight">
                            O Que <span className="text-[#f97316]">Monitoramos</span>
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto mt-4 font-medium leading-relaxed">
                            Agregamos indicadores vitais de múltiplas fontes oficiais para oferecer uma visão 360º do sector agrário em Moçambique.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: LucideIcons.TrendingUp, label: "Cotações de Mercado", desc: "Preços actualizados diariamente dos principais mercados grossistas (SIMA)." },
                            { icon: LucideIcons.Database, label: "Censo Agro-Pecuário", desc: "Dados estruturais do INE sobre explorações, efectivo pecuário e uso da terra." },
                            { icon: LucideIcons.Sprout, label: "Produção e Colheitas", desc: "Estatísticas de produção por província e previsões para as próximas campanhas." },
                            { icon: LucideIcons.Building2, label: "Directório Comercial", desc: "Base de dados verificada de fornecedores, compradores e prestadores de serviços." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center shadow-sm mb-6 text-slate-400 group-hover:text-[#f97316] group-hover:scale-110 transition-all">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-lg font-black text-slate-600 mb-3">{item.label}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Conectando Moçambique (SECÇÃO DO MEIO - ESCURA) */}
            <div className="w-full relative min-h-[600px] flex items-center overflow-hidden bg-slate-900">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"
                        alt="Infrastructure"
                        className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40"></div>
                </div>

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10 w-full py-20">
                    <div className="max-w-3xl">
                        {/* Orange Line */}
                        <div className="h-2 w-24 bg-[#f97316] mb-8"></div>

                        <h2 className="text-4xl md:text-6xl font-heading font-black text-white leading-[1.1] mb-2 tracking-tight">
                            Conectando o Agro-negócio
                        </h2>
                        <h3 className="text-2xl md:text-4xl font-heading font-normal text-slate-300 leading-tight mb-8">
                            Infra-estrutura que Impulsiona o Desenvolvimento
                        </h3>

                        <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-12 font-medium max-w-2xl">
                            Com uma infra-estrutura de dados robusta e actualizada, a Base de dados agrícolas desempenha um papel fundamental no desenvolvimento do sector agrário, facilitando o acesso à informação e a tomada de decisão sobre agricultura em Moçambique.
                        </p>

                        <button className="bg-[#f97316] text-white pl-8 pr-6 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-[#ea580c] transition-all flex items-center gap-4 group shadow-lg shadow-orange-900/20">
                            Saiba mais sobre nossos serviços
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* 5. Impacto em Números (SECÇÃO DE BAIXO - BRANCA) */}
            <div className="w-full bg-white py-24 border-t border-slate-100">
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-800 leading-tight">
                                Uma Base de Dados <span className="text-emerald-600">Viva e em Crescimento</span>
                            </h2>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                A nossa plataforma não é apenas um arquivo estático. É um organismo vivo alimentado diariamente por milhares de pontos de dados vindos de todas as províncias de Moçambique.
                            </p>

                            <div className="space-y-6 pt-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 text-emerald-600 font-bold">
                                        01
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-600">Confiabilidade</h4>
                                        <p className="text-slate-400 text-sm mt-1">Dados validados e cruzados com fontes oficiais (MADER, INE).</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-[#f97316] font-bold">
                                        02
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-600">Acessibilidade</h4>
                                        <p className="text-slate-400 text-sm mt-1">Informação complexa transformada em gráficos simples para todos.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Big Numbers Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100">
                                <p className="text-4xl md:text-5xl font-black text-[#f97316] mb-2">+10</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Anos de Histórico</p>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100">
                                <p className="text-4xl md:text-5xl font-black text-emerald-600 mb-2">100%</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Cobertura Nacional</p>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100 col-span-2">
                                <p className="text-4xl md:text-5xl font-black text-slate-700 mb-2">24h</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Tempo de Actualização</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
