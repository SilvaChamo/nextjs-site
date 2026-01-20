"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    LandPlot,
    Building2,
    Package,
    MessageSquare,
    BarChart3,
    LogOut,
    Crown,
    Settings,
    HelpCircle,
    User
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import { Button } from "./ui/button";

const navigation = [
    { name: "Dashboard", href: "/usuario/dashboard", icon: LayoutDashboard },
    { name: "Minha Conta", href: "/usuario/dashboard/minha-conta", icon: User },
    { name: "Meus Produtos", href: "/usuario/dashboard/produtos", icon: Package },
    { name: "Contactos", href: "/usuario/dashboard/contactos", icon: MessageSquare },
    { name: "Análise", href: "/usuario/dashboard/analises", icon: BarChart3 },
];

export function UserSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [plan] = useState<"basic" | "ouro" | "premium">("basic"); // Could be fetched from user profile

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <aside className="w-64 bg-slate-900 min-h-screen flex flex-col text-slate-300 border-r border-slate-800 flex-shrink-0 transition-all duration-300">
            {/* Header / Logo Area */}
            <div className="p-6 border-b border-slate-800/50">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg group-hover:bg-orange-600 transition-colors">
                        B
                    </div>
                    <span className="font-heading font-bold text-white text-lg tracking-tight">BASE AGRO</span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu Principal</p>
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${isActive
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                : "hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500 group-hover:text-white"}`} />
                            {item.name}
                        </Link>
                    );
                })}

                <div className="pt-6 pb-2">
                    <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Suporte & Config</p>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-all text-slate-400">
                        <Settings className="w-5 h-5 text-slate-500" />
                        Configurações
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 hover:text-white transition-all text-slate-400">
                        <HelpCircle className="w-5 h-5 text-slate-500" />
                        Ajuda
                    </Link>
                </div>
            </nav>

            {/* Upgrade Card */}
            <div className="p-4 m-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Crown className="w-16 h-16 text-white" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Crown className="w-4 h-4 text-orange-400" />
                        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Plano {plan}</span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">Faça Upgrade</h3>
                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                        Desbloqueie análises avançadas e mais recursos.
                    </p>
                    <Button variant="outline" size="sm" className="w-full bg-slate-800 border-slate-600 text-white hover:bg-slate-700 hover:text-white text-xs h-8">
                        Ver Planos
                    </Button>
                </div>
            </div>

            {/* Logout Footer */}
            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/30 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Terminar Sessão
                </button>
            </div>
        </aside>
    );
}
