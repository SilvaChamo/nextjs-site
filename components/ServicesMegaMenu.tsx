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
        description: "Escoamento de produção em grande escala e parcerias com transportadoras nacionais.",
        items: [
            { title: "Transporte Terrestre", link: "/servicos/transporte", description: "Frota especializada para o transporte de produtos agrários em grandes quantidades." },
            { title: "Logística Multimodal", link: "/servicos/transporte", description: "Integração eficiente entre transporte rodoviário e marítimo para exportação." },
            { title: "Segurança de Carga", link: "/servicos/transporte", description: "Protocolos rigorosos de segurança e monitoramento em tempo real." },
            { title: "Rastreio em Tempo Real", link: "/servicos/transporte", description: "Acompanhe a sua mercadoria desde a origem até ao destino final." }
        ]
    },
    {
        id: "lojas",
        title: "Lojas e insumos",
        icon: Store,
        description: "Empresas nacional de sementes, fertilizantes e maquinaria agrícola.",
        items: [
            { title: "Sementes Certificadas", link: "/servicos/insumos", description: "Alta produtividade para sua colheita com sementes verificadas." },
            { title: "Fertilizantes e Adubos", link: "/servicos/insumos", description: "Nutrição vegetal completa para diversos tipos de culturas." },
            { title: "Maquinaria Agrícola", link: "/servicos/insumos", description: "Tratores e equipamentos modernos para mecanização do campo." },
            { title: "Registe a sua loja", link: "/registar", description: "Aumente a visibilidade do seu negócio e alcance mais produtores." }
        ]
    },
    {
        id: "compra-venda",
        title: "Compra e venda",
        icon: ShoppingCart,
        description: "Plataforma de comercialização directa entre produtores e grandes compradores.",
        items: [
            { title: "Cotações do Dia", link: "/servicos/mercado", description: "Acompanhe os preços médios nas principais praças nacionais." },
            { title: "Ofertas de Venda", link: "/servicos/mercado", description: "Explore anúncios de produtores que procuram escoar produção." },
            { title: "Leilões Agrários", link: "/servicos/mercado", description: "Participe em licitações para compra de grandes lotes de produção." },
            { title: "Garantia de Negócio", link: "/servicos/mercado", description: "Transações seguras e monitoradas para evitar falhas." }
        ]
    },
    {
        id: "assistencia",
        title: "Assistência digital",
        icon: Smartphone,
        description: "Suporte tecnológico e criação de portais para a modernização do agro-negócio.",
        items: [
            { title: "Criação de Portais", link: "/servicos/assistencia", description: "Desenvolvimento de sites institucionais e catálogos agrários." },
            { title: "Apoio Técnico TI", link: "/servicos/assistencia", description: "Assistência para a modernização das suas ferramentas de gestão." },
            { title: "Desenvolvimento App", link: "/servicos/assistencia", description: "Soluções móveis personalizadas para gestão de campo." },
            { title: "Suporte Online", link: "/servicos/assistencia", description: "Equipa dedicada para garantir a operacionalidade das plataformas." }
        ]
    },
    {
        id: "eventos",
        title: "Feiras e eventos",
        icon: Calendar,
        description: "Promoção e organização de eventos corporativos e feiras do sector agrário.",
        items: [
            { title: "Calendário Regional", link: "/servicos/eventos", description: "Acompanhe as principais feiras provinciais e nacionais." },
            { title: "Promoção de Eventos", link: "/servicos/eventos", description: "Divulgue o seu evento para toda a nossa rede agrária." },
            { title: "Bilheteira Online", link: "/servicos/eventos", description: "Gestão completa de acessos e venda de bilhetes para feiras." },
            { title: "Patrocínio Digital", link: "/servicos/eventos", description: "Destaque a sua marca nos maiores eventos do sector." }
        ]
    },
    {
        id: "gestao-conteudo",
        title: "Gestão de conteúdo",
        icon: FileText,
        description: "Estratégia digital e produção de media exclusiva para o agro-negócio.",
        items: [
            { title: "Escrita Técnica", link: "/servicos/conteudo", description: "Produção de artigos e posts especializados para o agro." },
            { title: "Gestão de Redes", link: "/servicos/conteudo", description: "Presença digital estratégica para marcas do sector." },
            { title: "Vídeo Marketing", link: "/servicos/conteudo", description: "Cobertura de eventos e produção de vídeos institucionais." },
            { title: "Newsletter Agro", link: "/servicos/conteudo", description: "Comunicação directa com a sua base de clientes e parceiros." }
        ]
    },
    {
        id: "vagas",
        title: "Vagas de emprego",
        icon: Briefcase,
        description: "Oportunidades de carreira nas principais empresas do sector agrário.",
        items: [
            { title: "Talento Agrário", link: "/servicos/emprego", description: "Candidate-se a vagas nas maiores empresas do país." },
            { title: "Recrutamento Especializado", link: "/servicos/emprego", description: "Serviços de RH focados em perfis técnicos agrícolas." },
            { title: "Estágios Profissionais", link: "/servicos/emprego", description: "Programas de entrada no mercado para jovens licenciados." },
            { title: "Consultoria de Carreira", link: "/servicos/emprego", description: "Apoio na elaboração de CV e preparação para entrevistas." }
        ]
    },
    {
        id: "consultoria",
        title: "Consultoria digital",
        icon: Users,
        description: "Assessoria especializada em transformação digital e estratégias tecnológicas.",
        items: [
            { title: "Estratégia Digital", link: "/servicos/consultoria", description: "Planos estratégicos para transformação digital do agro-negócio." },
            { title: "Otimização de Processos", link: "/servicos/consultoria", description: "Análise e melhoria de processos operacionais através de tecnologia." },
            { title: "Análise de Dados", link: "/servicos/consultoria", description: "Insights baseados em dados para melhor tomada de decisão." },
            { title: "Implementação Tecnológica", link: "/servicos/consultoria", description: "Suporte na adoção e integração de novas tecnologias." }
        ]
    },
    {
        id: "formacoes",
        title: "Formações e capacitações",
        icon: GraduationCap,
        description: "Workshops e programas de formação em tecnologias agrícolas e gestão.",
        items: [
            { title: "Academia Agro", link: "/servicos/formacao", description: "Cursos certificados online para capacitação técnica." },
            { title: "Capacitação Rural", link: "/servicos/formacao", description: "Treinos práticos de campo para melhoria de produtividade." },
            { title: "Certificação ISO", link: "/servicos/formacao", description: "Preparação para certificações internacionais de qualidade." },
            { title: "E-learning Corporativo", link: "/servicos/formacao", description: "Plataformas de treino personalizado para equipas de empresas." }
        ]
    },
    {
        id: "repositorio",
        title: "Repositório agrário",
        icon: Globe,
        description: "Base de dados com documentos, artigos e perfis do sector.",
        items: [
            { title: "Artigos Científicos", link: "/repositorio", description: "Acesso a publicações e estudos técnicos actuais." },
            { title: "Documentos Oficiais", link: "/repositorio", description: "Políticas, leis e regulamentos do sector em Moçambique." },
            { title: "Base de Talentos", link: "/repositorio", description: "Pesquise por profissionais qualificados em diversas áreas." },
            { title: "Mapa de Propriedades", link: "/repositorio", description: "Visualização geográfica de explorações e projectos agrários." }
        ]
    }
];

export function ServicesMegaMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
    const activeData = serviceCategories.find(c => c.id === activeTab) || serviceCategories[0];

    return (
        <div className={`absolute left-0 w-full top-full transition-all duration-300 z-50 ${isOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
            <div className="absolute top-[-15px] left-0 w-full h-[15px] bg-transparent" />
            <div className="bg-white border-y border-slate-200 shadow-[0_40px_80px_rgba(0,0,0,0.12)] overflow-hidden">
                <div className="container-site flex min-h-[500px]">
                    {/* Left Sidebar - Categories */}
                    <div className="w-[320px] bg-slate-50 border-r border-slate-100 py-6">
                        <div className="px-6 mb-4">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Search className="w-3 h-3" /> Categorias de Serviços
                            </h3>
                        </div>
                        <div className="space-y-0.5">
                            {serviceCategories.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = activeTab === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveTab(cat.id)}
                                        className={`w-full flex items-center justify-between px-6 py-2.5 text-left transition-all relative ${isActive
                                            ? "bg-white text-[#f97316] font-bold shadow-sm"
                                            : "text-slate-600 hover:bg-white/40 hover:text-[#f97316]"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-1 rounded-lg ${isActive ? "bg-orange-50" : "bg-transparent"}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-[13.5px] leading-tight">{cat.title}</span>
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
                            {/* Conteúdo Ganhou mais espaço com a remoção do título redundante */}
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
