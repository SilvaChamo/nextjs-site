"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    LandPlot,
    Building2,
    Package,
    MessageSquare,
    BarChart3,
    LogOut,
    ChevronRight,
    Crown,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const navigation = [
    { name: "Dashboard", href: "/usuario/dashboard", icon: LayoutDashboard },
    { name: "Minhas Propriedades", href: "/usuario/dashboard/propriedades", icon: LandPlot },
    { name: "Minha Empresa", href: "/usuario/dashboard/empresa", icon: Building2 },
    { name: "Meus Produtos", href: "/usuario/dashboard/produtos", icon: Package },
    { name: "Contactos", href: "/usuario/dashboard/contactos", icon: MessageSquare },
    { name: "Análises", href: "/usuario/dashboard/analises", icon: BarChart3 },
];

export function UserSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [plan, setPlan] = React.useState<"basic" | "ouro" | "premium" | "parceiro">("basic");

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const getUpgradeText = () => {
        switch (plan) {
            case "basic": return "Actualize seu plano para Ouro";
            case "ouro": return "Actualize seu plano para Premium";
            case "premium": return "Actualize seu plano para Parceiro";
            default: return "Plano Parceiro Activo";
        }
    };

    return (
        <aside className="w-64 bg-slate-900 text-white shrink-0 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex flex-col h-full">
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-[#f97316] rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-orange-500/20">
                        A
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-black text-sm tracking-tight leading-none">AGRO DATA</h1>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Painel do Usuário</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 flex-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${isActive
                                    ? "bg-[#f97316] text-white shadow-lg shadow-orange-500/30"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`} />
                                {item.name}
                                {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Upgrade Box */}
                <div className="mt-6 mb-6 p-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 shadow-inner relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Crown className="w-12 h-12 text-amber-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Status: {plan}</span>
                        </div>
                        <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                            Obtenha acesso a funcionalidades exclusivas e maior visibilidade.
                        </p>
                        <Button
                            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white text-[10px] font-black uppercase tracking-wider py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02]"
                        >
                            {getUpgradeText()}
                        </Button>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    Terminar Sessão
                </button>
            </div>
        </aside>
    );
}
