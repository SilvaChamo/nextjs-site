import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface HeroProps {
    onToggleSearch: () => void;
    isSearchOpen: boolean;
}

export function Hero({ onToggleSearch, isSearchOpen }: HeroProps) {
    const [stats, setStats] = useState<Record<string, any>>({});

    useEffect(() => {
        const fetchStats = async () => {
            const { data, error } = await supabase
                .from('dashboard_indicators')
                .select('slug, value, trend')
                .eq('location', 'hero');

            if (data) {
                const map = data.reduce((acc: any, item) => {
                    acc[item.slug] = item;
                    return acc;
                }, {});
                setStats(map);
            }
        };
        fetchStats();
    }, []);

    // Função auxiliar para obter o valor com segurança
    const getVal = (slug: string, fallback: string) => stats[slug]?.value || fallback;
    const getTrend = (slug: string, fallback: string) => stats[slug]?.trend || fallback;

    return (
        <section className="relative w-full h-[calc(100vh-30px)] min-h-[670px] flex items-center justify-center overflow-hidden">
            {/* Imagem de Fundo */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero-bg-new.jpg"
                    alt="Agriculture Background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Sobreposição escura para legibilidade do texto */}
                <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            </div>

            {/* Contentor de Conteúdo */}
            <div className="relative z-10 container-site grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">

                {/* Coluna Esquerda: Texto e Ações */}
                <div className="space-y-8 animate-in slide-in-from-left-6 duration-700">
                    <div className="space-y-4">
                        <h1 className="text-[50px] font-heading font-black text-white leading-[1.2] tracking-tight">
                            <span className="block">Cultivando um futuro</span>
                            <span className="block">melhor para</span>
                            <span className="block text-[#22c55e]">Moçambique</span>
                        </h1>
                        <p className="text-base md:text-lg text-gray-200 max-w-xl font-sans leading-relaxed">
                            Onde a terra fértil encontra inovação, oportunidade e prosperidade, promovendo o crescimento sustentável e tecnológico, com vista a facilitar investimentos agrários para um futuro promissor.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Button className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 py-6 rounded-[10px] text-base font-bold uppercase tracking-wider shadow-md">
                            Seja nosso parceiro
                        </Button>
                        <Button variant="outline" className="bg-[#f97316]/20 border-[#f97316] text-white hover:bg-[#f97316]/20 hover:border-[#f97316] hover:text-[#f97316] px-8 py-6 rounded-[10px] text-base font-bold uppercase tracking-wider backdrop-blur-sm transition-all duration-300">
                            Saiba mais
                        </Button>
                    </div>
                </div>

                {/* Coluna Direita: Grelha de Cartões de Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] animate-in slide-in-from-right-6 duration-700 delay-200">
                    {/* Cartão 1: Empresas Agrárias */}
                    <Link href="/estatisticas/empresas" className="block h-full animate-float">
                        <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl border border-white/40 p-6 rounded-[10px] shadow-2xl hover:from-white/40 hover:to-white/20 transition-all group relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-2 opacity-50">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-2 truncate drop-shadow-md">Empresas Agrárias</h4>
                            <h3 className="text-4xl font-heading font-black text-white mb-1 drop-shadow-md">{getVal('hero-companies', '950+')}</h3>
                            <p className="text-xs text-gray-100 uppercase tracking-wider drop-shadow-sm">Activas no mercado</p>
                            <div className="mt-3 w-full h-1 bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-[#f97316] w-[85%] shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                            </div>
                        </div>
                    </Link>

                    {/* Cartão 2: Produção Agrária 2025 */}
                    <Link href="/estatisticas/producao" className="block h-full animate-float-delayed">
                        <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl border border-white/40 p-6 rounded-[10px] shadow-2xl hover:from-white/40 hover:to-white/20 transition-all group relative h-full">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-100 mb-2 truncate drop-shadow-md">Produção Agrária 2025</h4>
                            <div className="flex items-baseline gap-1">
                                <h3 className="text-4xl font-heading font-black text-white drop-shadow-md">{getVal('hero-production', '20M+').split(' ')[0]}</h3>
                                <span className="text-sm font-bold text-gray-200">Tons</span>
                            </div>
                            <p className="text-xs text-green-300 mt-1 uppercase tracking-wider flex items-center gap-1 font-bold drop-shadow-sm">
                                <span className="text-lg">↑</span> 5% Crescimento
                            </p>
                        </div>
                    </Link>

                    {/* Cartão 3: Economia Agrária 2025 */}
                    <Link href="/estatisticas/economia" className="block h-full md:col-span-2 lg:col-span-1 animate-float">
                        <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl border border-white/40 p-6 rounded-[10px] shadow-2xl hover:from-white/40 hover:to-white/20 transition-all group relative h-full">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-100 mb-2 truncate drop-shadow-md">Economia Agrária 2025</h4>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-heading font-black text-white leading-tight drop-shadow-md">{getVal('hero-economy', '91.4B').split(' ')[0]} <span className="text-base text-gray-200">MZN</span></h3>
                                <p className="text-xs text-gray-100 uppercase tracking-wider drop-shadow-sm">PIB Agrícola (Q2 &apos;25)</p>
                                <div className="w-full h-1.5 bg-black/20 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full w-[24%] bg-[#22c55e] shadow-[0_0_10px_rgba(34,197,94,0.5)]" title="24% do PIB Nacional"></div>
                                </div>
                                <p className="text-[10px] text-right text-gray-200 mt-1">{getTrend('hero-economy', '24% do PIB Nacional')}</p>
                            </div>
                        </div>
                    </Link>

                    {/* Cartão 4: Empregos na Agricultura */}
                    <Link href="/estatisticas/emprego" className="block h-full md:col-span-2 lg:col-span-1 animate-float-delayed">
                        <div className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-2xl border border-white/40 p-6 rounded-[10px] shadow-2xl hover:from-white/40 hover:to-white/20 transition-all group md:col-span-2 lg:col-span-1 h-full">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#22c55e] mb-2 truncate drop-shadow-md">Emprego Agrícola</h4>
                            <div className="flex items-end gap-2">
                                <h3 className="text-4xl font-heading font-black text-white leading-none drop-shadow-md">{getVal('hero-jobs', '70%')}</h3>
                                <p className="text-xs text-gray-200 uppercase tracking-wider mb-1.5 drop-shadow-sm">Força laboral</p>
                            </div>
                            <p className="text-[10px] text-white mt-2 leading-tight drop-shadow-sm">
                                Base de sustento para a maioria da população.
                            </p>
                        </div>
                    </Link>
                </div>

            </div>

            {/* Botão de Pesquisa Flutuante - Canto Inferior Direito */}
            <div className="absolute bottom-12 right-12 z-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <button
                    onClick={onToggleSearch}
                    className={`w-16 h-16 rounded-[10px] flex items-center justify-center transition-all duration-300 shadow-2xl ${isSearchOpen
                        ? "bg-transparent text-[#f97316] rotate-90"
                        : "bg-[#22c55e] text-white hover:bg-[#f97316] hover:scale-110"
                        }`}
                >
                    {isSearchOpen ? <X className="w-8 h-8" /> : <Search className="w-8 h-8" />}
                </button>
            </div>
        </section>
    );
}
