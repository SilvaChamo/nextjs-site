"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, MessageSquare, Send, User, Bot, MessageSquareText } from "lucide-react";

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
        let botResponse = "Não tenho esta informação na minha base de conhecimento, ligue para suporte. Aguardando pela questão a seguir.";

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
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
            {/* Chatbot Window */}
            {isChatWindowOpen && (
                <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-[#22c55e] hover:bg-[#f97316] p-4 flex items-center justify-between text-white transition-colors duration-300 cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-white">Base de dados agrícolas</h4>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                    <span className="text-[10px] opacity-80 uppercase font-bold tracking-wider text-white">Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsChatWindowOpen(false)}
                            className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                    ? 'bg-[#22c55e] text-white rounded-tr-none'
                                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Escreva sua mensagem..."
                            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#22c55e]/20 transition-all outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-[#22c55e] text-white p-2 rounded-xl hover:bg-[#f97316] transition-colors shadow-lg shadow-green-500/20"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}

            {/* Options Menu */}
            <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen && !isChatWindowOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>

                {/* WhatsApp Option */}
                <a
                    href="https://wa.me/258825288328"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white pl-4 pr-1 py-1 rounded-full shadow-lg border border-slate-100 hover:scale-105 transition-transform group"
                >
                    <span className="text-sm font-bold text-slate-600 group-hover:text-[#22c55e]">WhatsApp</span>
                    <div className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center text-white shadow-sm">
                        <MessageCircle className="w-5 h-5" />
                    </div>
                </a>

                {/* Chatbot Option */}
                <button
                    onClick={() => {
                        setIsChatWindowOpen(true);
                        setIsOpen(false);
                    }}
                    className="flex items-center gap-3 bg-white pl-4 pr-1 py-1 rounded-full shadow-lg border border-slate-100 hover:scale-105 transition-transform group"
                >
                    <span className="text-sm font-bold text-slate-600 group-hover:text-[#f97316]">Chatbot IA</span>
                    <div className="w-10 h-10 bg-[#f97316] rounded-full flex items-center justify-center text-white shadow-sm">
                        <MessageSquareText className="w-5 h-5" />
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
                className={`p-4 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center text-white relative ${isOpen || isChatWindowOpen ? 'bg-slate-700 rotate-90' : 'bg-[#f97316] hover:scale-110'}`}
                aria-label="Abrir Opções de Chat"
            >
                {isOpen || isChatWindowOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageSquare className="w-6 h-6 animate-pulse" />
                )}
            </button>
        </div>
    );
}
