"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Mail, Clock, Trash2, Users } from "lucide-react";



export default function AdminMessagesPage() {
    const [activeTab, setActiveTab] = useState<'messages' | 'newsletter'>('messages');
    const [messages, setMessages] = useState<any[]>([]);
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        if (activeTab === 'messages') {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error(error);
            else setMessages(data || []);
        } else {
            const { data, error } = await supabase
                .from('newsletter_subscribers')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error(error);
            else setSubscribers(data || []);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleDelete = async (row: any) => {
        const table = activeTab === 'messages' ? 'contact_messages' : 'newsletter_subscribers';
        const confirmMsg = activeTab === 'messages'
            ? `Deseja eliminar a mensagem de "${row.name}"?`
            : `Deseja remover o email "${row.email}" da newsletter?`;

        if (!confirm(confirmMsg)) return;

        try {
            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', row.id);

            if (error) throw error;
            fetchData();
        } catch (error: any) {
            alert("Erro ao eliminar: " + error.message);
        }
    };

    const messageColumns = [
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

    const subscriberColumns = [
        {
            header: "Email",
            key: "email",
            render: (val: string) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-700">{val}</span>
                </div>
            )
        },
        {
            header: "Subscrito em",
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
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Interacções</h1>
                    <p className="text-slate-500 font-medium text-sm">Gira mensagens de contacto e subscrições de newsletter.</p>
                </div>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit">
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'messages' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50'
                        }`}
                >
                    <Mail className="w-4 h-4" />
                    Mensagens
                </button>
                <button
                    onClick={() => setActiveTab('newsletter')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'newsletter' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50'
                        }`}
                >
                    <Users className="w-4 h-4" />
                    Newsletter
                </button>
            </div>

            <AdminDataTable
                title={activeTab === 'messages' ? "Mensagens Recebidas" : "Lista de Subscritores"}
                columns={activeTab === 'messages' ? messageColumns : subscriberColumns}
                data={activeTab === 'messages' ? messages : subscribers}
                loading={loading}
                onDelete={handleDelete}
            />
        </div>
    );
}
