"use client";

import { UserSidebar } from "../../components/UserSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans dashboard-layout-root">
            <div className="fixed top-0 left-0 z-[100] bg-red-600 text-white p-2">LAYOUT ATIVO</div>
            <UserSidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
