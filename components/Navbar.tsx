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
                <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                    {/* Theme Toggle */}
                    {/* <ModeToggle /> */}

                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full bg-gray-50 font-bold text-[9px] text-gray-700 hover:text-[#f97316] hover:border-[#f97316] transition-all uppercase font-sans dark:bg-white/10 dark:backdrop-blur-md dark:border-white/20 dark:text-white dark:hover:bg-white/20"
                    >
                        {language === "PT" ? "EN" : "PT"}
                    </button>

                    {/* Off-Canvas Menu Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="text-gray-700 hover:text-accent transition-colors">
                                <Menu className="h-7 w-7" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="max-w-[1350px] mx-auto w-full overflow-x-hidden overflow-y-auto p-0 bg-white text-gray-800 flex flex-col h-full border-l-0 [&>button]:hidden text-left"
                        >
                            {/* Accessibility: Title */}
                            <div className="hidden">
                                <SheetTitle>Menu de Navegação</SheetTitle>
                            </div>

                            {/* 1. Header (Fixed) */}
                            <div className="px-5 py-3 flex justify-between items-center bg-[#f3f4f6] shrink-0 border-b border-gray-200">
                                <SheetClose className="flex items-center gap-2 text-gray-600 hover:text-[#f97316] transition-colors uppercase font-black tracking-widest text-sm outline-none">
                                    <ChevronLeft className="h-5 w-5" />
                                    VOLTAR
                                </SheetClose>
                                {user ? (
                                    <Link href="/usuario/dashboard">
                                        <Button
                                            variant="outline"
                                            className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 hover:border-emerald-300 text-[10px] font-bold px-4 h-7 uppercase tracking-wider transition-all flex items-center gap-2"
                                        >
                                            <User className="w-3 h-3" />
                                            Minha Conta
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/login">
                                        <Button
                                            variant="outline"
                                            className="rounded-full border-gray-400 text-gray-600 hover:bg-white hover:text-[#f97316] hover:border-[#f97316] text-[10px] font-bold px-5 h-7 uppercase tracking-wider bg-transparent transition-all"
                                        >
                                            Entrar
                                        </Button>
                                    </Link>
                                )}
                            </div>

                            {/* 2. Main Content (Flexible - No Scroll ideally) */}
                            <div className="flex-1 flex flex-col px-5 py-6 overflow-hidden">
                                {view === "menu" ? (
                                    <div className="flex flex-col h-full">
                                        {/* Mobile Only: Main Navigation */}
                                        <nav className="space-y-4 mb-6 shrink-0 lg:hidden display-block">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Menu Principal</p>
                                            {menuItems.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    href={item.link}
                                                    className="flex items-center text-xl font-bold text-gray-800 hover:text-[#f97316] transition-colors"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                            <div className="h-px bg-gray-100 w-full mt-4" />
                                        </nav>

                                        {/* New Off-canvas Menu (Invented) */}
                                        <nav className="space-y-3 mb-6 shrink-0">
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Mais Opções</p>
                                            {offCanvasItems.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    href={item.link}
                                                    className="flex items-center text-[15px] font-semibold text-gray-600 hover:text-[#f97316] transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-3 group-hover:bg-[#f97316]"></span>
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </nav>

                                        <div className="h-px bg-gray-200 w-full mb-3 shrink-0" />

                                        {/* Contact Form Section (Compact) */}
                                        <div className="flex-1 flex flex-col min-h-0 justify-end">
                                            <div className="flex items-center gap-3 mb-2 shrink-0">
                                                <div className="w-1 h-4 bg-[#f97316]"></div>
                                                <h3 className="text-gray-500 text-sm font-medium">Fale conosco</h3>
                                            </div>

                                            <div className="bg-[#f9fafb] rounded-[10px] p-4 space-y-2 flex flex-col shadow-inner border border-gray-100">
                                                {success.contact ? (
                                                    <div className="flex flex-col items-center justify-center py-4 text-emerald-600">
                                                        <CheckCircle className="w-8 h-8 mb-2" />
                                                        <span className="text-xs font-bold uppercase">Mensagem Enviada!</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Input
                                                            placeholder="Nome"
                                                            value={contactForm.name}
                                                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                            className="rounded-[10px] bg-white border-none h-8 px-3 text-xs text-gray-700 placeholder:text-gray-400 shadow-sm"
                                                        />
                                                        <Input
                                                            placeholder="E-mail"
                                                            value={contactForm.email}
                                                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                            className="rounded-[10px] bg-white border-none h-8 px-3 text-xs text-gray-700 placeholder:text-gray-400 shadow-sm"
                                                        />
                                                        <Textarea
                                                            placeholder="Mensagem"
                                                            value={contactForm.message}
                                                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                                            className="rounded-[10px] bg-white border-none resize-none px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 shadow-sm flex-1 min-h-[80px]"
                                                        />
                                                        <Button
                                                            onClick={handleContactSubmit}
                                                            disabled={loading.contact}
                                                            className="w-full rounded-[10px] bg-emerald-950 text-white hover:bg-[#f97316] transition-all font-bold h-8 text-[10px] shadow-sm self-start uppercase tracking-wider"
                                                        >
                                                            {loading.contact ? <Loader2 className="w-3 h-3 animate-spin" /> : "Enviar"}
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col h-full bg-slate-50/50 p-6 rounded-2xl border border-dashed border-slate-200 items-center justify-center text-center space-y-4">
                                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                            <Building2 className="w-8 h-8 text-[#f97316]" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-slate-800 uppercase tracking-tighter">Área de Parceiros</h3>
                                            <p className="text-xs text-slate-500 font-medium leading-tight mt-1">
                                                Crie sua conta para gerir sua empresa e aceder a dados exclusivos.
                                            </p>
                                        </div>
                                        <Link href="/login" className="w-full">
                                            <Button className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-black py-6 rounded-xl shadow-lg shadow-orange-500/20 transition-all uppercase tracking-widest text-[10px]">
                                                Começar Agora
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* 3. Footer (Fixed) */}
                            <div className="bg-[#e5e7eb] shrink-0 border-t border-gray-300 flex flex-col">
                                {view === "menu" && (
                                    <div className="px-5 py-3 space-y-1 border-b border-gray-300/50 text-[10px] text-gray-600">
                                        <p className="font-bold">Av. karl Marx nº 177, Maputo - Moçambique</p>
                                        <div className="flex flex-col leading-tight">
                                            <p><span className="font-bold">Telefone:</span> +258 87 75 75 288</p>
                                            <p><span className="font-bold">Whatsapp:</span> +258 82 52 88 318</p>
                                            <p><span className="font-bold">E-mail:</span> info@baseagrodata.com</p>
                                            <p>Suporte@baseagrodata.com</p>
                                        </div>
                                    </div>
                                )}

                                <div className="px-5 py-3 flex items-center justify-between">
                                    <div className="text-[10px] font-bold text-gray-500 leading-none flex flex-col gap-0.5">
                                        <span>© 2024</span>
                                        <span className="text-gray-700">BaseAgroData</span>
                                    </div>

                                    <div className="flex gap-2">
                                        {[
                                            { icon: Facebook, bg: "hover:bg-[#1877F2]", color: "hover:text-white" },
                                            { icon: Instagram, bg: "hover:bg-[#E4405F]", color: "hover:text-white" },
                                            { icon: Linkedin, bg: "hover:bg-[#0A66C2]", color: "hover:text-white" },
                                            { icon: Twitter, bg: "hover:bg-black", color: "hover:text-white" }
                                        ].map((social, i) => (
                                            <div key={i} className={`w-6 h-6 bg-gray-300/80 rounded-md ${social.bg} ${social.color} transition-colors cursor-pointer flex items-center justify-center text-gray-600 shadow-sm`}>
                                                <social.icon className="w-3 h-3" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
