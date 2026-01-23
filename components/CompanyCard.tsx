
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
        <div className="bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-[280px] group border border-gray-100 relative">
            {/* Image Section */}
            <div className="h-[180px] overflow-hidden relative w-full">
                <Image
                    src={company.image || "https://images.unsplash.com/photo-1625246333195-58f21a416327"}
                    alt={company.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow relative bg-white items-center text-center">
                {/* Logo overlapping image */}
                <div className="absolute -top-8 w-16 h-16 bg-white rounded-xl shadow-lg border border-gray-100 p-2 flex items-center justify-center transform group-hover:-translate-y-1 transition-transform duration-500">
                    <Image
                        src={company.logoUrl}
                        alt={`${company.name} logo`}
                        width={48}
                        height={48}
                        className="object-contain max-h-full max-w-full"
                    />
                </div>

                <div className="mt-8">
                    <h3 className="text-base font-black text-slate-700 leading-tight group-hover:text-[#f97316] transition-colors">
                        {company.name}
                    </h3>
                </div>
            </div>
        </div>
    );
}
