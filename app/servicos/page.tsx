"use client";

import { PageHeader } from "@/components/PageHeader";
import {
    Truck,
    ShoppingCart,
    ShoppingBag,
    Users,
    Monitor,
    Calendar,
    PenTool,
    Briefcase,
    ArrowRight,
    CheckCircle2,
    Lightbulb,
    GraduationCap
} from "lucide-react";
import Link from "next/link";

export default function ServicesIndexPage() {
    const allServices = [
        {
            title: "Logística & Transporte",
            description: "Escoamento de produção em grande escala e parcerias com transportadoras nacionais.",
            icon: Truck,
            href: "/servicos/transporte",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            title: "Lojas de Insumos",
            description: "Directório nacional de sementes, fertilizantes e maquinaria agrícola.",
            icon: ShoppingCart,
            href: "/servicos/insumos",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500"
        },
        {
            title: "Compra & Venda",
            description: "Plataforma de comercialização directa entre produtores e grandes compradores.",
            icon: ShoppingBag,
            href: "/servicos/mercado",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            title: "Assistência Digital",
            description: "Suporte tecnológico e criação de portais para a modernização do agro-negócio.",
            icon: Monitor,
            href: "/servicos/assistencia",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            title: "Feiras & Eventos",
            description: "Promoção e organização de eventos corporativos e feiras do sector agrário.",
            icon: Calendar,
            href: "/servicos/eventos",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500"
        },
        {
            title: "Gestão de Conteúdo",
            description: "Estratégia digital e produção de media exclusiva para o agro-negócio.",
            icon: PenTool,
            href: "/servicos/conteudo",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            title: "Vagas de Emprego",
            description: "Oportunidades de carreira nas principais empresas do sector agrário.",
            icon: Briefcase,
            href: "/servicos/emprego",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        },
        {
            title: "Consultoria Digital",
            description: "Assessoria especializada em transformação digital e estratégias tecnológicas para o agro-negócio.",
            icon: Lightbulb,
            href: "/servicos/consultoria",
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600"
        },
        {
            title: "Formação & Capacitação",
            description: "Workshops e programas de formação em tecnologias agrícolas e gestão de negócios.",
            icon: GraduationCap,
            href: "/servicos/formacao",
            iconBg: "bg-indigo-50",
            iconColor: "text-indigo-600"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title={<>Nossos <span className="text-[#f97316]">Serviços</span></>}
                icon={CheckCircle2}
                backgroundImage="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">

                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-600 tracking-tight leading-[1.2]">
                                Soluções integradas para o sucesso da <span className="text-[#f97316]">agricultura moçambicana</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                A Base Agro Data oferece um ecossistema completo de serviços pensados para modernizar, conectar e impulsionar o sector em Moçambique através de soluções assertivas e eficientes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Services Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allServices.map((service, i) => (
                        <Link
                            key={i}
                            href={service.href}
                            className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${service.iconBg}`}>
                                    <service.icon className={`h-6 w-6 ${service.iconColor}`} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-[#f97316] transition-colors">{service.title}</h3>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-500 flex-1">
                                {service.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors pt-4">
                                Explorar Serviço <ArrowRight className="h-3 w-3" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-[#111827] rounded-[12px] p-12 text-left relative overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black text-white">Precisa de um serviço personalizado?</h3>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                Estamos prontos para criar soluções à medida das necessidades da sua empresa ou projecto agrário. Entre em contacto com a nossa equipa técnica.
                            </p>
                        </div>
                        <div className="lg:text-right">
                            <button className="px-12 py-4 bg-[#f97316] text-white rounded-md font-bold text-base transition-all shadow-lg hover:scale-105 active:scale-95">
                                Contactar Consultoria
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
