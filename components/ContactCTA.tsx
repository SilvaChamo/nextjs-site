"use client";

import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";

interface ContactCTAProps {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
    children?: React.ReactNode;
}

export function ContactCTA({
    title = "Quer começar? Fale connosco",
    description = "A nossa equipa de especialistas está pronta para ajudar a impulsionar o seu negócio no sector agrário.",
    buttonText = "Contactar Agora",
    href = "/contactos",
    children
}: ContactCTAProps) {
    return (
        <div className="mt-20 bg-[#111827] rounded-[15px] p-12 text-left relative overflow-hidden border border-slate-800 shadow-2xl shadow-slate-900/20 text-white group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f97316]/10 blur-[80px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f97316]/10 text-[#f97316] text-[10px] font-black uppercase tracking-widest border border-[#f97316]/20">
                        Suporte Especializado
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight">{title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed max-w-md">
                        {description}
                    </p>
                </div>
                <div className="lg:text-right flex flex-col sm:flex-row items-center justify-end gap-4">
                    {children}
                    <Link
                        href={href}
                        className="inline-flex items-center justify-center px-12 py-4 bg-[#f97316] text-white rounded-md font-bold text-base transition-all shadow-lg hover:scale-105 active:scale-95 gap-3 group-hover:shadow-[#f97316]/20 w-full sm:w-auto"
                    >
                        {buttonText}
                        <MessageSquare className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
