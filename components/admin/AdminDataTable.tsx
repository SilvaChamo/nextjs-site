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
}

export function AdminDataTable({
    title,
    columns,
    data,
    onEdit,
    onDelete,
    onAdd,
    loading
}: AdminDataTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = data.filter(item =>
        Object.values(item).some(val =>
            String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                            onChange={(e) => setSearchTerm(e.target.value)}
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
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100">
                                    {col.header}
                                </th>
                            ))}
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 border-b border-slate-100 text-right">
                                Acções
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-400 text-xs font-bold italic">
                                    A carregar dados...
                                </td>
                            </tr>
                        ) : filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-400 text-xs font-bold italic">
                                    Nenhum item encontrado.
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-6 py-4 text-xs font-bold text-slate-600">
                                            {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {onEdit && (
                                                <button
                                                    onClick={() => onEdit(row)}
                                                    className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(row)}
                                                    className="size-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                            <button className="size-8 rounded-lg text-slate-400 flex items-center justify-center hover:bg-slate-100 group-hover:opacity-0 transition-all">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Mockup */}
            <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Mostrando {filteredData.length} de {data.length} itens
                </p>
                <div className="flex items-center gap-2">
                    <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 disabled:opacity-50" disabled>
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="size-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-lg shadow-emerald-900/10">
                        1
                    </button>
                    <button className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
