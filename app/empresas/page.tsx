"use client";

import React, { useEffect, useState } from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { Building2, MapPin, CheckCircle2, ArrowRight, Search, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { COMPANY_CATEGORIES } from "@/lib/constants";
import { CompanyCard } from "@/components/CompanyCard";

export default function EmpresasPage() {
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const { data, error } = await supabase
                    .from('companies')
                    .select('*')
                    .eq('is_archived', false)
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
                { label: "Repositório", href: "/repositorio" },
                { label: "Empresas", href: undefined }
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
                                <select className="w-full h-10 rounded-lg border border-slate-200 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none px-3 bg-slate-50 font-bold uppercase tracking-tight">
                                    <option>Todas as Categorias</option>
                                    {COMPANY_CATEGORIES.map(cat => (
                                        <option key={cat}>{cat}</option>
                                    ))}
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
                        {companies.map((company) => (
                            <CompanyCard
                                key={company.id}
                                company={{
                                    id: company.id,
                                    slug: company.slug,
                                    name: company.name,
                                    tag: company.category,
                                    description: company.activity || company.bio || "",
                                    logoUrl: company.logo_url || "",
                                    type: company.registration_type || "Empresa",
                                    image: company.banner_url || "",
                                    isVerified: company.verified,
                                    province: company.province,
                                    valueChain: company.value_chain
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </StandardBlogTemplate>
    );
}
