"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, MessageSquare, Send, User, Bot, MessageSquareText, MessagesSquare } from "lucide-react";

export function FloatingChatButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'bot' | 'user', content: string }[]>([
        { role: 'bot', content: 'Olá! Sou o assistente virtual desta plataforma agrícola. Como posso ajudar você hoje?' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const knowledgeBase: Record<string, string> = {
        "milho": "O milho é uma das culturas mais importantes em Moçambique, especialmente nas províncias de Tete, Manica e Niassa. Os preços variam entre 15 a 25 MT/kg dependendo da época e região.",
        "preço": "Pode consultar os preços actualizados de mais de 30 produtos na nossa secção 'Mercado'. Monitoramos cotações do SIMA em tempo real para todo o país.",
        "mercado": "O nosso Mercado Digital conecta produtores e compradores. Pode ver preços de referência e directório de fornecedores no menu 'Mercado'.",
        "mandioca": "Moçambique é um dos maiores produtores de mandioca em África, sendo a base alimentar em muitas zonas das províncias de Nampula e Zambézia.",
        "caju": "A produção de Castanha de Caju é vital para a exportação moçambicana, centrada principalmente em Nampula e Cabo Delgado.",
        "clima": "Para previsões agrometeorológicas e impacto nas culturas, recomendamos consultar os nossos boletins sazonais baseados em dados do INAM.",
        "terra": "O acesso à terra em Moçambique é regulado pela Lei de Terras. Todas as terras pertencem ao Estado, mas podem ser obtidos direitos de uso (DUAT) para agricultura.",
        "fertilizante": "No nosso Directório (Menu Mercado), pode encontrar fornecedores certificados de fertilizantes e outros insumos agrícolas em cada província.",
        "província": "Moçambique tem um elevado potencial agrário em todas as províncias, com destaque para o corredor da Beira (Manica/Sofala) e o Norte (Nampula/Zambézia).",
        "ine": "A BaseAgroData integra dados oficiais do Censo Agro-Pecuário do INE de 2020 para fornecer estatísticas precisas sobre a produção nacional."
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isChatWindowOpen) {
            scrollToBottom();
        }
    }, [messages, isChatWindowOpen]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = inputValue.trim().toLowerCase();
        setMessages(prev => [...prev, { role: 'user', content: inputValue.trim() }]);
        setInputValue("");

        // Find the best match
        let botResponse = "Não posso ajudar com esse pedido. Posso ajudar com outro assunto?";

        for (const keyword in knowledgeBase) {
            if (userMessage.includes(keyword)) {
                botResponse = knowledgeBase[keyword];
                break;
            }
        }

        // Simulate bot response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
        }, 1000);
    };

    return (
        <div className="fixed top-1/2 -translate-y-1/2 right-6 z-[9999] flex flex-col items-end gap-3">
            {/* Chatbot Window */}
            {isChatWindowOpen && (
                <div className="absolute bottom-16 right-0 w-[320px] md:w-[350px] h-[450px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-[#22c55e] hover:bg-[#f97316] p-3 flex items-center justify-between text-white transition-colors duration-300 cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-xs text-white">Base de dados agrícolas</h4>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                    <span className="text-[9px] opacity-80 uppercase font-bold tracking-wider text-white">Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsChatWindowOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed ${msg.role === 'user'
                                    ? 'bg-[#22c55e] text-white rounded-tr-none shadow-md shadow-green-900/10'
                                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Mensagem..."
                            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-[#22c55e]/20 transition-all outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-[#22c55e] text-white p-2 rounded-xl hover:bg-[#f97316] transition-colors shadow-lg shadow-green-500/10"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            )}

            {/* Options Menu */}
            <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom ${isOpen && !isChatWindowOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>

                {/* WhatsApp Option */}
                <a
                    href="https://wa.me/258825288328"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white pl-3 pr-1 py-1 rounded-full shadow-lg border border-slate-100 hover:scale-105 transition-transform group"
                >
                    <span className="text-[10px] font-bold text-slate-600 group-hover:text-[#22c55e]">WhatsApp</span>
                    <div className="w-6 h-6 bg-[#22c55e] rounded-full flex items-center justify-center text-white shadow-sm">
                        <svg viewBox="0 0 24 24" width="14" height="14" className="fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                    </div>
                </a>

                {/* Chatbot Option */}
                <button
                    onClick={() => {
                        setIsChatWindowOpen(true);
                        setIsOpen(false);
                    }}
                    className="flex items-center gap-2 bg-white pl-3 pr-1 py-1 rounded-full shadow-lg border border-slate-100 hover:scale-105 transition-transform group"
                >
                    <span className="text-[10px] font-bold text-slate-600 group-hover:text-[#f97316]">Chatbot IA</span>
                    <div className="w-6 h-6 bg-[#f97316] rounded-full flex items-center justify-center text-white shadow-sm">
                        <MessageSquareText className="w-3.5 h-3.5" />
                    </div>
                </button>
            </div>

            {/* Main Toggle Button */}
            <button
                onClick={() => {
                    if (isChatWindowOpen) {
                        setIsChatWindowOpen(false);
                    } else {
                        setIsOpen(!isOpen);
                    }
                }}
                className={`p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center text-white relative ${isOpen || isChatWindowOpen ? 'bg-[#22c55e] rotate-90' : 'bg-[#f97316] hover:scale-110'}`}
                aria-label="Abrir Opções de Chat"
            >
                {isOpen || isChatWindowOpen ? (
                    <X className="w-5 h-5" />
                ) : (
                    <MessagesSquare className="w-5 h-5 animate-pulse" />
                )}
            </button>
        </div>
    );
}
