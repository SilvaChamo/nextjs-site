"use client";

import { Scan, Stethoscope, Store, ArrowRight, Download, Smartphone } from "lucide-react";
import Image from "next/image";

export function MobileAppSection() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4 pointer-events-none"></div>

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                <div className="grid lg:grid-cols-[50%_1fr] gap-16 items-center">

                    {/* Left Column: Content */}
                    <div className="space-y-6 text-center lg:text-left z-10 transition-all duration-700 delay-100 transform translate-y-0 opacity-100">
                        <div>
                            <h2 className="text-[32px] md:text-[50px] font-heading font-black text-emerald-600 leading-[1.1] tracking-tight mb-2">
                                HerbariumAI
                            </h2>
                            <h3 className="text-[32px] md:text-[50px] font-heading font-black text-slate-600 mb-6 leading-[1.1] tracking-tight">
                                O seu agrónomo digital <br /> de bolso
                            </h3>
                            <p className="text-slate-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Identifique pragas, doenças e receba orientações técnicas em segundos com nossa Inteligência Artificial avançada.
                            </p>
                        </div>

                        {/* Two Capabilities as requested */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Feature 1 */}
                            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors group flex items-start gap-3 text-left">
                                <div className="w-10 h-10 bg-emerald-50 rounded-[5px] border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Scan className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-base font-bold text-slate-700">Scanner Inteligente</h3>
                                    <p className="text-[11px] text-slate-500 leading-tight">
                                        Identifique plantas e revele seu valor nutritivo instantaneamente através da câmera.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors group flex items-start gap-3 text-left">
                                <div className="w-10 h-10 bg-emerald-50 rounded-[5px] border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Stethoscope className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-base font-bold text-slate-700">Doctor Plants</h3>
                                    <p className="text-[11px] text-slate-500 leading-tight">
                                        Detecte doenças precocemente e receba sugestões de tratamento correctas.
                                    </p>
                                </div>
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
                            <button className="inline-flex items-center gap-3 bg-emerald-700 hover:bg-[#f97316] text-white px-6 py-3 rounded-[12px] font-bold text-base transition-all duration-300 shadow-xl hover:shadow-[#f97316]/30 hover:-translate-y-1 group">
                                <Download className="w-5 h-5" />
                                Baixar Aplicativo
                                <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                            </button>
                            <p className="text-xs text-slate-400 mt-2 ml-1 font-medium">Disponível para Android e iOS</p>
                        </div>
                    </div>

                    {/* Right Column: App Interface Image */}
                    <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-700 delay-100 perspective-1000">
                        {/* Blob Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-200/50 to-orange-200/50 blur-3xl opacity-70 rounded-full"></div>

                        {/* Realistic Phone Frame */}
                        <div className="relative z-0 w-[280px] md:w-[320px] lg:w-[340px] bg-slate-900 rounded-[45px] p-[5px] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.15),0_30px_60px_-30px_rgba(0,0,0,0.2),inset_0_-1px_3px_0_rgba(255,255,255,0.1)] ring-1 ring-slate-900/20 transition-transform duration-500">

                            {/* Side Buttons */}
                            <div className="absolute top-32 -right-[2px] w-[2px] h-16 bg-slate-800 rounded-r-sm shadow-sm"></div>
                            <div className="absolute top-24 -left-[2px] w-[2px] h-10 bg-slate-800 rounded-l-sm shadow-sm"></div>
                            <div className="absolute top-40 -left-[2px] w-[2px] h-10 bg-slate-800 rounded-l-sm shadow-sm"></div>

                            {/* Inner Screen Container */}
                            <div className="relative w-full h-full bg-black rounded-[40px] overflow-hidden border-[2px] border-slate-900/50">

                                {/* Dynamic Area / Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[25px] bg-black z-20 rounded-b-[16px]">
                                    {/* Camera Dot upper right */}
                                    <div className="absolute top-[6px] right-[12px] w-2 h-2 rounded-full bg-slate-800/80"></div>
                                </div>

                                {/* Screen Image */}
                                <img
                                    src="/assets/botanica.png"
                                    alt="Interface do HerbariumAI"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute z-10 bottom-20 -left-6 md:left-0 lg:-left-12 bg-white p-4 rounded-2xl shadow-xl animate-bounce delay-1000 duration-3000 border border-slate-50">
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
