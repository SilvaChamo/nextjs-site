import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Building2,
    FileText,
    BarChart3,
    Target,
    Grid2X2,
    MessageSquare,
    Shield,
    LogOut,
    Newspaper
} from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check role in profiles table
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!profile || profile.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-slate-100">
                    <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                        <Shield className="w-8 h-8 text-rose-600" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">Acesso Restrito</h1>
                    <p className="text-slate-500 mb-8">
                        Esta área é exclusiva para administradores. A sua conta actual ({user.email}) não tem permissão de acesso.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg text-left mb-8 border border-slate-200">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Dev Debug (SQL Correto):</p>
                        <code className="text-[10px] sm:text-xs text-slate-600 block bg-slate-100 p-2 rounded break-all font-mono whitespace-pre-wrap">
                            INSERT INTO profiles (id, email, role, full_name)
                            VALUES ('{user.id}', '{user.email}', 'admin', '{user.email}')
                            ON CONFLICT (id) DO UPDATE SET role = 'admin';
                        </code>
                    </div>
                    <Link href="/" className="inline-flex items-center justify-center rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2 w-full">
                        Voltar ao Início
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 transform hidden lg:translate-x-0 lg:block shadow-xl">
                <div className="flex flex-col h-full border-r border-slate-800">
                    {/* Header */}
                    <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950">
                        <div className="flex items-center gap-3 text-emerald-500">
                            <Shield className="w-8 h-8" />
                            <div>
                                <span className="font-black text-lg tracking-wider text-white block">COZINHA</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Painel Administrativo</span>
                            </div>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-2">Geral</p>

                        <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                            <LayoutDashboard className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            Dashboard
                        </Link>

                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-6">Gestão</p>

                        {/* Pointing to new companies page conforming to plan, but could also point to empresas if we migrate */}
                        <Link
                            href="/admin/empresas"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                            <Building2 className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            Empresas
                        </Link>

                        <Link
                            href="/admin/mensagens"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                            <MessageSquare className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            Mensagens
                        </Link>

                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-6">Conteúdo</p>

                        <Link
                            href="/admin/noticias"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                            <Newspaper className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            Notícias
                        </Link>

                        <Link
                            href="/admin/blog"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                            <FileText className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            Artigos & Blog
                        </Link>

                        <Link
                            href="/admin/categorias"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                            <Grid2X2 className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            Categorias
                        </Link>

                        <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 mt-6">Dados</p>

                        <Link
                            href="/admin/estatisticas"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                            <BarChart3 className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            Estatísticas
                        </Link>

                        <Link
                            href="/admin/indicadores"
                            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 rounded-lg hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                            <Target className="w-5 h-5 text-slate-500 group-hover:text-emerald-500 transition-colors" />
                            Indicadores
                        </Link>
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-slate-800 bg-slate-950">
                        <div className="flex items-center gap-3 px-4 py-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold ring-2 ring-emerald-500/30">
                                AD
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Administrador</p>
                                <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <form action="/auth/signout" method="post">
                            <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500/10 rounded-md transition-colors">
                                <LogOut className="w-3 h-3" />
                                Terminar Sessão
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 bg-slate-50 min-h-screen">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
