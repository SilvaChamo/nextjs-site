"use client";

import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";
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

    // Create Supabase client for browser
    const supabase = createClient();

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
                router.refresh();
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName,
                        }
                    }
                });

                if (error) throw error;

                if (data.session) {
                    router.push("/usuario/dashboard");
                    router.refresh();
                } else {
                    const { error: signInError } = await supabase.auth.signInWithPassword({
                        email: formData.email,
                        password: formData.password,
                    });

                    if (!signInError) {
                        router.push("/usuario/dashboard");
                        router.refresh();
                    } else {
                        setStatus({ type: 'success', message: 'Conta criada! Verifique sua caixa de entrada para confirmar o e-mail.' });
                    }
                }
            }
        } catch (err: any) {
            setStatus({ type: 'error', message: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleMagicLink = async () => {
        if (!formData.email) {
            setStatus({ type: 'error', message: 'Por favor, insira o seu e-mail.' });
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email: formData.email,
            options: {
                emailRedirectTo: `${window.location.origin}/usuario/dashboard`,
            },
        });
        setLoading(false);
        if (error) {
            setStatus({ type: 'error', message: error.message });
        } else {
            setStatus({ type: 'success', message: 'Link de acesso enviado! Verifique o seu e-mail.' });
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/usuario/dashboard`,
            },
        });
        if (error) setStatus({ type: 'error', message: error.message });
    };

    return (
        <div className="min-h-screen bg-[#EFF2F6] flex items-center justify-center py-20 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-[24px] shadow-2xl p-8 md:p-10 border border-slate-100">

                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-6">
                            <img src="/assets/Logo.png" alt="Base Agro Data" className="h-10 w-auto mx-auto" />
                        </Link>
                        <h1 className="text-3xl font-black text-slate-800 mb-2">
                            {isLogin ? "Bem-vindo de volta" : "Criar sua conta"}
                        </h1>
                        <p className="text-slate-500 font-medium text-sm">
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
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Senha</label>
                                {isLogin && (
                                    <button type="button" className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-tighter">Esqueceu a senha?</button>
                                )}
                            </div>
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
                                    {isLogin ? "Entrar com Senha" : "Criar Conta"} <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Ou continuar com</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={handleMagicLink}
                            disabled={loading}
                            className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                            <Mail className="w-4 h-4 text-emerald-600" />
                            Acesso via Link de E-mail
                        </button>

                        <button
                            onClick={() => handleSocialLogin('google')}
                            disabled={loading}
                            className="flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continuar com Google
                        </button>
                    </div>

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

