"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Globe, Mail, MapPin, Phone, Target, Eye, Heart, List, X, Loader2, FileText, Star } from "lucide-react";
import { RichTextEditor } from "../RichTextEditor";
import { MOZ_DATA, SECTORS, VALUE_CHAINS } from "@/lib/agro-data";
import { useRouter } from "next/navigation";

interface CompanyEditorProps {
    initialData?: any;
    isNew?: boolean;
}

export function CompanyEditor({ initialData, isNew = false }: CompanyEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        nuit: initialData?.nuit || "",
        email: initialData?.email || "",
        contact: initialData?.contact || initialData?.phone || "",
        website: initialData?.website || "",
        address: initialData?.address || "",
        province: initialData?.province || "",
        district: initialData?.district || "",
        category: initialData?.category || initialData?.sector || "",
        value_chain: initialData?.value_chain || "",
        logo_url: initialData?.logo_url || "",
        banner_url: initialData?.banner_url || "",
        description: initialData?.description || "",
        mission: initialData?.mission || "",
        vision: initialData?.vision || "",
        values: initialData?.values || "",
        services: Array.isArray(initialData?.services) ? initialData.services : [] as string[],
        is_featured: initialData?.is_featured || false,
    });

    useEffect(() => {
        if (formData.province && !MOZ_DATA[formData.province]?.includes(formData.district)) {
            setFormData(prev => ({ ...prev, district: "" }));
        }
    }, [formData.province]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submissionData = { ...formData };

            let error;
            if (!isNew && initialData?.id) {
                const { error: err } = await supabase
                    .from('companies')
                    .update(submissionData)
                    .eq('id', initialData.id);
                error = err;
            } else {
                const { error: err } = await supabase
                    .from('companies')
                    .insert([submissionData]);
                error = err;
            }

            if (error) throw error;
            router.push('/admin/empresas');
            router.refresh();
        } catch (error: any) {
            alert("Erro ao salvar empresa: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const addService = () => {
        setFormData(prev => ({ ...prev, services: [...prev.services, ""] }));
    };

    const updateService = (index: number, value: string) => {
        const newServices = [...formData.services];
        newServices[index] = value;
        setFormData(prev => ({ ...prev, services: newServices }));
    };

    const removeService = (index: number) => {
        const newServices = formData.services.filter((_: string, i: number) => i !== index);
        setFormData(prev => ({ ...prev, services: newServices }));
    };

    return (
        <div className="bg-white rounded-agro-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-200/50">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-slate-300 rounded-full transition-colors flex-shrink-0"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </button>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <h1 className="text-lg font-black text-slate-800 uppercase tracking-tight whitespace-nowrap">
                            {isNew ? "Nova Empresa" : "Editar Empresa"}
                        </h1>
                        {!isNew && (
                            <>
                                <span className="text-slate-300 font-light flex-shrink-0">|</span>
                                <span className="text-sm font-bold text-emerald-600 uppercase tracking-tight truncate">
                                    Editando: <span className="text-slate-500 font-medium">{initialData?.name}</span>
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all duration-300 border ${formData.is_featured
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60 hover:opacity-100'
                            }`}
                        onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
                    >
                        <Star className={`w-3.5 h-3.5 ${formData.is_featured ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Destacar</span>
                        <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 flex items-center ${formData.is_featured ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                            <div className={`w-3 h-3 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${formData.is_featured ? 'translate-x-4' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-8">

                {/* Basic Info Section */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest border-b border-emerald-100 pb-2 mb-4">Informação Básica</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Nome da Empresa</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: AgroMoz Lda"
                                    className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">NUIT</label>
                            <div className="relative">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={formData.nuit}
                                    onChange={(e) => setFormData({ ...formData, nuit: e.target.value })}
                                    placeholder="Número Unificado de Imposto"
                                    className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Cadeia de Valor</label>
                            <select
                                value={formData.value_chain}
                                onChange={(e) => setFormData({ ...formData, value_chain: e.target.value })}
                                className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                            >
                                <option value="">Selecione...</option>
                                {VALUE_CHAINS.map((vc: string) => <option key={vc} value={vc}>{vc}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Sector de Actividade</label>
                            <div className="relative">
                                <select
                                    value={SECTORS.includes(formData.category) ? formData.category : "Outro"}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setFormData(prev => ({ ...prev, category: val === "Outro" ? "" : val }));
                                    }}
                                    className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                >
                                    <option value="">Selecione...</option>
                                    {SECTORS.map((s: string) => <option key={s} value={s}>{s}</option>)}
                                </select>
                                {((!SECTORS.includes(formData.category) && formData.category !== "") || (!SECTORS.includes(formData.category) && formData.category === "")) && (
                                    <input
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="Especifique o sector..."
                                        className="mt-2 p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                {/* Contact & Location */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest border-b border-emerald-100 pb-2 mb-4">Contactos e Localização</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Telefone</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    placeholder="+258 ..."
                                    className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="email@empresa.com"
                                    className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Província</label>
                            <select
                                value={formData.province}
                                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                            >
                                <option value="">Selecione...</option>
                                {Object.keys(MOZ_DATA).map((p: string) => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Distrito</label>
                            <select
                                value={formData.district}
                                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                disabled={!formData.province}
                                className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full disabled:opacity-50 transition-all"
                            >
                                <option value="">Selecione...</option>
                                {formData.province && MOZ_DATA[formData.province]?.map((d: string) => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Endereço Físico</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="Av., Rua, Nº..."
                                className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Website</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                placeholder="www.empresa.co.mz"
                                className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Branding & Media */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest border-b border-emerald-100 pb-2 mb-4">Mídia e Branding</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">URL do Logo</label>
                            <input
                                value={formData.logo_url}
                                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                placeholder="https://..."
                                className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">URL do Banner</label>
                            <input
                                value={formData.banner_url}
                                onChange={(e) => setFormData({ ...formData, banner_url: e.target.value })}
                                placeholder="https://..."
                                className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Corporate Profile */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest border-b border-emerald-100 pb-2 mb-4">Perfil Corporativo</h3>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Descrição / Quem Somos</label>
                        <RichTextEditor
                            value={formData.description}
                            onChange={(val) => setFormData({ ...formData, description: val })}
                            placeholder="Breve descrição dos serviços..."
                            className="bg-slate-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest flex items-center gap-1">
                                <Target className="w-3 h-3" /> Missão
                            </label>
                            <textarea
                                value={formData.mission}
                                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                                placeholder="Missão da empresa..."
                                className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none h-48 transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest flex items-center gap-1">
                                <Eye className="w-3 h-3" /> Visão
                            </label>
                            <textarea
                                value={formData.vision}
                                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                                placeholder="Visão da empresa..."
                                className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none h-48 transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest flex items-center gap-1">
                                <Heart className="w-3 h-3" /> Valores
                            </label>
                            <textarea
                                value={formData.values}
                                onChange={(e) => setFormData({ ...formData, values: e.target.value })}
                                placeholder="Valores da empresa..."
                                className="p-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none h-48 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Services */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-emerald-100 pb-2 mb-4">
                        <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest">Portfólio de Serviços</h3>
                        <button
                            type="button"
                            onClick={addService}
                            className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full transition-colors"
                        >
                            + Adicionar Serviço
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {formData.services.map((service: string, index: number) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <List className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        value={service}
                                        onChange={(e) => updateService(index, e.target.value)}
                                        placeholder="Descreva o serviço..."
                                        className="pl-10 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeService(index)}
                                    className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {formData.services.length === 0 && (
                            <p className="col-span-full text-center text-slate-400 text-xs italic py-4">
                                Nenhum serviço adicionado.
                            </p>
                        )}
                    </div>
                </div>

                <div className=" pt-8 border-t border-slate-100 flex items-center justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()} className="px-8 h-12 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest">
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="px-10 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isNew ? "Adicionar Empresa" : "Guardar Alterações")}
                    </Button>
                </div>

            </form>
        </div>
    );
}
