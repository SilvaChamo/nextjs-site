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
        <div className="w-full bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
                <div>
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 text-[#f97316]">
                            <ArrowUp className="w-5 h-5 rotate-45" />
                        </span>
                        Cotações do Dia
                    </h3>
                    <p className="text-slate-500 text-sm mt-1.5 pl-11 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Actualizado hoje: <span className="font-bold text-slate-700">{lastUpdated}</span></span>
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 transition-all focus-within:ring-2 focus-within:ring-[#f97316]/20 focus-within:border-[#f97316]/50 w-full md:w-auto">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Pesquisar produto..."
                        className="text-sm bg-transparent border-none focus:outline-none text-slate-700 placeholder:text-slate-400 w-full md:w-56 font-medium"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead className="bg-white border-b border-slate-50">
                        <tr>
                            <th className="px-8 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Produto</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Unidade</th>
                            <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Mercado</th>
                            <th className="px-8 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-wider">Preço Médio</th>
                            <th className="px-6 py-5 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {marketData.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50 transition-all border-b border-slate-50 last:border-none group">
                                <td className="px-8 py-5 whitespace-nowrap">
                                    <span className="font-bold text-slate-700 text-[15px] group-hover:text-[#f97316] transition-colors">{item.product}</span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">{item.unit}</span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap">
                                    <span className="text-sm font-medium text-slate-500">{item.location}</span>
                                </td>
                                <td className="px-8 py-5 whitespace-nowrap text-right">
                                    <span className="text-base font-black text-slate-800">{item.price.toLocaleString('pt-MZ')} MT</span>
                                </td>
                                <td className="px-6 py-5 whitespace-nowrap text-center">
                                    <div className="flex items-center justify-center gap-2 w-fit mx-auto">
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
            <div className="bg-slate-800 px-6 py-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-200">Fonte:</span> Ministério da Agricultura e Desenvolvimento Rural (MADER) - Sistema de Informação de Mercados Agrícolas (SIMA).
                    <br />Os preços são indicativos e representam a média das cotações recolhidas nos principais mercados grossistas nacionais.
                </p>
            </div>
        </div>
    );
}
