import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ListingCardProps {
    title: string;
    description: string;
    category: string;
    image?: string; // URL da imagem ou placeholder
    href: string;
    badgeColor?: "green" | "orange" | "blue" | "purple";
}

export function ListingCard({ title, description, category, image, href, badgeColor = "green" }: ListingCardProps) {
    const badgeStyles = {
        green: "bg-emerald-50 text-emerald-700",
        orange: "bg-orange-50 text-orange-700",
        blue: "bg-blue-50 text-blue-700",
        purple: "bg-purple-50 text-purple-700"
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
            {/* Image Placeholder */}
            <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-emerald-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight">{title}</h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md w-fit ${badgeStyles[badgeColor]}`}>
                        {category}
                    </span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-4 md:mb-0 max-w-3xl">
                    {description}
                </p>
            </div>

            {/* Action */}
            <Link href={href} className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap md:self-end md:mb-1">
                Ver detalhes <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
