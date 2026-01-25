"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronLeft, Facebook, Instagram, Linkedin, Twitter, Loader2, CheckCircle, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
    const pathname = usePathname();
    const { language, toggleLanguage, t } = useLanguage();
    const [view, setView] = useState<"menu" | "auth">("menu");

    // Form States
    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
    const [registerForm, setRegisterForm] = useState({ name: "", category: "", email: "" });

    const [loading, setLoading] = useState<{ contact: boolean; register: boolean }>({ contact: false, register: false });
    const [success, setSuccess] = useState<{ contact: boolean; register: boolean }>({ contact: false, register: false });

    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Verificar usuário inicial
        supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

        // Escutar mudanças de auth
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleContactSubmit = async () => {
        if (!contactForm.name || !contactForm.message) return;
        setLoading(prev => ({ ...prev, contact: true }));
        try {
            await supabase.from('contact_messages').insert([{
                name: contactForm.name,
                email: contactForm.email,
                message: contactForm.message
            }]);
            setSuccess(prev => ({ ...prev, contact: true }));
            setContactForm({ name: "", email: "", message: "" });
            setTimeout(() => setSuccess(prev => ({ ...prev, contact: false })), 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(prev => ({ ...prev, contact: false }));
        }
    };

    const handleRegisterSubmit = async () => {
        if (!registerForm.name || !registerForm.category) return;
        setLoading(prev => ({ ...prev, register: true }));
        try {
            await supabase.from('companies').insert([{
                name: registerForm.name,
                category: registerForm.category,
                description: `Registo Simplificado. Contacto: ${registerForm.email}`,
                image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
            }]);
            setSuccess(prev => ({ ...prev, register: true }));
            setRegisterForm({ name: "", category: "", email: "" });
            setTimeout(() => setSuccess(prev => ({ ...prev, register: false })), 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(prev => ({ ...prev, register: false }));
        }
    };

    const menuItems = [
        { label: t("navbar.about"), link: "/sobre-nos" },
        { label: t("navbar.services"), link: "/servicos" },
        { label: t("navbar.repository"), link: "/repositorio" },
        { label: t("navbar.partnership"), link: "/parceria" },
        { label: t("navbar.market"), link: "/mercado" },
        { label: t("navbar.contacts"), link: "/contactos" },
    ];

    const offCanvasItems = [
        { label: t("common.help_center"), link: "/ajuda" },
        { label: t("common.blog"), link: "/blog" },
        { label: t("common.careers"), link: "/carreiras" },
        { label: t("common.terms"), link: "/terms" },
        { label: t("common.privacy"), link: "/privacidade" },
    ];

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
            <div className="container-site py-3 flex items-center justify-between overflow-hidden flex-nowrap gap-4">
                {/* Logo Section */}
                <div className="flex items-center flex-shrink-0">
                    <Link href="/">
                        <div className="hover:opacity-80 transition-opacity duration-300">
                            <Image
                                src="/assets/Logo.png"
                                alt="Base Agro Data Logo"
                                width={160}
                                height={60}
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation (Moved from Off-canvas) */}
                <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
                    {menuItems.map((item, i) => {
                        const isActive = pathname === item.link || (item.link !== '/' && pathname.startsWith(item.link));

                        return (
                            <Link
                                key={i}
                                href={item.link}
                                className={`text-[15px] font-medium transition-colors whitespace-nowrap tracking-tight font-sans ${isActive
                                    ? "text-[#f97316]"
                                    : "text-gray-600 hover:text-[#f97316]"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Actions Section */}
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="notranslate w-9 h-9 flex items-center justify-center rounded-[8px] bg-slate-200 font-medium text-[13px] text-gray-700 hover:bg-orange-100 hover:text-[#f97316] transition-all uppercase tracking-tight shadow-sm"
                        title={language === "PT" ? "Switch to English" : "Mudar para Português"}
                    >
                        {language === "PT" ? "EN" : "PT"}
                    </button>

                    {/* Minimalist Login Button (Always dynamic translation) */}
                    <Link href="/login">
                        <Button
                            className="notranslate bg-emerald-600 hover:bg-[#f97316] text-white text-[12px] font-bold px-5 h-9 rounded-[8px] transition-all shadow-sm border-none"
                        >
                            {t("common.login")}
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
