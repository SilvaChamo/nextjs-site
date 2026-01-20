import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

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
