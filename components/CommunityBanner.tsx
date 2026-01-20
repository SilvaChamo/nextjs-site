"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export function CommunityBanner() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            // First try to get the statistical total from agricultural_stats
            const { data: stats } = await supabase
                .from('agricultural_stats')
                .select('value')
                .eq('category', 'empresas')
                .eq('province', 'Todas');

            if (stats && stats.length > 0) {
                const total = stats.reduce((acc, curr) => acc + Number(curr.value), 0);
                if (total > 0) {
                    setCount(total);
                    return;
                }
            }

            // Fallback to actual registered companies count
            const { count } = await supabase
                .from('companies')
                .select('*', { count: 'exact', head: true });

            if (count !== null) setCount(count);
        };
        fetchCount();
    }, []);

    const displayCount = count !== null ? count.toLocaleString() : "...";

    return (
        <section className="w-full bg-[#3a3f47] py-12 md:py-14 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-5xl mx-auto">

                    {/* Left Side */}
                    <div className="text-center md:text-right md:w-1/2">
                        <h2 className="text-white font-black text-2xl md:text-4xl lg:text-5xl uppercase leading-[1.0] tracking-tight">
                            EXISTEM MAIS<br />
                            DE
                        </h2>
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden md:block w-[1px] h-32 bg-white/20" />

                    {/* Right Side */}
                    <div className="flex flex-col text-center md:text-left md:w-1/2 items-center md:items-start">
                        {/* Big Number */}
                        <h3 className="text-white font-black text-[70px] leading-none mb-4 -ml-1">
                            {displayCount}
                        </h3>

                        {/* Description */}
                        <p className="text-white text-sm md:text-base font-normal leading-[1.5] mb-8 max-w-[340px]">
                            Empresas agrárias identificadas. Não perca tempo, junte se esta comunidade agrícola em constante crescimento
                        </p>

                        {/* Green Button with Orange Hover */}
                        <Link
                            href="/registar"
                            className="inline-block bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e] hover:bg-transparent hover:text-[#f97316] hover:border-[#f97316] text-xs font-bold px-8 py-3 rounded-md transition-all duration-300 shadow-md"
                        >
                            Registe se aqui
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}
