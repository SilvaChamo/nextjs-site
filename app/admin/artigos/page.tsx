"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Pencil, Trash2, Calendar, Link as LinkIcon, Search, GraduationCap, FileText, BookOpen, Layers } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Input } from "@/components/ui/input";
import { NewsCard } from "@/components/NewsCard";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export default function AdminArtigosCientificosPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState('Dissertações');
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<null | any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const tabs = [
        { id: 'Dissertações', label: 'Dissertações', icon: GraduationCap },
        { id: 'Documento', label: 'Documentos', icon: FileText },
        { id: 'Artigos', label: 'Artigos Científicos', icon: FileText },
        { id: 'Livros', label: 'Livros & Manuais', icon: BookOpen },
        { id: 'Outros', label: 'Outros', icon: Layers },
    ];

    const fetchArticles = async () => {
        setLoading(true);
        // Fetch items where type matches one of our tabs
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .in('type', tabs.map(t => t.id))
            .order('created_at', { ascending: false });

        if (data) setArticles(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const confirmDelete = async () => {
        if (!articleToDelete) return;
        const previousArticles = [...articles];

        try {
            // Optimistic update
            setArticles(prev => prev.filter(a => a.id !== articleToDelete.id));

            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', articleToDelete.id);

            if (error) throw error;
            toast.success("Artigo eliminado!");
        } catch (error: any) {
            setArticles(previousArticles);
            toast.error("Erro ao eliminar: " + error.message);
        } finally {
            setShowDeleteConfirm(false);
            setArticleToDelete(null);
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

            toast.success(`${selectedIds.length} documentos eliminados!`);
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
        setEditingArticle(article);
        setIsFormOpen(true);
    };

    const handleSuccess = () => {
        fetchArticles();
        setEditingArticle(null);
    };

    const filteredArticles = articles.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());
        const matchesType = a.type === activeTab;
        return matchesSearch && matchesType;
    });

    const columns = [
        {
            header: "Título",
            key: "title",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                        {row.image_url && <img src={row.image_url} className="w-full h-full object-cover" />}
                        {!row.image_url && <div className="w-full h-full flex items-center justify-center"><GraduationCap className="w-4 h-4 text-slate-300" /></div>}
                    </div>
                    <span className="font-semibold text-slate-700 line-clamp-1">{val}</span>
                </div>
            )
        },
        {
            header: "Tipo",
            key: "type",
            render: (val: string) => (
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                    {val}
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
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Artigos Científicos</h1>
                </div>
                <Button onClick={() => { setEditingArticle({ type: activeTab }); setIsFormOpen(true); }} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Científico
                </Button>
            </div>

            {/* Toolbar - Merged Tabs and Controls */}
            <div className="flex items-center gap-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                {/* Tabs */}
                <div className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-emerald-600 text-white'
                                : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-2 ml-auto">
                    {/* Search */}
                    <div className="relative w-48 lg:w-64">
                        <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                        <Input
                            placeholder={`Pesquisar...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-8 h-8 border-none bg-slate-50 focus-visible:ring-0 text-xs"
                        />
                    </div>

                    <div className="w-px h-4 bg-slate-200 mx-1"></div>

                    {/* View Mode */}
                    <div className="flex items-center gap-0.5 bg-slate-50 p-0.5 rounded-md border border-slate-100">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
            ) : filteredArticles.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                    Nenhum documento encontrado nesta categoria.
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
                            onEdit={() => handleEdit(article)}
                            onDelete={() => handleDelete(article)}
                        />
                    ))}
                </div>
            ) : (
                // List View
                <AdminDataTable
                    title={activeTab}
                    columns={columns}
                    data={filteredArticles}
                    loading={loading}
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
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setShowBulkDeleteConfirm(true)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                title="Eliminar seleccionados"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    }
                    hideHeader={true}
                    pageSize={50}
                />
            )}

            {/* Modal */}
            {isFormOpen && (
                <ArticleForm
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={handleSuccess}
                    initialData={editingArticle}
                />
            )}

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Eliminar Artigo"
                description={`Tem a certeza que deseja eliminar o artigo "${articleToDelete?.title}"? Esta acção não pode ser desfeita.`}
                confirmLabel="Eliminar"
                variant="destructive"
            />

            <ConfirmationModal
                isOpen={showBulkDeleteConfirm}
                onClose={() => setShowBulkDeleteConfirm(false)}
                onConfirm={confirmBulkDelete}
                title="Eliminar em Massa"
                description={`Tem a certeza que deseja eliminar ${selectedIds.length} documentos? Esta acção não pode ser desfeita.`}
                confirmLabel="Eliminar Todos"
                variant="destructive"
            />
        </div>
    );
}
