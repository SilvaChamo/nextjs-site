"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NavFooterToggle({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hide = pathname.startsWith("/usuario") || pathname.startsWith("/admin");
    return (
        <>
            {/* DEBUG: {pathname} - hide: {String(hide)} */}
            {!hide && <Navbar />}
            <div className="flex-1 flex flex-col">
                {children}
            </div>
            {!hide && <Footer />}
        </>
    );
}
