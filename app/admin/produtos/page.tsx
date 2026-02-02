"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { MarketProductForm } from "@/components/admin/MarketProductForm";
import { ShoppingCart, LayoutGrid, List, Pencil, Trash2, Plus, Tag, Building2, Package, FileText, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export default function AdminProductsPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [view, setView] = useState<'products' | 'market'>('products');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("produtos");
    const [showBin, setShowBin] = useState(false);
    const [showBinDropdown, setShowBinDropdown] = useState(false);
    const [showEmptyBinConfirm, setShowEmptyBinConfirm] = useState(false);

    const [showMarketForm, setShowMarketForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    async function fetchData() {
        setLoading(true);
        console.log("=== FETCH PRODUCTS DEBUG ===");
        console.log("Active Tab:", activeTab);
        console.log("Show Bin:", showBin);

        let query = supabase.from('products').select('*, companies(name)');

        // Filter by deleted status
        if (showBin) {
            console.log("Fetching products from BIN (deleted_at NOT NULL)");
            query = query.not('deleted_at', 'is', null);
        } else {
            console.log("Fetching ACTIVE products (deleted_at IS NULL)");
            query = query.is('deleted_at', null);
        }

        // Filter based on active tab
        if (activeTab === "produtos") {
            console.log("Filtering PRODUTOS - showing only products");
            // Show only regular products
            query = query.in('category', ['insumo', 'tecnologia', 'financiamento', 'turismo']);
        } else if (activeTab === "mercado") {
            console.log("Filtering MERCADO - showing market prices");
            // Show market prices (handled separately)
            const { data, error } = await supabase
                .from('market_prices')
                .select('*')
                .order('product', { ascending: true });

            if (error) console.error(error);
            else setData(data || []);
            setLoading(false);
            return;
        } else if (activeTab === "servicos") {
            console.log("Filtering SERVIÇOS - showing only services");
            // Show only services
            query = query.in('category', ['servico', 'serviço', 'service', 'consultoria', 'manutencao', 'manutenção', 'assistencia', 'assistência']);
        } else {
            console.log("Filtering OUTROS - showing other categories");
            // Show other categories (excluding products, market, and services)
            const excludeCategories = ['insumo', 'tecnologia', 'financiamento', 'turismo', 'servico', 'serviço', 'service', 'consultoria', 'manutencao', 'manutenção', 'assistencia', 'assistência'];
            query = query.not('category', 'in', excludeCategories);
        }

        query = query.order('created_at', { ascending: false });

        const { data, error } = await query;

        console.log("Fetch result:", { error, count: data?.length || 0 });
        if (data) {
            console.log("Products found:");
            data.forEach(product => {
                console.log(`- [${product.deleted_at ? 'DELETED' : 'ACTIVE'}] ${product.nome} (ID: ${product.id})`);
            });
        }

        if (error) console.error(error);
        else setData(data || []);
        setLoading(false);
        console.log("=== END FETCH DEBUG ===");
    }

    useEffect(() => {
        fetchData();
    }, [activeTab, showBin]);

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
        if (activeTab === "mercado") {
            setEditingItem(row);
            setShowMarketForm(true);
        } else {
            router.push(`/admin/produtos/${row.id}`);
        }
    };

    const handleAdd = () => {
        if (activeTab === "mercado") {
            setEditingItem(null);
            setShowMarketForm(true);
        } else if (activeTab === "servicos") {
            router.push('/admin/produtos/novo?type=servico');
        } else {
            router.push('/admin/produtos/novo');
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
            </div>

            {/* Toolbar - Merged Tabs and Controls */}
            <div className="flex items-center gap-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
                {/* Tabs */}
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => { setActiveTab("produtos"); setShowBin(false); }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === "produtos" && !showBin
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
                            }`}
                    >
                        <Package className="w-3.5 h-3.5" />
                        Produtos
                    </button>
                    <button
                        onClick={() => { setActiveTab("mercado"); setShowBin(false); }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === "mercado" && !showBin
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
                            }`}
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Mercado
                    </button>
                    <button
                        onClick={() => { setActiveTab("servicos"); setShowBin(false); }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === "servicos" && !showBin
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
                            }`}
                    >
                        <FileText className="w-3.5 h-3.5" />
                        Serviços
                    </button>
                    <button
                        onClick={() => { setActiveTab("outros"); setShowBin(false); }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === "outros" && !showBin
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
                            }`}
                    >
                        <Tag className="w-3.5 h-3.5" />
                        Outros
                    </button>
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-2 ml-auto">
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

                    <div className="w-px h-4 bg-slate-200 mx-1"></div>

                    {/* Bin Button */}
                    <button
                        onClick={() => setShowBin(!showBin)}
                        className={`p-1.5 rounded-md transition-all ${showBin ? 'bg-rose-50 text-rose-600' : 'text-slate-400 hover:text-rose-600'}`}
                        title="Lixeira"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="w-px h-4 bg-slate-200 mx-1"></div>

                    {/* Add Button */}
                    <Button
                        onClick={handleAdd}
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 h-8 px-4 rounded-md text-[10px] font-black uppercase tracking-wider"
                    >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Novo
                    </Button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <AdminDataTable
                    title={activeTab === "mercado" ? "Cotações SIMA" : activeTab === "servicos" ? "Serviços" : activeTab === "outros" ? "Outros Itens" : "Produtos de Empresas"}
                    columns={activeTab === "mercado" ? marketColumns : productColumns}
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
                                    ) : view === 'market' ? (
                                        // Market prices - no image, show icon
                                        <div className="w-full h-full bg-emerald-50/50 flex flex-col items-center justify-center gap-2 p-4 text-center border-b border-emerald-100/50">
                                            <div className="bg-white p-2 rounded-full shadow-sm mb-1">
                                                <Tag className="text-emerald-500 w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.category || 'Cotação'}</span>
                                        </div>
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

                                        {/* Market Location for Market Prices */}
                                        {view === 'market' && item.location && (
                                            <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                                <ShoppingCart className="w-3 h-3" />
                                                {item.location}
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
                title={activeTab === "mercado" ? "Eliminar Cotação" : activeTab === "servicos" ? "Eliminar Serviço" : "Eliminar Produto"}
                description={`Tem a certeza que deseja eliminar "${itemToDelete?.name || itemToDelete?.product || itemToDelete?.nome}"? Esta acção não pode ser desfeita.`}
                confirmLabel="Eliminar"
                variant="destructive"
            />

            <ConfirmationModal
                isOpen={showBulkDeleteConfirm}
                onClose={() => setShowBulkDeleteConfirm(false)}
                onConfirm={confirmBulkDelete}
                title="Eliminar em Massa"
                description={`Tem a certeza que deseja eliminar ${selectedIds.length} itens seleccionados? Esta acção não pode ser desfeita.`}
                confirmLabel="Eliminar Todos"
                variant="destructive"
            />

            <ConfirmationModal
                isOpen={showEmptyBinConfirm}
                onClose={() => setShowEmptyBinConfirm(false)}
                onConfirm={() => {
                    // Implement empty bin logic
                    setShowEmptyBinConfirm(false);
                    toast.success("Lixeira esvaziada com sucesso!");
                }}
                title="Esvaziar Lixeira"
                description="Tem a certeza que deseja esvaziar permanentemente todos os itens na lixeira? Esta acção não pode ser desfeita."
                confirmLabel="Esvaziar Lixeira"
                variant="destructive"
            />
        </div>
    );
}
