"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { CompanyForm } from "@/components/admin/CompanyForm";

export default function RegisterCompanyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            } else {
                setLoading(false);
            }
        };
        checkUser();
    }, [router]);

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f97316]"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 relative">
            {/* Background Image for Visual Appeal underneath the modal */}
            <div
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-09d9b63bd70b?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20 blur-sm"
            />

            {/* The Form handles its own layout (fixed modal) */}
            <CompanyForm
                onClose={() => router.push('/usuario/dashboard')}
                onSuccess={() => {
                    // Maybe show a success toast before redirecting?
                    // CompanyForm handles success internally usually? 
                    // Let's assume it calls onSuccess after saving.
                    alert("Empresa registada com sucesso!");
                    router.push('/usuario/dashboard');
                }}
            />
        </div>
    );
}
