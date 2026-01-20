"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Calendar, MapPin, Users, Ticket, ArrowUpRight, ArrowRight } from "lucide-react";

export default function EventosPage() {
    const events = [
        {
            title: "FACIM 2025",
            date: "Agosto 2025",
            location: "Ricatla, Marracuene",
            description: "A maior montra de negócios de Moçambique com foco no potencial agrário.",
            icon: Calendar,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500"
        },
        {
            title: "Agro-Tech Summit",
            date: "Março 2025",
            location: "Maputo",
            description: "Fórum de inovação tecnológica para produtores e investidores.",
            icon: Users,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Feiras & Eventos"
                icon={Calendar}
                backgroundImage="https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Eventos", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-900 tracking-tight leading-[1.2]">
                                Promovemos o sector através de experiências <span className="text-[#f97316]">marcantes.</span>
                            </h2>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                Organizamos e apoiamos a realização de feiras, seminários e eventos corporativos voltados para o agronegócio, conectando pessoas e gerando oportunidades.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Events Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {events.map((event, i) => (
                        <div key={i} className="p-6 md:p-10 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-6 group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-5">
                                    <div className={`w-14 h-14 rounded-[10px] flex items-center justify-center shrink-0 ${event.iconBg}`}>
                                        <event.icon className={`h-7 w-7 ${event.iconColor}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-500 transition-colors leading-tight">{event.title}</h3>
                                        <span className="text-xs font-bold text-[#f97316] uppercase tracking-widest">{event.date}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-500 font-medium leading-relaxed flex-1">{event.description}</p>
                            <div className="flex items-center gap-3 text-slate-400 text-sm font-bold uppercase tracking-widest">
                                <MapPin className="w-4 h-4 text-orange-500" />
                                {event.location}
                            </div>
                            <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                                <button className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                                    Saber Mais
                                </button>
                                <div className="size-10 bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-[#111827] rounded-[12px] p-12 text-left relative overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/20 text-white">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-xl space-y-4">
                            <h3 className="text-3xl font-black">Tem um evento para promover?</h3>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                Oferecemos cobertura media, gestão de convites e logística para o seu evento agrário.
                            </p>
                        </div>
                        <button className="px-12 py-4 bg-orange-500 text-white rounded-md font-bold text-base transition-all shadow-lg hover:bg-orange-600 hover:scale-105">
                            Solicitar Apoio
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
