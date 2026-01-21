"use client";

import { useState } from "react";
import { UserSidebar } from "@/components/UserSidebar";
import { LogOut, Menu, ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Sidebar Fixa (Animated Wrapper) */}
            <div
                className={`flex-shrink-0 bg-emerald-950 transition-all duration-300 ease-in-out border-r border-emerald-900 overflow-hidden ${isSidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0"
                    }`}
            >
                <div className="w-64 h-full"> {/* Fixed width container to prevent layout shift inside */}
                    <UserSidebar />
                </div>
            </div>

            {/* Área de Conteúdo Principal (Rolável) */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2 -ml-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title={isSidebarOpen ? "Recolher Menu" : "Expandir Menu"}
                        >
                            {isSidebarOpen ? <ArrowLeftFromLine className="w-5 h-5" /> : <ArrowRightFromLine className="w-5 h-5" />}
                        </button>

                        <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
                            <Image
                                src="https://baseagrodata.com/wp-content/uploads/2026/01/Logo2-01.png"
                                alt="Base Agro Data Logo"
                                width={160}
                                height={60}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                    </div>

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
