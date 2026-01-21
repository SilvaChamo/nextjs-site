"use client";

import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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

export function VisibilityChart() {
    const [period, setPeriod] = useState<"semanal" | "mensal" | "anual">("semanal");

    return (
        <div className="bg-white pt-5 px-5 pb-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="flex flex-row items-center justify-between mb-0">
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

            <div className="h-[200px] w-full">
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
    );
}
