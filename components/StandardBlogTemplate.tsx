"use client";

import React, { ReactNode } from "react";
import { PageHeader } from "./PageHeader";

interface StandardBlogTemplateProps {
    title: string;
    breadcrumbs: { label: string; href?: string }[];
    sidebarComponents: ReactNode;
    children: ReactNode;
    backgroundImage?: string;
}

export function StandardBlogTemplate({
    title,
    breadcrumbs,
    sidebarComponents,
    children,
    backgroundImage = "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=2000&auto=format&fit=crop"
}: StandardBlogTemplateProps) {
    return (
        <div className="min-h-screen bg-background text-slate-900 font-sans">
            <PageHeader
                title={title}
                backgroundImage={backgroundImage}
                breadcrumbs={breadcrumbs}
            />

            <main className="container-site pt-12 pb-[70px]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-agro items-start">

                    {/* Main Content Area */}
                    <div className="lg:col-span-9">
                        {children}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-3 space-y-agro sticky top-32 hidden lg:block">
                        {sidebarComponents}
                    </aside>

                </div>
            </main>
        </div>
    );
}
