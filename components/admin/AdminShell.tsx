"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
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
    LandPlot
} from "lucide-react";

interface AdminShellProps {
    children: React.ReactNode;
    userEmail: string | undefined;
}

export function AdminShell({ children, userEmail }: AdminShellProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

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
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all group whitespace-nowrap ${active
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
        <div className="flex min-h-screen bg-slate-50 font-sans">
            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-emerald-950 to-slate-950 text-white transition-all duration-300 transform shadow-xl ${isCollapsed ? "w-20" : "w-64"
                    } hidden lg:block`}
            >
                <div className="flex flex-col h-full border-r border-slate-800">
                    {/* Header */}
                    <div className={`h-16 flex items-center px-4 border-b border-white/5 bg-transparent transition-all ${isCollapsed ? "justify-center" : "justify-between"}`}>
                        {!isCollapsed && (
                            <div className="flex items-center gap-3 overflow-hidden">
                                <img src="/admin-icon.png" alt="Logo" className="w-8 h-8 object-contain" />
                                <div>
                                    <span className="font-black text-lg tracking-wider text-white block truncate">PAINEL</span>
                                    <span className="text-[9px] text-slate-500 uppercase tracking-widest block truncate">Administrativo</span>
                                </div>
                            </div>
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
                    <nav className="flex-1 px-2 py-6 flex flex-col gap-0 overflow-y-auto custom-scrollbar overflow-x-hidden">

                        {/* Section 1: Dashboard */}
                        <LinkItem href="/admin" icon={LayoutDashboard} label="Dashboard" />

                        <div className={`my-2 border-b border-slate-700 ${isCollapsed ? "mx-2" : "mx-4"}`}></div>

                        {/* Section 2: Management & Content */}
                        <div className="flex flex-col gap-0">
                            <LinkItem href="/admin/empresas" icon={Building2} label="Empresas" />
                            <LinkItem href="/admin/propriedades" icon={LandPlot} label="Propriedades" />
                            <LinkItem href="/admin/profissionais" icon={Users} label="Profissionais" />
                            <LinkItem href="/admin/produtos" icon={ShoppingCart} label="Produtos" />
                            <LinkItem href="/admin/noticias" icon={Newspaper} label="Notícias" />
                            <LinkItem href="/admin/artigos" icon={FileText} label="Artigos" />
                            <LinkItem href="/admin/documentos" icon={FileText} label="Documentos" />
                        </div>

                        <div className={`my-2 border-b border-slate-700 ${isCollapsed ? "mx-2" : "mx-4"}`}></div>

                        {/* Section 3: Analysis & Interaction */}
                        <div className="flex flex-col gap-1">
                            <LinkItem href="/admin/estatisticas" icon={BarChart3} label="Estatísticas" />
                            <LinkItem href="/admin/mensagens" icon={MessageSquare} label="Interacções" />
                        </div>

                        <div className={`my-2 border-b border-slate-700 ${isCollapsed ? "mx-2" : "mx-4"}`}></div>

                        {/* Section 4: Configuration */}
                        <div className="flex flex-col gap-1 mt-auto">
                            <LinkItem href="/admin/indicadores" icon={Target} label="Indicadores" />
                            <LinkItem href="/admin/categorias" icon={Grid2X2} label="Configurações" />
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
                        <form action="/auth/signout" method="post">
                            <button
                                className={`w-full flex items-center gap-2 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-md transition-colors ${isCollapsed ? "justify-center" : "justify-start px-2"
                                    }`}
                                title="Terminar Sessão"
                            >
                                <LogOut className="w-4 h-4 min-w-[16px]" />
                                {!isCollapsed && "Terminar Sessão"}
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 bg-slate-50 min-h-screen transition-all duration-300 ${isCollapsed ? "lg:ml-20" : "lg:ml-64"}`}>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
