import { HelpCircle, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AjudaPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Ajuda & Suporte</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-xl border border-slate-100 text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-500">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-800">Perguntas Frequentes</h3>
                    <p className="text-slate-500">Encontre respostas rápidas para dúvidas comuns.</p>
                    <Button variant="outline" className="w-full">Ver FAQ</Button>
                </div>

                <div className="bg-white p-8 rounded-xl border border-slate-100 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                        <MessageCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-slate-800">Contactar Suporte</h3>
                    <p className="text-slate-500">Fale com nossa equipe via chat ou email.</p>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Iniciar Chat</Button>
                </div>
            </div>
        </div>
    );
}
