"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { BadgeCheck, BadgeAlert, LayoutGrid, List, Trash2, RotateCcw, FileText, Trash } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { UndoRedoPanel } from "@/components/admin/UndoRedoPanel";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/button";
import { useUndoRedo } from "@/hooks/useUndoRedo";

export default function AdminArticlesPage() {
    const supabase = createClient();
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [showBin, setShowBin] = useState(false);
    const [showBinDropdown, setShowBinDropdown] = useState(false);
    const [showEmptyBinConfirm, setShowEmptyBinConfirm] = useState(false);
    const [activeAdminTab, setActiveAdminTab] = useState("noticias");
    const { addAction, undo, redo, canUndo, canRedo } = useUndoRedo();

    async function fetchArticles() {
        setLoading(true);
        console.log("=== FETCH ARTICLES DEBUG ===");
        console.log("Show bin:", showBin);
        console.log("Active Admin Tab:", activeAdminTab);
        
        let query = supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false });

        if (showBin) {
            console.log("Fetching articles from BIN (deleted_at NOT NULL)");
            query = query.not('deleted_at', 'is', null);
        } else {
            console.log("Fetching ACTIVE articles (deleted_at IS NULL)");
            query = query.is('deleted_at', null);
        }

        // Filter based on active admin tab
        if (activeAdminTab === "noticias") {
            console.log("Filtering NOTÍCIAS - excluding documents");
            // Show only news articles (exclude documents)
            query = query.not('type', 'in', ['Artigo Técnico', 'Estudo', 'Pesquisa', 'Relatório', 'PDF', 'Documento', 'document', 'Artigo Científico']);
        } else {
            console.log("Filtering ARTIGOS - showing only documents");
            // Show only documents and articles
            query = query.in('type', ['Artigo Técnico', 'Estudo', 'Pesquisa', 'Relatório', 'PDF', 'Documento', 'document', 'Artigo Científico']);
        }

        const { data, error } = await query;

        console.log("Fetch result:", { error, count: data?.length || 0 });
        if (data) {
            console.log("Articles found:");
            data.forEach(article => {
                console.log(`- [${article.deleted_at ? 'DELETED' : 'ACTIVE'}] ${article.title} (ID: ${article.id})`);
            });
        }

        if (error) console.error(error);
        else setArticles(data || []);
        setLoading(false);
        console.log("=== END FETCH DEBUG ===");
    }

    useEffect(() => {
        fetchArticles();
    }, [showBin, activeAdminTab]);

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        console.log("=== DELETE DEBUG ===");
        console.log("Item to delete:", itemToDelete);
        console.log("Show bin:", showBin);
        console.log("Item ID:", itemToDelete.id);
        console.log("Item current deleted_at:", itemToDelete.deleted_at);

        try {
            if (showBin) {
                // Hard Delete (Permanent) for items already in Bin
                console.log("Performing HARD DELETE...");
                const { error, count } = await supabase
                    .from('articles')
                    .delete({ count: 'exact' })
                    .eq('id', itemToDelete.id);

                console.log("Hard delete result:", { error, count });
                if (error) throw error;
                if (count === 0) throw new Error("Permissão negada ou item não encontrado.");
                
                // Add to undo history
                addAction({
                    type: 'delete',
                    tableName: 'articles',
                    data: itemToDelete,
                    description: `Eliminado permanentemente: ${itemToDelete.title}`
                });
                
                toast.success("Artigo eliminado permanentemente!");
            } else {
                // Soft Delete (Move to Bin) for active items
                console.log("Performing SOFT DELETE...");
                const deleteTime = new Date().toISOString();
                console.log("Setting deleted_at to:", deleteTime);
                
                const { error, count } = await supabase
                    .from('articles')
                    .update({ deleted_at: deleteTime }, { count: 'exact' })
                    .eq('id', itemToDelete.id);

                console.log("Soft delete result:", { error, count });
                if (error) {
                    console.error("Soft delete error:", error);
                    throw error;
                }
                if (count === 0) {
                    console.error("No rows affected - count is 0");
                    throw new Error("Permissão negada ou item não encontrado.");
                }
                
                // Add to undo history
                addAction({
                    type: 'delete',
                    tableName: 'articles',
                    data: { ...itemToDelete, deleted_at: null },
                    description: `Movido para lixeira: ${itemToDelete.title}`
                });
                
                toast.success("Artigo movido para a lixeira!");
            }

            console.log("Delete completed, fetching articles...");
            await fetchArticles();
            console.log("=== END DELETE DEBUG ===");
        } catch (error: any) {
            console.error("Delete failed:", error);
            toast.error(error.message || "Erro ao eliminar artigo");
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
            
            // Add to undo history
            addAction({
                type: 'restore',
                tableName: 'articles',
                data: article,
                description: `Restaurado: ${article.title}`
            });
            
            toast.success("Artigo restaurado com sucesso!");
            await fetchArticles();
        } catch (error: any) {
            toast.error(error.message || "Erro ao restaurar artigo");
            console.error("Restore failed:", error);
        }
    };

    const handleEmptyBin = async () => {
        try {
            const { error, count } = await supabase
                .from('articles')
                .delete({ count: 'exact' })
                .not('deleted_at', 'is', null);

            if (error) throw error;
            
            toast.success(`Lixeira esvaziada! ${count} artigo(s) eliminado(s) permanentemente.`);
            await fetchArticles();
        } catch (error: any) {
            toast.error(error.message || "Erro ao esvaziar lixeira");
            console.error("Empty bin failed:", error);
        }
    };

    const handleDelete = (row: any) => {
        setItemToDelete(row);
        setShowDeleteConfirm(true);
    };

    const handleUndo = async (action: any) => {
        try {
            if (action.type === 'delete') {
                // Restore the deleted item
                const { error } = await supabase
                    .from('articles')
                    .insert([action.data]);

                if (error) throw error;
            } else if (action.type === 'restore') {
                // Move back to bin
                const { error } = await supabase
                    .from('articles')
                    .update({ deleted_at: action.data.deleted_at })
                    .eq('id', action.data.id);

                if (error) throw error;
            }
            
            await fetchArticles();
        } catch (error) {
            console.error("Undo operation failed:", error);
            throw error;
        }
    };

    const handleRedo = async (action: any) => {
        try {
            if (action.type === 'delete') {
                // Delete again
                if (action.data.deleted_at === null) {
                    // Soft delete
                    await supabase
                        .from('articles')
                        .update({ deleted_at: new Date().toISOString() })
                        .eq('id', action.data.id);
                } else {
                    // Hard delete
                    await supabase
                        .from('articles')
                        .delete()
                        .eq('id', action.data.id);
                }
            } else if (action.type === 'restore') {
                // Restore again
                await supabase
                    .from('articles')
                    .update({ deleted_at: null })
                    .eq('id', action.data.id);
            }
            
            await fetchArticles();
        } catch (error) {
            console.error("Redo operation failed:", error);
            throw error;
        }
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

            {/* Admin Tabs */}
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit">
                <button
                    onClick={() => setActiveAdminTab("noticias")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeAdminTab === "noticias"
                            ? "bg-emerald-600 text-white shadow-lg"
                            : "text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    <List className="w-4 h-4" />
                    Notícias
                </button>
                <button
                    onClick={() => setActiveAdminTab("artigos")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeAdminTab === "artigos"
                            ? "bg-emerald-600 text-white shadow-lg"
                            : "text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    <FileText className="w-4 h-4" />
                    Artigos & Documentos
                </button>
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
                    <div className="relative">
                        <button
                            onClick={() => setShowBin(true)}
                            onMouseEnter={() => setShowBinDropdown(true)}
                            onMouseLeave={() => setShowBinDropdown(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${showBin ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                            <Trash2 className="w-4 h-4" />
                            Lixeira
                        </button>
                        {showBinDropdown && (
                            <div 
                                className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10 min-w-[160px]"
                                onMouseEnter={() => setShowBinDropdown(true)}
                                onMouseLeave={() => setShowBinDropdown(false)}
                            >
                                <button
                                    onClick={() => {
                                        setShowEmptyBinConfirm(true);
                                        setShowBinDropdown(false);
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                    <Trash className="w-4 h-4" />
                                    Esvaziar Lixeira
                                </button>
                            </div>
                        )}
                    </div>
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
                            isDeleted={showBin}
                            onEdit={() => {
                                setEditingItem(article);
                                setShowForm(true);
                            }}
                            onDelete={() => handleDelete(article)}
                            onRestore={() => handleRestore(article)}
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

            <ConfirmationModal
                isOpen={showEmptyBinConfirm}
                onClose={() => setShowEmptyBinConfirm(false)}
                onConfirm={handleEmptyBin}
                title="Esvaziar Lixeira"
                description="Tem a certeza que deseja eliminar PERMANENTEMENTE todos os artigos na lixeira? Esta acção NÃO pode ser desfeita."
                confirmLabel="Esvaziar Lixeira"
                variant="destructive"
            />
        </div>
    );
}
