"use client";

import { useEffect, useState, useCallback, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ChevronLeft, ChevronRight, Maximize2, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PresentationViewerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const supabase = createClient();
    const router = useRouter();
    const [presentation, setPresentation] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        let isMounted = true;
        const loadPresentation = async () => {
            const { data } = await supabase
                .from('presentations')
                .select('*')
                .eq('id', id)
                .single();

            if (isMounted) {
                if (data) setPresentation(data);
                setLoading(false);
            }
        };
        loadPresentation();
        return () => { isMounted = false; };
    }, [id, supabase]);

    const toggleFullscreen = useCallback(() => {
        const element = document.getElementById("presentation-root");
        if (!element) return;

        if (!document.fullscreenElement) {
            element.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    }, []);

    // Navigation logic
    const nextSlide = useCallback(() => {
        if (!presentation?.slides) return;
        setCurrentIndex((prev) => Math.min(prev + 1, presentation.slides.length - 1));
    }, [presentation]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "Escape" && isFullscreen) toggleFullscreen();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFullscreen, toggleFullscreen, nextSlide, prevSlide]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!presentation || !presentation.slides || presentation.slides.length === 0) {
        return (
            <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center text-white p-6">
                <h1 className="text-2xl font-bold mb-4">Apresentação não encontrada</h1>
                <Button onClick={() => router.back()} variant="outline" className="text-white border-white/20 hover:bg-white/10">
                    Voltar
                </Button>
            </div>
        );
    }

    const slides = presentation.slides;

    return (
        <div
            id="presentation-root"
            className={`fixed inset-0 bg-slate-950 text-white overflow-hidden select-none transition-all duration-700`}
        >
            {/* Top Right: Actions & Timer */}
            <div className="absolute top-10 right-10 z-[100] flex items-center gap-4">
                <div className="flex items-center gap-6 px-8 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                    <div className="flex items-center gap-2 text-white/50">
                        <Maximize2
                            className={`w-4 h-4 cursor-pointer hover:text-orange-500 transition-colors ${isFullscreen ? 'text-orange-500' : ''}`}
                            onClick={toggleFullscreen}
                        />
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <button
                        onClick={() => {
                            if (document.fullscreenElement) document.exitFullscreen();
                            router.back();
                        }}
                        className="flex items-center gap-2 text-red-400 font-black uppercase tracking-[0.2em] text-[10px] hover:text-red-300 transition-colors group"
                    >
                        <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        Sair
                    </button>
                </div>
            </div>

            {/* Header Hint (Optional) */}
            {!isFullscreen && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[50] animate-pulse text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                        Pressione F11 ou clique no ícone para Fullscreen Total
                    </p>
                </div>
            )}

            {/* Slides Container - DISSOLVE EFFECT */}
            <div className="h-full relative overflow-hidden">
                <div className="h-full flex">
                    {slides.map((slide: any, index: number) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={index}
                                className={`h-full absolute inset-0 p-[70px] flex items-center justify-center transition-all duration-[1000ms] ease-in-out ${isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-[1.02] pointer-events-none'
                                    }`}
                                style={{ minWidth: '100%' }}
                            >

                                {/* Background */}
                                {slide.image_url ? (
                                    <>
                                        <img src={slide.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105 blur-[2px]" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80"></div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950"></div>
                                )}

                                <div className="relative z-10 max-w-full w-full h-full">
                                    {/* Universal Slide Layout: Title Top Left + Subtitle + 2 Columns (Photo | Text) */}
                                    <div className="w-full h-full flex flex-col items-start text-left animate-in fade-in duration-700 gap-[30px]">

                                        {/* Header: Title & Subtitle */}
                                        <div className="space-y-[30px]">
                                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                                                {slide.title}
                                            </h1>
                                            <div className="flex items-center gap-4 mt-2">
                                                <p className="text-orange-500 font-bold tracking-[0.2em] text-lg md:text-xl">
                                                    {presentation.title} {index === 0 ? "introdução" : `slide ${index + 1}`}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Body: Two Columns */}
                                        <div className="w-full grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-[35px] items-start flex-1">

                                            {/* Column 1: Photo - Fixed 550x600 area */}
                                            <div className="relative group flex justify-start">
                                                <div className="absolute -inset-4 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                {slide.image_url ? (
                                                    <div className="relative w-[550px] h-[600px] max-w-full rounded-3xl overflow-hidden border-[6px] border-white/10 shadow-2xl">
                                                        <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                                            <span className="text-xs font-black uppercase tracking-widest text-white/50">recurso visual • {index + 1}</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-[550px] h-[600px] max-w-full rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
                                                            </div>
                                                            <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Sem recurso visual</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Column 2: Description */}
                                            <div className="space-y-[30px] py-[40px]">
                                                {slide.antetitulo && (
                                                    <div className="space-y-2">
                                                        <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">
                                                            {slide.antetitulo}
                                                        </span>
                                                        <div className="w-10 h-0.5 bg-orange-500/30"></div>
                                                    </div>
                                                )}
                                                <div className="prose prose-invert max-w-none 
                                                    prose-p:text-2xl md:prose-p:text-4xl prose-p:leading-relaxed prose-p:text-slate-200 prose-p:font-medium
                                                    prose-strong:text-orange-500 prose-strong:font-black
                                                    prose-ul:list-disc prose-li:text-slate-300"
                                                    dangerouslySetInnerHTML={{ __html: slide.content }}>
                                                </div>

                                                {/* Footer line for the slide */}
                                                <div className="pt-8 border-t border-white/5 flex items-center gap-[30px]">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">BaseAgroData &bull; Estratégia Digital</span>
                                                    <div className="h-6 w-px bg-white/5"></div>
                                                    <span className="text-[10px] font-black text-orange-500/50 uppercase tracking-[0.3em]">Acesso Reservado</span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Right Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-[100] flex items-center gap-4 pointer-events-auto">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        prevSlide();
                    }}
                    disabled={currentIndex === 0}
                    className="p-2 text-white/50 hover:text-orange-500 disabled:opacity-0 transition-all hover:scale-110 cursor-pointer"
                >
                    <ChevronLeft className="w-8 h-8" />
                </button>
                <div className="w-px h-6 bg-white/10"></div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                    }}
                    disabled={currentIndex === slides.length - 1}
                    className="p-2 text-white/50 hover:text-orange-500 disabled:opacity-0 transition-all hover:scale-110 cursor-pointer"
                >
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-50">
                <div
                    className="h-full bg-orange-600 transition-all duration-300 shadow-[0_0_10px_#ea580c]"
                    style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
                ></div>
            </div>

        </div>
    );
}
