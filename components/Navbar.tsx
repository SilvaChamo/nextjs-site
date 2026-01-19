"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ChevronLeft, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
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
                        className="w-full sm:w-[400px] p-0 bg-white text-gray-800 flex flex-col h-full border-l-0"
                    >
                        {/* Off-Canvas Header */}
                        <div className="px-6 py-4 flex justify-between items-center bg-gray-100/50 shrink-0">
                            {view === "menu" ? (
                                <>
                                    <SheetClose className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors uppercase font-black tracking-widest text-sm outline-none">
                                        <ChevronLeft className="h-5 w-5" />
                                        Menu
                                    </SheetClose>
                                    <Button
                                        variant="outline"
                                        onClick={() => setView("auth")}
                                        className="rounded-full border-gray-300 text-gray-500 hover:bg-gray-200 hover:text-gray-900 text-xs font-bold px-6 h-8 uppercase tracking-wider bg-transparent"
                                    >
                                        Entrar
                                    </Button>
                                </>
                            ) : (
                                <div className="flex items-center gap-2 text-gray-500 transition-colors uppercase font-black tracking-widest text-xs cursor-pointer hover:text-gray-900" onClick={() => setView("menu")}>
                                    <ChevronLeft className="h-5 w-5" />
                                    Voltar ao Menu
                                </div>
                            )}
                        </div>

                        {/* Menu Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {view === "menu" ? (
                                <div className="p-6 md:p-8">
                                    {/* Navigation Links */}
                                    <nav className="space-y-3 mb-6">
                                        {menuItems.map((item, i) => (
                                            <Link
                                                key={i}
                                                href={item.link}
                                                className="flex items-center text-base font-medium text-gray-800 hover:text-accent transition-colors"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3"></span>
                                                {item.label}
                                            </Link>
                                        ))}
                                    </nav>

                                    <div className="h-px bg-gray-200 w-full mb-6" />

                                    {/* Contact Form Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-5 bg-gray-400"></div>
                                            <h3 className="text-gray-500 text-base font-medium">Fale conosco</h3>
                                        </div>

                                        <div className="bg-gray-100 rounded-3xl p-5 space-y-3">
                                            <Input
                                                placeholder="Nome"
                                                className="rounded-full bg-white border-none h-10 px-5 text-sm text-gray-700 placeholder:text-gray-400 shadow-sm"
                                            />
                                            <Input
                                                placeholder="E-mail"
                                                className="rounded-full bg-white border-none h-10 px-5 text-sm text-gray-700 placeholder:text-gray-400 shadow-sm"
                                            />
                                            <Textarea
                                                placeholder="Mensagem"
                                                className="rounded-2xl bg-white border-none resize-none px-5 py-3 min-h-[80px] text-sm text-gray-700 placeholder:text-gray-400 shadow-sm"
                                            />
                                            <Button className="rounded-full bg-white text-gray-600 hover:bg-white hover:text-accent hover:shadow-md transition-all font-medium px-6 h-9 text-xs shadow-sm shadow-gray-200">
                                                Enviar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6 md:p-8 space-y-8 animate-in slide-in-from-right-4 duration-300">
                                    {/* Login Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-5 bg-gray-500"></div>
                                            <h3 className="text-gray-600 text-lg font-medium">Entrar</h3>
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-6 space-y-3 shadow-inner">
                                            <Input placeholder="E-mail" className="rounded-full bg-white border-gray-100 h-11 px-5 text-sm shadow-sm" />
                                            <Input type="password" placeholder="Password" className="rounded-full bg-white border-gray-100 h-11 px-5 text-sm shadow-sm" />
                                            <Button className="w-full rounded-full h-11 bg-gray-200 hover:bg-accent hover:text-white text-gray-600 font-medium text-sm transition-all shadow-sm">Enviar</Button>
                                        </div>
                                    </div>

                                    {/* Register Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-5 bg-gray-500"></div>
                                            <h3 className="text-gray-600 text-lg font-medium">Registar</h3>
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-6 space-y-3 shadow-inner">
                                            <Input placeholder="Nome" className="rounded-full bg-white border-gray-100 h-11 px-5 text-sm shadow-sm" />
                                            <Input placeholder="E-mail" className="rounded-full bg-white border-gray-100 h-11 px-5 text-sm shadow-sm" />
                                            <Input type="password" placeholder="Senha" className="rounded-full bg-white border-gray-100 h-11 px-5 text-sm shadow-sm" />
                                            <Input type="password" placeholder="Confirmar senha" className="rounded-full bg-white border-gray-100 h-11 px-5 text-sm shadow-sm" />
                                            <Button className="w-full rounded-full h-11 bg-gray-200 hover:bg-accent hover:text-white text-gray-600 font-medium text-sm transition-all shadow-sm">Enviar</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Info */}
                        <div className="bg-gray-100 p-6 shrink-0 space-y-4 text-xs text-gray-600 font-sans border-t border-gray-200">
                            <div className="space-y-2">
                                <p className="font-medium">Av. karl Marx nº 177, Mapputo - Moçambique</p>
                                <p><span className="font-bold">Telefone:</span> +258 87 75 75 288</p>
                                <p><span className="font-bold">Whatsapp:</span> +258 82 52 88 318</p>
                                <p><span className="font-bold">E-mail:</span> info@baseagrodata.com</p>
                                <p>Suporte@baseagrodata.com</p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-gray-300/30">
                                <div className="text-[10px] font-bold text-gray-500 leading-tight">
                                    <p>© 2024</p>
                                    <p>BaseAgroData</p>
                                </div>
                                {/* Social Icons Placeholder */}
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4].map((_, i) => (
                                        <div key={i} className="w-7 h-7 bg-gray-300 rounded-md hover:bg-accent transition-colors cursor-pointer flex items-center justify-center text-white text-[10px]">
                                            <i className="fa-brands fa-facebook-f"></i>
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
