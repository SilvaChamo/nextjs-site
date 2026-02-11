"use client";

import { useParams, notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { servicesData } from "@/lib/services-data";
import {
    CheckCircle2,
    ArrowRight,
    Zap,
    ShieldCheck,
    Star,
    ChevronRight,
    LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ServiceSubCategoryPage() {
    const params = useParams();
    const categoryId = params.category as string;
    const slug = params.slug as string;

    const category = servicesData[categoryId];
    const service = category?.subCategories[slug];

    if (!service) {
        return notFound();
    }

    const Icon = service.icon;
    const isTalentoAgrario = slug === 'talento';
    const contactHref = isTalentoAgrario ? "/servicos/registo-talento" : "/contactos";
    const contactText = isTalentoAgrario ? "Registar Profissional" : "Conectar Agora";

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title={service.title}
                icon={Icon}
                backgroundImage="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: category.title, href: `/servicos/${categoryId}` },
                    { label: service.title, href: undefined }
                ]}
            />

            <div className="container-site relative z-20 mt-[60px] pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-5">
                        {/* Integrated Overview & Sub-services Card */}
                        <section className="bg-white p-[40px] rounded-xl border border-slate-200 shadow-sm space-y-8">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Visão Geral</h2>
                                <div className="space-y-4">
                                    {service.fullDescription.split('\n').filter(p => p.trim() !== '').map((paragraph, index) => (
                                        <p key={index} className="text-base text-slate-600 leading-relaxed font-medium">
                                            {paragraph.trim()}
                                        </p>
                                    ))}
                                </div>
                                {slug === 'registo' && (
                                    <div className="pt-6">
                                        <div className="relative z-50">
                                            <Link
                                                href="/registar"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md font-bold text-[13px] hover:!bg-[#f97316] transition-all group shadow-md shadow-emerald-500/10 hover:shadow-orange-500/20 cursor-pointer"
                                            >
                                                Registe a sua Empresa Agora
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-slate-100 space-y-6">
                                <div className="flex items-center gap-3 py-1">
                                    <div className="w-4 h-[2.5px] bg-[#f97316]" />
                                    <h3 className="text-[13px] font-black text-slate-400 tracking-[0.2em] uppercase">
                                        Soluções Especializadas
                                    </h3>
                                </div>
                                <div className="space-y-6">
                                    {service.subServices.map((sub, i) => (
                                        <div key={i} className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                                                <h4 className="text-[15px] font-black text-slate-800 tracking-tight">
                                                    {sub.title}
                                                </h4>
                                            </div>
                                            <p className="text-[14px] text-slate-500 font-medium leading-[1.5] pl-4 border-l border-slate-100">
                                                {sub.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Features */}
                    <div className="lg:col-span-4 space-y-5">
                        {/* Benefits Card */}
                        <div className="bg-slate-900 p-8 rounded-xl text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px]" />
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-wider text-orange-400">
                                <Star className="w-5 h-5" />
                                Benefícios
                            </h3>
                            <ul className="space-y-6">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-4 group">
                                        <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange-500 transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-[15px] font-bold text-slate-200 leading-tight">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Contact Card */}
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
                            <h4 className="text-lg font-black text-slate-900 tracking-tight truncate">
                                {isTalentoAgrario ? "Seja parceiro" : "Precisa de suporte?"}
                            </h4>
                            <p className="text-[14px] text-slate-500 font-medium line-clamp-2">
                                {isTalentoAgrario
                                    ? "Registe-se como profissional especializado para aceder a oportunidades exclusivas e gerir o seu perfil."
                                    : "Fale com um dos nossos consultores técnicos para entender como podemos ajudar no seu caso específico."}
                            </p>
                            <div className="relative z-50">
                                <Link
                                    href={contactHref}
                                    className="inline-flex items-center justify-center w-fit px-4 py-2 bg-emerald-600 text-white rounded-md font-bold text-[13px] hover:!bg-[#f97316] transition-all shadow-md shadow-emerald-500/10 hover:shadow-orange-500/20 cursor-pointer"
                                >
                                    {contactText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
