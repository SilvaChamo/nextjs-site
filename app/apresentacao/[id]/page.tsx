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
        onSelect();
        emblaApi.on("select", onSelect);
    }, [emblaApi, onSelect]);

    const fetchPresentation = useCallback(async () => {
        const { data, error } = await supabase
            .from('presentations')
            .select('*')
            .eq('id', id)
            .single();

        if (data) setPresentation(data);
        setLoading(false);
    }, [id, supabase]);

    useEffect(() => {
        fetchPresentation();
    }, [fetchPresentation]);

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
                            {/* Universal Slide Layout: Title Top Left + Subtitle + 2 Columns (Photo | Text) */}
                            <div className="w-full h-full flex flex-col items-start text-left animate-in fade-in duration-700">

                                {/* Header: Title & Subtitle */}
                                <div className="mb-12 space-y-2">
                                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none">
                                        {slide.title}
                                    </h1>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-1 bg-orange-500 rounded-full"></div>
                                        <p className="text-orange-500 font-bold uppercase tracking-[0.2em] text-sm md:text-lg">
                                            {presentation.title} {index === 0 ? "• Introdução" : `• Slide ${index + 1}`}
                                        </p>
                                    </div>
                                </div>

                                {/* Body: Two Columns */}
                                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1">

                                    {/* Column 1: Photo */}
                                    <div className="relative group">
                                        <div className="absolute -inset-4 bg-orange-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        {slide.image_url ? (
                                            <div className="relative aspect-video rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                                                <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Recurso Visual • {index + 1}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="aspect-video rounded-2xl bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center">
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
                                    <div className="space-y-6">
                                        <div className="prose prose-invert max-w-none 
                                                prose-p:text-xl md:prose-p:text-2xl prose-p:leading-relaxed prose-p:text-slate-200 prose-p:font-medium
                                                prose-strong:text-orange-500 prose-strong:font-black
                                                prose-ul:list-disc prose-li:text-slate-300"
                                            dangerouslySetInnerHTML={{ __html: slide.content }}>
                                        </div>

                                        {/* Footer line for the slide */}
                                        <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">BaseAgroData &bull; Estratégia Digital</span>
                                            <div className="h-4 w-px bg-white/5"></div>
                                            <span className="text-[8px] font-black text-orange-500/50 uppercase tracking-widest">Acesso Reservado</span>
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

            {/* Navigation Buttons (Visible on Hover/Mobile) */}
            <button
                onClick={() => emblaApi?.scrollPrev()}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-orange-600 rounded-full transition-all opacity-0 hover:opacity-100 z-50 disabled:opacity-0"
                disabled={currentIndex === 0}
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={() => emblaApi?.scrollNext()}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-orange-600 rounded-full transition-all opacity-0 hover:opacity-100 z-50 disabled:opacity-0"
                disabled={currentIndex === slides.length - 1}
            >
                <ChevronRight className="w-8 h-8" />
            </button>



        </div>
    );
}
