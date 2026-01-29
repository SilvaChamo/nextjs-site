"use client";

import React, { useEffect, useState } from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { Building2, MapPin, CheckCircle2, ArrowRight, Search, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function EmpresasPage() {
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const { data, error } = await supabase
                    .from('companies')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setCompanies(data || []);
            } catch (err) {
                console.error("Error fetching companies:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCompanies();
    }, []);

    return (
        <StandardBlogTemplate
            title="Empresas"
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Empresas" }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    {/* Filters Card */}
                    <div className="card-agro-static">
                        <h4 className="flex items-center gap-2 mb-6">
                            <Search className="w-4 h-4 text-emerald-600" />
                            Filtrar Empresas
                        </h4>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Categoria</label>
                                <select className="w-full h-10 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none px-3 bg-slate-50">
                                    <option>Todas as Categorias</option>
                                    <option>Processamento</option>
                                    <option>Produção Agrícola</option>
                                    <option>Logística</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Província</label>
                                <select className="w-full h-10 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none px-3 bg-slate-50">
                                    <option>Todas as Províncias</option>
                                    <option>Zambézia</option>
                                    <option>Nampula</option>
                                    <option>Sofala</option>
                                </select>
                            </div>

                            <button className="btn-primary w-full shadow-emerald-200/50">
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="card-agro-static text-center py-8">
                        <Building2 className="w-12 h-12 text-[#f97316] mx-auto mb-4" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Empresas Registadas</p>
                        <p className="text-3xl font-black text-slate-800 tracking-tighter">
                            {loading ? "..." : companies.length}
                        </p>
                    </div>
                </div>
            }
        >
            <div className="space-y-8 pb-10">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-agro">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[280px] bg-slate-50 animate-pulse rounded-agro border border-slate-100" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-agro">
                        {companies.map((company, i) => (
                            <div key={company.id} className="group bg-white rounded-agro border border-slate-200 shadow-md card-interactive transition-all duration-500 flex flex-col relative overflow-hidden">
                                {/* 1. Header Image */}
                                <div className="relative h-[140px] w-full overflow-hidden bg-slate-100">
                                    {company.banner_url ? (
                                        <Image
                                            src={company.banner_url}
                                            alt={company.company_name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Building2 className="w-10 h-10 text-slate-300" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                    {/* AUTHENTICATION SIGNAL */}
                                    {company.verified && (
                                        <div className="absolute top-4 right-4 z-20">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
                                        </div>
                                    )}

                                    {/* INTERNAL ELEMENTS */}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                                        {/* Logo Horizontal Frame */}
                                        <div className="shrink-0 h-11 w-auto min-w-[50px] max-w-[110px] rounded-lg overflow-hidden border border-white/20 bg-white flex items-center justify-center p-1.5 shadow-2xl">
                                            <Image
                                                src={company.logo_url || "https://placehold.co/100x100/f97316/white?text=LOGO"}
                                                alt={company.company_name}
                                                width={110}
                                                height={44}
                                                className="h-full w-auto object-contain"
                                            />
                                        </div>

                                        {/* Category Badge */}
                                        <div className="bg-emerald-600/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-md shadow-lg border border-white/10">
                                            {company.category || "Empresa"}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Content Region */}
                                <div className="p-4 flex flex-col">
                                    <Link href={`/empresas/${company.slug}`}>
                                        <h3 className="text-[15px] font-black text-slate-500 uppercase tracking-tighter leading-tight hover:text-[#f97316] transition-colors mb-1 truncate">
                                            {company.company_name}
                                        </h3>
                                    </Link>

                                    <p className="text-[11px] font-bold text-slate-400 mb-4 leading-normal line-clamp-2">
                                        {company.activity || "Sem atividade registada"}
                                    </p>

                                    <div className="flex justify-start">
                                        <Link
                                            href={`/empresas/${company.slug}`}
                                            className="text-[10px] font-black uppercase tracking-widest text-[#f97316] hover:text-orange-700 flex items-center gap-1.5 transition-all"
                                        >
                                            Ver Perfil
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StandardBlogTemplate>
    );
}
