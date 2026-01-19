"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Clock, ThumbsUp, Share2, Search,
    ArrowRight, Bookmark, MessageSquare,
    Facebook, Twitter, Linkedin
} from "lucide-react";

export default function ArticleReadingPage({ params }: { params: { slug: string } }) {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Content Area */}
                    <article className="lg:col-span-8">
                        <div className="mb-10">
                            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#f97316] mb-6">
                                <Link href="/pesquisa" className="hover:underline">Agricultura Sustentável</Link>
                                <span className="text-slate-200">/</span>
                                <span className="text-slate-400">Insights de Mercado</span>
                            </nav>

                            <h1 className="text-4xl md:text-5xl font-black leading-[1.1] text-slate-600 mb-8 tracking-tight">
                                Harnessing Precision Data for Maize Production in Central Mozambique
                            </h1>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 py-8 border-y border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-full bg-slate-100 relative overflow-hidden ring-2 ring-emerald-500/20">
                                        <Image
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
                                            alt="Author"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-600">Dr. Arnaldo Mabunda</p>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Agrónomo Chefe • 28 Out, 2023</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                        <Clock className="w-4 h-4" />
                                        <span>8 min de leitura</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="size-9 rounded-full bg-slate-50 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                            <Facebook className="w-4 h-4" />
                                        </button>
                                        <button className="size-9 rounded-full bg-slate-50 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                            <Twitter className="w-4 h-4" />
                                        </button>
                                        <button className="size-9 rounded-full bg-slate-50 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all">
                                            <Linkedin className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[10px] overflow-hidden mb-12 shadow-2xl shadow-emerald-900/10 relative h-[500px]">
                            <Image
                                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200"
                                alt="Agricultural fields"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-sm py-4 px-6">
                                <p className="text-xs text-center text-white/90 italic">Sistemas de monitorização de irrigação avançados implantados na Província de Manica.</p>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none prose-h2:text-3xl prose-h2:font-black prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-blockquote:border-l-4 prose-blockquote:border-[#f97316] prose-blockquote:bg-[#f97316]/5 prose-blockquote:p-8 prose-blockquote:rounded-r-[10px] prose-blockquote:font-bold prose-blockquote:text-xl">
                            <p>O sector agrícola em Moçambique está a passar por uma revolução silenciosa. À medida que os padrões climáticos mudam e as exigências do mercado por cereais de alta qualidade aumentam, os agricultores das províncias centrais estão a recorrer à agricultura de precisão baseada em dados para optimizar a sua produção sazonal.</p>

                            <h2>O Poder do Mapeamento de Solos</h2>
                            <p>Um dos avanços mais significativos dos últimos anos foi a implementação do mapeamento de solos de alta resolução. Ao compreender a composição granular dos nutrientes do solo num único hectare, os produtores podem aplicar fertilizantes com precisão cirúrgica.</p>

                            <blockquote>
                                "A agricultura de precisão já não é um luxo para operações comerciais de grande escala; está a tornar-se uma necessidade para qualquer agricultor que pretenda a sustentabilidade a longo prazo no Corredor da Beira."
                            </blockquote>

                            <h2>Monitorização por Satélite</h2>
                            <p>A integração de imagens de satélite com sensores de terreno permite a monitorização em tempo real da saúde das culturas. Através da análise NDVI, podemos agora detectar o stress hídrico e as infestações de pragas até dez dias antes de serem visíveis a olho nu.</p>

                            <div className="bg-emerald-50 rounded-[10px] p-10 my-12 border border-emerald-100 border-l-8 border-l-emerald-500">
                                <h3 className="text-xl font-black text-emerald-900 mb-6 uppercase tracking-widest">Principais Conclusões para Produtores</h3>
                                <ul className="space-y-4 text-emerald-800 font-medium">
                                    <li className="flex gap-3">
                                        <div className="size-6 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 text-emerald-700 text-xs font-black">1</div>
                                        <span>Invista em testes periódicos de solo para evitar a saturação excessiva de nutrientes.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="size-6 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 text-emerald-700 text-xs font-black">2</div>
                                        <span>Utilize alertas climáticos via telemóvel para planear as janelas de plantio.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="size-6 rounded-full bg-emerald-200 flex items-center justify-center shrink-0 text-emerald-700 text-xs font-black">3</div>
                                        <span>Considere a partilha colaborativa de dados para beneficiar de conhecimentos regionais.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex flex-wrap gap-2">
                                {["Agricultura", "Dados", "Moçambique", "Tecnologia"].map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-400 text-[10px] font-black rounded-full uppercase tracking-widest">#{tag}</span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 bg-white border border-slate-100 px-6 py-3 rounded-[10px] text-sm font-bold hover:bg-slate-50 transition-colors">
                                    <ThumbsUp className="text-emerald-500 w-4 h-4" />
                                    Útil
                                </button>
                                <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-[10px] text-sm font-bold hover:bg-emerald-600 transition-all">
                                    <Share2 className="w-4 h-4" />
                                    Partilhar
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-24 space-y-12">
                            <div className="bg-white border border-slate-100 rounded-[10px] p-8 shadow-sm">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Índice do Artigo</h3>
                                <nav className="space-y-6">
                                    {[
                                        "Introdução",
                                        "O Poder do Mapeamento",
                                        "Monitorização por Satélite",
                                        "Principais Conclusões",
                                        "Perspectivas Futuras"
                                    ].map((item, i) => (
                                        <a key={i} href="#" className={`block text-xs font-bold uppercase tracking-widest ${i === 0 ? 'text-emerald-600 border-l-2 border-emerald-600 pl-4' : 'text-slate-400 hover:text-emerald-600 transition-colors pl-4'}`}>
                                            {item}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            <div className="space-y-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Leituras Recomendadas</h3>
                                <div className="space-y-8">
                                    {[1, 2, 3].map(i => (
                                        <Link key={i} href="#" className="flex gap-4 group">
                                            <div className="size-20 shrink-0 rounded-[10px] bg-slate-100 relative overflow-hidden">
                                                <Image
                                                    src={`https://images.unsplash.com/photo-15${i}523348837708?auto=format&fit=crop&q=80&w=150`}
                                                    alt="Article thumb"
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-all duration-500"
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm leading-tight text-slate-600 group-hover:text-emerald-600 transition-colors mb-1">Práticas de Fertilizantes Orgânicos em Niassa</h4>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">4 min • Pesquisa</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <button className="w-full py-4 border-2 border-slate-100 rounded-[10px] text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
                                    Ver Arquivo Completo
                                </button>
                            </div>

                            <div className="bg-emerald-600 rounded-[10px] p-10 relative overflow-hidden group">
                                <div className="absolute -right-8 -top-8 size-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                <h3 className="text-white text-2xl font-black relative z-10 mb-6 leading-tight">Quer o relatório completo?</h3>
                                <p className="text-white/80 text-sm mb-8 relative z-10 font-medium leading-relaxed">Obtenha o PDF dos Dados de Culturas de 2023 com métricas regionais detalhadas.</p>
                                <button className="w-full bg-[#f97316] text-white py-4 rounded-[10px] font-black text-xs uppercase tracking-widest hover:bg-white hover:text-emerald-600 transition-all shadow-xl shadow-black/20">
                                    Descarregar PDF
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
