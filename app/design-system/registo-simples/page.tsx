"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ShoppingBag, Plus, Trash2, CheckCircle2, X, Pencil, Lock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { COMPANY_CATEGORIES, PROVINCES } from "@/lib/constants";
import { RichTextEditor } from "@/components/RichTextEditor";

const PlanBadge = ({ plan }: { plan: 'Basic' | 'Profissional' | 'Premium' | 'Parceiro' }) => {
    const styles = {
        Basic: "bg-slate-100 text-slate-600 border-slate-200",
        Profissional: "bg-orange-50 text-orange-600 border-orange-200",
        Premium: "bg-blue-50 text-blue-600 border-blue-200",
        Parceiro: "bg-emerald-50 text-emerald-600 border-emerald-200"
    };

    return (
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 px-2 py-1 rounded-md border ${styles[plan]}`}>
            <span className="text-[10px] font-black uppercase tracking-widest">{plan}</span>
            <Lock className="w-3 h-3" />
        </div>
    );
};

export default function SimpleRegistrationPage() {


    // New states for interactive features
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [logoImage, setLogoImage] = useState<string | null>(null);
    const [services, setServices] = useState<string[]>([]);
    const [newService, setNewService] = useState("");

    // Data States
    const [fetchedCategories, setFetchedCategories] = useState<string[]>(COMPANY_CATEGORIES);
    const [bio, setBio] = useState("");

    // Fetch Categories (Removed in favor of static constant)
    useEffect(() => {
        setFetchedCategories(COMPANY_CATEGORIES);
    }, []);

    // Compression Dialog State
    const [showCompressionDialog, setShowCompressionDialog] = useState(false);
    const [pendingFile, setPendingFile] = useState<File | null>(null);
    const [uploadType, setUploadType] = useState<'banner' | 'logo' | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);

    const bannerInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);



    // Helper to validate file size (1MB = 1048576 bytes)
    const isValidFileSize = (file: File) => {
        return file.size <= 1048576;
    };



    // IMAGE COMPRESSION UTILITY
    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Simple scaling logic: max 1200px width/height
                    let width = img.width;
                    let height = img.height;
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx?.drawImage(img, 0, 0, width, height);

                    // Compress to 0.7 quality JPEG
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(dataUrl);
                };
                img.onerror = (err) => reject(err);
            };
        });
    };

    const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!isValidFileSize(file)) {
                setPendingFile(file);
                setUploadType('banner');
                setShowCompressionDialog(true);
                // Reset input
                e.target.value = '';
                return;
            }
            const url = URL.createObjectURL(file);
            setBannerImage(url);
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!isValidFileSize(file)) {
                setPendingFile(file);
                setUploadType('logo');
                setShowCompressionDialog(true);
                // Reset input
                e.target.value = '';
                return;
            }
            const url = URL.createObjectURL(file);
            setLogoImage(url);
        }
    };

    const confirmCompression = async () => {
        if (!pendingFile || !uploadType) return;

        setIsCompressing(true);
        try {
            // Artificial delay to show "Aguarde" if compression is too fast, 
            // or just rely on actual compression time. 
            // User asked: "informar o tempo que o usuario deve esperar". 
            // Since we don't know exact time, "Aguarde..." is standard. 
            // Let's add a small minimum delay for UX so it doesn't flash.
            await new Promise(resolve => setTimeout(resolve, 1500));

            const compressedUrl = await compressImage(pendingFile);

            if (uploadType === 'banner') {
                setBannerImage(compressedUrl);
            } else {
                setLogoImage(compressedUrl);
            }

            setShowCompressionDialog(false);
            setPendingFile(null);
            setUploadType(null);
        } catch (error) {
            alert("Erro ao comprimir imagem.");
        } finally {
            setIsCompressing(false);
        }
    };

    const addService = () => {
        if (newService.trim() && !services.includes(newService.trim())) {
            setServices([...services, newService.trim()]);
            setNewService("");
        }
    };

    const removeService = (serviceToRemove: string) => {
        setServices(services.filter(s => s !== serviceToRemove));
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans pt-[80px] pb-20">
            <div className="container-site flex flex-col lg:flex-row gap-[20px]">
                {/* MAIN CONTENT (LEFT) */}
                <main className="flex-1 w-full space-y-8">
                    {/* 1. BANNER - Now moved inside and aligned with form */}
                    <div
                        onClick={() => bannerInputRef.current?.click()}
                        className="w-full h-48 md:h-64 bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:bg-slate-50 transition-all cursor-pointer overflow-hidden relative shadow-sm"
                        style={{ borderRadius: '15px' }}
                    >
                        {bannerImage ? (
                            <>
                                <img src={bannerImage} alt="Banner Preview" className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            bannerInputRef.current?.click();
                                        }}
                                        className="p-2 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-blue-600 rounded-full shadow-lg border border-slate-100 transition-colors"
                                        title="Trocar Imagem"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setBannerImage(null);
                                        }}
                                        className="p-2 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-600 rounded-full shadow-lg border border-slate-100 transition-colors"
                                        title="Remover Imagem"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Upload className="w-10 h-10 text-slate-400 mb-2" />
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Banner da Empresa</span>
                                <p className="text-[10px] text-slate-400 mt-1 uppercase font-black">Recomendado: 1200x400px (Max: 1MB)</p>
                            </>
                        )}
                        <input
                            type="file"
                            ref={bannerInputRef}
                            onChange={handleBannerUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    {/* FORM SECTION */}
                    <div className="space-y-[10px]">
                        {/* LOGO + TOP FIELDS */}
                        <div className="flex flex-col md:flex-row gap-[10px] items-stretch">
                            <div
                                onClick={() => logoInputRef.current?.click()}
                                className="w-56 shrink-0 bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-all overflow-hidden relative"
                                style={{ borderRadius: '15px' }}
                            >
                                {logoImage ? (
                                    <>
                                        <img src={logoImage} alt="Logo Preview" className="w-full h-full object-cover" />
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    logoInputRef.current?.click();
                                                }}
                                                className="p-1.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-blue-600 rounded-full shadow-sm border border-slate-100 transition-colors"
                                                title="Trocar Logo"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLogoImage(null);
                                                }}
                                                className="p-1.5 bg-white/90 backdrop-blur-sm text-slate-700 hover:text-rose-600 rounded-full shadow-sm border border-slate-100 transition-colors"
                                                title="Remover Logo"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-slate-400 mb-1" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase">Logo (1:1)</span>
                                        <span className="text-[8px] font-bold text-slate-400 uppercase mt-1">Max: 1MB</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    ref={logoInputRef}
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>

                            <div className="flex-1 w-full space-y-[10px]">
                                <Input
                                    placeholder="Nome da empresa *"
                                    className="h-12 border-slate-200 px-4 text-sm font-semibold text-slate-600 placeholder:text-slate-400 bg-white"
                                    style={{ borderRadius: '8px' }}
                                    required
                                />


                                <div className="grid grid-cols-2 gap-[10px]">
                                    <div className="relative">
                                        <Input
                                            placeholder="Contacto Corporativo"
                                            className="h-12 border-slate-200 px-4 text-sm font-semibold text-slate-400 placeholder:text-slate-400 bg-slate-50 cursor-not-allowed pr-32"
                                            style={{ borderRadius: '8px' }}
                                            disabled
                                        />
                                        <PlanBadge plan="Profissional" />
                                    </div>
                                    <div className="relative">
                                        <Input
                                            placeholder="Whatsapp"
                                            className="h-12 border-slate-200 px-4 text-sm font-semibold text-slate-400 placeholder:text-slate-400 bg-slate-50 cursor-not-allowed pr-32"
                                            style={{ borderRadius: '8px' }}
                                            disabled
                                        />
                                        <PlanBadge plan="Premium" />
                                    </div>
                                </div>
                                <div className="relative">
                                    <Input
                                        placeholder="E-mail corporativo"
                                        className="h-12 border-slate-200 px-4 text-sm font-semibold text-slate-400 placeholder:text-slate-400 bg-slate-50 cursor-not-allowed pr-32"
                                        style={{ borderRadius: '8px' }}
                                        disabled
                                    />
                                    <PlanBadge plan="Basic" />
                                </div>
                            </div>
                        </div>

                        {/* FULL WIDTH FIELDS */}
                        <div className="space-y-[10px]">
                            {/* Address & Province */}
                            <div className="grid grid-cols-1 md:grid-cols-[65fr_35fr] gap-[10px]">
                                <Input
                                    placeholder="Endereço físico"
                                    className="h-12 border-slate-200 px-4 text-sm font-semibold text-slate-600 placeholder:text-slate-400 bg-white"
                                    style={{ borderRadius: '8px' }}
                                />
                                <Input
                                    placeholder="Província"
                                    className="h-12 border-slate-200 px-4 text-sm font-semibold text-slate-600 placeholder:text-slate-400 bg-white"
                                    style={{ borderRadius: '8px' }}
                                />
                            </div>

                            {/* Actividade Principal - Moved Here */}
                            <Input
                                placeholder="Actividade Principal"
                                className="h-12 border-slate-200 px-4 text-sm font-semibold text-slate-600 placeholder:text-slate-400 bg-white"
                                style={{ borderRadius: '8px' }}
                            />

                            {/* Bio Editor - Moved Above Selects */}
                            <RichTextEditor
                                value={bio}
                                onChange={setBio}
                                placeholder="Descrição geral da empresa"
                                className="min-h-[150px]"
                            />

                            {/* Selectors (Moved Below Bio) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-[10px]">
                                {/* 1. Sector de Actuação (Former Categories) */}
                                <div className="relative">
                                    <Select disabled>
                                        <SelectTrigger className="w-full h-12 border-slate-200 bg-slate-50 text-slate-400 font-semibold px-4 cursor-not-allowed" style={{ borderRadius: '8px' }}>
                                            <SelectValue placeholder="Sector de actuação" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fetchedCategories.map((cat: string) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <PlanBadge plan="Parceiro" />
                                </div>

                                {/* 2. Cadeia de Valor (Updated Options) */}
                                <div className="relative">
                                    <Select disabled>
                                        <SelectTrigger className="w-full h-12 border-slate-200 bg-slate-50 text-slate-400 font-semibold px-4 cursor-not-allowed" style={{ borderRadius: '8px' }}>
                                            <SelectValue placeholder="Cadeia de valor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="produtor">Produtor</SelectItem>
                                            <SelectItem value="consumidor">Consumidor</SelectItem>
                                            <SelectItem value="fornecedor">Fornecedor</SelectItem>
                                            <SelectItem value="servicos">Serviços</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <PlanBadge plan="Parceiro" />
                                </div>

                                {/* 3. Categoria (Updated Options: Size) */}
                                <div className="relative">
                                    <Select disabled>
                                        <SelectTrigger className="w-full h-12 border-slate-200 bg-slate-50 text-slate-400 font-semibold px-4 cursor-not-allowed" style={{ borderRadius: '8px' }}>
                                            <SelectValue placeholder="Categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pequena">Pequena empresa</SelectItem>
                                            <SelectItem value="media">Média empresa</SelectItem>
                                            <SelectItem value="grande">Grande empresa</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <PlanBadge plan="Parceiro" />
                                </div>
                            </div>
                        </div>

                        {/* UPSELL BANNER */}
                        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 p-6 rounded-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-black text-white mb-2 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-emerald-400" />
                                        Desbloqueie o Potencial Total
                                    </h3>
                                    <p className="text-emerald-100 text-sm max-w-lg">
                                        Adira a um dos nossos planos <strong>Premium</strong> ou <strong>Parceiro</strong> para desbloquear campos exclusivos, obter cotações em tempo real e aumentar sua visibilidade no mercado.
                                    </p>
                                </div>
                                <Button className="bg-white text-emerald-900 hover:bg-emerald-50 px-8 h-12 font-black uppercase tracking-widest text-xs shadow-lg transform group-hover:scale-105 transition-all">
                                    Ver Planos e Preços
                                </Button>
                            </div>
                        </div>

                        <div className="pt-6 flex justify-start">
                            <Button className="w-auto px-8 h-10 bg-emerald-600 hover:bg-[#f97316] text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 transition-colors duration-300" style={{ borderRadius: '8px' }}>
                                Publicar Empresa
                            </Button>
                        </div>
                    </div>
                </main>

                {/* SIDEBAR (RIGHT) - Continues to the top */}
                <aside
                    className="w-full lg:w-[420px] bg-slate-50 pb-8 pt-0 px-0 shrink-0 sticky right-0 overflow-y-auto space-y-8"
                    style={{ top: '80px', height: 'calc(100vh - 80px)' }}
                >
                    {/* SERVIÇOS - Refactored to single field + list */}
                    <div
                        className="bg-white p-6 border border-slate-200 shadow-sm"
                        style={{ borderRadius: '15px' }}
                    >
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Serviços
                        </h3>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={newService}
                                    onChange={(e) => setNewService(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addService()}
                                    placeholder="Adicionar um serviço..."
                                    className="flex-1 h-10 border-slate-200 text-xs bg-slate-50 font-bold placeholder:text-slate-400"
                                    style={{ borderRadius: '8px' }}
                                />
                                <Button
                                    onClick={addService}
                                    size="sm"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 w-10 flex items-center justify-center"
                                    style={{ borderRadius: '8px' }}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {services.length > 0 ? (
                                    services.map((service, index) => (
                                        <div
                                            key={index}
                                            className="h-9 px-4 bg-emerald-50 text-emerald-700 flex items-center gap-2 border border-emerald-100 group animate-in zoom-in-95 duration-200"
                                            style={{ borderRadius: '8px' }}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-tighter">{service}</span>
                                            <button
                                                onClick={() => removeService(service)}
                                                className="hover:text-rose-500 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-full py-4 text-center border border-dashed border-slate-200" style={{ borderRadius: '8px' }}>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nenhum serviço adicionado</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* COMPRESSION DIALOG */}
            <Dialog open={showCompressionDialog} onOpenChange={setShowCompressionDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Imagem muito grande</DialogTitle>
                        <DialogDescription>
                            A imagem selecionada excede o limite de 1MB.
                            Deseja que optimizemos o tamanho automaticamente?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        {isCompressing ? (
                            <div className="flex flex-col items-center justify-center space-y-3 py-4">
                                <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                                <p className="text-sm font-semibold text-slate-600">A comprimir imagem... Por favor aguarde.</p>
                            </div>
                        ) : (
                            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                                <p className="text-xs text-orange-800 font-medium">
                                    Nota: A qualidade visual será mantida, mas o tamanho do ficheiro será reduzido para cumprir os requisitos.
                                </p>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        {!isCompressing && (
                            <>
                                <Button variant="outline" onClick={() => setShowCompressionDialog(false)}>
                                    Cancelar
                                </Button>
                                <Button onClick={confirmCompression} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                    Sim
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
