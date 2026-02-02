"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus, Search, LayoutGrid, List, Layers, Briefcase, TrendingUp, Factory, BarChart3, Clock, MapPin, Tag, Trash2, User, Calendar, Laptop, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { TrainingForm } from "@/components/admin/TrainingForm";

export default function AdminFormacaoPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState('Todos');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showBin, setShowBin] = useState(false);
    const [showEmptyBinConfirm, setShowEmptyBinConfirm] = useState(false);

    const tabs = [
        { id: 'Todos', label: 'Todos', icon: Layers },
        { id: 'Tecnologia', label: 'Tecnologia', icon: GraduationCap },
        { id: 'Gestão', label: 'Gestão', icon: Briefcase },
        { id: 'Marketing', label: 'Marketing', icon: TrendingUp },
        { id: 'Produção', label: 'Produção', icon: Factory },
        { id: 'Financeiro', label: 'Financeiro', icon: BarChart3 },
        { id: 'Eventos', label: 'Eventos', icon: Calendar },
        { id: 'Workshop', label: 'Workshop', icon: Laptop },
    ];

    async function fetchData() {
        setLoading(true);
        let query = supabase
            .from('trainings')
            .select('*')
            .order('created_at', { ascending: false });

        if (showBin) {
            query = query.not('deleted_at', 'is', null);
        } else {
            query = query.is('deleted_at', null);
        }

        const { data, error } = await query;

        if (error) {
            console.error(error);
            toast.error("Erro ao carregar formações");
        } else {
            setData(data || []);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [showBin]);

    const filteredData = data.filter(item => {
        const instructorName = typeof item.instructor === 'object' ? item.instructor?.name : item.instructor;
        const matchesSearch = (item.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
            (instructorName?.toLowerCase() || "").includes(search.toLowerCase());
        const matchesCategory = activeTab === 'Todos' || item.category === activeTab;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = (row: any) => {
        setItemToDelete(row);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        try {
            if (showBin) {
                // Hard Delete
                const { error } = await supabase
                    .from('trainings')
                    .delete()
                    .eq('id', itemToDelete.id);
                if (error) throw error;
                toast.success("Formação eliminada permanentemente");
            } else {
                // Soft Delete
                const { error } = await supabase
                    .from('trainings')
                    .update({ deleted_at: new Date().toISOString() })
                    .eq('id', itemToDelete.id);
                if (error) throw error;
                toast.success("Formação movida para a lixeira");
            }
            await fetchData();
        } catch (error: any) {
            toast.error("Erro ao eliminar formação");
        } finally {
            setIsDeleteModalOpen(false);
            setItemToDelete(null);
        }
    };

    const handleRestore = async (item: any) => {
        try {
            const { error } = await supabase
                .from('trainings')
                .update({ deleted_at: null })
                .eq('id', item.id);

            if (error) throw error;
            toast.success("Formação restaurada com sucesso");
            await fetchData();
        } catch (error: any) {
            toast.error("Erro ao restaurar formação");
        }
    };

    const handleEmptyBin = async () => {
        try {
            const { error } = await supabase
                .from('trainings')
                .delete()
                .not('deleted_at', 'is', null);

            if (error) throw error;
            toast.success("Lixeira esvaziada com sucesso");
            await fetchData();
        } catch (error: any) {
            toast.error("Erro ao esvaziar lixeira");
        } finally {
            setShowEmptyBinConfirm(false);
        }
    };

    const columns = [
        { header: "Título da Formação", key: "title" },
        {
            header: "Categoria",
            key: "category",
            render: (val: string) => (
                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                    {val}
                </span>
            )
        },
        {
            header: "Formador",
            key: "instructor",
            render: (val: any) => {
                const name = typeof val === 'object' ? val.name : val;
                return (
                    <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-bold text-slate-700 truncate max-w-[120px]">
                            {name || 'Base Agro'}
                        </span>
                    </div>
                );
            }
        },
        {
            header: "Início",
            key: "date",
            render: (val: string) => <span className="font-bold text-slate-600 text-xs">{val}</span>
        },
        {
            header: "Preço",
            key: "price",
            render: (val: string) => <span className="text-emerald-600 font-bold text-xs">{val}</span>
        },
        {
            header: "Vagas",
            key: "spots_total",
            render: (val: any) => <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-black">{val} vagas</span>
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Gestão de Formações</h1>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3">
                    {/* Search */}
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Pesquisar formação..."
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

                    {/* View mode toggle */}
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
                        onClick={() => {
                            setEditingItem(null);
                            setIsFormOpen(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs h-10 px-6 rounded-lg gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Nova Formação
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
                            <span className="text-xs text-slate-500">({filteredData.length} itens)</span>
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

            {viewMode === 'list' ? (
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                    <AdminDataTable
                        title={activeTab === 'Todos' ? 'Todas Formações' : `Formações em ${activeTab}`}
                        columns={columns}
                        data={filteredData}
                        loading={loading}
                        onEdit={(item) => {
                            setEditingItem(item);
                            setIsFormOpen(true);
                        }}
                        onDelete={handleDelete}
                    />
                </div>
            ) : (
                /* GRID VIEW */
                loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 italic font-medium">Nenhuma formação encontrada.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all group flex flex-col overflow-hidden">
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <h3 className="font-bold text-slate-900 text-base line-clamp-2 leading-tight flex-1">{item.title}</h3>
                                        <span className="shrink-0 bg-slate-50 text-slate-500 text-[9px] font-black uppercase px-2 py-1 rounded-md border border-slate-100">
                                            {item.category}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                            <User className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="truncate">Formador: {typeof item.instructor === 'object' ? item.instructor?.name : item.instructor || 'Base Agro'}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Inicia em: {item.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                                            <Tag className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-emerald-600 font-black">{item.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                                            <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-emerald-500 rounded-full"
                                                    style={{ width: `${Math.min(100, (item.spots_filled || 0) / (item.spots_total || 1) * 100)}%` }}
                                                />
                                            </div>
                                            <span className="font-bold text-[10px] uppercase">{(item.spots_available || item.spots_total) || 0} Vagas</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex items-center justify-end gap-1">
                                        {showBin ? (
                                            <Button
                                                onClick={() => handleRestore(item)}
                                                size="sm"
                                                className="flex-1 rounded-lg text-[10px] font-black uppercase tracking-widest h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
                                            >
                                                Restaurar
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    setEditingItem(item);
                                                    setIsFormOpen(true);
                                                }}
                                                variant="ghost"
                                                size="sm"
                                                className="size-8 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 p-0"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => handleDelete(item)}
                                            variant="ghost"
                                            size="sm"
                                            className="size-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            <ConfirmationModal
                key={showBin ? 'perm' : 'soft'}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title={showBin ? "Eliminar Permanentemente" : "Mover para Lixeira"}
                description={
                    showBin
                        ? `Tem a certeza que deseja eliminar PERMANENTEMENTE a formação "${itemToDelete?.title}"? Esta acção NÃO pode ser desfeita.`
                        : `A formação "${itemToDelete?.title}" será movida para a lixeira. Poderá restaurá-la mais tarde.`
                }
                confirmLabel={showBin ? "Eliminar de vez" : "Mover para Lixeira"}
                variant="destructive"
            />

            <ConfirmationModal
                isOpen={showEmptyBinConfirm}
                onClose={() => setShowEmptyBinConfirm(false)}
                onConfirm={handleEmptyBin}
                title="Esvaziar Lixeira"
                description="Tem a certeza que deseja eliminar PERMANENTEMENTE todos os itens na lixeira? Esta acção NÃO pode ser desfeita."
                confirmLabel="Esvaziar Lixeira"
                variant="destructive"
            />

            {isFormOpen && (
                <TrainingForm
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={() => {
                        fetchData();
                        setIsFormOpen(false);
                    }}
                    initialData={editingItem}
                />
            )}
        </div>
    );
}
