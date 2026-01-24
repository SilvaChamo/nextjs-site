"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, RefreshCw, User, Mail } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function ContactForm() {
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [captchaCode, setCaptchaCode] = useState("");
    const [userCaptcha, setUserCaptcha] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    // Generate simple math captcha
    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        setCaptchaCode(`${num1} + ${num2}`);
        return num1 + num2;
    };

    const [captchaSolution, setCaptchaSolution] = useState(0);

    // Initial captcha generation
    useEffect(() => {
        setCaptchaSolution(generateCaptcha());
    }, []);

    const regenerateCaptcha = () => {
        setCaptchaSolution(generateCaptcha());
        setUserCaptcha("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // Verify Captcha
        if (parseInt(userCaptcha) !== captchaSolution) {
            setStatus({ type: 'error', message: 'Resultado da soma incorrecto. Tente novamente.' });
            setLoading(false);
            return;
        }

        try {
            // 1. Save to Database (Archival)
            const { error: dbError } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message
                    }
                ]);

            if (dbError) console.error("Database save failed:", dbError);

            // 2. Send Email via FormSubmit (Delivery)
            const response = await fetch("https://formsubmit.co/ajax/suport@baseagrodata.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `Novo Contacto: ${formData.name}`,
                    _captcha: "false" // Disable their captcha since we have our own
                })
            });

            if (!response.ok) throw new Error("Email sending failed");

            setStatus({ type: 'success', message: 'Mensagem enviada com sucesso para nossa equipa de suporte!' });
            setFormData({ name: "", email: "", message: "" });
            regenerateCaptcha();
        } catch (error: any) {
            console.error("Error submitting form:", error);
            setStatus({ type: 'error', message: 'Erro ao enviar mensagem. Por favor tente novamente.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative border border-slate-100 overflow-hidden">
            {/* Top Orange Line - Premium Signature */}
            <div className="absolute top-0 left-0 w-full h-[5px] bg-[#f97316] z-10" />

            <div className="p-8 pb-4 text-center">
                <h3 className="text-xl font-black text-slate-800 mb-1">Envie-nos uma Mensagem</h3>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed">Estamos aqui para ajudar no seu crescimento</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-4">
                <div className="space-y-4">
                    {/* Nome */}
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Nome Completo"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[10px] text-[13px] font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] outline-none transition-all"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="E-mail para Contacto"
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-[10px] text-[13px] font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] outline-none transition-all"
                        />
                    </div>

                    {/* Mensagem */}
                    <div className="relative">
                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Como podemos ajudar?"
                            className="w-full p-5 bg-slate-50 border border-slate-200 rounded-[10px] text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] outline-none transition-all resize-none"
                        />
                    </div>

                    {/* Anti-Robot Captcha */}
                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg font-mono font-black text-slate-600 tracking-widest text-base shadow-sm">
                                {captchaCode} =
                            </div>
                            <input
                                type="number"
                                required
                                value={userCaptcha}
                                onChange={(e) => setUserCaptcha(e.target.value)}
                                placeholder="?"
                                className="w-16 p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-bold focus:ring-2 focus:ring-[#f97316]/20 outline-none text-center shadow-sm"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={regenerateCaptcha}
                            className="bg-white p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-[#f97316] hover:border-[#f97316]/30 transition-all shadow-sm group"
                            title="Gerar novo código"
                        >
                            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>

                    {status && (
                        <div className={`p-4 rounded-xl flex items-start gap-3 text-[13px] animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                            <span className="font-bold">{status.message}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-[#10b981] hover:bg-[#f97316] text-white font-black uppercase tracking-widest text-xs rounded-[10px] transition-all shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Enviar Mensagem Agora
                                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Bottom Orange Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-[5px] bg-[#f97316] z-10 opacity-20" />
        </div>
    );
}
