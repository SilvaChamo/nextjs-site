"use client";

import { useState } from "react";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminDataTableProps {
    title: string;
    columns: { header: string; key: string; render?: (val: any, row: any) => React.ReactNode }[];
    data: any[];
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    onAdd?: () => void;
    loading?: boolean;
    customActions?: (row: any) => React.ReactNode;
    pageSize?: number;
}

export function AdminDataTable({
    title,
    columns,
    data,
    onEdit,
    onDelete,
    onAdd,
    loading,
    customActions,
    pageSize = 50
}: AdminDataTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                    <h2 className="text-lg font-black text-slate-800 tracking-tight">{title}</h2>
                    {!loading && <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-full">{data.length} ITENS</span>}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-emerald-500 transition-all outline-none w-full md:w-64"
                        />
                    </div>
                    {onAdd && (
                        <Button
                            onClick={onAdd}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 text-xs font-black uppercase tracking-widest px-6 h-10 rounded-xl transition-all shadow-lg shadow-emerald-900/10"
                        >
                            <Plus className="w-4 h-4" />
                            Novo
                        </Button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="bg-slate-50/50">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                                    {col.header}
                                </th>
                            ))}
                            {(onEdit || onDelete || customActions) && (
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100 text-right sticky right-0 bg-slate-50/50 backdrop-blur-sm z-10 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.05)]">
                                    Acções
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + (onEdit || onDelete || customActions ? 1 : 0)} className="px-6 py-12 text-center text-slate-400 text-xs font-bold italic">
                                    A carregar dados...
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (onEdit || onDelete || customActions ? 1 : 0)} className="px-6 py-12 text-center text-slate-400 text-xs font-bold italic">
                                    Nenhum item encontrado.
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-6 py-4 text-xs font-bold text-slate-600">
                                            {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete || customActions) && (
                                        <td className="px-6 py-4 text-right sticky right-0 bg-white/80 group-hover:bg-slate-50/90 backdrop-blur-sm z-10 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.05)] transition-colors">
                                            <div className="flex items-center justify-end gap-2">
                                                {customActions && customActions(row)}
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(row)}
                                                        className="size-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-sm border border-orange-100"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(row)}
                                                        className="size-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Página {currentPage} de {totalPages || 1} • Mostrando {paginatedData.length} de {filteredData.length} itens
                </p>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-30 transition-all hover:bg-white"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`size-8 rounded-lg text-xs font-black transition-all ${currentPage === pageNum
                                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/10"
                                        : "border border-slate-200 text-slate-400 hover:bg-white"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-30 transition-all hover:bg-white"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
