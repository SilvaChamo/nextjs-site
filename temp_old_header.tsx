
import React, { useState } from 'react';

interface HeaderProps {
  language: 'PT' | 'EN';
  onLanguageChange: (lang: 'PT' | 'EN') => void;
  onSearch?: (query: string) => void;
  isCompact?: boolean;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onSearch, isCompact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const toggleLanguage = () => {
    onLanguageChange(language === 'PT' ? 'EN' : 'PT');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalSearch(val);
    if (onSearch) onSearch(val);
  };

  const t = {
    PT: {
      welcome: 'Bem-vindo à Base de Dados Agrícolas',
      hero: 'O seu repositório agrário',
      partner: 'seja nosso parceiro',
      register: 'cadastre sua empresa',
      search: 'O que você procura hoje?',
      menu: 'Menu',
      login: 'Entrar',
      back: 'Voltar',
      registerTitle: 'Registo',
      about: 'Sobre nós',
      services: 'Serviços',
      repo: 'Repositório',
      partnership: 'Parceria',
      prereg: 'Pré-registo',
      name: 'Nome',
      email: 'E-mail',
      message: 'Mensagem',
      send: 'Enviar',
      follow: 'Siga nós',
      signup: 'Registe-se aqui',
      pass: 'Senha',
      createAcc: 'Criar conta'
    },
    EN: {
      welcome: 'Welcome to the Agricultural Database',
      hero: 'Your agricultural repository',
      partner: 'be our partner',
      register: 'register your company',
      search: 'What are you looking for today?',
      menu: 'Menu',
      login: 'Login',
      back: 'Back',
      registerTitle: 'Sign Up',
      about: 'About us',
      services: 'Services',
      repo: 'Repository',
      partnership: 'Parceria',
      prereg: 'Pre-registration',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      follow: 'Follow us',
      signup: 'Sign up here',
      pass: 'Password',
      createAcc: 'Create account'
    }
  }[language];

  const menuItems = [
    { label: t.about, link: '#', active: true },
    { label: t.services, link: '#', active: false },
    { label: t.repo, link: '#', active: false },
    { label: t.partnership, link: '#', active: false },
    { label: t.prereg, link: '#', active: false },
  ];

  return (
    <>
      <header className={`bg-[#054a29] text-white transition-all duration-[1200ms] cubic-bezier(0.23, 1, 0.32, 1) px-0 relative overflow-hidden flex-shrink-0 z-50 ${isCompact ? 'h-[75px] py-1 flex items-center shadow-lg' : 'pt-2 pb-2 md:pt-4 md:pb-8'}`}>
        <div className="max-site-width w-full px-4 md:px-6 lg:px-0">
          <div className={`flex items-center justify-between transition-all duration-[1200ms] ${isCompact ? 'gap-2 md:gap-10' : 'mb-2 md:mb-6'}`}>
            <div className="flex items-center flex-shrink-0">
               <a href="/" className="block group">
                 <img 
                   src="https://baseagrodata.com/wp-content/uploads/2026/01/Logo2-01.png" 
                   alt="Base Agro Data Logo" 
                   className={`${isCompact ? 'h-7 md:h-10' : 'h-10 md:h-20'} w-auto object-contain bg-white p-1 shadow-md transition-all duration-[1200ms] rounded-md group-hover:scale-105`}
                 />
               </a>
            </div>

            <div className={`flex-grow transition-all duration-[1200ms] flex items-center justify-center gap-4 md:gap-8 ${isCompact ? 'opacity-100 scale-100' : 'hidden scale-95 opacity-0 pointer-events-none'}`}>
               <button className="hidden lg:block px-6 py-2 text-[10px] border border-white/20 rounded-full bg-white/5 hover:bg-orange-500 transition-all uppercase font-maven font-bold tracking-wider whitespace-nowrap">
                {t.partner}
              </button>

              <div className="relative w-full max-w-lg"> {/* Reduzido de max-w-2xl para max-w-lg */}
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={handleSearchChange}
                  placeholder={t.search}
                  className="w-full px-5 py-2 md:py-2.5 rounded-full bg-white/10 border border-white/20 placeholder-white/40 text-white focus:bg-white focus:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-orange-400 text-[10px] md:text-xs shadow-inner font-maven transition-all duration-300"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60">
                  <i className="fa-solid fa-magnifying-glass text-[10px] md:text-xs"></i>
                </div>
              </div>

              <button className="hidden lg:block px-6 py-2 text-[10px] border border-white/20 rounded-full bg-white/5 hover:bg-orange-500 transition-all uppercase font-maven font-bold tracking-wider whitespace-nowrap">
                {t.register}
              </button>
            </div>
            
            <div className={`flex items-center flex-shrink-0 ${isCompact ? 'space-x-3 md:space-x-6' : 'space-x-8'}`}>
              <button 
                onClick={toggleLanguage}
                className={`${isCompact ? 'w-7 h-7 md:w-9 md:h-9' : 'w-10 h-10 md:w-14 md:h-14'} flex items-center justify-center border-2 border-white/30 rounded-full bg-white/10 font-bold text-[9px] md:text-[13px] hover:text-orange-500 hover:border-orange-500 transition-all uppercase font-maven`}
              >
                {language === 'PT' ? 'EN' : 'PT'}
              </button>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className={`text-white hover:text-orange-500 transition-colors ${isCompact ? 'text-xl md:text-3xl' : 'text-3xl md:text-5xl'}`}
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            </div>
          </div>

          <div className={`max-w-6xl mx-auto text-center relative transition-all duration-[1200ms] ${isCompact ? 'h-0 opacity-0 overflow-hidden pointer-events-none translate-y-[-50px]' : 'block opacity-100 translate-y-0 pb-6'}`}>
            <p className="text-[11px] md:text-base opacity-80 font-bold font-maven tracking-widest uppercase mb-2">{t.welcome}</p>
            <h1 className="text-2xl md:text-6xl font-montserrat font-extrabold tracking-tight mt-2 mb-8 leading-none">{t.hero}</h1>
            
            <div className="flex flex-row items-center justify-center gap-4 md:gap-8 mt-4 w-full">
              <button className="px-6 md:px-10 py-3 md:py-4 text-[10px] md:text-[14px] border border-white/30 rounded-full bg-white/10 hover:border-orange-500 hover:text-orange-500 transition-all whitespace-nowrap font-black uppercase flex-shrink-0 font-maven tracking-widest">
                {t.partner}
              </button>
              
              <div className="relative w-full max-w-2xl"> {/* Reduzido de max-w-4xl para max-w-2xl */}
                <input 
                  type="text" 
                  value={localSearch}
                  onChange={handleSearchChange}
                  placeholder={t.search}
                  className="w-full px-7 md:px-10 py-3.5 md:py-4.5 rounded-full bg-[#a3c4b5]/90 placeholder-emerald-900/60 text-emerald-950 focus:bg-white focus:outline-none focus:ring-8 focus:ring-orange-400/20 text-[11px] md:text-lg shadow-2xl font-maven font-bold transition-all duration-300"
                />
                <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 p-1.5">
                   <i className="fa-solid fa-magnifying-glass text-emerald-900/80 text-base md:text-xl"></i>
                </div>
              </div>
              
              <button className="px-6 md:px-10 py-3 md:py-4 text-[10px] md:text-[14px] border border-white/30 rounded-full bg-white/10 hover:border-orange-500 hover:text-orange-500 transition-all whitespace-nowrap font-black uppercase flex-shrink-0 font-maven tracking-widest">
                {t.register}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[200] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-[360px] bg-[#054a29] shadow-2xl transition-transform duration-[1000ms] cubic-bezier(0.19, 1, 0.22, 1) flex flex-col overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 flex justify-between items-center bg-[#043a20] border-b border-orange-500 relative z-10">
            <div className="flex items-center gap-5">
              <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-orange-500 transition-all hover:rotate-90">
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
              <h2 className="text-3xl font-montserrat font-extrabold text-white tracking-tighter">{t.menu}</h2>
            </div>
            <button 
              onClick={() => setShowForms(!showForms)}
              className="border-2 border-white/40 rounded-full bg-white/10 px-6 py-2.5 text-white text-[12px] font-black hover:border-orange-500 hover:text-orange-500 transition-all uppercase flex items-center gap-2"
            >
              {showForms ? <><i className="fa-solid fa-arrow-left"></i>{t.back}</> : t.login}
            </button>
          </div>

          <div className="flex-grow bg-[#054a29]">
            {showForms ? (
              <div className="p-8 space-y-12 animate-in fade-in slide-in-from-top-6 duration-700">
                <div className="space-y-5">
                  <h3 className="text-white font-black text-base uppercase border-l-4 border-orange-500 pl-4 tracking-widest">{t.login}</h3>
                  <input type="email" placeholder={t.email} className="w-full bg-white rounded-full px-6 py-4 text-[14px] text-gray-800 outline-none focus:ring-4 focus:ring-orange-400/30" />
                  <input type="password" placeholder={t.pass} className="w-full bg-white rounded-full px-6 py-4 text-[14px] text-gray-800 outline-none focus:ring-4 focus:ring-orange-400/30" />
                  <button className="w-full bg-orange-500 rounded-full py-4 text-white font-black text-base uppercase shadow-2xl hover:bg-orange-600 transition-all">{t.login}</button>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div className="space-y-5">
                  <h3 className="text-white font-black text-base uppercase border-l-4 border-emerald-400 pl-4 tracking-widest">{t.registerTitle}</h3>
                  <input type="text" placeholder={t.name} className="w-full bg-white rounded-full px-6 py-4 text-[14px] text-gray-800 outline-none focus:ring-4 focus:ring-emerald-400/30" />
                  <input type="email" placeholder={t.email} className="w-full bg-white rounded-full px-6 py-4 text-[14px] text-gray-800 outline-none focus:ring-4 focus:ring-emerald-400/30" />
                  <input type="password" placeholder={t.pass} className="w-full bg-white rounded-full px-6 py-4 text-[14px] text-gray-800 outline-none focus:ring-4 focus:ring-emerald-400/30" />
                  <button className="w-full border-2 border-emerald-400 rounded-full py-4 text-emerald-400 font-black text-base uppercase hover:bg-emerald-400 hover:text-white transition-all">{t.createAcc}</button>
                </div>
              </div>
            ) : (
              <>
                <nav className="p-8 space-y-7">
                  {menuItems.map((item, i) => (
                    <a key={i} href={item.link} className={`flex items-center group text-sm font-montserrat font-black transform transition-all duration-500 hover:translate-x-5 uppercase tracking-[0.2em] ${item.active ? 'text-orange-500' : 'text-white hover:text-orange-500'}`}>
                      <span className={`w-3 h-3 rounded-full mr-5 transition-all ${item.active ? 'bg-orange-500 scale-125 shadow-[0_0_10px_rgba(249,115,22,0.8)]' : 'bg-white/30 group-hover:bg-orange-500 group-hover:scale-125'}`}></span>
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="px-8 py-6">
                  <div className="h-px bg-white/10 w-full mb-8" />
                  <div className="flex flex-col gap-4">
                    <input type="text" placeholder={t.name} className="w-full bg-white rounded-full px-6 py-4 text-[13px] text-gray-800 outline-none" />
                    <input type="email" placeholder={t.email} className="w-full bg-white rounded-full px-6 py-4 text-[13px] text-gray-800 outline-none" />
                    <textarea placeholder={t.message} className="w-full bg-white rounded-3xl px-6 py-5 text-[13px] text-gray-800 h-32 outline-none resize-none" />
                  </div>
                  <button className="w-full mt-6 border-2 border-white/40 rounded-full bg-white/10 py-4 text-white font-black hover:border-orange-500 hover:text-orange-500 transition-all text-[14px] uppercase tracking-[0.3em]">{t.send}</button>
                </div>
              </>
            )}
          </div>

          <div className="p-8 bg-[#043a20] mt-auto shrink-0 border-t border-white/10">
            <div className="text-[12px] text-white/80 space-y-3 font-maven leading-relaxed mb-8">
              <p className="font-bold flex items-start gap-4"><i className="fa-solid fa-location-dot text-orange-500 text-base mt-1"></i>Av. Karl Marx nº 177, Maputo — Moçambique</p>
              <p className="font-bold flex items-center gap-4"><i className="fa-solid fa-phone text-orange-500 text-base"></i>+258 877575288 | +258 83 52 88 328</p>
              <p className="font-bold flex items-center gap-4"><i className="fa-solid fa-envelope text-orange-500 text-base"></i>info@baseagrodata.com</p>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-white text-[#043a20] px-6 py-2.5 rounded-full text-[11px] font-black uppercase shadow-xl cursor-default tracking-widest">{t.follow}</button>
              <div className="flex gap-3">
                {[{ icon: 'fa-facebook-f', link: '#' }, { icon: 'fa-linkedin-in', link: '#' }, { icon: 'fa-youtube', link: '#' }, { icon: 'fa-whatsapp', link: 'https://wa.me/258825288328' }].map((s, i) => (
                  <a key={i} href={s.link} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 border border-[#bfff00]/40 flex items-center justify-center text-white/90 hover:text-orange-500 hover:bg-white/20 transition-all hover:scale-125">
                    <i className={`fa-brands ${s.icon} text-[14px]`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;