"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ShoppingBag, Plus, Trash2, CheckCircle2 } from "lucide-react";

export default function SimpleRegistrationPage() {
    const [products, setProducts] = useState([
        { id: 1, name: "", description: "", price: "", available: true },
        { id: 2, name: "", description: "", price: "", available: true }
    ]);

    const addProduct = () => {
        setProducts([...products, { id: Date.now(), name: "", description: "", price: "", available: true }]);
    };

    const removeProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div className="min-h-screen bg-white p-4 md:p-10 font-sans">
            <div className="max-w-[1200px] mx-auto space-y-6">

                {/* 1. BANNER */}
                <div className="w-full h-48 md:h-64 bg-slate-100 rounded-[15px] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center group hover:bg-slate-50 transition-all cursor-pointer">
                    <Upload className="w-10 h-10 text-slate-400 mb-2" />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Banner da Empresa</span>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-black">Recomendado: 1200x400px</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* LEFT CONTENT (MAIN FORM) */}
                    <div className="flex-1 space-y-4">

                        {/* LOGO + TOP FIELDS */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-40 h-40 shrink-0 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-all">
                                <Upload className="w-8 h-8 text-slate-400 mb-1" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Logo (1:1)</span>
                            </div>

                            <div className="flex-1 w-full space-y-4">
                                <Input
                                    placeholder="NOME DA EMPRESA"
                                    className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50"
                                />
                                <Input
                                    placeholder="ACTIVIDADE PRINCIPAL"
                                    className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50"
                                />
                                <Input
                                    placeholder="E-MAIL CORPORATIVO"
                                    className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50"
                                />
                            </div>
                        </div>

                        {/* FULL WIDTH FIELDS */}
                        <div className="space-y-4">
                            <Input placeholder="SLOGAN DA EMPRESA" className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50" />
                            <Input placeholder="NUIT" className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50" />
                            <Input placeholder="TELEFONE / WHATSAPP" className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50" />
                            <Input placeholder="PROVÍNCIA" className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50" />
                            <Input placeholder="DISTRITO" className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50" />
                            <Input placeholder="ENDEREÇO FÍSICO" className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50" />
                            <Textarea
                                placeholder="BIO / DESCRIÇÃO DA EMPRESA"
                                className="min-h-[100px] border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50 resize-none"
                            />
                            <Input placeholder="LINK DO WEBSITE" className="h-12 border-slate-200 p-[10px] text-sm font-semibold text-slate-600 bg-slate-50" />
                        </div>

                        <div className="pt-6">
                            <Button className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 rounded-[10px]">
                                Confirmar e Mesa para Consumo
                            </Button>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR (SERVICES & PRODUCTS) */}
                    <aside className="w-full lg:w-[400px] shrink-0 space-y-10">

                        {/* SERVIÇOS */}
                        <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                Serviços
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                    <div key={i} className="h-10 bg-slate-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-300 transition-colors border border-slate-300">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Serviço {i}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PRODUTOS */}
                        <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <ShoppingBag className="w-4 h-4 text-[#f97316]" />
                                Produtos
                            </h3>

                            <div className="space-y-6">
                                {products.map((p, idx) => (
                                    <div key={p.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4 relative group">
                                        <button
                                            onClick={() => removeProduct(p.id)}
                                            className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-rose-500 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>

                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 shrink-0 bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-300 group-hover:bg-slate-100 transition-all cursor-pointer">
                                                <Upload className="w-6 h-6 mb-1" />
                                                <span className="text-[8px] font-black uppercase">Imagem</span>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <Input
                                                    placeholder="Nome do produto"
                                                    className="h-10 border-slate-100 p-[8px] text-xs font-semibold text-slate-600 bg-slate-50"
                                                />
                                                <Textarea
                                                    placeholder="Breve descrição"
                                                    className="h-12 border-slate-100 p-[8px] text-[10px] font-semibold text-slate-600 bg-slate-50 resize-none leading-tight"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <Input
                                                placeholder="Preço em MT"
                                                className="h-9 border-slate-100 p-[8px] text-[10px] font-bold text-emerald-600 bg-slate-50"
                                            />
                                            <div className="flex items-center gap-2 justify-end">
                                                <div className="flex items-center gap-1.5 cursor-pointer">
                                                    <div className="w-3 h-3 rounded-full border border-slate-300 bg-emerald-500" />
                                                    <span className="text-[9px] font-bold text-slate-500 uppercase">Disp.</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 cursor-pointer opacity-50">
                                                    <div className="w-3 h-3 rounded-full border border-slate-300" />
                                                    <span className="text-[9px] font-bold text-slate-500 uppercase">Indisp.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Button
                                    onClick={addProduct}
                                    variant="outline"
                                    className="w-full border-dashed border-slate-300 text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all text-[10px] font-bold uppercase tracking-widest"
                                >
                                    <Plus className="w-3 h-3 mr-2" />
                                    Adicionar mais produtos
                                </Button>
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </div>
    );
}
