"use client";

import { useEffect, useState, useCallback, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ChevronLeft, ChevronRight, Maximize2, X, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
            if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
                e.preventDefault();
                nextSlide();
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                prevSlide();
            }
            if (e.key === "Escape" && isFullscreen) {
                toggleFullscreen();
            }
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
                        className="flex items-center gap-2 text-red-400 font-black uppercase tracking-[0.2em] text-[8px] hover:text-red-300 transition-colors group"
                    >
                        <X className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" />
                        Sair
                    </button>
                </div>
            </div>

            {/* Header Hint (Optional) */}

            {/* Slides Container - DISSOLVE EFFECT */}
            <div className="h-full relative overflow-hidden">
                <div className="h-full flex">
                    {slides.map((slide: any, index: number) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={index}
                                className={`h-full absolute inset-0 p-[70px] flex items-center justify-center transition-all duration-[1000ms] ease-in-out ${isActive ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-[1.02] pointer-events-none'}`}
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
                                    <div className="w-full max-w-7xl flex flex-col items-center text-center animate-in fade-in duration-700 gap-[25px] mx-auto">

                                        {/* Header: Title & Subtitle */}
                                        <div className="space-y-4 w-full text-center px-[10px] pb-[30px] border-b border-white/30">
                                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                                                {presentation.title}
                                            </h1>
                                            <div className="flex items-center gap-[15px] pt-[5px] justify-center">
                                                <p className="text-orange-500 font-bold text-[18px]">
                                                    {presentation.description || (index === 0 ? "introdução" : `slide ${index + 1}`)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Conditional Layout: Image disabled = centered text only */}
                                        {slide.image_disabled ? (
                                            /* Centered Layout - No Image */
                                            <div className="w-full max-w-4xl text-center space-y-[30px]">
                                                {slide.title && (
                                                    <div className="flex items-center justify-center gap-4 mb-2">
                                                        <div className="w-[45px] h-[2px] bg-orange-500/50"></div>
                                                        <span className="text-orange-500 font-bold uppercase tracking-widest text-[20px]">
                                                            {slide.title}
                                                        </span>
                                                        <div className="w-[45px] h-[2px] bg-orange-500/50"></div>
                                                    </div>
                                                )}
                                                {slide.antetitulo && (
                                                    <div className="mb-4">
                                                        <span className="text-white font-bold first-letter:uppercase lowercase tracking-tight text-[50px] leading-tight block">
                                                            {slide.antetitulo}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="prose prose-invert max-w-none text-center mx-auto
                                                    prose-p:text-[22px] prose-p:leading-relaxed prose-p:text-slate-200 prose-p:font-medium
                                                    prose-h5:text-[28px] prose-h5:font-normal prose-h5:text-white prose-h5:leading-[1.4]
                                                    prose-strong:text-orange-500 prose-strong:font-black
                                                    prose-ul:list-disc prose-ul:pl-10 prose-ul:space-y-4 prose-ul:text-left prose-ul:inline-block
                                                    prose-ol:list-decimal prose-ol:pl-10 prose-ol:space-y-4 prose-ol:text-left prose-ol:inline-block
                                                    prose-li:text-slate-300 prose-li:marker:text-orange-500
                                                    prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:italic"
                                                    dangerouslySetInnerHTML={{ __html: slide.content }}>
                                                </div>

                                                {/* CTA Button - Centered */}
                                                {slide.cta_text && slide.cta_link && (
                                                    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                                        <a
                                                            href={slide.cta_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 px-8 py-[9px] bg-emerald-500 hover:bg-orange-500 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 text-sm uppercase tracking-wider group/btn"
                                                        >
                                                            {slide.cta_text}
                                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            /* Two Column Layout - With Image */
                                            <div className={cn(
                                                "w-full grid grid-cols-1 gap-[30px] items-center",
                                                slide.image_side === 'right' ? "lg:grid-cols-[1fr_550px]" : "lg:grid-cols-[550px_1fr]"
                                            )}>

                                                {/* Column 1: Photo + Footer */}
                                                <div className={cn(
                                                    "flex flex-col items-center w-full",
                                                    slide.image_side === 'right' ? "lg:items-end lg:order-last" : "lg:items-start lg:order-first"
                                                )}>
                                                    <div className="relative group w-full max-w-[550px]">
                                                        <div className="absolute -inset-4 bg-orange-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                        {slide.image_url ? (
                                                            <div className="relative w-[500px] h-[550px] max-w-full rounded-[20px] overflow-hidden border border-white/10 shadow-2xl bg-slate-900 mx-auto lg:mx-0">
                                                                <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
                                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">recurso visual • slide {index + 1}</span>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="relative w-[500px] h-[550px] max-w-full rounded-[20px] bg-white/5 border border-dashed border-white/10 flex items-center justify-center mx-auto lg:mx-0">
                                                                <div className="text-center">
                                                                    <Loader2 className="w-8 h-8 text-white/10 animate-spin mx-auto mb-3" />
                                                                    <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">Sem recurso visual</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Footer line for the slide */}
                                                    <div className="pt-4 flex items-center justify-center gap-4 w-full max-w-[500px] text-slate-300/60 lowercase font-medium text-[10px] tracking-tight">
                                                        <span>baseagrodata</span>
                                                        <span className="opacity-20">•</span>
                                                        <span>estratégia digital</span>
                                                        <span className="opacity-20">•</span>
                                                        <span className="font-bold border border-white/5 px-2 py-0.5 rounded">acesso reservado</span>
                                                    </div>
                                                </div>

                                                {/* Column 2: Description */}
                                                <div className="space-y-[30px] lg:text-left">
                                                    {slide.title && (
                                                        <div className="flex items-center gap-4 mb-2">
                                                            <div className="w-[45px] h-[2px] bg-orange-500/50"></div>
                                                            <span className="text-orange-500 font-bold uppercase tracking-widest text-[20px]">
                                                                {slide.title}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {slide.antetitulo && (
                                                        <div className="mb-4">
                                                            <span className="text-white font-bold first-letter:uppercase lowercase tracking-tight text-[50px] leading-tight block">
                                                                {slide.antetitulo}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="prose prose-invert max-w-none 
                                                        prose-p:text-[22px] prose-p:leading-relaxed prose-p:text-slate-200 prose-p:font-medium
                                                        prose-h5:text-[28px] prose-h5:font-normal prose-h5:text-white prose-h5:leading-[1.4]
                                                        prose-strong:text-orange-500 prose-strong:font-black
                                                        prose-ul:list-disc prose-ul:pl-10 prose-ul:space-y-4
                                                        prose-ol:list-decimal prose-ol:pl-10 prose-ol:space-y-4
                                                        prose-li:text-slate-300 prose-li:marker:text-orange-500
                                                        prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:pl-6 prose-blockquote:italic"
                                                        dangerouslySetInnerHTML={{ __html: slide.content }}>
                                                    </div>

                                                    {/* CTA Button */}
                                                    {slide.cta_text && slide.cta_link && (
                                                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                                            <a
                                                                href={slide.cta_link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 px-8 py-[9px] bg-emerald-500 hover:bg-orange-500 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20 text-sm uppercase tracking-wider group/btn"
                                                            >
                                                                {slide.cta_text}
                                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                            </a>
                                                        </div>
                                                    )}

                                                </div>

                                            </div>
                                        )}
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
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="w-px h-4 bg-white/10"></div>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        nextSlide();
                    }}
                    disabled={currentIndex === slides.length - 1}
                    className="p-2 text-white/50 hover:text-orange-500 disabled:opacity-0 transition-all hover:scale-110 cursor-pointer"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/20 z-50">
                <div
                    className="h-full bg-orange-600 transition-all duration-300 shadow-[0_0_10px_#ea580c]"
                    style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
                ></div>
            </div>

        </div >
    );
}
