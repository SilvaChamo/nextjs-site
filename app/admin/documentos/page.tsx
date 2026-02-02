"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid, List, Search, FileText, Scale, Calendar, Link as LinkIcon, Pencil, Trash2, Layers } from "lucide-react";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { DocumentCard } from "@/components/admin/DocumentCard";

import { useRouter } from "next/navigation";

export default function AdminDocumentosPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [activeTab, setActiveTab] = useState('todos');
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editingArticle, setEditingArticle] = useState<null | any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [docToDelete, setDocToDelete] = useState<any>(null);
    const [showBin, setShowBin] = useState(false);
    const [showEmptyBinConfirm, setShowEmptyBinConfirm] = useState(false);

    const tabs = [
        { id: 'todos', label: 'Todos', icon: Layers, types: [] },
        { id: 'relatorios', label: 'Relatórios', icon: FileText, types: ['Relatório', 'Relatórios'] },
        { id: 'legislacao', label: 'Legislação', icon: Scale, types: ['Legislação', 'Políticas Agrárias'] },
        { id: 'outros', label: 'Outros Documentos', icon: Layers, types: ['Documento', 'document', 'PDF', 'Artigo Técnico'] },
    ];

    const fetchArticles = async () => {
        setLoading(true);
        // Collect all types from all tabs
        const allTypes = tabs.flatMap(t => t.types);

        let query = supabase
            .from('articles')
            .select('*')
            .in('type', allTypes)
            .order('created_at', { ascending: false });

        if (showBin) {
            query = query.not('deleted_at', 'is', null);
        } else {
            query = query.is('deleted_at', null);
        }

        const { data, error } = await query;

        if (error) {
            console.error(error);
            toast.error("Erro ao carregar documentos");
        } else {
            setArticles(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    }, [showBin]);

    const confirmDelete = async () => {
        if (!docToDelete) return;

        try {
            if (showBin) {
                // Hard Delete
                const { error } = await supabase
                    .from('articles')
                    .delete()
                    .eq('id', docToDelete.id);
                if (error) throw error;
                toast.success("Documento eliminado permanentemente!");
            } else {
                // Soft Delete
                const { error } = await supabase
                    .from('articles')
                    .update({ deleted_at: new Date().toISOString() })
                    .eq('id', docToDelete.id);
                if (error) throw error;
                toast.success("Documento movido para a lixeira!");
            }
            await fetchArticles();
        } catch (error: any) {
            toast.error("Erro ao eliminar documento");
        } finally {
            setShowDeleteConfirm(false);
            setDocToDelete(null);
        }
    };

    const handleRestore = async (article: any) => {
        try {
            const { error } = await supabase
                .from('articles')
                .update({ deleted_at: null })
                .eq('id', article.id);

            if (error) throw error;
            toast.success("Documento restaurado com sucesso!");
            await fetchArticles();
        } catch (error: any) {
            toast.error("Erro ao restaurar documento");
        }
    };

    const handleEmptyBin = async () => {
        try {
            const allTypes = tabs.flatMap(t => t.types);
            const { error } = await supabase
                .from('articles')
                .delete()
                .not('deleted_at', 'is', null)
                .in('type', allTypes);

            if (error) throw error;
            toast.success("Lixeira esvaziada com sucesso!");
            await fetchArticles();
        } catch (error: any) {
            toast.error("Erro ao esvaziar lixeira");
        } finally {
            setShowEmptyBinConfirm(false);
        }
    };

    const handleDelete = (article: any) => {
        setDocToDelete(article);
        setShowDeleteConfirm(true);
    };

    const handleEdit = (article: any) => {
        router.push(`/admin/documentos/${article.id}`);
    };


    const filteredArticles = articles.filter(a => {
        const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase());

        if (activeTab === 'todos') return matchesSearch;

        const activeTabObj = tabs.find(t => t.id === activeTab);
        const matchesType = activeTabObj ? activeTabObj.types.includes(a.type) : false;
        return matchesSearch && matchesType;
    });

    const columns = [
        {
            header: "Documento",
            key: "title",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 flex items-center justify-center">
                        {row.image_url ? (
                            <img src={row.image_url} className="w-full h-full object-cover" alt={val} />
                        ) : (
                            <FileText className="w-4 h-4 text-slate-300" />
                        )}
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-800 line-clamp-1 text-sm">{val}</span>
                        {row.subtitle && (
                            <span className="text-[10px] text-slate-500 line-clamp-1">{row.subtitle}</span>
                        )}
                        {row.source && (
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider mt-0.5">{row.source}</span>
                        )}
                    </div>
                </div>
            )
        },
        {
            header: "Tipo",
            key: "type",
            render: (val: string) => (
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                    {val}
                </span>
            )
        },
        {
            header: "Data",
            key: "date",
            render: (val: string, row: any) => (
                <span className="text-slate-500 font-medium text-xs">
                    {new Date(val || row.created_at).toLocaleDateString()}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Documentos</h1>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3">
                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder={`Pesquisar...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 h-10 bg-white border-slate-200"
                        />
                    </div>

                    {/* Category Selector */}
                    <select
                        value={activeTab}
                        onChange={(e) => {
                            setActiveTab(e.target.value);
                            setShowBin(false);
                        }}
                        className="bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide rounded-lg px-4 py-2 outline-none focus:border-emerald-500 h-10 w-full md:w-40"
                    >
                        {tabs.map(tab => (
                            <option key={tab.id} value={tab.id}>{tab.label}</option>
                        ))}
                    </select>

                    {/* Bin Button */}
                    <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setShowBin(!showBin)}
                            className={`p-2 rounded-md transition-all ${showBin ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Lixeira"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    {/* View Mode */}
                    <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Vista de Grelha"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Vista de Lista"
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    <Button
                        onClick={() => router.push('/admin/documentos/novo')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs h-10 px-6 rounded-lg gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Novo Documento
                    </Button>
                </div>
            </div>

            {/* Bin Actions */}
            {showBin && (
                <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Trash2 className="w-4 h-4 text-rose-600" />
                            <span className="text-sm font-semibold text-slate-700">Lixeira Activada</span>
                            <span className="text-xs text-slate-500">({filteredArticles.length} itens)</span>
                        </div>
                        <button
                            onClick={() => setShowEmptyBinConfirm(true)}
                            className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-md border border-red-200 transition-all flex items-center gap-1.5"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Esvaziar Lixeira
                        </button>
                    </div>
                </div>
            )}

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
            ) : filteredArticles.length === 0 ? (
                <div className="text-center py-20 text-slate-400 italic font-medium">Nenhum documento encontrado nesta categoria.</div>
            ) : viewMode === 'grid' ? (
                // GRID VIEW (Now Stacked for Documents)
                <div className="flex flex-col gap-4">
                    {filteredArticles.map((article) => (
                        <DocumentCard
                            key={article.id}
                            title={article.title}
                            subtitle={article.subtitle}
                            category={article.type}
                            date={article.date || article.created_at}
                            source={article.source}
                            sourceUrl={article.source_url}
                            slug={article.slug}
                            isDeleted={showBin}
                            onRestore={() => handleRestore(article)}
                            onEdit={() => handleEdit(article)}
                            onDelete={() => handleDelete(article)}
                        />
                    ))}
                </div>
            ) : (
                // LIST VIEW
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                    <AdminDataTable
                        title={tabs.find(t => t.id === activeTab)?.label || "Documentos"}
                        columns={columns}
                        data={filteredArticles}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            )}


            <ConfirmationModal
                key={showBin ? 'perm' : 'soft'}
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title={showBin ? "Eliminar Permanentemente" : "Mover para Lixeira"}
                description={
                    showBin
                        ? `Tem a certeza que deseja eliminar PERMANENTEMENTE o documento "${docToDelete?.title}"? Esta acção NÃO pode ser desfeita.`
                        : `O documento "${docToDelete?.title}" será movido para a lixeira. Poderá restaurá-lo mais tarde.`
                }
                confirmLabel={showBin ? "Eliminar de vez" : "Mover para Lixeira"}
                variant="destructive"
            />

            <ConfirmationModal
                isOpen={showEmptyBinConfirm}
                onClose={() => setShowEmptyBinConfirm(false)}
                onConfirm={handleEmptyBin}
                title="Esvaziar Lixeira"
                description="Tem a certeza que deseja eliminar PERMANENTEMENTE todos os documentos na lixeira? Esta acção NÃO pode ser desfeita."
                confirmLabel="Esvaziar Lixeira"
                variant="destructive"
            />
        </div>
    );
}
