"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { PenTool, Share2, Video, BarChart2, ArrowRight } from "lucide-react";

export default function ConteudoPage() {
    const services = [
        {
            title: "Escrita Têcnica & Blog",
            description: "Criação de artigos e newsletters voltadas para o público agrário, garantindo relevância.",
            icon: PenTool,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            title: "Gestão de Redes Sociais",
            description: "Estratégias personalizadas para Instagram, Facebook e LinkedIn do seu agro-negócio.",
            icon: Share2,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            title: "Produção de Media",
            description: "Fotografia e vídeo profissional para documentar fazendas e projectos rurais.",
            icon: Video,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Criação & Gestão de Conteúdo"
                icon={PenTool}
                backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Conteúdo", href: undefined }
                ]}
            />

            <div className="container-site relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[45px] font-heading font-black text-slate-900 tracking-tight leading-[1.2]">
                                Comunicamos o valor do seu <span className="text-[#f97316]">agro-negócio.</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Num mundo digital, a forma como apresenta os seus serviços define o seu sucesso. Especializamo-nos na criação de conteúdo exclusivo para o sector agrário moçambicano.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Services Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((s, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 group">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${s.iconBg}`}>
                                    <s.icon className={`h-6 w-6 ${s.iconColor}`} />
                                </div>
                                <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-500 flex-1">{s.description}</p>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors pt-4">
                                Saber Mais <ArrowRight className="h-3 w-3" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-blue-600 rounded-[12px] p-12 text-left relative overflow-hidden shadow-2xl shadow-blue-900/20 text-white">
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                        <div className="max-w-xl space-y-4">
                            <h3 className="text-3xl font-black leading-tight">Estratégia Digital Completa</h3>
                            <p className="text-blue-50 font-medium leading-relaxed">
                                Não basta apenas publicar, é necessário estratégia. Criamos o tom de voz ideal para a sua marca agro no digital.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <BarChart2 className="w-5 h-5 text-emerald-300" />
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Foco em Resultados</span>
                            </div>
                        </div>
                        <button className="px-12 py-4 bg-white text-blue-600 rounded-md font-bold text-base transition-all shadow-lg hover:scale-105">
                            Solicitar Proposta
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
