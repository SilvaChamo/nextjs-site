"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2, AlertCircle, X, Image as ImageIcon } from "lucide-react";

interface AdminFormProps {
    onClose: () => void;
    onSuccess: () => void;
    initialData?: any;
}

export function ArticleForm({ onClose, onSuccess, initialData }: AdminFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        content: initialData?.content || "",
        author: initialData?.author || "",
        category: initialData?.category || "Agricultura",
        image_url: initialData?.image_url || "",
        date: initialData?.date || new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' }),
        slug: initialData?.slug || "",
        is_featured: initialData?.is_featured || false
    });

    const categories = ["Agricultura", "Tecnologia", "Mercado", "Pecuária", "Sustentabilidade"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const slug = formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            const payload = { ...formData, slug };

            let error;
            if (initialData?.id) {
                const { error: err } = await supabase
                    .from('articles')
                    .update(payload)
                    .eq('id', initialData.id);
                error = err;
            } else {
                const { error: err } = await supabase
                    .from('articles')
                    .insert([payload]);
                error = err;
            }

            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error: any) {
            alert("Erro ao salvar artigo: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">
                            {initialData ? "Editar Artigo" : "Novo Artigo"}
                        </h2>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Publicação Editorial</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Título do Artigo</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ex: O Futuro da Rega em Manica"
                                    className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Autor</label>
                                    <input
                                        required
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        placeholder="Nome do autor"
                                        className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Categoria</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                                    >
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-black uppercase text-slate-500 tracking-widest">URL da Imagem de Capa</label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        placeholder="https://images.unsplash.com/..."
                                        className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.is_featured}
                                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                    className="size-5 rounded border-emerald-200 text-emerald-600 focus:ring-emerald-500"
                                />
                                <label htmlFor="featured" className="text-xs font-black uppercase text-emerald-800 tracking-widest cursor-pointer select-none">
                                    Destacar na Página Inicial
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 h-full">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Conteúdo do Artigo</label>
                            <textarea
                                required
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Escreva o conteúdo aqui... (Suporta texto simples ou HTML básico)"
                                className="flex-1 p-6 bg-slate-50 border-none rounded-3xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none resize-none min-h-[300px]"
                            />
                        </div>
                    </div>
                </form>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-8 h-12 rounded-xl text-xs font-black uppercase tracking-widest border-slate-200 text-slate-500 hover:bg-white"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-10 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-900/10"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (initialData ? "Actualizar Artigo" : "Publicar Artigo")}
                    </Button>
                </div>
            </div>
        </div>
    );
}
