"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Pencil, Trash2, Calendar, Link as LinkIcon, Search, FileText, Globe, BookOpen, Lightbulb, RotateCcw, Users, Archive, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { NewsCard } from "@/components/NewsCard";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { useRouter } from "next/navigation";

export default function AdminNoticiasPage() {
    const router = useRouter();
    const supabase = createClient();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState('Todas');
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editingArticle, setEditingArticle] = useState<null | any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<'active' | 'archived' | 'deleted'>('active');
    const [showEmptyBinConfirm, setShowEmptyBinConfirm] = useState(false);

    const tabs = [
        { id: 'Todas', label: 'Todas', icon: List },
        { id: 'Notícia', label: 'Notícias', icon: FileText },
        { id: 'Mulher Agro', label: 'Mulher Agro', icon: Users },
        { id: 'Guia', label: 'Guias', icon: BookOpen },
        { id: 'Dicas', label: 'Dicas', icon: Lightbulb },
        { id: 'Internacional', label: 'Internacional', icon: Globe },
    ];

    const fetchArticles = async () => {
        setLoading(true);
        let query = supabase
            .from('articles')
            .select('*')
            .in('type', ['Notícia', 'Guia', 'Dicas', 'Internacional', 'Mulher Agro', 'Oportunidade', 'Evento', 'Recursos', 'Curiosidade'])
            .order('created_at', { ascending: false });

        try {
            if (statusFilter === 'deleted') {
                query = query.not('deleted_at', 'is', null);
            } else if (statusFilter === 'archived') {
                query = query.is('deleted_at', null).eq('status', 'inactive');
            } else {
                query = query.is('deleted_at', null).or('status.eq.active,status.is.null');
            }

            const { data, error } = await query;
            if (error) {
                // If status column doesn't exist, we fallback to only active/deleted via deleted_at
                if (error.code === '42703') {
                    console.warn("Status column missing, falling back to basic deleted_at filtering");
                    let fallbackQuery = supabase
                        .from('articles')
                        .select('*')
                        .in('type', ['Notícia', 'Guia', 'Dicas', 'Internacional', 'Mulher Agro', 'Oportunidade', 'Evento', 'Recursos', 'Curiosidade'])
                        .order('created_at', { ascending: false });

                    if (statusFilter === 'deleted') {
                        fallbackQuery = fallbackQuery.not('deleted_at', 'is', null);
                    } else {
                        fallbackQuery = fallbackQuery.is('deleted_at', null);
                    }
                    const { data: fallbackData, error: fallbackError } = await fallbackQuery;
                    if (fallbackError) throw fallbackError;
                    setArticles(fallbackData || []);
                } else {
                    throw error;
                }
            } else {
                setArticles(data || []);
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Erro ao carregar artigos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [statusFilter]);

    const confirmDelete = async () => {
        if (!articleToDelete) return;

        try {
            if (statusFilter === 'deleted') {
                // Hard Delete
                const { error } = await supabase.from('articles').delete().eq('id', articleToDelete.id);
                if (error) throw error;
                toast.success("Artigo eliminado permanentemente!");
            } else {
                // Soft Delete
                const { error } = await supabase.from('articles').update({ deleted_at: new Date().toISOString() }).eq('id', articleToDelete.id);
                if (error) throw error;
                toast.success("Artigo movido para a lixeira!");
            }
            await fetchArticles();
        } catch (error: any) {
            toast.error(error.message || "Erro ao eliminar artigo");
        } finally {
            setShowDeleteConfirm(false);
            setArticleToDelete(null);
        }
    };

    const handleArchive = async (article: any) => {
        const newStatus = statusFilter === 'archived' ? 'active' : 'inactive';
        try {
            const { error } = await supabase.from('articles').update({ status: newStatus }).eq('id', article.id);
            if (error) {
                if (error.code === '42703') {
                    toast.error("Esta acção requer a coluna 'status' na base de dados.");
                } else {
                    throw error;
                }
            } else {
                toast.success(newStatus === 'inactive' ? "Item arquivado" : "Item restaurado");
                await fetchArticles();
            }
        } catch (error: any) {
            toast.error("Erro ao arquivar/restaurar");
        }
    };

    const handleRestoreAll = async () => {
        try {
            let updatePayload: any = { deleted_at: null };
            if (statusFilter === 'archived') updatePayload = { status: 'active' };

            let query = supabase.from('articles').update(updatePayload);
            if (statusFilter === 'deleted') query = query.not('deleted_at', 'is', null);
            else if (statusFilter === 'archived') query = query.eq('status', 'inactive');

            const { error } = await query;
            if (error) throw error;
            toast.success("Todos os itens restaurados!");
            await fetchArticles();
        } catch (error: any) {
            toast.error("Erro ao restaurar todos");
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
            toast.error(error.message || "Erro ao restaurar artigo");
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
        }
    };

    const confirmBulkDelete = async () => {
        const previousArticles = [...articles];
        try {
            // Optimistic update
            setArticles(prev => prev.filter(a => !selectedIds.includes(a.id)));

            const { error } = await supabase
                .from('articles')
                .delete()
                .in('id', selectedIds);

            if (error) throw error;

            toast.success(`${selectedIds.length} artigos eliminados!`);
            setSelectedIds([]);
        } catch (error: any) {
            setArticles(previousArticles);
            toast.error("Erro na eliminação em massa: " + error.message);
        } finally {
            setShowBulkDeleteConfirm(false);
        }
    };

    const handleDelete = (article: any) => {
        setArticleToDelete(article);
        setShowDeleteConfirm(true);
    };

    const handleEdit = (article: any) => {
        router.push(`/admin/noticias/${article.id}`);
    };


    const filteredArticles = articles.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.type?.toLowerCase().includes(search.toLowerCase());

        let matchesType = false;

        if (activeTab === 'Todas') {
            matchesType = true;
        } else if (activeTab === 'Notícia') {
            // Strict check for Notícia
            matchesType = a.type === 'Notícia';
        } else {
            matchesType = a.type === activeTab;
        }

        return matchesSearch && matchesType;
    });

    const columns = [
        {
            header: "Artigo",
            key: "title",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        {row.image_url && <img src={row.image_url} className="w-full h-full object-cover" />}
                    </div>
                    <span className="font-semibold text-slate-700 line-clamp-1">{val}</span>
                </div>
            )
        },
        {
            header: "Categoria",
            key: "type",
            render: (val: string) => (
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                    {val || 'Geral'}
                </span>
            )
        },
        {
            header: "Data",
            key: "date",
            render: (val: string, row: any) => new Date(val || row.created_at).toLocaleDateString()
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Gestão de Notícias</h1>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3">
                    {/* Category Selector */}
                    <select
                        value={activeTab}
                        onChange={(e) => {
                            setActiveTab(e.target.value);
                            setStatusFilter('active');
                            if (viewMode === 'list') setViewMode('list'); // Keep current view or force? Standard says keep.
                        }}
                        className="bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide rounded-lg px-4 py-2 outline-none focus:border-emerald-500 h-10 w-full md:w-40"
                    >
                        {tabs.map(tab => (
                            <option key={tab.id} value={tab.id}>{tab.label}</option>
                        ))}
                    </select>

                    {/* Search Input */}
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <Input
                            placeholder="Buscar notícias..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-10 bg-white border-slate-200 text-sm"
                        />
                    </div>

                    {/* Status Toggles (Active / Archived / Deleted) */}
                    <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setStatusFilter('active')}
                            className={`p-2 rounded-md transition-all ${statusFilter === 'active' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Activos"
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setStatusFilter('archived')}
                            className={`p-2 rounded-md transition-all ${statusFilter === 'archived' ? 'bg-amber-50 text-amber-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Arquivados"
                        >
                            <Archive className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setStatusFilter('deleted')}
                            className={`p-2 rounded-md transition-all ${statusFilter === 'deleted' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Lixeira"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Maintenance Menu */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all shadow-sm">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-56 p-1 bg-white border border-slate-200 shadow-lg rounded-md z-50">
                            <div className="flex flex-col">
                                <button
                                    onClick={handleRestoreAll}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 w-full text-left rounded-sm font-medium transition-colors"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Restaurar Tudo
                                </button>
                                {statusFilter === 'deleted' && (
                                    <button
                                        onClick={() => setShowEmptyBinConfirm(true)}
                                        className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 w-full text-left rounded-sm font-medium transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Esvaziar Lixeira
                                    </button>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* View Toggles */}
                    <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    <Button
                        onClick={() => router.push('/admin/noticias/novo')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-[10px] h-10 px-4 rounded-lg gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Novo Artigo
                    </Button>
                </div>
            </div>

            {/* Bin Banner (Optional) */}
            {statusFilter === 'deleted' && filteredArticles.length > 0 && (
                <div className="bg-rose-50 border border-rose-100 rounded-lg p-3 flex items-center justify-between text-rose-700">
                    <div className="flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Você está visualizando a lixeira ({filteredArticles.length} itens)</span>
                    </div>
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
            ) : filteredArticles.length === 0 ? (
                <div className="text-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
                    <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center">
                            <FileText className="w-8 h-8 text-slate-200" />
                        </div>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1">
                        {statusFilter === 'deleted' ? "Lixeira vazia" : statusFilter === 'archived' ? "Arquivo vazio" : "Nenhuma notícia encontrado"}
                    </h3>
                    <p className="text-sm text-slate-400 italic max-w-xs mx-auto">
                        {statusFilter === 'deleted' ? "Não há itens na lixeira." : statusFilter === 'archived' ? "Não há notícias arquivadas." : "Comece adicionando uma nova notícia ou altere os filtros."}
                    </p>
                </div>
            ) : viewMode === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <NewsCard
                            key={article.id}
                            title={article.title}
                            subtitle={article.subtitle}
                            category={article.type}
                            date={article.date || article.created_at}
                            image={article.image_url}
                            slug={article.slug}
                            isAdmin={true}
                            isDeleted={statusFilter === 'deleted'}
                            onRestore={() => handleRestore(article)}
                            onEdit={() => handleEdit(article)}
                            onArchive={() => handleArchive(article)}
                            onDelete={() => handleDelete(article)}
                        />
                    ))}
                    {/* Add New Card (Only in Active Mode) */}
                    {statusFilter === 'active' && (
                        <button
                            onClick={() => router.push('/admin/noticias/novo')}
                            className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group min-h-[400px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="font-bold text-slate-400 group-hover:text-emerald-600">Novo Artigo</span>
                        </button>
                    )}
                </div>
            ) : (
                // List View
                <AdminDataTable
                    title={activeTab}
                    columns={columns}
                    data={filteredArticles}
                    loading={loading}
                    hideSearch={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    selectedIds={selectedIds}
                    onSelectRow={(id: string, selected: boolean) => {
                        if (selected) setSelectedIds(prev => [...prev, id]);
                        else setSelectedIds(prev => prev.filter(i => i !== id));
                    }}
                    onSelectAll={(all: boolean) => {
                        if (all) {
                            setSelectedIds(filteredArticles.map(r => r.id));
                        } else {
                            setSelectedIds([]);
                        }
                    }}
                    bulkActions={
                        selectedIds.length > 0 && (
                            <Button
                                onClick={() => setShowBulkDeleteConfirm(true)}
                                variant="outline"
                                className="bg-white/10 text-white hover:bg-white/20 border-white/20 h-8 text-xs font-bold uppercase tracking-wider gap-2"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                {statusFilter === 'deleted' ? 'Eliminar' : 'Reciclar'} ({selectedIds.length})
                            </Button>
                        )
                    }
                    headerMenu={
                        statusFilter === 'deleted' && filteredArticles.length > 0 ? (
                            <div className="flex flex-col">
                                <button
                                    onClick={() => setShowEmptyBinConfirm(true)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 w-full text-left rounded-sm font-medium transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Esvaziar Lixeira
                                </button>
                            </div>
                        ) : null
                    }
                    customActions={(row) => {
                        if (statusFilter === 'deleted') {
                            return (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleRestore(row); }}
                                    className="size-7 rounded text-slate-400 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-all font-bold"
                                    title="Restaurar"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            );
                        }
                        return (
                            <button
                                onClick={(e) => { e.stopPropagation(); handleArchive(row); }}
                                className="size-7 rounded text-slate-400 flex items-center justify-center hover:bg-amber-50 hover:text-amber-600 transition-all font-bold"
                                title={statusFilter === 'archived' ? "Restaurar" : "Arquivar"}
                            >
                                {statusFilter === 'archived' ? <RotateCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                            </button>
                        );
                    }}
                    hideHeader={true}
                    pageSize={50}
                />
            )}

            {/* Modal de Confirmação para Eliminação */}
            <ConfirmationModal
                key={statusFilter === 'deleted' ? 'perm' : 'soft'}
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title={statusFilter === 'deleted' ? "Eliminar Permanentemente" : "Mover para Lixeira"}
                description={
                    statusFilter === 'deleted'
                        ? `Tem a certeza que deseja eliminar PERMANENTEMENTE o artigo "${articleToDelete?.title}"? Esta acção NÃO pode ser desfeita.`
                        : `O artigo "${articleToDelete?.title}" será movido para a lixeira. Poderá restaurá-lo mais tarde.`
                }
                confirmLabel={statusFilter === 'deleted' ? "Eliminar de vez" : "Mover para Lixeira"}
                variant="destructive"
            />

            {/* Modal de Confirmação para Esvaziar Lixeira */}
            <ConfirmationModal
                isOpen={showEmptyBinConfirm}
                onClose={() => setShowEmptyBinConfirm(false)}
                onConfirm={handleEmptyBin}
                title="Esvaziar Lixeira"
                description="Tem a certeza que deseja eliminar PERMANENTEMENTE todos os itens da lixeira? Esta acção não pode ser desfeita."
                confirmLabel="Esvaziar agora"
                variant="destructive"
            />

            {/* Modal de Confirmação para Eliminação em Massa */}
            <ConfirmationModal
                isOpen={showBulkDeleteConfirm}
                onClose={() => setShowBulkDeleteConfirm(false)}
                onConfirm={confirmBulkDelete}
                title={statusFilter === 'deleted' ? "Eliminar Itens" : "Mover para Lixeira"}
                description={`Tem a certeza que deseja ${statusFilter === 'deleted' ? 'eliminar permanentemente' : 'mover para a lixeira'} os ${selectedIds.length} itens seleccionados?`}
                confirmLabel={statusFilter === 'deleted' ? "Eliminar tudo" : "Reciclar seleccionados"}
                variant="destructive"
            />
        </div>
    );
}
