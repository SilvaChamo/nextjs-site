"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { Archive, Trash2, User, Plus, Search, LayoutGrid, List } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const MOCK_DATA = [
    { id: 'mock-1', name: 'Dr. Afonso Henriques', profession: 'Agrónomo Especialista', email: 'afonso@example.com', phone: '+258 84 123 4567', location: 'Maputo', status: 'active', experience: '10 anos', specialty: 'Culturas de Regadiu', photo_url: null },
    { id: 'mock-2', name: 'Eng. Beatriz Costa', profession: 'Veterinária', email: 'beatriz@example.com', phone: '+258 82 987 6543', location: 'Beira', status: 'active', experience: '6 anos', specialty: 'Pecuária', photo_url: null },
    { id: 'mock-3', name: 'Carlos Manuel', profession: 'Técnico Agrícola', email: 'carlos@example.com', phone: '+258 85 555 4433', location: 'Nampula', status: 'active', experience: '3 anos', specialty: 'Mecanização', photo_url: null },
    { id: 'mock-4', name: 'Dra. Elena Silva', profession: 'Gestora de Projectos', email: 'elena@agro.co.mz', phone: '+258 87 111 2233', location: 'Chimoio', status: 'active', experience: '8 anos', specialty: 'Agronegócio', photo_url: null },
    { id: 'real-1', name: 'Dra. Anabela Velho', profession: 'Médica Veterinária', email: 'vetcare.mz@gmail.com', phone: '+258 84 318 8240', location: 'Maputo (Vetcare)', status: 'active', experience: '15 anos', specialty: 'Clínica de Pequenos Animais', photo_url: null },
    { id: 'real-2', name: 'Eng. Narcisa Nhamitambo', profession: 'Especialista Agropecuária', email: 'narcisa.nh@vetcare.co.mz', phone: '+258 84 000 0000', location: 'Maputo', status: 'active', experience: '12 anos', specialty: 'Sanidade Animal', photo_url: null },
    { id: 'real-3', name: 'Dr. Feliciano Mazuze', profession: 'Investigador Agrário', email: 'info@iiam.gov.mz', phone: '+258 21 460 219', location: 'Maputo (IIAM)', status: 'active', experience: '20 anos', specialty: 'Investigação e Solo', photo_url: null },
    { id: 'real-4', name: 'Eng. Ricardo Santos', profession: 'Consultor de Agronegócio', email: 'geral@agricultura.gov.mz', phone: '+258 84 343 8999', location: 'Chimoio', status: 'active', experience: '9 anos', specialty: 'Gestão de Cadeias de Valor', photo_url: null },
];

export default function AdminProfessionalsPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [data, setData] = useState<any[]>(MOCK_DATA);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [professionFilter, setProfessionFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("active"); // active, archived, deleted
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const { data: dbData, error } = await supabase
                .from('professionals')
                .select('*')
                .order('name', { ascending: true });

            if (error) {
                console.error('Erro ao carregar dados:', error);
                toast.error("Erro ao carregar profissionais da BD");
                // Keep MOCK_DATA on error
            } else {
                // Normalize status for DB records and combine with MOCK_DATA
                const normalizedDbData = (dbData || []).map(item => ({
                    ...item,
                    status: item.status || 'active' // Default to active if null/undefined
                }));

                // MOCK_DATA always comes first, then DB data
                const combinedData = [...MOCK_DATA, ...normalizedDbData];
                console.log('Profissionais carregados:', combinedData.length, 'total');
                setData(combinedData);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    // Get unique professions for the filter
    const professions = Array.from(new Set(data.map(item => item.profession).filter(Boolean)));

    const filteredData = data.filter(item => {
        const matchesSearch =
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.profession?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.location?.toLowerCase().includes(search.toLowerCase());

        const matchesProfession = professionFilter === "all" || item.profession === professionFilter;

        // Status filter logic
        const matchesStatus = statusFilter === "active"
            ? (item.status === 'active' || !item.status)
            : statusFilter === "archived"
                ? item.status === 'inactive'
                : item.status === 'deleted';

        return matchesSearch && matchesProfession && matchesStatus;
    });

    const handleArchive = async (row: any) => {
        const isMock = row.id.toString().startsWith('mock-');
        const newStatus = row.status === 'inactive' ? 'active' : 'inactive';

        if (!isMock) {
            const { error } = await supabase
                .from('professionals')
                .update({ status: newStatus })
                .eq('id', row.id);

            if (error) {
                toast.error(newStatus === 'inactive' ? "Erro ao arquivar" : "Erro ao restaurar");
                return;
            }
        }

        toast.success(newStatus === 'inactive' ? "Profissional arquivado" : "Profissional restaurado");
        setData(prev => prev.map(p => p.id === row.id ? { ...p, status: newStatus } : p));
    };

    const handleRestoreFromTrash = async (row: any) => {
        const isMock = row.id.toString().startsWith('mock-');

        if (!isMock) {
            const { error } = await supabase
                .from('professionals')
                .update({ status: 'active' })
                .eq('id', row.id);

            if (error) {
                toast.error("Erro ao restaurar profissional");
                return;
            }
        }

        toast.success("Profissional restaurado da reciclagem");
        setData(prev => prev.map(p => p.id === row.id ? { ...p, status: 'active' } : p));
    };

    const handleDelete = (row: any) => {
        setItemToDelete(row);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!itemToDelete) return;

        const isMock = itemToDelete.id.toString().startsWith('mock-');

        if (itemToDelete.status === 'deleted') {
            // Permanent delete
            if (!isMock) {
                const { error } = await supabase
                    .from('professionals')
                    .delete()
                    .eq('id', itemToDelete.id);

                if (error) {
                    toast.error("Erro ao eliminar permanentemente");
                    return;
                }
            }
            toast.success("Profissional eliminado permanentemente");
            setData(prev => prev.filter(p => p.id !== itemToDelete.id));
        } else {
            // Soft delete
            if (!isMock) {
                const { error } = await supabase
                    .from('professionals')
                    .update({ status: 'deleted' })
                    .eq('id', itemToDelete.id);

                if (error) {
                    toast.error("Erro ao enviar para a reciclagem");
                    return;
                }
            }
            toast.success("Enviado para a reciclagem");
            setData(prev => prev.map(p => p.id === itemToDelete.id ? { ...p, status: 'deleted' } : p));
        }

        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };

    const columns = [
        {
            header: "Nome",
            key: "name",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                        {row.photo_url ? (
                            <img src={row.photo_url} alt={val} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <User className="w-4 h-4 text-slate-400" />
                        )}
                    </div>
                    <span className="font-bold text-slate-800 whitespace-nowrap">{val}</span>
                </div>
            )
        },
        {
            header: "Profissão",
            key: "profession",
            render: (val: string) => <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full uppercase whitespace-nowrap">{val || "Não inf."}</span>
        },
        { header: "Email", key: "email" },
        { header: "Telefone", key: "phone" },
        { header: "Localização", key: "location" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Gestão de Profissionais</h1>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                    {/* Profession Filter */}
                    <Select value={professionFilter} onValueChange={setProfessionFilter}>
                        <SelectTrigger className="w-[160px] h-10 bg-white border-slate-200 text-xs font-bold uppercase tracking-wider">
                            <SelectValue placeholder="Profissão" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            {professions.map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Search Input */}
                    <div className="relative w-48">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <Input
                            placeholder="Buscar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-10 bg-white border-slate-200 text-sm"
                        />
                    </div>

                    {/* Status Toggles */}
                    <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm gap-1">
                        <button
                            onClick={() => setStatusFilter(statusFilter === 'archived' ? 'active' : 'archived')}
                            className={`p-2 rounded-md transition-all ${statusFilter === 'archived' ? 'bg-amber-100 text-amber-700' : 'text-slate-400 hover:text-slate-600'}`}
                            title="Arquivados"
                        >
                            <Archive className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => setStatusFilter(statusFilter === 'deleted' ? 'active' : 'deleted')}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-bold uppercase tracking-widest ${statusFilter === 'deleted' ? 'bg-rose-100 text-rose-700' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Trash2 className="w-4 h-4" />
                            Reciclagem
                        </button>
                    </div>

                    {/* View Toggles */}
                    <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-100 text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-100 text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    {/* New Button */}
                    <Button
                        onClick={() => router.push('/admin/profissionais/novo')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-[10px] h-10 px-4 rounded-lg gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Novo
                    </Button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <AdminDataTable
                    title={statusFilter === 'archived' ? "Profissionais Arquivados" : statusFilter === 'deleted' ? "Reciclagem de Profissionais" : "Lista de Talentos & Especialistas"}
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
                    <div className="text-center py-20 text-slate-400 italic">
                        {statusFilter === 'deleted' ? "A reciclagem está vazia." : "Nenhum profissional encontrado."}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all group relative overflow-hidden p-6 flex flex-col items-center text-center">
                                <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => router.push(`/admin/profissionais/${item.id}`)}
                                        className="p-2 rounded-full bg-white shadow-sm border border-slate-100 text-slate-500 hover:text-emerald-600 transition-colors"
                                        title="Editar"
                                    >
                                        <Plus className="w-3.5 h-3.5 rotate-45" />
                                    </button>
                                </div>

                                <div className="w-20 h-20 rounded-full bg-slate-50 border-4 border-white shadow-sm flex items-center justify-center mb-4 overflow-hidden shrink-0">
                                    {item.photo_url ? (
                                        <img src={item.photo_url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-slate-300" />
                                    )}
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg mb-1 leading-tight">{item.name}</h3>
                                <p className="text-[10px] font-black uppercase text-emerald-600 tracking-wider mb-6 bg-emerald-50 px-3 py-1 rounded-full">{item.profession || item.role || "Profissional"}</p>

                                <div className="mt-auto flex items-center justify-center gap-2 w-full">
                                    {item.status === 'deleted' ? (
                                        <Button
                                            onClick={() => handleRestoreFromTrash(item)}
                                            variant="outline"
                                            size="sm"
                                            className="h-9 flex-1 rounded-xl text-emerald-600 border-emerald-100 hover:bg-emerald-50 gap-2 font-bold text-xs"
                                            title="Restaurar"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Restaurar
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={() => handleArchive(item)}
                                                variant="outline"
                                                size="icon"
                                                className={`h-9 w-9 rounded-xl ${item.status === 'inactive' ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-inner' : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50'}`}
                                                title={item.status === 'inactive' ? 'Restaurar para Activos' : 'Arquivar Profissional'}
                                            >
                                                <Archive className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(item)}
                                                variant="outline"
                                                size="sm"
                                                className="h-9 rounded-xl border-rose-100 text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all font-bold text-xs gap-2 px-4 flex-1"
                                                title="Mover para Reciclagem"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Eliminar
                                            </Button>
                                        </>
                                    )}
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
