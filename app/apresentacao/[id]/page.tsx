"use client";

import { useEffect, useState, useCallback, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ChevronLeft, ChevronRight, Maximize2, X, Play, Clock, LayoutGrid } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
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

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        duration: 30,
        dragFree: false
    });

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    useEffect(() => {
        fetchPresentation();
    }, [id]);

    const fetchPresentation = async () => {
        const { data, error } = await supabase
            .from('presentations')
            .select('*')
            .eq('id', id)
            .single();

        if (data) setPresentation(data);
        setLoading(false);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") emblaApi?.scrollNext();
            if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
            if (e.key === "Escape" && isFullscreen) toggleFullscreen();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [emblaApi, isFullscreen]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
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
        <div className={`fixed inset-0 bg-slate-950 text-white overflow-hidden select-none`}>

            {/* Top Bar - Auto Hide */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-widest text-emerald-500">{presentation.title}</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Slide {currentIndex + 1} de {slides.length}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-mono font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <button onClick={toggleFullscreen} className="p-3 bg-white/10 hover:bg-emerald-600 rounded-full transition-all">
                        <Maximize2 className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Slides Container */}
            <div className="h-full embla" ref={emblaRef}>
                <div className="h-full embla__container">
                    {slides.map((slide: any, index: number) => (
                        <div key={index} className="h-full embla__slide relative flex items-center justify-center overflow-hidden">

                            {/* Background */}
                            {slide.image_url ? (
                                <>
                                    <img src={slide.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105 blur-[2px]" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80"></div>
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950"></div>
                            )}

                            {/* Content Layouts */}
                            <div className="relative z-10 max-w-6xl w-full px-12 py-20 flex flex-col items-center text-center">

                                {index === 0 ? (
                                    /* Cover Slide */
                                    <div className="space-y-8 animate-in fade-in zoom-in duration-1000">
                                        <div className="flex justify-center mb-6">
                                            <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
                                        </div>
                                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                                            {slide.title}
                                        </h1>
                                        <div className="text-xl md:text-2xl text-emerald-400 font-medium max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: slide.content }}></div>
                                        <div className="pt-12">
                                            <p className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">BaseAgroData &bull; 2026</p>
                                        </div>
                                    </div>
                                ) : (
                                    /* Content Slide */
                                    <div className="w-full grid grid-cols-1 lg:grid-cols-1 gap-12 text-left">
                                        <div className="space-y-8">
                                            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white border-l-8 border-emerald-500 pl-8 leading-tight">
                                                {slide.title}
                                            </h2>
                                            <div className="text-xl md:text-2xl leading-relaxed text-slate-300 font-medium space-y-4 prose prose-invert max-w-none prose-p:my-4 prose-strong:text-white prose-strong:font-black"
                                                dangerouslySetInnerHTML={{ __html: slide.content }}>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-50">
                <div
                    className="h-full bg-emerald-500 transition-all duration-300 shadow-[0_0_10px_#10b981]"
                    style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
                ></div>
            </div>

            {/* Navigation Buttons (Visible on Hover/Mobile) */}
            <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-emerald-600 rounded-full transition-all opacity-0 hover:opacity-100 z-50 disabled:opacity-0"
                disabled={currentIndex === 0}
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-emerald-600 rounded-full transition-all opacity-0 hover:opacity-100 z-50 disabled:opacity-0"
                disabled={currentIndex === slides.length - 1}
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Footer Status */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 z-50 opacity-50">
                <span>BaseAgroData.com</span>
                <span className="text-emerald-500/50">Modo Apresentação Aktivo</span>
            </div>

        </div>
    );
}
