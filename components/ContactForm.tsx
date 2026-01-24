"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
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
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#f97316] rounded-full"></span>
                Envie-nos uma Mensagem
            </h3>

            <div className="space-y-5">
                {/* Nome */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-[10px]">Nome Completo</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Seu nome"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] outline-none transition-all"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-[10px]">E-mail para Contacto</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="exemplo@email.com"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] outline-none transition-all"
                    />
                </div>

                {/* Mensagem */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-[10px]">Sua Mensagem</label>
                    <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Como podemos ajudar?"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] outline-none transition-all resize-none"
                    />
                </div>

                {/* Anti-Robot Captcha */}
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200 space-y-3 w-fit">
                    <div className="flex items-center justify-between gap-4">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-emerald-500" />
                            Verificação
                        </label>
                        <button
                            type="button"
                            onClick={regenerateCaptcha}
                            className="text-slate-400 hover:text-[#f97316] transition-colors"
                            title="Gerar novo código"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-200 px-4 py-2 rounded-md font-mono font-black text-slate-600 tracking-widest text-lg select-none">
                            {captchaCode} = ?
                        </div>
                        <input
                            type="number"
                            required
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            placeholder="Res."
                            className="w-32 p-3 bg-white border border-slate-200 rounded-md text-slate-800 font-bold focus:ring-2 focus:ring-[#f97316]/20 outline-none text-center"
                        />
                    </div>
                </div>

                {status && (
                    <div className={`p-4 rounded-lg flex items-start gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                        <span className="font-medium">{status.message}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-fit px-8 bg-[#22c55e] hover:bg-[#f97316] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-500/20 hover:shadow-orange-500/30 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Enviar Mensagem
                            <Send className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
