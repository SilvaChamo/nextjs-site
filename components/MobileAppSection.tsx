"use client";

import { Scan, Stethoscope, Store, ArrowRight, Download, Smartphone } from "lucide-react";
import Image from "next/image";

export function MobileAppSection() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4 pointer-events-none"></div>

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                            <Smartphone className="w-4 h-4" />
                            Aplicativo Móvel
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight">
                                <span className="text-emerald-600">HerbariumAI</span><br />
                                O seu agrónomo digital de bolso
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                                Revolucione a sua produção com inteligência artificial. Detecte pragas, avalie a saúde das suas plantas e encontre os insumos certos ao melhor preço na sua região.
                            </p>
                        </div>

                        {/* Two Capabilities as requested */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Feature 1 */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors group">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Scan className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">Scanner Inteligente</h3>
                                <p className="text-sm text-slate-500">
                                    Identifique plantas e revele seu valor nutritivo instantaneamente através da câmera.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors group">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Stethoscope className="w-6 h-6 text-emerald-600" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700 mb-2">Doctor Plants</h3>
                                <p className="text-sm text-slate-500">
                                    Detecte doenças precocemente e receba sugestões de tratamento correctas.
                                </p>
                            </div>
                        </div>

                        {/* Additional Feature Mention (Store Finder) */}
                        <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                            <Store className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                            <p className="text-sm text-slate-600">
                                <span className="font-bold text-slate-700">Encontre Remédios e Lojas:</span> Localize fornecedores próximos, compare preços e variações na sua região em tempo real.
                            </p>
                        </div>

                        <div className="pt-4">
                            <button className="inline-flex items-center gap-3 bg-slate-900 hover:bg-emerald-600 text-white px-8 py-4 rounded-[14px] font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 group">
                                <Download className="w-5 h-5" />
                                Baixar Aplicativo
                                <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                            </button>
                            <p className="text-xs text-slate-400 mt-3 ml-1 font-medium">Disponível para Android e iOS</p>
                        </div>
                    </div>

                    {/* Right Column: App Interface Image */}
                    <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-700 delay-100">
                        {/* Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-200/50 to-orange-200/50 blur-3xl opacity-70 rounded-full"></div>

                        {/* Phone Frame Mockup */}
                        <div className="relative z-10 w-[300px] md:w-[350px] border-[12px] border-slate-900 rounded-[45px] overflow-hidden shadow-2xl bg-white">
                            {/* Notch / Camera */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[25px] bg-slate-900 rounded-b-[16px] z-20"></div>

                            {/* Screen Image */}
                            <img
                                src="/herbarium-app-mockup.png"
                                alt="Interface do HerbariumAI"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-20 -left-6 md:left-0 lg:-left-12 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-1000 duration-3000 border border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Scan className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase">Status</p>
                                    <p className="text-sm font-black text-slate-700">Scan Completo</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
