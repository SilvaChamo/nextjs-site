"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Usar o mesmo client do Login
import { PageHeader } from "../../../components/PageHeader";
import { DashboardStats } from "../../../components/DashboardStats";
import { DashboardKeywordsTable } from "../../../components/DashboardKeywordsTable";
import { GrowthTipCard } from "../../../components/GrowthTipCard";
import { SearchCategories } from "../../../components/SearchCategories";
import { VisibilityChart } from "../../../components/VisibilityChart";
import { ActivePlanCard } from "../../../components/ActivePlanCard";
import { Building2, ShoppingCart, Briefcase, GraduationCap, ArrowRight, LayoutDashboard, XCircle, User as UserIcon, Bell, Mail, Share2, ExternalLink, ShieldCheck, Package, MessageSquare, BarChart3, Presentation, Lock, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePlanPermissions } from "@/hooks/usePlanPermissions";

// Helper to convert settings object to CSSProperties
const getStyles = (startKey: string, settings: any): React.CSSProperties => {
    const s = settings[startKey];
    if (!s) return {};
    return {
        color: s.color,
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        padding: s.padding,
        margin: s.margin,
    };
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isProfessional, setIsProfessional] = useState(false);
    const [loading, setLoading] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [updatingSms, setUpdatingSms] = useState(false);

    const supabase = createClient();
    const { settings, loading: settingsLoading } = useSiteSettings();
    const { canAnalytics, canManageSharing, canPresentations, loading: permissionsLoading } = usePlanPermissions();

    const [supportMessage, setSupportMessage] = useState("");
    const [sendingSupport, setSendingSupport] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                router.push("/login");
            } else {
                setUser(user);

                // Check for profile data (role, plan, etc.)
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role, plan, sms_notifications')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setSmsNotifications(profile.sms_notifications || false);

                    // Admins always have access
                    if (profile.role === 'admin') {
                        setIsAdmin(true);
                    }
                }

                // Check for professional profile
                const { data: professional } = await supabase
                    .from('professionals')
                    .select('id, status')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (professional) {
                    setIsProfessional(true);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, [router, supabase]);

    if (loading || settingsLoading || permissionsLoading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
        </div>
    );

    const toggleSms = async () => {
        if (!user || updatingSms) return;
        setUpdatingSms(true);
        try {
            const nextValue = !smsNotifications;
            const { error } = await supabase
                .from('profiles')
                .update({ sms_notifications: nextValue })
                .eq('id', user.id);

            if (error) throw error;
            setSmsNotifications(nextValue);
        } catch (err) {
            console.error("Error toggling SMS:", err);
        } finally {
            setUpdatingSms(false);
        }
    };

    const handleSendSupport = async () => {
        if (!supportMessage.trim()) return;
        setSendingSupport(true);
        // Simulate sending email
        setTimeout(() => {
            alert("Sua mensagem foi enviada para a nossa equipa de suporte. Responderemos em breve para " + user?.email);
            setSupportMessage("");
            setSendingSupport(false);
        }, 1500);
    };

    return (
        <div>
            <div className="w-full mx-auto relative z-20">

                {/* Statistics Header & KPIs - Only if allowed */}
                {canAnalytics && (
                    <DashboardStats
                        welcomeTitle={settings['dashboard_welcome_title']?.text}
                        welcomeSubtitle={settings['dashboard_welcome_subtitle']?.text}
                        titleStyle={getStyles('dashboard_welcome_title', settings)}
                        subtitleStyle={getStyles('dashboard_welcome_subtitle', settings)}
                        cardTitleStyle={getStyles('dashboard_card_title', settings)}
                    />
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">

                    {/* LEFT COLUMN (Main Focus) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Acesso Rápido Grid - Primary Navigation Hub */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 italic">
                                <LayoutDashboard className="w-4 h-4 text-orange-500" />
                                Painel de Acesso Rápido
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Minha Empresa */}
                                <Link href="/usuario/dashboard/empresa" className="group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-[15px] flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Minha Empresa</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Gerir perfil e dados corporativos.</p>
                                </Link>

                                {/* Meus Produtos */}
                                <Link href="/usuario/dashboard/produtos" className="group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-blue-50 rounded-[15px] flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Meu Conteúdo</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Catálogo de produtos e serviços.</p>
                                </Link>

                                {/* Mensagens */}
                                <Link href="/usuario/dashboard/mensagens" className="group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-purple-50 rounded-[15px] flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Minhas Mensagens</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Comunicação direta com clientes.</p>
                                </Link>

                                {/* Contactos */}
                                <Link href="/usuario/dashboard/contactos" className="group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-amber-50 rounded-[15px] flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Contactos</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Gestão de leads e parceiros.</p>
                                </Link>

                                {/* Apresentações - Locked if not allowed */}
                                <Link href="/usuario/dashboard/apresentacoes" className={`group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm transition-all flex flex-col items-center text-center relative ${canPresentations ? 'hover:border-emerald-500 hover:shadow-md' : 'opacity-80'}`}>
                                    {!canPresentations && (
                                        <div className="absolute top-2 right-2">
                                            <Lock className="w-3 h-3 text-orange-500" />
                                        </div>
                                    )}
                                    <div className="w-12 h-12 bg-orange-50 rounded-[15px] flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Presentation className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Aumentar Visibilidade</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Apresentações visuais de impacto.</p>
                                </Link>

                                {/* Análise - Locked if not allowed */}
                                <Link href="/usuario/dashboard/analises" className={`group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm transition-all flex flex-col items-center text-center relative ${canAnalytics ? 'hover:border-emerald-500 hover:shadow-md' : 'opacity-80'}`}>
                                    {!canAnalytics && (
                                        <div className="absolute top-2 right-2">
                                            <Lock className="w-3 h-3 text-orange-500" />
                                        </div>
                                    )}
                                    <div className="w-12 h-12 bg-cyan-50 rounded-[15px] flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-110 transition-transform">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Análise de Dados</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Métricas e performance do negócio.</p>
                                </Link>

                                {/* Resources Grid items moved from their own section to unify the experience */}
                                <Link href="/usuario/dashboard/mercado" className="group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-[15px] flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                        <ShoppingCart className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Preços de Mercado</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Consulte cotações diárias.</p>
                                </Link>

                                <Link href="/usuario/dashboard/formacao" className="group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-[15px] flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Formação Agrária</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Aceda a guias e manuais.</p>
                                </Link>

                                <Link href="/usuario/dashboard/emprego" className="group p-5 bg-white rounded-[15px] border border-slate-100 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-rose-50 rounded-[15px] flex items-center justify-center text-rose-600 mb-4 group-hover:scale-110 transition-transform">
                                        <Briefcase className="w-6 h-6" />
                                    </div>
                                    <h5 className="font-bold text-slate-800 text-xs italic">Oportunidades</h5>
                                    <p className="text-[9px] text-slate-500 mt-1 italic">Emprego e estágios no sector.</p>
                                </Link>
                            </div>
                        </div>

                        {/* Visibility Chart - Only if allowed */}
                        {canAnalytics && <VisibilityChart />}


                        {/* Profile Sharing Toggle */}
                        <div className="bg-white rounded-[15px] p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                                        <Share2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm italic">Partilhar Perfil de Empresa</h4>
                                        <p className="text-[10px] text-slate-500 italic">Torne a sua empresa visível no diretório público</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <button
                                        disabled={!canManageSharing}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${canManageSharing ? 'bg-emerald-500 cursor-pointer' : 'bg-slate-200 cursor-not-allowed'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${canManageSharing ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                    {!canManageSharing && (
                                        <Link href="/planos" className="flex items-center gap-1 text-[9px] font-black text-orange-500 uppercase tracking-tight hover:underline">
                                            <ShieldCheck className="w-3 h-3" />
                                            Upgrade para Ativar
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Estado: <span className={canManageSharing ? "text-emerald-500" : "text-amber-500"}>{canManageSharing ? "ATIVO" : "INATIVO (PREMIUM)"}</span></span>
                                {canManageSharing && (
                                    <Link href="#" className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 hover:underline">
                                        Ver Perfil Público <ExternalLink className="w-3 h-3" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Information & Support) */}
                    <div className="space-y-6">
                        {/* Active Plan - ALWAYS SHOWN AT TOP */}
                        <ActivePlanCard />

                        {/* Information & Notifications Card - New Section */}
                        <div className="bg-white rounded-[15px] p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <Bell className="w-12 h-12 text-blue-500" />
                            </div>
                            <h4 className="font-extrabold text-slate-800 text-sm mb-4 uppercase tracking-tight flex items-center gap-2">
                                <Bell className="w-4 h-4 text-blue-500" />
                                Informações e Alertas
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Newsletter Semanal</p>
                                        <p className="text-[10px] text-slate-500 italic">Subscrição ativa para análise de mercado.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Notificações de Eventos</p>
                                        <p className="text-[10px] text-slate-500 italic">Receba convites para webinars e feiras.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">Alertas de Financiamento</p>
                                        <p className="text-[10px] text-slate-500 italic">Novas oportunidades de crédito agrário.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-50">
                                <p className="text-[10px] text-slate-400 text-center italic">
                                    Enviado também para: <span className="font-bold text-blue-500">{user?.email}</span>
                                </p>
                            </div>
                        </div>

                        {/* Support Card - New Section */}
                        <div className="bg-slate-900 rounded-[15px] p-6 shadow-lg relative overflow-hidden group">
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            <h4 className="font-extrabold text-white text-sm mb-3 uppercase tracking-tight flex items-center gap-2">
                                <Mail className="w-4 h-4 text-emerald-400" />
                                Suporte Técnico
                            </h4>
                            <textarea
                                value={supportMessage}
                                onChange={(e) => setSupportMessage(e.target.value)}
                                placeholder="Como podemos ajudar hoje?"
                                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-xs text-white placeholder:text-white/40 focus:ring-1 focus:ring-emerald-500 outline-none min-h-[80px] mb-3"
                            />
                            <Button
                                onClick={handleSendSupport}
                                disabled={sendingSupport || !supportMessage.trim()}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 text-xs gap-2"
                            >
                                {sendingSupport ? "Enviando..." : "Enviar para o Suporte"}
                                <ArrowRight className="w-3 h-3" />
                            </Button>
                        </div>

                        {/* Keywords Table - Only if allowed */}
                        {canAnalytics && <DashboardKeywordsTable />}

                        {/* Search Categories */}
                        <SearchCategories />

                        {/* Growth Tip */}
                        <GrowthTipCard />


                        {/* SMS Alerts Area (Existing KPI/Action) */}
                        <div className="block bg-orange-50/50 rounded-[15px] p-6 shadow-sm border border-orange-100 transition-all group mt-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-[#f97316] group-hover:scale-110 transition-transform">
                                    <ArrowRight className={`w-5 h-5 transition-transform ${smsNotifications ? 'rotate-0' : 'rotate-180 opacity-30'}`} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-[11px] italic">Notificações por SMS</h4>
                                    <p className="text-[9px] text-slate-500 italic">Alertas de novos produtos</p>
                                </div>
                                <button
                                    onClick={toggleSms}
                                    disabled={updatingSms}
                                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${smsNotifications ? 'bg-[#f97316]' : 'bg-slate-300'} ${updatingSms ? 'opacity-50' : 'cursor-pointer'}`}
                                >
                                    <span
                                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${smsNotifications ? 'translate-x-5' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
