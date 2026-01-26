"use client";

import React from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { Building2, MapPin, CheckCircle2, ArrowRight, Search, Globe, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DirectoryPage() {
    const companies = [
        {
            id: 1,
            name: "Agro-Indústria Zambézia",
            activity: "Processamento de Castanha de Caju",
            province: "Zambézia",
            address: "Av. 25 de Setembro, Quelimane",
            logo: "https://placehold.co/100x100/f97316/white?text=LOGO",
            image: "https://images.unsplash.com/photo-1605000797499-95a059e5e4bb?q=80&w=800",
            verified: true,
            slug: "agro-industria-zambezia",
            description: "Líder no processamento e exportação de castanha de caju na região centro de Moçambique."
        },
        {
            id: 2,
            name: "Cooperativa do Norte",
            activity: "Produção de Cereais e Leguminosas",
            province: "Nampula",
            address: "Rua do Comércio, Nampula",
            logo: "https://placehold.co/100x100/10b981/white?text=LOGO",
            image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800",
            verified: true,
            slug: "cooperativa-do-norte",
            description: "Especializada na produção e comercialização de milho, feijão e soja de alta qualidade."
        },
        {
            id: 3,
            name: "Hortas do Vale",
            activity: "Horticultura e Fruticultura",
            province: "Sofala",
            address: "Estrada Nacional 1, Chimoio",
            logo: "https://placehold.co/100x100/3b82f6/white?text=LOGO",
            image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800",
            verified: false,
            slug: "hortas-do-vale",
            description: "Produção sustentável de vegetais frescos e frutas tropicais para o mercado nacional."
        }
    ];

    return (
        <StandardBlogTemplate
            title="Empresas"
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Directório" }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    {/* Filters Card */}
                    <div className="card-agro">
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
                    <div className="card-agro text-center py-8">
                        <Building2 className="w-12 h-12 text-[#f97316] mx-auto mb-4" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Empresas Registadas</p>
                        <p className="text-3xl font-black text-slate-800 tracking-tighter">450+</p>
                    </div>
                </div>
            }
        >
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-agro">
                    {companies.map((company, i) => (
                        <div key={i} className="group bg-white p-6 rounded-[15px] border border-slate-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
                            {/* Card Header: Logo & Meta */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="shrink-0">
                                    <div className="h-12 w-auto min-w-[48px] max-w-[120px] rounded-[10px] overflow-hidden border border-gray-100 bg-white flex items-center justify-center">
                                        <Image
                                            src={company.logo}
                                            alt={company.name}
                                            width={120}
                                            height={48}
                                            className="h-full w-auto object-contain"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#f97316] transition-colors line-clamp-1 text-right">
                                        {company.activity}
                                    </div>
                                    <div className="text-[10px] text-slate-300 font-medium mt-1">
                                        {company.province}
                                    </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-[15px] font-bold text-slate-600 group-hover:text-[#3a3f47] transition-colors whitespace-nowrap overflow-hidden text-ellipsis uppercase tracking-tight">
                                        {company.name}
                                    </h3>
                                    {company.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                                </div>

                                <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                                    {company.description}
                                </p>

                                <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-4">
                                    <MapPin className="w-3 h-3 text-orange-400" />
                                    <span className="truncate">{company.address}</span>
                                </div>
                            </div>

                            {/* Footer: Action Link (Text-only, Left-aligned) */}
                            <div className="pt-3 border-t border-slate-50 flex justify-start">
                                <Link
                                    href="/design-system/detalhes-empresa"
                                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#f97316] flex items-center gap-1 transition-all"
                                >
                                    Ver Perfil
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StandardBlogTemplate>
    );
}
