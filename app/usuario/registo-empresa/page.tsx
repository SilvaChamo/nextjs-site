"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
    Building2, MapPin, Briefcase, CheckCircle2,
    ArrowRight, ArrowLeft, Upload, Loader2, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Definindo os passos do Wizard
const STEPS = [
    { id: 1, title: "Identidade", icon: Building2, description: "Informações básicas" },
    { id: 2, title: "Localização", icon: MapPin, description: "Onde sua empresa opera" },
    { id: 3, title: "Atividade", icon: Briefcase, description: "Detalhes do negócio" }
];

export default function RegisterCompanyPage() {
    const router = useRouter();
    const supabase = createClient();

    // Estados Globais
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [user, setUser] = useState<any>(null);

    // Estado do Formulário (Unificado)
    const [formData, setFormData] = useState({
        // Passo 1: Identidade
        companyName: "",
        nuit: "",
        logoUrl: "",

        // Passo 2: Localização
        province: "",
        district: "",
        address: "",

        // Passo 3: Atividade
        sector: "",
        description: "",
        tags: "" // String separada por vírgulas
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Verificar Auth
    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            } else {
                setUser(user);
            }
        };
        checkUser();
    }, [router, supabase]);

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const filePath = `company-logos/${user?.id}-${Math.random()}.${fileExt}`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('public-assets') // Bucket deve existir. Se não, idealmente criar ou usar 'avatars' temporariamente.
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('public-assets')
                .getPublicUrl(filePath);

            setFormData(prev => ({ ...prev, logoUrl: publicUrl }));
        } catch (error) {
            console.error("Upload error:", error);
            alert("Erro ao fazer upload do logo. Tente novamente.");
        } finally {
            setUploading(false);
        }
    };

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Simulando gravação no Supabase (trocar por insert real quando tiver a tabela 'companies')
            /*
            const { error } = await supabase.from('companies').insert({
                user_id: user.id,
                name: formData.companyName,
                nuit: formData.nuit,
                logo_url: formData.logoUrl,
                province: formData.province,
                ...
            });
            */

            // Mock de sucesso por enquanto
            await new Promise(resolve => setTimeout(resolve, 1500));

            alert("Empresa registada com sucesso!");
            router.push('/usuario/dashboard/empresa'); // Redirecionar para a tab de empresa (que agora vai ler do banco)

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar dados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">

            {/* Sidebar Visual (Esquerda) */}
            <div className="w-full md:w-1/3 bg-[#0f172a] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-09d9b63bd70b?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                        <Building2 className="w-8 h-8 text-emerald-500" />
                        <span className="font-black text-xl tracking-tight">BASE AGRO</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                        Cadastre sua Empresa
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Junte-se à maior rede do agronegócio em Moçambique. Amplie sua visibilidade e encontre novos parceiros.
                    </p>
                </div>

                {/* Steps Indicator (Vertical on Desktop) */}
                <div className="relative z-10 space-y-6 mt-12 hidden md:block">
                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <div key={step.id} className={`flex items-center gap-4 transition-all duration-300 ${isActive ? 'translate-x-2' : 'opacity-60'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isActive || isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-600 text-slate-400'}`}>
                                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{step.id}</span>}
                                </div>
                                <div>
                                    <p className={`font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>{step.title}</p>
                                    <p className="text-xs text-slate-500">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Conteúdo do Formulário (Direita) */}
            <div className="flex-1 p-6 md:p-12 lg:p-20 overflow-y-auto">
                <div className="max-w-2xl mx-auto">

                    {/* Header Mobile Steps */}
                    <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                        <span className="text-sm font-bold text-slate-500">Passo {currentStep} de 3</span>
                        <div className="flex gap-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`h-1.5 w-8 rounded-full ${i <= currentStep ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="min-h-[400px]">

                        {/* PASSO 1: IDENTIDADE */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Identidade da Empresa</h2>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Logo da Empresa</label>
                                        <div className="flex items-center gap-6">
                                            <div
                                                onClick={() => fileInputRef.current?.click()}
                                                className="w-24 h-24 rounded-lg bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors overflow-hidden relative"
                                            >
                                                {formData.logoUrl ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Upload className="w-8 h-8 text-slate-400" />
                                                )}
                                                {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin w-6 h-6 text-emerald-600" /></div>}
                                            </div>
                                            <div className="flex-1">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    disabled={uploading}
                                                >
                                                    Escolher Imagem
                                                </Button>
                                                <p className="text-xs text-slate-500 mt-2">Recomendado: 500x500px, JPG ou PNG.</p>
                                                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nome da Empresa (Razão Social)</label>
                                        <Input
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Agro Pecuária do Norte, Lda."
                                            className="h-12"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">NUIT</label>
                                        <Input
                                            name="nuit"
                                            value={formData.nuit}
                                            onChange={handleInputChange}
                                            placeholder="Número Único de Identificação Tributária"
                                            className="h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASSO 2: LOCALIZAÇÃO */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Onde sua empresa está?</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Província</label>
                                        <Input
                                            name="province"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            placeholder="Selecione..."
                                            className="h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Distrito</label>
                                        <Input
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            placeholder="Digite o distrito"
                                            className="h-12"
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Endereço Completo</label>
                                        <Input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Rua, Bairro, Número..."
                                            className="h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASSO 3: ATIVIDADE */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Detalhes do Negócio</h2>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Setor de Atividade</label>
                                        <Input
                                            name="sector"
                                            value={formData.sector}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Produção Agrícola, Pecuária, Equipamentos..."
                                            className="h-12"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Descrição da Empresa</label>
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Escreva um breve resumo sobre o que sua empresa faz..."
                                            className="min-h-[120px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Tags (Palavras-chave)</label>
                                        <Input
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Milho, Soja, Adubos (separados por vírgula)"
                                            className="h-12"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-8 border-t border-slate-100 flex justify-between mt-8">
                        {currentStep > 1 ? (
                            <Button variant="outline" onClick={handleBack} className="h-12 px-6">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                            </Button>
                        ) : (
                            <div /> // Espaçador
                        )}

                        {currentStep < 3 ? (
                            <Button
                                onClick={handleNext}
                                className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            >
                                Próximo Passo <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Finalizar Cadastro
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
