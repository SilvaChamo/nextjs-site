"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Send, Youtube } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();
    const showTopBorder = pathname !== "/sobre-aplicativo";

    return (
        <footer className="w-full font-sans">
            {/* Orange Top Border */}
            {showTopBorder && (
                <div className="container-site">
                    <div className="w-full h-[6px] bg-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
                </div>
            )}

            {/* Main Content - Premium Dark Gradient Theme */}
            <div className={`bg-gradient-to-br from-emerald-950 via-[#011a14] to-emerald-950 text-white ${showTopBorder ? 'pt-2' : 'pt-0'} pb-0 relative overflow-hidden ShortView`}>
                {/* Subtle Decorative Blobs for Depth */}
                <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[100%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-green-900/10 rounded-full blur-[140px] pointer-events-none"></div>

                <div className="container-site relative z-10">
                    {/* RE-RENDERING GRID STRUCTURE FOR ACCURACY */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-[40px]">
                        {/* 1. Brand */}
                        <div className="col-span-1 lg:col-span-3 space-y-3 pt-[30px]">
                            <div className="flex flex-col items-start gap-1">
                                {/* Logo Image */}
                                <div className="w-32">
                                    <img
                                        src="/assets/logo-footer.png"
                                        alt="Base Agro Data"
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            </div>
                            <p className="text-gray-400 text-[14px] leading-relaxed">
                                Criado para impulsionar o sector agrário, através de facilitação ao acesso à informação e divulgação de dados agricolas e iniciativas do desenvolvimento do sector.
                            </p>
                        </div>

                        <div className="col-span-1 lg:col-span-2 space-y-4 pt-[30px]">
                            <h3 className="text-lg font-bold text-gray-200">Links internos</h3>
                            <ul className="space-y-1 text-[15px] text-gray-400">
                                <li><Link href="/sobre-nos" className="hover:text-[#f97316] transition-colors">Sobre nós</Link></li>
                                <li><Link href="/login" className="hover:text-[#f97316] transition-colors">Minha conta</Link></li>
                                <li><Link href="/relatorios" className="hover:text-[#f97316] transition-colors">Relatórios</Link></li>
                                <li><Link href="/artigos" className="hover:text-[#f97316] transition-colors">Actividades</Link></li>
                                <li><Link href="/blog" className="hover:text-[#f97316] transition-colors">Blog do Agro</Link></li>
                                <li><Link href="/usuario/dashboard" className="hover:text-[#f97316] transition-colors">Dashboard</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-1 lg:col-span-2 space-y-4 pt-[30px]">
                            <h3 className="text-lg font-bold text-gray-200">Links rápidos</h3>
                            <ul className="space-y-1 text-[15px] text-gray-400">
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Agro-negócio</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Tecnologia agrária</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Políticas agrárias</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Financiamento agrário</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Insumos agrícolas</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Produtos</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-1 lg:col-span-2 space-y-4 pt-[30px]">
                            <h3 className="text-lg font-bold text-gray-200">Nossos Serviços</h3>
                            <ul className="space-y-1 text-[15px] text-gray-400">
                                <li><Link href="/servicos/transporte" className="hover:text-[#f97316] transition-colors">Logística & Transporte</Link></li>
                                <li><Link href="/servicos/insumos" className="hover:text-[#f97316] transition-colors">Lojas de Insumos</Link></li>
                                <li><Link href="/servicos/mercado" className="hover:text-[#f97316] transition-colors">Compra & Venda</Link></li>
                                <li><Link href="/servicos/emprego" className="hover:text-[#f97316] transition-colors">Vagas de Emprego</Link></li>
                                <li><Link href="/servicos/consultoria" className="hover:text-[#f97316] transition-colors">Consultoria Digital</Link></li>
                                <li><Link href="/servicos/anuncios" className="hover:text-[#f97316] transition-colors">Publicidade & Anúncios</Link></li>
                            </ul>
                        </div>

                        <div className="col-span-1 lg:col-span-3 space-y-4 pt-[30px]">
                            <h3 className="text-lg font-bold text-gray-200">Newsletter</h3>
                            <p className="text-gray-400 text-xs leading-tight">
                                Receba as últimas actualizações e oportunidades do mercado agrário directamente no seu e-mail.
                            </p>
                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const form = e.currentTarget;
                                    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                                    const email = emailInput.value;

                                    if (!email) return;

                                    // Dynamic import to avoid server-component issues if this becomes one, though it is "use client"
                                    const { createClient } = await import("@/utils/supabase/client");
                                    const supabase = createClient();

                                    const { error } = await supabase.from('newsletter_subscribers').insert([{ email }]);

                                    if (error) {
                                        if (error.code === '23505') alert("Este email já está subscrito!");
                                        else alert("Erro ao subscrever. Tente novamente.");
                                    } else {
                                        alert("Subscrição realizada com sucesso!");
                                        emailInput.value = "";
                                    }
                                }}
                                className="flex flex-col gap-[15px]"
                            >
                                <input
                                    type="email"
                                    placeholder="E-Mail"
                                    required
                                    className="w-full bg-white text-gray-800 px-6 py-3 rounded-[7px] text-xs focus:outline-none focus:ring-2 focus:ring-[#f97316] border border-gray-100 shadow-inner"
                                />
                                <button type="submit" className="w-full bg-emerald-600 text-white font-bold uppercase py-3 rounded-[7px] hover:bg-[#f97316] transition-colors text-xs tracking-wider shadow-md active:scale-95">
                                    Subscrever
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar: Legal Links & Socials */}
                <div className="border-t border-white/10 mt-10">
                    <div className="container-site py-8 flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 text-gray-400 text-[11px] font-bold uppercase tracking-[0.1em]">
                            <Link href="/politica-privacidade" className="hover:text-[#f97316] transition-colors">Política de Privacidade</Link>
                            <Link href="/termos" className="hover:text-[#f97316] transition-colors">Termos e Condições</Link>
                            <Link href="/suporte" className="hover:text-[#f97316] transition-colors">Suporte</Link>
                            <Link href="/design-system" className="hover:text-[#f97316] transition-colors text-emerald-500/40">Kit Padrão</Link>
                        </div>

                        {/* Social Media Container */}
                        <div className="flex items-center gap-3 bg-white/5 p-2 rounded-full border border-white/5 backdrop-blur-sm">
                            <SocialIcon Icon={Facebook} href="https://facebook.com/baseagrodata" />
                            <SocialIcon Icon={Linkedin} href="https://linkedin.com/company/baseagrodata" />
                            <SocialIcon Icon={Instagram} href="https://instagram.com/baseagrodata" />
                            <SocialIcon Icon={Youtube} href="https://youtube.com/@baseagrodata" />
                        </div>
                    </div>
                </div>
            </div>


            {/* Copyright Bar - Ultra Dark Integrated */}
            <div className="bg-[#000d0a] py-4 border-t border-white/5 relative z-20">
                <div className="container-site text-center">
                    <p className="text-[12px] text-gray-400 tracking-wider">
                        Copyright © 2023 Base de dados agrícola | Powered by <a href="https://visualdesigne.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600/80 font-bold hover:text-[#f97316] transition-colors hover:underline">VisualDESIGN</a> Services, Lda.
                    </p>
                </div>
            </div>
        </footer >
    );
}

function SocialIcon({ Icon, href = "#" }: { Icon: any; href?: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="size-9 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#f97316] hover:border-[#f97316] transition-all duration-300 shadow-sm"
        >
            <Icon className="w-4 h-4" />
        </a>
    );
}
