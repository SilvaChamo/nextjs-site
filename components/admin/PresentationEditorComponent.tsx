"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Save, Loader2, Play, Image as ImageIcon, FileText, ChevronUp, ChevronDown, Layout, Sidebar as SidebarIcon, Menu, Maximize2, Monitor, Copy, Download, FileJson, FilePieChart, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


// Helper for generating IDs safely
const generateId = () => Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/RichTextEditor";
import { cn } from "@/lib/utils";

interface PresentationEditorComponentProps {
    id: string;
    backPath: string;
}

export function PresentationEditorComponent({ id, backPath }: PresentationEditorComponentProps) {
    const isNew = id === "novo";
    const supabase = createClient();
    const router = useRouter();

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [presentation, setPresentation] = useState({
        title: "",
        description: "",
        slides: [
            { id: generateId(), title: "", antetitulo: "", content: "", image_url: "", image_side: "left", image_disabled: false, text_align: "center", title_align: "center", antetitulo_align: "center", cta_text: "", cta_link: "", cta_align: "center", animation_text: "fade-in", animation_image: "fade-in", title_size: 52, image_height: 550 }
        ]
    });

    useEffect(() => {
        if (isNew) return;
        let isMounted = true;

        const load = async () => {
            const { data } = await supabase
                .from('presentations')
                .select('*')
                .eq('id', id)
                .single();

            if (isMounted && data) {
                const slides = (data.slides && data.slides.length > 0) ? (data.slides).map((s: any, idx: number) => ({
                    ...s,
                    id: s.id || `slide-${idx}-${Date.now()}`,
                    image_side: s.image_side || 'left',
                    image_disabled: s.image_disabled || false,
                    text_align: s.text_align || 'center',
                    title_align: s.title_align || 'center',
                    antetitulo_align: s.antetitulo_align || 'center',
                    cta_align: s.cta_align || 'center',
                    title_size: s.title_size || 52,
                    image_height: s.image_height || 550
                })) : [
                    { id: generateId(), title: "", antetitulo: "", content: "", image_url: "", image_side: "left", image_disabled: false, text_align: "center", title_align: "center", antetitulo_align: "center", cta_text: "", cta_link: "", cta_align: "center", animation_text: "fade-in", animation_image: "fade-in", title_size: 52, image_height: 550 }
                ];

                setPresentation({
                    title: data.title,
                    description: data.description || "",
                    slides
                });
                setLoading(false);
            } else if (isMounted) {
                setLoading(false);
            }
        };

        load();
        return () => { isMounted = false; };
    }, [id, isNew, supabase]);

    const handleAddSlide = () => {
        setPresentation(prev => ({
            ...prev,
            slides: [...prev.slides, { id: generateId(), title: "", antetitulo: "", content: "", image_url: "", image_side: "left", image_disabled: false, text_align: "center", title_align: "center", antetitulo_align: "center", cta_text: "", cta_link: "", cta_align: "center", animation_text: "fade-in", animation_image: "fade-in", title_size: 52, image_height: 550 }]
        }));
    };

    const handleDuplicateSlide = (index: number) => {
        const slideToDuplicate = presentation.slides[index];
        const duplicatedSlide = {
            ...slideToDuplicate,
            id: generateId(),
            title: `${slideToDuplicate.title} (Cópia)`
        };

        const newSlides = [...presentation.slides];
        newSlides.splice(index + 1, 0, duplicatedSlide);

        setPresentation(prev => ({
            ...prev,
            slides: newSlides
        }));

        setActiveIndex(index + 1);
        toast.success("Slide duplicado!");
    };

    const handleRemoveSlide = (slideId: string) => {
        if (presentation.slides.length === 1) {
            toast.error("Uma apresentação deve ter pelo menos um slide.");
            return;
        }
        setPresentation(prev => ({
            ...prev,
            slides: prev.slides.filter(s => s.id !== slideId)
        }));
    };

    const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
        const newSlides = [...presentation.slides];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newSlides.length) return;

        [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]];
        setPresentation(prev => ({ ...prev, slides: newSlides }));
    };

    const updateSlide = (slideId: string, fields: any) => {
        setPresentation(prev => ({
            ...prev,
            slides: prev.slides.map(s => s.id === slideId ? { ...s, ...fields } : s)
        }));
    };

    const handleExportPDF = async () => {
        setSaving(true);
        toast.info("A gerar PDF... Por favor, aguarde.");

        try {
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [1280, 720]
            });

            // We need a way to render each slide
            // Since we can't easily wait for images to load in a hidden div, 
            // we'll try a simpler approach if possible or just use pptxgen which is cleaner for data-driven slides.
            // For now, let's implement a clean PPTX and a basic PDF.

            // Basic PDF implementation (Text only if images are hard to capture)
            // Ideally we'd capture the active slide or a temporary off-screen one.

            for (let i = 0; i < presentation.slides.length; i++) {
                const slide = presentation.slides[i];
                if (i > 0) doc.addPage([1280, 720], 'landscape');

                doc.setFillColor(15, 23, 42); // slate-900
                doc.rect(0, 0, 1280, 720, 'F');

                doc.setTextColor(255, 255, 255);
                doc.setFontSize(40);
                doc.text(slide.title || "Apresentação", 60, 100);

                doc.setFontSize(24);
                doc.setTextColor(16, 185, 129); // emerald-500
                doc.text(slide.antetitulo || "", 60, 140);

                // Content (strip HTML)
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = slide.content;
                const text = tempDiv.textContent || tempDiv.innerText || "";

                doc.setTextColor(200, 200, 200);
                doc.setFontSize(16);
                const splitText = doc.splitTextToSize(text, 600);
                doc.text(splitText, 60, 200);
            }

            doc.save(`${presentation.title || 'apresentacao'}.pdf`);
            toast.success("PDF gerado com sucesso!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao gerar PDF.");
        } finally {
            setSaving(false);
        }
    };

    const handleExportSingleSlidePDF = async (index: number) => {
        setSaving(true);
        const slide = presentation.slides[index];
        toast.info(`A gerar PDF do slide ${index + 1}...`);

        try {
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [1280, 720]
            });

            doc.setFillColor(15, 23, 42); // slate-900
            doc.rect(0, 0, 1280, 720, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(40);
            doc.text(slide.title || "Apresentação", 60, 100);

            doc.setFontSize(24);
            doc.setTextColor(16, 185, 129); // emerald-500
            doc.text(slide.antetitulo || "", 60, 140);

            // Content (strip HTML)
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = slide.content;
            const text = tempDiv.textContent || tempDiv.innerText || "";

            doc.setTextColor(200, 200, 200);
            doc.setFontSize(16);
            const splitText = doc.splitTextToSize(text, 600);
            doc.text(splitText, 60, 200);

            doc.save(`${presentation.title || 'slide'}_${index + 1}.pdf`);
            toast.success("PDF do slide gerado!");
        } catch (err) {
            console.error(err);
            toast.error("Erro ao gerar PDF do slide.");
        } finally {
            setSaving(false);
        }
    };





    const handleSave = async () => {
        if (!presentation.title) {
            toast.error("A apresentação precisa de um título.");
            return;
        }

        setSaving(true);
        const { data: userData } = await supabase.auth.getUser();

        const payload = {
            title: presentation.title,
            description: presentation.description,
            slides: presentation.slides,
            user_id: userData.user?.id,
            updated_at: new Date().toISOString()
        };

        let res;
        if (isNew) {
            res = await supabase.from('presentations').insert([payload]).select().single();
        } else {
            res = await supabase.from('presentations').update(payload).eq('id', id);
        }

        if (res.error) {
            toast.error("Erro ao guardar: " + res.error.message);
        } else {
            toast.success("Apresentação guardada!");
            if (isNew && res.data) {
                // If backPath is provided, we might want to redirect, but for 'new' we typically replace to the editor with ID.
                // However, the component is mounted with ID 'novo'. 
                // We should probably redirect to the editor with the new ID on the SAME route prefix.
                // Let's assume the router replaces part of the URL or we just reload.
                // Actually, best is to redirect to the edit page with the new ID.
                const currentPath = window.location.pathname;
                const newPath = currentPath.replace('/novo', `/${res.data.id}`);
                router.replace(newPath);
            }
        }
        setSaving(false);
    };

    const activeSlide = presentation.slides[activeIndex] || presentation.slides[0];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (!activeSlide) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50 gap-4">
                <p className="text-slate-500 font-medium">Nenhum slide encontrado.</p>
                <Button onClick={handleAddSlide} className="bg-emerald-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Slide
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
            {/* Header Toolbar */}
            <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-30 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push(backPath)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                        <ArrowLeft className="w-4 h-4 text-slate-600" />
                    </button>
                    <div className="flex items-center gap-3">
                        <h1 className="text-sm font-black text-slate-900 leading-none uppercase tracking-tight truncate max-w-[200px] md:max-w-md m-0 p-0 mb-0">
                            {presentation.title || "Sem Título"}
                        </h1>
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-black uppercase tracking-widest border border-emerald-100">Editor de Apresentações</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={cn(
                            "p-2 rounded-lg transition-all border",
                            isSidebarOpen ? "bg-slate-100 text-slate-900 border-slate-300" : "text-slate-400 border-slate-200 hover:text-slate-600"
                        )}
                        title={isSidebarOpen ? "Esconder Barra Lateral" : "Mostrar Barra Lateral"}
                    >
                        <SidebarIcon className="w-4 h-4" />
                    </button>

                    <div className="h-4 w-px bg-slate-200 mx-2" />

                    {!isNew && (
                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                onClick={() => window.open(`/apresentacao/${id}`, '_blank')}
                                className="bg-white text-slate-600 font-bold border-slate-200 h-9 gap-2 text-xs"
                            >
                                <Play className="w-3.5 h-3.5 fill-slate-600" />
                                Apresentar
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        disabled={saving}
                                        className="bg-white text-emerald-600 font-bold border-emerald-200 hover:bg-emerald-50 h-9 gap-2 text-xs"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Exportar
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={handleExportPDF} className="gap-2 cursor-pointer">
                                        <FileText className="w-4 h-4 text-red-500" />
                                        <span>Exportar para PDF</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black h-9 px-6 rounded-lg shadow-sm gap-2 uppercase tracking-widest text-[10px]"
                    >
                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                        {isNew ? "Criar" : "Guardar"}
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Slide Thumbnails */}
                <aside
                    className={cn(
                        "bg-slate-100 border-r border-slate-200 flex flex-col transition-all duration-300 shadow-inner overflow-hidden",
                        isSidebarOpen ? "w-64" : "w-0 border-none"
                    )}
                >
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50">
                        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Slides</h3>
                        <button
                            onClick={handleAddSlide}
                            className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-md transition-colors"
                            title="Novo Slide"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                        {presentation.slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "relative group cursor-pointer transition-all rounded-lg overflow-hidden border-2",
                                    activeIndex === index
                                        ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/10"
                                        : "border-slate-200 hover:border-slate-300 bg-white"
                                )}
                            >
                                <div className="aspect-video bg-slate-50 relative overflow-hidden flex items-center justify-center">
                                    {slide.image_url ? (
                                        <img src={slide.image_url} alt="" className="w-full h-full object-cover opacity-60" />
                                    ) : (
                                        <div className="p-4 text-center">
                                            <p className="text-[8px] font-bold text-slate-300 uppercase truncate px-2">{slide.title || "Novo Slide"}</p>
                                        </div>
                                    )}
                                    <div className="absolute top-1 left-1 size-5 bg-white/80 rounded flex items-center justify-center text-[10px] font-black text-slate-600 border border-slate-200">
                                        {index + 1}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleMoveSlide(index, 'up'); }}
                                            disabled={index === 0}
                                            className="p-1 bg-white hover:bg-slate-50 text-slate-400 disabled:opacity-30 rounded border shadow-sm"
                                        >
                                            <ChevronUp className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleMoveSlide(index, 'down'); }}
                                            disabled={index === presentation.slides.length - 1}
                                            className="p-1 bg-white hover:bg-slate-50 text-slate-400 disabled:opacity-30 rounded border shadow-sm"
                                        >
                                            <ChevronDown className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDuplicateSlide(index); }}
                                            className="p-1 bg-white hover:bg-emerald-50 text-emerald-600 rounded border shadow-sm"
                                            title="Duplicar Slide"
                                        >
                                            <Copy className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleRemoveSlide(slide.id); }}
                                            className="p-1 bg-white hover:bg-rose-50 text-rose-500 rounded border shadow-sm mt-1"
                                            title="Remover Slide"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-2 bg-white flex items-center">
                                    <p className="text-[9px] font-bold text-slate-600 truncate">{slide.title || `Slide ${index + 1}`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Workspace (Canvas) */}
                <main className="flex-1 overflow-y-auto bg-slate-200 relative p-8 flex flex-col items-center custom-scrollbar">

                    {/* The Active Slide "Canvas" */}
                    <div className="w-full max-w-5xl space-y-8 pb-12">

                        {/* Slide Title Input - Integrated */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Metadados da Apresentação</span>
                                <Monitor className="w-3.5 h-3.5 text-slate-300" />
                            </div>
                            <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                                <div className="space-y-1 flex-1 w-full">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Nome do Projecto</label>
                                    <Input
                                        value={presentation.title}
                                        onChange={(e) => setPresentation({ ...presentation, title: e.target.value })}
                                        placeholder="Nome do Projecto"
                                        className="h-10 text-xl font-black bg-transparent border-none p-0 focus-visible:ring-0 placeholder:text-slate-200"
                                    />
                                </div>
                                <div className="space-y-1 flex-[2] w-full">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Notas / Descrição</label>
                                    <Textarea
                                        value={presentation.description}
                                        onChange={(e) => setPresentation({ ...presentation, description: e.target.value })}
                                        placeholder="Notas da apresentação..."
                                        className="bg-transparent border-none p-0 focus-visible:ring-0 min-h-[40px] resize-none text-sm font-medium text-slate-600 placeholder:text-slate-300 shadow-none ring-0 focus:ring-0"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Current Slide Editor (THE CANVAS) */}
                        <div className="bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col h-auto relative translate-z-0">
                            {/* Slide Canvas Grid Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>

                            <div className="px-8 py-4 bg-emerald-600 text-white flex items-center justify-between shrink-0 z-10">
                                <div className="flex items-center gap-3">
                                    <Layout className="w-4 h-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Editor de Slide #{activeIndex + 1}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleExportSingleSlidePDF(activeIndex)}
                                        className="text-white hover:bg-white/20 h-7 text-[10px] font-bold gap-1.5 uppercase tracking-wider"
                                    >
                                        <Download className="w-3 h-3" />
                                        PDF
                                    </Button>

                                    <div className="w-px h-4 bg-white/20 mx-1" />
                                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">
                                        SL#{String(activeIndex + 1).padStart(3, '0')}{new Date().toLocaleDateString('pt-PT', { month: 'short', year: '2-digit' }).replace('.', '').replace(' ', '')}
                                    </span>
                                </div>
                            </div>

                            <div className="p-10 flex flex-col gap-10 z-10 relative">
                                {/* Header Section: Title/Antetitulo (Left) & Image (Right) */}
                                <div className="flex flex-col md:flex-row gap-10 items-start shrink-0">
                                    <div className="flex-1 space-y-8 w-full">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Antetítulo</label>
                                                <div className="flex bg-white/50 rounded-md border border-slate-200 p-0.5 scale-75 origin-right">
                                                    <button
                                                        onClick={() => updateSlide(activeSlide.id, { antetitulo_align: 'left' })}
                                                        className={cn(
                                                            "p-1 rounded transition-colors",
                                                            (activeSlide?.antetitulo_align || 'center') === 'left' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                                        )}
                                                        title="Alinhar à Esquerda"
                                                    >
                                                        <AlignLeft className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateSlide(activeSlide.id, { antetitulo_align: 'center' })}
                                                        className={cn(
                                                            "p-1 rounded transition-colors",
                                                            (activeSlide?.antetitulo_align || 'center') === 'center' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                                        )}
                                                        title="Centralizar"
                                                    >
                                                        <AlignCenter className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateSlide(activeSlide.id, { antetitulo_align: 'right' })}
                                                        className={cn(
                                                            "p-1 rounded transition-colors",
                                                            activeSlide?.antetitulo_align === 'right' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                                        )}
                                                        title="Alinhar à Direita"
                                                    >
                                                        <AlignRight className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                            <Input
                                                value={activeSlide?.antetitulo || ""}
                                                onChange={(e) => updateSlide(activeSlide.id, { antetitulo: e.target.value })}
                                                placeholder="Digite o Antetítulo..."
                                                className="h-10 text-xl font-bold bg-white/50 border-slate-200 focus:ring-emerald-500 rounded-lg shadow-sm"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Título</label>
                                            <Textarea
                                                value={activeSlide?.title || ""}
                                                onChange={(e) => updateSlide(activeSlide.id, { title: e.target.value })}
                                                placeholder="Digite o Título principal..."
                                                className="min-h-[130px] text-lg font-bold bg-white/50 border-slate-200 focus:ring-emerald-500 rounded-lg shadow-sm resize-none"
                                            />
                                            <div className="flex flex-wrap items-center gap-4 pt-1">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter whitespace-nowrap">Aumentar o tamanho do título</label>
                                                    <div className="flex items-center gap-1">
                                                        <Input
                                                            type="number"
                                                            value={activeSlide?.title_size ?? 52}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                updateSlide(activeSlide.id, { title_size: val === '' ? '' : parseInt(val) });
                                                            }}
                                                            className="w-24 h-7 text-[12px] font-bold bg-white/50 border-slate-200 rounded text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />
                                                        <span className="text-[10px] font-bold text-slate-400 px-1">px</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter whitespace-nowrap">Alinhamento</label>
                                                    <div className="flex bg-white/50 rounded-md border border-slate-200 p-0.5">
                                                        <button
                                                            onClick={() => updateSlide(activeSlide.id, { title_align: 'left' })}
                                                            className={cn(
                                                                "p-1 rounded transition-colors",
                                                                (activeSlide?.title_align || 'center') === 'left' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                                            )}
                                                            title="Alinhar à Esquerda"
                                                        >
                                                            <AlignLeft className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => updateSlide(activeSlide.id, { title_align: 'center' })}
                                                            className={cn(
                                                                "p-1 rounded transition-colors",
                                                                (activeSlide?.title_align || 'center') === 'center' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                                            )}
                                                            title="Centralizar"
                                                        >
                                                            <AlignCenter className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={() => updateSlide(activeSlide.id, { title_align: 'right' })}
                                                            className={cn(
                                                                "p-1 rounded transition-colors",
                                                                activeSlide?.title_align === 'right' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                                            )}
                                                            title="Alinhar à Direita"
                                                        >
                                                            <AlignRight className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Compact Image Selector Top-Right */}
                                    <div className="w-full md:w-80 shrink-0 space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter flex items-center gap-2">
                                            <ImageIcon className="w-3 h-3 text-emerald-500" />
                                            Imagem / Fundo do Slide
                                        </label>
                                        <div className="bg-white rounded-lg border-2 border-dashed border-slate-200 transition-all hover:border-emerald-500 hover:bg-emerald-50/5 shadow-sm group overflow-hidden aspect-video relative">
                                            <ImageUpload
                                                value={activeSlide?.image_url}
                                                onChange={(url) => updateSlide(activeSlide.id, { image_url: url })}
                                                label="Mudar Fundo"
                                                bucket="public-assets"
                                                folder="presentations"
                                                className="border-none bg-transparent rounded-none h-full w-full aspect-video"
                                                imageClassName="object-cover object-center"
                                            />
                                        </div>
                                        {/* Image Positioning Toggle */}
                                        <div className="flex items-center justify-between gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                            <span className="text-[10px] font-black uppercase text-slate-400">Imagem</span>
                                            <div className="flex bg-white rounded-md border border-slate-200 p-0.5">
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateSlide(activeSlide.id, { image_side: 'left', image_disabled: false }); }}
                                                    className={cn(
                                                        "px-3 py-1 text-[9px] font-black uppercase rounded transition-all",
                                                        (activeSlide?.image_side || 'left') === 'left' && !activeSlide?.image_disabled ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                                                    )}
                                                >
                                                    Esquerda
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateSlide(activeSlide.id, { image_side: 'right', image_disabled: false }); }}
                                                    className={cn(
                                                        "px-3 py-1 text-[9px] font-black uppercase rounded transition-all",
                                                        activeSlide?.image_side === 'right' && !activeSlide?.image_disabled ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                                                    )}
                                                >
                                                    Direita
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateSlide(activeSlide.id, { image_side: 'center', image_disabled: false }); }}
                                                    className={cn(
                                                        "px-3 py-1 text-[9px] font-black uppercase rounded transition-all",
                                                        activeSlide?.image_side === 'center' && !activeSlide?.image_disabled ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"
                                                    )}
                                                >
                                                    Centro
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateSlide(activeSlide.id, { image_disabled: true }); }}
                                                    className={cn(
                                                        "px-3 py-1 text-[9px] font-black uppercase rounded transition-all",
                                                        activeSlide?.image_disabled ? "bg-rose-500 text-white shadow-sm" : "text-slate-400 hover:text-rose-500"
                                                    )}
                                                >
                                                    Desactivar
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                {/* Content Section: FULL WIDTH & EXPANDED */}
                                <div className="flex flex-col gap-3 h-auto mb-10">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Conteúdo & Storytelling (Área Expandida)</label>
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">Auto-save activo</span>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl ring-1 ring-slate-950/5 h-auto">
                                        <RichTextEditor
                                            key={activeSlide.id}
                                            value={activeSlide?.content}
                                            onChange={(val) => updateSlide(activeSlide.id, { content: val })}
                                            placeholder="Descreva sua visão para este slide de forma detalhada..."
                                            className="bg-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Layout & Animation Controls */}
                                <div className="grid grid-cols-2 gap-6 bg-slate-50 border border-slate-200 rounded-xl p-6 mb-10">
                                    {/* Image Height Control */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Altura da Imagem</span>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                                {Math.round(((activeSlide?.image_height || 550) - 300) / 5)}%
                                            </span>
                                        </div>
                                        <div className="relative pt-1">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                step="25"
                                                value={((activeSlide?.image_height || 550) - 300) / 5}
                                                onChange={(e) => updateSlide(activeSlide.id, { image_height: 300 + (parseInt(e.target.value) * 5) })}
                                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 transition-all hover:bg-slate-300"
                                            />
                                            <div className="flex justify-between mt-2">
                                                {[0, 25, 50, 75, 100].map((step) => (
                                                    <div key={step} className="flex flex-col items-center gap-1">
                                                        <div className={cn("w-1 h-1 rounded-full", ((activeSlide?.image_height || 550) - 300) / 5 >= step ? "bg-emerald-500" : "bg-slate-300")} />
                                                        <span className="text-[8px] font-bold text-slate-400">{step}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animation Controls */}
                                    <div className="space-y-3">
                                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Animações de Entrada</span>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-slate-500 uppercase">Texto</label>
                                                <select
                                                    value={activeSlide?.animation_text || 'fade-in'}
                                                    onChange={(e) => updateSlide(activeSlide.id, { animation_text: e.target.value })}
                                                    className="w-full h-9 text-[10px] px-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 transition-all"
                                                >
                                                    <option value="none">Sem animação</option>
                                                    <option value="fade-in">Fade In</option>
                                                    <option value="slide-left">Deslizar da Esquerda</option>
                                                    <option value="slide-right">Deslizar da Direita</option>
                                                    <option value="slide-up">Deslizar de Baixo</option>
                                                    <option value="slide-down">Deslizar de Cima</option>
                                                    <option value="zoom-in">Zoom In</option>
                                                    <option value="bounce">Bounce</option>
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-slate-500 uppercase">Imagem</label>
                                                <select
                                                    value={activeSlide?.animation_image || 'fade-in'}
                                                    onChange={(e) => updateSlide(activeSlide.id, { animation_image: e.target.value })}
                                                    className="w-full h-9 text-[10px] px-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 transition-all"
                                                >
                                                    <option value="none">Sem animação</option>
                                                    <option value="fade-in">Fade In</option>
                                                    <option value="slide-left">Deslizar da Esquerda</option>
                                                    <option value="slide-right">Deslizar da Direita</option>
                                                    <option value="slide-up">Deslizar de Baixo</option>
                                                    <option value="slide-down">Deslizar de Cima</option>
                                                    <option value="zoom-in">Zoom In</option>
                                                    <option value="bounce">Bounce</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Call to Action (CTA) Section */}
                            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-100 px-8 pb-6">
                                <div className="space-y-3 col-span-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Texto do Botão (CTA)</label>
                                    <Input
                                        value={activeSlide?.cta_text || ""}
                                        onChange={(e) => updateSlide(activeSlide.id, { cta_text: e.target.value })}
                                        placeholder="Ex: Saiba Mais"
                                        className="font-bold bg-white border-slate-200 focus:ring-emerald-500 rounded-md shadow-sm"
                                    />
                                </div>
                                <div className="space-y-3 col-span-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Link do Botão (URL)</label>
                                    <Input
                                        value={activeSlide?.cta_link || ""}
                                        onChange={(e) => updateSlide(activeSlide.id, { cta_link: e.target.value })}
                                        placeholder="Ex: /sobre-nos"
                                        className="font-bold bg-white border-slate-200 focus:ring-emerald-500 rounded-md shadow-sm"
                                    />
                                </div>
                                <div className="space-y-3 col-span-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Alinhamento do Botão</label>
                                    <div className="flex bg-white/50 rounded-md border border-slate-200 p-1 w-fit">
                                        <button
                                            onClick={() => updateSlide(activeSlide.id, { cta_align: 'left' })}
                                            className={cn(
                                                "px-3 py-1.5 rounded transition-colors text-[10px] font-black uppercase flex items-center gap-1",
                                                (activeSlide?.cta_align || 'center') === 'left' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                            )}
                                        >
                                            <AlignLeft className="w-3 h-3" /> Esq
                                        </button>
                                        <button
                                            onClick={() => updateSlide(activeSlide.id, { cta_align: 'center' })}
                                            className={cn(
                                                "px-3 py-1.5 rounded transition-colors text-[10px] font-black uppercase flex items-center gap-1",
                                                (activeSlide?.cta_align || 'center') === 'center' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                            )}
                                        >
                                            <AlignCenter className="w-3 h-3" /> Centro
                                        </button>
                                        <button
                                            onClick={() => updateSlide(activeSlide.id, { cta_align: 'right' })}
                                            className={cn(
                                                "px-3 py-1.5 rounded transition-colors text-[10px] font-black uppercase flex items-center gap-1",
                                                activeSlide?.cta_align === 'right' ? "bg-emerald-600 text-white" : "text-slate-400 hover:bg-slate-100"
                                            )}
                                        >
                                            <AlignRight className="w-3 h-3" /> Dir
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Shortcut Tip */}
                        <div className="flex justify-center">
                            <div className="px-6 py-3 bg-white/50 backdrop-blur rounded-full border border-slate-200 flex items-center gap-4 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <div className="flex items-center gap-1"><span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">CMD</span> + <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">S</span> PARA SALVAR</div>
                                <div className="w-px h-3 bg-slate-200" />
                                <div className="flex items-center gap-1"><span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">SHIFT</span> + <span className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-600">+</span> NOVO SLIDE</div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
