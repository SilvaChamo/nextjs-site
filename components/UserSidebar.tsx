import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    User,
    LogOut,
    Crown,
    ChevronLeft,
    ChevronRight,
    Settings,
    HelpCircle,
    ArrowRight
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { usePlanPermissions } from "@/hooks/usePlanPermissions";

const navigation = [
    { name: "Minha Conta", href: "/usuario/dashboard/minha-conta", icon: User },
];

interface UserSidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export function UserSidebar({ isCollapsed, toggleSidebar }: UserSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    // Plan permissions
    const {
        plan,
        planDisplayName
    } = usePlanPermissions();

    // Create Supabase client
    const supabase = createClient();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            router.push('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, [supabase]);

    // Filter navigation based on plan - Currently only show "Minha Conta"
    // The rest was moved to the central dashboard grid
    const filteredNavigation = navigation;

    return (
        <aside className="w-full h-full bg-emerald-950 flex flex-col text-slate-300 shrink-0 transition-all duration-300">

            {/* 1. Header Area with Dashboard Title */}
            <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-6'} border-b border-emerald-900 transition-all`}>
                <Link href="/usuario/dashboard" className={`flex items-center ${isCollapsed ? 'justify-center w-10 h-10 p-0' : 'w-full gap-3 px-4 py-3'} bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all group rounded-md shadow-lg shadow-orange-500/20`}>
                    <LayoutDashboard className="w-5 h-5 text-white" />
                    {!isCollapsed && <span className="font-heading font-bold text-base tracking-wide uppercase">Dashboard</span>}
                </Link>
            </div>

            {/* User Profile Section */}
            <div className={`py-6 border-b border-emerald-800 ${isCollapsed ? 'px-2 flex justify-center' : 'px-6'} relative group`}>
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-emerald-900 border border-emerald-700 flex items-center justify-center overflow-hidden shrink-0">
                        {user?.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-5 h-5 text-emerald-400" />
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-white truncate leading-tight">
                                {user?.user_metadata?.full_name || "Usuário"}
                            </p>
                            <div className="mt-0.5">
                                <p className="text-[10px] text-emerald-400 truncate leading-tight font-medium">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Collapse Button */}
                {!isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-emerald-400 hover:text-white hover:bg-emerald-800 transition-colors opacity-0 group-hover:opacity-100"
                        title="Encolher menu"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                )}
                {isCollapsed && (
                    <button
                        onClick={toggleSidebar}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 p-1 bg-emerald-700 border border-emerald-600 rounded-full text-white shadow-md hover:bg-emerald-600 transition-all z-50"
                        title="Expandir menu"
                    >
                        <ChevronRight className="w-3 h-3" />
                    </button>
                )}
            </div>

            {/* 2. Main Navigation */}
            <nav className={`flex-1 overflow-y-auto py-6 space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`}>
                {!isCollapsed && <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Menu Principal</p>}
                {filteredNavigation.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${isActive
                                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                : "text-slate-400 hover:text-[#f97316]"
                                } ${isCollapsed ? 'justify-center' : ''}`}
                            title={isCollapsed ? item.name : undefined}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-500 group-hover:text-[#f97316]"}`} />
                            {!isCollapsed && item.name}
                        </Link>
                    );
                })}

                <div className="mt-8 pt-6 border-t border-emerald-900/50">
                    {!isCollapsed && <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sistema</p>}
                    <Link href="/usuario/dashboard/configuracoes" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-[#f97316] transition-all group ${isCollapsed ? 'justify-center' : 'w-full text-left'}`} title={isCollapsed ? "Configurações" : undefined}>
                        <Settings className="w-5 h-5 text-slate-500 group-hover:text-[#f97316]" />
                        {!isCollapsed && "Configurações"}
                    </Link>
                    <Link href="/usuario/dashboard/ajuda" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-[#f97316] transition-all group ${isCollapsed ? 'justify-center' : 'w-full text-left'}`} title={isCollapsed ? "Ajuda & Suporte" : undefined}>
                        <HelpCircle className="w-5 h-5 text-slate-500 group-hover:text-[#f97316]" />
                        {!isCollapsed && "Ajuda & Suporte"}
                    </Link>

                    {/* Configurações de Conta Section */}
                    {!isCollapsed && (
                        <div className="mt-6 pt-6 border-t border-emerald-900/50">
                            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Configurações de Conta</p>
                            <div className="space-y-1">
                                <Link href="/usuario/dashboard/minha-conta" className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all group">
                                    <span>Meus Dados</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-orange-500 transition-colors" />
                                </Link>
                                <Link href="/usuario/dashboard/opcoes" className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-all group">
                                    <span>Opções</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-orange-500 transition-colors" />
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className={`mt-4 flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-orange-500 hover:bg-orange-500/10 hover:text-orange-400 transition-all group ${isCollapsed ? 'justify-center' : 'w-full text-left'}`}
                        title={isCollapsed ? "Sair da Sessão" : undefined}
                    >
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && "Sair da Sessão"}
                    </button>
                </div>
            </nav>

            {/* 3. Footer Area (Upgrade Notification) */}
            <div className="mt-auto border-t border-emerald-900 bg-emerald-950">
                {!isCollapsed && (plan === 'Gratuito' || plan === 'Visitante') && (
                    <div className="w-full bg-white/5 backdrop-blur-md border-t border-white/5 p-4 relative overflow-hidden group hover:bg-white/10 transition-all cursor-pointer">
                        <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Crown className="w-16 h-16 text-white" />
                        </div>
                        <Link href="/planos" className="relative z-10 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <Crown className="w-4 h-4 text-orange-500" />
                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-wider">UPGRADE DISPONÍVEL</span>
                            </div>
                            <h4 className="text-white font-bold text-sm leading-tight">
                                Desbloqueie todos os recursos
                            </h4>
                            <div className="mt-2 flex items-center gap-2 text-[10px] text-white/90 font-medium bg-white/5 hover:bg-white/10 w-fit px-2 py-1 rounded transition-colors">
                                <span>Ver Planos &rarr;</span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </aside >
    );
}
