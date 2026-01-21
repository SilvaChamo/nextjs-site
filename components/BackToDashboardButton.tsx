"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToDashboardButton() {
    const searchParams = useSearchParams();
    const ref = searchParams.get("ref");

    if (ref !== "dashboard") return null;

    return (
        <div className="mb-6">
            <Link href="/usuario/dashboard/minha-conta">
                <Button variant="ghost" className="gap-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 pl-0">
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o Dashboard
                </Button>
            </Link>
        </div>
    );
}
