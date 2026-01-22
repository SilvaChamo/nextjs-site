"use client";

import { PageHeader } from "@/components/PageHeader";
import { MarketStatsStrip } from "@/components/MarketStatsStrip";
import { Handshake, TrendingUp, Eye, Globe, Target, Briefcase } from "lucide-react";

export default function ParceriaPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title={<>Seja nosso <span className="text-[#f97316]">Parceiro</span></>}
                icon={Handshake}
                backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Parceria", href: undefined }
                ]}
            />

            {/* Container 1: Intro & Stats */}
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px]">

                {/* 1. Crescemos Juntos */}
                <section className="bg-transparent py-10 md:pt-[20px] md:pb-[40px] overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                        {/* Left Column: Image */}
                        <div className="relative h-[450px] rounded-[20px] overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop"
                                alt="Parceria Base Agro Data"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#f97316]/20 rounded-full blur-2xl z-20"></div>
                            <div className="absolute top-10 right-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl z-20"></div>
                        </div>

                        {/* Right Column: Text Content */}
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                            <div className="space-y-4">
                                <h2 className="text-[35px] md:text-[48px] font-extrabold text-slate-700 leading-[1.1] tracking-tight">
                                    Crescemos juntos <br />
                                    quando <span className="text-[#f97316]">cooperamos</span>
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Acreditamos no poder das parcerias estratégicas para alavancar o sector agrário. Ao tornar-se parceiro da Base Agro Data, a sua organização ganha acesso directo a uma rede qualificada de produtores, empresários e decisores.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex gap-3 group sm:border-r sm:border-slate-200 sm:pr-5">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                            <Eye className="w-5 h-5 text-[#f97316]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-700">Visibilidade Direccionada</h3>
                                            <p className="text-slate-500 text-sm mt-0.5">Destaque sua marca para quem realmente precisa.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 group">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                            <Globe className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-700">Networking de Alto Nível</h3>
                                            <p className="text-slate-500 text-sm mt-0.5">Conecte-se com líderes e decisores do sector.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 group sm:border-r sm:border-slate-200 sm:pr-5">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                            <TrendingUp className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-700">Impacto Sectorial</h3>
                                            <p className="text-slate-500 text-sm mt-0.5">Contribua para o desenvolvimento de Moçambique.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 group">
                                        <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                            <Briefcase className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-700">Atendimento Dedicado</h3>
                                            <p className="text-slate-500 text-sm mt-0.5">Equipa pronta para potencializar sua parceria.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 1.5. Market Position Stats Strip */}
                <div className="mb-16">
                    <MarketStatsStrip />
                </div>

            </div>

            {/* 2. Quem procuramos (Full Width Section) */}
            <section className="w-full bg-white py-20 border-y border-slate-200">
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-black text-slate-700 mb-6">Quem procuramos?</h3>
                            <p className="text-slate-600 mb-8 text-lg">
                                Buscamos organizações comprometidas com a qualidade e o crescimento do agro-negócio. Nossas categorias de parceria incluem:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100 hover:border-orange-200 transition-colors">
                                    <div className="w-2 h-10 bg-orange-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">Fornecedores de Insumos e Maquinaria</span>
                                </li>
                                <li className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
                                    <div className="w-2 h-10 bg-emerald-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">Instituições Financeiras e Seguradoras</span>
                                </li>
                                <li className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                                    <div className="w-2 h-10 bg-blue-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">Empresas de Logística e Transporte</span>
                                </li>
                                <li className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100 hover:border-yellow-200 transition-colors">
                                    <div className="w-2 h-10 bg-yellow-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">Instituições de Ensino e Pesquisa</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 transform rotate-3 rounded-2xl opacity-20 blur-lg"></div>
                            <div className="bg-slate-50 p-8 rounded-2xl shadow-xl relative text-center border border-slate-100">
                                <h4 className="text-2xl font-black text-slate-700 mb-2">Quer ser um parceiro?</h4>
                                <p className="text-slate-500 mb-6 text-sm">Preencha o formulário e nossa equipa de parcerias entrará em contacto.</p>

                                <form id="parceria-form" className="space-y-4 text-left" action="mailto:geral@baseagrodata.com" method="POST" encType="text/plain">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nome da Empresa</label>
                                        <input type="text" name="empresa" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-slate-700" placeholder="Ex: AgroTech Lda" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email Corporativo</label>
                                        <input type="email" name="email" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-slate-700" placeholder="contacto@empresa.com" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Mensagem Curta</label>
                                        <textarea name="mensagem" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium h-24 resize-none text-slate-700" placeholder="Descreva brevemente seu interesse..." required></textarea>
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-slate-800 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
                                        Enviar Proposta de Parceria
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Container 2: Premium Partners */}
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 py-24">
                {/* 3. Premium Partners Section */}
                <section>
                    <div className="bg-slate-900 rounded-[32px] p-12 relative overflow-hidden text-center">
                        {/* Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"></div>
                        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-[#f97316]/10 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-emerald-500/5 rounded-full blur-[120px]"></div>

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-black text-white mb-4">Nossos Parceiros <span className="text-[#f97316]">Premium</span></h2>
                            <p className="text-slate-400 mb-12 text-sm max-w-2xl mx-auto">
                                Organizações líderes que confiam na Base Agro Data para impulsionar o desenvolvimento agrário em Moçambique.
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Partner 1 */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[#f97316]/50 transition-all group cursor-pointer hover:bg-white/10">
                                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Globe className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">TechnoServe</h3>
                                        <p className="text-slate-500 text-xs mt-1">Desenvolvimento</p>
                                    </div>
                                </div>

                                {/* Partner 2 */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[#f97316]/50 transition-all group cursor-pointer hover:bg-white/10">
                                    <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Target className="w-8 h-8 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">FAO</h3>
                                        <p className="text-slate-500 text-xs mt-1">Nações Unidas</p>
                                    </div>
                                </div>

                                {/* Partner 3 */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[#f97316]/50 transition-all group cursor-pointer hover:bg-white/10">
                                    <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Briefcase className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Banco Mundial</h3>
                                        <p className="text-slate-500 text-xs mt-1">Financiamento</p>
                                    </div>
                                </div>

                                {/* Partner 4 */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[#f97316]/50 transition-all group cursor-pointer hover:bg-white/10">
                                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <TrendingUp className="w-8 h-8 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Standard Bank</h3>
                                        <p className="text-slate-500 text-xs mt-1">Banca Comercial</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
