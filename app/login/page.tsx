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
    const [isResetPassword, setIsResetPassword] = useState(false);
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
            if (isResetPassword) {
                const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
                    redirectTo: `${window.location.origin}/login?mode=recovery`,
                });
                if (error) throw error;
                setStatus({ type: 'success', message: 'Link de redefinição enviado para o seu e-mail!' });
                return;
            }

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
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Top Orange Line */}
            <div className="fixed top-0 left-0 w-full h-[6px] bg-[#f97316] z-[50] shadow-[0_2px_10px_rgba(249,115,22,0.3)]" />

            {/* Bottom Orange Line */}
            <div className="fixed bottom-0 left-0 w-full h-[6px] bg-[#f97316] z-[50] shadow-[0_-2px_10px_rgba(249,115,22,0.3)]" />

            {/* Background Image Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: "url('/assets/cta-gradient-bg.webp')" }}
            />

            <div className="w-full max-w-[380px] px-4 relative z-10">
                <div className="bg-white/95 backdrop-blur-md rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 border border-slate-100 form-premium-card">

                    <div className="text-center mb-7">
                        <Link href="/" className="inline-block transition-transform hover:scale-105 duration-300">
                            <img src="/assets/Logo.png" alt="Base Agro Data" className="h-16 w-auto mx-auto" />
                        </Link>
                    </div>

                    {status && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-[13px] animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                            {status.type === 'success' ? <CheckCircle className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <div className="candy-border-wrapper rounded-md">
                                    <Input
                                        type="text"
                                        required
                                        placeholder="Nome Completo"
                                        className="pl-11 h-10 bg-[#F8FAFC] border-none focus-candy text-[13px] rounded-md transition-all duration-300 relative z-10"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-20" />
                            <div className="candy-border-wrapper rounded-md">
                                <Input
                                    type="email"
                                    required
                                    placeholder="Email"
                                    className="pl-11 h-10 bg-[#F8FAFC] border-none focus-candy text-[13px] rounded-md transition-all duration-300 relative z-10"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {!isResetPassword && isLogin && (
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-20" />
                                <div className="candy-border-wrapper rounded-md">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Senha"
                                        className="pl-11 pr-10 h-10 bg-[#F8FAFC] border-none focus-candy text-[13px] rounded-md transition-all duration-300 relative z-10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors z-20"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        )}

                        {!isLogin && !isResetPassword && (
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-20" />
                                <div className="candy-border-wrapper rounded-md">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Senha"
                                        className="pl-11 pr-10 h-10 bg-[#F8FAFC] border-none focus-candy text-[13px] rounded-md transition-all duration-300 relative z-10"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors z-20"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-emerald-600 hover:bg-[#f97316] text-white font-black h-10 rounded-agro-btn shadow-lg transition-all text-[11px] uppercase tracking-wider group"
                            >
                                {loading ? (
                                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                ) : (
                                    <span className="flex items-center justify-center gap-1.5">
                                        {isResetPassword ? "Resetar" : isLogin ? "Entrar" : "Criar"}
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                )}
                            </Button>

                            {!isResetPassword && (
                                <button
                                    onClick={(e) => { e.preventDefault(); handleSocialLogin('google'); }}
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 h-10 rounded-agro-btn border border-slate-200 bg-white text-slate-700 font-bold text-[10px] hover:border-[#f97316] hover:bg-[#f97316]/5 transition-all shadow-sm uppercase tracking-tight px-4"
                                >
                                    <span className="opacity-70">Entrar via</span>
                                    <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {!isLogin && (
                            <div className="text-center">
                                <Link href="/planos" className="text-[10px] font-bold text-[#f97316] hover:underline uppercase tracking-widest transition-all">
                                    Registar um plano
                                </Link>
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-2.5 pt-2.5 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsResetPassword(!isResetPassword);
                                    setIsLogin(true);
                                    setStatus(null);
                                }}
                                className="text-[10px] font-bold text-emerald-600 hover:text-[#f97316] uppercase tracking-widest transition-colors"
                            >
                                {isResetPassword ? "Voltar ao Login" : "Redefinir senha"}
                            </button>
                            {!isResetPassword && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsLogin(!isLogin);
                                        setStatus(null);
                                    }}
                                    className="text-[10px] font-bold text-slate-400 hover:text-[#f97316] uppercase tracking-widest transition-colors ml-auto"
                                >
                                    {isLogin ? "Registe-se aqui" : "Voltar ao Login"}
                                </button>
                            )}
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
