"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Newspaper, FolderOpen } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";

// Mock data para teste offline
const mockArticles = [
    {
        id: 1,
        title: "Notícia de Agricultura 1",
        subtitle: "Subtítulo da notícia sobre agricultura sustentável",
        type: "Notícia",
        date: "2024-01-15",
        image_url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2",
        slug: "noticia-agricultura-1"
    },
    {
        id: 2,
        title: "Guia de Plantio 2024",
        subtitle: "Guia completo para plantio na estação actual",
        type: "Guia",
        date: "2024-01-14",
        image_url: "https://images.unsplash.com/photo-1592984337226-75d963e9e6a2",
        slug: "guia-plantio-2024"
    },
    {
        id: 3,
        title: "Documento Técnico",
        subtitle: "Relatório técnico sobre análise de solo",
        type: "document",
        date: "2024-01-13",
        image_url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8",
        slug: "documento-tecnico"
    },
    {
        id: 4,
        title: "Evento Agrícola",
        subtitle: "Feira agrícola nacional 2024",
        type: "Evento",
        date: "2024-01-12",
        image_url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
        slug: "evento-agricola"
    }
];

export default function TesteBlogPage() {
    const [activeTab, setActiveTab] = useState("noticias");
    const [searchQuery, setSearchQuery] = useState("");

    // Filtrar dados mock
    const filteredArticles = mockArticles.filter(item => {
        const isDocument = item.type === "document" || item.type === "Relatório" || item.type === "PDF" || item.type === "Documento";
        
        const matchesTab = activeTab === "noticias" ? !isDocument : isDocument;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    console.log("=== DEBUG OFFLINE ===");
    console.log("Active Tab:", activeTab);
    console.log("Search Query:", searchQuery);
    console.log("Filtered Items:", filteredArticles.map(item => ({ title: item.title, type: item.type })));

    return (
        <div className="min-h-screen bg-[#fcfcfd]">
            <PageHeader
                title={<>Blog do <span className="text-[#f97316]">Agro</span> (Teste Offline)</>}
                icon={Newspaper}
                backgroundImage="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Teste Blog", href: undefined }
                ]}
            />

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                {/* Search */}
                <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
                    <div className="relative w-full md:max-w-[640px] group">
                        <input
                            type="text"
                            placeholder="Pesquisar conteúdo..."
                            className="w-full bg-white border border-slate-200 rounded-[10px] pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316] shadow-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit">
                    <button
                        onClick={() => setActiveTab("noticias")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                            activeTab === "noticias"
                                ? "bg-emerald-600 text-white shadow-lg"
                                : "text-slate-500 hover:bg-slate-50"
                        }`}
                    >
                        <Newspaper className="w-4 h-4" />
                        Notícias ({mockArticles.filter(item => item.type !== "document").length})
                    </button>
                    <button
                        onClick={() => setActiveTab("documentos")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${
                            activeTab === "documentos"
                                ? "bg-emerald-600 text-white shadow-lg"
                                : "text-slate-500 hover:bg-slate-50"
                        }`}
                    >
                        <FolderOpen className="w-4 h-4" />
                        Documentos ({mockArticles.filter(item => item.type === "document").length})
                    </button>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    <div className="lg:col-span-9">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredArticles.map((item, i) => (
                                <NewsCard
                                    key={i}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    category={item.type}
                                    date={item.date}
                                    image={item.image_url}
                                    slug={item.slug}
                                />
                            ))}
                        </div>

                        {filteredArticles.length === 0 && (
                            <div className="text-center py-20">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                        {activeTab === "noticias" ? (
                                            <Newspaper className="w-8 h-8 text-slate-400" />
                                        ) : (
                                            <FolderOpen className="w-8 h-8 text-slate-400" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-700">
                                        {activeTab === "noticias" ? "Nenhuma notícia encontrada" : "Nenhum documento encontrado"}
                                    </h3>
                                    <p className="text-slate-500 max-w-md">
                                        {activeTab === "noticias" 
                                            ? "Não há notícias correspondentes aos filtros selecionados."
                                            : "Não há documentos disponíveis no momento."
                                        }
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
