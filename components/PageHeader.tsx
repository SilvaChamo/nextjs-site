import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageHeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    backgroundImage?: string;
    icon?: LucideIcon;
}

export function PageHeader({ title, breadcrumbs, backgroundImage, icon: Icon }: PageHeaderProps) {
    return (
        <div className="w-full bg-gradient-to-r from-emerald-950 via-green-900 via-teal-900 to-emerald-950 text-white pt-28 pb-10 relative overflow-hidden">
            {/* Optional Background Image Overlay */}
            {backgroundImage && (
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-cover bg-center blur-sm"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            {/* Decorative Icon */}
            {Icon && (
                <div className="absolute -right-6 -bottom-12 text-white/10 z-0 pointer-events-none transform rotate-[-15deg]">
                    <Icon strokeWidth={1} className="w-64 h-64" />
                </div>
            )}

            <div className="container-site relative z-10">
                <h1 className="text-2xl md:text-[40px] font-heading font-black mb-3 tracking-tight text-white leading-[1.2]">{title}</h1>
                <nav className="flex items-center text-[10px] md:text-xs text-gray-400 font-medium">
                    {breadcrumbs.map((item, index) => (
                        <div key={index} className="flex items-center">
                            {index > 0 && <ChevronRight className="w-3 h-3 mx-2 text-[#f97316]" />}
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
