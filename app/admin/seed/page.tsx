"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const articlesToInsert = [
    {
        title: 'Moçambique Prevê Crescimento de 13% na Produção de Cereais',
        subtitle: 'Governo lança campanha agrária 2024/2025 com metas ambiciosas para garantir a segurança alimentar e reduzir importações.',
        content: '<p>O governo moçambicano anunciou metas ambiciosas para a campanha agrária 2024/2025, prevendo um crescimento de 13% na produção de cereais, que deverá alcançar 3 milhões de toneladas. O plano inclui também um aumento de 3% na área cultivada, totalizando mais de 7 milhões de hectares, e a integração de 770.000 famílias em programas de fomento como o SUSTENTA. O foco está na competitividade e na autossuficiência alimentar.</p>',
        type: 'Notícia',
        date: '2025-02-02',
        image_url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop',
        slug: 'mocambique-crescimento-cereais-2025',
        is_featured: true
    },
    {
        title: 'Investimento Agrário Atinge 1.1 Mil Milhões de Dólares',
        subtitle: 'Sector agrícola recebe injeção de capital nos últimos cinco anos para modernização e infraestruturas.',
        content: '<p>Nos últimos cinco anos, o sector agrário em Moçambique atraiu investimentos na ordem de 1.1 mil milhões de dólares. Este capital tem sido direcionado para a mecanização, infraestruturas de regadio e desenvolvimento de cadeias de valor. O país continua a procurar parcerias estratégicas, nomeadamente com o Brasil, para melhorar a genética de sementes e o sector pecuário.</p>',
        type: 'Notícia',
        date: '2025-02-01',
        image_url: 'https://images.unsplash.com/photo-1542601906990-24d4c16419d4?q=80&w=1200&auto=format&fit=crop',
        slug: 'investimento-agrario-mocambique-2025',
        is_featured: false
    },
    {
        title: 'Resiliência Climática: Novas Sementes para Combater a Seca',
        subtitle: 'Introdução de variedades de milho e soja resistentes marca a nova época agrícola face às alterações climáticas.',
        content: '<p>Face aos desafios impostos pelo El Niño e pelas alterações climáticas, Moçambique está a apostar na biotecnologia e no melhoramento genético. Para a campanha 2024/2025, estão a ser introduzidas novas variedades de milho e soja tolerantes à seca e resistentes a pragas. A iniciativa visa proteger a segurança alimentar de milhões de pequenos agricultores vulneráveis a eventos extremos.</p>',
        type: 'Notícia',
        date: '2025-01-28',
        image_url: 'https://images.unsplash.com/photo-1471193945509-9adadd0974ce?q=80&w=1200&auto=format&fit=crop',
        slug: 'sementes-resilientes-clima-2025',
        is_featured: false
    },
    {
        title: 'Agricultura 4.0: Drones e IA nos Campos',
        subtitle: 'Como a tecnologia está a transformar a produtividade e monitorização de culturas em África.',
        content: '<p>A tecnologia agrícola (AgriTech) está a ganhar terreno em 2025, com o uso crescente de drones para pulverização de precisão e inteligência artificial para monitorização de culturas. Estas inovações permitem aos agricultores detetar pragas precocemente, otimizar a rega e aumentar os rendimentos, representando um salto qualitativo para a agricultura moderna em África.</p>',
        type: 'Curiosidade',
        date: '2025-02-02',
        image_url: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=1200&auto=format&fit=crop',
        slug: 'agricultura-4-0-drones-ia-2025',
        is_featured: false
    },
    {
        title: 'Relatório de Situação: Campanha Agrária e Clima 2025',
        subtitle: 'Análise das previsões meteorológicas para a época chuvosa e impacto esperado nas colheitas.',
        content: '<p>Este relatório sintetiza as previsões meteorológicas para a época chuvosa 2024/2025. Prevê-se precipitação normal a acima do normal no Centro e Sul, favorecendo as culturas de sequeiro, enquanto o Norte pode enfrentar chuvas abaixo da média. O documento detalha recomendações agrotécnicas para maximizar a colheita em cada cenário.</p>',
        type: 'Relatório',
        date: '2025-02-02',
        image_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop',
        slug: 'relatorio-clima-agricultura-2025',
        is_featured: true
    }
];

export default function SeedPage() {
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const handleSeed = async () => {
        setLoading(true);
        const logs: string[] = [];

        for (const article of articlesToInsert) {
            try {
                // Check dupes
                const { data: existing } = await supabase.from('articles').select('id').eq('slug', article.slug).single();
                if (existing) {
                    logs.push(`Skipped (Exists): ${article.title}`);
                    continue;
                }

                const { error } = await supabase.from('articles').insert([article]);
                if (error) {
                    logs.push(`Error: ${article.title} - ${error.message}`);
                } else {
                    logs.push(`Success: ${article.title}`);
                }
            } catch (e: any) {
                logs.push(`Exception: ${e.message}`);
            }
        }
        setResults(logs);
        setLoading(false);
        toast.success("Processo terminado!");
    };

    return (
        <div className="p-10 max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Seed Articles</h1>
            <Button onClick={handleSeed} disabled={loading}>
                {loading ? "Inserting..." : "Insert 5 Articles"}
            </Button>
            <div className="bg-slate-100 p-4 rounded text-xs font-mono space-y-1">
                {results.map((r, i) => <div key={i}>{r}</div>)}
            </div>
        </div>
    );
}
