"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { PageHeader } from "@/components/PageHeader";
import { Presentation, Loader2, ArrowRight, Play, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PresentationsGalleryPage() {
    const [presentations, setPresentations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchPresentations = async () => {
            const { data, error } = await supabase
                .from('presentations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching presentations:", error);
            } else {
                setPresentations(data || []);
            }
            setLoading(false);
        };

        fetchPresentations();
    }, [supabase]);

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title={<>Galeria de <span className="text-emerald-600">Apresentações</span></>}
                icon={Presentation}
                backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Apresentações", href: undefined }
                ]}
            />

            <div className="container-site py-16">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-4" />
                        <p className="text-sm font-black uppercase tracking-widest text-slate-400">Carregando conteúdos...</p>
                    </div>
                ) : presentations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {presentations.map((item) => {
                            const slideCount = item.slides?.length || 0;
                            const firstSlideImage = item.slides?.[0]?.image_url;

                            return (
                                <div key={item.id} className="group bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                                    {/* Thumbnail Area */}
                                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                                        {firstSlideImage ? (
                                            <img
                                                src={firstSlideImage}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <Presentation className="w-12 h-12 opacity-20" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                                        {/* Play Overlay */}
                                        <Link
                                            href={`/apresentacao/${item.id}`}
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                                                <Play className="w-6 h-6 fill-current ml-1" />
                                            </div>
                                        </Link>

                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                                {slideCount} Slides
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(item.created_at).toLocaleDateString('pt-PT')}
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                            <div className="flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5" />
                                                BaseAgro
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>

                                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-6 font-medium">
                                            {item.description || "Aceda a esta apresentação interactiva sobre as tendências e desenvolvimentos no sector agrário."}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-slate-50">
                                            <Link
                                                href={`/apresentacao/${item.id}`}
                                                className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-emerald-600 group/link"
                                            >
                                                <span>Abrir Apresentação</span>
                                                <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 text-center max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                            <Presentation className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Nenhuma apresentação disponível</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8">
                            Neste momento não existem apresentações públicas no nosso repositório. Por favor, volte mais tarde para novos conteúdos.
                        </p>
                        <Link href="/">
                            <button className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                                Voltar ao Início
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
