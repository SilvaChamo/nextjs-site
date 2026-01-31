"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Pencil, Trash2, Calendar, Link as LinkIcon, Search, FileText, Globe, BookOpen, Lightbulb } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { NewsCard } from "@/components/NewsCard";

export default function AdminNoticiasPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState('Notícia');
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<null | any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState<any>(null);

    const tabs = [
        { id: 'Notícia', label: 'Notícias', icon: FileText },
        { id: 'Guia', label: 'Guias', icon: BookOpen },
        { id: 'Dicas', label: 'Dicas', icon: Lightbulb },
        { id: 'Internacional', label: 'Internacional', icon: Globe },
    ];

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('articles')
            .select('*')
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
            // Optional: refetch to be absolutely sure
            // fetchArticles(); 
        } catch (error: any) {
            setArticles(previousArticles);
            toast.error("Erro ao eliminar: " + error.message);
        } finally {
            setShowDeleteConfirm(false);
            setArticleToDelete(null);
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
        const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
            a.type?.toLowerCase().includes(search.toLowerCase());
        const matchesType = activeTab === 'Notícia'
            ? (a.type === 'Notícia' || !a.type) // Default to Notícia if null
            : a.type === activeTab;

        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão de Notícias</h1>
                    <p className="text-slate-500">Publique e gira conteúdos, artigos e actualizações.</p>
                </div>
                <Button onClick={() => { setEditingArticle(null); setIsFormOpen(true); }} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Artigo
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                            : 'text-slate-400 hover:bg-slate-50'
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder={`Pesquisar em ${activeTab}...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 border-none bg-slate-50 focus-visible:ring-0"
                    />
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

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
            ) : filteredArticles.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                    Nenhum conteúdo encontrado nesta categoria.
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
                                <th className="px-6 py-4">Artigo</th>
                                <th className="px-6 py-4">Categoria</th>
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
                                            </div>
                                            <span className="font-semibold text-slate-700 line-clamp-1">{article.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                                            {article.type || 'Geral'}
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
                title="Eliminar Artigo"
                description={`Tem a certeza que deseja eliminar o artigo "${articleToDelete?.title}"? Esta ação não pode ser desfeita.`}
                confirmLabel="Eliminar"
                variant="destructive"
            />
        </div>
    );
}
