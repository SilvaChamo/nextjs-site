import React from "react";

interface DashboardPageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
    titleStyle?: React.CSSProperties;
    descriptionStyle?: React.CSSProperties;
}

export function DashboardPageHeader({ title, description, children, titleStyle, descriptionStyle }: DashboardPageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-5">
            <div>
                <h2 className="text-3xl font-black text-[#3a3f47] tracking-tight" style={titleStyle}>{title}</h2>
                {description && (
                    <p className="text-slate-500 text-sm mt-1 leading-relaxed" style={descriptionStyle}>
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
