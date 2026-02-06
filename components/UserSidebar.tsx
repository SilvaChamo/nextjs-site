import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Package,
    MessageSquare,
    BarChart3,
    LogOut,
    Crown,
    Settings,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Building2,
    GraduationCap,
    Mail,
    Presentation,
    Lock
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { usePlanPermissions } from "@/hooks/usePlanPermissions";
import { UpgradeModal } from "./UpgradeModal";

// Exact items requested by user
const navigation = [
    { name: "Minha Conta", href: "/usuario/dashboard/minha-conta", icon: User },
    { name: "Minha Empresa", href: "/usuario/dashboard/empresa", icon: Building2 },
    { name: "Minhas Mensagens", href: "/usuario/dashboard/mensagens", icon: Mail },
    { name: "Meu Conteúdo", href: "/usuario/dashboard/produtos", icon: Package },
    { name: "Contactos", href: "/usuario/dashboard/contactos", icon: MessageSquare },
    { name: "Análise", href: "/usuario/dashboard/analises", icon: BarChart3 },
    { name: "Apresentações", href: "/usuario/dashboard/apresentacoes", icon: Presentation, feature: "presentations" },
    { name: "Cursos", href: "/usuario/dashboard/formacao", icon: GraduationCap },
];

interface UserSidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export function UserSidebar({ isCollapsed, toggleSidebar }: UserSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [requestedFeature, setRequestedFeature] = useState("");

    // Plan permissions
    const {
        planDisplayName,
        canPresentations,
        loading: planLoading
    } = usePlanPermissions();


    // Create Supabase client
    const supabase = createClient();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            router.push('/'); // Redirecionar para página inicial
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
    }, []);

    return (
        <aside className="w-full h-full bg-emerald-950 flex flex-col text-slate-300 shrink-0 transition-all duration-300">
            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                fieldLabel={requestedFeature}
                requiredPlan="Business Vendedor"
            />

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
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${planDisplayName === 'Gratuito' ? 'bg-slate-700 text-slate-400' :
                                        planDisplayName === 'Parceiro' ? 'bg-emerald-500 text-emerald-950' :
                                            'bg-orange-500 text-white'
                                    }`}>
                                    {planDisplayName}
                                </span>
                                <p className="text-[10px] text-emerald-400 truncate leading-tight font-medium">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Collapse Button - Absolute positioned on the right */}
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
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const isLocked = item.feature === "presentations" && !canPresentations && !planLoading;

                    if (isLocked) {
                        return (
                            <button
                                key={item.href}
                                onClick={() => {
                                    setRequestedFeature(item.name);
                                    setShowUpgradeModal(true);
                                }}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group w-full text-left text-slate-500 hover:bg-white/5 ${isCollapsed ? 'justify-center' : ''}`}
                                title={isCollapsed ? `${item.name} (Bloqueado)` : undefined}
                            >
                                <item.icon className="w-5 h-5 text-slate-600" />
                                {!isCollapsed && (
                                    <div className="flex items-center justify-between flex-1">
                                        <span>{item.name}</span>
                                        <Lock className="w-3.5 h-3.5 text-orange-500" />
                                    </div>
                                )}
                                {isCollapsed && (
                                    <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full p-0.5">
                                        <Lock className="w-2 h-2 text-white" />
                                    </div>
                                )}
                            </button>
                        );
                    }

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
                </div>
            </nav>

            {/* 3. Footer Area (Upgrade Notification) */}
            <div className="mt-auto border-t border-emerald-900 bg-emerald-950">
                {/* Upgrade Notification - Full Width */}
                {!isCollapsed && (
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
