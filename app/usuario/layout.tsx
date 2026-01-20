"use client";

import { UserSidebar } from "@/components/UserSidebar";
import { LogOut, User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Sidebar Fixa à Esquerda */}
            <UserSidebar />

            {/* Área de Conteúdo Principal (Rolável) */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg group-hover:bg-orange-600 transition-colors">
                            B
                        </div>
                        <span className="font-heading font-bold text-slate-800 text-lg tracking-tight group-hover:text-emerald-700 transition-colors">BASE AGRO</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors uppercase tracking-wider bg-slate-50 hover:bg-red-50 px-4 py-2 rounded-lg border border-slate-200 hover:border-red-200"
                    >
                        <LogOut className="w-4 h-4" />
                        Sair
                    </button>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-[25px]">
                    <div className="max-w-6xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
