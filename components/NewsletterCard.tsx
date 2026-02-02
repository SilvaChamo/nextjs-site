"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterCard() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            setEmail("");
            toast.success("Inscrição realizada com sucesso!");
        }, 1500);
    };

    return (
        <div className="bg-slate-900 rounded-[10px] p-5 text-white relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 size-40 bg-[#f97316]/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 size-32 bg-emerald-500/10 blur-3xl rounded-full"></div>

            <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]"></span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">Comunidade Agro</span>
                </div>

                <h3 className="text-2xl font-black leading-tight text-white">Mantenha-se <br />Actualizado</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                    Receba os últimos insights, cotações de mercado e manuais técnicos do agronegócio moçambicano.
                </p>

                {status === 'success' ? (
                    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl text-emerald-400 animate-in fade-in zoom-in duration-300">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span className="text-xs font-bold">Inscrição realizada com sucesso!</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
                        <div className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Seu melhor e-mail"
                                className="w-full bg-white/5 border border-white/50 rounded-[12px] px-5 py-3 text-xs font-medium focus:outline-none focus:border-[#f97316] focus:bg-white/10 transition-all placeholder:text-slate-500"
                                required
                            />
                        </div>
                        <button
                            disabled={status === 'loading'}
                            className="w-full bg-[#f97316] hover:bg-orange-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-[0.2em] py-[14px] rounded-[12px] shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            {status === 'loading' ? 'A Processar...' : (
                                <>
                                    Subscrever Agora <Send className="w-3.5 h-3.5" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
