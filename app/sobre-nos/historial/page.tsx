"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, ScrollText, History, Target, Users } from "lucide-react";

export default function HistorialPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header / Breadcrumbs */}
            <div className="bg-white border-b border-slate-200 py-4 px-6 md:px-12">
                <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                    <Link href="/sobre-nos" className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-widest">Voltar para Sobre Nós</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-3">
                        <History className="w-5 h-5 text-[#f97316]" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Nosso Historial</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row min-h-[calc(100vh-65px)]">

                {/* Left Column (Menu / Identity) */}
                <aside className="w-full md:w-[350px] bg-white border-r border-slate-200 p-8 md:p-12 space-y-10">
                    <div className="space-y-6">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-inner overflow-hidden">
                            <Image
                                src="/assets/Logo.png"
                                alt="Base Agro Data Logo"
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 leading-tight">Base de Dados <br /><span className="text-emerald-600">Agrícola</span></h2>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Fundada em Moçambique</p>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            A força motriz da inovação agrária no país, unindo o legado da comunicação à precisão da tecnologia de dados.
                        </p>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { icon: BookOpen, label: "A Origem", active: true },
                            { icon: ScrollText, label: "O Jornal Agrícola", active: false },
                            { icon: Target, label: "A Evolução Digital", active: false },
                            { icon: Users, label: "Impacto Comunitário", active: false }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${item.active ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                            </div>
                        ))}
                    </nav>

                    <div className="pt-8 border-t border-slate-100">
                        <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                            <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">Próximo Capítulo</p>
                            <p className="text-xs font-bold text-slate-700 leading-relaxed">
                                "Não paramos no diagnóstico; agora estamos a construir o futuro da robótica no campo."
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Right Column (The History Content) */}
                <section className="flex-1 bg-white md:bg-transparent p-8 md:p-16 lg:p-24 overflow-y-auto">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-600/10 border border-emerald-500/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Trajectória de Inovação</span>
                        </div>

                        <h1 className="text-[40px] md:text-[56px] font-black text-slate-800 leading-[1] mb-8 tracking-tighter">
                            O nosso <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] to-orange-600">Historial</span>
                        </h1>

                        <div className="prose prose-slate max-w-none space-y-12">
                            {/* Section 1 */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-700 flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm">01</span>
                                    A Raiz: O Jornal Agrícola
                                </h3>
                                <div className="pl-14 space-y-4">
                                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                        Tudo começou com o **Jornal Agrícola**, uma iniciativa registada junto às entidades de comunicação nacional como um hub de projectos para o desenvolvimento comunitário.
                                    </p>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        Durante anos, o jornal foi a voz do campo, reportando notícias e desafios enfrentados pelos agricultores. No entanto, percebemos que reportar os factos era apenas o início. Para realmente transformar a vida no campo, era necessário entregar **soluções tangíveis**.
                                    </p>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-700 flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm">02</span>
                                    A Metamorfose Tecnológica
                                </h3>
                                <div className="pl-14 space-y-4">
                                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                        Identificamos que a maior barreira para o crescimento não era a falta de vontade, mas a **falta de dados estruturados** e a dificuldade de conexão directa entre os actores da cadeia de valor.
                                    </p>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        Foi então que tomamos uma decisão estratégica: o Jornal Agrícola deixaria de ser apenas um meio impresso para se tornar o coração de uma infra-estrutura digital. Assim nasceu a **Base de Dados Agrícola de Moçambique**.
                                    </p>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-slate-700 flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-[#f97316] text-white flex items-center justify-center text-sm">03</span>
                                    O Presente e o Futuro
                                </h3>
                                <div className="pl-14 space-y-4">
                                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                        Hoje, a base de dados é muito mais do que um arquivo — é o motor propulsor que alimenta o aplicativo **Botânica**, monitora cotações de mercado e conecta fornecedores a clientes.
                                    </p>
                                    <p className="text-slate-500 leading-relaxed font-medium">
                                        Esquecemos a banca para focar no terreno. A nossa história está a ser escrita agora, linha a linha de código, transação a transação, hectare a hectare. Somos a evolução digital da comunicação agrária em Moçambique.
                                    </p>
                                </div>
                            </div>

                            {/* Quote Section */}
                            <div className="pt-12">
                                <div className="bg-slate-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full"></div>
                                    <div className="relative z-10">
                                        <p className="text-2xl font-bold text-white leading-tight italic px-8">
                                            "Transformamos o jornal em tecnologia, para que o agricultor não apenas leia sobre a mudança, mas a sinta no seu rendimento final."
                                        </p>
                                        <div className="w-12 h-1 bg-orange-500 mx-auto mt-8"></div>
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
