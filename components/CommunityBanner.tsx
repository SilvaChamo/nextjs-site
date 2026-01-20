"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export function CommunityBanner() {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchCount = async () => {
            const { count } = await supabase
                .from('companies')
                .select('*', { count: 'exact', head: true });

            if (count !== null) setCount(count);
        };
        fetchCount();
    }, []);

    const displayCount = count !== null ? count.toLocaleString() : "1 300";

    return (
        <section className="w-full bg-[#f97316] py-20 relative overflow-hidden">
            {/* Padrão de Fundo - Subtil */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">

                {/* Texto Esquerda */}
                <div className="max-w-xl text-center md:text-left">
                    <h2 className="text-white font-black text-6xl md:text-8xl leading-none tracking-tighter mb-4">
                        {displayCount}
                    </h2>
                    <p className="text-white/90 text-xl font-medium tracking-wide">
                        Empresas agrárias identificadas, <br className="hidden md:block" />
                        conectadas e prontas para fazer negócios.
                    </p>
                </div>

                {/* Texto Direita (Chamada para Ação / Descrição) */}
                <div className="max-w-md text-white/80 text-sm md:text-base leading-relaxed text-center md:text-right font-medium">
                    <p>
                        Junte-se à maior rede de agronegócio de Moçambique.
                        A nossa missão é conectar produtores, fornecedores e compradores
                        num único ecossistema digital.
                    </p>
                </div>

            </div>
        </section>
    );
}
