import React from "react";

interface DashboardPageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export function DashboardPageHeader({ title, description, children }: DashboardPageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-5">
            <div>
                <h2 className="text-3xl font-extrabold text-[#3a3f47] tracking-tight">{title}</h2>
                {description && (
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex gap-3 shrink-0">
                    {children}
                </div>
            )}
        </div>
    );
}
