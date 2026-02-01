import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight, Pencil, Trash2, Link as LinkIcon } from 'lucide-react';

interface NewsCardProps {
    id?: string;
    title: string;
    subtitle?: string;
    excerpt?: string;
    category: string;
    date: string | Date;
    image?: string;
    slug: string;
    isAdmin?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function NewsCard({
    id,
    title,
    subtitle,
    excerpt,
    category,
    date,
    image,
    slug,
    isAdmin = false,
    onEdit,
    onDelete
}: NewsCardProps) {
    const formattedDate = new Date(date).toLocaleDateString('pt-PT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const displayDescription = subtitle || excerpt || "Leia mais sobre este artigo no nosso blog...";

    return (
        <div className="group flex flex-col h-full bg-white rounded-[10px] shadow-lg border border-slate-100 hover:border-[#f97316]/50 transition-all overflow-hidden hover:shadow-xl">
            {/* Image Section */}
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={image || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800&auto=format&fit=crop"}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-[#f97316] text-white text-[10px] font-black uppercase px-3.5 py-1.5 rounded-[6px] shadow-lg">
                    {category || "Artigo"}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex flex-col">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        <Calendar className="w-3 h-3 text-[#f97316]" />
                        <span>{formattedDate}</span>
                    </div>

                    {/* Title */}
                    <Link href={`/artigos/${slug}`} className="block">
                        <h3 className="text-[17px] font-black text-slate-800 group-hover:text-[#f97316] transition-colors line-clamp-3 leading-[1.25] py-[7px] tracking-tighter first-letter:uppercase my-0 overflow-hidden">
                            {title}
                        </h3>
                    </Link>

                    {/* Subtitle/Excerpt */}
                    <p className="text-[13px] text-slate-500 leading-[1.4] tracking-tight line-clamp-3">
                        {displayDescription}
                    </p>
                </div>

                {/* Footer/Actions */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                    <Link
                        href={`/artigos/${slug}`}
                        className="flex items-center gap-2 text-sm font-bold text-emerald-600 group-hover:text-[#f97316] transition-colors"
                    >
                        Explorar <ArrowRight className="h-4 w-4" />
                    </Link>

                    {isAdmin && (
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit?.(); }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100"
                            >
                                <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete?.(); }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all border border-slate-100"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
