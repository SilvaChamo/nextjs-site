"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { MapPin, LayoutGrid, List, Pencil, Trash2, Plus, Ruler, Coins } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPropertiesPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filter, setFilter] = useState('Todas');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        let query = supabase.from('properties').select('*');

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) console.error(error);
        else {
            // Client-side filtering
            const filtered = (data || []).filter(item => {
                if (filter === 'Todas') return true;
                if (filter === 'Públicas') return item.ownership_type === 'Publica';
                if (filter === 'Privadas') return item.ownership_type === 'Privada';
                if (filter === 'Particulares') return item.ownership_type === 'Particular';
                return true;
            });
            setData(filtered);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [filter]);

    const handleDelete = async (row: any) => {
        if (!confirm(`Tem a certeza que deseja eliminar a propriedade "${row.title}"?`)) return;

        try {
            const { error } = await supabase
                .from('properties')
                .delete()
                .eq('id', row.id);

            if (error) throw error;
            fetchData();
        } catch (error: any) {
            alert("Erro ao eliminar: " + error.message);
        }
    };

    const propertyColumns = [
        { header: "Título", key: "title", render: (val: string) => <span className="font-black text-slate-800">{val}</span> },
        { header: "Tipo", key: "type" },
        { header: "Localização", key: "location", render: (val: string) => val ? <span className="flex items-center gap-1 text-slate-400 text-xs"><MapPin className="w-3 h-3" />{val}</span> : null },
        { header: "Tamanho", key: "size" },
        { header: "Propriedade", key: "ownership_type", render: (val: string) => <span className="text-xs font-semibold bg-slate-100 px-2 py-1 rounded-full uppercase text-slate-500">{val}</span> },
        {
            header: "Preço",
            key: "price",
            render: (val: number) => <span className="text-emerald-600 font-bold">{val ? `${val.toLocaleString()} MT` : 'Sob Consulta'}</span>
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Gestão de Propriedades</h1>
                    <p className="text-slate-500 font-medium text-sm">Gira as propriedades e activos registados.</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Filter Dropdown */}
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide rounded-lg px-4 py-2 outline-none focus:border-emerald-500"
                    >
                        <option value="Todas">Todas</option>
                        <option value="Públicas">Públicas</option>
                        <option value="Privadas">Privadas</option>
                        <option value="Particulares">Particulares</option>
                    </select>

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

                    <Button
                        onClick={() => router.push('/admin/propriedades/novo')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs h-10 px-6 rounded-lg gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Nova Propriedade
                    </Button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <AdminDataTable
                    title="Propriedades Registadas"
                    columns={propertyColumns}
                    data={data}
                    loading={loading}
                    onAdd={() => router.push('/admin/propriedades/novo')}
                    onEdit={(row) => router.push(`/admin/propriedades/${row.id}`)}
                    onDelete={handleDelete}
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
                                <div className="h-48 w-full bg-slate-100 relative">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                            <MapPin className="text-slate-300 w-8 h-8" />
                                        </div>
                                    )}

                                    {/* Edit/Delete Overlay */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg shadow-sm">
                                        <button onClick={() => router.push(`/admin/propriedades/${item.id}`)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(item)} className="p-1.5 hover:bg-rose-50 text-rose-600 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Property Status Tag */}
                                    <div className="absolute bottom-2 right-2">
                                        <span className="bg-black/50 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide border border-white/20">
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                {/* CARD CONTENT */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-bold text-slate-900 line-clamp-1 text-lg mb-1">{item.title}</h3>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                        {item.type}
                                    </p>

                                    {/* Info Grid */}
                                    <div className="mt-4 space-y-2 text-xs text-slate-500">
                                        {item.location && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                                                {item.location}
                                            </div>
                                        )}
                                        {item.size && (
                                            <div className="flex items-center gap-2">
                                                <Ruler className="w-3.5 h-3.5 text-emerald-500" />
                                                {item.size}
                                            </div>
                                        )}
                                        {item.price && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-emerald-600 font-black text-xl">
                                                    {item.price.toLocaleString()} MT
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-auto pt-4 flex items-center justify-end border-t border-slate-50/50 mt-4">
                                        <Button
                                            onClick={() => router.push(`/admin/propriedades/${item.id}`)}
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
                            onClick={() => router.push('/admin/propriedades/novo')}
                            className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group min-h-[200px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="font-bold text-slate-400 group-hover:text-emerald-600">
                                Nova Propriedade
                            </span>
                        </button>
                    </div>
                )
            )}
        </div>
    );
}
