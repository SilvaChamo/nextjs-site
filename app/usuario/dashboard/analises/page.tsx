import { BarChart3, TrendingUp, Users } from "lucide-react";

import { DashboardPageHeader } from "@/components/DashboardPageHeader";

export default function AnalisesPage() {
    return (
        <div className="space-y-6">
            <DashboardPageHeader
                title="Análise de Desempenho"
                description="Visualize o crescimento e engajamento da sua empresa."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Crescimento Total</p>
                            <h3 className="text-2xl font-bold text-slate-800">+24%</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Novos Visitantes</p>
                            <h3 className="text-2xl font-bold text-slate-800">1,240</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500">Taxa de Engajamento</p>
                            <h3 className="text-2xl font-bold text-slate-800">18.5%</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white h-64 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400">
                Gráfico Detalhado (Em Breve)
            </div>
        </div>
    );
}
