"use client";

import { useState } from "react";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    Printer,
    Upload,
    MoreVertical,
    FileDown,
    Copy,
    Share2,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminDataTableProps {
    title: string;
    columns: { header: string; key: string; render?: (val: any, row: any) => React.ReactNode }[];
    data: any[];
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    onAdd?: () => void;
    onExport?: () => void;
    onPrint?: () => void;
    onImport?: () => void;
    loading?: boolean;
    customActions?: (row: any) => React.ReactNode;
    pageSize?: number;
    hideHeader?: boolean;
}

export function AdminDataTable({
    title,
    columns,
    data,
    onEdit,
    onDelete,
    onAdd,
    onExport,
    onPrint,
    onImport,
    loading,
    customActions,
    pageSize = 50,
    hideHeader = false
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

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
            {/* Header - Google Contacts Style */}
            {!hideHeader && (
                <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-medium text-slate-800 tracking-tight">
                            {title.split('(')[0]} <span className="text-slate-400 text-sm font-normal">({filteredData.length})</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-1 text-slate-500">
                        <div className="relative mr-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-md text-xs font-medium focus:ring-2 focus:ring-slate-200 transition-all outline-none w-48 md:w-64"
                            />
                        </div>

                        {onPrint && (
                            <button onClick={onPrint} className="p-2 hover:bg-slate-100 rounded-full transition-colors" title="Imprimir">
                                <Printer className="w-5 h-5" />
                            </button>
                        )}
                        {onExport && (
                            <button onClick={onExport} className="p-2 hover:bg-slate-100 rounded-full transition-colors" title="Exportar csv">
                                <FileDown className="w-5 h-5" />
                            </button>
                        )}
                        {onImport && (
                            <button onClick={onImport} className="p-2 hover:bg-slate-100 rounded-full transition-colors" title="Importar">
                                <Upload className="w-5 h-5" />
                            </button>
                        )}
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>

                        {onAdd && (
                            <Button
                                onClick={onAdd}
                                className="bg-slate-900 hover:bg-slate-800 text-white gap-2 text-xs font-bold rounded-md ml-2 px-4 h-9"
                            >
                                <Plus className="w-4 h-4" />
                                Novo
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead className="bg-slate-50/50">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 border-b border-slate-100">
                                    {col.header}
                                </th>
                            ))}
                            {(onEdit || onDelete || customActions) && (
                                <th className="px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-400 border-b border-slate-100 text-right sticky right-0 bg-slate-50/50 backdrop-blur-sm z-10">
                                    Acções
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + (onEdit || onDelete || customActions ? 1 : 0)} className="px-4 py-10 text-center text-slate-400 text-xs font-bold italic">
                                    A carregar dados...
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (onEdit || onDelete || customActions ? 1 : 0)} className="px-4 py-10 text-center text-slate-400 text-xs font-bold italic">
                                    Nenhum item encontrado.
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-2 text-xs font-bold text-slate-600">
                                            {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                                        </td>
                                    ))}
                                    {(onEdit || onDelete || customActions) && (
                                        <td className="px-4 py-2 text-right sticky right-0 bg-white/80 group-hover:bg-slate-50/90 backdrop-blur-sm z-10 transition-colors">
                                            <div className="flex items-center justify-end gap-1">
                                                {onEdit && (
                                                    <button
                                                        onClick={() => onEdit(row)}
                                                        className="size-7 rounded text-slate-400 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-all opacity-0 group-hover:opacity-100"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                {onDelete && (
                                                    <button
                                                        onClick={() => onDelete(row)}
                                                        className="size-7 rounded text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                {customActions && customActions(row)}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls - Minimalist Style */}
            <div className="px-4 py-3 border-t border-slate-50 flex items-center justify-end bg-slate-50/20">
                <div className="flex items-center gap-4">
                    <p className="text-xs font-medium text-slate-500">
                        {filteredData.length > 0 ? (
                            <>
                                {(currentPage - 1) * pageSize + 1}-
                                {Math.min(currentPage * pageSize, filteredData.length)} de {filteredData.length}
                            </>
                        ) : '0 de 0'}
                    </p>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="size-7 rounded-md flex items-center justify-center text-slate-400 disabled:opacity-20 transition-all hover:bg-white border border-transparent hover:border-slate-200"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="size-7 rounded-md flex items-center justify-center text-slate-400 disabled:opacity-20 transition-all hover:bg-white border border-transparent hover:border-slate-200"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
