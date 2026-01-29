"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Users, Briefcase, Search, Star, MapPin, CheckCircle2, ArrowRight, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function TalentosPage() {
    const [specialists, setSpecialists] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPros() {
            try {
                const { data, error } = await supabase
                    .from('professionals')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setSpecialists(data || []);
            } catch (err) {
                console.error("Error fetching professionals:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPros();
    }, []);

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Profissionais & Talentos"
                icon={Users}
                backgroundImage="https://images.unsplash.com/photo-1595152248447-c93d5006b00b?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Repositório", href: "/repositorio" },
                    { label: "Profissionais", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-12 pb-24">

                {/* Simplified Action Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-10 border-b border-slate-200">
                    <div className="space-y-1 text-center md:text-left">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight leading-tight">Encontre Especialistas</h2>
                        <p className="text-sm text-slate-500 font-medium max-w-xl">
                            Conectamos produtores aos melhores talentos técnicos e doutores do agronegócio em Moçambique.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                        <button className="bg-[#111827] text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-xl hover:bg-emerald-600 flex items-center gap-3 text-xs uppercase tracking-widest group">
                            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Procurar Talento
                        </button>
                        <Link href="/servicos/registo-talento" className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm hover:border-[#f97316] hover:text-[#f97316] flex items-center gap-3 text-xs uppercase tracking-widest group">
                            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            Registar Perfil
                        </Link>
                    </div>
                </div>

                {/* Specialists Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white animate-pulse rounded-[20px] border border-slate-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {specialists.map((pro, i) => (
                            <div key={pro.id} className="p-8 rounded-[15px] bg-white border border-slate-100 shadow-md text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl flex flex-col gap-6 group relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:bg-emerald-50 transition-colors"></div>

                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="size-20 bg-slate-100 rounded-2xl relative overflow-hidden shrink-0 border-2 border-slate-50">
                                        {pro.photo_url ? (
                                            <img src={pro.photo_url} alt={pro.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-400">
                                                <Users className="w-8 h-8" />
                                            </div>
                                        )}
                                        <div className="absolute bottom-1 right-1 size-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                                            <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black text-slate-800 group-hover:text-[#f97316] transition-colors leading-tight uppercase">{pro.name}</h4>
                                        <p className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">{pro.specialty || pro.role || "Especialista"}</p>
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1 border-t border-slate-50 pt-6 relative z-10">
                                    <div className="flex items-center gap-2 text-[#f97316] bg-orange-50 w-fit px-3 py-1 rounded-full">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className={`w-3 h-3 ${(pro.rating || 5) >= s ? 'fill-current' : 'text-slate-200'}`} />)}
                                        <span className="text-[10px] font-black ml-1">{(pro.rating || 5)}.0</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                        <MapPin className="w-4 h-4 text-rose-500" />
                                        {pro.location || `${pro.province || ""}, ${pro.district || ""}`}
                                    </div>
                                </div>

                                <Link href={`/servicos/talentos/${pro.slug || pro.id}`} className="w-full py-4 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#111827] hover:text-white transition-all shadow-sm relative z-10 text-center">
                                    Ver Perfil Completo
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
