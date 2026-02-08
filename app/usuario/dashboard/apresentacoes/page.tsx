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

    // New State for Listing
    const [presentations, setPresentations] = React.useState<any[]>([]);
    const [loadingData, setLoadingData] = React.useState(true);

    // Fetch Presentations
    React.useEffect(() => {
        const fetchPresentations = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase
                    .from('presentations')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });
                setPresentations(data || []);
            }
            setLoadingData(false);
        };
        fetchPresentations();
    }, [supabase]);

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
                    status: "draft",
                    slides: []
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

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!window.confirm("Tem a certeza que deseja eliminar esta apresentação? Esta acção não pode ser desfeita.")) return;

        try {
            const { error } = await supabase
                .from('presentations')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setPresentations(prev => prev.filter(p => p.id !== id));
            toast.success("Apresentação eliminada.");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao eliminar apresentação.");
        }
    };

    if (loading || loadingData) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-[900] tracking-tight text-[#3a3f47]">Minhas Apresentações</h2>
                    <p className="text-slate-500">Crie e gerencie seus slides interativos para demonstrações e mercado.</p>
                </div>
                {presentations.length > 0 && (
                    <button
                        onClick={handleCreatePresentation}
                        disabled={creating}
                        className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-orange-500 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                    >
                        {creating ? "Criando..." : "+ Nova Apresentação"}
                    </button>
                )}
            </div>

            {/* Help/Orientation Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">

                    {/* LIST OF PRESENTATIONS */}
                    {presentations.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {presentations.map((presentation) => {
                                const slideCount = presentation.slides?.length || 0;
                                const firstSlideImage = presentation.slides?.[0]?.image_url;
                                const createdDate = new Date(presentation.created_at).toLocaleDateString('pt-PT');

                                return (
                                    <div key={presentation.id} className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                                        {/* Preview Area */}
                                        <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                            {firstSlideImage ? (
                                                <img src={firstSlideImage} alt={presentation.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
                                                    <Presentation className="w-12 h-12" />
                                                </div>
                                            )}
                                            {/* Overlay Actions */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <Link
                                                    href={`/apresentacao/${presentation.id}`}
                                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-emerald-600 transition-colors"
                                                    title="Visualizar"
                                                >
                                                    <Play className="w-4 h-4 fill-current ml-0.5" />
                                                </Link>
                                                <Link
                                                    href={`/usuario/dashboard/apresentacoes/editor/${presentation.id}`}
                                                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-colors"
                                                    title="Editar"
                                                >
                                                    <MousePointer2 className="w-4 h-4" />
                                                </Link>
                                            </div>
                                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                                {slideCount} Slides
                                            </div>
                                        </div>

                                        {/* Info Area */}
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h3 className="font-bold text-slate-800 text-lg mb-1 truncate" title={presentation.title || "Sem Título"}>
                                                {presentation.title || "Sem Título"}
                                            </h3>
                                            <p className="text-xs text-slate-500 mb-4 line-clamp-2 flex-1">
                                                {presentation.description || "Sem descrição definida."}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                                    {createdDate}
                                                </span>
                                                <button
                                                    onClick={(e) => handleDelete(presentation.id, e)}
                                                    className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Empty State */
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
                    )}

                    {/* Banner Promocional (moved here to be below list) */}
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
                        </div>
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
