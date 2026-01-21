"use client";

import { PageHeader } from "@/components/PageHeader";
import { Info } from "lucide-react";

export default function SobrePage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title={<>Sobre <span className="text-[#f97316]">Nós</span></>}
                icon={Info}
                backgroundImage="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Sobre Nós", href: undefined }
                ]}
            />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px] pb-24">

                {/* 1. Introdução e História */}
                <div className="bg-white rounded-[15px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 px-8 md:px-10 lg:px-12 py-10 md:py-12 mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-[40px] font-heading font-black text-slate-800 tracking-tight leading-[1.2]">
                                Conectamos o campo ao <span className="text-[#f97316]">futuro.</span>
                            </h2>
                            <div className="space-y-4 text-slate-600 font-medium leading-relaxed text-lg">
                                <p>
                                    A <strong>Base Agro Data</strong> nasceu da necessidade urgente de organizar e modernizar o sector agrário em Moçambique. Somos a resposta digital para um desafio antigo: a fragmentação da informação.
                                </p>
                                <p>
                                    Mais do que uma plataforma, somos um <span className="text-emerald-600 font-bold">ecossistema integrado</span> que une o pequeno produtor aos grandes mercados, facilita o acesso a insumos de qualidade e democratiza o conhecimento técnico. Acreditamos que a informação correcta, no momento certo, é o insumo mais valioso para o crescimento.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl skew-y-2 transform transition-transform hover:skew-y-0 duration-500">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop"
                                alt="Agricultura Moderna em Moçambique"
                                className="object-cover w-full h-full scale-110 hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <p className="text-white font-bold text-xl">Inovação no campo, prosperidade na colheita.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Missão, Visão e Valores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {/* Missão */}
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-4">Nossa Missão</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Potencializar o agronegócio moçambicano através da tecnologia, promovendo a inclusão digital dos produtores e facilitando transações seguras, transparentes e eficientes em toda a cadeia de valor.
                        </p>
                    </div>

                    {/* Visão */}
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-orange-200 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-4">Nossa Visão</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Ser a principal referência digital do sector agrário na África Austral, reconhecida por transformar dados em oportunidades e por impulsionar o desenvolvimento sustentável das comunidades rurais.
                        </p>
                    </div>

                    {/* Valores */}
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-200 hover:shadow-lg transition-all group">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-handshake"><path d="M19 14c1.49-1.28 3.6-1.28 5.14 0 .34.3.34.7 0 1-1.28 1.49-1.28 3.6 0 5.14.3.34.7.34 1 0 1.28-1.49 3.6-1.28 5.14 0 .34.3.34.7 0 1-1.28 1.49-1.28 3.6 0 5.14.3.34.7.34 1 0-.3-.34-.7-.34-1 0A7.5 7.5 0 0 0 2 11h20z" /><path d="M12.5 13a4.5 4.5 0 0 0-4.5-4.5h-1" /><path d="M13.5 16.5a4.5 4.5 0 0 0 3-3v-1" /></svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-4">Nossos Valores</h3>
                        <ul className="space-y-2 text-slate-600 font-medium">
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Integridade e Transparência</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Inovação Constante</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Sustentabilidade Ambiental</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Impacto Social Real</li>
                        </ul>
                    </div>
                </div>

                {/* 3. Nosso Impacto (Stats) */}
                <div className="bg-[#111827] rounded-3xl p-12 relative overflow-hidden text-center mb-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black text-white mb-12">O impacto que geramos</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <p className="text-5xl font-black text-[#f97316] mb-2">+500</p>
                                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Empresas Registadas</p>
                            </div>
                            <div>
                                <p className="text-5xl font-black text-emerald-500 mb-2">12k</p>
                                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Produtores Conectados</p>
                            </div>
                            <div>
                                <p className="text-5xl font-black text-blue-500 mb-2">+50</p>
                                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Parceiros Estratégicos</p>
                            </div>
                            <div>
                                <p className="text-5xl font-black text-yellow-500 mb-2">24/7</p>
                                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Monitoria de Mercado</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. CTA */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-black text-slate-800 mb-6">Faça parte desta transformação</h2>
                    <p className="text-slate-600 mb-8 text-lg">
                        Seja você um pequeno produtor, uma grande empresa comercial ou uma instituição de ensino, há um lugar para si na Base Agro Data.
                    </p>
                    <button className="px-10 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-emerald-700 hover:scale-105 transition-all">
                        Juntar-se à Rede
                    </button>
                </div>

            </div>
        </main>
    );
}
