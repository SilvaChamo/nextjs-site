"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { Button } from "@/components/ui/button";
import {
    Phone,
    Mail,
    Building2,
    Plus,
    Download,
    Search,
    CheckCircle2,
    Globe,
    Users,
    Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Contact {
    id: string;
    company_id: string | null;
    name: string;
    role: string;
    email: string;
    phone: string;
    phone_secondary: string;
    whatsapp: string;
    source: string;
    notes: string;
    is_verified: boolean;
    created_at: string;
    company?: {
        name: string;
        logo_url: string;
    };
}

export default function AdminContactosPage() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [companies, setCompanies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [importing, setImporting] = useState(false);
    const [importStatus, setImportStatus] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
    const [formData, setFormData] = useState({
        company_id: "",
        name: "",
        role: "",
        email: "",
        phone: "",
        phone_secondary: "",
        whatsapp: "",
        source: "manual",
        notes: "",
        is_verified: false
    });

    useEffect(() => {
        fetchContacts();
        fetchCompanies();
    }, []);

    async function fetchContacts() {
        setLoading(true);
        const { data, error } = await supabase
            .from('contacts')
            .select(`
                *,
                company:companies(name, logo_url)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching contacts:", error);
            // If table doesn't exist, show empty state
            setContacts([]);
        } else {
            setContacts(data || []);
        }
        setLoading(false);
    }

    async function fetchCompanies() {
        const { data } = await supabase
            .from('companies')
            .select('id, name, website, activity')
            .order('name');
        setCompanies(data || []);
    }

    async function handleSave() {
        try {
            if (editingContact) {
                const { error } = await supabase
                    .from('contacts')
                    .update({
                        ...formData,
                        company_id: formData.company_id || null,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', editingContact.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('contacts')
                    .insert({
                        ...formData,
                        company_id: formData.company_id || null
                    });
                if (error) throw error;
            }
            setShowModal(false);
            setEditingContact(null);
            resetForm();
            fetchContacts();
        } catch (error: any) {
            alert("Erro: " + error.message);
        }
    }

    async function handleDelete(contact: Contact) {
        if (!confirm(`Eliminar contacto "${contact.name}"?`)) return;
        try {
            const { error } = await supabase
                .from('contacts')
                .delete()
                .eq('id', contact.id);
            if (error) throw error;
            fetchContacts();
        } catch (error: any) {
            alert("Erro: " + error.message);
        }
    }

    async function handleImportFromWebsites() {
        setImporting(true);
        setImportStatus("A procurar contactos nos websites das empresas...");

        try {
            // Get companies with websites
            const companiesWithWebsites = companies.filter(c => c.website || c.activity);

            let imported = 0;
            for (const company of companiesWithWebsites) {
                const url = company.website || company.activity;
                if (!url) continue;

                setImportStatus(`A analisar: ${company.name}...`);

                try {
                    // Call our API to scrape the website
                    const response = await fetch('/api/scrape-contacts', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            url: url.startsWith('http') ? url : `https://${url}`,
                            company_id: company.id,
                            company_name: company.name
                        })
                    });

                    if (response.ok) {
                        const result = await response.json();
                        if (result.contacts?.length > 0) {
                            imported += result.contacts.length;
                        }
                    }
                } catch (e) {
                    console.error(`Failed to scrape ${company.name}:`, e);
                }
            }

            setImportStatus(`Importação concluída! ${imported} contactos encontrados.`);
            fetchContacts();
        } catch (error: any) {
            setImportStatus("Erro na importação: " + error.message);
        } finally {
            setImporting(false);
            setTimeout(() => setImportStatus(""), 5000);
        }
    }

    function resetForm() {
        setFormData({
            company_id: "",
            name: "",
            role: "",
            email: "",
            phone: "",
            phone_secondary: "",
            whatsapp: "",
            source: "manual",
            notes: "",
            is_verified: false
        });
    }

    function openEditModal(contact: Contact) {
        setEditingContact(contact);
        setFormData({
            company_id: contact.company_id || "",
            name: contact.name || "",
            role: contact.role || "",
            email: contact.email || "",
            phone: contact.phone || "",
            phone_secondary: contact.phone_secondary || "",
            whatsapp: contact.whatsapp || "",
            source: contact.source || "manual",
            notes: contact.notes || "",
            is_verified: contact.is_verified || false
        });
        setShowModal(true);
    }

    const filteredContacts = contacts.filter(c =>
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone?.includes(searchTerm) ||
        c.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            header: "Empresa",
            key: "company",
            render: (val: any, row: Contact) => (
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        {val?.name ? <Building2 className="w-5 h-5 text-emerald-500/50" /> : <Users className="w-5 h-5" />}
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 leading-tight">
                            {val?.name || "Empresa não vinculada"}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">
                            {row.name || "Sem nome de contacto"} • <span className="text-slate-400">{row.role || "Contacto"}</span>
                        </p>
                    </div>
                </div>
            )
        },
        {
            header: "Email",
            key: "email",
            render: (val: string) => val ? (
                <a href={`mailto:${val}`} className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1.5 text-xs transition-colors">
                    <div className="size-5 rounded bg-emerald-50 flex items-center justify-center">
                        <Mail className="w-3 h-3" />
                    </div>
                    {val}
                </a>
            ) : <span className="text-slate-300 text-xs">—</span>
        },
        {
            header: "Telefone",
            key: "phone",
            render: (val: string, row: Contact) => {
                const phone = val || row.whatsapp;
                return phone ? (
                    <span className="flex items-center gap-1.5 text-slate-600 font-medium text-xs">
                        <div className="size-5 rounded bg-slate-100 flex items-center justify-center">
                            <Phone className="w-3 h-3 text-slate-400" />
                        </div>
                        {phone}
                    </span>
                ) : <span className="text-slate-300 text-xs">—</span>;
            }
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Gestão de Contactos</h1>
                    <p className="text-slate-500 font-medium text-sm">Base de dados de contactos empresariais</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 w-64"
                        />
                    </div>

                    {/* Import Button */}
                    <Button
                        onClick={handleImportFromWebsites}
                        disabled={importing}
                        variant="outline"
                        className="gap-2 border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                        {importing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Globe className="w-4 h-4" />
                        )}
                        <span className="hidden md:inline">Importar de Websites</span>
                    </Button>

                    {/* Add Button */}
                    <Button
                        onClick={() => { resetForm(); setEditingContact(null); setShowModal(true); }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden md:inline">Novo Contacto</span>
                    </Button>
                </div>
            </div>

            {/* Import Status */}
            {importStatus && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700 text-sm font-medium flex items-center gap-2">
                    {importing && <Loader2 className="w-4 h-4 animate-spin" />}
                    {importStatus}
                </div>
            )}

            {/* Table */}
            <AdminDataTable
                title={`Contactos (${filteredContacts.length})`}
                columns={columns}
                data={filteredContacts}
                loading={loading}
                onEdit={openEditModal}
                onDelete={handleDelete}
                customActions={(row) => (
                    <button
                        onClick={async () => {
                            const newStatus = !row.is_verified;
                            await supabase.from('contacts').update({ is_verified: newStatus }).eq('id', row.id);
                            fetchContacts();
                        }}
                        className={`size-8 rounded-lg flex items-center justify-center transition-all shadow-sm ${row.is_verified
                                ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                : 'bg-slate-100 text-slate-400 hover:bg-emerald-500 hover:text-white'
                            }`}
                        title={row.is_verified ? "Verificado" : "Marcar como verificado"}
                    >
                        <CheckCircle2 className="w-4 h-4" />
                    </button>
                )}
            />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-xl font-black text-slate-900">
                                {editingContact ? "Editar Contacto" : "Novo Contacto"}
                            </h2>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Company */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Empresa</label>
                                <select
                                    value={formData.company_id}
                                    onChange={(e) => setFormData({ ...formData, company_id: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                >
                                    <option value="">Selecionar empresa...</option>
                                    {companies.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Name & Role */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Nome</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        placeholder="Nome do contacto"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Cargo</label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        placeholder="Ex: Director Comercial"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                    placeholder="email@empresa.com"
                                />
                            </div>

                            {/* Phones */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Telefone</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        placeholder="+258 84 000 0000"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">WhatsApp</label>
                                    <input
                                        type="tel"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                        placeholder="+258 84 000 0000"
                                    />
                                </div>
                            </div>

                            {/* Source */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Origem</label>
                                <select
                                    value={formData.source}
                                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                                >
                                    <option value="manual">Manual</option>
                                    <option value="website">Website</option>
                                    <option value="linkedin">LinkedIn</option>
                                    <option value="referral">Referência</option>
                                    <option value="other">Outro</option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1 block">Notas</label>
                                <textarea
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-20 resize-none"
                                    placeholder="Notas adicionais..."
                                />
                            </div>

                            {/* Verified */}
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_verified}
                                    onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-sm font-medium text-slate-700">Contacto verificado</span>
                            </label>
                        </div>

                        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowModal(false)}>
                                Cancelar
                            </Button>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSave}>
                                {editingContact ? "Guardar" : "Criar Contacto"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
