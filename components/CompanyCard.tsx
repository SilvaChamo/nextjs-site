
import React from 'react';
import Image from 'next/image';
import { Company } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

interface CompanyCardProps {
    company: Company;
    language?: 'PT' | 'EN';
}

export function CompanyCard({ company }: CompanyCardProps) {
    return (
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-[480px] group border border-gray-100 relative">
            {/* Image Section */}
            <div className="h-[240px] overflow-hidden relative w-full">
                <Image
                    src={company.image || "https://images.unsplash.com/photo-1625246333195-58f21a416327"}
                    alt={company.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-800 border border-emerald-100 shadow-sm">
                    {company.type}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow relative bg-white">
                {/* Logo overlapping image */}
                <div className="absolute -top-10 right-8 w-20 h-20 bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-500">
                    <Image
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        width={60}
                        height={60}
                        className="object-contain max-h-full max-w-full"
                    />
                </div>

                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-emerald-700 transition-colors">
                            {company.name}
                        </h3>
                        <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mt-2">{company.tag}</p>
                    </div>

                    <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3">
                        {company.description}
                    </p>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-emerald-500 transition-colors">Ver detalhes</span>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    );
}
