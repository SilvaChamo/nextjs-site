"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Zap, GraduationCap, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface PermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: "no-login" | "restricted-plan" | "already-allowed";
    currentPlan?: string;
}

export function PermissionModal({
    isOpen,
    onClose,
    type,
    currentPlan = "Básico"
}: PermissionModalProps) {
    const router = useRouter();

    const config = {
        "no-login": {
            icon: <ShieldAlert className="w-12 h-12 text-orange-500" />,
            title: "Acesso Restrito",
            description: "Para cadastrar cursos e formações na Base Agro Data, é necessário ter uma conta ativa com um plano parceiro ou profissional.",
            buttonLabel: "Ver Planos & Preços",
            action: () => router.push("/planos")
        },
        "restricted-plan": {
            icon: <Zap className="w-12 h-12 text-emerald-500" />,
            title: "Faça o Upgrade",
            description: `Seu plano atual (${currentPlan}) não permite o cadastro de cursos. Faça o upgrade para o plano Profissional ou Empresarial para desbloquear esta funcionalidade.`,
            buttonLabel: "Mudar de Plano",
            action: () => router.push("/planos")
        },
        "already-allowed": {
            icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
            title: "Ir para o Painel",
            description: "Você já possui permissão para cadastrar cursos! Todas as suas formações podem ser geridas diretamente no seu painel de controlo.",
            buttonLabel: "Ir para o Dashboard",
            action: () => router.push("/usuario/dashboard/formacao")
        }
    }[type];

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[480px] rounded-[24px] border-none p-0 overflow-hidden shadow-2xl">
                <div className="bg-slate-50 p-8 flex flex-col items-center text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm">
                        {config.icon}
                    </div>

                    <DialogTitle className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                        {config.title}
                    </DialogTitle>

                    <DialogDescription className="text-slate-500 text-[15px] leading-relaxed font-medium px-4">
                        {config.description}
                    </DialogDescription>
                </div>

                <div className="p-8 bg-white border-t border-slate-100">
                    <Button
                        onClick={() => {
                            config.action();
                            onClose();
                        }}
                        className="w-full h-14 bg-emerald-600 hover:bg-[#f97316] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 group text-sm uppercase tracking-widest"
                    >
                        {config.buttonLabel}
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>

                    <button
                        onClick={onClose}
                        className="w-full mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest py-2"
                    >
                        Talvez mais tarde
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
