"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Pencil, Trash2, Calendar, Link as LinkIcon, Search, FileText, Scale } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { NewsCard } from "@/components/NewsCard";

export default function AdminDocumentosPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState('Relatórios');
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<null | any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [docToDelete, setDocToDelete] = useState<any>(null);

    const tabs = [
        { id: 'Relatórios', label: 'Relatórios', icon: FileText },
        { id: 'Políticas Agrárias', label: 'Políticas Agrárias', icon: Scale },
    ];

    const fetchArticles = async () => {
        setLoading(true);
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
        if (!docToDelete) return;
        const previousArticles = [...articles];

        try {
            // Optimistic update
            setArticles(prev => prev.filter(a => a.id !== docToDelete.id));

            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', docToDelete.id);

            if (error) throw error;
            toast.success("Documento eliminado!");
        } catch (error: any) {
            setArticles(previousArticles);
            toast.error("Erro ao eliminar: " + error.message);
        } finally {
            setShowDeleteConfirm(false);
            setDocToDelete(null);
        }
    };

    const handleDelete = (article: any) => {
        setDocToDelete(article);
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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Documentos & Políticas</h1>
                    <p className="text-slate-500">Gestão de relatórios, manuais e legislação.</p>
                </div>
                <Button onClick={() => { setEditingArticle({ type: activeTab }); setIsFormOpen(true); }} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Documento
                </Button>
            </div>

            {/* Toolbar - Merged Tabs and Controls */}
            <div className="flex items-center gap-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
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
                            <tab.icon className="w-3.5 h-3.5" />
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
                            placeholder="Pesquisar..."
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
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Título</th>
                                <th className="px-6 py-4">Tipo</th>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4 text-right">Acções</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredArticles.map((article) => (
                                <tr key={article.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 max-w-[400px]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                                                {article.image_url && <img src={article.image_url} className="w-full h-full object-cover" />}
                                                {!article.image_url && <div className="w-full h-full flex items-center justify-center"><FileText className="w-4 h-4 text-slate-300" /></div>}
                                            </div>
                                            <span className="font-semibold text-slate-700 line-clamp-1">{article.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                                            {article.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 font-medium">
                                        {new Date(article.date || article.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button size="sm" variant="ghost" onClick={() => handleEdit(article)}>
                                                <Pencil className="w-4 h-4 text-slate-400 hover:text-emerald-600" />
                                            </Button>
                                            <Button size="sm" variant="ghost" onClick={() => handleDelete(article)}>
                                                <Trash2 className="w-4 h-4 text-slate-400 hover:text-rose-600" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
                title="Eliminar Documento"
                description={`Tem a certeza que deseja eliminar o documento "${docToDelete?.title}"? Esta ação não pode ser desfeita.`}
                confirmLabel="Eliminar"
                variant="destructive"
            />
        </div>
    );
}
