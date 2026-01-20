"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ShoppingCart, MapPin, Phone, ArrowRight, Package, BadgeCheck } from "lucide-react";

export default function InsumosPage() {
    const stores = [
        {
            name: "Agro-Insumos Niassa Lda",
            category: "Sementes & Fertilizantes",
            location: "Lichinga, Niassa",
            status: "Aberto",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500"
        },
        {
            name: "Tecno-Campo Sul",
            category: "Maquinaria & Equipamento",
            location: "Matola, Maputo",
            status: "Aberto",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            name: "Eco-Sementes Centro",
            category: "Insumos Orgânicos",
            location: "Chimoio, Manica",
            status: "Fechado",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Lojas de Insumos"
                icon={ShoppingCart}
                backgroundImage="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Insumos", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Directório Nacional de <span className="text-[#f97316]">Lojas de Insumos.</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Encontre as melhores lojas de sementes, fertilizantes e equipamentos em Moçambique. Filtre por localização e categoria para soluções assertivas na sua produção.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stores Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stores.map((store, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${store.iconBg}`}>
                                        <Package className={`h-6 w-6 ${store.iconColor}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-[#f97316] transition-colors">{store.name}</h3>
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{store.category}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                    <MapPin className="w-4 h-4 text-[#f97316]" />
                                    {store.location}
                                </div>
                                <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                    <BadgeCheck className="w-4 h-4 text-emerald-500" />
                                    Revendedor Autorizado
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                <button className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                                    <Phone className="w-4 h-4" />
                                    Contactar Loja
                                </button>
                                <div className="size-10 bg-white rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-[#f97316] group-hover:text-white transition-all shadow-sm">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
