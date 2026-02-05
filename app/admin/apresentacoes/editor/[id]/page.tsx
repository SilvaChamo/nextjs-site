"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Save, Loader2, Play, Image as ImageIcon, FileText, ChevronUp, ChevronDown, Layout, Sidebar as SidebarIcon, Menu, Maximize2, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/RichTextEditor";
import { cn } from "@/lib/utils";

export default function PresentationEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
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
            { id: crypto.randomUUID(), title: "Título do Slide", content: "Conteúdo aqui...", image_url: "" }
        ]
    });

    useEffect(() => {
        if (!isNew) fetchPresentation();
    }, [id]);

    const fetchPresentation = async () => {
        const { data, error } = await supabase
            .from('presentations')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setPresentation({
                title: data.title,
                description: data.description || "",
                slides: data.slides || []
            });
        }
        setLoading(false);
    };

    const handleAddSlide = () => {
        setPresentation(prev => ({
            ...prev,
            slides: [...prev.slides, { id: crypto.randomUUID(), title: "Novo Slide", content: "", image_url: "" }]
        }));
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
                router.replace(`/admin/apresentacoes/editor/${res.data.id}`);
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

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] -m-8 overflow-hidden bg-slate-50">
            {/* Header Toolbar */}
            <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-30 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/admin/apresentacoes')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
                        <ArrowLeft className="w-4 h-4 text-slate-600" />
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-sm font-black text-slate-900 leading-none uppercase tracking-tight truncate max-w-[200px] md:max-w-md">
                            {presentation.title || "Sem Título"}
                        </h1>
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-0.5">Editor de Apresentações</span>
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
                        <Button
                            variant="outline"
                            onClick={() => window.open(`/apresentacao/${id}`, '_blank')}
                            className="bg-white text-slate-600 font-bold border-slate-200 h-9 gap-2 text-xs"
                        >
                            <Play className="w-3.5 h-3.5 fill-slate-600" />
                            Apresentar
                        </Button>
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
                                            <p className="text-[8px] font-bold text-slate-300 uppercase truncate px-2">{slide.title || "Slide sem título"}</p>
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
                                            onClick={(e) => { e.stopPropagation(); handleRemoveSlide(slide.id); }}
                                            className="p-1 bg-white hover:bg-rose-50 text-rose-500 rounded border shadow-sm mt-1"
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
                            <div className="p-6 space-y-4">
                                <Input
                                    value={presentation.title}
                                    onChange={(e) => setPresentation({ ...presentation, title: e.target.value })}
                                    placeholder="Nome do Projecto"
                                    className="h-12 text-lg font-black bg-white border-slate-200 rounded-lg focus:ring-emerald-500"
                                />
                                <Textarea
                                    value={presentation.description}
                                    onChange={(e) => setPresentation({ ...presentation, description: e.target.value })}
                                    placeholder="Notas da apresentação..."
                                    className="bg-white border-slate-200 rounded-lg min-h-[60px] resize-none text-xs"
                                />
                            </div>
                        </div>

                        {/* Current Slide Editor (THE CANVAS) */}
                        <div className="bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col min-h-[600px] relative translate-z-0">
                            {/* Slide Canvas Grid Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none"></div>

                            <div className="px-8 py-4 bg-emerald-600 text-white flex items-center justify-between shrink-0 z-10">
                                <div className="flex items-center gap-3">
                                    <Layout className="w-4 h-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Editor de Slide #{activeIndex + 1}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">{activeSlide?.id.split('-')[0]}</span>
                                </div>
                            </div>

                            <div className="flex-1 p-10 flex flex-col gap-8 z-10 relative">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Título do Slide</label>
                                    <Input
                                        value={activeSlide?.title}
                                        onChange={(e) => updateSlide(activeSlide.id, { title: e.target.value })}
                                        placeholder="Digita o título impactante aqui..."
                                        className="h-16 text-3xl font-black bg-transparent border-none p-0 focus-visible:ring-0 placeholder:text-slate-200"
                                    />
                                    <div className="h-1 w-20 bg-emerald-500 rounded-full" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 flex-1">
                                    <div className="md:col-span-2 flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Conteúdo & Storytelling</label>
                                        <div className="flex-1 bg-slate-50/50 rounded-xl border border-slate-100 overflow-hidden shadow-inner min-h-[300px]">
                                            <RichTextEditor
                                                value={activeSlide?.content}
                                                onChange={(val) => updateSlide(activeSlide.id, { content: val })}
                                                placeholder="Descreva sua visão para este slide..."
                                                className="bg-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">Imagem / Fundo</label>
                                            <div className="bg-white rounded-xl border-2 border-dashed border-slate-200 p-4 transition-all hover:border-emerald-500 hover:bg-emerald-50/10">
                                                <ImageUpload
                                                    value={activeSlide?.image_url}
                                                    onChange={(url) => updateSlide(activeSlide.id, { image_url: url })}
                                                    label="Solte uma imagem"
                                                    bucket="public-assets"
                                                    folder="presentations"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2">
                                            <div className="flex items-center gap-2 text-emerald-700 font-bold text-[10px] uppercase">
                                                <ImageIcon className="w-3.5 h-3.5" />
                                                <span>Fundo Dinâmico</span>
                                            </div>
                                            <p className="text-[10px] text-emerald-600/80 leading-relaxed font-medium">
                                                A imagem será adaptada automaticamente como plano de fundo com contraste inteligente.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Canvas Toolbar / Status */}
                            <div className="bg-slate-50 border-t border-slate-100 px-8 py-3 flex items-center justify-between text-[10px] font-bold text-slate-400 shrink-0">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1.5"><Maximize2 className="w-3 h-3" /> 1920x1080 Aspect</span>
                                    <span className="flex items-center gap-1.5"><Menu className="w-3 h-3" /> Layer Principal</span>
                                </div>
                                <span>Edição em Tempo Real Activa</span>
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
