import Link from "next/link";

export function Footer() {
    const links = ["Institucional", "Termos de uso", "Privacidade"];

    return (
        <footer className="w-full bg-white border-t border-gray-100 py-8 px-6 md:px-12 z-50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center w-full gap-4">
                <nav className="flex flex-row gap-8 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    {links.map((link, i) => (
                        <Link
                            key={i}
                            href="#"
                            className="hover:text-[#f97316] transition-all duration-300 hover:tracking-[0.4em]"
                        >
                            {link}
                        </Link>
                    ))}
                </nav>
                <div className="text-[10px] text-gray-300 font-black uppercase tracking-widest text-right">
                    © Copyright 2024, Todos os direitos reservados
                </div>
            </div>
        </footer>
    );
}
