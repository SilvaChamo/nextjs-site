"use client";

import React from "react";
import { Presentation, HelpCircle, Lightbulb, Play, MousePointer2, Info } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { usePlanPermissions } from "@/hooks/usePlanPermissions";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export default function UserPresentationsPage() {
    const { canPresentations, planDisplayName, loading } = usePlanPermissions();
    const router = useRouter();
    const supabase = createClient();
    const [creating, setCreating] = React.useState(false);

    const handleCreatePresentation = async () => {
        setCreating(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('presentations')
                .insert({
                    user_id: user.id,
                    title: "Nova Apresentação",
                    status: "draft"
                })
                .select()
                .single();

            if (error) throw error;

            toast.success("Apresentação criada!");
            router.push(`/usuario/dashboard/apresentacoes/editor/${data.id}`);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao criar apresentação.");
        } finally {
            setCreating(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-[900] tracking-tight text-[#3a3f47]">Minhas Apresentações</h2>
                <p className="text-slate-500">Crie e gerencie seus slides interativos para demonstrações e mercado.</p>
            </div>

            {/* Help/Orientation Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <HelpCircle className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                                <Lightbulb className="w-6 h-6 text-orange-400" />
                                Como funcionam as Apresentações?
                            </h3>
                            <p className="text-emerald-50/80 mb-6 leading-relaxed">
                                As apresentações são uma forma dinâmica de mostrar seus produtos e serviços diretamente no mercado da BaseAgroData.
                                Ao criar um conjunto de slides, você pode contar a história da sua marca de forma visual e impactante.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-white">
                                        <Play className="w-4 h-4" /> Autoplay
                                    </h4>
                                    <p className="text-[11px] text-white/70">Os slides passam automaticamente para o visitante, garantindo visibilidade total.</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-white">
                                        <MousePointer2 className="w-4 h-4" /> Interatividade
                                    </h4>
                                    <p className="text-[11px] text-white/70">Adicione botões e links diretos para seus produtos em cada slide.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Empty State / List */}
                    <div className="border border-dashed border-slate-300 rounded-2xl h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 space-y-4">
                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                            <Presentation className="w-8 h-8 text-slate-400" />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-lg text-slate-700">Você ainda não tem apresentações</h3>
                            <p className="text-sm max-w-xs mx-auto mt-1">Crie sua primeira vitrine interativa agora mesmo.</p>
                        </div>
                        <button
                            onClick={handleCreatePresentation}
                            disabled={creating}
                            className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-orange-500 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {creating ? "Criando..." : "+ Nova Apresentação"}
                        </button>
                    </div>
                </div>

                {/* Sidebar Tips */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h4 className="font-black text-[11px] text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4 text-orange-500" />
                            Dicas de Sucesso
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-xs font-bold">1</div>
                                <p className="text-[13px] text-slate-600 leading-snug">Use imagens de alta resolução para causar uma boa primeira impressão.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-xs font-bold">2</div>
                                <p className="text-[13px] text-slate-600 leading-snug">Seja conciso nos textos. Slides com pouco texto convertem melhor.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-xs font-bold">3</div>
                                <p className="text-[13px] text-slate-600 leading-snug">Adicione uma "Call to Action" (ex: Ver Preço) em todos os slides.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6">
                        <h4 className="font-bold text-orange-800 text-sm mb-2">Precisa de ajuda?</h4>
                        <p className="text-xs text-orange-700/80 leading-relaxed mb-4">
                            Nossa equipe de design pode ajudar a criar sua apresentação profissional.
                        </p>
                        <Link href="/usuario/dashboard/ajuda" className="text-xs font-black text-orange-600 uppercase tracking-widest hover:underline">
                            Contactar Suporte &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
