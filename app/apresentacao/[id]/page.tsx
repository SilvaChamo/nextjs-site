"use client";

import { useEffect, useState, useCallback, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, ChevronLeft, ChevronRight, Maximize2, X, Clock } from "lucide-react";
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
        // Don't call onSelect() directly here if it sets state
        // emblaApi.on("select", onSelect) will handle updates
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    useEffect(() => {
        let isMounted = true;
        const load = async () => {
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
        load();
        return () => { isMounted = false; };
    }, [id, supabase]);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === " ") emblaApi?.scrollNext();
            if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
            if (e.key === "Escape" && isFullscreen) toggleFullscreen();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [emblaApi, isFullscreen, toggleFullscreen]);

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
        <div className={`fixed inset-0 bg-slate-950 text-white overflow-hidden select-none`}>

            {/* Floating Controls (Canvas Style) */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 hover:opacity-100 transition-all duration-300">
                <button
                    onClick={() => emblaApi?.scrollPrev()}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                >
                    <ChevronLeft className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-black uppercase tracking-widest">Anterior</span>
                </button>
                <div className="w-px h-4 bg-white/10"></div>
                <button
                    onClick={() => emblaApi?.scrollNext()}
                    disabled={currentIndex === slides.length - 1}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-orange-600 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent group"
                >
                    <span className="text-xs font-black uppercase tracking-widest">Próximo</span>
                    <ChevronRight className="w-4 h-4 text-orange-500 group-hover:text-white" />
                </button>
                <div className="w-px h-4 bg-white/10"></div>
                <button
                    onClick={() => {
                        if (document.fullscreenElement) document.exitFullscreen();
                        router.back();
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
                >
                    <X className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Sair</span>
                </button>
            </div>

            {/* Slides Container */}
            <div className="h-full embla" ref={emblaRef}>
                <div className="h-full embla__container">
                    {slides.map((slide: any, index: number) => (
                        <div key={index} className="h-full embla__slide relative p-[70px] flex items-center justify-center overflow-hidden">

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
                                        <div className="flex items-center gap-[30px]">
                                            <div className="w-24 h-1 bg-orange-500 rounded-full"></div>
                                            <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-md md:text-2xl">
                                                {presentation.title} {index === 0 ? "Introdução" : `Slide ${index + 1}`}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Body: Two Columns */}
                                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-[30px] items-center flex-1">

                                        {/* Column 1: Photo */}
                                        <div className="relative group">
                                            <div className="absolute -inset-4 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            {slide.image_url ? (
                                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-[6px] border-white/10 shadow-2xl">
                                                    <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                                        <span className="text-xs font-black uppercase tracking-widest text-white/50">Recurso Visual • {index + 1}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="aspect-[4/3] rounded-3xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center">
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
                                        <div className="space-y-[30px]">
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
                    ))}
                </div>
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
