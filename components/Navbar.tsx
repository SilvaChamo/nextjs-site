"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronLeft, Facebook, Instagram, Linkedin, Twitter, Loader2, CheckCircle } from "lucide-react";
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

export function Navbar() {
    const [language, setLanguage] = useState<"PT" | "EN">("PT");
    const [view, setView] = useState<"menu" | "auth">("menu");

    // Form States
    const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
    const [registerForm, setRegisterForm] = useState({ name: "", category: "", email: "" });

    const [loading, setLoading] = useState<{ contact: boolean; register: boolean }>({ contact: false, register: false });
    const [success, setSuccess] = useState<{ contact: boolean; register: boolean }>({ contact: false, register: false });

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "PT" ? "EN" : "PT"));
    };

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
        { label: "Sobre nós", link: "/sobre" },
        { label: "Serviços", link: "#servicos" },
        { label: "Repositório", link: "/pesquisa" },
        { label: "Parceria", link: "#parceria" },
        { label: "Mercado", link: "/pesquisa?cat=produtos" },
    ];

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md">
            <div className="container-site py-3 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/">
                        <div className="hover:opacity-80 transition-opacity duration-300">
                            <Image
                                src="https://baseagrodata.com/wp-content/uploads/2026/01/Logo2-01.png"
                                alt="Base Agro Data Logo"
                                width={140}
                                height={50}
                                className="h-8 md:h-10 w-auto object-contain"
                            />
                        </div>
                    </Link>
                </div>

                {/* Right Actions Section */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-full bg-gray-50 font-bold text-[10px] text-gray-700 hover:text-[#f97316] hover:border-[#f97316] transition-all uppercase font-sans"
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
                            className="w-full sm:w-[300px] p-0 bg-white text-gray-800 flex flex-col h-full border-l-0 [&>button]:hidden"
                        >
                            {/* Accessibility: Title */}
                            <div className="hidden">
                                <SheetTitle>Menu de Navegação</SheetTitle>
                            </div>

                            {/* 1. Header (Fixed) */}
                            <div className="px-5 py-3 flex justify-between items-center bg-[#f3f4f6] shrink-0 border-b border-gray-200">
                                <SheetClose className="flex items-center gap-2 text-gray-600 hover:text-[#f97316] transition-colors uppercase font-black tracking-widest text-sm outline-none">
                                    <ChevronLeft className="h-5 w-5" />
                                    MENU
                                </SheetClose>
                                <Button
                                    variant="outline"
                                    onClick={() => setView("auth")}
                                    className={`rounded-full border-gray-400 text-gray-600 hover:bg-white hover:text-[#f97316] hover:border-[#f97316] text-[10px] font-bold px-5 h-7 uppercase tracking-wider bg-transparent transition-all ${view === 'auth' ? 'opacity-50 cursor-default' : ''}`}
                                >
                                    Entrar
                                </Button>
                            </div>

                            {/* 2. Main Content (Flexible - No Scroll ideally) */}
                            <div className="flex-1 flex flex-col px-5 py-3 overflow-hidden">
                                {view === "menu" ? (
                                    <div className="flex flex-col h-full">
                                        {/* Navigation Links */}
                                        <nav className="space-y-1 mb-3 shrink-0">
                                            {menuItems.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    href={item.link}
                                                    className="flex items-center text-[14px] font-bold text-gray-700 hover:text-[#f97316] transition-colors"
                                                >
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3"></span>
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
                                                            className="w-full rounded-[10px] bg-slate-900 text-white hover:bg-[#f97316] transition-all font-bold h-8 text-[10px] shadow-sm self-start uppercase tracking-wider"
                                                        >
                                                            {loading.contact ? <Loader2 className="w-3 h-3 animate-spin" /> : "Enviar"}
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col h-full animate-in slide-in-from-right-8 duration-300">
                                        {/* Voltar Link */}
                                        <div
                                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors uppercase font-bold tracking-widest text-[10px] cursor-pointer mb-2 shrink-0"
                                            onClick={() => setView("menu")}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Voltar ao Menu
                                        </div>

                                        <div className="flex-1 flex flex-col min-h-0 gap-4 mt-2">
                                            {/* Login Section */}
                                            <div className="shrink-0 opacity-50 pointer-events-none">
                                                <div className="flex items-center gap-2 mb-1.5 shrink-0">
                                                    <div className="w-0.5 h-3 bg-[#f97316]"></div>
                                                    <h3 className="text-gray-600 text-[11px] font-bold uppercase tracking-wider">Entrar (Em Breve)</h3>
                                                </div>
                                                <div className="bg-[#f9fafb] rounded-[10px] p-3 space-y-2 shadow-inner border border-gray-100">
                                                    <Input placeholder="E-mail" disabled className="rounded-[10px] bg-white border-none h-8 px-3 text-xs shadow-sm" />
                                                    <Input type="password" placeholder="Senha" disabled className="rounded-[10px] bg-white border-none h-8 px-3 text-xs shadow-sm" />
                                                    <Button disabled className="w-full rounded-[10px] h-8 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm">Entrar</Button>
                                                </div>
                                            </div>

                                            {/* Register Section */}
                                            <div className="shrink-0">
                                                <div className="flex items-center gap-2 mb-1.5 shrink-0">
                                                    <div className="w-0.5 h-3 bg-[#f97316]"></div>
                                                    <h3 className="text-gray-600 text-[11px] font-bold uppercase tracking-wider">Registar Empresa</h3>
                                                </div>
                                                <div className="bg-[#f9fafb] rounded-[10px] p-3 space-y-2 shadow-inner border border-gray-100">
                                                    {success.register ? (
                                                        <div className="flex flex-col items-center justify-center py-4 text-emerald-600">
                                                            <CheckCircle className="w-8 h-8 mb-2" />
                                                            <span className="text-xs font-bold uppercase">Empresa Registada!</span>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <Input
                                                                placeholder="Nome da Empresa"
                                                                value={registerForm.name}
                                                                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                                                                className="rounded-[10px] bg-white border-none h-8 px-3 text-xs shadow-sm"
                                                            />
                                                            <Input
                                                                placeholder="Categoria (ex: Produção)"
                                                                value={registerForm.category}
                                                                onChange={(e) => setRegisterForm({ ...registerForm, category: e.target.value })}
                                                                className="rounded-[10px] bg-white border-none h-8 px-3 text-xs shadow-sm"
                                                            />
                                                            <Input
                                                                placeholder="E-mail de Contacto"
                                                                value={registerForm.email}
                                                                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                                                className="rounded-[10px] bg-white border-none h-8 px-3 text-xs shadow-sm"
                                                            />
                                                            <Button
                                                                onClick={handleRegisterSubmit}
                                                                disabled={loading.register}
                                                                className="w-full rounded-[10px] h-8 bg-slate-900 text-white hover:bg-[#f97316] font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm"
                                                            >
                                                                {loading.register ? <Loader2 className="w-3 h-3 animate-spin" /> : "Registar"}
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 3. Footer (Fixed) */}
                            <div className="bg-[#e5e7eb] shrink-0 border-t border-gray-300 flex flex-col">
                                {/* Address Info... (Same as before) */}
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

                                {/* Branding & Socials */}
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
