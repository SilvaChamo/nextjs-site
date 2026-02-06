"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Trash2, Pencil, MapPin, Briefcase, GraduationCap, User, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";
import { PROVINCES } from "@/lib/constants";
import { PageHeader } from "@/components/PageHeader";

// Simplified categories for professionals
const PROFESSIONAL_CATEGORIES = [
    "Agronomia",
    "Veterinária",
    "Zootecnia",
    "Engenharia Florestal",
    "Gestão Agrícola",
    "Tecnologia e Inovação",
    "Consultoria",
    "Economia Agrária",
    "Mecanização Agrícola",
    "Outro"
];

export default function SimpleProfessionalRegistrationPage() {
    const router = useRouter();

    // Image states
    const [photoImage, setPhotoImage] = useState<string | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    // Form states
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [category, setCategory] = useState("");
    const [province, setProvince] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [academicLevel, setAcademicLevel] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Image Upload Helper
    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1048576) {
                alert("A imagem deve ter no máximo 1MB.");
                return;
            }
            const url = URL.createObjectURL(file);
            setPhotoImage(url);
        }
    };

    const handleSave = async () => {
        const errors: string[] = [];
        if (!name.trim()) errors.push("Nome completo");
        if (!role.trim()) errors.push("Cargo/Título");
        if (!category.trim()) errors.push("Área de Actuação");
        if (!province.trim()) errors.push("Província");
        if (!phone.trim()) errors.push("Telefone");
        if (!email.trim()) errors.push("Email");
        if (!specialties.trim()) errors.push("Especialidades");

        if (errors.length > 0) {
            alert(`Por favor, preencha os seguintes campos obrigatórios:\n- ${errors.join('\n- ')}`);
            return;
        }

        setIsSubmitting(true);
        try {
            // 1. Upload Photo if any
            let finalPhotoUrl = null;

            if (photoImage) {
                const response = await fetch(photoImage);
                const blob = await response.blob();
                const fileExt = blob.type.split('/')[1] || 'jpg';
                const fileName = `professionals/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

                const { data, error: uploadError } = await supabase.storage
                    .from('public-assets')
                    .upload(fileName, blob, {
                        contentType: blob.type,
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('public-assets')
                    .getPublicUrl(data.path);

                finalPhotoUrl = publicUrl;
            }

            // 2. Insert into professionals table
            const { data: insertedData, error } = await supabase.from('professionals').insert({
                name: name,
                role: role,
                category: category,
                province: province,
                location: location,
                bio: bio,
                specialties: specialties,
                phone: phone,
                email: email,
                academic_level: academicLevel,
                photo_url: finalPhotoUrl,
                status: 'pending', // Default to pending
                rating: 5.0,
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString()
            }).select('id').single();

            if (error) throw error;

            if (insertedData) {
                // Store the ID for linking after login/register
                localStorage.setItem('pending_professional_registration_id', insertedData.id);
            }

            alert("Registo enviado com sucesso! Agora, crie a sua conta de acesso para gerir o seu perfil.");
            router.push("/login?mode=register");

        } catch (error: any) {
            console.error("Erro ao guardar profissional:", error);
            alert("Erro ao guardar dados: " + (error.message || "Tente novamente."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            <PageHeader
                title="Registo de Talento"
                breadcrumbs={[
                    { label: "Serviços", href: "/servicos" },
                    { label: "Talentos", href: "/servicos/talentos" },
                    { label: "Registo Rápido", href: undefined }
                ]}
            />

            <div className="container-site mt-10 max-w-4xl mx-auto">
                <div className="bg-white rounded-[20px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    {/* Header Banner */}
                    <div className="bg-emerald-900 px-8 py-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Junte-se à nossa rede</h1>
                            <p className="text-emerald-100/80 text-lg font-medium">Crie o seu perfil profissional em menos de 2 minutos.</p>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-10">
                            {/* Photo Upload Side */}
                            <div className="flex flex-col items-center">
                                <div
                                    onClick={() => photoInputRef.current?.click()}
                                    className="w-40 h-40 rounded-[25px] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden relative group"
                                >
                                    {photoImage ? (
                                        <>
                                            <img src={photoImage} alt="Profile" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Pencil className="w-6 h-6 text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-slate-300 mb-2" />
                                            <span className="text-[10px] font-black uppercase text-slate-400 text-center px-4 tracking-widest leading-tight">Foto de Perfil</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        ref={photoInputRef}
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest text-center">800x800px · Máx 1MB</p>

                                <div className="mt-10 p-4 bg-orange-50 rounded-xl border border-orange-100/50 flex flex-col gap-3">
                                    <div className="flex items-center gap-2 text-orange-600">
                                        <AlertCircle className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Importante</span>
                                    </div>
                                    <p className="text-[11px] text-orange-800 leading-relaxed font-medium">
                                        Após submeter, poderá entrar na sua conta para completar o seu currículo e portfólio.
                                    </p>
                                </div>
                            </div>

                            {/* Form Side */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Nome Completo *</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Ex: João Silva"
                                                className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-emerald-500/20 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Cargo / Título *</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                    placeholder="Ex: Eng. Agrónomo"
                                                    className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-emerald-500/20 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Área de Actuação *</label>
                                            <Select value={category} onValueChange={setCategory}>
                                                <SelectTrigger className="h-14 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all font-medium">
                                                    <SelectValue placeholder="Selecione..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {PROFESSIONAL_CATEGORIES.map(cat => (
                                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Email *</label>
                                            <Input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="seu@email.com"
                                                className="h-14 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Telefone *</label>
                                            <Input
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="+258..."
                                                className="h-14 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Província *</label>
                                            <Select value={province} onValueChange={setProvince}>
                                                <SelectTrigger className="h-14 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all font-medium">
                                                    <SelectValue placeholder="Selecione..." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {PROVINCES.map(prov => (
                                                        <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Nível Académico</label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <Input
                                                    value={academicLevel}
                                                    onChange={(e) => setAcademicLevel(e.target.value)}
                                                    placeholder="Ex: Licenciatura"
                                                    className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-emerald-500/20 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Localização Detalhada</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <Input
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                placeholder="Bairro, Rua..."
                                                className="h-14 pl-12 bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-emerald-500/20 transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-black uppercase text-slate-500 tracking-widest ml-1">Breve Resumo Profissional</label>
                                        <Textarea
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Conte-nos um pouco sobre a sua experiência..."
                                            className="min-h-[120px] bg-slate-50 border-slate-200 rounded-xl focus:bg-white focus:ring-emerald-500/20 transition-all font-medium p-4"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <Button
                                        onClick={handleSave}
                                        disabled={isSubmitting}
                                        className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>Submeter Registo</>
                                        )}
                                    </Button>
                                    <p className="text-[10px] text-slate-400 text-center mt-4 font-bold uppercase tracking-widest">
                                        Ao clicar em submeter, aceita os nossos <span className="text-emerald-600 underline cursor-pointer">Termos e Condições</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
