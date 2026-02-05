"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { Plus, Presentation, Pencil, Trash2, Play, Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useRouter } from "next/navigation";

export default function AdminApresentacoesPage() {
    const router = useRouter();
    const supabase = createClient();
    const [presentations, setPresentations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);

    const fetchPresentations = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('presentations')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setPresentations(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPresentations();
    }, []);

    const handleDelete = async () => {
        if (!itemToDelete) return;

        const { error } = await supabase
            .from('presentations')
            .delete()
            .eq('id', itemToDelete.id);

        if (error) {
            toast.error("Erro ao eliminar: " + error.message);
        } else {
            toast.success("Apresentação eliminada!");
            fetchPresentations();
        }
        setShowDeleteConfirm(false);
        setItemToDelete(null);
    };

    const filtered = presentations.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <Presentation className="w-8 h-8 text-emerald-600" />
                        Minhas Apresentações
                    </h1>
                    <p className="text-slate-500 text-sm">Crie e gira as suas apresentações corporativas.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Pesquisar apresentações..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 h-11 bg-white border-slate-200 min-w-[300px]"
                        />
                    </div>
                    <Button
                        onClick={() => router.push('/admin/apresentacoes/novo')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-emerald-600/20 gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Nova Apresentação
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                        <Presentation className="w-10 h-10 text-slate-300" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Nenhuma apresentação encontrada</h3>
                        <p className="text-slate-500 max-w-xs mx-auto mt-1">Comece por criar a sua primeira apresentação profissional para o site.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item) => (
                        <div key={item.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                            <div className="aspect-video bg-slate-950 relative overflow-hidden flex items-center justify-center p-8 text-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 to-slate-950">
                                <h3 className="text-lg font-black text-white uppercase leading-tight line-clamp-3">
                                    {item.title}
                                </h3>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                    <Button
                                        onClick={() => router.push(`/apresentacao/${item.id}`)}
                                        className="bg-emerald-500 hover:bg-emerald-600 rounded-full w-12 h-12 p-0 flex items-center justify-center"
                                    >
                                        <Play className="fill-white w-5 h-5 ml-1" />
                                    </Button>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                                        {item.slides?.length || 0} SLIDES
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
                                    Criada em {new Date(item.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-slate-600 text-sm line-clamp-2 mb-6 h-10">
                                    {item.description || "Sem descrição disponível."}
                                </p>
                                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.push(`/admin/apresentacoes/editor/${item.id}`)}
                                        className="text-xs font-bold uppercase tracking-widest text-slate-600 h-9 px-4 gap-2"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                        Editar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => { setItemToDelete(item); setShowDeleteConfirm(true); }}
                                        className="text-rose-600 hover:bg-rose-50 rounded-lg p-2"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                title="Eliminar Apresentação"
                description={`Tem a certeza que deseja eliminar "${itemToDelete?.title}"? Esta acção não pode ser desfeita.`}
                confirmLabel="Eliminar Agora"
                variant="destructive"
            />
        </div>
    );
}

function Loader2({ className }: { className?: string }) {
    return <RefreshCw className={className + " animate-spin"} />;
}

import { RefreshCw } from "lucide-react";
