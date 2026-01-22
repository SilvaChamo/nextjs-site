"use client";

import React from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Building2, ShoppingCart } from "lucide-react";

export function SupermarketCarousel() {
    const supermarkets = [
        {
            name: "Shoprite",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Shoprite_Holdings_Logo.svg/1200px-Shoprite_Holdings_Logo.svg.png",
            color: "bg-red-50",
            borderColor: "border-red-100"
        },
        {
            name: "Spar",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Spar_Logo.svg/1200px-Spar_Logo.svg.png",
            color: "bg-emerald-50",
            borderColor: "border-emerald-100"
        },
        {
            name: "Choppies",
            logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Choppies_Logo.png",
            color: "bg-orange-50",
            borderColor: "border-orange-100"
        },
        {
            name: "Super Marés",
            logo: "https://lh3.googleusercontent.com/p/AF1QipN3XQ_lqX_lqX_lqX_lqX_lqX_lqX_lqX_lqX", // General placeholder as specific logo might be hard to fetch
            fallbackText: "Super Marés",
            color: "bg-blue-50",
            borderColor: "border-blue-100"
        },
        {
            name: "Premier",
            logo: "https://premier.co.mz/wp-content/uploads/2021/09/Logo-Premier-1.png",
            color: "bg-slate-50",
            borderColor: "border-slate-100"
        },
        {
            name: "Woolworths",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Woolworths_logo.svg/1200px-Woolworths_logo.svg.png",
            color: "bg-neutral-50",
            borderColor: "border-neutral-100"
        }
    ];

    return (
        <div className="w-full bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-[#f97316]" />
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-800">Mercado Digital</h3>
                    <p className="text-xs text-slate-500 font-medium">Principais parceiros comerciais</p>
                </div>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {supermarkets.map((market, index) => (
                        <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <div className={`p-4 rounded-2xl border ${market.borderColor} ${market.color} h-32 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:shadow-md transition-all`}>
                                <div className="relative w-full h-12 flex items-center justify-center">
                                    {market.fallbackText ? (
                                        <span className="font-black text-slate-700 text-center leading-tight">{market.fallbackText}</span>
                                    ) : (
                                        <img
                                            src={market.logo}
                                            alt={market.name}
                                            className="h-full w-auto object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity"
                                        />
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-4">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-8 w-8 hover:bg-orange-100 hover:text-orange-600 border-slate-200" />
                    <CarouselNext className="relative right-0 top-0 translate-y-0 h-8 w-8 hover:bg-orange-100 hover:text-orange-600 border-slate-200" />
                </div>
            </Carousel>
        </div>
    );
}
