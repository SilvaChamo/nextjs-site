import Link from "next/link";
import { Facebook, Instagram, Linkedin, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full font-sans">
            {/* Orange Top Border */}
            <div className="container-site">
                <div className="w-full h-[6px] bg-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.6)]" />
            </div>

            {/* Main Content - Dark Charcoal Background */}
            <div className="bg-[#383D43] text-white pt-10 pb-4">
                <div className="container-site">
                    {/* RE-RENDERING GRID STRUCTURE FOR ACCURACY */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                        {/* 1. Brand */}
                        <div className="col-span-1 lg:col-span-1 space-y-4">
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
                            <p className="text-gray-400 text-xs leading-relaxed">
                                Criado para impulsionar o sector agrário, através de facilitação ao acesso à informação e divulgação de dados agricolas e iniciativas do desenvolvimento do sector.
                            </p>
                        </div>

                        {/* 2. Links Internos */}
                        <div className="col-span-1 space-y-4">
                            <h3 className="text-lg font-bold text-gray-200">Links internos</h3>
                            <ul className="space-y-2 text-xs text-gray-400">
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Minha conta</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Actividades</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Nossos parceiros</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Repositório</Link></li>
                                <li><Link href="/admin" className="hover:text-[#f97316] transition-colors">Dashboard</Link></li>
                            </ul>
                        </div>

                        {/* 3. Links Rápidos */}
                        <div className="col-span-1 space-y-4">
                            <h3 className="text-lg font-bold text-gray-200">Links rápidos</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Agro-negócio</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Tecnologia agrária</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Políticas agrárias</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Financiamento agrário</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Insumos agrícolas</Link></li>
                                <li><Link href="#" className="hover:text-[#f97316] transition-colors">Produtos</Link></li>
                            </ul>
                        </div>

                        {/* 4. Nossos Serviços */}
                        <div className="col-span-1 space-y-4">
                            <h3 className="text-lg font-bold text-gray-200">Nossos Serviços</h3>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link href="/servicos/transporte" className="hover:text-[#f97316] transition-colors">Logística & Transporte</Link></li>
                                <li><Link href="/servicos/insumos" className="hover:text-[#f97316] transition-colors">Lojas de Insumos</Link></li>
                                <li><Link href="/servicos/mercado" className="hover:text-[#f97316] transition-colors">Compra & Venda</Link></li>
                                <li><Link href="/servicos/emprego" className="hover:text-[#f97316] transition-colors">Vagas de Emprego</Link></li>
                                <li className="pt-2">
                                    <p className="text-[10px] text-gray-500 italic leading-tight">
                                        Encontre mais serviços no menu principal do cabeçalho.
                                    </p>
                                </li>
                                <li className="pt-1"><Link href="/servicos" className="text-emerald-400 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">→ Ver Todos os Serviços</Link></li>
                            </ul>
                        </div>

                        {/* 5. Newsletter */}
                        <div className="col-span-1 lg:col-span-1 space-y-4">
                            <h3 className="text-lg font-bold text-gray-200">Newsletter</h3>
                            <div className="space-y-[10px]">
                                <input
                                    type="email"
                                    placeholder="E-Mail"
                                    className="w-full bg-white text-gray-800 px-4 py-2 rounded-[4px] text-xs focus:outline-none focus:ring-2 focus:ring-[#f97316] border-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Nome da empresa"
                                    className="w-full bg-white text-gray-800 px-4 py-2 rounded-[4px] text-xs focus:outline-none focus:ring-2 focus:ring-[#f97316] border-none"
                                />
                                <button className="w-full bg-[#00a600] text-white font-bold uppercase py-2 rounded-[4px] hover:bg-[#008f00] transition-colors text-xs tracking-wider">
                                    Subscribe
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Bar: Location & Socials */}
                    <div className="border-t border-gray-500 pt-4 pb-2 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-400 text-xs font-medium">
                            Maputo – Moçambique
                        </div>
                        <div className="flex items-center gap-4">
                            <SocialIcon Icon={Facebook} />
                            <SocialIcon Icon={Linkedin} />
                            <SocialIcon Icon={Instagram} />
                            <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-gray-400 hover:text-[#22c55e] hover:border-[#22c55e] transition-all cursor-pointer">
                                {/* Whatsapp Icon (using Send as placeholder or Lucide doesnt have brand icons sometimes? Lucide has Facebook/Instagram/Linkedin, missing Whatsapp usually. Using MessageCircle or generic) */}
                                {/* Lucide v0.292+ has MessageCircle for now or similar */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar - Ultra Dark */}
            <div className="bg-[#0f0f0f] py-3 border-t border-gray-800">
                <div className="container-site text-center">
                    <p className="text-[10px] text-gray-500">
                        Copyright © 2023 Base de dados agrícola | Powered by <a href="https://visualdesigne.com" target="_blank" rel="noopener noreferrer" className="text-[#08ED19] font-bold hover:underline">VisualDESIGN</a> Services, Lda.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ Icon }: { Icon: any }) {
    return (
        <a href="#" className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-gray-400 hover:text-[#22c55e] hover:border-[#22c55e] transition-all">
            <Icon className="w-4 h-4" />
        </a>
    );
}
