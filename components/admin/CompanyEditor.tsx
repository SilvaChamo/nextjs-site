"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Globe, Mail, MapPin, Phone, Target, Eye, Heart, List, X, Loader2, FileText, Star, ShoppingBag, Plus, Trash2, ChevronDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "../RichTextEditor";
import { MOZ_DATA, SECTORS, VALUE_CHAINS } from "@/lib/agro-data";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./ImageUpload";
import { toSentenceCase } from "@/lib/utils";

interface CompanyEditorProps {
    initialData?: any;
    isNew?: boolean;
}

export function CompanyEditor({ initialData, isNew = false }: CompanyEditorProps) {
    const supabase = createClient();
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
        activity: initialData?.activity || "",
        secondary_contact: initialData?.secondary_contact || "",
        is_featured: initialData?.is_featured || false,
    });

    // Products State
    const [products, setProducts] = useState<any[]>([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", image_url: "", description: "", is_available: true });
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [productLoading, setProductLoading] = useState(false);

    useEffect(() => {
        if (initialData?.id) {
            fetchProducts();
        }
    }, [initialData?.id]);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('company_id', initialData.id)
            .order('created_at', { ascending: false });

        if (data) setProducts(data);
    };

    const handleAddProduct = async () => {
        if (!newProduct.name) {
            alert("Por favor, preencha o nome do produto.");
            return;
        }
        if (!initialData?.id) {
            alert("Erro: ID da empresa não encontrado. Recarregue a página.");
            return;
        }
        setProductLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert("Erro: Sessão de utilizador não encontrada. Por favor, recarregue a página.");
                return;
            }

            const { error } = await supabase.from('products').insert([{
                company_id: initialData.id,
                user_id: user.id,
                name: newProduct.name,
                price: parseFloat(newProduct.price) || 0,
                category: newProduct.category,
                image_url: newProduct.image_url,
                description: newProduct.description,
                is_available: newProduct.is_available
            }]);

            if (error) {
                console.error("Erro Supabase:", error);
                throw error;
            }

            setNewProduct({ name: "", price: "", category: "", image_url: "", description: "", is_available: true });
            setIsAddingProduct(false);
            fetchProducts();
        } catch (err: any) {
            alert("Erro ao adicionar produto: " + (err.message || err.details || "Erro desconhecido"));
        } finally {
            setProductLoading(false);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm("Tem a certeza que deseja eliminar este produto?")) return;

        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) fetchProducts();
    };

    useEffect(() => {
        if (formData.province && !MOZ_DATA[formData.province]?.includes(formData.district)) {
            setFormData(prev => ({ ...prev, district: "" }));
        }
    }, [formData.province]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get current user to ensure RLS compliance
            const { data: { user } } = await supabase.auth.getUser();

            // Base data without user_id
            const baseData = { ...formData };

            let error;
            if (!isNew && initialData?.id) {
                // UPDATE: Do not overwrite user_id to preserve ownership (e.g. Admin editing User's company)
                const { error: err } = await supabase
                    .from('companies')
                    .update(baseData)
                    .eq('id', initialData.id);
                error = err;
            } else {
                const submissionData = {
                    ...baseData,
                    user_id: null
                };

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
            <div className="px-6 py-8 border-b border-slate-200 flex items-center justify-between bg-slate-300/40 transition-all">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-slate-300 rounded-full transition-colors flex-shrink-0 flex items-center justify-center"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-500" />
                    </button>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <h1 className="text-lg font-black text-slate-800 uppercase tracking-tight whitespace-nowrap leading-none m-0 p-0">
                            {isNew ? "Nova Empresa" : "Editar Empresa"}
                        </h1>
                        {!isNew && (
                            <div className="flex items-center gap-3">
                                <span className="text-slate-300 font-light flex-shrink-0 text-xl leading-none">|</span>
                                <div className="text-sm font-black uppercase tracking-tight truncate flex items-center gap-1.5 leading-none m-0 p-0">
                                    <span className="text-emerald-600">Editando:</span>
                                    <span className="text-slate-500 font-bold">{initialData?.name}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                    <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border shadow-sm ${formData.is_featured
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-white border-slate-200 text-slate-400 opacity-60 hover:opacity-100'
                            }`}
                        onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
                    >
                        <Star className={`w-3.5 h-3.5 ${formData.is_featured ? 'fill-emerald-500 text-emerald-500' : ''}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Destacar</span>
                        <div className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 flex items-center ${formData.is_featured ? 'bg-emerald-600' : 'bg-slate-300'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${formData.is_featured ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 p-8 space-y-20">

                {/* Branding & Media Section - NOW FIRST */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest border-b border-emerald-100 pb-2 mb-4">Mídia e Branding</h3>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-[180px] shrink-0 flex flex-col">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Logo</label>
                            <div className="h-[180px] md:flex-1">
                                <ImageUpload
                                    label="Logo"
                                    value={formData.logo_url}
                                    onChange={(url) => setFormData({ ...formData, logo_url: url })}
                                    recommendedSize="400x400"
                                    aspectRatio="square"
                                    bucket="public-assets"
                                    folder="logos"
                                    showRecommendedBadge={false}
                                    className="h-full w-full"
                                    useBackgroundImage={true}
                                    backgroundSize="contain"
                                />
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Banner (Capa)</label>
                            <div className="h-[180px] md:flex-1">
                                <ImageUpload
                                    label="Banner (Capa)"
                                    value={formData.banner_url}
                                    onChange={(url) => setFormData({ ...formData, banner_url: url })}
                                    recommendedSize="1200x400"
                                    bucket="public-assets"
                                    folder="banners"
                                    imageClassName="object-cover w-full h-full"
                                    showRecommendedBadge={false}
                                    className="h-full w-full aspect-auto"
                                    useBackgroundImage={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Basic Info Section */}
                <div className="space-y-4 pt-5">
                    <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest border-b border-emerald-100 pb-2 mb-4">Informação Básica</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-1 flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Nome da Empresa</label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: toSentenceCase(e.target.value) })}
                                    placeholder="Ex: AgroMoz Lda"
                                    className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Actividade Principal</label>
                            <div className="relative">
                                <List className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={formData.activity}
                                    onChange={(e) => setFormData({ ...formData, activity: toSentenceCase(e.target.value) })}
                                    placeholder="Ex: Comercialização e Distribuição de Insumos"
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
                                    value={formData.category}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setFormData(prev => ({ ...prev, category: val }));
                                    }}
                                    className="p-4 bg-slate-100 border-2 border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                >
                                    <option value="">Selecione o Sector...</option>
                                    {SECTORS.map((s: string) => <option key={s} value={s}>{s}</option>)}
                                    {formData.category && !SECTORS.includes(formData.category) && (
                                        <option value={formData.category}>{formData.category}</option>
                                    )}
                                    {/* Removed redundant input and 'Outro' logic to simplify UI as requested */}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1 flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Contacto</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    placeholder="+258..."
                                    className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-1 flex flex-col gap-2">
                            <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Número Alternativo</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    value={formData.secondary_contact}
                                    onChange={(e) => setFormData({ ...formData, secondary_contact: e.target.value })}
                                    placeholder="+258..."
                                    className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-2">
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
                </div>


                {/* Contact & Location */}
                <div className="space-y-4">
                    <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest border-b border-emerald-100 pb-2 mb-4">Contactos e Localização</h3>

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
                                onChange={(e) => setFormData({ ...formData, address: toSentenceCase(e.target.value) })}
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
                                onChange={(e) => setFormData({ ...formData, website: toSentenceCase(e.target.value) })}
                                placeholder="www.empresa.co.mz"
                                className="pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-agro-btn text-sm font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-full transition-all"
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
                                onChange={(e) => setFormData({ ...formData, mission: toSentenceCase(e.target.value) })}
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
                                onChange={(e) => setFormData({ ...formData, vision: toSentenceCase(e.target.value) })}
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
                                onChange={(e) => setFormData({ ...formData, values: toSentenceCase(e.target.value) })}
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

                {/* Products Section - Only available for existing companies */}
                {!isNew && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-emerald-100 pb-2 mb-4">
                            <h3 className="text-xs font-black uppercase text-emerald-600 tracking-widest">Produtos e Serviços Premium</h3>
                            <button
                                type="button"
                                onClick={() => setIsAddingProduct(true)}
                                className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                            >
                                <Plus className="w-3 h-3" /> Adicionar Produto
                            </button>
                        </div>

                        {/* Add Product Form */}
                        {isAddingProduct && (
                            <div className="bg-slate-50 border border-emerald-100/50 rounded-lg p-6 mb-4 animate-in fade-in slide-in-from-top-2 shadow-sm">
                                <h4 className="text-xs font-bold text-emerald-600 mb-6 uppercase flex items-center gap-2 tracking-widest border-b border-emerald-100 pb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    Novo Produto
                                </h4>

                                <div className="flex flex-col md:flex-row gap-6 mb-6">
                                    {/* Left Side: Image */}
                                    <div className="w-full md:w-48 shrink-0">
                                        <ImageUpload
                                            label="Foto"
                                            value={newProduct.image_url}
                                            onChange={(url) => setNewProduct({ ...newProduct, image_url: url })}
                                            recommendedSize="400x400"
                                            aspectRatio="square"
                                            bucket="public-assets"
                                            folder="products"
                                            imageClassName="w-full h-full rounded-lg object-cover bg-white shadow-sm border border-slate-100"
                                            showRecommendedBadge={false}
                                        />
                                    </div>

                                    {/* Right Side: Inputs */}
                                    <div className="flex-1 space-y-4">
                                        <input
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: toSentenceCase(e.target.value) })}
                                            placeholder="Nome do Produto e Marca (Ex: Sementes de Milho Híbrido Pannar)"
                                            className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-bold w-full outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm placeholder:text-slate-400 placeholder:font-normal"
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input
                                                type="number"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                placeholder="Preço (MZN)"
                                                className="px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium w-full outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm placeholder:text-slate-400 placeholder:font-normal"
                                            />
                                            <div className="relative">
                                                <select
                                                    value={newProduct.category}
                                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                                    className={`appearance-none px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium w-full outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm ${!newProduct.category ? 'text-slate-400' : 'text-slate-900'}`}
                                                >
                                                    <option value="" disabled hidden>Selecione a Categoria de Produto</option>
                                                    {[
                                                        "Sementes & Mudas",
                                                        "Fertilizantes & Adubos",
                                                        "Defensivos Agrícolas (Pesticidas)",
                                                        "Maquinaria & Equipamentos",
                                                        "Sistemas de Rega",
                                                        "Ração & Nutrição Animal",
                                                        "Medicamentos Veterinários",
                                                        "Ferramentas Agrícolas",
                                                        "Produtos Frescos (Frutas/Legumes)",
                                                        "Grãos & Cereais",
                                                        "Processados & Agro-indústria",
                                                        "Serviços de Consultoria"
                                                    ].map((cat) => (
                                                        <option key={cat} value={cat} className="text-slate-900">{cat}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg px-4 py-3">
                                            <Switch
                                                checked={newProduct.is_available}
                                                onCheckedChange={(checked) => setNewProduct({ ...newProduct, is_available: checked })}
                                            />
                                            <span className="text-sm font-medium text-slate-700">
                                                {newProduct.is_available ? "Produto Disponível em Stock" : "Produto Indisponível (Sem Stock)"}
                                            </span>
                                        </div>

                                        <textarea
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                            placeholder="Breve descrição das características do produto..."
                                            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-24 transition-all shadow-sm placeholder:text-slate-400 placeholder:font-normal"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-emerald-100/50">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingProduct(false)}
                                        className="px-4 py-2 text-xs font-black text-slate-500 hover:bg-slate-200 rounded-lg transition-colors uppercase tracking-wide"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleAddProduct}
                                        disabled={productLoading}
                                        className="px-6 py-2 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-2 uppercase tracking-wide shadow-lg shadow-emerald-900/10"
                                    >
                                        {productLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                                        Salvar Produto
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Products List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white border border-slate-100 rounded-xl p-3 flex gap-3 group hover:border-emerald-200 transition-colors">
                                    <div className="w-16 h-16 bg-slate-100 rounded-lg shrink-0 overflow-hidden">
                                        {product.image_url ? (
                                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <ShoppingBag className="w-6 h-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                        <h5 className="text-sm font-black text-slate-800 truncate">{product.name}</h5>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="font-bold text-emerald-600">
                                                {product.price ? new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' }).format(product.price) : 'Sob Consulta'}
                                            </span>
                                            {product.category && <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{product.category}</span>}
                                            {/* Availability Badge */}
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${product.is_available !== false ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                {product.is_available !== false ? 'Disponível' : 'Indisponível'}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="self-start p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {products.length === 0 && !isAddingProduct && (
                                <p className="col-span-full text-center text-slate-400 text-xs italic py-4">
                                    Nenhum produto registado.
                                </p>
                            )}
                        </div>
                    </div>
                )}

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
