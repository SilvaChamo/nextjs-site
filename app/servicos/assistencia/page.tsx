"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Monitor, Settings, Headphones, Rocket, ArrowRight } from "lucide-react";

export default function AssistenciaPage() {
    const services = [
        {
            title: "Criação de Portais",
            description: "Desenvolvimento de sites institucionais, blogs e catálogos para projectos agrários.",
            icon: Rocket,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            title: "Apoio Técnico TI",
            description: "Soluções e assistência para a modernização das suas ferramentas de gestão digital.",
            icon: Settings,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            title: "Suporte Online",
            description: "Equipa dedicada para garantir a manutenção e operacionalidade das suas plataformas.",
            icon: Headphones,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Assistência Digital"
                icon={Monitor}
                backgroundImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Assistência", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-900 tracking-tight leading-[1.2]">
                                Transformação Digital ao seu <span className="text-[#f97316]">alcance.</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Fazemos assistência de plataformas online. Se a sua empresa agrícola precisa de um sistema de gestão, portal de vendas ou integração tecnológica, nossa equipa está pronta para ajudar.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Services Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 group">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${service.iconBg}`}>
                                    <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                                </div>
                                <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-500 flex-1">
                                {service.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors pt-4">
                                Saber Mais <ArrowRight className="h-3 w-3" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-[#111827] rounded-[12px] p-12 text-left relative overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/20 text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px]" />
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
                        <div className="max-w-xl space-y-4">
                            <h3 className="text-3xl font-black">Pronto para digitalizar o seu negócio?</h3>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                Oferecemos consultoria tecnológica especializada para modernizar a sua presença online no sector agrário.
                            </p>
                        </div>
                        <button className="px-12 py-4 bg-blue-500 text-white rounded-md font-bold text-base transition-all shadow-lg hover:bg-blue-600 hover:scale-105 active:scale-95">
                            Falar com Especialista
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
