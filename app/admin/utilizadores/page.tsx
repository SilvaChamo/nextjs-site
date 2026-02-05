"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { UserPlus, Mail, Shield, ShieldAlert, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("admin");
    const [filterPlan, setFilterPlan] = useState<string>("all");

    // Edit Modal State
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [editRole, setEditRole] = useState("");
    const [editPlan, setEditPlan] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Plans for filtering
    const PLANS = ["Visitante", "Basic", "Profissional", "Premium", "Parceiro"];

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('*');

            if (error) {
                console.error(error);
            } else {
                // Sort: admins first, then by creation date
                const sorted = (data || []).sort((a, b) => {
                    if (a.role === 'admin' && b.role !== 'admin') return -1;
                    if (a.role !== 'admin' && b.role === 'admin') return 1;
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
                setUsers(sorted);
            }
            setLoading(false);
        }

        fetchUsers();
    }, []);

    const handleInvite = async () => {
        if (!inviteEmail) return;
        alert(`Simulação: Convite enviado para ${inviteEmail} com função ${inviteRole}.`);
        setIsInviteOpen(false);
        setInviteEmail("");
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setEditRole(user.role || 'user');
        setEditPlan(user.plan || 'Visitante');
        setNewPassword(""); // Clear password field on each edit
        setIsEditOpen(true);
    };

    const handleUpdateUser = async () => {
        if (!editingUser) return;
        setIsUpdating(true);
        try {
            const response = await fetch('/api/admin/update-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: editingUser.id,
                    role: editRole,
                    plan: editPlan,
                    password: newPassword || undefined
                })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "Erro ao atualizar utilizador");

            // Update local state
            setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, role: editRole, plan: editPlan } : u));
            setIsEditOpen(false);
            setNewPassword("");
            alert("Utilizador atualizado com sucesso!");
        } catch (error: any) {
            alert(`Erro ao atualizar: ${error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };

    const columns = [
        {
            header: "Utilizador",
            key: "email",
            render: (val: string, row: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 overflow-hidden relative">
                        {row.avatar_url ? (
                            <img
                                src={row.avatar_url}
                                alt={row.full_name || val}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    (e.target as HTMLImageElement).src = "";
                                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                                }}
                            />
                        ) : (
                            <User className="w-5 h-5" />
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-slate-800">{row.full_name || 'Sem nome'}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{val}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Plano",
            key: "plan",
            render: (val: string) => {
                const colors: Record<string, string> = {
                    Visitante: "bg-slate-100 text-slate-500",
                    Basic: "bg-blue-50 text-blue-600",
                    Profissional: "bg-orange-50 text-orange-600",
                    Premium: "bg-purple-50 text-purple-600",
                    Parceiro: "bg-emerald-50 text-emerald-600"
                };
                return (
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider ${colors[val] || "bg-slate-100 text-slate-500"}`}>
                        {val || 'Visitante'}
                    </span>
                );
            }
        },
        {
            header: "Função",
            key: "role",
            render: (val: string) => (
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${val === 'admin'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-slate-100 text-slate-500'
                    }`}>
                    {val === 'admin' ? <ShieldAlert className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                    {val || 'User'}
                </span>
            )
        },
        {
            header: "Data Registo",
            key: "created_at",
            render: (val: string) => (
                <span className="text-slate-400 text-xs font-medium">
                    {val ? new Date(val).toLocaleDateString() : '-'}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Utilizadores</h1>
                </div>

                <div className="flex gap-2">
                    <select
                        className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                        value={filterPlan}
                        onChange={(e) => setFilterPlan(e.target.value)}
                    >
                        <option value="all">Todos os Planos</option>
                        {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>

                    <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <UserPlus className="w-4 h-4 mr-2" />
                                Adicionar Utilizador
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Convidar Utilizador</DialogTitle>
                                <DialogDescription>
                                    Envie um convite por email para um novo administrador ou editor.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                                    <Input
                                        placeholder="email@exemplo.com"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Função</label>
                                    <select
                                        className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                    >
                                        <option value="admin">Administrador</option>
                                        <option value="editor">Editor</option>
                                        <option value="user">Utilizador</option>
                                    </select>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancelar</Button>
                                <Button onClick={handleInvite} className="bg-emerald-600 hover:bg-emerald-700">Enviar Convite</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Utilizador</DialogTitle>
                        <DialogDescription>
                            Atualize as permissões e o plano de <strong>{editingUser?.full_name || editingUser?.email}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Função</label>
                            <select
                                className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                                value={editRole}
                                onChange={(e) => setEditRole(e.target.value)}
                            >
                                <option value="admin">Administrador</option>
                                <option value="editor">Editor</option>
                                <option value="user">Utilizador</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Plano</label>
                            <select
                                className="w-full h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
                                value={editPlan}
                                onChange={(e) => setEditPlan(e.target.value)}
                            >
                                {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Nova Senha (opcional)</label>
                            <Input
                                type="password"
                                placeholder="Deixe em branco para não alterar"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <p className="text-[10px] text-slate-400 font-medium">
                                Mínimo 6 caracteres se desejar alterar.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
                        <Button onClick={handleUpdateUser} disabled={isUpdating} className="bg-[#f97316] hover:bg-orange-700">
                            {isUpdating ? "A processar..." : "Salvar Alterações"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AdminDataTable
                title="Utilizadores do Sistema"
                columns={columns}
                data={filterPlan === 'all' ? users : users.filter(u => (u.plan || 'Visitante') === filterPlan)}
                loading={loading}
                onEdit={handleEdit}
                onDelete={() => alert("Funcionalidade de eliminação de utilizadores sensível.")}
            />
        </div>
    );
}
