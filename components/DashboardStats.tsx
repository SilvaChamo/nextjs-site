"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Download, TrendingUp, TrendingDown, Lightbulb, MousePointerClick, Eye, MessageSquare, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
    { name: "01 Ago", value: 4000 },
    { name: "05 Ago", value: 7000 },
    { name: "10 Ago", value: 5000 },
    { name: "15 Ago", value: 9000 },
    { name: "20 Ago", value: 8000 },
    { name: "25 Ago", value: 13000 },
    { name: "30 Ago", value: 11000 },
    { name: "05 Set", value: 15480 },
];

export function DashboardStats() {
    const [period, setPeriod] = useState<"semanal" | "mensal" | "anual">("semanal");

    return (
        <div className="space-y-6 mb-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-800 tracking-tight">Estatística de Pesquisa</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Acompanhe a visibilidade da sua empresa e produtos no Agro Data Moz.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center justify-center px-4 h-10 gap-2 bg-white border border-slate-200 text-slate-600 font-semibold rounded-md shadow-sm cursor-default">
                        <Calendar className="w-4 h-4" />
                        Últimos 30 dias
                    </div>
                    <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold h-10 gap-2 shadow-lg shadow-green-500/20">
                        <Download className="w-4 h-4" />
                        Exportar Relatório
                    </Button>
                </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* KPI 1 - Impressões */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-slate-500">Total de Impressões</p>
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:scale-110 transition-transform">
                            <Eye className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-800">12.480</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3" /> 15%
                        </span>
                    </div>
                </div>

                {/* KPI 2 - Cliques */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-slate-500">Cliques no Perfil</p>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:scale-110 transition-transform">
                            <MousePointerClick className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-800">842</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3" /> 8%
                        </span>
                    </div>
                </div>

                {/* KPI 3 - Cotações */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-slate-500">Solicitações de Cotação</p>
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-800">45</h3>
                        <span className="text-xs font-bold text-orange-500 flex items-center gap-0.5 bg-orange-50 px-1.5 py-0.5 rounded-full">
                            <TrendingDown className="w-3 h-3" /> 2%
                        </span>
                    </div>
                </div>

                {/* KPI 4 - CTR */}
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-slate-500">CTR Médio</p>
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:scale-110 transition-transform">
                            <Percent className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-800">6.7%</h3>
                        <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            <TrendingUp className="w-3 h-3" /> 1.2%
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Search Trend Chart */}
                <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex flex-row items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Tendência de Visibilidade</h3>
                            <p className="text-sm text-slate-500">Frequência com que apareceu nos resultados de busca</p>
                        </div>
                        <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-semibold">
                            <button
                                onClick={() => setPeriod("semanal")}
                                className={`px-3 py-1.5 rounded-md transition-all ${period === "semanal" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Semanal
                            </button>
                            <button
                                onClick={() => setPeriod("mensal")}
                                className={`px-3 py-1.5 rounded-md transition-all ${period === "mensal" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Mensal
                            </button>
                            <button
                                onClick={() => setPeriod("anual")}
                                className={`px-3 py-1.5 rounded-md transition-all ${period === "anual" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                Anual
                            </button>
                        </div>
                    </div>

                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        border: '1px solid #e2e8f0',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                    cursor={{ stroke: '#22c55e', strokeWidth: 2, strokeDasharray: '4 4' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    activeDot={{ r: 6, strokeWidth: 0, fill: '#22c55e' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Categories & Insights */}
                <div className="space-y-6">
                    {/* Categories */}
                    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-fit">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Buscas por Categoria</h3>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-slate-700">Cereais</span>
                                    <span className="text-slate-900">42%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[42%] rounded-full"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-slate-700">Leguminosas</span>
                                    <span className="text-slate-900">28%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 w-[28%] rounded-full"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-slate-700">Oleaginosas</span>
                                    <span className="text-slate-900">18%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-400 w-[18%] rounded-full"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-slate-700">Tubérculos</span>
                                    <span className="text-slate-900">12%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400 w-[12%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Growth Tip */}
                    <div className="bg-orange-50 border border-orange-100 p-5 rounded-xl">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600 shrink-0">
                                <Lightbulb className="w-5 h-5 fill-current" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-orange-600 uppercase tracking-wide mb-2">Dica de Crescimento</h4>
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    Produtos da categoria <span className="font-bold text-slate-900">Cereais</span> estão com alta demanda nesta região.
                                    Considere atualizar seus preços e estoque.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
