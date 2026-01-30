"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { Users, LayoutGrid, List, Pencil, Trash2, Plus, MapPin, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminProfessionalsPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        const { data, error } = await supabase
            .from('professionals')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error(error);
        else setData(data || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (row: any) => {
        if (!confirm(`Tem a certeza que deseja eliminar o profissional "${row.name}"?`)) return;

        try {
            const { error } = await supabase
                .from('professionals')
                .delete()
                .eq('id', row.id);

            if (error) throw error;
            fetchData();
        } catch (error: any) {
            alert("Erro ao eliminar: " + error.message);
        }
    };

    const columns = [
        {
            header: "Profissional",
            key: "name",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    {row.photo_url ? (
                        <img src={row.photo_url} alt={val} className="size-8 rounded-full object-cover border border-slate-100" />
                    ) : (
                        <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Users className="w-4 h-4" />
                        </div>
                    )}
                    <span className="font-black text-slate-800">{val}</span>
                </div>
            )
        },
        { header: "Especialidade", key: "specialty" },
        { header: "Localização", key: "location", render: (val: string) => val ? <span className="flex items-center gap-1 text-slate-400 text-xs"><MapPin className="w-3 h-3" />{val}</span> : null },
        { header: "Experiência", key: "experience" }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Profissionais</h1>
                    <p className="text-slate-500 font-medium text-sm">Gerencie o directório de profissionais registados.</p>
                </div>

                <div className="flex items-center gap-3">
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
                        onClick={() => router.push('/admin/profissionais/novo')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs h-10 px-6 rounded-lg gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Novo Profissional
                    </Button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <AdminDataTable
                    title="Profissionais Registados"
                    columns={columns}
                    data={data}
                    loading={loading}
                    onAdd={() => router.push('/admin/profissionais/novo')}
                    onEdit={(row) => router.push(`/admin/profissionais/${row.id}`)}
                    onDelete={handleDelete}
                />
            ) : (
                /* GRID VIEW */
                loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 italic">Nenhum profissional encontrado.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all group relative overflow-hidden flex flex-col">

                                {/* CARD COVER / PHOTO */}
                                <div className="h-48 w-full bg-slate-100 relative overflow-hidden">
                                    {item.photo_url ? (
                                        <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: 'center 20%' }} />
                                    ) : (
                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                            <Users className="text-slate-300 w-12 h-12" />
                                        </div>
                                    )}

                                    {/* Edit/Delete Overlay */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg shadow-sm">
                                        <button onClick={() => router.push(`/admin/profissionais/${item.id}`)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(item)} className="p-1.5 hover:bg-rose-50 text-rose-600 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Specialty Tag */}
                                    <div className="absolute bottom-2 left-2">
                                        <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border border-white/20">
                                            {item.specialty}
                                        </span>
                                    </div>
                                </div>

                                {/* CARD CONTENT */}
                                <div className="p-6 pt-4 flex-1 flex flex-col">
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h3>

                                    <div className="space-y-3 mt-2">
                                        {item.location && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                                                <span>{item.location}</span>
                                            </div>
                                        )}
                                        {item.experience && (
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Briefcase className="w-3.5 h-3.5 text-emerald-500" />
                                                <span>{item.experience}</span>
                                            </div>
                                        )}
                                    </div>

                                    {item.bio && (
                                        <p className="mt-4 text-xs text-slate-400 line-clamp-2">
                                            {item.bio}
                                        </p>
                                    )}

                                    {/* Footer */}
                                    <div className="mt-auto pt-4 flex items-center justify-end border-t border-slate-50/50 mt-4">
                                        <Button
                                            onClick={() => router.push(`/admin/profissionais/${item.id}`)}
                                            variant="ghost"
                                            className="text-[10px] font-bold uppercase text-slate-400 hover:text-emerald-600"
                                        >
                                            Editar / Ver
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Add New Card */}
                        <button
                            onClick={() => router.push('/admin/profissionais/novo')}
                            className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group min-h-[200px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Plus className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="font-bold text-slate-400 group-hover:text-emerald-600">Adicionar Profissional</span>
                        </button>
                    </div>
                )
            )}
        </div>
    );
}
