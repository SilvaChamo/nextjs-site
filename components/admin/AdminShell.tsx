"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { syncManager } from "@/lib/syncManager";
import { toast } from "sonner";
import {
    Wifi, WifiOff, RefreshCw, Loader2,
    LayoutDashboard,
    Building2,
    MessageSquare,
    Newspaper,
    FileText,
    BarChart3,
    Target,
    Grid2X2,
    Users,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
    Menu,
    ShoppingCart,
    Contact,
    Mail,
    GraduationCap,
    LandPlot,
    Database
} from "lucide-react";

interface AdminShellProps {
    children: React.ReactNode;
    userEmail: string | undefined;
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isOnline } = useNetworkStatus();
    const [isSyncing, setIsSyncing] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await supabase.auth.signOut();
            router.refresh();
            router.push('/login');
            toast.success("Sessão terminada.");
        } catch (error) {
            toast.error("Erro ao sair.");
        } finally {
            setIsSigningOut(false);
        }
    };

    useEffect(() => {
        const checkQueue = () => {
            const queue = syncManager.getQueue();
            setPendingCount(queue.length);
        };
        checkQueue();
        const interval = setInterval(checkQueue, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSync = async () => {
        if (!isOnline) {
            toast.error("Ainda sem conexão...");
            return;
        }
        setIsSyncing(true);
        const res = await syncManager.processQueue();
        setIsSyncing(false);
        if (res.count > 0) {
            toast.success(`${res.count} alterações sincronizadas com sucesso!`);
        } else {
            toast.info("Nada para sincronizar.");
        }
    };

    const isActive = (path: string) => {
        if (path === "/admin" && pathname === "/admin") return true;
        if (path !== "/admin" && pathname.startsWith(path)) return true;
        return false;
    };

    const LinkItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
        const active = isActive(href);
        return (
            <Link
                href={href}
                className={`flex items-center gap-3 px-4 py-2 text-sm font-semibold rounded-xl transition-all group whitespace-nowrap ${active
                    ? "text-orange-500"
                    : "text-slate-400 hover:text-orange-500"
                    } ${isCollapsed ? "justify-center px-2" : ""}`}
                title={isCollapsed ? label : undefined}
            >
                <Icon className={`w-5 h-5 min-w-[20px] transition-colors ${active ? "text-orange-500" : "text-slate-500 group-hover:text-orange-500"
                    }`} />
                {!isCollapsed && <span>{label}</span>}
            </Link>
        );
    };

    return (
        <div className="flex min-h-screen bg-slate-100 font-sans">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-emerald-950 border-b border-white/5 z-[60] flex items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-3 overflow-hidden">
                    <img src="/admin-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
                    <span className="font-black text-lg tracking-wider text-white">PAINEL</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-400 hover:text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </header>

            {/* Sidebar Overlay (Mobile) */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-[70]"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-[80] bg-gradient-to-b from-emerald-950 to-slate-950 text-white transition-all duration-300 transform shadow-xl 
                    ${isCollapsed ? "w-20" : "w-64"} 
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="flex flex-col h-full border-r border-slate-800">
                    {/* Header */}
                    <div className={`h-16 flex items-center px-4 border-b border-white/5 bg-transparent transition-all ${isCollapsed ? "justify-center" : "justify-between"}`}>
                        {!isCollapsed && (
                            <Link href="/" className="flex items-center gap-3 overflow-hidden hover:opacity-80 transition-opacity">
                                <img src="/admin-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
                                <div>
                                    <span className="font-black text-lg tracking-wider text-white block truncate">PAINEL</span>
                                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block truncate">Administrativo</span>
                                </div>
                            </Link>
                        )}
                        {/* Collapse Toggle */}
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={`text-slate-500 hover:text-white transition-colors p-1 rounded-md hover:bg-slate-800 ${isCollapsed ? "w-full flex justify-center" : ""}`}
                            title={isCollapsed ? "Expandir" : "Colapsar"}
                        >
                            {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-2 py-2 flex flex-col gap-0 overflow-hidden">

                        {/* Section 1: Dashboard */}
                        <LinkItem href="/admin" icon={LayoutDashboard} label="Dashboard" />

                        <div className={`my-2 border-b border-slate-700 ${isCollapsed ? "mx-2" : "mx-4"}`}></div>

                        {/* Section 2: Management & Content */}
                        <div className="flex flex-col gap-0">
                            <LinkItem href="/admin/empresas" icon={Building2} label="Empresas" />
                            <LinkItem href="/admin/mensagens" icon={Mail} label="Mensagens" /> {/* Added Messages Link */}
                            <LinkItem href="/admin/propriedades" icon={LandPlot} label="Propriedades" />
                            <LinkItem href="/admin/profissionais" icon={Users} label="Profissionais" />
                            <LinkItem href="/admin/produtos" icon={ShoppingCart} label="Produtos" />
                            <LinkItem href="/admin/noticias" icon={Newspaper} label="Notícias" />
                            <LinkItem href="/admin/artigos" icon={FileText} label="Artigos" />
                            <LinkItem href="/admin/formacao" icon={GraduationCap} label="Formação" />
                            <LinkItem href="/admin/documentos" icon={FileText} label="Documentos" />
                        </div>

                        <div className={`my-2 border-b border-slate-700 ${isCollapsed ? "mx-2" : "mx-4"}`}></div>

                        {/* Section 3: Analysis & Interaction */}
                        <div className="flex flex-col gap-0">
                            <LinkItem href="/admin/estatisticas" icon={BarChart3} label="Estatísticas" />
                            <LinkItem href="/admin/mensagens" icon={MessageSquare} label="Interacções" />
                            <LinkItem href="/admin/contactos" icon={Contact} label="Contactos" />
                        </div>

                        <div className={`my-2 border-b border-slate-700 ${isCollapsed ? "mx-2" : "mx-4"}`}></div>

                        {/* Section 4: Configuration */}
                        <div className="flex flex-col gap-0 mt-auto">
                            <LinkItem href="/admin/indicadores" icon={Target} label="Indicadores" />
                            <LinkItem href="/admin/configuracoes" icon={Grid2X2} label="Configurações" />

                            <LinkItem href="/admin/utilizadores" icon={Users} label="Utilizadores" />
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/5 bg-transparent">
                        {!isCollapsed && (
                            <div className="flex items-center gap-3 px-2 py-2 mb-2 overflow-hidden">
                                <div className="w-8 h-8 min-w-[32px] rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold ring-2 ring-emerald-500/30">
                                    AD
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">Administrador</p>
                                    <p className="text-[10px] text-slate-500 truncate">{userEmail}</p>
                                </div>
                            </div>
                        )}

                        {/* Logout Button */}
                        <button
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className={`w-full flex items-center gap-2 py-2.5 text-xs font-bold text-slate-400 hover:text-orange-500 hover:bg-orange-500/5 px-2 rounded-xl transition-all cursor-pointer group ${isCollapsed ? "justify-center" : "justify-start"
                                }`}
                            title="Terminar Sessão"
                        >
                            {isSigningOut ? (
                                <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                            ) : (
                                <LogOut className="w-4 h-4 min-w-[16px] transition-transform group-hover:translate-x-0.5" />
                            )}
                            {!isCollapsed && <span>{isSigningOut ? "A sair..." : "Terminar Sessão"}</span>}
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 bg-slate-100 min-h-screen transition-all duration-300 mt-16 lg:mt-0 ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
