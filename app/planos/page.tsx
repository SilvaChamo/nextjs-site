"use client";

import React, { useState } from "react";
import { Check, X, Crown, Zap, Shield, HelpCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Básico",
            price: "Gratuito",
            description: "Para quem está começando a explorar o mercado.",
            features: [
                "Acesso limitado a cotações",
                "Visualização de vagas básicas",
                "Perfil de usuário simples",
                "Suporte via e-mail"
            ],
            notIncluded: [
                "Análise de tendências",
                "Destaque em buscas",
                "Relatórios avançados",
                "Suporte prioritário"
            ],
            cta: "Começar Agora",
            popular: false,
            color: "slate"
        },
        {
            name: "Profissional",
            price: isAnnual ? "2.500 MT" : "250 MT",
            period: isAnnual ? "/ano" : "/mês",
            description: "Para profissionais e pequenas empresas em crescimento.",
            features: [
                "Acesso completo a cotações",
                "Candidatura ilimitada a vagas",
                "Perfil verificado",
                "Análise básica de mercado",
                "Suporte via chat"
            ],
            notIncluded: [
                "Relatórios de exportação",
                "Consultoria dedicada"
            ],
            cta: "Assinar Profissional",
            popular: true,
            color: "orange"
        },
        {
            name: "Empresarial",
            price: isAnnual ? "10.000 MT" : "1.000 MT",
            period: isAnnual ? "/ano" : "/mês",
            description: "Para grandes empresas que precisam de dados estratégicos.",
            features: [
                "Tudo do plano Profissional",
                "Acesso API de dados",
                "Relatórios de exportação PDF/Excel",
                "Consultoria estratégica mensal",
                "Gerente de conta dedicado",
                "Destaque máximo na plataforma"
            ],
            notIncluded: [],
            cta: "Falar com Vendas",
            popular: false,
            color: "emerald"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header / Navbar Simplificada */}
            <header className="bg-white border-b border-slate-200 py-4">
                <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/usuario/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium">
                        <ArrowLeft className="w-5 h-5" />
                        Voltar ao Dashboard
                    </Link>
                    <Link href="/">
                        <Image
                            src="/assets/Logo.png"
                            alt="Base Agro Data"
                            width={140}
                            height={50}
                            className="h-8 w-auto"
                            priority
                        />
                    </Link>
                    <div className="w-[140px] hidden md:block"></div> {/* Spacer for center alignment */}
                </div>
            </header>

            <main className="py-16 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Hero Section */}
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-orange-600 font-bold tracking-wider uppercase text-sm bg-orange-50 px-3 py-1 rounded-full mb-4 inline-block">
                            Planos Flexíveis
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Escolha o plano ideal para o seu <span className="text-emerald-700">crescimento</span>.
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Desbloqueie todo o potencial do Agro Data Moz. Tenha acesso a insights de mercado, cotações em tempo real e ferramentas exclusivas.
                        </p>

                        {/* Toggle Anual/Mensal */}
                        <div className="flex items-center justify-center gap-4 mt-10">
                            <span className={`text-sm font-bold ${!isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Mensal</span>
                            <button
                                onClick={() => setIsAnnual(!isAnnual)}
                                className={`w-16 h-8 rounded-full p-1 transition-colors duration-300 relative ${isAnnual ? 'bg-emerald-600' : 'bg-slate-300'}`}
                            >
                                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
                            </button>
                            <span className={`text-sm font-bold ${isAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
                                Anual <span className="text-emerald-600 text-xs ml-1 bg-emerald-50 px-2 py-0.5 rounded-full">-20% OFF</span>
                            </span>
                        </div>
                    </div>

                    {/* Pricing Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`relative bg-white rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${plan.popular
                                    ? 'border-orange-500 shadow-orange-500/10 z-10 scale-105 md:scale-105 ring-4 ring-orange-500/5'
                                    : 'border-slate-200 shadow-sm'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-wide shadow-lg">
                                        Mais Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                    <p className="text-sm text-slate-500 min-h-[40px]">{plan.description}</p>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className={`text-4xl font-black ${plan.popular ? 'text-orange-600' : 'text-slate-900'}`}>
                                            {plan.price}
                                        </span>
                                        {plan.period && <span className="text-slate-400 font-medium">{plan.period}</span>}
                                    </div>
                                </div>

                                <Button
                                    className={`w-full h-12 rounded-xl font-bold text-base mb-8 transition-all ${plan.popular
                                        ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20'
                                        : plan.color === 'emerald'
                                            ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                                        }`}
                                >
                                    {plan.cta}
                                </Button>

                                <div className="space-y-4">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">O que está incluído</p>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                                                <div className={`p-0.5 rounded-full shrink-0 ${plan.popular ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                        {plan.notIncluded.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3 text-sm text-slate-400">
                                                <div className="p-0.5 rounded-full shrink-0 bg-slate-100 text-slate-400">
                                                    <X className="w-3 h-3" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ / Trust Section */}
                    <div className="mt-20 pt-10 border-t border-slate-200 text-center">
                        <h4 className="text-slate-900 font-bold mb-4">Dúvidas sobre os planos?</h4>
                        <p className="text-slate-600 mb-6">Nossa equipe está pronta para ajudar você a escolher a melhor opção.</p>
                        <Button variant="outline" className="gap-2">
                            <HelpCircle className="w-4 h-4" />
                            Falar com Suporte
                        </Button>
                    </div>

                </div>
            </main>
        </div>
    );
}
