"use client";

import { PageHeader } from "@/components/PageHeader";
import { MarketStatsStrip } from "@/components/MarketStatsStrip";
import { Handshake, TrendingUp, Eye, Globe, Target, Briefcase } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ParceriaPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-slate-50">
            <PageHeader
                title={<>{t('parceria.header_title')} <span className="text-[#f97316]">{t('parceria.header_span')}</span></>}
                icon={Handshake}
                backgroundImage="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop"
                breadcrumbs={[
                    { label: t('common.home'), href: "/" },
                    { label: t('parceria.header_span'), href: undefined }
                ]}
            />

            {/* Container 1: Intro & Stats */}
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 mt-[50px]">

                {/* 1. Crescemos Juntos */}
                <section className="bg-transparent py-10 md:pt-[20px] md:pb-[40px] overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                        {/* Left Column: Image */}
                        <div className="relative h-[450px] rounded-[20px] overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop"
                                alt="Parceria Base Agro Data"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#f97316]/20 rounded-full blur-2xl z-20"></div>
                            <div className="absolute top-10 right-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl z-20"></div>
                        </div>

                        {/* Right Column: Text Content */}
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                            <div className="space-y-4">
                                <h2 className="text-[35px] md:text-[48px] font-extrabold text-slate-700 leading-[1.1] tracking-tight">
                                    {t('parceria.intro_title')} <br />
                                    {t('parceria.intro_subtitle').split(' ')[0]} <span className="text-[#f97316]">{t('parceria.intro_subtitle').split(' ').slice(1).join(' ')}</span>
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {t('parceria.intro_text')}
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex gap-3 group sm:border-r sm:border-slate-200 sm:pr-5">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                            <Eye className="w-5 h-5 text-[#f97316]" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-700">{t('parceria.feature1_title')}</h3>
                                            <p className="text-slate-500 text-sm mt-0.5">{t('parceria.feature1_description')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 group">
                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                            <Globe className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-700">{t('parceria.feature2_title')}</h3>
                                            <p className="text-slate-500 text-sm mt-0.5">{t('parceria.feature2_description')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 group sm:border-r sm:border-slate-200 sm:pr-5">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                            <TrendingUp className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-700">{t('parceria.feature3_title')}</h3>
                                            <p className="text-slate-500 text-sm mt-0.5">{t('parceria.feature3_description')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 group">
                                        <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300">
                                            <Briefcase className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-slate-700">{t('parceria.feature4_title')}</h3>
                                            <p className="text-slate-500 text-sm mt-0.5">{t('parceria.feature4_description')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

            {/* 1.5. Market Position Stats Strip */}
            <MarketStatsStrip />

            {/* 2. Quem procuramos (Full Width Section) */}
            <section className="w-full bg-white py-20 border-y border-slate-200">
                <div className="max-w-[1350px] mx-auto px-4 md:px-[60px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-black text-slate-700 mb-6">{t('parceria.who_title')}</h3>
                            <p className="text-slate-600 mb-8 text-lg">
                                {t('parceria.who_text')}
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100 hover:border-orange-200 transition-colors">
                                    <div className="w-2 h-10 bg-orange-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">{t('parceria.who_item1')}</span>
                                </li>
                                <li className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
                                    <div className="w-2 h-10 bg-emerald-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">{t('parceria.who_item2')}</span>
                                </li>
                                <li className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                                    <div className="w-2 h-10 bg-blue-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">{t('parceria.who_item3')}</span>
                                </li>
                                <li className="flex items-center gap-4 bg-slate-50 p-4 rounded-lg shadow-sm border border-slate-100 hover:border-yellow-200 transition-colors">
                                    <div className="w-2 h-10 bg-yellow-500 rounded-full"></div>
                                    <span className="font-bold text-slate-700">{t('parceria.who_item4')}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 transform rotate-3 rounded-2xl opacity-20 blur-lg"></div>
                            <div className="bg-slate-50 p-8 rounded-2xl shadow-xl relative text-center border border-slate-100">
                                <h4 className="text-2xl font-black text-slate-700 mb-2">{t('parceria.form_title')}</h4>
                                <p className="text-slate-500 mb-6 text-sm">{t('parceria.form_text')}</p>

                                <form id="parceria-form" className="space-y-4 text-left" action="mailto:geral@baseagrodata.com" method="POST" encType="text/plain">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">{t('parceria.form_name')}</label>
                                        <input type="text" name="empresa" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-slate-700" placeholder="Ex: AgroTech Lda" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">{t('parceria.form_email')}</label>
                                        <input type="email" name="email" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium text-slate-700" placeholder="contacto@empresa.com" required />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1">{t('parceria.form_message')}</label>
                                        <textarea name="mensagem" className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium h-24 resize-none text-slate-700" placeholder="Descreva brevemente seu interesse..." required></textarea>
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-slate-800 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg">
                                        {t('parceria.form_submit')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Container 2: Premium Partners */}
            <div className="max-w-[1350px] mx-auto px-4 md:px-[60px] relative z-20 py-24">
                {/* 3. Premium Partners Section */}
                <section>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-slate-700 mb-4">{t('parceria.premium_partners')}</h2>
                        <p className="text-slate-500 text-sm max-w-2xl mx-auto">
                            {t('parceria.premium_text')}
                        </p>
                    </div>

                    <div className="relative">
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[
                                Autoplay({
                                    delay: 4000,
                                })
                            ]}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {/* Partner 1 */}
                                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/4">
                                    <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:border-orange-200 hover:shadow-lg transition-all group cursor-pointer h-full">
                                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Globe className="w-8 h-8 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-slate-800 font-bold text-lg">TechnoServe</h3>
                                            <p className="text-slate-500 text-xs mt-1">{t('parceria.partner1_description')}</p>
                                        </div>
                                    </div>
                                </CarouselItem>

                                {/* Partner 2 */}
                                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/4">
                                    <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:border-cyan-200 hover:shadow-lg transition-all group cursor-pointer h-full">
                                        <div className="w-16 h-16 rounded-full bg-cyan-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Target className="w-8 h-8 text-cyan-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-slate-800 font-bold text-lg">FAO</h3>
                                            <p className="text-slate-500 text-xs mt-1">{t('parceria.partner2_description')}</p>
                                        </div>
                                    </div>
                                </CarouselItem>


                                {/* Partner 3 */}
                                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/4">
                                    <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:border-blue-200 hover:shadow-lg transition-all group cursor-pointer h-full">
                                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 duration-300">
                                            <Briefcase className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-slate-800 font-bold text-lg">Banco Mundial</h3>
                                            <p className="text-slate-500 text-xs mt-1">{t('parceria.partner3_description')}</p>
                                        </div>
                                    </div>
                                </CarouselItem>

                                {/* Partner 4 */}
                                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/4">
                                    <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:border-indigo-200 hover:shadow-lg transition-all group cursor-pointer h-full">
                                        <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 duration-300">
                                            <TrendingUp className="w-8 h-8 text-indigo-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-slate-800 font-bold text-lg">Standard Bank</h3>
                                            <p className="text-slate-500 text-xs mt-1">{t('parceria.partner4_description')}</p>
                                        </div>
                                    </div>
                                </CarouselItem>

                                {/* Duplicate for Loop Effect (or realistic additional partners) */}
                                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/4">
                                    <div className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4 hover:border-green-200 hover:shadow-lg transition-all group cursor-pointer h-full">
                                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Globe className="w-8 h-8 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-slate-800 font-bold text-lg">AgroGlobal</h3>
                                            <p className="text-slate-500 text-xs mt-1">{t('parceria.partner5_description')}</p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </section>
            </div>
        </main>
    );
}
