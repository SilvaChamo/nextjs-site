import { Check, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActivePlanCard() {
    return (
        <div className="bg-emerald-950 rounded-xl p-6 shadow-sm border border-emerald-900 text-white">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                {/* Plan Info */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-orange-500/10 rounded-md border border-orange-500/20">
                            <Crown className="w-4 h-4 text-orange-400" />
                        </div>
                        <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Plano Atual</span>
                    </div>
                    <h3 className="text-2xl font-black mb-1">Standard</h3>
                    <p className="text-emerald-400 text-sm font-medium">Renova em: 25 Set, 2026</p>
                </div>

                {/* Capabilities */}
                <div className="flex-1 w-full md:w-auto bg-emerald-900/30 rounded-lg p-4 border border-emerald-800">
                    <h4 className="text-sm font-bold text-slate-200 mb-3 uppercase tracking-wide flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        Suas Capacidades
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        <li className="flex items-center gap-2 text-sm text-emerald-100">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Até 50 Produtos</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-emerald-100">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Análise de Mercado</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-emerald-100">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Suporte Prioritário</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm text-emerald-100">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Selos de Verificação</span>
                        </li>
                    </div>
                </div>

                {/* Action */}
                <div className="shrink-0 w-full md:w-auto">
                    <Button className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold h-10 shadow-lg shadow-orange-900/20 uppercase tracking-wide text-xs">
                        Fazer Upgrade
                    </Button>
                </div>
            </div>
        </div>
    );
}
