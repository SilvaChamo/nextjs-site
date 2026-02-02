"use client";

import { PageHeader } from "@/components/PageHeader";
import {
    Smartphone, Scan, Zap, Globe, ShieldCheck,
    BarChart3, CloudOff, Share2, QrCode, Search,
    TrendingUp, MessageCircle, ChevronDown, ChevronUp, X, MousePointer2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SobreAplicativoPage() {
    const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
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
                <div className="container-site relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f97316]/10 border border-[#f97316]/20 mb-6">
                                <span className="w-2 h-2 rounded-full bg-[#f97316]"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-orange-700">Inovação Tecnológica de Ponta</span>
                            </div>
                            <h2 className="text-[28px] md:text-[35px] font-[900] text-slate-600 leading-[1.1] mb-6 tracking-tight">
                                Transformamos o seu smartphone num <span className="text-emerald-600">Engenheiro Agrónomo</span> pessoal
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium italic border-l-4 border-[#f97316] pl-6">
                                "Democratizamos o conhecimento técnico para o pequeno e médio agricultor moçambicano, fornecendo inteligência artificial no bolso de cada produtor."
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                                        <Zap className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700">Diagnóstico Instantâneo</h4>
                                        <p className="text-xs text-slate-500 mt-1">Identifique pragas e doenças em segundos via IA.</p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => setIsOfflineModalOpen(true)}
                                    className="bg-slate-100 p-6 rounded-2xl border border-slate-200 flex items-start gap-4 cursor-pointer hover:bg-orange-50 hover:border-orange-200 transition-all group/offline relative"
                                >
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover/offline:scale-110 transition-transform">
                                        <CloudOff className="w-6 h-6 text-[#f97316]" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-700 group-hover/offline:text-[#f97316] transition-colors flex items-center justify-between">
                                            Funciona Offline
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-1">Consultas críticas disponíveis sem internet no terreno.</p>
                                    </div>

                                    {/* Visual Click Indicator - Permanent at bottom */}
                                    <div className="absolute bottom-3 right-5 flex items-center gap-1.5">
                                        <span className="text-[9px] font-black text-[#f97316] uppercase tracking-widest">Leia mais</span>
                                        <MousePointer2 className="w-3.5 h-3.5 text-[#f97316] animate-pulse group-hover/offline:scale-125 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex justify-center lg:justify-end">
                            {/* Blob Background */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-200/50 to-orange-200/50 blur-3xl opacity-70 rounded-full"></div>

                            {/* Realistic Phone Frame - Exactly like Home */}
                            <div className="relative z-0 w-[280px] md:w-[320px] lg:w-[340px] bg-slate-900 rounded-[45px] p-[5px] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.15),0_30px_60px_-30px_rgba(0,0,0,0.2),inset_0_-1px_3px_0_rgba(255,255,255,0.1)] ring-1 ring-slate-900/20 transition-transform duration-500">
                                {/* Side Buttons */}
                                <div className="absolute top-32 -right-[2px] w-[2px] h-16 bg-slate-800 rounded-r-sm shadow-sm"></div>
                                <div className="absolute top-24 -left-[2px] w-[2px] h-10 bg-slate-800 rounded-l-sm shadow-sm"></div>
                                <div className="absolute top-40 -left-[2px] w-[2px] h-10 bg-slate-800 rounded-l-sm shadow-sm"></div>

                                {/* Inner Screen Container */}
                                <div className="relative w-full h-full bg-black rounded-[40px] overflow-hidden border-[2px] border-slate-900/50">
                                    {/* Dynamic Area / Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[25px] bg-black z-20 rounded-b-[16px]">
                                        <div className="absolute top-[6px] right-[12px] w-2 h-2 rounded-full bg-slate-800/80"></div>
                                    </div>

                                    {/* Screen Image */}
                                    <img
                                        src="/assets/botanica.webp"
                                        alt="Interface do Agrobotanica"
                                        className="w-full h-auto object-cover"
                                    />
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

                <div className="container-site relative z-10">
                    <div className="text-center mb-[25px]">
                        <div className="flex items-center justify-center gap-4 mb-3">
                            <div className="w-10 h-[1.5px] bg-[#f97316]"></div>
                            <span className="text-[#f97316] font-bold text-sm uppercase tracking-[0.3em]">estratégia digital</span>
                            <div className="w-10 h-[1.5px] bg-[#f97316]"></div>
                        </div>
                        <h2 className="text-[28px] md:text-[35px] font-[900] leading-[1.1] mb-4 text-white">
                            Destaque sua empresa no{" "}
                            <span className="notranslate inline-flex drop-shadow-sm">
                                <span className="text-[#4285F4]">G</span>
                                <span className="text-[#EA4335]">o</span>
                                <span className="text-[#FBBC05]">o</span>
                                <span className="text-[#4285F4]">g</span>
                                <span className="text-[#34A853]">l</span>
                                <span className="text-[#EA4335]">e</span>
                            </span>
                        </h2>

                        <div className="max-w-3xl mx-auto mb-[35px]">
                            <p className="text-white/80 text-center text-sm leading-relaxed font-medium">
                                Ao registar e destacar a sua empresa nas nossas plataformas móveis e no site, está automaticamente a colocar a sua empresa no raio de rastreio dos robôs da Google para indexar os links na plataforma Google Search. Além disso, as nossas plataformas utilizam tecnologias de ponta que permitem:
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-[20px] mt-10">
                        {/* WhatsApp Feature */}
                        <div className="bg-white/5 p-5 rounded-2xl border border-white/50 hover:bg-white/10 transition-all group flex flex-col gap-[10px]">
                            <div className="w-11 h-11 bg-emerald-600 rounded-lg flex items-center justify-center mb-1 shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-6 h-6 text-white" fill="white" />
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
                <div className="container-site relative z-10">

                    <div className="grid lg:grid-cols-[calc(50%+30px)_1fr] gap-0 items-center">
                        {/* Left Column: Image */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <img
                                src="/tecnologia_agraria_sobre_app.png"
                                alt="Tecnologia Agrária"
                                className="w-full h-full object-cover aspect-[1/1] md:aspect-[4/3.5] group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                        </div>

                        {/* Right Column: Vertical Mini Cards with Styled Container */}
                        <div className="p-[20px] md:p-[40px]">
                            <div className="mb-8">
                                <h2 className="text-[28px] md:text-[35px] font-[900] text-slate-600 leading-tight mb-2">
                                    Capacidades <span className="text-[#f97316]">Técnicas</span>
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    O nosso aplicativo integra ferramentas profissionais de última geração que levam o seu negócio a um novo patamar no setor agrícola, fornecendo inteligência e precisão em cada etapa da produção.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                {[
                                    {
                                        title: "Diagnóstico e Tratamento",
                                        desc: "Detecta pragas e doenças das plantas e sugere o tipo de tratamento adequado.",
                                        icon: ShieldCheck,
                                        color: "bg-blue-50 text-blue-600"
                                    },
                                    {
                                        title: "Scanner de Nutrientes",
                                        desc: "Revela o valor nutricional de plantas silvestres e cultivadas instantaneamente.",
                                        icon: BarChart3,
                                        color: "bg-orange-50 text-orange-600"
                                    },
                                    {
                                        title: "Mercado integrado",
                                        desc: "Localiza as lojas mais próximas na região com o insumo e pesticidas para tratar a doença detectada.",
                                        icon: Globe,
                                        color: "bg-emerald-50 text-emerald-600"
                                    }
                                ].map((item, i) => (
                                    <div key={i} className={`flex items-start gap-4 bg-white p-[20px] rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group`}>
                                        <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="text-base font-black text-slate-600 leading-tight mb-1">{item.title}</h4>
                                            <p className="text-slate-500 text-[15px] leading-snug font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* 4. Full-width CTA Card - Moved Up */}
            <div className="bg-slate-900 md:py-16 relative overflow-hidden group z-20">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600/10 skew-x-12 translate-x-1/4 pointer-events-none"></div>
                <div className="container-site relative z-20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-white text-3xl font-black mb-2 uppercase tracking-tight">Pronto para <span className="text-[#f97316]">digitalizar</span> o seu campo?</h3>
                        <p className="text-slate-400 text-base font-medium">Disponível para todos os produtores de Moçambique nas lojas de aplicativos.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button className="px-10 py-4 bg-emerald-600 text-white font-black uppercase text-[12px] tracking-widest rounded-full hover:bg-[#f97316] transition-all shadow-xl shadow-emerald-900/20 active:scale-95">
                            Baixar Aplicativo
                        </button>
                        <button className="px-10 py-4 bg-white/10 text-white font-black uppercase text-[12px] tracking-widest rounded-full hover:bg-[#f97316]/20 hover:border-[#f97316] transition-all border border-white/50 backdrop-blur-sm">
                            Ver Demonstração
                        </button>
                    </div>
                </div>
            </div>

            {/* 5. Innovation / R&D Section - Moved Down to Footer */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container-site relative z-10">
                    <div className="bg-emerald-100 rounded-[20px] p-8 md:p-12 border border-emerald-200/60 relative overflow-hidden group shadow-xl shadow-emerald-900/10">
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
                </div>

                {/* Overlapping Orange Line (Absolute at bottom of page content) */}
                <div className="absolute bottom-0 left-0 w-full z-30">
                    <div className="container-site">
                        <div className="w-full h-[6px] bg-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                    </div>
                </div>
            </section>

            {/* Offline Modal Overlay */}
            {isOfflineModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                        onClick={() => setIsOfflineModalOpen(false)}
                    ></div>

                    <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        {/* Modal Header */}
                        <div className="bg-emerald-600 p-8 text-white relative">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-md flex items-center justify-center border border-white/20">
                                    <CloudOff className="w-9 h-9 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white">O aplicativo não espera pela Internet</h3>
                                    <p className="text-emerald-100 text-sm font-medium opacity-80 mt-1">Produtividade total mesmo nas zonas mais remotas.</p>
                                </div>
                            </div>
                        </div>

                        {/* Orange Line Accent */}
                        <div className="w-full h-[3px] bg-[#f97316]"></div>

                        {/* Modal Content */}
                        <div className="pt-4 px-8 pb-8 space-y-6">
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                A conectividade em Moçambique é um desafio real, especialmente nas zonas de produção. Por isso, a nossa arquitetura offline assegura que tenha as ferramentas de um engenheiro agrónomo sempre disponíveis no seu bolso.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-5">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                        <Zap className="w-5 h-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-600 mb-1">IA Processada Localmente</h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">O diagnóstico de pragas é feito diretamente no processador do smartphone. Não gasta dados e não precisa de sinal para funcionar.</p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100">
                                        <Scan className="w-5 h-5 text-[#f97316]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-600 mb-1">Base de Dados de Bolso</h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">Fichas técnicas e dosagens de pesticidas são descarregadas e ficam disponíveis offline para consulta imediata no campo.</p>
                                    </div>
                                </div>

                                <div className="flex gap-5">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                                        <Globe className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-600 mb-1">Auto-Sincronização</h4>
                                        <p className="text-[13px] text-slate-500 leading-relaxed">Registe as suas ocorrências offline. Assim que o telemóvel encontrar Wi-Fi ou rede, o aplicativo atualiza o seu histórico automaticamente.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-start">
                                <button
                                    onClick={() => setIsOfflineModalOpen(false)}
                                    className="px-8 py-2.5 bg-emerald-600 text-white rounded-lg font-bold hover:bg-[#f97316] transition-all shadow-lg active:scale-95 mt-4 text-sm"
                                >
                                    Entendi, obrigado!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
