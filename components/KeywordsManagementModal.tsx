"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X, Search, Plus, Star } from "lucide-react";

interface KeywordsManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function KeywordsManagementModal({ isOpen, onClose }: KeywordsManagementModalProps) {
    const [keywords, setKeywords] = useState(["Agricultura", "Logística", "Maputo", "Comércio"]);
    const [newKeyword, setNewKeyword] = useState("");

    const handleAdd = () => {
        if (newKeyword && !keywords.includes(newKeyword)) {
            setKeywords([...keywords, newKeyword]);
            setNewKeyword("");
        }
    };

    const handleRemove = (keyword: string) => {
        setKeywords(keywords.filter(k => k !== keyword));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] bg-white rounded-xl border-none shadow-2xl p-0 overflow-hidden">
                <div className="bg-slate-900 p-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />
                    <DialogHeader className="relative z-10 text-left">
                        <DialogTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-white">
                            <Search className="w-5 h-5 text-[#f97316]" />
                            Palavras-chave
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 text-xs font-medium mt-1">
                            Defina os termos que ajudam os parceiros a encontrar a sua empresa.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                placeholder="Ex: Milho, Tomate..."
                                className="h-10 rounded-lg border-slate-200 focus:ring-emerald-500 text-sm font-medium"
                                onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                            />
                            <Button
                                onClick={handleAdd}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-10 px-4 shadow-md active:scale-95"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 min-h-[80px] p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200">
                            {keywords.map((k, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-white border border-slate-200 px-3 py-1.5 rounded-full text-slate-700 font-bold text-[10px] flex items-center gap-1.5 group hover:border-[#f97316] transition-all"
                                >
                                    <Star className="w-2.5 h-2.5 text-[#f97316] fill-[#f97316]" />
                                    {k}
                                    <X
                                        className="w-2.5 h-2.5 cursor-pointer text-slate-400 group-hover:text-red-500 transition-colors"
                                        onClick={() => handleRemove(k)}
                                    />
                                </Badge>
                            ))}
                            {keywords.length === 0 && (
                                <div className="w-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                    <p className="text-[10px] italic">Nenhuma palavra-chave adicionada.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                        <p className="text-[10px] text-emerald-800 leading-relaxed font-medium">
                            <strong>Dica Profissional:</strong> Utilize termos específicos do seu sector para aumentar em até <span className="text-emerald-600 font-black">40%</span> a sua visibilidade no motor de busca interno.
                        </p>
                    </div>
                </div>

                <DialogFooter className="p-6 pt-0">
                    <Button
                        onClick={onClose}
                        className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black uppercase text-[9px] tracking-widest h-10 rounded-lg transition-all shadow-lg active:scale-95"
                    >
                        Guardar Alterações
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
