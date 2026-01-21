import { Lightbulb } from "lucide-react";

export function GrowthTipCard() {
    return (
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
    );
}
