import { Settings, Bell, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfiguracoesPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Configurações</h2>

            <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100">
                <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><User className="w-5 h-5" /></div>
                        <div>
                            <h3 className="font-bold text-slate-800">Informações Pessoais</h3>
                            <p className="text-sm text-slate-500">Nome, email e foto de perfil</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Gerir</Button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Lock className="w-5 h-5" /></div>
                        <div>
                            <h3 className="font-bold text-slate-800">Segurança</h3>
                            <p className="text-sm text-slate-500">Senha e autenticação de dois fatores</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Gerir</Button>
                </div>

                <div className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><Bell className="w-5 h-5" /></div>
                        <div>
                            <h3 className="font-bold text-slate-800">Notificações</h3>
                            <p className="text-sm text-slate-500">Preferências de email e alertas</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm">Gerir</Button>
                </div>
            </div>
        </div>
    );
}
