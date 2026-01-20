"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { GraduationCap, BookOpen, Users, Laptop, ArrowRight, Calendar, Clock, MapPin } from "lucide-react";

export default function FormacaoPage() {
    const programs = [
        {
            title: "Tecnologias Agrícolas Modernas",
            description: "Formação em ferramentas digitais, IoT, drones e sistemas de monitorização para agricultura de precisão.",
            icon: Laptop,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            title: "Gestão de Agro-Negócios",
            description: "Workshops sobre planeamento estratégico, gestão financeira e marketing para empresas agrícolas.",
            icon: BookOpen,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            title: "Capacitação de Equipas",
            description: "Programas personalizados para desenvolvimento de competências técnicas e de liderança.",
            icon: Users,
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-500"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Formação & Capacitação"
                icon={GraduationCap}
                backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Formação", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-600 tracking-tight leading-[1.2]">
                                Capacite a sua equipa para o <span className="text-[#f97316]">futuro da agricultura</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Oferecemos programas de formação e workshops especializados em tecnologias agrícolas, gestão de negócios e desenvolvimento de competências para profissionais do sector agrário moçambicano.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {programs.map((program, i) => (
                        <div
                            key={i}
                            className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${program.iconBg}`}>
                                    <program.icon className={`h-6 w-6 ${program.iconColor}`} />
                                </div>
                                <h3 className="text-xl font-bold leading-tight text-slate-900">{program.title}</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-500">
                                {program.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Upcoming Trainings Schedule */}
                <div className="mb-12">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">
                        Próximas <span className="text-[#f97316]">Formações</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                id: "agricultura-precisao",
                                title: "Agricultura de Precisão com Drones",
                                date: "15-17 Fevereiro 2025",
                                duration: "3 dias",
                                location: "Maputo, Moçambique",
                                instructor: "Eng. Carlos Matola",
                                spots: "12 vagas disponíveis"
                            },
                            {
                                id: "gestao-financeira",
                                title: "Gestão Financeira para Agro-Negócios",
                                date: "22-23 Fevereiro 2025",
                                duration: "2 dias",
                                location: "Beira, Moçambique",
                                instructor: "Dra. Ana Santos",
                                spots: "15 vagas disponíveis"
                            },
                            {
                                id: "marketing-digital",
                                title: "Marketing Digital para Produtos Agrícolas",
                                date: "1-2 Março 2025",
                                duration: "2 dias",
                                location: "Nampula, Moçambique",
                                instructor: "Lic. João Macamo",
                                spots: "20 vagas disponíveis"
                            },
                            {
                                id: "iot-agricultura",
                                title: "IoT e Sensores na Agricultura",
                                date: "8-10 Março 2025",
                                duration: "3 dias",
                                location: "Maputo, Moçambique",
                                instructor: "Eng. Sofia Cossa",
                                spots: "10 vagas disponíveis"
                            }
                        ].map((training) => (
                            <Link
                                key={training.id}
                                href={`/servicos/formacao/${training.id}`}
                                className="p-6 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#f97316] transition-colors mb-2">
                                            {training.title}
                                        </h4>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            {training.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                                            <Clock className="w-4 h-4" />
                                            {training.duration}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                                            <MapPin className="w-4 h-4" />
                                            {training.location}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Users className="w-4 h-4" />
                                            {training.instructor}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span className="text-sm font-semibold text-emerald-600">{training.spots}</span>
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                                        Ver Detalhes
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-[15px] p-8 md:p-12 text-center shadow-2xl shadow-indigo-900/20">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                        Invista no desenvolvimento da sua equipa
                    </h3>
                    <p className="text-indigo-200 mb-6 max-w-2xl mx-auto">
                        Contacte-nos para conhecer os nossos programas de formação personalizados.
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6a0a] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                        Solicitar Informações
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
