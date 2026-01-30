"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Tag, Ruler, Coins, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PropertyEditorProps {
    initialData?: any;
    isNew?: boolean;
}

export function PropertyEditor({ initialData, isNew = false }: PropertyEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        type: initialData?.type || "Fazenda",
        location: initialData?.location || "",
        price: initialData?.price || "",
        size: initialData?.size || "",
        status: initialData?.status || "Venda",
        ownership_type: initialData?.ownership_type || "Privada",
        description: initialData?.description || "",
        image_url: initialData?.image_url || "",
    });

    const types = ["Fazenda", "Terreno", "Armazém", "Agro-Indústria", "Outro"];
    const statuses = ["Venda", "Arrendamento", "Parceria"];
    const ownershipTypes = ["Publica", "Privada", "Particular"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let error;
            const dataToSave = {
                ...formData,
                price: formData.price ? parseFloat(formData.price.toString().replace(/[^0-9.]/g, '')) : null
            };

            if (!isNew && initialData?.id) {
                const { error: err } = await supabase
                    .from('properties')
                    .update(dataToSave)
                    .eq('id', initialData.id);
                error = err;
            } else {
                const { error: err } = await supabase
                    .from('properties')
                    .insert([dataToSave]);
                error = err;
            }

            if (error) throw error;
            // Redirect to the properties list (which might be /admin/empresas?view=properties or /admin/propriedades once I make it)
            // For now, I'll assume I'm making a dedicated list page or redirecting to the shared one.
            // Since I plan to make /admin/propriedades/page.tsx, I'll redirect there.
            router.push('/admin/propriedades');
            router.refresh();
        } catch (error: any) {
            alert("Erro ao salvar propriedade: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </button>
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">
                            {isNew ? "Adicionar Propriedade" : "Editar Propriedade"}
                        </h2>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Gestão de Activos</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Título</label>
                    <div className="relative">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Ex: Fazenda no Chókwè"
                            className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Tipo</label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                        >
                            {types.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Localização</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Distrito, Província"
                                className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Estado</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                        >
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Propriedade</label>
                        <select
                            value={formData.ownership_type}
                            onChange={(e) => setFormData({ ...formData, ownership_type: e.target.value })}
                            className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                        >
                            {ownershipTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Tamanho</label>
                        <div className="relative">
                            <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                value={formData.size}
                                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                placeholder="Ex: 50 hectares"
                                className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Preço (MT)</label>
                    <div className="relative">
                        <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="0.00"
                            className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">URL da Imagem</label>
                    <input
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://..."
                        className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Descrição</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detalhes sobre a propriedade..."
                        className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-24"
                    />
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()} className="px-8 h-12 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="px-10 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isNew ? "Adicionar Propriedade" : "Guardar Alterações")}
                    </Button>
                </div>
            </form>
        </div>
    );
}
