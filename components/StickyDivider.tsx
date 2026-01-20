"use client";

import React from "react";

export function StickyDivider() {
    return (
        <div className="sticky top-16 z-40 bg-transparent">
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px]">
                <div className="h-[5px] bg-[#f97316] w-full" />
            </div>
        </div>
    );
}
