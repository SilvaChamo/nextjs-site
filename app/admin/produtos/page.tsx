"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { MarketProductForm } from "@/components/admin/MarketProductForm";
import { ShoppingCart, LayoutGrid, List, Pencil, Trash2, Plus, Tag, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export default function AdminProductsPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [view, setView] = useState<'products' | 'market'>('products');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [showMarketForm, setShowMarketForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    async function fetchData() {
        setLoading(true);
        const table = view === 'market' ? 'market_prices' : 'products';

        let query = supabase.from(table).select(view === 'products' ? '*, companies(name)' : '*');

        if (table === 'market_prices') {
            query = query.order('product', { ascending: true });
        } else {
            query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;

        if (error) console.error(error);
        else setData(data || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [view]);

    const confirmDelete = async () => {
        if (!itemToDelete) return;
        const previousData = [...data];
        try {
            // Optimistic update
            setData(prev => prev.filter(item => item.id !== itemToDelete.id));

            const table = view === 'market' ? 'market_prices' : 'products';
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', itemToDelete.id);

            if (error) throw error;
            toast.success(view === 'market' ? "Cotação eliminada!" : "Produto eliminado!");
        } catch (error: any) {
            setData(previousData);
            toast.error("Erro ao eliminar: " + error.message);
        } finally {
            setShowDeleteConfirm(false);
            setItemToDelete(null);
        }
    };

    const confirmBulkDelete = async () => {
        const previousData = [...data];
        try {
            // Optimistic update
            setData(prev => prev.filter(item => !selectedIds.includes(item.id)));

            const table = view === 'market' ? 'market_prices' : 'products';
            const { error } = await supabase
                .from(table)
                .delete()
                .in('id', selectedIds);

            if (error) throw error;

            toast.success(`${selectedIds.length} ${view === 'market' ? 'cotações' : 'produtos'} eliminados!`);
            setSelectedIds([]);
        } catch (error: any) {
            setData(previousData);
            toast.error("Erro na eliminação em massa: " + error.message);
        } finally {
            setShowBulkDeleteConfirm(false);
        }
    };

    const handleDelete = (row: any) => {
        setItemToDelete(row);
        setShowDeleteConfirm(true);
    };

    const handleEdit = (row: any) => {
        if (view === 'products') {
            router.push(`/admin/produtos/${row.id}`);
        } else {
            setEditingItem(row);
            setShowMarketForm(true);
        }
    };

    const handleAdd = () => {
        if (view === 'products') {
            router.push('/admin/produtos/novo');
        } else {
            setEditingItem(null);
            setShowMarketForm(true);
        }
    };

    const marketColumns = [
        { header: "Produto", key: "product", render: (val: string) => <span className="font-black text-slate-800">{val}</span> },
        { header: "Categoria", key: "category" },
        { header: "Unidade", key: "unit", render: (val: string) => <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded">{val}</span> },
        { header: "Mercado", key: "location" },
        {
            header: "Preço",
            key: "price",
            render: (val: number) => <span className="text-emerald-600 font-bold">{val?.toLocaleString()} MT</span>
        }
    ];

    const productColumns = [
        { header: "Produto", key: "name", render: (val: string) => <span className="font-black text-slate-800">{val}</span> },
        { header: "Categoria", key: "category" },
        {
            header: "Preço",
            key: "price",
            render: (val: number) => <span className="text-emerald-600 font-bold">{val?.toLocaleString()} MT</span>
        },
        {
            header: "Empresa",
            key: "companies",
            render: (val: any) => val?.name ? <span className="text-xs font-bold text-slate-500">{val.name}</span> : null
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Produtos & Cotações</h1>
                    <p className="text-slate-500 font-medium text-sm">Gira produtos das empresas e preços do mercado SIMA.</p>
                </div>

                {/* Grid/List Toggle */}
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

                <div className="flex items-center gap-3">
                    <Button
                        onClick={handleAdd}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs h-10 px-6 rounded-lg gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        {view === 'products' ? "Novo Produto" : "Nova Cotação"}
                    </Button>
                </div>
            </div>

            {/* Sliding Tabs */}
            <div className="relative bg-slate-100 p-1 rounded-lg w-fit flex items-center">
                {/* Sliding Background */}
                <div
                    className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-in-out"
                    style={{
                        left: view === 'products' ? '4px' : '50%',
                        width: 'calc(50% - 4px)',
                        transform: view === 'products' ? 'translateX(0)' : 'translateX(4px)'
                    }}
                />

                <button
                    onClick={() => setView('products')}
                    className={`relative z-10 flex items-center justify-center gap-2 px-6 py-2 text-xs font-black uppercase tracking-widest transition-colors w-[140px] ${view === 'products' ? 'text-emerald-700' : 'text-slate-400 hover:text-orange-500'}`}
                >
                    <ShoppingCart className="w-4 h-4" />
                    Produtos
                </button>
                <button
                    onClick={() => setView('market')}
                    className={`relative z-10 flex items-center justify-center gap-2 px-6 py-2 text-xs font-black uppercase tracking-widest transition-colors w-[140px] ${view === 'market' ? 'text-emerald-700' : 'text-slate-400 hover:text-orange-500'}`}
                >
                    <Tag className="w-4 h-4" />
                    Mercado
                </button>
            </div>

            {viewMode === 'list' ? (
                <AdminDataTable
                    title={view === 'market' ? "Cotações SIMA" : "Produtos de Empresas"}
                    columns={view === 'market' ? marketColumns : productColumns}
                    data={data}
                    loading={loading}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    selectedIds={selectedIds}
                    onSelectRow={(id, selected) => {
                        if (selected) setSelectedIds(prev => [...prev, id]);
                        else setSelectedIds(prev => prev.filter(i => i !== id));
                    }}
                    onSelectAll={(all) => {
                        if (all) {
                            setSelectedIds(data.map(r => r.id));
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
                />
            ) : (
                /* GRID VIEW */
                loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 italic">Nenhum item encontrado.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all group relative overflow-hidden flex flex-col">

                                {/* CARD COVER IMAGE */}
                                <div className="h-32 w-full bg-slate-100 relative">
                                    {view === 'products' && item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-emerald-50/50 flex flex-col items-center justify-center gap-2 p-4 text-center border-b border-emerald-100/50">
                                            <div className="bg-white p-2 rounded-full shadow-sm mb-1">
                                                {view === 'products' ? <ShoppingCart className="text-emerald-500 w-5 h-5" /> : <Tag className="text-emerald-500 w-5 h-5" />}
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.category}</span>
                                        </div>
                                    )}

                                    {/* Edit/Delete Overlay */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg shadow-sm">
                                        <button onClick={() => handleEdit(item)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(item)} className="p-1.5 hover:bg-rose-50 text-rose-600 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* CARD CONTENT */}
                                <div className="p-6 pt-0 flex-1 flex flex-col">
                                    {/* Title & Subtitle */}
                                    <div className="mt-4">
                                        <h3 className="font-bold text-slate-900 line-clamp-1 text-lg mb-1">{item.name || item.product}</h3>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.category + (item.unit ? ` • ${item.unit}` : '')}</p>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="mt-4 space-y-2 text-xs text-slate-500">
                                        {/* Price Display */}
                                        {(item.price || item.preco) && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-emerald-600 font-black text-xl">
                                                    {(item.price || item.preco)?.toLocaleString()} MT
                                                </span>
                                                {item.unit && <span className="text-slate-400 font-medium text-[10px] uppercase">/ {item.unit}</span>}
                                            </div>
                                        )}
                                        {/* Company Name if Product */}
                                        {view === 'products' && item.companies && (
                                            <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                                <Building2 className="w-3 h-3" />
                                                {item.companies.name}
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50/50 mt-4">
                                        <Button
                                            onClick={() => handleEdit(item)}
                                            variant="ghost"
                                            className="text-[10px] font-bold uppercase text-slate-400 hover:text-emerald-600 ml-auto"
                                        >
                                            Editar / Ver
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Add New Card */}
                        <button
                            onClick={handleAdd}
                            className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group min-h-[200px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="font-bold text-slate-400 group-hover:text-emerald-600">Adicionar Novo</span>
                        </button>
                    </div>
                )
            )}

            {showMarketForm && (
                <MarketProductForm
                    initialData={editingItem}
                    onClose={() => setShowMarketForm(false)}
                    onSuccess={() => {
                        fetchData();
                        setShowMarketForm(false);
                    }}
                />
            )}

            <ConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title={view === 'market' ? "Eliminar Cotação" : "Eliminar Produto"}
                description={`Tem a certeza que deseja eliminar "${itemToDelete?.name || itemToDelete?.product}"? Esta acção não pode ser desfeita.`}
                confirmLabel="Eliminar"
                variant="destructive"
            />

            <ConfirmationModal
                isOpen={showBulkDeleteConfirm}
                onClose={() => setShowBulkDeleteConfirm(false)}
                onConfirm={confirmBulkDelete}
                title="Eliminar em Massa"
                description={`Tem a certeza que deseja eliminar ${selectedIds.length} ${view === 'market' ? 'cotações' : 'produtos'}? Esta acção não pode ser desfeita.`}
                confirmLabel="Eliminar Tudo"
                variant="destructive"
            />
        </div>
    );
}
