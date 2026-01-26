"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronLeft, ChevronDown, Facebook, Instagram, Linkedin, Twitter, Loader2, CheckCircle, Building2, User, Home } from "lucide-react";
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
        { label: t("navbar.repository"), link: "/repositorio" },
        { label: t("navbar.partnership"), link: "/parceria" },
        { label: t("navbar.market"), link: "/mercado" },
        { label: t("navbar.contacts"), link: "/contactos" },
    ];

    const baseItems = [
        { label: t("navbar.about"), link: "/sobre-nos" },
        { label: t("navbar.services"), link: "/servicos" },
        { label: t("navbar.history"), link: "/sobre-nos/historial" },
        { label: t("navbar.app"), link: "/sobre-aplicativo" },
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
            <div className="container-site py-3 flex items-center justify-between flex-nowrap gap-4">
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
                    {/* Base Dropdown */}
                    <div className="relative group py-4">
                        <Link
                            href="/"
                            className={`flex items-center gap-1.5 text-[15px] font-medium transition-colors whitespace-nowrap tracking-tight font-sans ${pathname === "/" ? "text-[#f97316]" : "text-gray-600 hover:text-[#f97316]"
                                }`}
                        >
                            <span className="leading-none">{t("navbar.base")}</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                        </Link>

                        {/* Dropdown Content */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-10px)] pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                            <div className="bg-white border border-slate-200 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.06)] py-1.5 min-w-[160px] overflow-hidden">
                                {baseItems.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.link}
                                        className="block px-4 py-1.5 text-[14px] font-medium text-slate-600 hover:text-[#f97316] hover:bg-slate-50 transition-all"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

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

                    {/* DEV KIT DROPDOWN - TEMPORARY */}
                    <div className="relative group py-4">
                        <button className="flex items-center gap-1.5 text-[15px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md transition-colors whitespace-nowrap tracking-tight font-sans">
                            <span className="leading-none">Kit Padrão</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                        </button>
                        <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%-5px)] pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                            <div className="bg-white border border-slate-200 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.06)] py-1.5 min-w-[200px] overflow-hidden">
                                <Link href="/empresas" className="block px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-[#f97316] hover:bg-slate-50 transition-all font-bold text-[#f97316]">
                                    Directório de Empresas
                                </Link>
                                <Link href="/design-system/detalhes-empresa" className="block px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-[#f97316] hover:bg-slate-50 transition-all">
                                    Perfil da Empresa (Kit)
                                </Link>
                                <Link href="/design-system/arquivo-produtos" className="block px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-[#f97316] hover:bg-slate-50 transition-all font-bold text-emerald-600">
                                    Arquivo de Produtos (Kit)
                                </Link>
                                <Link href="/empresas/agro-industria-zambezia/produto/castanha-de-caju-refinada" className="block px-4 py-2 text-[13px] font-medium text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 transition-all font-bold border-l-2 border-emerald-500">
                                    Página de Detalhes (Nova)
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Right Actions Section */}
                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="notranslate w-9 h-9 flex items-center justify-center rounded-[8px] bg-[#f97316]/10 font-medium text-[13px] text-[#f97316] hover:bg-[#f97316]/20 transition-all uppercase tracking-tight shadow-sm"
                        title={language === "PT" ? "Switch to English" : "Mudar para Português"}
                    >
                        {language === "PT" ? "EN" : "PT"}
                    </button>

                    {/* Minimalist Login Button (Always dynamic translation) */}
                    <Link href="/login" className="hidden sm:block">
                        <Button
                            className="notranslate bg-emerald-600 hover:bg-[#f97316] text-white text-[12px] font-bold px-5 h-9 rounded-[8px] transition-all shadow-sm border-none"
                        >
                            {t("common.login")}
                        </Button>
                    </Link>

                    {/* Mobile Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-gray-600">
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 border-l border-slate-100">
                            <div className="flex flex-col h-full bg-white">
                                <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                    <SheetTitle className="text-xl font-black text-slate-800">
                                        {t("common.menu")}
                                    </SheetTitle>
                                    <SheetClose asChild>
                                        <Button variant="ghost" size="icon" className="text-slate-400">
                                            <ChevronLeft className="w-5 h-5 rotate-180" />
                                        </Button>
                                    </SheetClose>
                                </div>

                                <div className="flex-1 overflow-y-auto py-4">
                                    <div className="px-6 mb-8">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Acesso Rápido</p>
                                        <div className="space-y-1">
                                            <Link href="/" className="flex items-center gap-3 py-3 text-slate-700 font-bold hover:text-emerald-600 border-b border-slate-50">
                                                <Home className="w-4 h-4 text-emerald-500" />
                                                Home
                                            </Link>
                                            {baseItems.map((item, i) => (
                                                <Link key={i} href={item.link} className="flex items-center gap-3 py-3 text-slate-600 font-medium hover:text-emerald-600 pl-4">
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="px-6 mb-8">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Navegação Principal</p>
                                        <div className="space-y-1">
                                            {menuItems.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    href={item.link}
                                                    className={`block py-3 text-slate-700 font-bold border-b border-slate-50 ${pathname === item.link ? "text-emerald-600" : ""}`}
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-slate-50 space-y-4">
                                    <Link href="/login" className="block w-full">
                                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-[12px]">
                                            {t("common.login")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
