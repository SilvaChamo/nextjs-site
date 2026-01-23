"use client";

import { PageHeader } from "@/components/PageHeader";
import { Info, ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

export default function SobrePage() {
    return (
        <main className="min-h-screen overflow-x-hidden">
            <PageHeader
                title={<>Sobre <span className="text-[#f97316]">Nós</span></>}
                icon={Info}
                backgroundImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Sobre Nós", href: undefined }
                ]}
            />

            {/* 1. Introdução e História (Full Width) */}
            <div className="w-full bg-white border-b border-slate-200 relative z-20">
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] py-16 md:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="assets/Agotec.jpg"
                                alt="Agricultura Moderna em Moçambique"
                                className="object-cover w-full h-full scale-100 hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-[48px] font-heading font-black text-slate-600 tracking-tight leading-[1.2]">
                                Conectando hoje o futuro do <span className="text-[#f97316]">agronegócio</span>
                            </h2>
                            <div className="space-y-4 text-slate-600 font-medium leading-relaxed text-lg">
                                <p className="text-[20px]">
                                    A <strong>Base de dados agrícolas</strong> é uma plataforma moçambicana de serviços agrários focada na inovação, através de uso da tecnologia de ponta, para impulsionar o sector agrário, conectando produtores, empresas e o mercado global por meio de soluções digitais inteligentes e dados estratégicos.
                                </p>
                                <p className="text-[14px]">
                                    Mais do que uma plataforma, somos um <span className="text-emerald-600 font-bold">ecossistema integrado</span> que une o pequeno produtor aos grandes mercados, facilita o acesso a insumos de qualidade e democratiza o conhecimento técnico. Acreditamos que a informação correcta, no momento certo, é o insumo mais valioso para o crescimento.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Missão, Visão e Valores (Full Width Dark Section) */}
            <div className="w-full bg-slate-900 relative py-24 overflow-hidden">
                {/* Background Effect */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                {/* Fixed Background Image Overlay */}
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('/assets/hero-bg-new.jpg')] bg-fixed bg-cover bg-center" />

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Missão */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group">
                            <div className="w-14 h-14 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">Nossa Missão</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Potencializar o agronegócio moçambicano através da tecnologia, promovendo a inclusão digital dos produtores e facilitando transações seguras, transparentes e eficientes em toda a cadeia de valor.
                            </p>
                        </div>

                        {/* Visão */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group">
                            <div className="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center mb-6 text-orange-400 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">Nossa Visão</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Ser a principal referência digital do sector agrário na África Austral, reconhecida por transformar dados em oportunidades e por impulsionar o desenvolvimento sustentável das comunidades rurais.
                            </p>
                        </div>

                        {/* Valores */}
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group">
                            <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-handshake"><path d="M19 14c1.49-1.28 3.6-1.28 5.14 0 .34.3.34.7 0 1-1.28 1.49-1.28 3.6 0 5.14.3.34.7.34 1 0 1.28-1.49 3.6-1.28 5.14 0 .34.3.34.7 0 1-1.28 1.49-1.28 3.6 0 5.14.3.34.7.34 1 0-.3-.34-.7-.34-1 0A7.5 7.5 0 0 0 2 11h20z" /><path d="M12.5 13a4.5 4.5 0 0 0-4.5-4.5h-1" /><path d="M13.5 16.5a4.5 4.5 0 0 0 3-3v-1" /></svg>
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">Nossos Valores</h3>
                            <ul className="space-y-2 text-slate-300 font-medium">
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Integridade e Transparência</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Inovação Constante</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Sustentabilidade Ambiental</li>
                                <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Impacto Social Real</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Domínios de Actuação (New Section based on user categories) */}
            <div className="w-full bg-slate-50 py-24">
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px]">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-800 uppercase tracking-tight">Nossos <span className="text-[#f97316]">Domínios</span> de Actuação</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Focamos em áreas estratégicas para garantir a evolução completa da cadeia de valor agrária em Moçambique.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Turismo Rural", desc: "Promoção de experiências autênticas que conectam o visitante à vida no campo e valorizam as tradições locais." },
                            { title: "Tecnologia Agrária", desc: "Implementação de soluções digitais e mecanização inteligente para maximizar a produtividade e eficiência." },
                            { title: "Políticas Agrárias", desc: "Análise e divulgação de normas e directrizes que moldam o futuro jurídico e económico do sector." },
                            { title: "Insumos Agrários", desc: "Facilitação no acesso a sementes, fertilizantes e ferramentas de alta qualidade para o produtor." },
                            { title: "Financiamento Agrário", desc: "Conexão entre produtores e instituições financeiras para viabilizar investimentos estratégicos no campo." },
                            { title: "Artigos Científicos", desc: "Repositório de conhecimento especializado e pesquisas avançadas para embasar decisões técnicas." }
                        ].map((domain, i) => (
                            <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                                <div className="w-2 h-12 bg-[#f97316] mb-6 group-hover:h-16 transition-all duration-300"></div>
                                <h4 className="text-xl font-black text-slate-800 mb-3">{domain.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{domain.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Domínios de Actuação (New Section based on user categories) */}
            <div className="w-full bg-slate-50 py-24">
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px]">
                    <div className="text-center space-y-4 mb-20 relative">
                        {/* Decorative Title with Arrows */}
                        <div className="flex items-center justify-center gap-6 mb-4">
                            <div className="h-[2px] w-12 bg-[#f97316] hidden md:block"></div>
                            <ArrowRight className="text-[#f97316] w-6 h-6 rotate-180" />
                            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400">Nossos Domínios</span>
                            <ArrowRight className="text-[#f97316] w-6 h-6" />
                            <div className="h-[2px] w-12 bg-[#f97316] hidden md:block"></div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-800 uppercase tracking-tight">Actuação <span className="text-[#f97316]">Estratégica</span></h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Focamos em áreas cruciais para garantir a evolução completa da cadeia de valor agrária em Moçambique.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { title: "Turismo Rural", icon: LucideIcons.Map, desc: "Promoção de experiências autênticas que conectam o visitante à vida no campo e valorizam as tradições locais." },
                            { title: "Tecnologia Agrária", icon: LucideIcons.Cpu, desc: "Implementação de soluções digitais e mecanização inteligente para maximizar a produtividade e eficiência." },
                            { title: "Políticas Agrárias", icon: LucideIcons.Scale, desc: "Análise e divulgação de normas e directrizes que moldam o futuro jurídico e económico do sector." },
                            { title: "Insumos Agrários", icon: LucideIcons.Sprout, desc: "Facilitação no acesso a sementes, fertilizantes e ferramentas de alta qualidade para o produtor." },
                            { title: "Financiamento Agrário", icon: LucideIcons.Coins, desc: "Conexão entre produtores e instituições financeiras para viabilizar investimentos estratégicos no campo." },
                            { title: "Artigos Científicos", icon: LucideIcons.BookOpen, desc: "Repositório de conhecimento especializado e pesquisas avançadas para embasar decisões técnicas." }
                        ].map((domain, i) => (
                            <div key={i} className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-[#f97316] group-hover:w-full group-hover:opacity-[0.03] transition-all duration-500"></div>
                                <div className="mb-6 flex items-center justify-between">
                                    <div className="p-3 bg-orange-50 rounded-lg text-[#f97316] group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                                        <domain.icon className="w-6 h-6" />
                                    </div>
                                    <div className="h-[2px] w-16 bg-slate-100 group-hover:bg-[#f97316] transition-colors"></div>
                                </div>
                                <h4 className="text-xl font-black text-slate-800 mb-4 tracking-tight">{domain.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{domain.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Nosso Impacto (Stats) - Full Width, No Rounding, 300px height */}
            <div className="w-full bg-[#0f172a] relative h-auto md:h-[300px] flex items-center overflow-hidden border-t border-slate-800">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent z-10"></div>

                <div className="max-w-[1350px] mx-auto w-full px-4 md:px-[60px] relative z-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center py-12 md:py-0">
                        <div className="space-y-2">
                            <p className="text-5xl md:text-6xl font-black text-[#f97316] drop-shadow-lg">+500</p>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Empresas Registadas</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl md:text-6xl font-black text-emerald-500 drop-shadow-lg">12k</p>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Produtores Conectados</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl md:text-6xl font-black text-blue-500 drop-shadow-lg">+50</p>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Parceiros Estratégicos</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-5xl md:text-6xl font-black text-yellow-500 drop-shadow-lg">24/7</p>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">Monitoria de Mercado</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. CTA Section - Styled as requested (Dark Image BG) */}
            <div className="w-full relative py-32 overflow-hidden bg-[#1a1a1a]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop"
                        alt="Join the network"
                        className="w-full h-full object-cover opacity-30 blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-[#111827]"></div>
                </div>

                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10 text-center space-y-10">
                    <div className="space-y-6">
                        <div className="h-1 w-20 bg-[#f97316] mx-auto rounded-full"></div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                            Conectando Moçambique<br />
                            <span className="text-[#f97316]">Infraestrutura</span> que Impulsiona o Desenvolvimento
                        </h2>
                        <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
                            Seja você um pequeno produtor, uma grande empresa comercial ou uma instituição de ensino, há um lugar para si na Base de Dados Agrícola.
                        </p>
                    </div>

                    <button className="px-12 py-5 bg-[#f97316] text-white rounded-lg font-black text-lg shadow-[0_10px_30px_rgba(249,115,22,0.4)] hover:bg-[#ea580c] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto group">
                        FAÇA PARTE DESTA TRANSFORMAÇÃO
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </main>
    );
}
