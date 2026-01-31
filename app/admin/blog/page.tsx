"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { BadgeCheck, BadgeAlert, LayoutGrid, List } from "lucide-react";
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

    async function fetchArticles() {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error(error);
        else setArticles(data || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchArticles();
    }, []);

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        const previousArticles = [...articles];

        try {
            // Optimistic update
            setArticles(prev => prev.filter(article => article.id !== itemToDelete.id));

            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', itemToDelete.id);

            if (error) throw error;
            toast.success("Artigo eliminado!");
        } catch (error: any) {
            setArticles(previousArticles);
            toast.error("Erro ao eliminar: " + error.message);
        } finally {
            setShowDeleteConfirm(false);
            setItemToDelete(null);
        }
    };

    const handleDelete = (row: any) => {
        setItemToDelete(row);
        setShowDeleteConfirm(true);
    };

    const columns = [
        // ... (columns logic)
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
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{row.category || 'Sem Categoria'}</p>
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
                <p className="text-sm font-bold text-slate-500 ml-2">Vista de conteúdos</p>
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
                    title="Lista de Artigos"
                    columns={columns}
                    data={articles}
                    loading={loading}
                    onAdd={() => {
                        setEditingItem(null);
                        setShowForm(true);
                    }}
                    onEdit={(row: any) => {
                        setEditingItem(row);
                        setShowForm(true);
                    }}
                    onDelete={handleDelete}
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
                title="Eliminar Artigo"
                description={`Tem a certeza que deseja eliminar o artigo "${itemToDelete?.title}"? Esta ação não pode ser desfeita.`}
                confirmLabel="Eliminar"
                variant="destructive"
            />
        </div>
    );
}
