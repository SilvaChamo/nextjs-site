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
import { Building2, ShoppingCart, Briefcase, GraduationCap, ArrowRight, LayoutDashboard, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

import { useSiteSettings } from "@/hooks/useSiteSettings";

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
    const [loading, setLoading] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [updatingSms, setUpdatingSms] = useState(false);

    const supabase = createClient();
    const { settings, loading: settingsLoading } = useSiteSettings();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) {
                router.push("/login");
            } else {
                setUser(user);

                // Check for admin role
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role, sms_notifications')
                    .eq('id', user.id)
                    .single();

                if (profile && profile.role === 'admin') {
                    setIsAdmin(true);
                }

                if (profile) {
                    setSmsNotifications(profile.sms_notifications || false);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, [router, supabase]);

    if (loading || settingsLoading) return (
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

    return (
        <div>
            <div className="w-full mx-auto relative z-20">

                {/* Statistics Header & KPIs */}
                <DashboardStats
                    welcomeTitle={settings['dashboard_welcome_title']?.text}
                    welcomeSubtitle={settings['dashboard_welcome_subtitle']?.text}
                    titleStyle={getStyles('dashboard_welcome_title', settings)}
                    subtitleStyle={getStyles('dashboard_welcome_subtitle', settings)}
                    cardTitleStyle={getStyles('dashboard_card_title', settings)}
                />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">

                    {/* LEFT COLUMN (Charts & Tables) */}
                    <div className="lg:col-span-2 space-y-5">
                        {/* Active Plan */}
                        <ActivePlanCard />

                        {/* Visibility Chart */}
                        <VisibilityChart />

                        {/* Keywords Table */}
                        <DashboardKeywordsTable />
                    </div>

                    {/* RIGHT COLUMN (Categories & Actions) */}
                    <div className="space-y-5">
                        {/* Search Categories */}
                        <SearchCategories />

                        {/* Growth Tip */}
                        <GrowthTipCard />

                        {/* Navigation Cards Block */}
                        <div className="space-y-5 pt-2">
                            {/* Market Card */}
                            <Link href="/usuario/dashboard/mercado" className="block bg-white rounded-lg p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                        <ShoppingCart className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Mercado Agrícola</h4>
                                        <p className="text-[10px] text-slate-500">Compre e venda produtos</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-blue-500 transition-colors" />
                                </div>
                            </Link>

                            {/* Jobs Card */}
                            <Link href="/usuario/dashboard/emprego" className="block bg-white rounded-lg p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Vagas de Emprego</h4>
                                        <p className="text-[10px] text-slate-500">Encontre talentos</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-purple-500 transition-colors" />
                                </div>
                            </Link>

                            {/* Training Card */}
                            <Link href="/usuario/dashboard/formacao" className="block bg-white rounded-lg p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Formação</h4>
                                        <p className="text-[10px] text-slate-500">Capacitação profissional</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-amber-500 transition-colors" />
                                </div>
                            </Link>

                            {/* SMS Alerts Card */}
                            <div className="block bg-orange-50/50 rounded-lg p-5 shadow-sm border border-orange-100 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-[#f97316] group-hover:scale-110 transition-transform">
                                        <ArrowRight className={`w-5 h-5 transition-transform ${smsNotifications ? 'rotate-0' : 'rotate-180 opacity-30'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-800 text-sm">Alertas SMS</h4>
                                        <p className="text-[10px] text-slate-500">Notificações de novos produtos</p>
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
        </div>
    );
}
