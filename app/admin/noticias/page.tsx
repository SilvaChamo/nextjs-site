"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Pencil, Trash2, Calendar, Link as LinkIcon, Search } from "lucide-react";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Input } from "@/components/ui/input";

export default function AdminNoticiasPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<null | any>(null);

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

    const handleDelete = async (id: string) => {
        if (!confirm("Tem a certeza que deseja eliminar este artigo?")) return;

        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id);

        if (!error) fetchArticles();
    };

    const handleEdit = (article: any) => {
        setEditingArticle(article);
        setIsFormOpen(true);
    };

    const handleSuccess = () => {
        fetchArticles();
        setEditingArticle(null);
    };

    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.type?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Gestão de Notícias</h1>
                    <p className="text-slate-500">Publique e gira conteúdos, artigos e actualizações.</p>
                </div>
                <Button onClick={() => { setEditingArticle(null); setIsFormOpen(true); }} className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Artigo
                </Button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Pesquisar notícias..."
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
                    Nenhum artigo encontrado.
                </div>
            ) : viewMode === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <div key={article.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                {article.image_url ? (
                                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <div className="bg-slate-200/50 p-4 rounded-full">
                                            <LayoutGrid className="w-8 h-8 opacity-50" />
                                        </div>
                                    </div>
                                )}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 backdrop-blur text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-white/20 shadow-sm">
                                        {article.type || 'Geral'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(article.date || article.created_at).toLocaleDateString()}
                                </div>
                                <h3 className="font-bold text-slate-800 leading-tight mb-2 line-clamp-2 min-h-[40px]">
                                    {article.title}
                                </h3>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-emerald-600" onClick={() => window.open(`/artigo/${article.slug}`, '_blank')}>
                                        <LinkIcon className="w-4 h-4" />
                                    </Button>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleEdit(article)}>
                                            <Pencil className="w-3.5 h-3.5 text-slate-600" />
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200" onClick={() => handleDelete(article.id)}>
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                            <Button size="sm" variant="ghost" onClick={() => handleDelete(article.id)}>
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
        </div>
    );
}
