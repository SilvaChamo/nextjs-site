"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
    Loader2, X, GraduationCap, Calendar, Clock,
    MapPin, Users, DollarSign, Plus, Trash2,
    CheckCircle, Notebook, Info
} from "lucide-react";

interface TrainingFormProps {
    onClose?: () => void;
    onSuccess: () => void;
    initialData?: any;
    isPage?: boolean;
}

export function TrainingForm({ onClose, onSuccess, initialData, isPage = false }: TrainingFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        category: initialData?.category || "Tecnologia",
        description: initialData?.description || "",
        date: initialData?.date || "",
        duration: initialData?.duration || "",
        location: initialData?.location || "",
        venue: initialData?.venue || "",
        price: initialData?.price || "",
        spots_total: initialData?.spots_total || 20,
        spots_available: initialData?.spots_available || initialData?.spots_total || 20,
        instructor: {
            name: initialData?.instructor?.name || "",
            title: initialData?.instructor?.title || "",
            bio: initialData?.instructor?.bio || "",
            image: initialData?.instructor?.image || ""
        },
        topics: initialData?.topics || [""],
        requirements: initialData?.requirements || [""],
        includes: initialData?.includes || [""]
    });

    const categories = ["Tecnologia", "Gestão", "Marketing", "Produção", "Financeiro"];

    const handleListChange = (list: "topics" | "requirements" | "includes", index: number, value: string) => {
        const newList = [...formData[list]];
        newList[index] = value;
        setFormData({ ...formData, [list]: newList });
    };

    const addListItem = (list: "topics" | "requirements" | "includes") => {
        setFormData({ ...formData, [list]: [...formData[list], ""] });
    };

    const removeListItem = (list: "topics" | "requirements" | "includes", index: number) => {
        const newList = formData[list].filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, [list]: newList });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Filter out empty items from lists
            const payload = {
                ...formData,
                topics: (formData.topics as string[]).filter(t => t.trim() !== ""),
                requirements: (formData.requirements as string[]).filter(r => r.trim() !== ""),
                includes: (formData.includes as string[]).filter(i => i.trim() !== ""),
                spots_total: parseInt(formData.spots_total.toString()),
                spots_available: parseInt(formData.spots_available.toString())
            };

            let error;
            if (initialData?.id) {
                const { error: err } = await supabase
                    .from('trainings')
                    .update(payload)
                    .eq('id', initialData.id);
                error = err;
            } else {
                const { error: err } = await supabase
                    .from('trainings')
                    .insert([payload]);
                error = err;
            }

            if (error) throw error;
            onSuccess();
            if (onClose) onClose();
        } catch (error: any) {
            console.error(error);
            alert("Erro ao salvar formação: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const content = (
        <div className={`${isPage ? '' : 'bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col'}`}>
            {!isPage && (
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-black text-slate-800 tracking-tight">
                            {initialData ? "Editar Formação" : "Cadastrar Nova Formação"}
                        </h2>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Capacitação & Desenvolvimento</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className={`${isPage ? 'space-y-[15px]' : 'flex-1 overflow-y-auto p-8 space-y-10'}`}>
                {/* Section 1: General Info */}
                <section className="space-y-[15px]">
                    <div className="flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
                        <Info className="w-5 h-5 text-emerald-500" />
                        <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">Informações Básicas</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Título da Formação</label>
                            <input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="px-4 py-4 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full transition-all"
                                placeholder="Ex: Gestão de Culturas"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Categoria</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="px-4 py-4 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full appearance-none transition-all"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Descrição Geral</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="p-4 bg-white border border-slate-200 rounded-[15px] text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none h-24 resize-none transition-all"
                            placeholder="Descreva os objetivos da formação..."
                        />
                    </div>
                </section>

                {/* Section 2: Logistics */}
                <section className="space-y-[15px]">
                    <div className="flex items-center gap-2 border-l-4 border-blue-500 pl-3">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">Logística e Datas</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-[15px]">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Data Inicial</label>
                            <input
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="15-17 Fev 2025"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Duração</label>
                            <input
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="3 dias"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Preço Individual</label>
                            <input
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="15.000 MT"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Local (Cidade/Província)</label>
                            <input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Maputo, Moçambique"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Vagas Totais</label>
                            <input
                                type="number"
                                value={formData.spots_total}
                                onChange={(e) => setFormData({ ...formData, spots_total: parseInt(e.target.value) })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Localização Exacta (Venue)</label>
                        <input
                            value={formData.venue}
                            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                            className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Auditório da Base Agro Data, 3º Andar"
                        />
                    </div>
                </section>

                {/* Section 3: Instructor */}
                <section className="space-y-[15px]">
                    <div className="flex items-center gap-2 border-l-4 border-purple-500 pl-3">
                        <Users className="w-5 h-5 text-purple-500" />
                        <h3 className="text-sm font-black uppercase text-slate-800 tracking-wider">Formador / Instrutor</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px]">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Nome do Formador</label>
                            <input
                                value={formData.instructor.name}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    instructor: { ...formData.instructor, name: e.target.value }
                                })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Título Profissional</label>
                            <input
                                value={formData.instructor.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    instructor: { ...formData.instructor, title: e.target.value }
                                })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                placeholder="Eng. Agrónomo / Consultor"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-[15px]">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">URL da Foto</label>
                            <input
                                value={formData.instructor.image}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    instructor: { ...formData.instructor, image: e.target.value }
                                })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                placeholder="https://"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Mini Bio</label>
                            <textarea
                                value={formData.instructor.bio}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    instructor: { ...formData.instructor, bio: e.target.value }
                                })}
                                className="px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-medium focus:ring-2 focus:ring-purple-500 outline-none h-20 resize-none transition-all"
                            />
                        </div>
                    </div>
                </section>

                {/* Section 4: Dynamic Lists */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                    {/* Topics */}
                    <div className="space-y-[15px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Notebook className="w-4 h-4 text-[#f97316]" />
                                <h4 className="text-xs font-black uppercase text-slate-800">Tópicos (Programa)</h4>
                            </div>
                            <button type="button" onClick={() => addListItem("topics")} className="p-1.5 bg-orange-50 text-[#f97316] rounded-lg hover:bg-orange-100 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-[10px]">
                            {formData.topics.map((topic: string, i: number) => (
                                <div key={i} className="flex gap-[15px]">
                                    <input
                                        value={topic}
                                        onChange={(e) => handleListChange("topics", i, e.target.value)}
                                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold shadow-sm"
                                        placeholder="Novo tópico..."
                                    />
                                    {formData.topics.length > 1 && (
                                        <button type="button" onClick={() => removeListItem("topics", i)} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Includes */}
                    <div className="space-y-[15px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <h4 className="text-xs font-black uppercase text-slate-800">O que está incluído</h4>
                            </div>
                            <button type="button" onClick={() => addListItem("includes")} className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg hover:bg-emerald-100 transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-[15px]">
                            {formData.includes.map((item: string, i: number) => (
                                <div key={i} className="flex gap-[15px]">
                                    <input
                                        value={item}
                                        onChange={(e) => handleListChange("includes", i, e.target.value)}
                                        className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-[15px] text-sm font-bold shadow-sm"
                                        placeholder="Ex: Certificado"
                                    />
                                    {formData.includes.length > 1 && (
                                        <button type="button" onClick={() => removeListItem("includes", i)} className="p-2.5 text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className={`mt-10 flex items-center justify-end gap-3 ${isPage ? 'pt-6 border-t border-slate-100' : ''}`}>
                    <Button variant="outline" onClick={onClose} className="px-8 h-12 rounded-[12px] text-xs font-black text-slate-500 uppercase tracking-widest">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="px-10 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[12px] text-xs font-black uppercase tracking-widest shadow-lg"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (initialData ? "Guardar Alterações" : "Adicionar Formação")}
                    </Button>
                </div>
            </form>
        </div>
    );

    if (isPage) return content;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            {content}
        </div>
    );
}
