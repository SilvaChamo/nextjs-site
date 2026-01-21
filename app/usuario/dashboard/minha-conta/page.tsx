import { User, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MinhaContaPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Minha Conta</h2>

            <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 relative overflow-hidden">
                        <User className="w-16 h-16" />
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <h3 className="text-2xl font-bold text-slate-800">Usuário Exemplo</h3>
                        <p className="text-slate-500">Membro desde Agosto 2024</p>
                        <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                            <span className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                <Mail className="w-4 h-4" /> usuario@exemplo.com
                            </span>
                            <span className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                <Phone className="w-4 h-4" /> +258 84 123 4567
                            </span>
                            <span className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                <MapPin className="w-4 h-4" /> Maputo, Moçambique
                            </span>
                        </div>
                    </div>

                    <Button variant="outline" className="border-slate-200">Editar Perfil</Button>
                </div>
            </div>
        </div>
    );
}
