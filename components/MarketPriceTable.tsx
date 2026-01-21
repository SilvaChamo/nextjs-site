"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Minus, Search, Calendar, Info } from "lucide-react";

export function MarketPriceTable() {
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        // Simulate "Last Updated" as the current date
        const today = new Date();
        const dateString = today.toLocaleDateString('pt-MZ', { day: 'numeric', month: 'long', year: 'numeric' });
        setLastUpdated(dateString);
    }, []);

    // Mock Data based on SIMA/MADER Reports (Simulated)
    const marketData = [
        { product: "Milho Branco", unit: "Saco 50kg", price: 1200, prevPrice: 1150, location: "Nampula" },
        { product: "Arroz da 1ª", unit: "Saco 25kg", price: 1450, prevPrice: 1450, location: "Maputo" },
        { product: "Feijão Manteiga", unit: "Kg", price: 85, prevPrice: 90, location: "Manica" },
        { product: "Amendoim Pequeno", unit: "Lata 20L", price: 850, prevPrice: 800, location: "Inhambane" },
        { product: "Batata Reno", unit: "Saco 10kg", price: 450, prevPrice: 420, location: "Tete" },
        { product: "Cebola", unit: "Saco 10kg", price: 380, prevPrice: 400, location: "Maputo" },
        { product: "Tomate", unit: "Caixa 20kg", price: 1200, prevPrice: 1500, location: "Chokwe" },
        { product: "Ovos Grandes", unit: "Cartela (30)", price: 230, prevPrice: 230, location: "Matola" },
        { product: "Frango Vivo", unit: "Unidade", price: 250, prevPrice: 240, location: "Beira" },
        { product: "Sorgo", unit: "Lata 20L", price: 350, prevPrice: 350, location: "Sofala" },
    ];

    const getTrendIcon = (current: number, previous: number) => {
        if (current > previous) return <ArrowUp className="w-4 h-4 text-rose-500" />;
        if (current < previous) return <ArrowDown className="w-4 h-4 text-emerald-500" />;
        return <Minus className="w-4 h-4 text-slate-400" />;
    };

    const getTrendText = (current: number, previous: number) => {
        if (current > previous) return <span className="text-rose-500 text-xs font-bold">Subiu</span>;
        if (current < previous) return <span className="text-emerald-500 text-xs font-bold">Desceu</span>;
        return <span className="text-slate-400 text-xs font-bold">Estável</span>;
    };

    return (
        <div className="w-full bg-white rounded-[16px] shadow-lg border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
                <div>
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#f97316] rounded-full inline-block"></span>
                        Cotações de Mercado
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Actualizado em: <span className="font-bold text-slate-700">{lastUpdated}</span>
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm w-full md:w-auto">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Filtrar produtos..."
                        className="text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400 w-full md:w-48"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Produto</th>
                            <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-4 text-left text-xs font-black text-slate-500 uppercase tracking-wider">Mercado Ref.</th>
                            <th className="px-6 py-4 text-right text-xs font-black text-slate-500 uppercase tracking-wider">Preço Médio</th>
                            <th className="px-6 py-4 text-center text-xs font-black text-slate-500 uppercase tracking-wider">Tendência</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {marketData.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-bold text-slate-700 group-hover:text-[#f97316] transition-colors">{item.product}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded text-xs">{item.unit}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-slate-600">{item.location}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <span className="text-base font-black text-slate-800">{item.price.toLocaleString('pt-MZ')} MT</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <div className="flex items-center justify-center gap-1.5 bg-slate-50 py-1 px-2 rounded-full border border-slate-100 mx-auto w-fit">
                                        {getTrendIcon(item.price, item.prevPrice)}
                                        {getTrendText(item.price, item.prevPrice)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer / Source */}
            <div className="bg-slate-900 px-6 py-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">Fonte:</span> Ministério da Agricultura e Desenvolvimento Rural (MADER) - Sistema de Informação de Mercados Agrícolas (SIMA).
                    <br />Os preços são indicativos e representam a média das cotações recolhidas nos principais mercados grossistas nacionais.
                </p>
            </div>
        </div>
    );
}
