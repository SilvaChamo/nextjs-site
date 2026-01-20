"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { BadgeCheck, BadgeAlert } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function AdminArticlesPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

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

    const handleDelete = async (row: any) => {
        if (!confirm(`Tem a certeza que deseja eliminar o artigo "${row.title}"?`)) return;

        try {
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', row.id);

            if (error) throw error;
            fetchArticles();
        } catch (error: any) {
            alert("Erro ao eliminar: " + error.message);
        }
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

            <AdminDataTable
                title="Lista de Artigos"
                columns={columns}
                data={articles}
                loading={loading}
                onAdd={() => {
                    setEditingItem(null);
                    setShowForm(true);
                }}
                onEdit={(row) => {
                    setEditingItem(row);
                    setShowForm(true);
                }}
                onDelete={handleDelete}
            />

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
        </div>
    );
}
