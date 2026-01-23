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
            {/* Sidebar Fixa (Desktop) / Overlay (Mobile) */}
            <div
                className={`fixed inset-y-0 left-0 z-30 bg-emerald-950 transition-all duration-300 ease-in-out border-r border-emerald-900 overflow-hidden 
                    ${isSidebarOpen ? "w-64 translate-x-0" : "w-[80px] -translate-x-full md:translate-x-0"} 
                    md:relative md:flex-shrink-0`}
            >
                <UserSidebar isCollapsed={!isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
            </div>

            {/* Overlay para fechar sidebar em mobile quando aberta */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Área de Conteúdo Principal (Rolável) */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                            <Menu className="w-6 h-6" />
                        </button>


                        <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
                            <Image
                                src="/assets/Logo.png"
                                alt="Base Agro Data Logo"
                                width={160}
                                height={60}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Right side - Empty for now since Logout moved left? Or maybe User Profile snippet? 
                        The user asked to swap. Previous logout was big button. I'll leave space or put something generic.
                    */}
                    {/* Right side - Logout Button */}
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="bg-slate-50 border-slate-200 text-slate-500 hover:bg-orange-50 hover:text-[#f97316] hover:border-orange-200 font-bold gap-2 transition-all shadow-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Sair
                        </Button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 md:p-8">
                    <div className="w-full mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
