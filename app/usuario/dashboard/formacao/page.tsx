"use client";

import Link from "next/link";
import { Users, Clock, MapPin, ArrowRight } from "lucide-react";
import { DashboardPageHeader } from "@/components/DashboardPageHeader";

export default function FormacaoPage() {
    const upcomingTrainings = [
        {
            id: "agricultura-precisao",
            title: "Agricultura de Precisão com Drones",
            dateStr: "15-17/02",
            year: "25",
            fullDate: "15-17 Fevereiro 2025",
            duration: "3 dias",
            location: "Maputo, Moçambique",
            instructor: "Eng. Carlos Matola",
            spots: "12 vagas disponíveis"
        },
        {
            id: "gestao-financeira",
            title: "Gestão Financeira para Agro-Negócios",
            dateStr: "22-23/02",
            year: "25",
            fullDate: "22-23 Fevereiro 2025",
            duration: "2 dias",
            location: "Beira, Moçambique",
            instructor: "Dra. Ana Santos",
            spots: "15 vagas disponíveis"
        },
        {
            id: "marketing-digital",
            title: "Marketing Digital para Produtos Agrícolas",
            dateStr: "01-02/03",
            year: "25",
            fullDate: "1-2 Março 2025",
            duration: "2 dias",
            location: "Nampula, Moçambique",
            instructor: "Lic. João Macamo",
            spots: "20 vagas disponíveis"
        },
        {
            id: "iot-agricultura",
            title: "IoT e Sensores na Agricultura",
            dateStr: "08-10/03",
            year: "25",
            fullDate: "8-10 Março 2025",
            duration: "3 dias",
            location: "Maputo, Moçambique",
            instructor: "Eng. Sofia Cossa",
            spots: "10 vagas disponíveis"
        }
    ];

    return (
        <div className="space-y-8">
            <DashboardPageHeader
                title="Formação & Capacitação"
                description="Invista no desenvolvimento da sua equipa com os nossos cursos especializados."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingTrainings.map((training) => (
                    <Link
                        key={training.id}
                        href={`/usuario/dashboard/formacao/${training.id}`}
                        className="flex flex-col rounded-[12px] bg-white border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group overflow-hidden"
                    >
                        {/* Top Section: Date & Details */}
                        <div className="flex flex-row flex-1 border-b border-slate-100">
                            {/* Left Column: Date (20%) */}
                            <div className="w-[120px] md:w-[20%] bg-slate-50 border-r border-slate-200 flex flex-col items-center justify-center p-2 text-center shrink-0">
                                <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">
                                    {training.dateStr}
                                </div>
                                <div className="w-8 h-[2px] bg-slate-200 my-1"></div>
                                <div className="text-3xl md:text-[50px] leading-none font-black text-[#3a3f47] tracking-tighter">
                                    {training.year}
                                </div>
                            </div>

                            {/* Right Column: Details (80%) */}
                            <div className="flex-1 p-5 flex flex-col justify-center">
                                <h4 className="text-lg font-bold text-[#3a3f47] group-hover:text-[#f97316] transition-colors mb-2 leading-tight">
                                    {training.title}
                                </h4>
                                <div className="space-y-1.5 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Users className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span className="line-clamp-1"><b className="text-[#3a3f47]">Formador:</b> {training.instructor}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span className="line-clamp-1"><b className="text-[#3a3f47]">Local:</b> {training.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span><b className="text-[#3a3f47]">Duração:</b> {training.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Section: Footer (Full Width) */}
                        <div className="px-5 py-4 bg-white flex items-center justify-between border-t border-slate-50">
                            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-600 group-hover:text-[#f97316] transition-colors">
                                Ver detalhes do curso
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </div>
                            <span className="px-3 py-1 rounded-[7px] bg-emerald-500 text-white text-xs font-bold shadow-sm">
                                {training.spots}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
