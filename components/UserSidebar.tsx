"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Package,
    MessageSquare,
    BarChart3,
    LogOut,
    Crown,
    Settings,
    HelpCircle
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";

// Exact items requested by user
const navigation = [
    { name: "Minha Conta", href: "/usuario/dashboard/minha-conta", icon: User },
    { name: "Meu Conteúdo", href: "/usuario/dashboard/produtos", icon: Package },
    { name: "Contactos", href: "/usuario/dashboard/contactos", icon: MessageSquare },
    { name: "Análise", href: "/usuario/dashboard/analises", icon: BarChart3 },
];

export function UserSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [plan] = useState<"basic" | "ouro" | "premium">("basic");
    const [user, setUser] = useState<any>(null);

    // Create Supabase client
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // Redirect to login after logout
        router.refresh(); // Refresh to update middleware state
    };

    return (
        <aside className="w-full h-full bg-emerald-950 flex flex-col text-slate-300 shrink-0">
            {/* 1. Header Area with Dashboard Title */}
            {/* 1. Header Area with Dashboard Title */}
            <div className="h-16 flex items-center px-6 border-b border-emerald-900">
                <Link href="/usuario/dashboard" className="w-full flex items-center gap-3 px-4 py-3 bg-orange-500 text-white hover:bg-orange-600 transition-all group rounded-md shadow-lg shadow-orange-500/20">
                    <LayoutDashboard className="w-5 h-5 text-white" />
                    <span className="font-heading font-bold text-base tracking-wide uppercase">Dashboard</span>
                </Link>
            </div>

            {/* User Profile Section */}
            <div className="px-6 py-6 border-b border-emerald-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center overflow-hidden shrink-0">
                        {user?.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-5 h-5 text-emerald-400" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white truncate leading-tight">
                            {user?.user_metadata?.full_name || "Usuário"}
                        </p>
                        <p className="text-[10px] text-emerald-400 truncate leading-tight mt-0.5 font-medium">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Main Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Menu Principal</p>
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

                <div className="mt-8 pt-6 border-t border-emerald-900/50">
                    <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sistema</p>
                    <Link href="/usuario/dashboard/configuracoes" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all text-left">
                        <Settings className="w-5 h-5 text-slate-500" />
                        Configurações
                    </Link>
                    <Link href="/usuario/dashboard/ajuda" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all text-left">
                        <HelpCircle className="w-5 h-5 text-slate-500" />
                        Ajuda & Suporte
                    </Link>
                </div>
            </nav>

            {/* 3. Footer Area (Upgrade + Logout) */}
            <div className="p-4 bg-emerald-950 border-t border-emerald-900">
                {/* Upgrade Card */}
                <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Crown className="w-12 h-12 text-white" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Crown className="w-4 h-4 text-orange-400" />
                            <span className="text-[10px] font-black text-orange-400 uppercase tracking-wider">PREMIUM</span>
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1">Faça Upgrade</h4>
                        <p className="text-[11px] text-slate-400 mb-3 leading-tight">
                            Tenha acesso a todos os recursos.
                        </p>
                        <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white border-none h-7 text-xs font-bold uppercase tracking-wide">
                            Ver Planos
                        </Button>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/20 hover:text-red-300 transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sair da Conta
                </button>
            </div>
        </aside>
    );
}
