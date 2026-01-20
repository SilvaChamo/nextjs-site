import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage?: string;
}

export function PageHeader({ title, breadcrumbs, backgroundImage }: PageHeaderProps) {
    return (
        <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white pt-28 pb-10 relative overflow-hidden">
            {/* Optional Background Image Overlay */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            <div className="container-site relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">{title}</h1>
                <nav className="flex items-center text-[10px] md:text-xs text-gray-400 font-medium">
                    {breadcrumbs.map((item, index) => (
                        <div key={index} className="flex items-center">
                            {index > 0 && <ChevronRight className="w-3 h-3 mx-2 text-gray-600" />}
                            {item.href ? (
                                <Link href={item.href} className="hover:text-[#f97316] transition-colors">
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="text-[#f97316] cursor-default">{item.label}</span>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}
