"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Mail, Clock, Trash2 } from "lucide-react";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchMessages() {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error(error);
        else setMessages(data || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (row: any) => {
        if (!confirm(`Deseja eliminar a mensagem de "${row.name}"?`)) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', row.id);

            if (error) throw error;
            fetchMessages();
        } catch (error: any) {
            alert("Erro ao eliminar: " + error.message);
        }
    };

    const columns = [
        {
            header: "Remetente",
            key: "name",
            render: (val: string, row: any) => (
                <div>
                    <p className="font-black text-slate-800">{val}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{row.email}</p>
                </div>
            )
        },
        {
            header: "Mensagem",
            key: "message",
            render: (val: string) => <p className="line-clamp-2 max-w-md text-slate-600 font-medium">{val}</p>
        },
        {
            header: "Data",
            key: "created_at",
            render: (val: string) => (
                <span className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                    <Clock className="w-3 h-3" />
                    {new Date(val).toLocaleDateString()}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mensagens de Contacto</h1>
                    <p className="text-slate-500 font-medium text-sm">Visualize as mensagens enviadas pelos utilizadores através do site.</p>
                </div>
            </div>

            <AdminDataTable
                title="Mensagens Recebidas"
                columns={columns}
                data={messages}
                loading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
}
