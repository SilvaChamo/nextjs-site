"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { User, Mail, Phone, MapPin, Camera, Save, X, Loader2, BadgeCheck, GraduationCap, Briefcase, Map, ShoppingBag, Building2, Facebook, Instagram, Linkedin, Globe, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardPageHeader } from "@/components/DashboardPageHeader";
import { createClient } from "@/utils/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function MinhaContaPage() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "Maputo, Moçambique", // Default placeholder
        province: "",
        profession: "",
        academicLevel: "",
        avatarUrl: ""
    });

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                setFormData({
                    fullName: user.user_metadata?.full_name || user.user_metadata?.name || "",
                    phone: user.user_metadata?.phone || user.phone || "",
                    address: user.user_metadata?.address || "Maputo, Moçambique",
                    province: user.user_metadata?.province || "",
                    profession: user.user_metadata?.profession || "",
                    academicLevel: user.user_metadata?.academic_level || "",
                    avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || ""
                });
            }
            setLoading(false);
        };
        getUser();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, avatarUrl: publicUrl }));

        } catch (error) {
            console.error("Error uploading avatar:", error);
            alert("Erro ao fazer upload da foto. Verifique se o bucket 'avatars' existe e é público.");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    province: formData.province,
                    profession: formData.profession,
                    academic_level: formData.academicLevel,
                    avatar_url: formData.avatarUrl
                }
            });

            if (error) throw error;

            setIsEditing(false);
            router.refresh();
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Erro ao atualizar perfil.");
        } finally {
            setLoading(false);
        }
    };

    // Helper to get display avatar
    const getAvatarSrc = () => {
        if (formData.avatarUrl) return formData.avatarUrl;
        const name = formData.fullName || user?.email || "User";
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=256`;
    };

    if (loading && !user) {
        return <div className="p-8 text-center text-slate-500">Carregando dados...</div>;
    }

    return (
        <div className="space-y-6">
            <DashboardPageHeader
                title="Minha Conta"
                description="Gerencie suas informações pessoais e preferências."
            />

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 items-start">

                {/* CARD ESQUERDA: Identidade */}
                <div className="bg-white rounded-xl py-6 px-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                    <div className="group relative">
                        <div
                            className={`w-28 h-28 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 relative overflow-hidden ring-4 ring-white shadow-lg ${isEditing ? 'cursor-pointer hover:opacity-90' : ''}`}
                            onClick={handleAvatarClick}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={getAvatarSrc()}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />

                            {isEditing && (
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            )}

                            {uploading && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                                    <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        {isEditing && (
                            <p className="text-xs text-center mt-2 text-slate-400 font-medium">Clique na foto para alterar</p>
                        )}
                    </div>

                    <div>
                        {isEditing ? (
                            <Input
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className="text-center font-black text-xl text-slate-800"
                                placeholder="Seu Nome"
                            />
                        ) : (
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">{formData.fullName || "Usuário sem Nome"}</h2>
                        )}

                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                            <BadgeCheck className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-wide">Plano Gratuito</span>
                        </div>

                        {!isEditing && (
                            <p className="text-slate-400 text-sm mt-4">
                                Membro desde <span className="font-medium text-slate-600">{new Date(user?.created_at || "").toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* CARD DIREITA: Dados do Usuário */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col">

                    {/* Cabeçalho do Card */}
                    <div className="px-8 py-6 border-b border-slate-100">
                        <h3 className="text-3xl font-black text-slate-800 tracking-tight">Meus Dados</h3>
                    </div>

                    <div className="pl-8 py-8 pr-[50px] flex-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* COLUNA 1 (50%): Formulário de Dados */}
                            <div className="">
                                <div className="space-y-8 w-full">
                                    {/* Email */}
                                    <div className="flex items-center gap-4 text-slate-700">
                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-500 font-medium">Email</p>
                                            <p className="text-base font-semibold text-slate-800">{user?.email}</p>
                                        </div>
                                    </div>

                                    {/* Telefone */}
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Telefone de Contato</label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                                <Input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="+258..."
                                                    className="pl-10 font-medium text-slate-800"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 text-slate-700">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <Phone className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-500 font-medium">Telefone</p>
                                                <p className="text-base font-semibold text-slate-800">{formData.phone || "Não informado"}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Província */}
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Província</label>
                                            <div className="relative">
                                                <Map className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                                <Input
                                                    name="province"
                                                    value={formData.province}
                                                    onChange={handleInputChange}
                                                    placeholder="Ex: Maputo"
                                                    className="pl-10 font-medium text-slate-800"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 text-slate-700">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <Map className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-500 font-medium">Província</p>
                                                <p className="text-base font-semibold text-slate-800">{formData.province || "Não informado"}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Endereço */}
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Endereço Residencial</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                                <Input
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className="pl-10 font-medium text-slate-800"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 text-slate-700">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-500 font-medium">Endereço</p>
                                                <p className="text-base font-semibold text-slate-800">{formData.address}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Profissão */}
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Profissão</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                                <Input
                                                    name="profession"
                                                    value={formData.profession}
                                                    onChange={handleInputChange}
                                                    placeholder="Ex: Engenheiro Agrônomo"
                                                    className="pl-10 font-medium text-slate-800"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 text-slate-700">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <Briefcase className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-500 font-medium">Profissão</p>
                                                <p className="text-base font-semibold text-slate-800">{formData.profession || "Não informado"}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Nível Acadêmico */}
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Nível Acadêmico</label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                                                <Input
                                                    name="academicLevel"
                                                    value={formData.academicLevel}
                                                    onChange={handleInputChange}
                                                    placeholder="Ex: Licenciatura"
                                                    className="pl-10 font-medium text-slate-800"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 text-slate-700">
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                                <GraduationCap className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-slate-500 font-medium">Nível Acadêmico</p>
                                                <p className="text-base font-semibold text-slate-800">{formData.academicLevel || "Não informado"}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* COLUNA 2 (50%): Cards de Acesso Rápido */}
                            <div className="border-l border-slate-200 pl-[50px] flex flex-col gap-6 justify-center">
                                {/* Card Redes Sociais (Topo) */}
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-[10px] shadow-sm flex flex-col justify-center h-48 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Globe className="w-16 h-16 text-slate-800" />
                                    </div>
                                    <div className="px-4 relative z-10">
                                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Redes Sociais</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                                                    <Facebook className="w-4 h-4" />
                                                </div>
                                                <p className="text-sm text-slate-600 font-medium hover:text-blue-600 cursor-pointer transition-colors truncate">facebook.com/usuario</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center shrink-0 text-pink-600">
                                                    <Instagram className="w-4 h-4" />
                                                </div>
                                                <p className="text-sm text-slate-600 font-medium hover:text-pink-600 cursor-pointer transition-colors truncate">@usuario.insta</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0 text-sky-600">
                                                    <Linkedin className="w-4 h-4" />
                                                </div>
                                                <p className="text-sm text-slate-600 font-medium hover:text-sky-600 cursor-pointer transition-colors truncate">in/usuario-pro</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Estatísticas (Baixo) */}
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-[10px] shadow-sm flex flex-col justify-center h-48 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <TrendingUp className="w-16 h-16 text-emerald-600" />
                                    </div>
                                    <div className="px-4 relative z-10">
                                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Estatísticas</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Eye className="w-4 h-4 text-slate-400" />
                                                    <span className="text-xs font-bold text-slate-400 uppercase">Views</span>
                                                </div>
                                                <p className="text-2xl font-black text-slate-800">1,248</p>
                                                <p className="text-[10px] text-emerald-600 font-bold flex items-center mt-1">
                                                    <TrendingUp className="w-3 h-3 mr-1" /> +12%
                                                </p>
                                            </div>
                                            <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Building2 className="w-4 h-4 text-slate-400" />
                                                    <span className="text-xs font-bold text-slate-400 uppercase">Visitas</span>
                                                </div>
                                                <p className="text-2xl font-black text-slate-800">85</p>
                                                <p className="text-[10px] text-emerald-600 font-bold flex items-center mt-1">
                                                    <TrendingUp className="w-3 h-3 mr-1" /> +5%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Botões de Ação (Rodapé Full Width) */}
                    <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-end gap-2">
                        {isEditing ? (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(false)}
                                    className="text-slate-500 hover:text-slate-700"
                                >
                                    <X className="w-4 h-4 mr-1" /> Cancelar
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleSave}
                                    disabled={loading || uploading}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-1" />}
                                    Salvar Alterações
                                </Button>
                            </>
                        ) : (
                            <Button variant="outline" className="bg-white border-slate-200 shadow-sm" onClick={() => setIsEditing(true)}>
                                Editar Perfil
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
