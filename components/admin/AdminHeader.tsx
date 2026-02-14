import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
    title: string;
    subtitle?: string;
    action?: {
        label: string;
        href: string;
        icon?: React.ElementType;
    };
}

export function AdminHeader({ title, subtitle, action }: AdminHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
                {subtitle && <p className="text-slate-500 font-medium mt-1">{subtitle}</p>}
            </div>

            {action && (
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Link href={action.href}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest text-xs h-10 px-6 rounded-lg gap-2 w-full md:w-auto">
                            {action.icon ? <action.icon className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            <span>{action.label}</span>
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
