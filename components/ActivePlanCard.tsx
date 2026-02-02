"use client";

import { useEffect, useState } from "react";
import { Check, Crown, Zap, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function ActivePlanCard() {
    const [loading, setLoading] = useState(true);
    const [planData, setPlanData] = useState<any>(null);
    const [renewalDate, setRenewalDate] = useState<string>("");
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchPlanData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Fetch company linked to user
                const { data: company, error } = await supabase
                    .from('companies')
                    .select('id, plan, updated_at')
                    .eq('user_id', user.id)
                    .single();

                if (company) {
                    setPlanData(company);
                    // Simulate renewal date (updated_at + 30 days)
                    const lastUpdate = new Date(company.updated_at || Date.now());
                    const renewal = new Date(lastUpdate.setDate(lastUpdate.getDate() + 30));
                    setRenewalDate(renewal.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' }));
                } else if (error) {
                    console.error("Error fetching plan:", error);
                }
            }
            setLoading(false);
        };

        fetchPlanData();
    }, []);

    const handleCancel = async () => {
        if (!planData) return;

        if (confirm("Tem certeza que deseja cancelar sua subscrição? Você perderá acesso aos recursos premium no final do ciclo atual.")) {
            try {
                // Update plan to 'Gratuito' in Database
                const { error } = await supabase
                    .from('companies')
                    .update({ plan: 'Gratuito', updated_at: new Date().toISOString() })
                    .eq('id', planData.id);

                if (error) throw error;

                alert("Subscrição cancelada com sucesso. Seu plano agora é Gratuito.");
                router.push("/");
                router.refresh(); // Refresh to update UI
            } catch (error) {
                console.error("Error canceling subscription:", error);
                alert("Erro ao cancelar subscrição. Tente novamente.");
            }
        }
    };

    if (loading) return <div className="animate-pulse h-64 bg-slate-100 rounded-xl"></div>;

    const currentPlan = planData?.plan || "Gratuito";
    const formattedPlan = currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1);
    const isFree = currentPlan === "Gratuito";

    return (
        <div className={`rounded-xl p-6 shadow-sm border text-white transition-colors ${isFree ? "bg-slate-800 border-slate-700" : "bg-emerald-950 border-emerald-900"}`}>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">

                {/* Plan Info */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1.5 rounded-md border ${isFree ? "bg-slate-700 border-slate-600" : "bg-orange-500/10 border-orange-500/20"}`}>
                            {isFree ? <AlertCircle className="w-4 h-4 text-slate-400" /> : <Crown className="w-4 h-4 text-orange-400" />}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${isFree ? "text-slate-400" : "text-orange-400"}`}>
                            {isFree ? "Estado da Conta" : "Plano Atual"}
                        </span>
                    </div>
                    <h3 className="text-2xl font-black mb-1 text-white">{formattedPlan}</h3>
                    {!isFree ? (
                        <p className="text-emerald-400 text-sm font-medium">Renova em: {renewalDate}</p>
                    ) : (
                        <p className="text-slate-400 text-sm font-medium">Sem subscrição ativa</p>
                    )}
                </div>

                {/* Capabilities */}
                <div className={`flex-1 w-full md:w-auto rounded-lg p-4 border ${isFree ? "bg-slate-900/50 border-slate-700" : "bg-emerald-900/30 border-emerald-800"}`}>
                    <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wide flex items-center gap-2">
                        <Zap className={`w-4 h-4 ${isFree ? "text-slate-500" : "text-yellow-400"}`} />
                        {isFree ? "Capacidades Limitadas" : "Suas Capacidades"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        {isFree ? (
                            <>
                                <li className="flex items-center gap-2 text-sm text-slate-400">
                                    <Check className="w-4 h-4 text-slate-500" />
                                    <span>Acesso Básico</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-slate-400">
                                    <Check className="w-4 h-4 text-slate-500" />
                                    <span>Newsletter Semanal</span>
                                </li>
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>

                {/* Action */}
                <div className="shrink-0 w-full md:w-auto flex flex-col gap-3">
                    <Button
                        className={`w-full text-white font-bold h-11 px-6 shadow-lg uppercase tracking-wide text-xs transition-all hover:scale-105 ${isFree ? "bg-orange-500 hover:bg-orange-600 shadow-orange-900/20" : "bg-[#f97316] hover:bg-[#ea580c] shadow-orange-900/20"}`}
                        onClick={() => router.push("/planos")}
                    >
                        {isFree ? "Fazer Upgrade Agora" : "Fazer Upgrade"}
                    </Button>
                    {!isFree && (
                        <button
                            onClick={handleCancel}
                            className="w-full flex items-center justify-center gap-2 text-[10px] font-bold text-red-400 hover:text-red-300 uppercase tracking-widest transition-colors py-2"
                        >
                            <XCircle className="w-3 h-3" />
                            Cancelar Subscrição
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
