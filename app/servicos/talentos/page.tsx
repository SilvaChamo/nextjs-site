"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Users, Briefcase, Search, Star, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export default function TalentosPage() {
    const specialists = [
        {
            name: "João Manguane",
            role: "Agrónomo Especialista",
            location: "Beira, Sofala",
            rating: 5,
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-500"
        },
        {
            name: "Maria Mahumane",
            role: "Gestora Agrícola",
            location: "Chokwé, Gaza",
            rating: 4,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            name: "Carlos Tivane",
            role: "Veterinário Sénior",
            location: "Matola, Maputo",
            rating: 5,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Profissionais & Talentos"
                icon={Users}
                backgroundImage="https://images.unsplash.com/photo-1595152248447-c93d5006b00b?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Talentos", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-900 tracking-tight leading-[1.2]">
                                Encontre os melhores especialistas em <span className="text-[#f97316]">agronomia.</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Oferecemos um espaço dedicado para quem procura por serviços profissionais qualificados e para especialistas que desejam oferecer o seu know-how ao sector agrário nacional.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="bg-[#111827] text-white px-8 py-3 rounded-md font-bold transition-all shadow-lg hover:bg-emerald-600 flex items-center gap-2">
                                    <Search className="w-4 h-4" />
                                    Procurar Profissional
                                </button>
                                <button className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-3 rounded-md font-bold transition-all shadow-sm hover:border-[#f97316]">
                                    Registar Perfil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specialists Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialists.map((pro, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-6 group">
                            <div className="flex items-center gap-4">
                                <div className="size-20 bg-slate-100 rounded-full relative overflow-hidden shrink-0 border-2 border-slate-50">
                                    <div className="absolute bottom-0 right-0 size-6 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{pro.name}</h4>
                                    <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{pro.role}</p>
                                </div>
                            </div>

                            <div className="space-y-3 flex-1 border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-2 text-[#f97316]">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${pro.rating >= s ? 'fill-current' : 'text-slate-200'}`} />)}
                                </div>
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {pro.location}
                                </div>
                            </div>

                            <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-[8px] text-[10px] font-black uppercase tracking-widest hover:bg-[#111827] hover:text-white transition-all">
                                Ver Perfil Completo
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
