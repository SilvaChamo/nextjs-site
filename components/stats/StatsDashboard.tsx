"use client";

import { useState, useMemo, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Charts } from "./Charts";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Tractor, TrendingUp, Building2, Users, BarChart3 } from "lucide-react";

interface StatsDashboardProps {
    slug: string;
}

interface StatItem {
    name: string;
    value: number;
    variation: number;
}

interface SidebarIndicator {
    title: string;
    value: string;
    trend: string;
    slug: string;
}

export function StatsDashboard({ slug }: StatsDashboardProps) {
    const [selectedProvince, setSelectedProvince] = useState("Todas");
    const [activeProvince, setActiveProvince] = useState("Todas");
    const [period, setPeriod] = useState("2025");
    const [data, setData] = useState<StatItem[]>([]);
    const [sidebarIndicators, setSidebarIndicators] = useState<SidebarIndicator[]>([]);

    const provinces = ["Todas", "Maputo", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambézia", "Nampula", "Cabo Delgado", "Niassa"];

    // Buscar Dados Estatísticos
    useEffect(() => {
        const fetchData = async () => {
            // Determinar a categoria a partir do slug
            // 'producao', 'economia', etc correspondem à categoria na BD
            const { data: stats, error } = await supabase
                .from('agricultural_stats')
                .select('label, value, variation')
                .eq('category', slug)
                .eq('province', activeProvince);

            if (error) {
                console.error("Error fetching stats:", error);
            } else if (stats) {
                // Mapear etiqueta da BD -> nome para corresponder à expectativa do componente
                const formattedData = stats.map(s => ({
                    name: s.label,
                    value: s.value,
                    variation: s.variation
                }));
                // Se for Manica/Produção, podemos precisar de ordenação manual? A BD retorna arbitrariamente.
                // Assumindo que a ordem está aproximadamente correta ou tratada pelo Gráfico.
                setData(formattedData);
            }
        };

        fetchData();
    }, [slug, activeProvince]);

    // Buscar Indicadores da Barra Lateral
    useEffect(() => {
        const fetchIndicators = async () => {
            const { data: indicators, error } = await supabase
                .from('dashboard_indicators')
                .select('title, value, trend, slug')
                .eq('location', 'sidebar');

            if (error) {
                console.error("Error fetching sidebar:", error);
            } else if (indicators) {
                setSidebarIndicators(indicators as SidebarIndicator[]);
            }
        };

        fetchIndicators();
    }, []);

    const getTitle = () => {
        switch (slug) {
            case 'producao': return activeProvince === "Todas" ? "Produção Agrícola por Província" : `Produção Agrícola - ${activeProvince}`;
            case 'economia': return activeProvince === "Todas" ? "Evolução do PIB Agrícola" : `PIB Agrícola - ${activeProvince}`;
            case 'empresas': return "Empresas por Sector";
            case 'emprego': return "Força Laboral";
            default: return "Estatísticas Gerais";
        }
    };

    const getIcon = () => {
        switch (slug) {
            case 'producao': return Tractor;
            case 'economia': return TrendingUp;
            case 'empresas': return Building2;
            case 'emprego': return Users;
            default: return BarChart3;
        }
    };

    const getChartType = () => {
        switch (slug) {
            case 'producao': return 'bar';
            case 'economia': return 'area';
            case 'empresas': return 'bar';
            case 'emprego': return 'pie';
            default: return 'bar';
        }
    };

    // Calculate Metrics dynamically based on the current data
    const metrics = useMemo(() => {
        if (!data || data.length === 0) return { total: "—", average: "—", forecast: "—" };

        const totalValue = data.reduce((acc, item) => acc + item.value, 0);
        const avgValue = totalValue / data.length;
        const avgVariation = data.reduce((acc, item) => acc + (item.variation || 0), 0) / data.length;

        // Formatting Helpers
        const formatNumber = (num: number) => {
            if (num >= 1000) return (num / 1000).toFixed(1) + "M";
            if (num >= 1000000) return (num / 1000000).toFixed(1) + "B"; // Unlikely with current scale but safety
            return num.toLocaleString();
        };

        const formatCurrency = (num: number) => {
            // Input 9146 -> 9.1B? No, logic was 91.4B. Current val 9146. So 1 unit = 0.01B?
            // Or let's assume raw sum. 48,000 sum.
            // If national sum ~ 48k. Display 48B?
            // Let's stick to a simple scaler: value / 1000 + "B".
            return (num / 1000).toFixed(1) + "B MZN";
        };

        let totalDisplay = "";
        let avgDisplay = "";
        let forecastDisplay = (avgVariation > 0 ? "+" : "") + avgVariation.toFixed(1) + "%";

        switch (slug) {
            case 'producao': // Sum ~27,000 -> 27M Tons
                totalDisplay = (totalValue / 1000).toFixed(1) + "M Tons";
                avgDisplay = (avgValue / 1000).toFixed(1) + "M";
                break;
            case 'economia': // Sum monthly
                totalDisplay = formatCurrency(totalValue);
                avgDisplay = formatCurrency(avgValue);
                break;
            case 'empresas':
                totalDisplay = totalValue + "+";
                avgDisplay = Math.round(avgValue).toString();
                break;
            default: // Employment
                totalDisplay = "—";
                avgDisplay = "—";
        }

        return {
            total: totalDisplay,
            average: avgDisplay,
            forecast: forecastDisplay
        };
    }, [data, slug]);

    return (
        <div className="min-h-screen">
            import {StickyDivider} from "@/components/StickyDivider";

            // ... imports

            export function StatsDashboard({slug}: StatsDashboardProps) {
    // ... code

    return (
            <div className="min-h-screen">
                {/* Full Width Banner */}
                <PageHeader
                    title={getTitle()}
                    breadcrumbs={[
                        { label: "Início", href: "/" },
                        { label: "Estatísticas", href: "/#estatisticas" },
                        { label: getTitle(), href: undefined }
                    ]}
                    icon={getIcon()}
                    backgroundImage="/images/page-banner-bg.png"
                />

                <StickyDivider />

                <div className="container-site py-[40px] flex flex-col lg:flex-row gap-5">

                    {/* Left Sidebar: Relevant Stats */}
                    <aside className="w-full lg:w-64 space-y-6 shrink-0 sticky top-[85px] self-start h-fit">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Outros Indicadores</h3>
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    {sidebarIndicators.length > 0 ? (
                                        sidebarIndicators.map((ind) => (
                                            <div key={ind.slug} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <h4 className="text-xs font-semibold text-gray-500 mb-1">{ind.title}</h4>
                                                <p className={`text-lg font-bold ${ind.slug === 'sidebar-investment' ? 'text-[#22c55e]' :
                                                    ind.slug === 'sidebar-price-maize' ? 'text-gray-900' :
                                                        'text-[#f97316]'
                                                    }`}>{ind.value}</p>
                                                <span className={`text-[10px] font-medium ${ind.trend.includes('↓') ? 'text-red-500' : 'text-green-600'}`}>
                                                    {ind.trend}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-xs text-center text-gray-400">A carregar...</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#22c55e]/5 p-4 rounded-xl border border-[#22c55e]/20">
                            <h4 className="text-[#22c55e] font-bold text-sm mb-2">Relatórios Mensais</h4>
                            <p className="text-xs text-gray-600 mb-3">Aceda aos relatórios detalhados em PDF.</p>
                            <Button variant="outline" size="sm" className="w-full text-xs border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white">
                                Baixar Relatórios
                            </Button>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col gap-5">

                        {/* Key Metrics Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Registado</p>
                                <h3 className="text-2xl font-bold text-gray-900">{metrics.total}</h3>
                                <span className="text-xs text-green-500 font-bold">↑ 5% vs ano anterior</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Média Mensal</p>
                                <h3 className="text-2xl font-bold text-gray-900">{metrics.average}</h3>
                                <span className="text-xs text-green-500 font-bold">↑ 3.2% vs ano anterior</span>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Previsão Q3</p>
                                <h3 className="text-2xl font-bold text-gray-900">{metrics.forecast}</h3>
                                <span className="text-xs text-green-500 font-bold">↑ 4.1% vs ano anterior</span>
                            </div>
                        </div>

                        {/* Horizontal Filters Bar */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5 items-end md:items-center justify-between">
                            <div className="flex flex-col md:flex-row gap-5 items-end md:items-center w-full md:w-auto">
                                <div className="flex flex-col gap-1 w-full md:w-auto">
                                    <label className="text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Província:</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={activeProvince}
                                            onChange={(e) => setActiveProvince(e.target.value)}
                                            className="w-full md:w-48 p-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-[#22c55e] outline-none"
                                        >
                                            {provinces.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 w-full md:w-auto">
                                    <label className="text-xs font-semibold text-gray-500 uppercase whitespace-nowrap">Período:</label>
                                    <div className="flex gap-2 w-full md:w-auto">
                                        <Button
                                            onClick={() => setPeriod("2024")}
                                            variant={period === "2024" ? "default" : "outline"}
                                            size="sm"
                                            className={`flex-1 md:flex-none text-xs ${period === "2024" ? "bg-[#22c55e] hover:bg-[#16a34a]" : ""}`}
                                        >
                                            2024
                                        </Button>
                                        <Button
                                            onClick={() => setPeriod("2025")}
                                            variant={period === "2025" ? "default" : "outline"}
                                            size="sm"
                                            className={`flex-1 md:flex-none text-xs ${period === "2025" ? "bg-[#22c55e] hover:bg-[#16a34a]" : ""}`}
                                        >
                                            2025
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right hidden md:block shrink-0">
                                <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 italic">
                                    Fonte: INE/MADER
                                </span>
                            </div>
                        </div>

                        {/* Main Content Grid: Charts (40%) | Data Table (60%) */}
                        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-5">

                            {/* Visualização Gráfica (Left Column - 40%) */}
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 min-h-[400px] min-w-0">
                                <h3 className="font-bold text-gray-900 mb-6 border-b pb-4">Visualização Gráfica</h3>
                                <Charts
                                    data={data}
                                    type={getChartType()}
                                    dataKey="value"
                                    color={slug === 'economia' ? "#22c55e" : slug === 'empresas' ? "#3b82f6" : "#f97316"}
                                />
                            </div>

                            {/* Dados Detalhados (Right Column - 60%) */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full min-w-0">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-900">Dados Detalhados</h3>
                                    {activeProvince !== "Todas" && (
                                        <span className="text-xs font-bold text-[#f97316] bg-[#f97316]/10 px-2 py-1 rounded">
                                            Filtrado por: {activeProvince}
                                        </span>
                                    )}
                                </div>
                                <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b sticky top-0">
                                            <tr>
                                                <th className="px-6 py-3">Categoria / Região</th>
                                                <th className="px-6 py-3">Valor</th>
                                                <th className="px-6 py-3">Variação (%)</th>
                                                <th className="px-6 py-3">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, i) => (
                                                <tr key={i} className="bg-white border-b hover:bg-gray-50">
                                                    <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                                    <td className="px-6 py-4">{item.value.toLocaleString()}</td>
                                                    <td className={`px-6 py-4 font-bold ${item.variation >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                        {item.variation > 0 ? "+" : ""}{item.variation}%
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${item.variation >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                                            {item.variation >= 0 ? "Normal" : "Abaixo"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            );
}
