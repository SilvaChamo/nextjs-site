"use client";

import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ShoppingBag, TrendingUp, BarChart3, ArrowUpRight, Tags, ShieldCheck, ArrowRight } from "lucide-react";

export default function MercadoPage() {
    const marketInfo = [
        {
            title: "Cotações do Dia",
            description: "Acompanhe os preços médios do milho, feijão e outros produtos nas principais praças nacionais.",
            icon: TrendingUp,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
            val: "+5.2%"
        },
        {
            title: "Ofertas de Venda",
            description: "Explore anúncios de produtores que procuram escoar grandes quantidades de produção.",
            icon: Tags,
            iconBg: "bg-orange-50",
            iconColor: "text-orange-500",
            val: "1.2k+"
        },
        {
            title: "Garantia de Negócio",
            description: "Transações seguras e monitoradas para garantir que o pagamento e a entrega ocorram sem falhas.",
            icon: ShieldCheck,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            val: "100%"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Compra & Venda"
                icon={ShoppingBag}
                backgroundImage="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Serviços", href: "/servicos" },
                    { label: "Mercado", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">
                {/* Intro Section - White Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-12">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-900 tracking-tight leading-[1.2]">
                                O mercado agrário na palma da <span className="text-[#f97316]">mão.</span>
                            </h2>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                Plataforma dedicada à comercialização de produtos e serviços agrícolas em Moçambique. Compre directamente dos produtores e venda para grandes mercados nacionais e internacionais.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Market Info Grid - On Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketInfo.map((item, i) => (
                        <div key={i} className="p-6 md:p-8 rounded-[12px] bg-white border border-slate-200 shadow-lg shadow-slate-200/50 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col gap-4 group">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 ${item.iconBg}`}>
                                        <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-[#f97316] transition-colors">{item.title}</h3>
                                        <span className="text-2xl font-black text-slate-900">{item.val}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-500 flex-1">{item.description}</p>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-slate-900 transition-colors pt-4">
                                Ver Detalhes <ArrowUpRight className="h-3 w-3" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-[#f97316] rounded-[12px] p-12 text-left relative overflow-hidden shadow-2xl shadow-orange-500/20 text-white">
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
                        <div className="max-w-xl space-y-4">
                            <h3 className="text-3xl font-black leading-tight">Comece a vender agora!</h3>
                            <p className="text-orange-50 font-medium">Publique o seu stock e conecte-se com centenas de compradores em todo o país.</p>
                        </div>
                        <button className="px-12 py-4 bg-white text-[#f97316] rounded-md font-black uppercase text-sm tracking-widest hover:scale-105 active:scale-95 shadow-xl transition-all">
                            Anunciar Produto
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
