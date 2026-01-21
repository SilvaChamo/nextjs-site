"use client";

import { PageHeader } from "@/components/PageHeader";
import { Handshake } from "lucide-react";

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

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">

                {/* 1. Intro Box */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-16">
                    <div className="space-y-6 max-w-4xl">
                        <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-800 tracking-tight leading-[1.2]">
                            Crescemos juntos quando <span className="text-[#f97316]">cooperamos.</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                            Acreditamos no poder das parcerias estratégicas para alavancar o sector agrário. Ao tornar-se parceiro da Base Agro Data, a sua organização ganha acesso directo a uma rede qualificada de produtores, empresários e decisores, ao mesmo tempo que contribui para o desenvolvimento socioeconómico de Moçambique.
                        </p>
                    </div>
                </div>

                {/* 2. Vantagens da Parceria */}
                <div className="mb-20">
                    <h3 className="text-2xl font-black text-slate-800 mb-10 text-center uppercase tracking-wide">Por que ser nosso parceiro?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                                <Handshake className="w-6 h-6" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Visibilidade Direccionada</h4>
                            <p className="text-slate-500 leading-relaxed">
                                Destaque a sua marca, produtos ou serviços directamente para quem precisa deles. Nossos parceiros têm prioridade nos resultados de busca e banners de destaque.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-3"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Inteligência de Mercado</h4>
                            <p className="text-slate-500 leading-relaxed">
                                Aceda a relatórios exclusivos sobre tendências de produção, variações de preços e demandas regionais para tomar decisões de negócio mais assertivas.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network"><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-800 mb-3">Networking de Alto Nível</h4>
                            <p className="text-slate-500 leading-relaxed">
                                Conecte-se com outras empresas líderes, instituições governamentais e ONGs que também fazem parte do nosso ecossistema de inovação.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Quem procuramos */}
                <div className="bg-slate-50 rounded-3xl p-10 md:p-16 mb-16 border border-slate-200">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-black text-slate-800 mb-6">Quem procuramos?</h3>
                            <p className="text-slate-600 mb-8 text-lg">
                                Buscamos organizações comprometidas com a qualidade e o crescimento do agro-negócio. Nossas categorias de parceria incluem:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                    <div className="w-2 h-10 bg-orange-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">Fornecedores de Insumos e Maquinaria</span>
                                </li>
                                <li className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                    <div className="w-2 h-10 bg-emerald-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">Instituições Financeiras e Seguradoras</span>
                                </li>
                                <li className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                    <div className="w-2 h-10 bg-blue-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">Empresas de Logística e Transporte</span>
                                </li>
                                <li className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                    <div className="w-2 h-10 bg-yellow-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">Instituições de Ensino e Pesquisa</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 transform rotate-3 rounded-2xl opacity-20 blur-lg"></div>
                            <div className="bg-white p-8 rounded-2xl shadow-xl relative text-center border border-slate-100">
                                <h4 className="text-2xl font-black text-slate-800 mb-2">Quer ser um parceiro?</h4>
                                <p className="text-slate-500 mb-6 text-sm">Preencha o formulário e nossa equipa de parcerias entrará em contacto.</p>

                                <form className="space-y-4 text-left">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nome da Empresa</label>
                                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium" placeholder="Ex: AgroTech Lda" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Corporativo</label>
                                        <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium" placeholder="contacto@empresa.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mensagem Curta</label>
                                        <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium h-24 resize-none" placeholder="Descreva brevemente seu interesse..."></textarea>
                                    </div>
                                    <button type="button" className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
                                        Enviar Proposta de Parceria
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
