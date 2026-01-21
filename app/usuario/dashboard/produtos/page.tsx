import { Package, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProdutosDashboard() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Meus Produtos</h2>
                    <p className="text-muted-foreground">Adicione e gerencie seus produtos ou serviços.</p>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 font-bold">
                    + Novo Produto
                </Button>
            </div>

            {/* Registro de Empresa Card (Moved from Dashboard) */}
            <div className="bg-white rounded-lg p-8 md:p-10 shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden group mb-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-6 text-emerald-600">
                        <Building2 className="w-7 h-7" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-800 mb-3">Registar a minha Empresa</h3>
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

            <div className="border border-dashed border-slate-300 rounded-xl h-80 flex flex-col items-center justify-center bg-slate-50 text-slate-500 space-y-4">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center">
                    <Package className="w-8 h-8 text-slate-400" />
                </div>
                <div className="text-center">
                    <h3 className="font-bold text-lg text-slate-700">Você ainda não tem produtos</h3>
                    <p className="text-sm max-w-xs mx-auto mt-1">Comece a adicionar seus produtos para que apareçam no mercado.</p>
                </div>
            </div>
        </div>
    );
}
