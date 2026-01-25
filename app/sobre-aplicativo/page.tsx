"use client";

import { PageHeader } from "@/components/PageHeader";
import {
    Smartphone, Scan, Zap, Globe, ShieldCheck,
    BarChart3, CloudOff, Share2, QrCode, Search,
    TrendingUp, MessageCircle, ChevronDown, ChevronUp
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SobreAplicativoPage() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-slate-50">
            <PageHeader
                title={<>Sobre o <span className="text-[#f97316]">Aplicativo</span></>}
                icon={Smartphone}
                backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Sobre o Aplicativo", href: undefined }
                ]}
            />

            {/* 1. Introdução: Botânica - O seu assistente de campo */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 translate-x-1/4 pointer-events-none"></div>
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-600/10 border border-emerald-500/20 mb-6">
                                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Inovação Tecnológica de Ponta</span>
                            </div>
                            <h2 className="text-[35px] md:text-[48px] font-[900] text-slate-700 leading-[1.1] mb-6 tracking-tight">
                                Transformamos o seu smartphone num <span className="text-emerald-600">Engenheiro Agrónomo</span> pessoal
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic border-l-4 border-[#f97316] pl-6">
                                "Democratizamos o conhecimento técnico para o pequeno e médio agricultor moçambicano, fornecendo inteligência artificial no bolso de cada produtor."
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                                        <Zap className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700">Diagnóstico Instantâneo</h4>
                                        <p className="text-xs text-slate-500 mt-1">Identifique pragas e doenças em segundos via IA.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                                        <CloudOff className="w-6 h-6 text-[#f97316]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700">Funciona Offline</h4>
                                        <p className="text-xs text-slate-500 mt-1">Consultas críticas disponíveis sem internet no terreno.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-100/40 blur-3xl rounded-full"></div>
                            <div className="relative z-10 w-full max-w-[400px] aspect-[9/16] bg-slate-900 rounded-[45px] p-[10px] shadow-2xl border border-slate-800">
                                <div className="w-full h-full bg-black rounded-[35px] overflow-hidden relative">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black z-20 rounded-b-2xl"></div>
                                    <img
                                        src="/assets/botanica.webp"
                                        alt="App Interface"
                                        className="w-full h-full object-cover opacity-90"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-10 left-0 w-full px-8 text-center">
                                        <p className="text-white text-lg font-bold">Botânica</p>
                                        <p className="text-white/70 text-sm">Scanner Inteligente</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Ferramentas de Marketing e SEO (Enriquecido com a Imagem) */}
            <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
                {/* Fixed Background Image Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-fixed bg-cover bg-center opacity-20"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop)' }}
                ></div>

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                    <div className="text-center mb-[25px]">
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="w-10 h-[1.5px] bg-[#f97316]"></div>
                            <span className="text-[#f97316] font-bold text-sm uppercase tracking-[0.3em]">estratégia digital</span>
                            <div className="w-10 h-[1.5px] bg-[#f97316]"></div>
                        </div>
                        <h2 className="text-[35px] md:text-[48px] font-[900] leading-[1.1] mb-4 text-white">
                            Destaque sua empresa na <span className="inline-flex drop-shadow-sm"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></span>
                        </h2>

                        <div className="max-w-3xl mx-auto mb-[30px]">
                            <p className="text-white/80 text-center text-sm leading-relaxed font-medium">
                                Ao registar e destacar a sua empresa nas nossas plataformas móveis e no site, está automaticamente a colocar a sua empresa no raio de rastreio dos robôs da Google para indexar os links na plataforma Google Search. Além disso, as nossas plataformas utilizam tecnologias de ponta que permitem:
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-[20px]">
                        {/* WhatsApp Feature */}
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/50 hover:bg-white/10 transition-all group flex flex-col gap-[10px]">
                            <div className="w-11 h-11 bg-emerald-600 rounded-lg flex items-center justify-center mb-1 shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 01-2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-white">Partilha WhatsApp</h4>
                            <p className="text-white/70 text-sm leading-relaxed font-[500]">
                                Com um clique, envie o seu perfil profissional para clientes e grupos, aumentando o tráfego e ajudando o Google a perceber a importância da sua página.
                            </p>
                            <div className="h-1 w-12 bg-emerald-600 rounded-full mt-[8px] mb-[8px]"></div>
                        </div>

                        {/* QR Code Feature */}
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/50 hover:bg-white/10 transition-all group flex flex-col gap-[10px]">
                            <div className="w-11 h-11 bg-[#f97316] rounded-lg flex items-center justify-center mb-1 shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                                <QrCode className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white">QR Code Profissional</h4>
                            <p className="text-white/70 text-sm leading-relaxed font-[500]">
                                Crie o seu código profissional que aponta para o seu perfil. Pode mostrar no telemóvel ou imprimir em cartões de visita e etiquetas de produtos.
                            </p>
                            <div className="h-1 w-12 bg-[#f97316] rounded-full mt-[8px] mb-[8px]"></div>
                        </div>

                        {/* SEO Feature */}
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/50 hover:bg-white/10 transition-all group flex flex-col gap-[10px]">
                            <div className="w-11 h-11 bg-blue-600 rounded-lg flex items-center justify-center mb-1 shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                                <Search className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-white">Identidade Digital (SEO)</h4>
                            <p className="text-white/70 text-sm leading-relaxed font-[500]">
                                Ferramenta focada em backlinks e tráfego real para o diretório, fazendo com que o Google indexe a sua empresa muito mais rápido e com mais autoridade.
                            </p>
                            <div className="h-1 w-12 bg-blue-600 rounded-full mt-[8px] mb-[8px]"></div>
                        </div>
                    </div>


                </div>
            </section>

            {/* 3. Capacidades Técnicas (Grid Estilo "Nossa História") */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'url(/images/markets/choppies_bg.png)' }}
                ></div>
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-[35px] md:text-[48px] font-[900] text-slate-700 leading-[1.1] mb-6">
                            Capacidades <span className="text-[#f97316]">Técnicas</span>
                        </h2>
                        <div className="max-w-3xl mx-auto mb-10">
                            <p className="text-slate-600 text-center text-[16px] leading-relaxed font-medium">
                                O nosso aplicativo integra ferramentas profissionais de última geração que levam o seu negócio a um novo patamar no setor agrícola, fornecendo inteligência e precisão em cada etapa da produção.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[calc(50%+30px)_1fr] gap-0 items-center">
                        {/* Left Column: Image */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <img
                                src="/tecnologia_agraria_sobre_app.png"
                                alt="Tecnologia Agrária"
                                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                        </div>

                        {/* Right Column: Vertical Mini Cards with Styled Container */}
                        <div className="p-[40px]">
                            <div className="flex flex-col gap-4">
                                {[
                                    {
                                        title: "Scanner de Nutrientes",
                                        desc: "Revela o valor nutricional de plantas silvestres e cultivadas instantaneamente.",
                                        icon: BarChart3,
                                        color: "bg-orange-50 text-orange-600"
                                    },
                                    {
                                        title: "Mercado Integrado",
                                        desc: "Localiza a loja mais próxima com o insumo que você precisa em tempo real.",
                                        icon: Globe,
                                        color: "bg-emerald-50 text-emerald-600"
                                    },
                                    {
                                        title: "Monitoria Geográfica",
                                        desc: "Mapeia surtos de pragas para alerta precoce em toda a região.",
                                        icon: ShieldCheck,
                                        color: "bg-blue-50 text-blue-600"
                                    }
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-start gap-4 bg-white p-[20px] ${i === 0 ? 'rounded-2xl' : 'rounded-lg'} border border-slate-100 shadow-sm hover:shadow-md transition-all group`}>
                                        <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-base font-black text-slate-700 leading-tight mb-1">{item.title}</h4>
                                            <p className="text-slate-500 text-[15px] leading-snug font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Innovation / R&D Section */}
                    <div className="mt-16 bg-emerald-50 rounded-[24px] p-8 md:p-12 border border-emerald-100 relative overflow-hidden group">
                        <div className="relative z-10 grid lg:grid-cols-[auto_1fr] gap-12 items-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg text-emerald-600 shrink-0">
                                <Zap className="w-10 h-10 animate-pulse" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.4em] mb-3">Pesquisa & Desenvolvimento</h4>
                                <h3 className="text-2xl md:text-3xl font-black text-emerald-900 mb-4 leading-tight">
                                    🚀 Inovação em Campo: <span className="text-emerald-700 font-bold">Unidade Robótica Móvel</span>
                                </h3>
                                <p className="text-emerald-800/80 font-medium leading-relaxed max-w-4xl">
                                    Estamos a desenhar a futura unidade robótica móvel controlada remotamente, capaz de aplicar tratamentos localizados directamente nas plantas. Esta inovação visa reduzir drasticamente o desperdício de pesticidas e aumentar a precisão no tratamento de cada cultura individualmente.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA Card */}
                    <div className="mt-16 bg-slate-900 rounded-[30px] p-8 md:p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 skew-x-12 translate-x-1/4 pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div>
                                <h3 className="text-white text-2xl font-black mb-2 uppercase tracking-tight">Pronto para digitalizar o seu campo?</h3>
                                <p className="text-slate-400 text-sm font-medium">Disponível para todos os produtores de Moçambique nas lojas de aplicativos.</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button className="px-8 py-3.5 bg-[#f97316] text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-emerald-600 transition-all shadow-xl shadow-orange-900/20 active:scale-95">
                                    Baixar Aplicativo
                                </button>
                                <button className="px-8 py-3.5 bg-white/10 text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white/20 transition-all border border-white/10 backdrop-blur-sm">
                                    Ver Demonstração
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
