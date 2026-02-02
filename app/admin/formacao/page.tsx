"use client";

import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { TrainingForm } from "@/components/admin/TrainingForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, GraduationCap, LayoutGrid, List, Search, Layers, Briefcase, TrendingUp, Factory, BarChart3 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminFormacaoPage({ userEmail }: { userEmail?: string }) {
    const [trainings, setTrainings] = useState<any[]>([]);
    const [isFormOpen, setFormOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<any>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [loading, setLoading] = useState(true);

    // UI States
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [activeTab, setActiveTab] = useState('Todos');

    const tabs = [
        { id: 'Todos', label: 'Todos', icon: Layers },
        { id: 'Tecnologia', label: 'Tecnologia', icon: GraduationCap },
        { id: 'Gestão', label: 'Gestão', icon: Briefcase },
        { id: 'Marketing', label: 'Marketing', icon: TrendingUp },
        { id: 'Produção', label: 'Produção', icon: Factory },
        { id: 'Financeiro', label: 'Financeiro', icon: BarChart3 },
    ];

    const fetchTrainings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('trainings')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setTrainings(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTrainings();
    }, [refreshTrigger]);

    // Filter Logic
    const filteredTrainings = trainings.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeTab === 'Todos' || t.category === activeTab;
        return matchesSearch && matchesCategory;
    });

    const columns = [
        { key: "title", header: "Título da Formação" },
        { key: "category", header: "Categoria" },
        {
            key: "date",
            header: "Data",
            render: (val: string) => <span className="font-bold text-slate-600">{val}</span>
        },
        {
            key: "price",
            header: "Preço",
            render: (val: string) => <span className="text-emerald-600 font-bold">{val}</span>
        },
        {
            key: "spots_total",
            header: "Vagas",
            render: (val: any) => <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{val}</span>
        }
    ];

    return (
        <AdminShell userEmail={userEmail}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão de Formações</h1>
                        <p className="text-slate-500">Organize e publique cursos de capacitação agrícola.</p>
                    </div>
                    <Button
                        onClick={() => {
                            setEditingCourse(null);
                            setFormOpen(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 rounded-xl shadow-lg h-10 px-6"
                    >
                        <Plus className="w-4 h-4" />
                        Nova Formação
                    </Button>
                </div>

                {/* Toolbar - Merged Tabs and Controls */}
                <div className="flex items-center gap-4 bg-white p-1 rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
                    {/* Tabs */}
                    <div className="flex items-center gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-emerald-600 text-white'
                                    : 'text-slate-500 hover:bg-orange-50 hover:text-orange-600'
                                    }`}
                            >
                                <tab.icon className="w-3.5 h-3.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Right Side Controls */}
                    <div className="flex items-center gap-2 ml-auto">
                        {/* Search */}
                        <div className="relative w-48 lg:w-64">
                            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                            <Input
                                placeholder="Pesquisar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-8 h-8 border-none bg-slate-50 focus-visible:ring-0 text-xs"
                            />
                        </div>

                        <div className="w-px h-4 bg-slate-200 mx-1"></div>

                        {/* View Mode */}
                        <div className="flex items-center gap-0.5 bg-slate-50 p-0.5 rounded-md border border-slate-100">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <LayoutGrid className="w-3.5 h-3.5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <List className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                    <AdminDataTable
                        title={activeTab === 'Todos' ? 'Todas Formações' : `Formações em ${activeTab}`}
                        data={filteredTrainings}
                        columns={columns}
                        loading={loading}
                        onEdit={(item) => {
                            setEditingCourse(item);
                            setFormOpen(true);
                        }}
                        onAdd={() => {
                            setEditingCourse(null);
                            setFormOpen(true);
                        }}
                    />
                </div>
            </div>

            {isFormOpen && (
                <TrainingForm
                    onClose={() => setFormOpen(false)}
                    onSuccess={() => {
                        setRefreshTrigger(prev => prev + 1);
                    }}
                    initialData={editingCourse}
                />
            )}
        </AdminShell>
    );
}
