"use client";

import { ProfessionalRegistrationForm } from "@/components/ProfessionalRegistrationForm";
import { PageHeader } from "@/components/PageHeader";
import { UserPlus } from "lucide-react";

export default function RegisterTalentPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title="Registar Perfil Profissional"
                icon={UserPlus}
                backgroundImage="https://images.unsplash.com/photo-1595152248447-c93d5006b00b?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: "Início", href: "/" },
                    { label: "Talentos", href: "/servicos/talentos" },
                    { label: "Registo", href: undefined }
                ]}
            />

            <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-20 mt-10 pb-24">
                <ProfessionalRegistrationForm />
            </div>
        </main>
    );
}
