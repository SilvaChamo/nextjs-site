"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { BadgeCheck, BadgeAlert, LayoutGrid, List, Trash2, RotateCcw } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/button";

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [showBin, setShowBin] = useState(false);

    async function fetchArticles() {
        setLoading(true);
        let query = supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (showBin) {
            query = query.not('deleted_at', 'is', null);
        } else {
            query = query.is('deleted_at', null);
        }

        const { data, error } = await query;

        if (error) console.error(error);
        else setArticles(data || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchArticles();
    }, [showBin]);

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            if (showBin) {
                // Hard Delete (Permanent) for items already in Bin
                const { error, count } = await supabase
                    .from('articles')
                    .delete({ count: 'exact' })
                    .eq('id', itemToDelete.id);

                if (error) throw error;
                if (count === 0) throw new Error("Permissão negada ou item não encontrado.");
                toast.success("Artigo eliminado permanentemente!");
            } else {
                // Soft Delete (Move to Bin) for active items
                const { error, count } = await supabase
                    .from('articles')
                    .update({ deleted_at: new Date().toISOString() }, { count: 'exact' })
                    .eq('id', itemToDelete.id);

                if (error) throw error;
                if (count === 0) throw new Error("Permissão negada ou item não encontrado.");
                toast.success("Artigo movido para a lixeira!");
            }

            await fetchArticles();
        } catch (error: any) {
            toast.error(error.message || "Erro ao eliminar artigo");
            console.error("Delete failed:", error);
        } finally {
            setShowDeleteConfirm(false);
            setItemToDelete(null);
        }
    };

    const handleRestore = async (article: any) => {
        try {
            const { error, count } = await supabase
                .from('articles')
                .update({ deleted_at: null }, { count: 'exact' })
                .eq('id', article.id);

            if (error) throw error;
            if (count === 0) throw new Error("Permissão negada ou item não encontrado.");

            toast.success("Artigo restaurado com sucesso!");
            await fetchArticles();
        } catch (error: any) {
            toast.error("Erro ao restaurar: " + error.message);
        }
    };

    const handleDelete = (row: any) => {
        setItemToDelete(row);
        setShowDeleteConfirm(true);
    };

    const columns = [
        {
            header: "Título / Resumo",
            key: "title",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-4">
                    {row.image_url && (
                        <div className="size-10 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                            <img src={row.image_url} alt={val} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <p className="font-black text-slate-800 line-clamp-1">{val}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{row.type || 'Sem Categoria'}</p>
                    </div>
                </div>
            )
        },
        { header: "Autor", key: "author" },
        {
            header: "Data",
            key: "date",
            render: (val: string) => <span className="text-slate-400">{val}</span>
        },
        {
            header: "Destaque",
            key: "is_featured",
            render: (val: boolean) => val ? (
                <span className="flex items-center gap-1.5 text-emerald-600">
                    <BadgeCheck className="w-4 h-4" />
                    Sim
                </span>
            ) : (
                <span className="flex items-center gap-1.5 text-slate-300">
                    <BadgeAlert className="w-4 h-4" />
                    Não
                </span>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Artigos & Notícias</h1>
                    <p className="text-slate-500 font-medium text-sm">Gerencie o conteúdo editorial do blog e da página inicial.</p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowBin(false)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${!showBin ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <List className="w-4 h-4" />
                        Publicados
                    </button>
                    <button
                        onClick={() => setShowBin(true)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${showBin ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Trash2 className="w-4 h-4" />
                        Lixeira
                    </button>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <NewsCard
                            key={article.id}
                            title={article.title}
                            subtitle={article.subtitle}
                            category={article.type}
                            date={article.date || article.created_at}
                            image={article.image_url}
                            slug={article.slug}
                            isAdmin={true}
                            onEdit={() => {
                                setEditingItem(article);
                                setShowForm(true);
                            }}
                            onDelete={() => handleDelete(article)}
                        />
                    ))}
                    {articles.length === 0 && !loading && (
                        <div className="col-span-full py-20 text-center text-slate-400">
                            Nenhum conteúdo encontrado.
                        </div>
                    )}
                </div>
            ) : (
                <AdminDataTable
                    title={showBin ? "Lixeira" : "Lista de Artigos"}
                    columns={columns}
                    data={articles}
                    loading={loading}
                    onAdd={showBin ? undefined : () => {
                        setEditingItem(null);
                        setShowForm(true);
                    }}
                    onEdit={showBin ? undefined : (row: any) => {
                        setEditingItem(row);
                        setShowForm(true);
                    }}
                    onDelete={handleDelete}
                    customActions={showBin ? (row: any) => (
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                            onClick={() => handleRestore(row)}
                        >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Restaurar
                        </Button>
                    ) : undefined}
                />
            )}

            {showForm && (
                <ArticleForm
                    initialData={editingItem}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {
                        fetchArticles();
                        setShowForm(false);
                    }}
                />
            )}

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title={showBin ? "Eliminar Permanentemente" : "Mover para Lixeira"}
                description={
                    showBin
                        ? `Tem a certeza que deseja eliminar PERMANENTEMENTE o artigo "${itemToDelete?.title}"? Esta acção NÃO pode ser desfeita.`
                        : `O artigo "${itemToDelete?.title}" será movido para a lixeira. Poderá restaurá-lo mais tarde.`
                }
                confirmLabel={showBin ? "Eliminar de vez" : "Mover para Lixeira"}
                variant="destructive"
            />
        </div>
    );
}
