"use client";

import React from "react";
import { X, ShieldCheck, Zap, Globe, Smartphone, BarChart3, CloudOff } from "lucide-react";

interface AboutAppModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutAppModal({ isOpen, onClose }: AboutAppModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[30px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-[#f97316] p-6 text-white flex justify-between items-center relative">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-widest">Sobre o Aplicativo</h2>
                            <p className="text-[10px] font-bold text-orange-100 uppercase tracking-tighter">Inovação Tecnológica de Ponta</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
                    >
                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Left Side: The Why */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight">
                                    Por que usar o <span className="text-emerald-600">Botânica?</span>
                                </h3>
                                <p className="text-slate-500 font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-4">
                                    "Transformamos cada smartphone num engenheiro agrónomo pessoal, democratizando o conhecimento técnico para o pequeno e médio agricultor moçambicano."
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <Zap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700">Diagnóstico Instantâneo</h4>
                                        <p className="text-sm text-slate-500">Utilizamos Inteligência Artificial para identificar pragas e doenças em segundos, sugerindo o tratamento correcto imediatamente.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                                        <CloudOff className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700">Funciona Offline</h4>
                                        <p className="text-sm text-slate-500">Sabemos que o campo nem sempre tem sinal. O nosso app funciona sem internet para consultas críticas no terreno.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Features List */}
                        <div className="bg-slate-50 rounded-[20px] p-8 space-y-6 border border-slate-100">
                            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Capacidades Técnicas</h4>

                            <ul className="space-y-4">
                                {[
                                    { title: "Scanner de Nutrientes", desc: "Revela o valor nutricional de plantas silvestres e cultivadas.", icon: BarChart3 },
                                    { title: "Mercado Integrado", desc: "Localiza a loja mais próxima com o pesticida que você precisa.", icon: Globe },
                                    { title: "Monitoria Geográfica", desc: "Mapeia surtos de pragas para alerta precoce da região.", icon: ShieldCheck }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <div className="mt-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                                            <item.icon className="w-3 h-3 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-700 leading-tight">{item.title}</p>
                                            <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6 mt-4 border-t border-slate-200">
                                <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mb-3">Pesquisa & Desenvolvimento</h4>
                                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                                    <p className="text-[11px] font-bold text-emerald-800 leading-relaxed">
                                        <span className="block mb-1">🚀 Inovação em Campo:</span>
                                        Estamos a desenhar a futura unidade robótica móvel controlada por remote, capaz de aplicar tratamentos localizados directamente nas plantas, reduzindo o desperdício de pesticidas.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-200">
                                <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">
                                    Este aplicativo é o motor propulsor da Base de Dados Agrícola de Moçambique, integrando produtores à economia digital.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-medium text-slate-500">Desenvolvido com tecnologia de ponta para o agro de Moçambique.</p>
                    <button className="px-8 py-3 bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] rounded-full hover:bg-emerald-600 transition-colors shadow-lg shadow-slate-900/20">
                        Começar Agora
                    </button>
                </div>
            </div>
        </div>
    );
}
