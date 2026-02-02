"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Truck, Ship, Globe, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export default function TransportePage() {
    const features = [
        {
            icon: Truck,
            title: "Transporte Terrestre",
            description: "Frota especializada para o transporte de produtos agrários em grandes quantidades por todo o território nacional.",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            icon: Ship,
            title: "Logística Multimodal",
            description: "Integração eficiente entre transporte rodoviário e marítimo para escoamento de produção para exportação.",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            icon: ShieldCheck,
            title: "Segurança de Carga",
            description: "Protocolos rigorosos de segurança e monitoramento em tempo real para garantir a integridade dos seus produtos.",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Logística & Transporte"
                icon={Truck}
                backgroundImage="https://images.unsplash.com/photo-1586528116311-ad86d7c49390?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Transporte", href: undefined }
                ]}
            />

            <div className="container-site relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Ligamos a sua produção ao <span className="text-emerald-500">mercado global.</span>
                            </h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Iremos estabelecer parcerias estratégicas com as principais empresas de transporte e logística para garantir que os seus produtos agrários cheguem ao destino com eficiência, segurança e o menor custo possível.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${f.iconBg}`}>
                                    <f.icon className={`h-6 w-6 ${f.iconColor}`} />
                                </div>
                                <h3 className="text-xl font-bold leading-tight text-slate-900">{f.title}</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-500 flex-1">{f.description}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-[#111827] rounded-[12px] p-12 text-left relative overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/20 text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black">Pronto para transportar grandes volumes?</h3>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                Seja para transporte nacional entre províncias ou para exportação em grandes quantidades, facilitamos a conexão com operadores logísticos certificados.
                            </p>
                        </div>
                        <div className="lg:text-right">
                            <button className="px-12 py-4 bg-[#f97316] text-white rounded-md font-bold text-base transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-3 ml-auto">
                                Solicitar Cotação
                                <Clock className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
