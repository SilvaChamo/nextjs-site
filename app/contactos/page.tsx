"use client";

import { PageHeader } from "@/components/PageHeader";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

export default function ContactosPage() {
    return (
        <main className="min-h-screen bg-transparent relative">
            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('/assets/cta-gradient-bg.jpg')" }}
            />
            <PageHeader
                title={<>Entre em <span className="text-[#f97316]">Contacto</span></>}
                icon={Phone}
                backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Contactos", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">

                {/* Intro Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-[35px] md:text-[48px] font-[900] text-slate-700 tracking-tight leading-[1.1]">
                                Fale com a nossa <span className="text-emerald-600">equipa</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Tem dúvidas sobre os nossos serviços ou precisa de suporte técnico? Entre em contacto connosco através dos canais abaixo ou visite os nossos escritórios.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Contact Info (Vertical Stack) */}
                    <div className="lg:col-span-4 space-y-5">
                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-start gap-6 hover:shadow-md transition-all group">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg mb-1">Telefones</h3>
                                <p className="text-slate-500 font-medium">+258 87 75 75 288</p>
                                <p className="text-slate-500 font-medium">+258 82 52 88 328</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-start gap-6 hover:shadow-md transition-all group">
                            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg mb-1">E-mail</h3>
                                <a href="mailto:geral@baseagrodata.com" className="text-slate-500 font-medium hover:text-[#f97316] transition-colors">
                                    geral@baseagrodata.com
                                </a>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex items-start gap-6 hover:shadow-md transition-all group">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-lg mb-1">Endereço Físico</h3>
                                <p className="text-slate-500 font-medium">Av. Karl Marx nº 177</p>
                                <p className="text-slate-500 font-medium">Maputo - Moçambique</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Secure Contact Form */}
                    <div className="lg:col-span-8">
                        <ContactForm />
                    </div>
                </div>

            </div>
        </main>
    );
}
