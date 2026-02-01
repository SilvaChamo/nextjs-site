"use client";

import React, { useState } from "react";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { BadgeCheck, BadgeAlert, LayoutGrid, List, FileText } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";

// Mock data para teste offline
const mockArticles = [
    { id: 1, title: "Notícia de Agricultura 1", type: "Notícia", deleted_at: null },
    { id: 2, title: "Guia de Plantio", type: "Guia", deleted_at: null },
    { id: 3, title: "Documento Técnico", type: "document", deleted_at: null },
    { id: 4, title: "Artigo Científico", type: "Artigo Científico", deleted_at: null },
    { id: 5, title: "Evento Agrícola", type: "Evento", deleted_at: null },
    { id: 6, title: "Relatório de Pesquisa", type: "Relatório", deleted_at: null },
    { id: 7, title: "PDF Manual", type: "PDF", deleted_at: null },
    { id: 8, title: "Estudo de Solo", type: "Estudo", deleted_at: null },
];

export default function AdminTestPage() {
    const [activeAdminTab, setActiveAdminTab] = useState("noticias");
    const [showBin, setShowBin] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

    // Filtrar dados mock
    const filteredArticles = mockArticles.filter(article => {
        // First filter by deleted status
        const deletedFilter = showBin ? article.deleted_at !== null : article.deleted_at === null;
        
        // Then filter by tab
        let tabFilter = false;
        if (activeAdminTab === "noticias") {
            // Exclude documents
            const documentTypes = ['document', 'Relatório', 'PDF', 'Documento', 'Artigo Científico', 'Artigo Técnico', 'Estudo', 'Pesquisa'];
            tabFilter = !documentTypes.includes(article.type);
        } else {
            // Include only documents
            const documentTypes = ['document', 'Relatório', 'PDF', 'Documento', 'Artigo Científico', 'Artigo Técnico', 'Estudo', 'Pesquisa'];
            tabFilter = documentTypes.includes(article.type);
        }
        
        return deletedFilter && tabFilter;
    });

    console.log("=== ADMIN TEST DEBUG ===");
    console.log("Active Tab:", activeAdminTab);
    console.log("Show Bin:", showBin);
    console.log("Mock Articles:", mockArticles.map(a => ({ title: a.title, type: a.type, deleted_at: a.deleted_at })));
    console.log("Filtered Articles:", filteredArticles.map(a => ({ title: a.title, type: a.type })));

    const columns = [
        {
            header: "Título",
            key: "title",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-4">
                    <div>
                        <p className="font-black text-slate-800 line-clamp-1">{val}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{row.type || 'Sem Categoria'}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Tipo",
            key: "type",
            render: (val: string) => (
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                    {val || 'Geral'}
                </span>
            )
        },
        {
            header: "Estado",
            key: "deleted_at",
            render: (val: string) => val ? (
                <span className="flex items-center gap-1.5 text-rose-600">
                    <BadgeAlert className="w-4 h-4" />
                    Eliminado
                </span>
            ) : (
                <span className="flex items-center gap-1.5 text-emerald-600">
                    <BadgeCheck className="w-4 h-4" />
                    Activo
                </span>
            )
        }
    ];

    return (
        <div className="space-y-8 p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Test (Offline)</h1>
                    <p className="text-slate-500 font-medium text-sm">Teste de filtros sem Supabase</p>
                </div>
            </div>

            {/* Admin Tabs */}
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit">
                <button
                    onClick={() => setActiveAdminTab("noticias")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeAdminTab === "noticias"
                            ? "bg-emerald-600 text-white shadow-lg"
                            : "text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    <List className="w-4 h-4" />
                    Notícias
                </button>
                <button
                    onClick={() => setActiveAdminTab("artigos")}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                        activeAdminTab === "artigos"
                            ? "bg-emerald-600 text-white shadow-lg"
                            : "text-slate-500 hover:bg-slate-50"
                    }`}
                >
                    <FileText className="w-4 h-4" />
                    Artigos & Documentos
                </button>
            </div>

            {/* Bin Toggle */}
            <div className="flex gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm w-fit">
                <button
                    onClick={() => setShowBin(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${!showBin ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <List className="w-4 h-4" />
                    Publicados
                </button>
                <button
                    onClick={() => setShowBin(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${showBin ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <List className="w-4 h-4" />
                    Lixeira
                </button>
            </div>

            {/* Results */}
            <div className="bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold mb-4">Resultados ({filteredArticles.length} itens)</h3>
                
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredArticles.map((article) => (
                            <div key={article.id} className="border border-slate-200 rounded-lg p-4">
                                <h4 className="font-bold">{article.title}</h4>
                                <p className="text-sm text-slate-500">Tipo: {article.type}</p>
                                <p className="text-sm text-slate-500">Estado: {article.deleted_at ? 'Eliminado' : 'Activo'}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <AdminDataTable
                        title="Artigos"
                        columns={columns}
                        data={filteredArticles}
                        loading={false}
                    />
                )}
            </div>

            {/* Debug Info */}
            <div className="bg-slate-100 p-4 rounded-xl">
                <h3 className="font-bold mb-2">Debug Info:</h3>
                <p><strong>Aba Activa:</strong> {activeAdminTab}</p>
                <p><strong>Mostrar Lixeira:</strong> {showBin ? 'Sim' : 'Não'}</p>
                <p><strong>Total Mock:</strong> {mockArticles.length}</p>
                <p><strong>Filtrados:</strong> {filteredArticles.length}</p>
                <details className="mt-2">
                    <summary className="cursor-pointer">Ver dados completos</summary>
                    <pre className="text-xs mt-2 bg-white p-2 rounded">
                        {JSON.stringify(filteredArticles, null, 2)}
                    </pre>
                </details>
            </div>
        </div>
    );
}
