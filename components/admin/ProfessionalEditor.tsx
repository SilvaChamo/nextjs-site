"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Loader2, User, Briefcase, Award, MapPin, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfessionalEditorProps {
    initialData?: any;
    isNew?: boolean;
}

export function ProfessionalEditor({ initialData, isNew = false }: ProfessionalEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        specialty: initialData?.specialty || "Agrónomo",
        location: initialData?.location || "",
        bio: initialData?.bio || "",
        experience: initialData?.experience || "",
        photo_url: initialData?.photo_url || ""
    });

    const specialties = ["Agrónomo", "Veterinário", "Engenheiro Rural", "Consultor Agrícola", "Gestor de Projectos", "Especialista em Rega"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let error;
            if (!isNew && initialData?.id) {
                const { error: err } = await supabase
                    .from('professionals')
                    .update(formData)
                    .eq('id', initialData.id);
                error = err;
            } else {
                const { error: err } = await supabase
                    .from('professionals')
                    .insert([formData]);
                error = err;
            }

            if (error) throw error;
            router.push('/admin/profissionais');
            router.refresh();
        } catch (error: any) {
            alert("Erro ao salvar profissional: " + error.message);
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
                            {isNew ? "Registar Profissional" : "Editar Profissional"}
                        </h2>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recursos Humanos & Consultoria</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Nome Completo</label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Nome do Profissional"
                            className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Especialidade</label>
                        <div className="relative">
                            <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <select
                                value={formData.specialty}
                                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full appearance-none"
                            >
                                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Localização</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Cidade, Província"
                                className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Anos de Experiência</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            placeholder="Ex: 5 anos de experiência em Manica"
                            className="pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">URL da Fotografia</label>
                    <input
                        value={formData.photo_url}
                        onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                        placeholder="https://..."
                        className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none w-full"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Resumo Biográfico</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Breve descrição do percurso profissional..."
                        className="p-4 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none resize-none h-32"
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
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isNew ? "Adicionar Profissional" : "Guardar Alterações")}
                    </Button>
                </div>
            </form>
        </div>
    );
}
