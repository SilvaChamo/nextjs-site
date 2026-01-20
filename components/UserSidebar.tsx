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
import { Button } from "./ui/button";
import { supabase } from "../lib/supabaseClient";
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
        <aside className="w-64 bg-slate-900 min-h-screen text-white p-10 block" style={{ display: 'block', visibility: 'visible' }}>
            <h2 className="text-xl font-bold">SIDEBAR V3</h2>
            <p className="mt-4">Se você vê a tarja amarela no topo e o PATH no fundo, mas não vê isso, me avise.</p>
        </aside>
    );
}
