"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { TrendingUp, TrendingDown } from "lucide-react";
import { IndicatorForm } from "@/components/admin/IndicatorForm";

export default function AdminIndicatorsPage() {
    const [indicators, setIndicators] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    async function fetchIndicators() {
        setLoading(true);
        const { data, error } = await supabase
            .from('dashboard_indicators')
            .select('*')
            .order('location', { ascending: true });

        if (error) console.error(error);
        else setIndicators(data || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchIndicators();
    }, []);

    const handleDelete = async (row: any) => {
        if (!confirm(`Deseja eliminar o indicador "${row.title}"?`)) return;

        try {
            const { error } = await supabase
                .from('dashboard_indicators')
                .delete()
                .eq('id', row.id);

            if (error) throw error;
            fetchIndicators();
        } catch (error: any) {
            alert("Erro ao eliminar: " + error.message);
        }
    };

    const columns = [
        {
            header: "Localização",
            key: "location",
            render: (val: string) => (
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${val === 'hero' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                    {val}
                </span>
            )
        },
        { header: "Título", key: "title" },
        {
            header: "Valor Actual",
            key: "value",
            render: (val: string) => <span className="text-slate-900 font-black">{val}</span>
        },
        {
            header: "Tendência",
            key: "trend",
            render: (val: string) => {
                if (!val) return <span className="text-slate-300">—</span>;
                const isDown = val.includes('↓');
                return (
                    <span className={`flex items-center gap-1 ${isDown ? 'text-red-500' : 'text-emerald-500'}`}>
                        {isDown ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                        {val}
                    </span>
                );
            }
        }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Indicadores de Performance</h1>
                <p className="text-slate-500 font-medium text-sm">Controle as métricas e indicadores de destaque do Hero e Sidebar.</p>
            </div>

            <AdminDataTable
                title="Métricas do Portal"
                columns={columns}
                data={indicators}
                loading={loading}
                onAdd={() => {
                    setEditingItem(null);
                    setShowForm(true);
                }}
                onEdit={(row) => {
                    setEditingItem(row);
                    setShowForm(true);
                }}
                onDelete={handleDelete}
            />

            {showForm && (
                <IndicatorForm
                    initialData={editingItem}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {
                        fetchIndicators();
                        setShowForm(false);
                    }}
                />
            )}
        </div>
    );
}
