"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { CheckCircle2, MapPin, Phone, Mail, Globe, Share2, Building2, Package, ArrowRight, Link as LinkIcon, MessageCircle, Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function CompanyProfileClient({ company, slug }: { company: any, slug: string }) {
    const [showCompanyShare, setShowCompanyShare] = useState(false);
    const [activeProductShare, setActiveProductShare] = useState<number | null>(null);

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/empresas/${slug}` : '';

    const handleShare = (type: 'whatsapp' | 'facebook' | 'linkedin' | 'twitter' | 'copy', url: string, title: string) => {
        const text = encodeURIComponent(`Veja esta empresa no BaseAgroData: ${title} - ${url}`);

        switch (type) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${text}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                break;
            case 'copy':
                navigator.clipboard.writeText(url);
                alert('Link copiado para a área de transferência!');
                break;
        }
    };

    return (
        <StandardBlogTemplate
            title={company.name}
            backgroundImage={company.header_bg}
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Empresas", href: "/empresas" },
                { label: company.name }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    {/* Status Card */}
                    <div className="card-agro-static group text-left">
                        <div className="flex items-center gap-2 mb-4">
                            {company.is_verified && <CheckCircle2 className="text-emerald-500 w-5 h-5" />}
                            <span className="font-bold text-sm text-emerald-700 uppercase tracking-wider">
                                {company.is_verified ? "Empresa Verificada" : "Empresa Registada"}
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-4">Atualizado recentemente</p>
                        <button className="btn-primary w-full text-xs">Contactar Empresa</button>
                    </div>

                    {/* Contacts Card */}
                    <div className="card-agro-static group text-left">
                        <h4 className="mb-4">Contactos Diretos</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-slate-400 mt-1" />
                                <span className="text-sm font-medium">{company.address}, {company.province}</span>
                            </li>
                            {company.phone && (
                                <li className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-slate-400 mt-1" />
                                    <span className="text-sm font-medium">{company.phone}</span>
                                </li>
                            )}
                            {company.email && (
                                <li className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-slate-400 mt-1" />
                                    <span className="text-sm font-medium">{company.email}</span>
                                </li>
                            )}
                            {company.website && (
                                <li className="flex items-start gap-3">
                                    <Globe className="w-4 h-4 text-slate-400 mt-1" />
                                    <span className="text-sm font-medium">{company.website}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            }
        >
            <div className="space-y-agro">
                {/* Profile Banner */}
                <div className="relative w-full h-[280px] rounded-agro-lg overflow-hidden shadow-lg border border-slate-100/50">
                    <Image
                        src={company.banner_url || "/images/Prototipo/sala1.jpg"}
                        alt="Company Cover"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 text-left">
                        <div className="flex items-end gap-6 w-full">
                            <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-2xl shrink-0 border border-slate-100 flex items-center justify-center">
                                {company.logo_url ? (
                                    <img src={company.logo_url} alt="Logo" className="w-full h-full object-contain" />
                                ) : (
                                    <Building2 className="w-12 h-12 text-slate-200" />
                                )}
                            </div>
                            <div className="text-white mb-2 flex-1 flex items-end justify-between">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-black mb-1 text-white leading-tight drop-shadow-md uppercase tracking-tighter">
                                        {company.name}
                                    </h1>
                                    <p className="text-white/90 font-medium drop-shadow-sm">{company.activity}</p>
                                </div>
                                {showCompanyShare && (
                                    <div className="absolute right-0 bottom-full mb-2 bg-white/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-full p-2 z-50 flex items-center gap-2 animate-in fade-in zoom-in slide-in-from-bottom-2">
                                        <button
                                            onClick={() => handleShare('whatsapp', shareUrl, company.name)}
                                            className="w-10 h-10 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full transition-all"
                                            title="WhatsApp"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleShare('facebook', shareUrl, company.name)}
                                            className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all"
                                            title="Facebook"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleShare('linkedin', shareUrl, company.name)}
                                            className="w-10 h-10 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white rounded-full transition-all"
                                            title="LinkedIn"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleShare('twitter', shareUrl, company.name)}
                                            className="w-10 h-10 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white rounded-full transition-all"
                                            title="Twitter (X)"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <div className="w-px h-6 bg-slate-200 mx-1" />
                                        <button
                                            onClick={() => handleShare('copy', shareUrl, company.name)}
                                            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:bg-slate-600 hover:text-white rounded-full transition-all"
                                            title="Copiar Link"
                                        >
                                            <LinkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={() => setShowCompanyShare(!showCompanyShare)}
                                    className={`flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white hover:text-orange-600 text-white rounded-full transition-all border border-white/30 shadow-lg ${showCompanyShare ? 'ring-4 ring-orange-500/30 rotate-90' : ''}`}
                                >
                                    <Share2 className="w-6 h-6" />
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-agro-lg text-left">
                    <h2 className="mb-4">Sobre a Empresa</h2>
                    <div className="prose prose-slate max-w-none font-sans text-slate-500">
                        <p>{company.description}</p>
                    </div>
                </div>

                {/* Product Grid Section */}
                <div className="card-agro-lg text-left">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                                <Package className="w-5 h-5" />
                            </div>
                            <h3 className="mb-0 text-xl font-black uppercase tracking-tight">Catálogo de Produtos</h3>
                        </div>
                        <Link
                            href={`/empresas/${slug}/arquivo-produtos`}
                            className="text-sm font-bold text-[#f97316] hover:underline flex items-center gap-1 transition-all"
                        >
                            Ver todos os produtos
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    {company.products && company.products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-agro">
                            {company.products.map((product: any, i: number) => (
                                <div key={i} className="group relative h-[210px] rounded-agro overflow-hidden shadow-md card-interactive transition-all duration-300 cursor-pointer border border-slate-100/50 bg-white">
                                    <Image
                                        src={product.img || product.photo || "/images/Prototipo/caju.webp"}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    <div className="absolute top-3 right-3 z-20">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveProductShare(activeProductShare === i ? null : i);
                                            }}
                                            className="bg-white/20 backdrop-blur-md hover:bg-white hover:text-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center border border-white/30 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Share2 className="w-4 h-4" />
                                        </button>

                                        {activeProductShare === i && (
                                            <div className="absolute right-0 top-full mt-2 bg-white/90 backdrop-blur-md border border-slate-100 shadow-2xl rounded-full p-1 z-50 flex items-center gap-1 animate-in fade-in zoom-in slide-in-from-top-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleShare('whatsapp', shareUrl, product.name); setActiveProductShare(null); }}
                                                    className="w-8 h-8 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-full transition-all"
                                                >
                                                    <MessageCircle className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleShare('facebook', shareUrl, product.name); setActiveProductShare(null); }}
                                                    className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all"
                                                >
                                                    <Facebook className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleShare('linkedin', shareUrl, product.name); setActiveProductShare(null); }}
                                                    className="w-8 h-8 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white rounded-full transition-all"
                                                >
                                                    <Linkedin className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleShare('twitter', shareUrl, product.name); setActiveProductShare(null); }}
                                                    className="w-8 h-8 flex items-center justify-center text-sky-500 hover:bg-sky-500 hover:text-white rounded-full transition-all"
                                                >
                                                    <Twitter className="w-4 h-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end h-full">
                                        <h4 className="text-[17px] font-black text-white mb-1 line-clamp-2 leading-tight uppercase tracking-tight group-hover:mb-2 transition-all">
                                            {product.name}
                                        </h4>

                                        <div className="max-h-0 opacity-0 group-hover:max-h-6 group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden mb-1">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest ${product.available ? 'text-emerald-400' : 'text-red-400'}`}>
                                                ● {product.available ? 'Disponível' : 'Indisponível'}
                                            </span>
                                        </div>

                                        <p className="text-[#f97316] font-black text-[16px] drop-shadow-sm mb-1">
                                            {product.price}
                                        </p>

                                        <div className="flex items-center gap-1 text-white/90 text-[11px] font-bold mt-2 hover:text-white transition-colors">
                                            <span>Ver detalhes</span>
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center border border-slate-100 border-dashed rounded-2xl">
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Nenhum produto listado</p>
                        </div>
                    )}
                </div>
            </div>
        </StandardBlogTemplate>
    );
}
