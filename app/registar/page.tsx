"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Building2, MapPin, Tag, FileText, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "",
        location: "",
        description: "",
        image_url: "", // Optional for now
        logo_url: ""   // Optional for now
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (!formData.name || !formData.category) {
                throw new Error("Por favor, preencha pelo menos o Nome e a Categoria.");
            }

            const { data, error: dbError } = await supabase
                .from('companies')
                .insert([
                    {
                        name: formData.name,
                        category: formData.category,
                        location: formData.location || "Moçambique",
                        description: formData.description,
                        is_featured: false, // Default to false
                        // Default placeholder images if empty
                        image_url: formData.image_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
                        logo_url: formData.logo_url || "https://via.placeholder.com/150"
                    }
                ])
                .select();

            if (dbError) throw dbError;

            setSuccess(true);
            setFormData({ name: "", category: "", location: "", description: "", image_url: "", logo_url: "" });

        } catch (err: any) {
            console.error("Error registering company:", err);
            setError(err.message || "Ocorreu um erro ao registar a empresa.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#EFF2F6] py-[120px] px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-[20px] shadow-xl p-8 md:p-12 border border-slate-100">

                    <div className="text-center mb-10 space-y-4">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-800">
                            Registe a sua <span className="text-[#f97316]">Empresa</span>
                        </h1>
                        <p className="text-slate-500 text-lg">
                            Junte-se à maior plataforma agrária de Moçambique. É gratuito e rápido.
                        </p>
                    </div>

                    {success ? (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-[12px] p-8 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-bold text-emerald-800">Registo Concluído!</h3>
                            <p className="text-emerald-700">
                                A sua empresa foi adicionada com sucesso à nossa base de dados.
                            </p>
                            <Button
                                onClick={() => setSuccess(false)}
                                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            >
                                Registar outra empresa
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700 text-sm">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-[#f97316]" /> Nome da Empresa *
                                        </label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Ex: AgroMoz Lda"
                                            className="bg-slate-50 border-slate-200 focus:border-[#f97316]"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-[#f97316]" /> Categoria *
                                        </label>
                                        <Input
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            placeholder="Ex: Produção, Exportação..."
                                            className="bg-slate-50 border-slate-200 focus:border-[#f97316]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-[#f97316]" /> Localização
                                    </label>
                                    <Input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Cidade, Província"
                                        className="bg-slate-50 border-slate-200 focus:border-[#f97316]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-[#f97316]" /> Descrição
                                    </label>
                                    <Textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Descreva brevemente a sua empresa e serviços..."
                                        className="bg-slate-50 border-slate-200 focus:border-[#f97316] min-h-[100px]"
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                                        <Upload className="w-4 h-4" /> Upload de imagens não disponível nesta versão
                                    </div>
                                </div>

                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold h-12 text-lg shadow-lg hover:shadow-orange-500/30 transition-all rounded-[12px]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processando...
                                    </>
                                ) : (
                                    "Finalizar Registo"
                                )}
                            </Button>
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
