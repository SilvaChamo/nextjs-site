"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Building2, Users, ShoppingCart, Globe, Phone, CheckCircle2, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyForm } from "@/components/admin/CompanyForm";
import { ProfessionalForm } from "@/components/admin/ProfessionalForm";
import { ProductForm } from "@/components/admin/ProductForm";

export default function AdminEmpresasPage() {
    const [view, setView] = useState<'companies' | 'professionals' | 'products'>('companies');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    async function fetchData() {
        setLoading(true);
        const table = view === 'companies' ? 'companies' : view === 'professionals' ? 'professionals' : 'produtos';
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error(error);
        else setData(data || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [view]);

    const handleDelete = async (row: any) => {
        const type = view === 'companies' ? 'empresa' : view === 'professionals' ? 'profissional' : 'produto';
        const name = row.name || row.nome || row.id;

        if (!confirm(`Tem a certeza que deseja eliminar o ${type} "${name}"?`)) return;

        try {
            const table = view === 'companies' ? 'companies' : view === 'professionals' ? 'professionals' : 'produtos';
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

    const toggleVerify = async (row: any) => {
        try {
            const { error } = await supabase
                .from('companies')
                .update({ is_verified: !row.is_verified })
                .eq('id', row.id);
            if (error) throw error;
            fetchData();
        } catch (err: any) {
            alert("Erro ao verificar: " + err.message);
        }
    };

    const activatePremium = async (row: any) => {
        if (!confirm("Confirmar ativação do plano Profissional?")) return;
        try {
            const { error } = await supabase
                .from('companies')
                .update({ plan: 'profissional' })
                .eq('id', row.id);
            if (error) throw error;
            fetchData();
        } catch (err: any) {
            alert("Erro: " + err.message);
        }
    };

    const companyColumns = [
        {
            header: "Empresa",
            key: "name",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    {row.logo_url ? (
                        <img src={row.logo_url} alt={val} className="size-8 rounded border border-slate-100" />
                    ) : (
                        <div className="size-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                            <Building2 className="w-4 h-4" />
                        </div>
                    )}
                    <span className="font-black text-slate-800">{val}</span>
                </div>
            )
        },
        { header: "Sector", key: "sector" },
        {
            header: "Contacto",
            key: "phone",
            render: (val: string) => val ? (
                <span className="flex items-center gap-1 text-slate-400">
                    <Phone className="w-3 h-3" />
                    {val}
                </span>
            ) : null
        },
        {
            header: "Website",
            key: "website",
            render: (val: string) => val ? (
                <a href={val} target="_blank" className="text-emerald-500 hover:underline flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    Link
                </a>
            ) : null
        },
        {
            header: "Estado",
            key: "is_verified",
            render: (val: boolean, row: any) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => toggleVerify(row)}
                        className={`p-1.5 rounded-full transition-colors ${val ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'}`}
                        title="Verificar Empresa"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                    </button>
                    {row.plan === 'parceiro' && <span className="bg-emerald-950 text-white px-2 py-0.5 rounded text-[10px] font-bold">Parceiro</span>}
                    {row.plan === 'profissional' && <span className="bg-orange-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">Pro</span>}
                </div>
            )
        },
        {
            header: "Acções",
            key: "id",
            render: (_: string, row: any) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0 rounded-full border-green-200 text-green-600 hover:bg-green-50"
                        title="Contactar via WhatsApp"
                        onClick={() => {
                            const num = row.contact || row.phone;
                            if (num) window.open(`https://wa.me/${num.replace(/\s+/g, '')}`, '_blank');
                            else alert("Sem contacto");
                        }}
                    >
                        <MessageCircle className="w-3.5 h-3.5" />
                    </Button>
                    {row.plan !== 'profissional' && row.plan !== 'parceiro' && (
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 text-[10px] font-bold uppercase text-orange-500 hover:text-orange-600 hover:bg-orange-50"
                            onClick={() => activatePremium(row)}
                        >
                            Activar Pro
                        </Button>
                    )}
                </div>
            )
        }
    ];

    const professionalColumns = [
        { header: "Nome", key: "name", render: (val: string) => <span className="font-black text-slate-800">{val}</span> },
        { header: "Especialidade", key: "specialty" },
        { header: "Localização", key: "location" }
    ];

    const productColumns = [
        { header: "Produto", key: "nome", render: (val: string) => <span className="font-black text-slate-800">{val}</span> },
        { header: "Categoria", key: "category" },
        {
            header: "Preço",
            key: "preco",
            render: (val: number) => <span className="text-emerald-600 font-bold">{val?.toLocaleString()} MT</span>
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Empresas Agrário</h1>
                    <p className="text-slate-500 font-medium text-sm">Gira empresas, profissionais e produtos do ecossistema.</p>
                </div>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit">
                <button
                    onClick={() => setView('companies')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'companies' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50'
                        }`}
                >
                    <Building2 className="w-4 h-4" />
                    Empresas
                </button>
                <button
                    onClick={() => setView('professionals')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'professionals' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50'
                        }`}
                >
                    <Users className="w-4 h-4" />
                    Profissionais
                </button>
                <button
                    onClick={() => setView('products')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'products' ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50'
                        }`}
                >
                    <ShoppingCart className="w-4 h-4" />
                    Produtos
                </button>
            </div>

            <AdminDataTable
                title={view === 'companies' ? "Empresas Registadas" : view === 'professionals' ? "Profissionais Registados" : "Insumos & Produtos"}
                columns={view === 'companies' ? companyColumns : view === 'professionals' ? professionalColumns : productColumns}
                data={data}
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

            {showForm && view === 'companies' && (
                <CompanyForm
                    initialData={editingItem}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {
                        fetchData();
                        setShowForm(false);
                    }}
                />
            )}

            {showForm && view === 'professionals' && (
                <ProfessionalForm
                    initialData={editingItem}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {
                        fetchData();
                        setShowForm(false);
                    }}
                />
            )}

            {showForm && view === 'products' && (
                <ProductForm
                    initialData={editingItem}
                    onClose={() => setShowForm(false)}
                    onSuccess={() => {
                        fetchData();
                        setShowForm(false);
                    }}
                />
            )}
        </div>
    );
}
