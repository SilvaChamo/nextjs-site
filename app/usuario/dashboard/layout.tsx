"use client";

import { UserSidebar } from "@/components/UserSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* User Sidebar */}
            <UserSidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
