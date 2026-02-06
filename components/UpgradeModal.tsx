"use client";

import { Lock, Crown, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getPlanDisplayName, type PlanType } from "@/lib/plan-fields";

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    fieldLabel: string;
    requiredPlan: PlanType;
}

export function UpgradeModal({ isOpen, onClose, fieldLabel, requiredPlan }: UpgradeModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    const planName = getPlanDisplayName(requiredPlan);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-slate-400" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">
                        Campo Bloqueado
                    </h3>
                    <p className="text-orange-100 text-sm">
                        O campo "{fieldLabel}" requer um plano superior
                    </p>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <Crown className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Plano Necessário
                                </p>
                                <p className="text-lg font-black text-slate-900">
                                    {planName}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-slate-600 text-center mb-6">
                        Faça upgrade do seu plano para desbloquear este campo e ter acesso a mais funcionalidades.
                    </p>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 h-11 font-bold border-slate-200"
                        >
                            Agora não
                        </Button>
                        <Button
                            onClick={() => router.push('/planos')}
                            className="flex-1 h-11 font-bold bg-orange-500 hover:bg-orange-600 text-white gap-2"
                        >
                            Ver Planos
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LockedFieldOverlayProps {
    requiredPlan: PlanType;
    onClick: () => void;
    children: React.ReactNode;
}

export function LockedFieldOverlay({ requiredPlan, onClick, children }: LockedFieldOverlayProps) {
    const planName = getPlanDisplayName(requiredPlan);

    return (
        <div className="relative group">
            {/* The actual field (disabled/blurred) */}
            <div className="opacity-50 pointer-events-none select-none">
                {children}
            </div>

            {/* Overlay */}
            <div
                onClick={onClick}
                className="absolute inset-0 flex items-center justify-end px-4 cursor-pointer bg-slate-50/80 rounded-lg border-2 border-dashed border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all"
            >
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        {planName}
                    </span>
                </div>
            </div>
        </div>
    );
}

interface PlanFieldWrapperProps {
    fieldName: string;
    fieldLabel: string;
    canEdit: boolean;
    requiredPlan: PlanType | null;
    onLockedClick: (fieldName: string, label: string) => void;
    children: React.ReactNode;
}

/**
 * Wrapper component that automatically handles field locking based on user plan
 */
export function PlanFieldWrapper({
    fieldName,
    fieldLabel,
    canEdit,
    requiredPlan,
    onLockedClick,
    children
}: PlanFieldWrapperProps) {
    if (canEdit || !requiredPlan) {
        return <>{children}</>;
    }

    return (
        <LockedFieldOverlay
            requiredPlan={requiredPlan}
            onClick={() => onLockedClick(fieldName, fieldLabel)}
        >
            {children}
        </LockedFieldOverlay>
    );
}
