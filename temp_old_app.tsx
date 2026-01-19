
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Header from './components/Header';
import CompanyCard from './components/CompanyCard';
import { FEATURED_COMPANIES, CATEGORIES, SEARCH_DATA } from './constants';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [lang, setLang] = useState<'PT' | 'EN'>('PT');
  const items = FEATURED_COMPANIES;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  
  const mainScrollRef = useRef<HTMLDivElement>(null);

  const getVisibleItems = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  useEffect(() => {
    const handleResize = () => setVisibleItems(getVisibleItems());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const scrollContainer = mainScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (searchQuery) {
        setIsHeaderCompact(scrollContainer.scrollTop > 40);
      } else {
        setIsHeaderCompact(false);
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
    setIsHeaderCompact(false);
  }, [searchQuery]);

  const extendedItems = useMemo(() => [
    ...items.slice(-visibleItems),
    ...items,
    ...items.slice(0, visibleItems)
  ], [items, visibleItems]);

  const [currentIndex, setCurrentIndex] = useState(visibleItems);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, []);

  const handleTransitionEnd = () => {
    if (currentIndex >= items.length + visibleItems) {
      setIsTransitioning(false);
      setCurrentIndex(visibleItems);
    } 
    else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(items.length);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleAiChat = async () => {
    if (!chatMessage.trim()) return;
    setIsTyping(true);
    setChatResponse("");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: chatMessage,
        config: {
          systemInstruction: `Você é um assistente especialista da plataforma Base Agro Data. Idioma: ${lang}. Responda de forma curta e profissional.`
        }
      });
      setChatResponse(response.text || (lang === 'PT' ? "Não consegui processar." : "Could not process."));
    } catch (error) {
      setChatResponse(lang === 'PT' ? "Erro na IA." : "AI Error.");
    } finally {
      setIsTyping(false);
    }
  };

  const filteredResults = useMemo(() => {
    if (!searchQuery) return null;
    const query = searchQuery.toLowerCase();
    
    const result = {
      produtos: SEARCH_DATA.produtos.filter(p => p.title.toLowerCase().includes(query) || p.sub.toLowerCase().includes(query)),
      profissionais: SEARCH_DATA.profissionais.filter(p => p.title.toLowerCase().includes(query) || p.sub.toLowerCase().includes(query)),
      empresas: SEARCH_DATA.empresas.filter(e => e.title.toLowerCase().includes(query) || e.sub.toLowerCase().includes(query)),
      artigos: SEARCH_DATA.artigos.filter(a => a.title.toLowerCase().includes(query) || a.sub.toLowerCase().includes(query))
    };

    const totalCount = result.produtos.length + result.profissionais.length + result.empresas.length + result.artigos.length;
    return totalCount > 0 ? result : null;
  }, [searchQuery]);

  const t = {
    PT: {
      featured: 'Empresas em Destaque',
      searchResults: 'RESULTADO DE BUSCA',
      chatTitle: 'assistente agro',
      chatPlaceholder: 'Pergunte algo...',
      thinking: 'pensando...',
      footer: ['institucional', 'termos de uso', 'privacidade'],
      rights: '@ copyright 2024, todos os direitos reservados',
      categories: ['Empresas', 'Produtos', 'Profissionais', 'Artigos diversos'],
      noResults: 'Nenhum resultado encontrado para',
      sections: {
        empresas: 'Empresas e Organizações',
        produtos: 'Catálogo de Produtos',
        profissionais: 'Base de Profissionais',
        artigos: 'Repositório de Artigos'
      }
    },
    EN: {
      featured: 'Featured Companies',
      searchResults: 'SEARCH RESULT',
      chatTitle: 'agro assistant',
      chatPlaceholder: 'Ask something...',
      thinking: 'thinking...',
      footer: ['institutional', 'terms of use', 'privacy'],
      rights: '@ copyright 2024, all rights reserved',
      categories: ['Companies', 'Products', 'Professionals', 'Various articles'],
      noResults: 'No results found for',
      sections: {
        empresas: 'Companies & Organizations',
        produtos: 'Product Catalog',
        profissionais: 'Professionals Database',
        artigos: 'Articles Repository'
      }
    }
  }[lang];

  return (
    <div className="h-screen flex flex-col bg-white font-maven overflow-hidden">
      <div className="flex-shrink-0 z-50 bg-[#054a29] w-full">
        <Header 
          language={lang} 
          onLanguageChange={setLang} 
          onSearch={setSearchQuery} 
          isCompact={isHeaderCompact}
        />
      </div>

      <div className="z-40 bg-[#054a29] w-full">
        <div className="max-site-width w-full px-4 md:px-6 lg:px-0">
          <div className="h-2 bg-orange-500 w-full shadow-[0_4px_20px_rgba(249,115,22,0.5)]" />
        </div>
      </div>
      
      <main 
        ref={mainScrollRef} 
        className={`flex-grow w-full bg-[#fdfdfd] ${searchQuery ? 'overflow-y-auto' : 'overflow-hidden flex flex-col'}`}
      >
        <div className="max-site-width w-full px-4 md:px-6 lg:px-0 py-12 flex flex-col flex-grow">
          
          {searchQuery ? (
            <div className="animate-in fade-in zoom-in-95 duration-[1000ms] w-full">
              <div className="flex items-center gap-6 border-b-2 border-gray-100 pb-8 mb-16">
                 <h2 className="text-gray-900 font-black text-lg md:text-3xl tracking-tighter font-montserrat uppercase">
                    {t.searchResults}
                 </h2>
                 <span className="text-gray-200 text-4xl">/</span>
                 <span className="text-orange-500 font-black text-base md:text-xl uppercase tracking-widest">"{searchQuery}"</span>
              </div>

              {!filteredResults ? (
                <div className="flex flex-col items-center justify-center py-40 text-gray-400">
                   <i className="fa-solid fa-magnifying-glass text-8xl mb-8 opacity-5"></i>
                   <p className="italic text-2xl font-black tracking-tight">{t.noResults} "{searchQuery}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-20 pb-32">
                  {filteredResults.empresas.length > 0 && (
                    <section>
                      <h3 className="text-[12px] font-black text-emerald-900/40 uppercase mb-8 tracking-[0.4em] border-l-8 border-emerald-600 pl-6">{t.sections.empresas}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResults.empresas.map((emp, i) => (
                          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-emerald-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 cursor-pointer">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                              <i className={`fa-solid ${emp.icon} text-2xl`}></i>
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 text-lg group-hover:text-emerald-900 transition-colors">{emp.title}</h4>
                              <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest">{emp.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {filteredResults.produtos.length > 0 && (
                    <section>
                      <h3 className="text-[12px] font-black text-orange-900/40 uppercase mb-8 tracking-[0.4em] border-l-8 border-orange-500 pl-6">{t.sections.produtos}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResults.produtos.map((prod, i) => (
                          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-orange-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 cursor-pointer">
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-700 group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                              <i className={`fa-solid ${prod.icon} text-2xl`}></i>
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 text-lg group-hover:text-orange-900 transition-colors">{prod.title}</h4>
                              <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest">{prod.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {filteredResults.profissionais.length > 0 && (
                    <section>
                      <h3 className="text-[12px] font-black text-blue-900/40 uppercase mb-8 tracking-[0.4em] border-l-8 border-blue-500 pl-6">{t.sections.profissionais}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredResults.profissionais.map((prof, i) => (
                          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6 group hover:border-blue-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 cursor-pointer">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                              <i className={`fa-solid ${prof.icon} text-2xl`}></i>
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 text-lg group-hover:text-blue-900 transition-colors">{prof.title}</h4>
                              <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest">{prof.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {filteredResults.artigos.length > 0 && (
                    <section>
                      <h3 className="text-[12px] font-black text-purple-900/40 uppercase mb-8 tracking-[0.4em] border-l-8 border-purple-500 pl-6">{t.sections.artigos}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {filteredResults.artigos.map((art, i) => (
                          <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex items-start gap-8 group hover:border-purple-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 cursor-pointer">
                            <div className="w-20 h-20 rounded-3xl bg-purple-50 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 flex-shrink-0">
                              <i className={`fa-solid ${art.icon} text-3xl`}></i>
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900 text-xl leading-tight mb-3 group-hover:text-purple-900 transition-colors">{art.title}</h4>
                              <p className="text-[12px] text-gray-400 font-black uppercase tracking-widest">{art.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-grow flex flex-col justify-center animate-in fade-in duration-[1200ms] pb-12 w-full">
              <div className="mb-24 w-full">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-gray-400 font-black text-[11px] md:text-[13px] tracking-[0.7em] uppercase">{t.featured}</h2>
                  <div className="flex space-x-4">
                    {[prevSlide, nextSlide].map((fn, i) => (
                      <button 
                        key={i} onClick={fn}
                        className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-50 transition-all duration-500 bg-white shadow-xl active:scale-90"
                      >
                        <i className={`fa-solid fa-chevron-${i === 0 ? 'left' : 'right'} text-base`}></i>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden w-full">
                  <div 
                    className={`flex ${isTransitioning ? 'transition-transform duration-[1000ms] cubic-bezier(0.19, 1, 0.22, 1)' : ''}`}
                    style={{ 
                      transform: `translateX(-${currentIndex * (100 / extendedItems.length)}%)`,
                      width: `${(extendedItems.length / visibleItems) * 100}%`
                    }}
                    onTransitionEnd={handleTransitionEnd}
                  >
                    {extendedItems.map((company, idx) => (
                      <div key={`${company.id}-${idx}`} className="px-5" style={{ width: `${100 / extendedItems.length}%`, flexShrink: 0 }}>
                        <CompanyCard company={company} language={lang} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-8 md:gap-12 w-full">
                {CATEGORIES.map((cat, i) => (
                  <button key={cat.id} className="flex-grow flex items-center justify-center px-12 py-8 bg-white border border-gray-100 rounded-[2.5rem] shadow-lg hover:border-orange-500 hover:text-orange-600 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-700 text-gray-700 font-black text-[14px] tracking-[0.3em] group uppercase">
                    <i className={`${cat.icon} mr-6 text-2xl text-emerald-800/30 group-hover:text-orange-500 group-hover:scale-150 transition-all duration-700`}></i>
                    {t.categories[i]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-12 right-6 md:right-12 z-[100]">
        {isChatOpen && (
          <div className="absolute bottom-28 right-0 w-96 md:w-[450px] bg-white rounded-[4rem] shadow-2xl border border-emerald-50 overflow-hidden flex flex-col animate-in slide-in-from-bottom-20 duration-1000 cubic-bezier(0.175, 0.885, 0.32, 1.275)">
            <div className="bg-[#054a29] p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse shadow-[0_0_20px_rgba(249,115,22,1)]"></div>
                <span className="text-[14px] font-black uppercase tracking-[0.4em]">{t.chatTitle}</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:rotate-180 transition-all duration-1000 text-white/50 hover:text-white"><i className="fa-solid fa-xmark text-2xl"></i></button>
            </div>
            <div className="p-10 h-[500px] overflow-y-auto text-[16px] text-gray-700 bg-gray-50/50 scrollbar-hide">
              {chatResponse ? (
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 leading-relaxed animate-in fade-in zoom-in-95 duration-700 font-bold">{chatResponse}</div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-10">
                   <i className="fa-solid fa-robot text-8xl mb-8"></i>
                   <p className="text-[16px] uppercase font-black tracking-[0.6em]">BASE AGRO AI</p>
                </div>
              )}
              {isTyping && <div className="mt-8 text-orange-500 font-black animate-pulse text-[12px] uppercase tracking-[0.4em] flex items-center gap-4"><span className="w-3 h-3 rounded-full bg-orange-500"></span> {t.thinking}</div>}
            </div>
            <div className="p-6 bg-white border-t border-gray-100 flex gap-5">
              <input 
                value={chatMessage} 
                onChange={(e) => setChatMessage(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleAiChat()} 
                placeholder={t.chatPlaceholder} 
                className="flex-grow text-[15px] px-8 py-5 bg-gray-100 rounded-full outline-none focus:ring-8 focus:ring-emerald-500/10 transition-all border-none font-bold" 
              />
              <button onClick={handleAiChat} className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-500 shadow-2xl hover:bg-orange-600 hover:rotate-12">
                <i className="fa-solid fa-paper-plane text-[18px]"></i>
              </button>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)} 
          className="w-24 h-24 bg-[#054a29] text-white rounded-full shadow-2xl flex items-center justify-center text-5xl hover:bg-orange-500 hover:scale-110 active:scale-90 transition-all duration-700 border-4 border-white group"
        >
          <i className="fa-solid fa-comment-dots group-hover:rotate-12 transition-all"></i>
        </button>
      </div>

      <footer className="flex-shrink-0 bg-white border-t border-gray-100 py-8 px-4 md:px-6 lg:px-0 z-50">
        <div className="max-site-width flex flex-row justify-between items-center w-full">
          <nav className="flex flex-row gap-x-16 text-[12px] font-black text-gray-300 uppercase tracking-[0.3em]">
            {t.footer.map((link, i) => (
              <a key={i} href="#" className="hover:text-orange-500 transition-all duration-500 hover:tracking-[0.5em]">{link}</a>
            ))}
          </nav>
          <div className="text-[11px] text-gray-200 font-black uppercase tracking-widest text-right">{t.rights}</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
