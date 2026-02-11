'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowRight, MessageSquare, Cpu, TrendingUp, Layout, Leaf } from 'lucide-react';

// Map of names to components
const iconMap: Record<string, LucideIcon> = {
    Cpu,
    TrendingUp,
    Layout,
    Leaf,
    MessageSquare
};

interface ForumCategoryCardProps {
    category: {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        icon: string | null;
    };
}

export const ForumCategoryCard: React.FC<ForumCategoryCardProps> = ({ category }) => {
    // Use a fallback icon if not found
    const IconComponent = iconMap[category.icon || ''] || MessageSquare;

    return (
        <Link
            href={`/forum/${category.slug}`}
            className="group p-6 bg-white dark:bg-zinc-900 rounded-[8px] border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-[8px] text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <IconComponent size={24} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {category.name}
                </h3>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed flex-grow">
                {category.description || 'Discussão aberta sobre este tema.'}
            </p>
            <div className="mt-6 flex items-center text-emerald-600 font-medium text-sm">
                Ver tópicos
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
};
