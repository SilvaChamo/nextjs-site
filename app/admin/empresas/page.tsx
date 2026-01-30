"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import { Building2, Globe, Phone, CheckCircle2, MessageCircle, LayoutGrid, List, Pencil, Trash2, Plus, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminEmpresasPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [filter, setFilter] = useState('Todas');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    async function fetchData() {
        setLoading(true);
        let query = supabase.from('companies').select('*');
        const { data: result, error } = await query.order('created_at', { ascending: false });

        if (error) console.error(error);
        else setData(result || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Filter Logic
    const filteredData = data.filter(item => {
        // Status Filter
        let matchesFilter = true;
        if (filter === 'Públicas') matchesFilter = item.type === 'Publica' || item.sector?.includes('Public');
        else if (filter === 'Privadas') matchesFilter = item.type === 'Privada' || !item.type;
        else if (filter === 'Internacionais') matchesFilter = item.type === 'Internacional' || item.name.includes('International');
        else if (filter === 'Associações') matchesFilter = item.type === 'Associacao' || item.name.includes('Associação');

        // Search Filter
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nuit?.includes(searchTerm) ||
            item.email?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleDelete = async (row: any) => {
        if (!confirm(`Tem a certeza que deseja eliminar a empresa "${row.name}"?`)) return;

        try {
            const { error } = await supabase
                .from('companies')
                .delete()
                .eq('id', row.id);

            if (error) throw error;
            fetchData();
        } catch (error: any) {
            alert("Erro ao eliminar: " + error.message);
        }
    };

    const toggleVerify = async (row: any) => {
        try {
            const { error } = await supabase
                .from('companies')
                .update({ is_verified: !row.is_verified })
                .eq('id', row.id);
            if (error) throw error;
            fetchData();
        } catch (err: any) {
            alert("Erro ao verificar: " + err.message);
        }
    };

    const activatePremium = async (row: any) => {
        if (!confirm("Confirmar ativação do plano Profissional?")) return;
        try {
            const { error } = await supabase
                .from('companies')
                .update({ plan: 'profissional' })
                .eq('id', row.id);
            if (error) throw error;
            fetchData();
        } catch (err: any) {
            alert("Erro: " + err.message);
        }
    };

    const companyColumns = [
        {
            header: "Empresa",
            key: "name",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    {row.logo_url ? (
                        <img src={row.logo_url} alt={val} className="size-12 object-contain bg-white rounded-lg border border-slate-100 p-1" />
                    ) : (
                        <div className="size-12 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                            <Building2 className="w-5 h-5" />
                        </div>
                    )}
                    <span className="font-excep font-black text-slate-800 text-sm">{val}</span>
                </div>
            )
        },
        { header: "Sector", key: "sector" },
        { header: "Localização", key: "location", render: (val: string) => val ? <span className="flex items-center gap-1 text-slate-400 text-xs"><MapPin className="w-3 h-3" />{val}</span> : null },
        {
            header: "Contacto",
            key: "phone",
            render: (val: string) => val ? (
                <span className="flex items-center gap-1 text-slate-400">
                    <Phone className="w-3 h-3" />
                    {val}
                </span>
            ) : null
        },
        {
            header: "Website",
            key: "website",
            render: (val: string) => val ? (
                <a href={val} target="_blank" className="text-emerald-500 hover:underline flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Link
                </a>
            ) : null
        },
        {
            header: "Estado",
            key: "is_verified",
            render: (val: boolean, row: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => toggleVerify(row)}
                        className={`p-1.5 rounded-full transition-colors ${val ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'}`}
                        title="Verificar Empresa"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                    </button>
                    {row.plan === 'parceiro' && <span className="bg-emerald-950 text-white px-2 py-0.5 rounded text-[10px] font-bold">Parceiro</span>}
                    {row.plan === 'profissional' && <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">Pro</span>}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Gestão de Empresas</h1>
                    <p className="text-slate-500 font-medium text-sm">Gira as empresas registadas no directório.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Pesquisar empresas..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pl-10 pr-4 py-2 w-full bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <select
                            value={filter}
                            onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
                            className="bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wide rounded-lg px-4 py-2 outline-none focus:border-emerald-500 h-10"
                        >
                            <option value="Todas">Todas</option>
                            <option value="Públicas">Públicas</option>
                            <option value="Privadas">Privadas</option>
                            <option value="Internacionais">Internacionais</option>
                            <option value="Associações">Associações</option>
                        </select>

                        {/* Grid/List Toggle */}
                        <div className="flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm shrink-0">
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
                            onClick={() => router.push('/admin/empresas/novo')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs h-10 px-6 rounded-lg gap-2 shrink-0"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden md:inline">Nova Empresa</span>
                        </Button>
                    </div>
                </div>
            </div>

            {viewMode === 'list' ? (
                <>
                    <AdminDataTable
                        title={`Empresas (${filteredData.length})`}
                        columns={companyColumns}
                        data={paginatedData}
                        loading={loading}
                        onEdit={(row) => router.push(`/admin/empresas/${row.id}`)}
                        onDelete={handleDelete}
                        customActions={(row) => (
                            <div className="contents">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-7 w-7 p-0 rounded-full border-green-200 text-green-600 hover:bg-green-50 mr-2"
                                    title="Contactar via WhatsApp"
                                    onClick={() => {
                                        const num = row.contact || row.phone;
                                        if (num) window.open(`https://wa.me/${num.replace(/\s+/g, '')}`, '_blank');
                                        else alert("Sem contacto");
                                    }}
                                >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                </Button>
                                {row.plan !== 'profissional' && row.plan !== 'parceiro' && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-7 text-[10px] font-bold uppercase text-orange-500 hover:text-orange-600 hover:bg-orange-50 mr-2"
                                        onClick={() => activatePremium(row)}
                                    >
                                        Activar Pro
                                    </Button>
                                )}
                            </div>
                        )}
                    />

                    {/* Pagination for List View */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    className="text-xs"
                                >
                                    Anterior
                                </Button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-bold transition-all ${currentPage === page
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <Button
                                    variant="outline"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    className="text-xs"
                                >
                                    Seguinte
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                /* GRID VIEW */
                loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium">Nenhuma empresa encontrada com estes filtros.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setFilter("Todas"); }}
                            className="mt-2 text-emerald-600 text-sm font-bold hover:underline"
                        >
                            Limpar filtros
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedData.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all group relative overflow-hidden flex flex-col">

                                    {/* CARD COVER IMAGE */}
                                    <div className="h-40 w-full bg-slate-100 relative">
                                        {item.banner_url ? (
                                            <img src={item.banner_url} alt="Cover" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-slate-100 to-slate-200 flex items-center justify-center">
                                                <Building2 className="text-slate-300 w-8 h-8" />
                                            </div>
                                        )}

                                        {/* Edit/Delete Overlay */}
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-1 rounded-lg shadow-sm">
                                            <button onClick={() => router.push(`/admin/empresas/${item.id}`)} className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded">
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(item)} className="p-1.5 hover:bg-rose-50 text-rose-600 rounded">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* CARD CONTENT */}
                                    <div className="p-6 pt-0 flex-1 flex flex-col">
                                        {/* Avatar */}
                                        <div className="-mt-10 mb-3 relative z-10">
                                            {item.logo_url ? (
                                                <img src={item.logo_url} alt={item.name} className="size-20 rounded-2xl object-cover bg-white p-1 shadow-sm" />
                                            ) : (
                                                <div className="size-20 rounded-2xl bg-white border-4 border-white flex items-center justify-center text-slate-400 shadow-sm">
                                                    <Building2 className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Title & Subtitle */}
                                        <div>
                                            <h3 className="font-bold text-slate-900 line-clamp-1 text-lg mb-1">{item.name}</h3>
                                            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                                                {item.sector || "Entidade"}
                                            </p>
                                        </div>

                                        {/* Info Grid */}
                                        <div className="mt-4 space-y-2 text-xs text-slate-500">
                                            {(item.phone || item.contact) && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-3.5 h-3.5 text-emerald-500" />
                                                    {item.phone || item.contact}
                                                </div>
                                            )}
                                            {item.location && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                                                    {item.location}
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50/50 mt-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => toggleVerify(item)}
                                                    className={`p-1 rounded-full ${item.is_verified ? 'text-emerald-500 bg-emerald-50' : 'text-slate-300 hover:text-emerald-500'}`}
                                                    title="Verificar"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                {item.plan === 'profissional' && <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-[10px] font-bold">PRO</span>}
                                            </div>

                                            <Button
                                                onClick={() => router.push(`/admin/empresas/${item.id}`)}
                                                variant="ghost"
                                                className="text-[10px] font-bold uppercase text-slate-400 hover:text-emerald-600 ml-auto"
                                            >
                                                Editar / Ver
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Add New Card - Only show on first page if space */}
                            {currentPage === 1 && (
                                <button
                                    onClick={() => router.push('/admin/empresas/novo')}
                                    className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group min-h-[200px]"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <span className="font-bold text-slate-400 group-hover:text-emerald-600">
                                        Nova Empresa
                                    </span>
                                </button>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-10">
                                <div className="flex items-center gap-2 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        className="text-slate-500 hover:text-emerald-600"
                                    >
                                        Anterior
                                    </Button>

                                    <div className="flex items-center gap-1 px-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === page
                                                    ? 'bg-emerald-600 text-white shadow-md scale-105'
                                                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        className="text-slate-500 hover:text-emerald-600"
                                    >
                                        Seguinte
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )
            )}
        </div>
    );
}
