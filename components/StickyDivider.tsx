"use client";

import React from "react";

export function StickyDivider() {
    return (
        <div className="sticky top-16 z-40 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="h-[10px] bg-[#f97316] w-full" />
            </div>
        </div>
    );
}
