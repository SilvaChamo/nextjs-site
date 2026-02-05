"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Save, Loader2, Play, Image as ImageIcon, FileText, ChevronUp, ChevronDown, Layout } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/RichTextEditor";

export default function PresentationEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const isNew = id === "novo";
    const supabase = createClient();
    const router = useRouter();

    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-20">

            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 z-50 bg-slate-100/80 backdrop-blur-md py-4 border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.push('/admin/apresentacoes')} className="p-2 hover:bg-white rounded-full transition-colors border border-slate-200 shadow-sm bg-white">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 leading-none uppercase tracking-tight">
                            {isNew ? "Nova Apresentação" : "Editar Apresentação"}
                        </h1>
                        <p className="text-[10px] text-emerald-600 font-black tracking-widest uppercase mt-1">Editor de Slides Premium</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {!isNew && (
                        <Button
                            variant="outline"
                            onClick={() => window.open(`/apresentacao/${id}`, '_blank')}
                            className="bg-white text-slate-600 font-bold border-slate-200 h-10 gap-2"
                        >
                            <Play className="w-4 h-4 fill-slate-600" />
                            Visualizar
                        </Button>
                    )}
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black h-10 px-8 rounded-xl shadow-lg shadow-emerald-600/20 gap-2 uppercase tracking-widest text-xs"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isNew ? "Criar Apresentação" : "Guardar Alterações"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Main Content (Editor) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Basic Info */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                        <h3 className="text-xs font-black uppercase text-emerald-600 flex items-center gap-2 border-b border-emerald-50 pb-3">
                            <FileText className="w-4 h-4" />
                            Informações Gerais
                        </h3>
                        <div className="space-y-4">
                            <Input
                                value={presentation.title}
                                onChange={(e) => setPresentation({ ...presentation, title: e.target.value })}
                                placeholder="Título da Apresentação"
                                className="h-14 text-xl font-black bg-slate-50 border-slate-100 rounded-2xl focus:ring-emerald-500"
                            />
                            <Textarea
                                value={presentation.description}
                                onChange={(e) => setPresentation({ ...presentation, description: e.target.value })}
                                placeholder="Breve descrição da apresentação (opcional)..."
                                className="bg-slate-50 border-slate-100 rounded-2xl min-h-[100px] resize-none"
                            />
                        </div>
                    </div>

                    {/* Slides Management */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Slides da Apresentação</h3>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={handleSave}
                                    disabled={saving}
                                    variant="outline"
                                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold h-10 rounded-full gap-2 px-6"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Salvar Alterações
                                </Button>
                                <Button
                                    onClick={handleAddSlide}
                                    className="bg-slate-900 hover:bg-black text-white font-bold h-10 rounded-full gap-2 px-6"
                                >
                                    <Plus className="w-4 h-4" />
                                    Adicionar Slide
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {presentation.slides.map((slide, index) => (
                                <div key={slide.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
                                    <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                                                {index + 1}
                                            </div>
                                            <span className="font-black text-xs uppercase text-slate-400 tracking-widest">
                                                {index === 0 ? "Slide de Capa" : "Slide de Conteúdo"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleMoveSlide(index, 'up')} className="p-2 hover:bg-white rounded-full border border-slate-200 text-slate-400 hover:text-emerald-600 disabled:opacity-30" disabled={index === 0}>
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleMoveSlide(index, 'down')} className="p-2 hover:bg-white rounded-full border border-slate-200 text-slate-400 hover:text-emerald-600 disabled:opacity-30" disabled={index === presentation.slides.length - 1}>
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleRemoveSlide(slide.id)} className="p-2 hover:bg-rose-50 rounded-full border border-slate-200 text-slate-400 hover:text-rose-600 ml-2">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2 space-y-6">
                                            <Input
                                                value={slide.title}
                                                onChange={(e) => updateSlide(slide.id, { title: e.target.value })}
                                                placeholder="Título do Slide"
                                                className="h-12 font-bold text-lg bg-slate-50 border-slate-100 rounded-xl"
                                            />
                                            <RichTextEditor
                                                value={slide.content}
                                                onChange={(val) => updateSlide(slide.id, { content: val })}
                                                placeholder="Escreva o conteúdo deste slide..."
                                                className="bg-slate-50 rounded-xl border-slate-100 min-h-[200px]"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                                                <ImageUpload
                                                    value={slide.image_url}
                                                    onChange={(url) => updateSlide(slide.id, { image_url: url })}
                                                    label="Imagem de Fundo"
                                                    bucket="public-assets"
                                                    folder="presentations"
                                                />
                                            </div>
                                            <div className="bg-amber-50 rounded-2xl p-4 flex gap-3 text-[10px] text-amber-700 font-medium">
                                                <ImageIcon className="w-4 h-4 shrink-0" />
                                                <span>A imagem será exibida como fundo com opacidade reduzida para garantir a leitura.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar (Small Preview / Quick Stats) */}
                <div className="space-y-6 sticky top-24">
                    <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <Layout className="w-6 h-6 text-emerald-500" />
                            <h3 className="font-black uppercase tracking-widest text-sm">Estrutura</h3>
                        </div>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {presentation.slides.map((s, i) => (
                                <div key={s.id} className="flex items-center gap-4 group">
                                    <span className="text-xs font-black text-slate-600 w-4">{i + 1}</span>
                                    <div className={`flex-1 p-3 rounded-xl border transition-all cursor-pointer ${i === 0 ? 'bg-emerald-600/20 border-emerald-500/30' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                        <p className="text-[10px] font-bold line-clamp-1">{s.title || "Sem título"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10 text-center">
                            <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Total de {presentation.slides.length} Slides</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-4 tracking-widest">Dica de mestre</p>
                        <p className="text-sm text-slate-600 leading-relaxed italic">
                            "Use pouco texto em cada slide. Deixe que as imagens e as manchetes contem a história."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
