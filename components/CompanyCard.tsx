import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Company } from '@/lib/constants';
import { CheckCircle2 } from 'lucide-react';

interface CompanyCardProps {
    company: Company;
    language?: 'PT' | 'EN';
}

export function CompanyCard({ company }: CompanyCardProps) {
    return (
        <Link
            href={`/directory/${company.slug || company.id}`}
            className="bg-white rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-[280px] group border border-gray-100 relative"
        >
            {/* Image Section */}
            <div className="h-[180px] overflow-hidden relative w-full">
                <Image
                    src={company.image || "https://images.unsplash.com/photo-1625246333195-58f21a416327"}
                    alt={company.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {company.isVerified && (
                    <div className="absolute top-4 right-4 z-10">
                        <div className="bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                            <CheckCircle2 className="w-3 h-3" />
                        </div>
                    </div>
                )}
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

                <div className="mt-8 flex items-center gap-1.5 justify-center w-full">
                    <h3 className="text-base font-black text-slate-700 leading-tight group-hover:text-[#f97316] transition-colors truncate">
                        {company.name}
                    </h3>
                    {company.isVerified && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                </div>
            </div>
        </Link>
    );
}
