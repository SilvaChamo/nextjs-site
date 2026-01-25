"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
    Building2, MapPin, Briefcase, CheckCircle2,
    ArrowRight, ArrowLeft, Upload, Loader2, Save, Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, compressImage } from "@/lib/utils";

// Definindo os passos do Wizard
const STEPS = [
    { id: 1, title: "Identidade", icon: Building2, description: "Essenciais do negócio" },
    { id: 2, title: "Plano", icon: Crown, description: "Escolha sua presença" },
    { id: 3, title: "Localização", icon: MapPin, description: "Sede e operação" },
    { id: 4, title: "Atividade", icon: Briefcase, description: "Perfil detalhado" },
    { id: 5, title: "Produtos", icon: Save, description: "Seu catálogo" },
    { id: 6, title: "Pagamento", icon: CheckCircle2, description: "Facturação" }
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
        activity: "",
        email: "",
        contact: "",
        newsletter: true,
        logoUrl: "",

        // Passo 2: Plano
        plan: "gratuito", // gratuito | profissional | empresarial | parceiro
        billingPeriod: "monthly",

        // Passo 3: Localização
        province: "",
        district: "",
        address: "",

        // Passo 4: Atividade
        sector: "",
        description: "",
        tags: "",

        // Passo 5: Produtos
        products: [] as { name: string; price: string; description: string }[],

        // Passo 6: Pagamento
        paymentMethod: "",
        paymentPhone: "",
        paymentConfirmed: false
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
            const compressedBlob = await compressImage(file);
            const filePath = `company-logos/${user?.id}-${Math.random()}.webp`;

            // Upload
            const { error: uploadError } = await supabase.storage
                .from('public-assets')
                .upload(filePath, compressedBlob);

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
        if (currentStep < 6) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('companies').upsert({
                user_id: user.id,
                name: formData.companyName,
                activity: formData.activity,
                email: formData.email,
                contact: formData.contact,
                logo_url: formData.logoUrl,
                province: formData.province,
                district: formData.district,
                address: formData.address,
                category: formData.sector,
                description: formData.description,
                plan: formData.plan,
                billing_period: formData.billingPeriod,
                products: formData.products, // Assumindo coluna JSONB
                payment_method: formData.paymentMethod,
                payment_phone: formData.paymentPhone,
                geo_location: `${formData.province}, ${formData.district}`,
                updated_at: new Date().toISOString()
            }, { onConflict: 'user_id' });

            if (error) throw error;

            alert("Empresa registada com sucesso!");
            router.push('/usuario/dashboard/empresa');

        } catch (error: any) {
            console.error("Submit error:", error);
            alert(`Erro ao salvar dados: ${error.message}`);
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
                        <span className="text-sm font-bold text-slate-500">Passo {currentStep} de 6</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className={`h-1.5 w-6 rounded-full ${i <= currentStep ? 'bg-emerald-600' : 'bg-slate-200'}`} />
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
                                        <label className="text-sm font-bold text-slate-700">Nome da Empresa</label>
                                        <Input
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Agro Pecuária do Norte, Lda."
                                            className="h-12 border-slate-200"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Actividade Principal</label>
                                            <Input
                                                name="activity"
                                                value={formData.activity}
                                                onChange={handleInputChange}
                                                placeholder="Ex: Produção de Milho"
                                                className="h-12 border-slate-200"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Telefone / Contacto</label>
                                            <Input
                                                name="contact"
                                                value={formData.contact}
                                                onChange={handleInputChange}
                                                placeholder="+258 ..."
                                                className="h-12 border-slate-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">E-mail Corporativo</label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="empresa@exemplo.com"
                                            className="h-12 border-slate-200"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            checked={formData.newsletter}
                                            onChange={(e) => setFormData(p => ({ ...p, newsletter: e.target.checked }))}
                                            className="w-5 h-5 accent-emerald-600 rounded"
                                        />
                                        <label htmlFor="newsletter" className="text-xs font-bold text-slate-600 cursor-pointer">
                                            Subscrever à nossa Newsletter para actualizações do sector
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASSO 2: PLANO DE ASSINATURA */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Escolha seu Plano</h2>
                                <p className="text-slate-500 text-sm mb-6">Selecione o nível de visibilidade que sua empresa deseja ter.</p>

                                <div className="grid grid-cols-1 gap-4">
                                    {/* Gratuito */}
                                    <div
                                        onClick={() => setFormData(p => ({ ...p, plan: 'gratuito' }))}
                                        className={`p-6 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden ${formData.plan === 'gratuito' ? 'border-emerald-500 bg-emerald-50/30 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-black text-slate-800 text-lg">Gratuito</h3>
                                                <p className="text-xs text-slate-500 mb-4">Essencial para começar</p>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Visualização de vagas básicas
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Perfil de usuário simples
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Suporte via e-mail
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-300 line-through">
                                                        <CheckCircle2 className="w-4 h-4 text-slate-200" /> Cadastro de produtos
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black text-slate-800">Grátis</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Profissional */}
                                    <div
                                        onClick={() => setFormData(p => ({ ...p, plan: 'profissional' }))}
                                        className={`p-6 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden ${formData.plan === 'profissional' ? 'border-orange-500 bg-orange-50/30 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                                    Profissional <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full uppercase">Pequenas Empresas</span>
                                                </h3>
                                                <p className="text-xs text-slate-500 mb-4">Crescimento e visibilidade</p>
                                                <ul className="space-y-1.5 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-orange-500" /> Acesso a cotações
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-orange-500" /> Vagas ilimitadas
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-orange-500" /> Perfil verificado
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-orange-500" /> Produtos ilimitados
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-orange-500" /> 1 Anúncio/Mês
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black text-slate-800">250 MT</span>
                                                <p className="text-[10px] text-slate-500">por mês</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Empresarial */}
                                    <div
                                        onClick={() => setFormData(p => ({ ...p, plan: 'empresarial' }))}
                                        className={`p-6 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden ${formData.plan === 'empresarial' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                    >
                                        <div className="flex justify-between items-start relative z-10">
                                            <div>
                                                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                                                    Empresarial <Crown className="w-4 h-4 text-blue-600" />
                                                </h3>
                                                <p className="text-xs text-slate-500 mb-4">Dados estratégicos e API</p>
                                                <ul className="space-y-1.5 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Tudo do Profissional
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Acesso API de dados
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Relatórios PDF/Excel
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Consultoria Mensal
                                                    </li>
                                                    <li className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                        <CheckCircle2 className="w-4 h-4 text-blue-600" /> Destaque máximo
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-black text-slate-800">1.000 MT</span>
                                                <p className="text-[10px] text-slate-500">por mês</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Parceiro */}
                                    <div
                                        onClick={() => setFormData(p => ({ ...p, plan: 'parceiro' }))}
                                        className={`p-6 rounded-xl border-2 transition-all cursor-pointer relative overflow-hidden ${formData.plan === 'parceiro' ? 'border-emerald-600 bg-emerald-950 text-white shadow-md' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${formData.plan === 'parceiro' ? 'bg-emerald-500' : 'bg-emerald-100'}`}>
                                                    <Briefcase className={`w-6 h-6 ${formData.plan === 'parceiro' ? 'text-white' : 'text-emerald-600'}`} />
                                                </div>
                                                <div>
                                                    <h3 className={`font-black text-lg ${formData.plan === 'parceiro' ? 'text-white' : 'text-slate-800'}`}>Plano Parceiro</h3>
                                                    <p className={`text-xs ${formData.plan === 'parceiro' ? 'text-emerald-200' : 'text-slate-500'}`}>Liberdade total e benefícios exclusivos</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`text-sm font-bold px-3 py-1 rounded-full ${formData.plan === 'parceiro' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'}`}>Sob Consulta</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASSO 3: LOCALIZAÇÃO */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Onde sua empresa está?</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Província</label>
                                        <Input
                                            name="province"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Maputo, Nampula..."
                                            className="h-12 border-slate-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Distrito</label>
                                        <Input
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            placeholder="Digite o distrito"
                                            className="h-12 border-slate-200"
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Endereço Completo</label>
                                        <Input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Rua, Bairro, Número..."
                                            className="h-12 border-slate-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASSO 4: ATIVIDADE */}
                        {currentStep === 4 && (
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
                                            className="h-12 border-slate-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Descrição da Empresa</label>
                                        <Textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Escreva um breve resumo sobre o que sua empresa faz..."
                                            className="min-h-[120px] border-slate-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Tags (Palavras-chave)</label>
                                        <Input
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Milho, Soja, Adubos (separados por vírgula)"
                                            className="h-12 border-slate-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASSO 5: PRODUTOS */}
                        {currentStep === 5 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold text-slate-800">Seu Catálogo</h2>
                                    <Button
                                        onClick={() => setFormData(p => ({ ...p, products: [...p.products, { name: "", price: "", description: "" }] }))}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                    >
                                        + Adicionar Produto
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {formData.products.length === 0 ? (
                                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                                            <Save className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                            <p className="text-slate-500">Ainda não adicionou produtos ao seu catálogo.</p>
                                        </div>
                                    ) : (
                                        formData.products.map((prod, idx) => (
                                            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                                                <div className="flex justify-between">
                                                    <span className="text-xs font-black uppercase text-slate-400">Produto #{idx + 1}</span>
                                                    <button onClick={() => setFormData(p => ({ ...p, products: p.products.filter((_, i) => i !== idx) }))} className="text-red-500 hover:text-red-700 text-xs font-bold">Remover</button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input placeholder="Nome do Produto" value={prod.name} onChange={e => {
                                                        const newProds = [...formData.products];
                                                        newProds[idx].name = e.target.value;
                                                        setFormData(p => ({ ...p, products: newProds }));
                                                    }} />
                                                    <Input placeholder="Preço (Ex: 100 MT)" value={prod.price} onChange={e => {
                                                        const newProds = [...formData.products];
                                                        newProds[idx].price = e.target.value;
                                                        setFormData(p => ({ ...p, products: newProds }));
                                                    }} />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {/* PASSO 6: PAGAMENTO */}
                        {currentStep === 6 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Finalizar e Pagar</h2>
                                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest">Plano Seleccionado</p>
                                        <h3 className="text-xl font-black text-slate-800 uppercase">{formData.plan}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest">Total a Pagar</p>
                                        <h3 className="text-2xl font-black text-slate-800">
                                            {formData.plan === 'gratuito' ? '0 MT' : formData.plan === 'profissional' ? '250 MT' : '1.000 MT'}
                                        </h3>
                                    </div>
                                </div>

                                {formData.plan !== 'gratuito' && (
                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-slate-700">Método de Pagamento</p>
                                        <div className="grid grid-cols-3 gap-3">
                                            {['Mpesa', 'Emola', 'Banco'].map(m => (
                                                <button
                                                    key={m}
                                                    onClick={() => setFormData(p => ({ ...p, paymentMethod: m }))}
                                                    className={`py-4 rounded-xl border-2 font-black uppercase text-[10px] tracking-widest transition-all ${formData.paymentMethod === m ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                                                >
                                                    {m}
                                                </button>
                                            ))}
                                        </div>
                                        {formData.paymentMethod && (
                                            <div className="pt-4 space-y-4">
                                                <Input
                                                    placeholder={formData.paymentMethod === 'Banco' ? "Número do Comprovativo" : "Número de Telefone"}
                                                    value={formData.paymentPhone}
                                                    onChange={e => setFormData(p => ({ ...p, paymentPhone: e.target.value }))}
                                                />
                                                <Button
                                                    onClick={() => {
                                                        setLoading(true);
                                                        setTimeout(() => {
                                                            setLoading(false);
                                                            setFormData(p => ({ ...p, paymentConfirmed: true }));
                                                        }, 2000);
                                                    }}
                                                    className="w-full h-14 bg-[#10b981] text-white font-black uppercase tracking-widest"
                                                >
                                                    {loading ? <Loader2 className="animate-spin" /> : `CONFIRMAR PAGAMENTO ${formData.paymentMethod.toUpperCase()}`}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}
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

                        {currentStep < 6 ? (
                            <Button
                                onClick={handleNext}
                                className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            >
                                Próximo Passo <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={loading || (formData.plan !== 'gratuito' && !formData.paymentConfirmed)}
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
