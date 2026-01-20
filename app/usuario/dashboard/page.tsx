"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Building2, User, Tractor, LayoutDashboard, LogOut, ArrowRight, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GuestDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
            }
            setLoading(false);
        };
        checkUser();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#f97316] border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Carregando painel...</p>
                </div>
            </div>
        );
    }

    const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Explorador";

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Sidebar Navigation (Simple) */}
            <aside className="fixed left-0 top-0 h-full w-20 md:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-20">
                <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#f97316] rounded-xl flex items-center justify-center text-white">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <span className="font-black text-slate-800 text-xl tracking-tight hidden md:block">AgroDashboard</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <Link href="/usuario/dashboard" className="flex items-center gap-3 p-3 bg-slate-100 text-[#f97316] rounded-xl font-bold transition-all">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="hidden md:block">Início</span>
                    </Link>
                    <Link href="/usuario/registo-empresa" className="flex items-center gap-3 p-3 text-slate-500 hover:bg-slate-50 rounded-xl font-bold transition-all">
                        <Building2 className="w-5 h-5" />
                        <span className="hidden md:block">Registar Empresa</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden md:block">Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="md:ml-64 p-4 md:p-8 lg:p-12">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
                            Olá, <span className="text-[#f97316]">{userName}</span>! 👋
                        </h1>
                        <p className="text-slate-500 font-medium text-lg mt-1">Bem-vindo ao seu espaço de inovação agrária.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Welcome Card / Call to Action */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f97316] opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm mb-8">
                                <Star className="w-3 h-3 text-[#f97316] fill-[#f97316]" /> Comece Agora
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-6">
                                Impulse a sua presença no sector agrário.
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 max-w-md">
                                Registe a sua empresa agora e tenha acesso a investidores, parceiros e novas oportunidades de mercado em Moçambique.
                            </p>
                            <Link href="/usuario/registo-empresa">
                                <Button className="bg-[#f97316] hover:bg-[#ea580c] text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-[#f97316]/20 transition-all text-lg flex items-center gap-3">
                                    Registar Minha Empresa <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Secondary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                                <Tractor className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">Explore o Mercado</h3>
                            <p className="text-slate-500 font-medium mb-6">Veja as tendências de preços e produtos agrícolas em tempo real.</p>
                            <Link href="/servicos/mercado" className="text-[#f97316] font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase text-xs tracking-widest">
                                Ir para Mercado <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <Heart className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-2">Suas Favoritas</h3>
                            <p className="text-slate-500 font-medium mb-6">Em breve poderá guardar as empresas e serviços que mais lhe interessam.</p>
                            <span className="bg-slate-100 text-slate-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">Em Desenvolvimento</span>
                        </div>
                    </div>
                </div>

                {/* Account Settings / Profile Summary */}
                <div className="mt-12 bg-white rounded-[32px] p-4 border border-slate-100 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sua Conta</p>
                            <p className="text-slate-700 font-black">{user?.email}</p>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 transition-all font-bold text-xs uppercase tracking-widest">Editar Perfil</button>
                </div>
            </main>
        </div>
    );
}
