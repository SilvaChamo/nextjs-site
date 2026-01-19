"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronLeft, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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

export function Navbar() {
    const [language, setLanguage] = useState<"PT" | "EN">("PT");
    const [view, setView] = useState<"menu" | "auth">("menu");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "PT" ? "EN" : "PT"));
    };

    const menuItems = [
        { label: "Sobre nós", link: "#" },
        { label: "Serviços", link: "#" },
        { label: "Repositório", link: "#" },
        { label: "Parceria", link: "#" },
        { label: "Mercado", link: "#" },
    ];

    return (
        <header className="w-full py-3 px-6 md:px-12 flex items-center justify-between fixed top-0 left-0 z-50 bg-white shadow-md">
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
                    className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-full bg-gray-50 font-bold text-[10px] text-gray-700 hover:text-accent hover:border-accent transition-all uppercase font-sans"
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
                            {/* Always show consistent header branding if needed, or context aware. 
                                Image shows "< MENU" and "ENTRAR" button even in auth view? 
                                Actually the image shows "< MENU" (acting as Close?) and "ENTRAR" button. 
                                But in 'auth' view, the 'ENTRAR' button might be redundant or active.
                                Let's keep the logic: If in 'menu', show MENU + ENTRAR button. 
                                If in 'auth', user wants "Voltar ao Menu" link inside the content area according to image.
                                The main header seems static in the image: "< MENU" and "ENTRAR".
                             */}
                            <SheetClose className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors uppercase font-black tracking-widest text-sm outline-none">
                                <ChevronLeft className="h-5 w-5" />
                                MENU
                            </SheetClose>
                            <Button
                                variant="outline"
                                onClick={() => setView("auth")}
                                className={`rounded-full border-gray-400 text-gray-600 hover:bg-white hover:text-orange-500 hover:border-orange-500 text-[10px] font-bold px-5 h-7 uppercase tracking-wider bg-transparent transition-all ${view === 'auth' ? 'opacity-50 cursor-default' : ''}`}
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
                                                className="flex items-center text-[14px] font-bold text-gray-700 hover:text-orange-500 transition-colors"
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
                                            <div className="w-1 h-4 bg-orange-500"></div>
                                            <h3 className="text-gray-500 text-sm font-medium">Fale conosco</h3>
                                        </div>

                                        <div className="bg-[#f9fafb] rounded-2xl p-3 space-y-2 flex flex-col shadow-inner border border-gray-100">
                                            <Input
                                                placeholder="Nome"
                                                className="rounded-xl bg-white border-none h-8 px-3 text-xs text-gray-700 placeholder:text-gray-400 shadow-sm"
                                            />
                                            <Input
                                                placeholder="E-mail"
                                                className="rounded-xl bg-white border-none h-8 px-3 text-xs text-gray-700 placeholder:text-gray-400 shadow-sm"
                                            />
                                            <Textarea
                                                placeholder="Mensagem"
                                                className="rounded-xl bg-white border-none resize-none px-3 py-2 text-xs text-gray-700 placeholder:text-gray-400 shadow-sm flex-1 min-h-[80px]"
                                            />
                                            <Button className="w-20 rounded-full bg-white text-gray-600 border border-transparent hover:border-orange-500 hover:bg-white hover:text-orange-500 transition-all font-bold px-0 h-7 text-[10px] shadow-sm shadow-gray-200 self-start uppercase tracking-wider">
                                                Enviar
                                            </Button>
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

                                    <div className="flex-1 flex flex-col min-h-0 gap-3 justify-center">
                                        {/* Login Section */}
                                        <div className="flex-1 min-h-0 flex flex-col">
                                            <div className="flex items-center gap-2 mb-1.5 shrink-0">
                                                <div className="w-0.5 h-3 bg-orange-500"></div>
                                                <h3 className="text-gray-600 text-sm font-medium">Entrar</h3>
                                            </div>
                                            <div className="bg-[#f9fafb] rounded-2xl p-3 space-y-2 shadow-inner border border-gray-100 flex-1 flex flex-col justify-center">
                                                <Input placeholder="E-mail" className="rounded-xl bg-white border-none h-8 px-3 text-xs shadow-sm" />
                                                <Input type="password" placeholder="Password" className="rounded-xl bg-white border-none h-8 px-3 text-xs shadow-sm" />
                                                <Button className="w-full rounded-full h-8 bg-gray-200 border border-transparent hover:bg-white hover:border-orange-500 hover:text-orange-500 text-gray-600 font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm mt-1">Enviar</Button>
                                            </div>
                                        </div>

                                        {/* Register Section */}
                                        <div className="flex-[1.2] min-h-0 flex flex-col">
                                            <div className="flex items-center gap-2 mb-1.5 shrink-0">
                                                <div className="w-0.5 h-3 bg-orange-500"></div>
                                                <h3 className="text-gray-600 text-sm font-medium">Registar</h3>
                                            </div>
                                            <div className="bg-[#f9fafb] rounded-2xl p-3 space-y-2 shadow-inner border border-gray-100 flex-1 flex flex-col justify-center">
                                                <Input placeholder="Nome" className="rounded-xl bg-white border-none h-8 px-3 text-xs shadow-sm" />
                                                <Input placeholder="E-mail" className="rounded-xl bg-white border-none h-8 px-3 text-xs shadow-sm" />
                                                <Input type="password" placeholder="Senha" className="rounded-xl bg-white border-none h-8 px-3 text-xs shadow-sm" />
                                                <Input type="password" placeholder="Confirmar senha" className="rounded-xl bg-white border-none h-8 px-3 text-xs shadow-sm" />
                                                <Button className="w-full rounded-full h-8 bg-gray-200 border border-transparent hover:bg-white hover:border-orange-500 hover:text-orange-500 text-gray-600 font-bold text-[10px] uppercase tracking-widest transition-all shadow-sm mt-1">Enviar</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 3. Footer (Fixed) */}
                        <div className="bg-[#e5e7eb] shrink-0 border-t border-gray-300 flex flex-col">
                            {/* Address Info - Only in Menu View */}
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
        </header>
    );
}
