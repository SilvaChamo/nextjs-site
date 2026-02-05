"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    ChevronLeft,
    Save,
    Eye,
    EyeOff,
    User as UserIcon,
    Mail,
    Globe,
    Shield,
    Key,
    Loader2
} from "lucide-react";

export default function EditUserPage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        role: "user",
        plan: "Visitante",
        bio: "",
        website: "",
        password: ""
    });

    const PLANS = ["Visitante", "Basic", "Profissional", "Premium", "Parceiro"];

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error("Error fetching user:", error);
                alert("Erro ao carregar utilizador.");
                router.push("/admin/utilizadores");
            } else {
                setFormData({
                    fullName: data.full_name || "",
                    email: data.email || "",
                    role: data.role || "user",
                    plan: data.plan || "Visitante",
                    bio: data.bio || "",
                    website: data.website || "",
                    password: ""
                });
            }
            setLoading(false);
        }

        if (userId) fetchUser();
    }, [userId, router]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            const response = await fetch('/api/admin/update-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    role: formData.role,
                    plan: formData.plan,
                    password: formData.password || undefined
                    // Note: If you want to update bio/website, update the API or use supabase client directly if RLS allows
                })
            });

            // Also update the profile data directly via client if needed (for fields not in auth)
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.fullName,
                    bio: formData.bio,
                    website: formData.website,
                    updated_at: new Date().toISOString()
                })
                .eq('id', userId);

            if (profileError) throw profileError;

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Erro ao atualizar");

            alert("Utilizador atualizado com sucesso!");
            router.refresh();
        } catch (error: any) {
            alert(`Erro: ${error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="h-96 flex flex-col items-center justify-center text-slate-400 gap-4">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="font-medium animate-pulse">A carregar perfil do utilizador...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-6 border-slate-100">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push("/admin/utilizadores")}
                        className="rounded-full hover:bg-slate-50 border-slate-200"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Editar Utilizador</h1>
                        <p className="text-slate-400 text-sm font-medium">Configure as informações de {formData.email}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-10">
                {/* Section: Nome */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <UserIcon className="w-4 h-4 text-emerald-600" />
                        <h2 className="text-lg font-bold text-slate-800">Nome</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Nome de Utilizador (E-mail)</label>
                            <Input value={formData.email} disabled className="bg-slate-50 border-slate-200 text-slate-500 font-medium cursor-not-allowed" />
                            <p className="text-[10px] text-slate-400">O e-mail não pode ser alterado por aqui.</p>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Nome Completo</label>
                            <Input
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 font-medium"
                                placeholder="Ex: João Silva"
                            />
                        </div>
                    </div>
                </section>

                {/* Section: Contacto */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Globe className="w-4 h-4 text-emerald-600" />
                        <h2 className="text-lg font-bold text-slate-800">Informação de Contacto</h2>
                    </div>
                    <div className="space-y-1.5 max-w-md">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Sítio Web</label>
                        <div className="relative">
                            <Input
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 font-medium"
                                placeholder="https://exemplo.com"
                            />
                        </div>
                    </div>
                </section>

                {/* Section: Sobre */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        <h2 className="text-lg font-bold text-slate-800">Sobre o Utilizador</h2>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Informação Biográfica</label>
                        <Textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="min-h-[120px] border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 font-medium"
                            placeholder="Conte-nos um pouco sobre este utilizador..."
                        />
                        <p className="text-[10px] text-slate-400 font-medium italic">Esta informação será mostrada publicamente se o tema for configurado para isso.</p>
                    </div>
                </section>

                {/* Section: Permissões */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <h2 className="text-lg font-bold text-slate-800">Permissões e Plano</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Função</label>
                            <select
                                className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-0"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="admin">Administrador</option>
                                <option value="editor">Editor</option>
                                <option value="user">Utilizador</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Plano Atual</label>
                            <select
                                className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-0"
                                value={formData.plan}
                                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                            >
                                {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Section: Gestão de Conta */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                        <Key className="w-4 h-4 text-[#f97316]" />
                        <h2 className="text-lg font-bold text-slate-800">Gestão de Conta</h2>
                    </div>
                    <div className="space-y-1.5 max-w-sm">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Nova Senha</label>
                        <div className="relative group">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="border-slate-200 focus:border-[#f97316] focus:ring-[#f97316]/10 font-medium pr-10"
                                placeholder="Introduza a nova senha"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Deixe em branco para manter a senha atual.</p>
                    </div>
                </section>

                {/* Submit */}
                <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                    <Button
                        type="submit"
                        disabled={isUpdating}
                        className="bg-[#f97316] hover:bg-[#ea580c] text-white font-bold h-11 px-8 rounded-md shadow-md hover:shadow-orange-200 transition-all flex items-center gap-2"
                    >
                        {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isUpdating ? "A atualizar..." : "Atualizar Utilizador"}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push("/admin/utilizadores")}
                        className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </div>
    );
}
