"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { PageHeader } from "../../../components/PageHeader";
import { Building2, ShoppingCart, Briefcase, GraduationCap, ArrowRight, User, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

export default function DashboardPage() {
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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
        </div>
    );

    return (
        <div className="p-8 md:p-12">
            <div className="w-full max-w-[1350px] mx-auto relative z-20">

                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                            Olá, <span className="text-[#f97316]">{user?.user_metadata?.full_name || "Usuário"}</span>
                        </h2>
                        <p className="text-slate-500 font-medium mt-1">
                            Bem-vindo ao seu painel de controlo Agro Data.
                        </p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="text-slate-500 hover:text-red-600 gap-2"
                    >
                        <LogOut className="w-4 h-4" /> Terminar Sessão
                    </Button>
                </div>

                {/* Main Actions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Primary Action Card - Register Company */}
                    <div className="lg:col-span-2 bg-white rounded-[20px] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                                <Building2 className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-800 mb-3">Registar a minha Empresa</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed max-w-lg">
                                Junte-se ao maior diretório de empresas do setor agrário em Moçambique.
                                Aumente a sua visibilidade, encontre parceiros e expanda os seus negócios.
                            </p>

                            <Link href="/usuario/registo-empresa">
                                <Button className="h-14 px-8 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                                    Começar Registo <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>

                            <div className="mt-8 flex gap-6 text-sm text-slate-400 font-medium">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    Visibilidade Garantida
                                </span>
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    Acesso a Oportunidades
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Actions - Stacked */}
                    <div className="space-y-6">
                        {/* Market Card */}
                        <Link href="/servicos/mercado" className="block bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                    <ShoppingCart className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Mercado Agrícola</h4>
                                    <p className="text-xs text-slate-500 mt-1">Compre e venda produtos</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-blue-500 transition-colors" />
                            </div>
                        </Link>

                        {/* Jobs Card */}
                        <Link href="/servicos/emprego" className="block bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Vagas de Emprego</h4>
                                    <p className="text-xs text-slate-500 mt-1">Encontre talentos ou oportunidades</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-purple-500 transition-colors" />
                            </div>
                        </Link>

                        {/* Training Card */}
                        <Link href="/servicos/formacao" className="block bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">Formação</h4>
                                    <p className="text-xs text-slate-500 mt-1">Capacite a sua equipa</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-amber-500 transition-colors" />
                            </div>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
