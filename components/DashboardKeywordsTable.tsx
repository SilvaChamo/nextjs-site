"use client";

import { Eye, MousePointerClick, ArrowRight } from "lucide-react";

const keywords = [
    {
        term: "Milho Branco",
        province: "Manica",
        impressions: "3,420",
        clicks: "210",
        conversion: "6.1%",
        conversionStatus: "good", // good, medium, bad
        action: "Ver Produto",
        actionLink: "/produtos/milho-branco"
    },
    {
        term: "Produtores de Soja",
        province: "Sofala",
        impressions: "1,280",
        clicks: "85",
        conversion: "6.6%",
        conversionStatus: "good",
        action: "Ver Perfil",
        actionLink: "/perfil"
    },
    {
        term: "Feijão Nhemba a granel",
        province: "Inhambane",
        impressions: "950",
        clicks: "42",
        conversion: "4.4%",
        conversionStatus: "medium",
        action: "Ver Produto",
        actionLink: "/produtos/feijao-nhemba"
    },
    {
        term: "Castanha de Caju",
        province: "Nampula",
        impressions: "820",
        clicks: "38",
        conversion: "4.6%",
        conversionStatus: "medium",
        action: "Ver Produto",
        actionLink: "/produtos/castanha"
    }
];

export function DashboardKeywordsTable() {
    return (
        <div className="bg-white rounded-[15px] border border-slate-100 shadow-sm overflow-hidden mt-0">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-800">Palavras-chave</h3>
                <span className="text-xs text-slate-400 font-medium">Últimos 30 dias</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-3 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Termo de Pesquisa</th>
                            <th className="px-3 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Província</th>
                            <th className="px-3 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Impressões</th>
                            <th className="px-3 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Cliques</th>
                            <th className="px-3 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Conversão</th>
                            <th className="px-3 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {keywords.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-3 py-2.5">
                                    <span className="font-bold text-slate-700 text-sm group-hover:text-emerald-700 transition-colors block truncate max-w-[200px]" title={item.term}>
                                        {item.term}
                                    </span>
                                </td>
                                <td className="px-3 py-2.5">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                        {item.province}
                                    </span>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                    <span className="text-slate-600 font-medium text-sm">{item.impressions}</span>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                    <span className="text-slate-600 font-medium text-sm">{item.clicks}</span>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${item.conversionStatus === 'good'
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-orange-50 text-orange-600'
                                        }`}>
                                        {item.conversion}
                                    </span>
                                </td>
                                <td className="px-3 py-2.5 text-right">
                                    <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline uppercase tracking-wide inline-flex items-center gap-1">
                                        {item.action}
                                        <ArrowRight className="w-3 h-3" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
