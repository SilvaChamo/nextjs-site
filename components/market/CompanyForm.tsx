"use client";

import React, { useState } from 'react';
import { CompanyDetail, PlanType, BillingPeriod } from '../../lib/types';
import InvoiceReceipt from './InvoiceReceipt';

const formatCurrency = (value: number | string): string => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/\s/g, '')) : value;
    if (isNaN(num)) return value.toString();
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

interface CompanyFormProps {
    initialData?: CompanyDetail;
    onSubmit: (company: CompanyDetail) => void;
    onClose: () => void;
    onAlert?: (title: string, message: string, type: 'success' | 'error' | 'info') => void;
}

const getProductLimit = (plan: PlanType): number => {
    if (plan === 'Parceiro') return Infinity;
    if (plan === 'Premium') return 15;
    if (plan === 'Básico') return 5;
    return 0;
};

const MONTHLY_PRICES: Record<PlanType, number> = {
    'Free': 0,
    'Básico': 500,
    'Premium': 1500,
    'Parceiro': 5000
};

const ANNUAL_DISCOUNT = 0.17;
const FEATURED_PRICE = 1000;

const getPlanPrice = (plan: PlanType, billingPeriod: BillingPeriod): number => {
    const monthlyPrice = MONTHLY_PRICES[plan];
    if (billingPeriod === 'annual') {
        return Math.round(monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT));
    }
    return monthlyPrice;
};

const CompanyForm: React.FC<CompanyFormProps> = ({ initialData, onSubmit, onClose, onAlert }) => {
    const [formData, setFormData] = useState<CompanyDetail>(initialData || {
        registrationType: 'enterprise',
        name: '',
        email: '',
        contact: '',
        activity: '',
        location: '',
        geoLocation: '',
        valueChain: 'Consumidor',
        logo: '',
        fullDescription: '',
        services: '',
        products: [],
        plan: 'Free',
        billingPeriod: 'monthly',
        isFeatured: false
    });

    const [hasPaidPlan, setHasPaidPlan] = useState(false);
    const [hasPaidFeatured, setHasPaidFeatured] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'emola' | 'banco' | null>(null);
    const [paymentPhone, setPaymentPhone] = useState('');
    const [bankDetails, setBankDetails] = useState({ holder: '', bankName: '', nib: '', iban: '', agency: '' });
    const [showReceipt, setShowReceipt] = useState(false);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const handleAddProductField = () => {
        const plan = formData.plan || 'Free';
        if (plan === 'Free') {
            onAlert?.('Atenção', "O plano gratuito não permite registar produtos. Faça o upgrade para um plano pago.", 'info');
            return;
        }
        if (!hasPaidPlan && (initialData?.plan === 'Free' || !initialData)) {
            onAlert?.('Atenção', "Por favor, efectue o pagamento do plano para activar o registo de produtos.", 'info');
            return;
        }

        const limit = getProductLimit(plan);
        if (formData.products.length < limit) {
            setFormData({ ...formData, products: [...formData.products, { name: '', price: '', photo: '', description: '', available: true }] });
        } else {
            onAlert?.('Limite Atingido', `Seu plano permite apenas ${limit} produtos.`, 'info');
        }
    };

    const updateProduct = (index: number, field: 'name' | 'price' | 'photo' | 'description', value: string) => {
        const newProducts = [...formData.products];
        newProducts[index][field] = value;
        setFormData({ ...formData, products: newProducts });
    };

    const toggleProductAvailability = (index: number) => {
        const newProducts = [...formData.products];
        newProducts[index].available = !newProducts[index].available;
        setFormData({ ...formData, products: newProducts });
    };

    const removeProduct = (index: number) => {
        const newProducts = formData.products.filter((_, i) => i !== index);
        setFormData({ ...formData, products: newProducts });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name?.trim()) { onAlert?.('Atenção', "Por favor, preencha o nome.", 'info'); return; }
        if (!formData.email?.trim()) { onAlert?.('Atenção', "Por favor, preencha o email.", 'info'); return; }
        if (!formData.contact?.trim()) { onAlert?.('Atenção', "Por favor, preencha o contacto.", 'info'); return; }
        if (!formData.activity?.trim()) { onAlert?.('Atenção', "Por favor, preencha a actividade.", 'info'); return; }
        if (!formData.location?.trim()) { onAlert?.('Atenção', "Por favor, preencha a localização.", 'info'); return; }
        if (!formData.fullDescription?.trim()) {
            onAlert?.('Atenção', "Por favor, preencha a descrição completa da empresa.", 'info');
            return;
        }
        if (formData.plan !== 'Free' && !hasPaidPlan) {
            onAlert?.('Atenção', "Por favor, efectue o pagamento do plano.", 'info');
            return;
        }
        if (formData.isFeatured && !hasPaidFeatured) {
            onAlert?.('Atenção', "Por favor, efectue o pagamento para destacar.", 'info');
            return;
        }
        onSubmit(formData);
    };

    const isEnterprise = formData.registrationType === 'enterprise';

    return (
        <div className="absolute inset-0 bg-white z-[60] overflow-y-auto p-6 pb-24 space-y-4 shadow-2xl">
            {/* Header Section */}
            <div className="space-y-1 relative">
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                    <i className="fa-solid fa-circle-xmark text-xl"></i>
                </button>
                <h2 className="text-[20px] font-black text-[#1e293b] leading-tight uppercase">Registo Profissional</h2>
                <p className="text-[11px] text-slate-400 leading-relaxed tracking-tighter">Seleccione o tipo de cadastro e preencha os dados</p>
            </div>

            {/* Registration Animated Tabs */}
            <div className="relative bg-slate-100/50 p-1.5 rounded-lg flex gap-1 h-12 overflow-hidden">
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, registrationType: 'enterprise' })}
                    className={`relative flex-1 rounded-md text-[10px] font-black uppercase transition-all z-10 flex items-center justify-center gap-2 ${isEnterprise ? 'bg-white text-orange-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-orange-500'}`}
                >
                    <i className="fa-solid fa-building text-xs"></i>
                    Empresa
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({ ...formData, registrationType: 'professional' })}
                    className={`relative flex-1 rounded-md text-[10px] font-black uppercase transition-all z-10 flex items-center justify-center gap-2 ${!isEnterprise ? 'bg-white text-orange-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-orange-500'}`}
                >
                    <i className="fa-solid fa-user-tie text-xs"></i>
                    Profissional
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                {/* Nome Field */}
                <div className="relative">
                    <i className={`fa-solid ${isEnterprise ? 'fa-building' : 'fa-user'} absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-sm`}></i>
                    <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 p-2.5 pl-11 rounded-lg text-[12px] text-slate-700 focus:border-emerald-400 outline-none transition-all shadow-sm"
                        placeholder={isEnterprise ? "Nome da Empresa / Entidade" : "Nome Completo do Profissional"}
                    />
                </div>

                {/* Grid Logo (L) + Inputs (R) */}
                <div className="grid grid-cols-[110px_1fr] gap-3">
                    <div className="relative h-full">
                        <label className="flex flex-col items-center justify-center w-full h-full bg-white border border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all overflow-hidden">
                            {formData.logo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={formData.logo} className="w-full h-full object-cover" alt="Logo" />
                            ) : (
                                <>
                                    <i className={`fa-solid ${isEnterprise ? 'fa-camera' : 'fa-id-badge'} text-slate-300 text-xl mb-1`}></i>
                                    <span className="text-[8px] font-black text-slate-400 uppercase text-center px-2 leading-tight">
                                        {isEnterprise ? 'Logo' : 'Foto'}
                                    </span>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData({ ...formData, logo: reader.result as string });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="space-y-3">
                        <div className="relative">
                            <i className="fa-solid fa-phone absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[11px]"></i>
                            <input required type="tel" value={formData.contact} onChange={e => setFormData({ ...formData, contact: e.target.value })} className="w-full bg-white border border-slate-200 p-2.5 pl-9 rounded-lg text-[12px] focus:border-emerald-400 outline-none transition-all" placeholder="Telemóvel" />
                        </div>
                        <div className="relative">
                            <i className={`fa-solid ${isEnterprise ? 'fa-link' : 'fa-graduation-cap'} absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[11px]`}></i>
                            <select
                                required
                                value={formData.valueChain}
                                onChange={e => setFormData({ ...formData, valueChain: e.target.value as any })}
                                className="w-full bg-white border border-slate-200 p-2.5 pl-9 rounded-lg text-[12px] outline-none appearance-none focus:border-emerald-400 transition-all pr-8"
                            >
                                {isEnterprise ? (
                                    <>
                                        <option value="" disabled>Seleccione o sector</option>
                                        <option value="Consumidor">Consumidor</option>
                                        <option value="Produtor">Produtor</option>
                                        <option value="Fornecedor">Fornecedor</option>
                                        <option value="Serviços">Serviços</option>
                                        <option value="Agro-negócio">Agro-negócio</option>
                                        <option value="Outros">Outros</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="" disabled>Qualificação / Profissão</option>
                                        <option value="Engenheiro">Engenheiro</option>
                                        <option value="Agrónomo">Agrónomo</option>
                                        <option value="Técnico">Técnico</option>
                                        <option value="Agricultor">Agricultor</option>
                                        <option value="Pesquisador">Pesquisador</option>
                                        <option value="Extensionista">Extensionista</option>
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="relative">
                            <i className="fa-solid fa-map-pin absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-[11px]"></i>
                            <select
                                required
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                className="w-full bg-white border border-slate-200 p-2.5 pl-9 rounded-lg text-[12px] outline-none appearance-none focus:border-emerald-400 transition-all pr-8"
                            >
                                <option value="" disabled>Província</option>
                                <option value="Niassa">Niassa</option>
                                <option value="Cabo Delgado">Cabo Delgado</option>
                                <option value="Nampula">Nampula</option>
                                <option value="Zambézia">Zambézia</option>
                                <option value="Tete">Tete</option>
                                <option value="Manica">Manica</option>
                                <option value="Sofala">Sofala</option>
                                <option value="Inhambane">Inhambane</option>
                                <option value="Gaza">Gaza</option>
                                <option value="Província de Maputo">Província de Maputo</option>
                                <option value="Cidade de Maputo">Cidade de Maputo</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Additional Full Width Fields */}
                <div className="space-y-3">
                    <div className="relative">
                        <i className="fa-solid fa-location-arrow absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-sm"></i>
                        <input type="text" value={formData.geoLocation} onChange={e => setFormData({ ...formData, geoLocation: e.target.value })} className="w-full bg-white border border-slate-200 p-2.5 pl-11 rounded-lg text-[12px] focus:border-emerald-400 outline-none transition-all shadow-sm" placeholder="Endereço" />
                    </div>

                    <div className="relative">
                        <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-sm"></i>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white border border-slate-200 p-2.5 pl-11 rounded-lg text-[12px] focus:border-emerald-400 outline-none transition-all shadow-sm" placeholder="E-mail" />
                    </div>

                    <div className="relative">
                        <i className="fa-solid fa-briefcase absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-sm"></i>
                        <input
                            required
                            type="text"
                            value={formData.activity}
                            onChange={e => setFormData({ ...formData, activity: e.target.value })}
                            className="w-full bg-white border border-slate-200 p-2.5 pl-11 rounded-lg text-[12px] text-emerald-700 focus:border-emerald-400 outline-none transition-all shadow-sm"
                            placeholder={isEnterprise ? "Actividade Principal (Ex: Revenda de Sementes)" : "Especialidade Principal (Ex: Agrónomo)"}
                        />
                    </div>

                    <div className="relative">
                        <textarea rows={3} value={formData.fullDescription} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} className="w-full bg-white border border-slate-200 p-3 pt-3 rounded-lg text-[12px] focus:border-emerald-400 outline-none transition-all" placeholder={isEnterprise ? "Descrição da empresa..." : "Sobre o profissional..."} />
                    </div>
                </div>

                {/* Services Section */}
                <div className="space-y-3 pt-3">
                    <div className="flex items-center gap-2 px-1">
                        <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <i className="fa-solid fa-handshake-angle text-xs"></i>
                        </div>
                        <p className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">
                            {isEnterprise ? 'Nossos Serviços' : 'Meus Serviços'}
                        </p>
                    </div>
                    <div className="relative">
                        <textarea
                            rows={4}
                            value={formData.services}
                            onChange={e => setFormData({ ...formData, services: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-[12px] focus:border-emerald-400 focus:bg-white outline-none transition-all shadow-inner"
                            placeholder="Descreva detalhadamente o que oferece (ex: Consultoria, Venda, Aluguer...)"
                        />
                    </div>
                </div>

                {/* Products Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center px-1">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center">
                                <i className="fa-solid fa-boxes-stacked text-xs"></i>
                            </div>
                            <p className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">
                                {isEnterprise ? 'Catálogo de Produtos' : 'Preçário / Honorários'}
                            </p>
                        </div>
                        {formData.plan !== 'Parceiro' && (
                            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                                {formData.products.length} / {formData.plan === 'Free' ? '0' : getProductLimit(formData.plan || 'Free')}
                            </span>
                        )}
                    </div>
                    {formData.products.map((prod, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 space-y-3 animate-in fade-in duration-200">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Item #{idx + 1}</span>
                                <button type="button" onClick={() => removeProduct(idx)} className="text-red-400 hover:text-red-600">
                                    <i className="fa-solid fa-trash text-[10px]"></i>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <input required type="text" placeholder="Nome" value={prod.name} onChange={e => updateProduct(idx, 'name', e.target.value)} className="bg-white border border-slate-200 p-2.5 rounded-lg text-[11px] outline-none" />
                                <input type="text" placeholder="Preço (MT)" value={prod.price} onChange={e => updateProduct(idx, 'price', e.target.value)} className="bg-white border border-slate-200 p-2.5 rounded-lg text-[11px] text-emerald-600 font-bold outline-none" />
                            </div>
                        </div>
                    ))}
                    {formData.plan !== 'Free' && (
                        <button
                            type="button"
                            onClick={handleAddProductField}
                            className="w-full py-3 border border-dashed border-slate-300 rounded-lg text-[11px] font-black uppercase text-slate-400 hover:border-orange-400 hover:text-orange-500 transition-all"
                        >
                            <i className="fa-solid fa-plus mr-1"></i> Adicionar Item
                        </button>
                    )}
                </div>

                {/* Plans Selection */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Escolha seu Plano</p>
                    <div className="grid grid-cols-2 gap-2">
                        {(['Free', 'Básico', 'Premium', 'Parceiro'] as PlanType[]).map(p => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => {
                                    setFormData({ ...formData, plan: p, isFeatured: p === 'Parceiro' });
                                    setHasPaidPlan(false);
                                }}
                                className={`p-2.5 rounded-lg border text-[12px] uppercase flex flex-col items-center gap-0.5 transition-all ${formData.plan === p ? 'bg-orange-500 border-orange-400 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}`}
                            >
                                <span className="font-bold">{p}</span>
                                <span className="opacity-70 text-[11px] font-normal">
                                    {p === 'Free' ? '0 MT' : `${formatCurrency(getPlanPrice(p, formData.billingPeriod || 'monthly'))} MT`}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Payment Option */}
                {formData.plan !== 'Free' && !hasPaidPlan && (
                    <div className="space-y-3 pt-3">
                        <div className="flex gap-2">
                            {(['mpesa', 'emola', 'banco'] as const).map(m => (
                                <button
                                    key={m}
                                    type="button"
                                    onClick={() => setPaymentMethod(m)}
                                    className={`flex-1 py-2 rounded-lg border text-[9px] font-black uppercase transition-all ${paymentMethod === m ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        {paymentMethod && (
                            <div className="space-y-2">
                                <input
                                    type="tel"
                                    value={paymentPhone}
                                    onChange={e => setPaymentPhone(e.target.value)}
                                    className="w-full bg-white border border-slate-200 p-3 rounded-lg text-xs outline-none"
                                    placeholder="Número de Telefone"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsPaymentProcessing(true);
                                        setTimeout(() => {
                                            setIsPaymentProcessing(false);
                                            setHasPaidPlan(true);
                                            setHasPaidFeatured(true);
                                        }, 1500);
                                    }}
                                    className="w-full py-4 bg-[#10b981] text-white rounded-lg font-black text-[11px] uppercase shadow-xl"
                                >
                                    {isPaymentProcessing ? 'VALIDANDO...' : `PAGAR VIA ${paymentMethod.toUpperCase()}`}
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-[#1e293b] hover:bg-orange-500 text-white py-4 rounded-lg font-black text-xs uppercase tracking-widest shadow-xl transition-all"
                >
                    Finalizar Registo
                </button>
            </form>

            {showReceipt && (
                <InvoiceReceipt
                    company={formData}
                    onClose={() => setShowReceipt(false)}
                />
            )}
        </div>
    );
};

export default CompanyForm;
