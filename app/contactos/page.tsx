"use client";

import { PageHeader } from "@/components/PageHeader";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactosPage() {
    return (
        <main className="min-h-screen bg-slate-50">
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
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-600 tracking-tight leading-[1.2]">
                                Fale com a nossa <span className="text-[#f97316]">equipa</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Tem dúvidas sobre os nossos serviços ou precisa de suporte técnico? Entre em contacto connosco através dos canais abaixo ou visite os nossos escritórios.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Grids */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Telefone</h3>
                            <p className="text-slate-500 text-sm mt-1">+258 84 123 4567</p>
                            <p className="text-slate-500 text-sm">+258 82 123 4567</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Email</h3>
                            <p className="text-slate-500 text-sm mt-1">geral@baseagrodata.co.mz</p>
                            <p className="text-slate-500 text-sm">suporte@baseagrodata.co.mz</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Endereço</h3>
                            <p className="text-slate-500 text-sm mt-1">Av. Julius Nyerere, nº 123</p>
                            <p className="text-slate-500 text-sm">Maputo, Moçambique</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
