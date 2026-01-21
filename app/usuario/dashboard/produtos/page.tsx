"use client";

import { useState, useEffect } from "react";
import { Package, Building2, ArrowRight, MapPin, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function MeuConteudoPage() {
    const supabase = createClient();
    const [activeTab, setActiveTab] = useState<"empresa" | "produtos" | "propriedades" | "conexoes">("empresa");
    const [isRegistered, setIsRegistered] = useState(true); // Simulação de estado de registro
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    // Helper para obter nome de exibição
    const getDisplayName = () => {
        if (!user) return "Usuário";
        return user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Usuário";
    };

    const getUserEmail = () => user?.email || "Sem email";
    const getUserPhone = () => user?.user_metadata?.phone || user?.phone || "Não informado";

    // Helper para obter avatar (Metadata ou UI Avatars based on email/name)
    const getUserAvatar = () => {
        if (!user) return null;
        // Tenta pegar do metadata (Google Auth etc)
        const metadataAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture;
        if (metadataAvatar) return metadataAvatar;

        // Fallback para UI Avatars com as iniciais do nome
        const name = getDisplayName();
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=256`;
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-[900] tracking-tight text-[#3a3f47]">Meu Conteúdo</h2>
                    <p className="text-slate-500">Gerencie todas as suas informações e ativos.</p>
                </div>
                {activeTab === "produtos" && (
                    <Button className="px-6 py-2 rounded-md bg-emerald-600 hover:bg-orange-500 text-white font-bold shadow-md transition-all hover:scale-105">
                        + Novo Produto
                    </Button>
                )}
            </div>

            {/* Tabs Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-slate-300 mb-8">
                <button
                    onClick={() => setActiveTab("empresa")}
                    className={`px-6 py-2 text-sm font-bold rounded-t-md transition-all border-t border-l border-r relative -mb-px ${activeTab === "empresa"
                        ? "text-orange-600 border-slate-300 border-b-transparent bg-slate-50"
                        : "text-slate-500 border-transparent hover:text-orange-600"
                        }`}
                >
                    Minha Empresa
                </button>
                <button
                    onClick={() => setActiveTab("produtos")}
                    className={`px-6 py-2 text-sm font-bold rounded-t-md transition-all border-t border-l border-r relative -mb-px ${activeTab === "produtos"
                        ? "text-orange-600 border-slate-300 border-b-transparent bg-slate-50"
                        : "text-slate-500 border-transparent hover:text-orange-600"
                        }`}
                >
                    Meus Produtos
                </button>
                <button
                    onClick={() => setActiveTab("propriedades")}
                    className={`px-6 py-2 text-sm font-bold rounded-t-md transition-all border-t border-l border-r relative -mb-px ${activeTab === "propriedades"
                        ? "text-orange-600 border-slate-300 border-b-transparent bg-slate-50"
                        : "text-slate-500 border-transparent hover:text-orange-600"
                        }`}
                >
                    Minhas Propriedades
                </button>
                <button
                    onClick={() => setActiveTab("conexoes")}
                    className={`px-6 py-2 text-sm font-bold rounded-t-md transition-all border-t border-l border-r relative -mb-px ${activeTab === "conexoes"
                        ? "text-orange-600 border-slate-300 border-b-transparent bg-slate-50"
                        : "text-slate-500 border-transparent hover:text-orange-600"
                        }`}
                >
                    Minhas Conexões
                </button>
            </div>

            {/* Contéudo das Abas */}
            <div className="min-h-[400px]">

                {/* ABA: EMPRESA */}
                {activeTab === "empresa" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-8">

                        {/* 0. Dados do Usuário (Horizontal) */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600"></div>

                            <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-white shadow-md flex items-center justify-center shrink-0 overflow-hidden relative">
                                {getUserAvatar() ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={getUserAvatar()!}
                                        alt="Foto de Perfil"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Users className="w-8 h-8 text-slate-400" />
                                )}
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full divide-y md:divide-y-0 md:divide-x divide-slate-300">
                                <div className="px-5 first:pl-0">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Nome Completo</p>
                                    <p className="text-[#3a3f47] font-bold text-lg leading-tight">{getDisplayName()}</p>
                                </div>
                                <div className="px-5">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-[#3a3f47] font-semibold text-sm truncate" title={getUserEmail()}>{getUserEmail()}</p>
                                </div>
                                <div className="px-5">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Telefone</p>
                                    <p className="text-[#3a3f47] font-semibold">{getUserPhone()}</p>
                                </div>
                                <div className="px-5">
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Endereço</p>
                                    <p className="text-[#3a3f47] font-semibold text-sm">Maputo, Moçambique</p>
                                </div>
                            </div>

                            <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-slate-400 hover:text-orange-500">
                                <Briefcase className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* 1. Dados da Empresa (Apenas se Registrado) */}
                        {isRegistered && (
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                        <Building2 className="w-5 h-5 text-emerald-600" />
                                        Dados da Empresa
                                    </h3>
                                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase rounded-full tracking-wide">
                                        Verificada
                                    </span>
                                </div>
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        {/* Logo Placeholder */}
                                        <div className="w-32 h-32 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                                            <Building2 className="w-12 h-12 text-slate-300" />
                                        </div>

                                        {/* Info Grid */}
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Razão Social</p>
                                                <p className="text-[#3a3f47] font-semibold">Agro Pecuária do Norte, Lda.</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">NUIT</p>
                                                <p className="text-[#3a3f47] font-semibold">400 123 456</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Localização</p>
                                                <p className="text-[#3a3f47] font-semibold">Nampula, Moçambique</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Setor</p>
                                                <p className="text-[#3a3f47] font-semibold">Produção Agrícola</p>
                                            </div>
                                            <div className="md:col-span-2">
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Descrição</p>
                                                <p className="text-slate-600 text-sm leading-relaxed">
                                                    Empresa dedicada à produção e comercialização de milho e soja, com foco em práticas sustentáveis e apoio à comunidade local.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                                        <Button variant="outline" className="border-slate-300 text-slate-600 hover:text-slate-800">
                                            Editar Dados
                                        </Button>
                                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                                            Visualizar Perfil Público
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Card de Registro (Apenas se NÃO Registrado ou como Banner Secundário) */}
                        {!isRegistered && (
                            <div className="bg-white rounded-lg p-8 md:p-10 shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-6 text-emerald-600">
                                        <Building2 className="w-7 h-7" />
                                    </div>

                                    <h3 className="text-2xl font-black text-[#3a3f47] mb-3">Registar a minha Empresa</h3>
                                    <p className="text-slate-500 mb-8 leading-relaxed max-w-lg">
                                        Junte-se ao maior diretório de empresas do setor agrário em Moçambique.
                                        Aumente a sua visibilidade, encontre parceiros e expanda os seus negócios.
                                    </p>

                                    <Link href="/usuario/registo-empresa">
                                        <Button className="h-12 px-8 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-lg text-sm font-bold uppercase tracking-wider shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                                            Começar Registo <ArrowRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}


                {/* ABA: PRODUTOS */}
                {activeTab === "produtos" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="border border-dashed border-slate-300 rounded-xl h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 space-y-4">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                                <Package className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-slate-700">Você ainda não tem produtos</h3>
                                <p className="text-sm max-w-xs mx-auto mt-1">Comece a adicionar seus produtos para que apareçam no mercado.</p>
                            </div>
                            <Button variant="outline" className="mt-4 border-slate-300 hover:bg-white hover:text-orange-600">
                                Adicionar Primeiro Produto
                            </Button>
                        </div>
                    </div>
                )}

                {/* ABA: PROPRIEDADES */}
                {activeTab === "propriedades" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="border border-dashed border-slate-300 rounded-xl h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 space-y-4">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                                <MapPin className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-slate-700">Nenhuma propriedade cadastrada</h3>
                                <p className="text-sm max-w-xs mx-auto mt-1">Adicione suas fazendas, terrenos ou instalações.</p>
                            </div>
                            <Button variant="outline" className="mt-4 border-slate-300 hover:bg-white hover:text-orange-600">
                                Adicionar Propriedade
                            </Button>
                        </div>
                    </div>
                )}

                {/* ABA: CONEXÕES */}
                {activeTab === "conexoes" && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="border border-dashed border-slate-300 rounded-xl h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 space-y-4">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-slate-400" />
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-slate-700">Sem conexões ativas</h3>
                                <p className="text-sm max-w-xs mx-auto mt-1">Conecte-se com outros produtores e empresas da rede.</p>
                            </div>
                            <Button variant="outline" className="mt-4 border-slate-300 hover:bg-white hover:text-orange-600">
                                Buscar Parceiros
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
