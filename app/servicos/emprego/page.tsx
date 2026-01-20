"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Briefcase, MapPin, Building2, Clock, ArrowRight, Search } from "lucide-react";

export default function EmpregoPage() {
    const jobs = [
        {
            title: "Engenheiro Agrónomo Sénior",
            company: "Agro-Mozambique Lda",
            location: "Nampula",
            type: "Full-time",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            title: "Gestor de Unidade",
            company: "Fazendas do Niassa",
            location: "Lichinga",
            type: "Contrato",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500"
        },
        {
            title: "Técnico de Extensão",
            company: "ONG Desenvolve Agro",
            location: "Manica",
            type: "Projecto",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Vagas de Emprego"
                icon={Briefcase}
                backgroundImage="https://images.unsplash.com/photo-1590233461421-2e62057398fb?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Emprego", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-900 tracking-tight leading-[1.2]">
                                Construa a sua carreira no <span className="text-[#f97316]">agro-negócio.</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                A Base Agro Data conecta profissionais talentosos às melhores empresas do sector agrário em Moçambique. Encontre a sua próxima oportunidade aqui.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Jobs Grid - On Background */}
                <div className="grid grid-cols-1 gap-4">
                    {jobs.map((job, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-[10px] flex items-center justify-center shrink-0 ${job.iconBg}`}>
                                    <Building2 className={`h-7 w-7 ${job.iconColor}`} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{job.title}</h4>
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <Building2 className="w-3.5 h-3.5 text-[#f97316]" />
                                            {job.company}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-[#f97316]" />
                                            {job.location}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-8 pt-4 md:pt-0 border-t md:border-none border-slate-200">
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{job.type}</p>
                                    <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-1">
                                        <Clock className="w-3 h-3" /> há 2 dias
                                    </span>
                                </div>
                                <div className="size-10 bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-[#111827] rounded-[12px] p-12 text-left relative overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/20 text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-black">Recrute os melhores talentos</h3>
                            <p className="text-slate-400 font-medium">A sua empresa precisa de especialistas? Publique as suas vagas na maior base de dados agrária.</p>
                        </div>
                        <div className="lg:text-right">
                            <button className="px-12 py-4 bg-emerald-500 text-white rounded-md font-bold text-base transition-all shadow-lg hover:scale-105 active:scale-95">
                                Publicar Nova Vaga
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
