import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Calendar, Download, TrendingUp, TrendingDown, Eye, MousePointerClick, MessageSquare, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPageHeader } from "@/components/DashboardPageHeader";

interface DashboardStatsProps {
    welcomeTitle?: string;
    welcomeSubtitle?: string;
    titleStyle?: React.CSSProperties;
    subtitleStyle?: React.CSSProperties;
    cardTitleStyle?: React.CSSProperties;
}

export function DashboardStats({
    welcomeTitle,
    welcomeSubtitle,
    titleStyle,
    subtitleStyle,
    cardTitleStyle
}: DashboardStatsProps) {
    const [quotationsCount, setQuotationsCount] = useState(0);
    const [stats, setStats] = useState({
        impressions: 1248,
        clicks: 84,
        ctr: 6.7
    });
    const supabase = createClient();

    // Fetch real quotations count
    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const { count, error } = await supabase
                    .from('quotations')
                    .select('*', { count: 'exact', head: true });

                if (!error && count !== null) {
                    setQuotationsCount(count);
                }
            } catch (err) {
                console.error("Error fetching quotations:", err);
            }
        };

        fetchQuotations();

        // Subscribe to new quotations for real-time update
        const channel = supabase.channel('quotations-count')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'quotations' },
                (payload) => {
                    setQuotationsCount((prev) => prev + 1);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Oscillating/Live stats simulation
    useEffect(() => {

        const interval = setInterval(() => {
            setStats(prev => {
                const randomImpressions = Math.floor(Math.random() * 5); // Add 0-4 impressions
                const randomClicks = Math.random() > 0.7 ? 1 : 0; // Occasional click

                const newImpressions = prev.impressions + randomImpressions;
                const newClicks = prev.clicks + randomClicks;
                const newCtr = parseFloat(((newClicks / newImpressions) * 100).toFixed(1));

                return {
                    impressions: newImpressions,
                    clicks: newClicks,
                    ctr: newCtr
                };
            });
        }, 3000); // Update every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-5 mb-5">
            {/* Header Section */}
            <DashboardPageHeader
                title={welcomeTitle || "Estatística de Pesquisa"}
                description={welcomeSubtitle || "Acompanhe a visibilidade da sua empresa e produtos no Agro Data Moz."}
                titleStyle={titleStyle}
                descriptionStyle={subtitleStyle}
            >
                <div className="flex items-center justify-center px-4 h-10 gap-2 bg-white border border-slate-200 text-slate-600 font-semibold rounded-md shadow-sm cursor-default">
                    <Calendar className="w-4 h-4" />
                    Últimos 30 dias
                </div>
                <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold h-10 gap-2 shadow-lg shadow-green-500/20">
                    <Download className="w-4 h-4" />
                    Exportar Relatório
                </Button>
            </DashboardPageHeader>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* KPI 1 - Impressões */}
                <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-slate-500" style={cardTitleStyle}>Total de Impressões</p>
                        <div className="p-2 bg-emerald-50 rounded-[10px] text-emerald-600 group-hover:scale-110 transition-transform">
                            <Eye className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-800">{stats.impressions.toLocaleString()}</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3" /> Live
                        </span>
                    </div>
                </div>

                {/* KPI 2 - Cliques */}
                <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-slate-500" style={cardTitleStyle}>Cliques no Perfil</p>
                        <div className="p-2 bg-blue-50 rounded-[10px] text-blue-600 group-hover:scale-110 transition-transform">
                            <MousePointerClick className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-800">{stats.clicks.toLocaleString()}</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3" /> Live
                        </span>
                    </div>
                </div>

                {/* KPI 3 - Cotações */}
                <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-slate-500" style={cardTitleStyle}>Solicitações de Cotação</p>
                        <div className="p-2 bg-orange-50 rounded-[10px] text-orange-600 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-800">{quotationsCount}</h3>
                        <span className="text-xs font-bold text-orange-500 flex items-center gap-0.5 bg-orange-50 px-1.5 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3" /> Real
                        </span>
                    </div>
                </div>

                {/* KPI 4 - CTR */}
                <div className="bg-white p-6 rounded-[15px] border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-slate-500" style={cardTitleStyle}>CTR Médio</p>
                        <div className="p-2 bg-purple-50 rounded-[10px] text-purple-600 group-hover:scale-110 transition-transform">
                            <Percent className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-800">{stats.ctr}%</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3" /> Live
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}
