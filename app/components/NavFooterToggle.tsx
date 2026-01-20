"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export default function NavFooterToggle({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const hide = pathname?.includes("usuario") || pathname?.includes("admin");
    return (
        <>

            {!hide && <Navbar />}
            <div className="flex-1 flex flex-col min-h-0">
                {children}
            </div>
            {!hide && <Footer />}
        </>
    );
}
