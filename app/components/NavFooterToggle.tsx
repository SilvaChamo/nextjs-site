"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default function NavFooterToggle({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hide = pathname?.includes("usuario") || pathname?.includes("admin");
    return (
        <>
            <div className="fixed bottom-0 right-0 z-[9999] bg-black text-white p-2 text-xs">
                PATH: {pathname} | HIDE: {String(hide)}
            </div>
            {!hide && <Navbar />}
            <div className="flex-1 flex flex-col min-h-0">
                {children}
            </div>
            {!hide && <Footer />}
        </>
    );
}
