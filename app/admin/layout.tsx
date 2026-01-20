"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Building2,
    Users,
    ShoppingCart,
    Grid2X2,
    Target,
    MessageSquare,
    ChevronRight,
    Home
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Artigos & Blog", href: "/admin/blog", icon: FileText },
    { name: "Estatísticas", href: "/admin/estatisticas", icon: BarChart3 },
    { name: "Indicadores", href: "/admin/indicadores", icon: Target },
    { name: "Categorias", href: "/admin/categorias", icon: Grid2X2 },
    { name: "Directório", href: "/admin/diretorio", icon: Building2 },
    { name: "Mensagens", href: "/admin/mensagens", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // If on the main dashboard page, render only the main content without sidebar and footer
    const isDashboard = pathname === "/admin" || pathname === "/admin/";

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* Sidebar */}
            {!isDashboard && (
                <aside className="w-64 bg-slate-900 text-white shrink-0 fixed h-full z-50">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-black text-xs text-white">
                                AG
                            </div>
                            <h1 className="font-black text-sm tracking-tight">ADMIN PANEL</h1>
                        </div>

                        <nav className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${isActive
                                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.name}
                                        {isActive && <ChevronRight className="ml-auto w-3 h-3" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Bottom link (previously acting as footer) */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                        >
                            <Home className="w-4 h-4" />
                            Ver Site Público
                        </Link>
                    </div>
                </aside>
            )}

            {/* Main Content */}
            <main className={isDashboard ? "flex-1 p-10" : "flex-1 ml-64 p-10"}>
                {children}
            </main>
        </div>
    );
}
