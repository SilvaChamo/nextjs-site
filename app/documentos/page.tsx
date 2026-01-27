"use client";

import React, { useEffect, useState } from "react";
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { FileText, Search, ArrowDownToLine, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { createClient } from "@supabase/supabase-js";

// DEMO FALLBACK DATA
const FALLBACK_DOCS = [
    {
        id: 'd1',
        title: "Lei de Terras de Moçambique",
        slug: "lei-terras-mocambique",
        date: "2024-01-15",
        type: "document"
    },
    {
        id: 'd2',
        title: "Plano Estratégico do Sector Agrário (PEDSA II 2020-2029)",
        slug: "pedsa-ii-2020-2029",
        date: "2023-11-05",
        type: "document"
    },
    {
        id: 'd3',
        title: "Anuário de Estatísticas Agrárias 2023",
        slug: "anuarios-estatisticas-agrarias-2023",
        date: "2023-12-20",
        type: "document"
    }
];

export default function DocumentsArchivePage() {
    const [docs, setDocs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchDocs() {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('type', 'document')
                    .order('date', { ascending: false })
                    .limit(3);

                if (error) throw error;
                const allDocs = [...(data || []), ...FALLBACK_DOCS];
                setDocs(allDocs.slice(0, 3));
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchDocs();
    }, []);

    const filteredDocs = docs.filter(doc =>
        doc.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <StandardBlogTemplate
            title="Documentos e Legislação"
            backgroundImage="https://images.unsplash.com/photo-1450101499163-18848c4e59e9?q=80&w=2000&auto=format&fit=crop"
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Repositório", href: "/repositorio" },
                { label: "Documentos", href: undefined }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">Filtrar</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Procurar documentos..."
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-[10px] text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-4">
                {loading ? (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white rounded-[15px] h-[80px]" />
                    ))
                ) : filteredDocs.length > 0 ? (
                    filteredDocs.map((doc) => (
                        <div key={doc.id} className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                            <div className="flex items-center gap-5">
                                <div className="size-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-rose-600 transition-colors uppercase leading-tight">{doc.title}</h3>
                                    <div className="flex items-center gap-4 mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(doc.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="bg-slate-50 text-slate-400 p-2.5 rounded-lg hover:bg-rose-500 hover:text-white transition-all">
                                    <ArrowDownToLine className="w-5 h-5" />
                                </button>
                                <Link href={`/artigos/${doc.slug}`}>
                                    <button className="bg-slate-50 text-slate-400 p-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center text-slate-400 bg-white rounded-[20px] border border-dashed border-slate-200">
                        Nenhum documento disponível no momento.
                    </div>
                )}
            </div>
        </StandardBlogTemplate>
    );
}
