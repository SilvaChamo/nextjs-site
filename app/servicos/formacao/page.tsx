"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { GraduationCap, BookOpen, Users, Laptop, ArrowRight, Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

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
        <main className="min-h-screen bg-slate-50 flex flex-col items-center">
            <div className="w-full">
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
            </div>

            <div className="w-full max-w-[1350px] px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">


                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-0">

                    {/* Left Column: Past Courses (35%) */}
                    <div className="lg:pr-[30px] flex flex-col h-full">
                        <div className="border-b border-slate-200 pb-[10px] text-left lg:-mr-[30px] lg:pr-[30px] shrink-0 relative">
                            <h3 className="text-2xl md:text-3xl font-black text-[#3a3f47]">
                                Cursos <span className="text-[#f97316]">Passados</span>
                            </h3>
                            <div className="hidden lg:block absolute right-0 bottom-0 w-[1px] h-[40px] bg-slate-200 translate-y-[-1px]"></div>
                        </div>
                        <div className="flex flex-col gap-6 pt-8 lg:-mr-[30px] lg:pr-[30px] border-r border-slate-200 flex-1">
                            {programs.map((program, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-[12px] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-3"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${program.iconBg}`}>
                                            <program.icon className={`h-5 w-5 ${program.iconColor}`} />
                                        </div>
                                        <h3 className="text-lg font-bold leading-tight text-[#3a3f47]">{program.title}</h3>
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-500">
                                        {program.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Upcoming Trainings (65%) */}
                    <div className="space-y-8 lg:pl-[30px] flex flex-col h-full">
                        <div className="border-b border-slate-200 pb-[10px] text-left lg:-ml-[30px] lg:pl-[30px] shrink-0">
                            <h3 className="text-2xl md:text-3xl font-black text-[#3a3f47]">
                                Próximas <span className="text-[#f97316]">Formações</span>
                            </h3>
                        </div>
                        <div className="flex flex-col gap-6">
                            {upcomingTrainings.map((training) => (
                                <Link
                                    key={training.id}
                                    href={`/servicos/formacao/${training.id}`}
                                    className="flex flex-col rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                                >
                                    {/* Top Section: Date & Details */}
                                    <div className="flex flex-row flex-1 border-b border-slate-100">
                                        {/* Left Column: Date (20%) */}
                                        <div className="w-[20%] bg-slate-50 border-r border-slate-200 flex flex-col items-center justify-center p-2 text-center shrink-0">
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">
                                                {training.dateStr}
                                            </div>
                                            <div className="w-8 h-[2px] bg-slate-200 my-1"></div>
                                            <div className="text-[50px] leading-none font-black text-[#3a3f47] tracking-tighter">
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
                                        <div className="flex items-center gap-2 text-sm font-bold text-slate-600 group-hover:text-[#f97316] transition-colors">
                                            Leia mais detalhes sobre o curso
                                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                        </div>
                                        <span className="px-3 py-1 rounded-[7px] bg-emerald-500 text-white text-xs font-bold shadow-sm">
                                            {training.spots}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-start items-center gap-2 pt-8 mt-auto">
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-transparent text-slate-500 hover:border-[#f97316] hover:text-[#f97316] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-[#f97316] text-[#f97316] font-bold shadow-sm">
                                1
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-medium hover:border-[#f97316] hover:text-[#f97316] transition-colors shadow-sm">
                                2
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-medium hover:border-[#f97316] hover:text-[#f97316] transition-colors shadow-sm">
                                3
                            </button>
                            <span className="text-slate-400 px-2">...</span>
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-transparent text-slate-500 hover:border-[#f97316] hover:text-[#f97316] transition-colors shadow-sm">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                {/* CTA Section */}
                <div className="mt-24 rounded-[12px] p-8 md:p-12 text-center shadow-2xl shadow-slate-200/50 overflow-hidden relative group">
                    {/* Animated Background */}
                    <div
                        className="absolute inset-0 z-0 animate-ken-burns"
                        style={{
                            backgroundImage: "url('/assets/cta-gradient-bg.webp')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    ></div>

                    {/* Green Overlay */}
                    <div className="absolute inset-0 bg-emerald-900/75 z-0 backdrop-blur-[1px]"></div>

                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 relative z-10">
                        Invista no desenvolvimento da <span className="text-[#f97316]">sua equipa</span>
                    </h3>
                    <p className="text-indigo-100 font-medium mb-6 max-w-2xl mx-auto relative z-10">
                        Contacte-nos para conhecer os nossos programas de formação personalizados.
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-[#f97316] hover:border-[#f97316] shadow-lg relative z-10"
                    >
                        Reserve a sua vaga
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
