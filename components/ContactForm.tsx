"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => setIsSubmitting(false), 3000);
    };

    return (
        <div className="card-agro-lg relative overflow-hidden flex flex-col">

            <div className="pb-6">
                <h4 className="text-[45px] font-black text-slate-800/80 mb-2 leading-[1.1]">
                    Fale <span className="text-[#f97316]">connosco</span>
                </h4>
                <p className="text-slate-500 text-[16px] font-medium leading-relaxed">
                    Envie-nos a sua mensagem preenchendo o formulário abaixo, a nossa equipa entrará em contacto consigo em breve.
                </p>
            </div>

            {/* Linha separadora */}
            <div className="w-full h-[1.5px] bg-slate-300 mb-8 opacity-50"></div>

            <form
                id="contact-form"
                className="flex flex-col items-start space-y-5"
                action="mailto:geral@baseagrodata.com"
                method="POST"
                encType="text/plain"
                onSubmit={handleSubmit}
            >
                {/* Nome */}
                <div className="w-full">
                    <label className="block text-[16px] font-semibold text-slate-700/80 py-[10px]">Nome completo</label>
                    <input
                        type="text"
                        name="nome"
                        required
                        placeholder="Insira o seu nome"
                        className="w-full bg-white border border-slate-200 rounded-[6px] px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all font-medium text-[14px] text-slate-700"
                    />
                </div>

                {/* Email */}
                <div className="w-full">
                    <label className="block text-[16px] font-semibold text-slate-700/80 py-[10px]">Email de contacto</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="exemplo@email.com"
                        className="w-full bg-white border border-slate-200 rounded-[6px] px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all font-medium text-[14px] text-slate-700"
                    />
                </div>

                {/* Mensagem */}
                <div className="w-full">
                    <label className="block text-[16px] font-semibold text-slate-700/80 py-[10px]">Sua mensagem</label>
                    <textarea
                        name="mensagem"
                        required
                        placeholder="Como podemos ajudar?"
                        className="w-full bg-white border border-slate-200 rounded-[6px] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all font-medium text-[14px] text-slate-700 h-56 resize-none"
                    ></textarea>
                </div>

                {/* Botão de Envio Alinhado à Esquerda */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mt-4 py-4 px-10 text-white font-bold uppercase tracking-wider text-xs rounded-[6px] transition-all duration-300 shadow-lg active:scale-95 flex items-center justify-center gap-2 group ${isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-[#f97316]'} self-start`}
                >
                    {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </form>

            <div className="absolute bottom-0 left-0 w-full h-[5px] bg-[#f97316] z-10 opacity-10" />
        </div>
    );
}
