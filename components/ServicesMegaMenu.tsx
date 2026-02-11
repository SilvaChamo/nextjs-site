"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Truck,
    Store,
    ShoppingCart,
    Smartphone,
    Calendar,
    FileText,
    Briefcase,
    Users,
    GraduationCap,
    ArrowRight,
    ChevronRight,
    Search,
    Star,
    Zap,
    Globe
} from "lucide-react";

interface ServiceCategory {
    id: string;
    title: string;
    icon: React.ElementType;
    description: string;
    items: {
        title: string;
        link: string;
        description: string;
    }[];
}

const serviceCategories: ServiceCategory[] = [
    {
        id: "logistica",
        title: "Logística e transporte",
        icon: Truck,
        description: "Soluções de transporte e escoamento de produção agrícola.",
        items: [
            { title: "Transporte de Carga", link: "/servicos/transporte", description: "Encontre transportadores para seus produtos." },
            { title: "Aluguer de Maquinaria", link: "/servicos/maquinaria", description: "Tractores e equipamentos pesados." }
        ]
    },
    {
        id: "lojas",
        title: "Lojas e insumos",
        icon: Store,
        description: "Venda de sementes, fertilizantes e ferramentas agrícolas.",
        items: [
            { title: "Sementes Certificadas", link: "/servicos/sementes", description: "Alta produtividade para sua colheita." },
            { title: "Fertilizantes e Adubos", link: "/servicos/insumos", description: "Nutrição vegetal completa." }
        ]
    },
    {
        id: "compra-venda",
        title: "Compra e venda",
        icon: ShoppingCart,
        description: "Marketplace para produtos agrícolas e gado.",
        items: [
            { title: "Bolsa de Mercadorias", link: "/mercado", description: "Preços e tendências em tempo real." },
            { title: "Venda por Atacado", link: "/servicos/vendas", description: "Conecte-se com grandes compradores." }
        ]
    },
    {
        id: "assistencia",
        title: "Assistência digital",
        icon: Smartphone,
        description: "Suporte técnico remoto e apps de gestão.",
        items: [
            { title: "Gestão Agrícola", link: "/inovacao/perfil-digital", description: "Controle sua fazenda pelo telemóvel." },
            { title: "Previsão Meteorológica", link: "/servicos/clima", description: "Dados precisos para o plantio." }
        ]
    },
    {
        id: "eventos",
        title: "Feiras e eventos",
        icon: Calendar,
        description: "Calendário de eventos e exposições do sector.",
        items: [
            { title: "Agro-Feiras 2026", link: "/blog", description: "Participe nos maiores eventos nacionais." },
            { title: "Webinars Técnicos", link: "/inovacao/apresentacoes", description: "Aprenda com especialistas online." }
        ]
    },
    {
        id: "gestao-conteudo",
        title: "Gestão de conteúdo",
        icon: FileText,
        description: "Marketing e comunicação para empresas agrárias.",
        items: [
            { title: "Identidade Digital", link: "/inovacao/perfil-digital", description: "Crie a sua marca no mundo digital." },
            { title: "Marketing Rural", link: "/inovacao/comunicacao-sms", description: "Alcance milhares de produtores." }
        ]
    },
    {
        id: "vagas",
        title: "Vagas de emprego",
        icon: Briefcase,
        description: "Oportunidades de trabalho no agro-negócio.",
        items: [
            { title: "Talentos Agrários", link: "/servicos/registo-talento", description: "Candidate-se a vagas no sector." },
            { title: "Recrutamento", link: "/servicos/vagas", description: "Encontre profissionais qualificados." }
        ]
    },
    {
        id: "consultoria",
        title: "Consultoria digital",
        icon: Users,
        description: "Aconselhamento técnico e estratégico online.",
        items: [
            { title: "Especialistas Agrários", link: "/servicos/consultoria", description: "Consultoria personalizada." },
            { title: "Planos de Negócio", link: "/inovacao/apresentacoes", description: "Estruture o seu crescimento." }
        ]
    },
    {
        id: "formacoes",
        title: "Formações e capacitações",
        icon: GraduationCap,
        description: "Cursos e treinos para melhorar a produtividade.",
        items: [
            { title: "Academia Agro", link: "/inovacao/repositorio-cientifico", description: "Cursos certificados online." },
            { title: "Capacitação Rural", link: "/servicos/formacoes", description: "Treinos práticos de campo." }
        ]
    }
];

export function ServicesMegaMenu({ onClose }: { onClose: () => void }) {
    const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
    const activeData = serviceCategories.find(c => c.id === activeTab) || serviceCategories[0];

    return (
        <div className="absolute left-0 w-full top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
            <div className="absolute top-[-15px] left-0 w-full h-[15px] bg-transparent" />
            <div className="bg-white border-y border-slate-200 shadow-[0_40px_80px_rgba(0,0,0,0.12)] overflow-hidden">
                <div className="container-site flex min-h-[500px]">
                    {/* Left Sidebar - Categories */}
                    <div className="w-[320px] bg-slate-50 border-r border-slate-100 py-8">
                        <div className="px-6 mb-6">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Search className="w-3 h-3" /> Categorias de Serviços
                            </h3>
                        </div>
                        <div className="space-y-1">
                            {serviceCategories.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = activeTab === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onMouseEnter={() => setActiveTab(cat.id)}
                                        className={`w-full flex items-center justify-between px-6 py-3.5 text-left transition-all relative ${isActive
                                                ? "bg-white text-[#f97316] font-bold shadow-sm"
                                                : "text-slate-600 hover:bg-white/50 hover:text-[#f97316]"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-1.5 rounded-lg ${isActive ? "bg-orange-50" : "bg-transparent"}`}>
                                                <Icon className="w-4.5 h-4.5" />
                                            </div>
                                            <span className="text-[14px] leading-tight">{cat.title}</span>
                                        </div>
                                        {isActive && <ChevronRight className="w-4 h-4" />}
                                        {isActive && <div className="absolute right-0 top-0 h-full w-[3px] bg-[#f97316]" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 bg-white py-12 px-16 relative">
                        <div className="max-w-4xl">
                            <div className="flex items-start gap-6 mb-10 pb-8 border-b border-slate-50">
                                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-[#f97316]">
                                    {React.createElement(activeData.icon, { size: 32 })}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 mb-2">{activeData.title}</h2>
                                    <p className="text-lg text-slate-500 font-medium leading-relaxed">{activeData.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                {activeData.items.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.link}
                                        onClick={onClose}
                                        className="group/item block p-4 -mx-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-slate-800 text-[17px] group-hover/item:text-[#f97316] transition-colors">
                                                {item.title}
                                            </h4>
                                            <ArrowRight className="w-4 h-4 text-[#f97316] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                        </div>
                                        <p className="text-[14px] text-slate-500 font-medium leading-snug">
                                            {item.description}
                                        </p>
                                    </Link>
                                ))}
                            </div>

                            {/* Featured Banner/Link */}
                            <div className="mt-16 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between">
                                <div className="flex items-center gap-4 text-emerald-700">
                                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                                        <Zap className="w-5 h-5 fill-current" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Pronto para começar?</p>
                                        <p className="text-xs text-emerald-600/80">Registe-se hoje e expanda o seu negócio agrícola.</p>
                                    </div>
                                </div>
                                <Link
                                    href="/servicos"
                                    onClick={onClose}
                                    className="bg-white px-4 py-2 rounded-lg text-emerald-700 text-sm font-bold shadow-sm hover:shadow-md transition-all border border-emerald-100"
                                >
                                    Falar com Especialistas
                                </Link>
                            </div>
                        </div>

                        {/* Bottom Bar Stats */}
                        <div className="absolute bottom-8 left-16 right-16 pt-8 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-emerald-600/50" /> Suporte 24/7</span>
                                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-orange-600/50" /> Líder em Moçambique</span>
                            </div>
                            <Link
                                href="/servicos"
                                onClick={onClose}
                                className="text-sm font-bold text-[#f97316] hover:text-emerald-600 transition-colors flex items-center gap-2"
                            >
                                Ver Todos Serviços <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
