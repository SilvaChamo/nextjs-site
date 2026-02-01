"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function DebugTypesPage() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllArticles = async () => {
            try {
                const supabase = createClient();
                const { data, error } = await supabase
                    .from('articles')
                    .select('id, title, type, deleted_at')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error("Error:", error);
                } else {
                    setArticles(data || []);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllArticles();
    }, []);

    // Get unique types
    const uniqueTypes = [...new Set(articles.map(a => a.type || 'NULL'))];
    const typeCounts = uniqueTypes.reduce((acc, type) => {
        acc[type] = articles.filter(a => (a.type || 'NULL') === type).length;
        return acc;
    }, {} as Record<string, number>);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600">A carregar dados...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Debug: Tipos de Artigos</h1>
                
                {/* Summary */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-4">Resumo</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-50 p-4 rounded-lg">
                            <p className="text-2xl font-bold text-slate-900">{articles.length}</p>
                            <p className="text-sm text-slate-600">Total de Artigos</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                            <p className="text-2xl font-bold text-emerald-600">{uniqueTypes.length}</p>
                            <p className="text-sm text-slate-600">Tipos Únicos</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{articles.filter(a => a.deleted_at === null).length}</p>
                            <p className="text-sm text-slate-600">Activos</p>
                        </div>
                        <div className="bg-rose-50 p-4 rounded-lg">
                            <p className="text-2xl font-bold text-rose-600">{articles.filter(a => a.deleted_at !== null).length}</p>
                            <p className="text-sm text-slate-600">Eliminados</p>
                        </div>
                    </div>
                </div>

                {/* Types Breakdown */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-4">Tipos Encontrados</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {Object.entries(typeCounts).map(([type, count]) => (
                            <div key={type} className="border border-slate-200 rounded-lg p-3">
                                <p className="font-mono text-sm font-bold text-slate-900">{type}</p>
                                <p className="text-2xl font-bold text-emerald-600">{count}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter Test */}
                <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-4">Teste de Filtros</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Nossos filtros para "Documentos":</h3>
                            <code className="block bg-slate-100 p-3 rounded text-sm">
                                ['document', 'Relatório', 'PDF', 'Documento', 'Artigo Científico', 'Artigo Técnico', 'Estudo', 'Pesquisa']
                            </code>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Artigos que seriam filtrados:</h3>
                            <div className="space-y-2">
                                {articles
                                    .filter(article => {
                                        const documentTypes = ['document', 'Relatório', 'PDF', 'Documento', 'Artigo Científico', 'Artigo Técnico', 'Estudo', 'Pesquisa'];
                                        return documentTypes.includes(article.type || '');
                                    })
                                    .map(article => (
                                        <div key={article.id} className="bg-rose-50 border border-rose-200 p-3 rounded">
                                            <p className="font-semibold">{article.title}</p>
                                            <p className="text-sm text-slate-600">Tipo: <span className="font-mono">{article.type || 'NULL'}</span></p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-2">Artigos que NÃO seriam filtrados:</h3>
                            <div className="space-y-2">
                                {articles
                                    .filter(article => {
                                        const documentTypes = ['document', 'Relatório', 'PDF', 'Documento', 'Artigo Científico', 'Artigo Técnico', 'Estudo', 'Pesquisa'];
                                        return !documentTypes.includes(article.type || '');
                                    })
                                    .map(article => (
                                        <div key={article.id} className="bg-emerald-50 border border-emerald-200 p-3 rounded">
                                            <p className="font-semibold">{article.title}</p>
                                            <p className="text-sm text-slate-600">Tipo: <span className="font-mono">{article.type || 'NULL'}</span></p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full List */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold mb-4">Lista Completa</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="text-left p-2">ID</th>
                                    <th className="text-left p-2">Título</th>
                                    <th className="text-left p-2">Tipo</th>
                                    <th className="text-left p-2">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map(article => (
                                    <tr key={article.id} className="border-b border-slate-100">
                                        <td className="p-2">{article.id}</td>
                                        <td className="p-2">{article.title}</td>
                                        <td className="p-2">
                                            <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                                                {article.type || 'NULL'}
                                            </span>
                                        </td>
                                        <td className="p-2">
                                            {article.deleted_at ? (
                                                <span className="text-rose-600">Eliminado</span>
                                            ) : (
                                                <span className="text-emerald-600">Activo</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
