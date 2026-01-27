"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import {
    ArrowLeft,
    Share2,
    Facebook,
    Linkedin,
    Twitter,
    ShoppingCart,
    ShieldCheck,
    Building2,
    Package,
    Tag,
    MapPin,
    ExternalLink,
    Info,
    Calendar,
    TrendingUp,
    Eye
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailClient({ company, product, companySlug }: { company: any, product: any, companySlug: string }) {
    const [showShare, setShowShare] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const WhatsAppIcon = ({ className }: { className?: string }) => (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );

    const handleShare = (type: 'whatsapp' | 'facebook' | 'linkedin' | 'twitter' | 'copy') => {
        const text = encodeURIComponent(`Confira este produto: ${product.name} de ${company.name} no BaseAgroData - ${shareUrl}`);

        switch (type) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${text}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(shareUrl);
                alert('Link copiado para a área de transferência!');
                break;
        }
    };

    return (
        <StandardBlogTemplate
            title={product.name}
            backgroundImage={company.header_bg || "/images/Prototipo/sala2.jpg"}
            isSidebarLeft={true}
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Empresas", href: "/empresas" },
                { label: company.name, href: `/empresas/${companySlug}` },
                { label: product.name }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    {/* WIDE PRODUCT CARD (LEFT SIDEBAR) - 30% Approx */}
                    <div className="group bg-white rounded-agro border border-slate-200 shadow-md card-interactive transition-all duration-500 flex flex-col relative overflow-hidden">
                        <div className="relative h-[260px] w-full overflow-hidden">
                            <Image
                                src={product.img || product.photo || "/images/Prototipo/caju.webp"}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                                <div className="bg-emerald-600/90 backdrop-blur-md text-white text-[9px] font-bold px-2.5 py-1.5 rounded-md shadow-lg border border-white/10 flex items-center gap-1.5">
                                    <ShieldCheck className="w-3 h-3" />
                                    Catálogo oficial
                                </div>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col">
                            <h2 className="text-2xl font-black text-slate-800 tracking-tighter mb-2 leading-tight">
                                {product.name}
                            </h2>

                            <div className="flex items-center gap-2 mb-4">
                                <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border ${product.available !== false ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                    {product.available !== false ? '● Disponível' : '● Indisponível'}
                                </span>
                            </div>

                            <p className="text-sm font-bold text-slate-400 mb-6 leading-normal">
                                Disponível para encomenda direta via BaseAgroData em Moçambique.
                            </p>

                            <div className="flex items-center gap-2 text-sm font-black text-[#f97316]">
                                <Tag className="w-4 h-4" />
                                {product.price}
                            </div>
                        </div>
                    </div>

                    {/* Company Quick Link Card - No Uppercase */}
                    <div className="card-agro-static group hover:border-accent/40 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg p-1.5 shadow-sm border border-slate-100 shrink-0">
                                {company.logo_url ? (
                                    <Image src={company.logo_url} alt="Logo" width={40} height={40} className="w-full h-full object-contain" />
                                ) : (
                                    <Building2 className="w-full h-full text-slate-200" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-slate-400 leading-none mb-1">{company.name}</p>
                                <Link
                                    href={`/empresas/${companySlug}`}
                                    className="text-xs font-bold text-primary hover:text-accent transition-all flex items-center gap-1"
                                >
                                    Ver perfil completo
                                    <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="space-y-agro pb-20">
                {/* MAIN CONTENT (RIGHT COLUMN) - Strictly no forced uppercase */}
                <div className="card-agro bg-white border border-slate-100 shadow-sm min-h-[600px] p-10">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-12 pb-8 border-b border-slate-50">
                        Detalhes do produto
                    </h1>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
                        <div className="space-y-12">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100/50">
                                    <Tag className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 mb-1">Preço sugerido</p>
                                    <p className="text-2xl font-black text-accent tracking-tighter">{product.price}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100/50">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 mb-1">Estado de disponibilidade</p>
                                    <p className={`text-xl font-bold ${product.available !== false ? 'text-primary' : 'text-red-500'}`}>
                                        {product.available !== false ? 'Disponível para encomenda' : 'Temporariamente indisponível'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100/50">
                                    <Package className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 mb-1">Categoria de produto</p>
                                    <p className="text-xl font-bold text-slate-700">Agrícolas processados</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100/50">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-400 mb-1">Origem ou produção</p>
                                    <p className="text-xl font-bold text-slate-700">Zambézia, Moçambique</p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-50">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                                        <Info className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="text-lg font-black text-slate-700 !mb-0">Detalhes adicionais</h3>
                                </div>
                                <p className="text-slate-500 font-medium leading-relaxed max-w-lg text-lg">
                                    {product.description || "Este produto foi processado sob rigorosos padrões de qualidade internacionais, garantindo a preservação das propriedades naturais e o melhor sabor disponível no mercado."}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="bg-slate-50/50 rounded-agro p-10 border border-slate-100 relative overflow-hidden group">
                                <h4 className="text-xs font-black text-slate-400 mb-8 tracking-widest">Partilhar produto</h4>
                                <div className="flex items-center gap-5">
                                    <button onClick={() => handleShare('whatsapp')} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary shadow-sm border border-slate-100 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                                        <WhatsAppIcon className="w-7 h-7" />
                                    </button>
                                    <button onClick={() => handleShare('facebook')} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
                                        <Facebook className="w-7 h-7" />
                                    </button>
                                    <button onClick={() => handleShare('copy')} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 hover:bg-slate-100 transition-all transform hover:-translate-y-1">
                                        <Share2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-agro p-10 border border-slate-100 shadow-md space-y-8">
                                <h4 className="text-xs font-black text-slate-400 mb-8 flex items-center justify-between tracking-widest">
                                    <span>Variações de interesse</span>
                                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                                </h4>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100/50">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Eye className="w-5 h-5 text-primary" />
                                            <span className="text-[11px] font-black text-slate-400 leading-none">Visitas</span>
                                        </div>
                                        <p className="text-3xl font-black text-slate-800 tracking-tight">1.248</p>
                                    </div>

                                    <div className="bg-slate-50/50 rounded-xl p-6 border border-slate-100/50">
                                        <div className="flex items-center gap-3 mb-3">
                                            <ShoppingCart className="w-5 h-5 text-accent" />
                                            <span className="text-[11px] font-black text-slate-400 leading-none">Interesse</span>
                                        </div>
                                        <p className="text-3xl font-black text-slate-800 tracking-tight">85</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button className="btn-primary w-full py-6 rounded-agro h-auto text-base shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all">
                                    <ShoppingCart className="w-6 h-6" />
                                    Encomendar agora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StandardBlogTemplate>
    );
}
