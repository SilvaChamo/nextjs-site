"use client";

import { useState, useEffect } from "react";
import { Lightbulb, X, ArrowRight, TrendingUp, Target, BarChart3, Rocket } from "lucide-react";
import { usePlanPermissions } from "@/hooks/usePlanPermissions";
import Link from "next/link";

const PLAN_TIPS = {
    "Gratuito": [
        {
            icon: Rocket,
            title: "Dica de Crescimento Matinal",
            message: "Sabia que perfis com foto e descrição completa recebem 3x mais contactos? Actualize o seu perfil!",
            actionLabel: "Completar Perfil",
            actionHref: "/usuario/dashboard/minha-conta"
        },
        {
            icon: TrendingUp,
            title: "Dica de Visibilidade",
            message: "O Plano Básico permite listar até 10 produtos e aparecer em buscas prioritárias.",
            actionLabel: "Ver Planos",
            actionHref: "/planos"
        }
    ],
    "Básico": [
        {
            icon: Target,
            title: "Dica de Conversão",
            message: "Use palavras-chave específicas como 'Tomate Maputo' em vez de apenas 'Tomate' para atrair compradores locais.",
            actionLabel: "Analisar Keywords",
            actionHref: "/usuario/dashboard"
        },
        {
            icon: BarChart3,
            title: "Dica de Mercado",
            message: "A categoria de 'Cereais' está com procura recorde este mês em Sofala. Explore esta oportunidade!",
            actionLabel: "Ver Tendências",
            actionHref: "/usuario/dashboard"
        }
    ],
    "Profissional": [
        {
            icon: BarChart3,
            title: "Dica de Expansão",
            message: "A sua taxa de conversão em 'Leguminosas' subiu 15%. Considere criar uma apresentação dedicada para este sector.",
            actionLabel: "Criar Apresentação",
            actionHref: "/admin/apresentacoes"
        },
        {
            icon: Target,
            title: "Dica Estratégica",
            message: "Directórios internacionais estão a pesquisar por fornecedores em Mozambique. Active a sua partilha de perfil pública.",
            actionLabel: "Gerir Partilha",
            actionHref: "/usuario/dashboard"
        }
    ],
    "Premium": [
        {
            icon: TrendingUp,
            title: "Performance de Elite",
            message: "O seu perfil está no top 5% de visibilidade. Use os dados de análise profunda para ajustar os seus preços ao mercado.",
            actionLabel: "Ver Analytics Pro",
            actionHref: "/usuario/dashboard"
        },
        {
            icon: BarChart3,
            title: "Oportunidade de Negócio",
            message: "Detectámos uma lacuna de fornecimento em 'Maquinaria Agrícola' na província de Tete. Veja os detalhes da procura.",
            actionLabel: "Relatório de Procura",
            actionHref: "/usuario/dashboard"
        }
    ],
    "Parceiro": [
        {
            icon: Rocket,
            title: "Dica de Ecossistema",
            message: "Como parceiro, pode agora enviar mensagens prioritárias para toda a rede de produtores de 'Citri'.",
            actionLabel: "Enviar Mensagem",
            actionHref: "/admin/mensagens"
        }
    ]
};

export function GrowthNotificationBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTip, setCurrentTip] = useState<any>(null);
    const { plan } = usePlanPermissions();

    useEffect(() => {
        // Only show if not dismissed in this session
        const isDismissed = sessionStorage.getItem("growth_tip_dismissed");
        if (isDismissed) return;

        // Get tips for the current plan (default to Gratuito if not found)
        const planTips = (PLAN_TIPS as any)[plan] || PLAN_TIPS["Gratuito"];

        // Pick a random tip from the available ones
        const randomTip = planTips[Math.floor(Math.random() * planTips.length)];
        setCurrentTip(randomTip);

        // Slide in after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, [plan]);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem("growth_tip_dismissed", "true");
    };

    if (!currentTip) return null;

    const Icon = currentTip.icon;

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out transform ${isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
        >
            <div className="mx-auto max-w-4xl mt-4 px-4">
                <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 border border-emerald-500/30 shadow-2xl shadow-emerald-900/40 rounded-2xl overflow-hidden relative group">
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50"></div>

                    <div className="relative p-4 md:p-5 flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-emerald-400 fill-emerald-400/10" />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1">
                                {currentTip.title}
                            </h5>
                            <p className="text-sm font-medium text-slate-100 leading-tight">
                                {currentTip.message}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={currentTip.actionHref}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all hover:shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2 group/btn"
                            >
                                {currentTip.actionLabel}
                                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>

                            <button
                                onClick={handleClose}
                                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar Animation */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-500/50 w-full">
                        <div className="h-full bg-emerald-400 animate-progress-shrink origin-left"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes progress-shrink {
                    from { transform: scaleX(1); }
                    to { transform: scaleX(0); }
                }
                .animate-progress-shrink {
                    animation: progress-shrink 15s linear forwards;
                }
            `}</style>
        </div>
    );
}
