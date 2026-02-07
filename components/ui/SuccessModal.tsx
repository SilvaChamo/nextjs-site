"use client";

import { CheckCircle2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description: string;
    buttonText?: string;
}

export function SuccessModal({
    isOpen,
    onClose,
    title = "Sucesso!",
    description,
    buttonText = "Ok, entendi"
}: SuccessModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] rounded-[20px] border-none shadow-2xl p-0 overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 flex flex-col items-center justify-center text-white relative">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-900/20 rounded-full -ml-10 -mb-10 blur-xl"></div>

                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30 animate-in zoom-in duration-300">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <DialogTitle className="text-2xl font-black tracking-tight mb-2 uppercase">
                        {title}
                    </DialogTitle>
                </div>

                <div className="p-6 pt-8 bg-white text-center">
                    <DialogDescription className="text-slate-600 font-medium text-base mb-8 leading-relaxed">
                        {description}
                    </DialogDescription>

                    <Button
                        onClick={onClose}
                        className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider text-xs"
                    >
                        {buttonText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
