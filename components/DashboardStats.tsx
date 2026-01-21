"use client";

import { Calendar, Download, TrendingUp, TrendingDown, Eye, MousePointerClick, MessageSquare, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPageHeader } from "@/components/DashboardPageHeader";

export function DashboardStats() {

    return (
        <div className="space-y-5 mb-5">
            {/* Header Section */}
            <DashboardPageHeader
                title="Estatística de Pesquisa"
                description="Acompanhe a visibilidade da sua empresa e produtos no Agro Data Moz."
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

        </div>
    );
}
