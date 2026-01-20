"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import { PageHeader } from "../../../components/PageHeader";
import { DashboardStats } from "../../../components/DashboardStats";
import { DashboardKeywordsTable } from "../../../components/DashboardKeywordsTable";
import { Building2, ShoppingCart, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
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



    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
        </div>
    );

    return (
        <div>
            <div className="w-full max-w-[1350px] mx-auto relative z-20">

                {/* Welcome Section Removed (Profile moved to Sidebar) */}

                {/* Statistics Section - Added based on user request */}
                <DashboardStats />

                {/* Main Actions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Primary Action Card - Register Company */}
                    <div className="lg:col-span-2 bg-white rounded-lg p-8 md:p-10 shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-6 text-emerald-600">
                                <Building2 className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-800 mb-3">Registar a minha Empresa</h3>
                            <p className="text-slate-500 mb-8 leading-relaxed max-w-lg">
                                Junte-se ao maior diretório de empresas do setor agrário em Moçambique.
                                Aumente a sua visibilidade, encontre parceiros e expanda os seus negócios.
                            </p>

                            <Link href="/usuario/registo-empresa">
                                <Button className="h-12 px-8 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                                    Começar Registo <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Secondary Actions - Stacked */}
                    <div className="space-y-4">
                        {/* Market Card */}
                        <Link href="/servicos/mercado" className="block bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
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
                        <Link href="/servicos/emprego" className="block bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
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
                        <Link href="/servicos/formacao" className="block bg-white rounded-lg p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
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

                {/* Keywords Table - Centered with constrained width */}
                <div className="max-w-5xl mx-auto mb-[10px]">
                    <DashboardKeywordsTable />
                </div>
            </div>
        </div>
    );
}
