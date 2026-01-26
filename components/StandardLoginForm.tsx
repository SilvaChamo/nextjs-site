"use client";

import React from "react";
import { Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";

export function StandardLoginForm() {
    return (
        <div className="flex items-center justify-center py-24">
            <div className="card-agro-lg w-full max-w-[450px] text-center">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                        <Coffee strokeWidth={1.5} className="w-8 h-8" />
                    </div>
                    <h2>Bem-vindo de volta</h2>
                    <p>Aceda à sua conta para gerir o seu agronegócio.</p>
                </div>

                {/* Form Section */}
                <form className="space-y-5 text-left">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="exemplo@baseagro.com"
                            className="w-full bg-slate-50 border border-slate-200 rounded-[7px] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all font-medium text-sm text-slate-700"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-slate-700">Palavra-passe</label>
                            <Link href="/recuperar" className="text-xs font-bold text-[#f97316] hover:underline">
                                Esqueceu-se?
                            </Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-slate-50 border border-slate-200 rounded-[7px] px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#f97316]/20 focus:border-[#f97316] transition-all font-medium text-sm text-slate-700"
                        />
                    </div>

                    <button className="btn-primary w-full justify-center">
                        Entrar na Plataforma
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                {/* Footer Section */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                        Ainda não tem conta? <Link href="/registar" className="text-[#f97316] font-bold hover:underline">Criar conta gratuita</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
