"use client";

import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { TrainingForm } from "@/components/admin/TrainingForm";
import { Button } from "@/components/ui/button";
import { Plus, GraduationCap } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminFormacaoPage({ userEmail }: { userEmail?: string }) {
    const [trainings, setTrainings] = useState<any[]>([]);
    const [isFormOpen, setFormOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<any>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [loading, setLoading] = useState(true);

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
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800">Gestão de Formações</h1>
                        <p className="text-sm text-slate-500 font-medium">Organize e publique cursos de capacitação agrícola.</p>
                    </div>
                    <Button
                        onClick={() => {
                            setEditingCourse(null);
                            setFormOpen(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 rounded-xl shadow-lg h-11 px-6"
                    >
                        <Plus className="w-4 h-4" />
                        Nova Formação
                    </Button>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
                    <AdminDataTable
                        title="Lista de Cursos"
                        data={trainings}
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
