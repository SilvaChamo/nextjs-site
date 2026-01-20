import { BarChart3 } from "lucide-react";

export default function AnalisesDashboard() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Análise de Dados</h2>
            <p className="text-muted-foreground">Visualize o desempenho da sua conta.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
                        <BarChart3 className="w-8 h-8 text-slate-300" />
                    </div>
                ))}
            </div>
        </div>
    );
}
