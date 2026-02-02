"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { User, Plus, Search, LayoutGrid, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

export default function AdminProfessionalsPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const { data, error } = await supabase
                .from('professionals')
                .select('*')
                .order('name', { ascending: true });

            if (error) {
                console.error(error);
                toast.error("Erro ao carregar profissionais");
            } else {
                setData(data || []);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    const filteredData = data.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.specialty?.toLowerCase().includes(search.toLowerCase()) ||
        item.location?.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (row: any) => {
        setItemToDelete(row);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        const { error } = await supabase
            .from('professionals')
            .delete()
            .eq('id', itemToDelete.id);

        if (error) {
            toast.error("Erro ao eliminar profissional");
        } else {
            toast.success("Profissional eliminado com sucesso");
            setData(prev => prev.filter(p => p.id !== itemToDelete.id));
        }
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };

    const columns = [
        {
            header: "Profissional",
            key: "name",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                        {row.photo_url ? (
                            <img src={row.photo_url} alt={val} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <User className="w-4 h-4 text-slate-400" />
                        )}
                    </div>
                    <span className="font-bold text-slate-800">{val}</span>
                </div>
            )
        },
        { header: "Especialidade", key: "specialty", render: (val: string) => <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full uppercase">{val}</span> },
        { header: "Localização", key: "location" },
        { header: "Experiência", key: "experience" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Gestão de Profissionais</h1>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Pesquisar profissionais..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 h-10 bg-white border-slate-200"
                        />
                    </div>

                    <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-100 text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
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
                    title="Lista de Talentos & Especialistas"
                    columns={columns}
                    data={filteredData}
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
                ) : filteredData.length === 0 ? (
                    <div className="text-center py-20 text-slate-400 italic">Nenhum profissional encontrado.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all group relative overflow-hidden p-6 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-white shadow-sm flex items-center justify-center mb-4 overflow-hidden">
                                    {item.photo_url ? (
                                        <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h3>
                                <p className="text-xs font-black uppercase text-emerald-600 tracking-wider mb-3">{item.specialty}</p>
                                <div className="text-xs text-slate-500 font-medium space-y-1 mb-6">
                                    <p>{item.location}</p>
                                    <p>{item.experience}</p>
                                </div>
                                <div className="mt-auto flex items-center gap-2">
                                    <Button
                                        onClick={() => router.push(`/admin/profissionais/${item.id}`)}
                                        variant="outline" size="sm" className="rounded-lg text-xs"
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(item)}
                                        variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs"
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Eliminar Profissional"
                description={`Tem a certeza que deseja eliminar o perfil de "${itemToDelete?.name}"? Esta acção não pode ser desfeita.`}
                confirmLabel="Eliminar Permanentemente"
                variant="destructive"
            />
        </div>
    );
}
