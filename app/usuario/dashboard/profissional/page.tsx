"use client";

import { useState, useEffect } from "react";
import { Briefcase, ArrowRight, User as UserIcon, BadgeCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { ProfessionalRegistrationForm } from "@/components/ProfessionalRegistrationForm";
import { DashboardPageHeader } from "@/components/DashboardPageHeader";

export default function ProfessionalProfilePage() {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [professional, setProfessional] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                // Fetch professional profile
                const { data, error } = await supabase
                    .from('professionals')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (data) {
                    setProfessional(data);
                    setIsRegistered(true);
                } else {
                    // Check for pending registration
                    const pendingId = localStorage.getItem('pending_professional_registration_id');
                    if (pendingId) {
                        const { data: pendingProf } = await supabase
                            .from('professionals')
                            .select('*')
                            .eq('id', pendingId)
                            .is('user_id', null)
                            .single();

                        if (pendingProf) {
                            // Link it
                            const { error: linkError } = await supabase
                                .from('professionals')
                                .update({ user_id: user.id })
                                .eq('id', pendingId);

                            if (!linkError) {
                                setProfessional(pendingProf);
                                setIsRegistered(true);
                                localStorage.removeItem('pending_professional_registration_id');
                            }
                        }
                    }
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <DashboardPageHeader
                title="Meu Perfil Profissional"
                description="Gerencie as informações que aparecem no diretório de talentos."
            />

            {isRegistered ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                                {professional.name?.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">{professional.name}</h3>
                                <p className="text-xs text-slate-500">{professional.role} • {professional.category}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                            <BadgeCheck className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-wider">{professional.status === 'active' ? 'Ativo' : 'Pendente'}</span>
                        </div>
                    </div>

                    <ProfessionalRegistrationForm initialData={professional} isAdmin={false} />
                </div>
            ) : (
                <div className="bg-white rounded-[20px] p-10 shadow-xl shadow-slate-200/50 border border-slate-100 text-center max-w-2xl mx-auto mt-10">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserIcon className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-4 uppercase tracking-tight">Ainda não tem um perfil profissional</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        Crie o seu perfil agora para aparecer no nosso repositório de talentos e ser encontrado por empresas e parceiros do setor agrário.
                    </p>
                    <Link href="/servicos/registo-simples-talento">
                        <Button className="h-14 px-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-base font-bold uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all hover:scale-105">
                            Criar Perfil Profissional <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
