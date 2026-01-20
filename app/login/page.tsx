"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Mail, Lock, User, CheckCircle, AlertCircle, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginPageProps {
    initialMode?: "login" | "register";
}

export default function LoginPage({ initialMode = "login" }: LoginPageProps) {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(initialMode === "login");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: ""
    });

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (error) throw error;
                router.push("/usuario/dashboard");
            } else {
                const { error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                        }
                    }
                });
                if (error) throw error;
                setStatus({ type: 'success', message: 'Conta criada! Verifique o seu e-mail para confirmar.' });
            }
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#EFF2F6] flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-[24px] shadow-2xl p-8 md:p-10 border border-slate-100">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-slate-800 mb-2">
                            {isLogin ? "Bem-vindo de volta" : "Criar sua conta"}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {isLogin ? "Aceda ao seu painel Agro Data" : "Junte-se à comunidade agrária"}
                        </p>
                    </div>

                    {status && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                            {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Nome Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        required
                                        placeholder="Seu nome"
                                        className="pl-11 h-12 bg-slate-50 border-slate-200 focus:ring-[#f97316]"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    className="pl-11 h-12 bg-slate-50 border-slate-200 focus:ring-[#f97316]"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    className="pl-11 pr-10 h-12 bg-slate-50 border-slate-200 focus:ring-[#f97316]"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-black h-12 rounded-xl shadow-lg shadow-orange-500/20 transition-all mt-4"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    {isLogin ? "Entrar" : "Criar Conta"} <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t pt-6 border-slate-100">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setStatus(null);
                            }}
                            className="text-sm font-bold text-slate-500 hover:text-[#f97316] transition-colors"
                        >
                            {isLogin ? "Não tem conta? Registe-se" : "Já tem conta? Faça Login"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
