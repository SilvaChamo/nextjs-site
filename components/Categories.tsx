"use client";

import React from "react";
import { Building2, ShoppingBag, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
    { id: "empresas", label: "Empresas", icon: Building2 },
    { id: "produtos", label: "Produtos", icon: ShoppingBag },
    { id: "profissionais", label: "Profissionais", icon: Users },
    { id: "artigos", label: "Artigos diversos", icon: FileText },
];

export function Categories() {
    return (
        <section className="w-full py-16 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-wrap justify-between gap-6 md:gap-8 w-full">
                    {CATEGORIES.map((cat) => (
                        <Button
                            key={cat.id}
                            variant="outline"
                            className="flex-grow h-auto py-8 px-6 bg-white border-gray-100 rounded-3xl shadow-sm hover:border-orange-500 hover:text-orange-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-gray-700 font-bold text-sm tracking-widest uppercase group whitespace-normal"
                        >
                            <cat.icon className="mr-4 h-6 w-6 text-emerald-800/30 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300" />
                            {cat.label}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
}
