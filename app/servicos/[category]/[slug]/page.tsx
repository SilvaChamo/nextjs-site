"use client";

import { useParams, notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ContactCTA } from "@/components/ContactCTA";
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Overview Section */}
                        <section className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm">
                            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight uppercase">Visão Geral</h2>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                {service.fullDescription}
                            </p>
                        </section>

                        {/* Sub-services Section */}
                        <section className="space-y-10">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
                                <span className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-[#f97316]" />
                                </span>
                                Soluções Especializadas
                            </h2>
                            <div className="space-y-12">
                                {service.subServices.map((sub, i) => (
                                    <div key={i} className="flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[#f97316]" />
                                            <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">
                                                {sub.title}
                                            </h4>
                                        </div>
                                        <p className="text-[16px] text-slate-500 font-medium leading-[1.6] pl-5 border-l-2 border-slate-100">
                                            {sub.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Features */}
                    <div className="lg:col-span-4 space-y-8">
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
                            <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">Precisa de Suporte?</h4>
                            <p className="text-[14px] text-slate-500 font-medium">
                                Fale com um dos nossos consultores técnicos para entender como podemos ajudar no seu caso específico.
                            </p>
                            <Link
                                href="/contactos"
                                className="flex items-center justify-center w-full py-4 bg-[#f97316] text-white rounded-lg font-bold text-[14px] hover:scale-[1.02] shadow-lg shadow-orange-500/20 transition-all"
                            >
                                Contactar Agora
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Main CTA */}
                <div className="mt-24">
                    <ContactCTA
                        title={`Pronto para começar com ${service.title}?`}
                        description="Nossa equipe está preparada para oferecer soluções integradas e personalizadas para as necessidades da sua empresa no agronegócio."
                        buttonText="Contate-nos já"
                    />
                </div>
            </div>
        </main>
    );
}
