import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Company } from '@/lib/constants';
import { ArrowRight, Building2, MapPin, ShieldCheck } from 'lucide-react';

interface CompanyCardProps {
    company: Company;
    language?: 'PT' | 'EN';
}

export function CompanyCard({ company }: CompanyCardProps) {
    // Display exactly as selected in registration/database
    const displayCategory = company.tag || company.type || "Agro";

    return (
        <div className="group bg-white rounded-agro border border-slate-200 shadow-md card-interactive transition-all duration-500 flex flex-col relative overflow-hidden h-full">
            {/* 1. Header Image Container */}
            <div className="relative h-[140px] w-full overflow-hidden bg-slate-100">
                <Image
                    src={company.image || "https://images.unsplash.com/photo-1625246333195-58f21a416327"}
                    alt={company.name || "Empresa"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* CATEGORY TAG - TOP RIGHT */}
                <div className="absolute top-3 right-3 z-30">
                    <div className="bg-emerald-600/90 backdrop-blur-sm text-white text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-sm border border-white/10">
                        {displayCategory}
                    </div>
                </div>

                {/* INTERNAL ELEMENTS (LOGO + NAME) */}
                <div className="absolute bottom-4 left-4 flex items-center justify-between z-20 w-[calc(100%-32px)]">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                        {/* Logo Frame */}
                        <div className="shrink-0 h-10 w-auto min-w-[40px] max-w-[90px] rounded-lg overflow-hidden border border-white/10 bg-white flex items-center justify-center p-1.5 shadow-2xl">
                            <Image
                                src={company.logoUrl || "https://placehold.co/100x100/f97316/white?text=LOGO"}
                                alt={company.name || "Empresa"}
                                width={90}
                                height={40}
                                className="h-full w-auto object-contain"
                            />
                        </div>

                        {/* COMPANY NAME - WHITE TEXT */}
                        <div className="flex flex-col justify-center min-w-0">
                            <span className="text-white text-[13px] font-black uppercase tracking-tight leading-tight truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {company.name}
                            </span>
                        </div>
                    </div>

                    {/* VERIFIED BADGE */}
                    {company.isVerified && (
                        <div className="shrink-0 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-1.5 py-0.5 rounded-md border border-white/10">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Content Region */}
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <Link href={`/empresas/${company.slug || company.id}`}>
                        <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight leading-tight hover:text-[#f97316] transition-colors mb-2 line-clamp-1">
                            {company.name}
                        </h3>
                    </Link>

                    <p className="text-[11px] font-semibold text-slate-500 mb-4 leading-relaxed line-clamp-2 min-h-[32px]">
                        {company.description || "Agro-negócio focado no desenvolvimento sustentável e inovação tecnológica no sector agrário em Moçambique."}
                    </p>
                </div>

                <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
                    <Link
                        href={`/empresas/${company.slug || company.id}`}
                        className="text-[10px] font-black uppercase tracking-widest text-[#f97316] hover:text-orange-700 flex items-center gap-1.5 transition-all"
                    >
                        Ver Perfil
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
