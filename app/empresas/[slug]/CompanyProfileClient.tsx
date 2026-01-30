"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { CheckCircle2, MapPin, Phone, Mail, Globe, Share2, Building2, Package, ArrowRight, Link as LinkIcon, MessageCircle, Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const WhatsAppIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className || "w-5 h-5"}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
);

export default function CompanyProfileClient({ company, slug }: { company: any, slug: string }) {
    const [showCompanyShare, setShowCompanyShare] = useState(false);
    const [activeProductShare, setActiveProductShare] = useState<number | null>(null);

    const [mounted, setMounted] = React.useState(false);
    const [shareUrl, setShareUrl] = React.useState('');

    React.useEffect(() => {
        setMounted(true);
        setShareUrl(`${window.location.origin}/empresas/${slug}`);
    }, [slug]);

    const slugify = (text: string) => (text || "").toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

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
                { label: "Repositório", href: "/repositorio" },
                { label: "Empresas", href: "/empresas" },
                { label: company.name }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    {/* Status & Contacts Combined Card (including Address) - TOP PRIORITY */}
                    <div className="card-agro-static text-left space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {company.is_verified && <CheckCircle2 className="text-emerald-500 w-5 h-5" />}
                                <span className="font-bold text-sm text-emerald-700 uppercase tracking-wider">
                                    {company.is_verified ? "Empresa Verificada" : "Empresa Registada"}
                                </span>
                            </div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Bio-segurança & Qualidade</p>
                        </div>

                        <div className="pt-4 border-t border-slate-50 space-y-4">
                            <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Dados de Contacto</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-700 leading-tight mb-0.5">{company.address || "Endereço não disponível"}</p>
                                        <p className="text-[11px] font-medium text-slate-400">
                                            {company.district ? `${company.district}, ` : ''}{company.province}, Moçambique
                                        </p>
                                    </div>
                                </li>
                                {company.phone && (
                                    <li className="flex items-start gap-3">
                                        <Phone className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                                        <span className="text-sm font-medium text-slate-600">{company.phone}</span>
                                    </li>
                                )}
                                {company.email && (
                                    <li className="flex items-start gap-3">
                                        <Mail className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                                        <span className="text-sm font-medium text-slate-600 truncate">{company.email}</span>
                                    </li>
                                )}
                                {company.website && (
                                    <li className="flex items-start gap-3">
                                        <Globe className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                                        <span className="text-sm font-medium text-slate-600 truncate">{company.website}</span>
                                    </li>
                                )}
                            </ul>
                        </div>

                        <a
                            href={`https://wa.me/${company.phone?.replace(/\s+/g, '') || ''}?text=${encodeURIComponent(`Olá, vi o perfil da ${company.name} no BaseAgroData e gostaria de saber mais.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full py-3 flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 hover:scale-[1.02] active:scale-95 transition-all h-auto"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            <span className="text-sm font-bold uppercase tracking-tight">Contactar Empresa</span>
                        </a>
                    </div>

                    {/* QR Code Section - BELOW CONTACTS */}
                    <div className="card-agro-static text-center py-6">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Acesso Rápido</h4>
                        <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm inline-block mb-3 min-w-[112px] min-h-[112px]">
                            {mounted && (
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(shareUrl)}`}
                                    alt="QR Code Empresa"
                                    className="w-28 h-28"
                                />
                            )}
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 leading-tight px-4 capitalize">Aceda ao perfil digital<br />através do seu smartphone</p>
                    </div>

                </div>
            }
            bottomFullWidthContent={
                /* Map Section - Stretched at bottom */
                <div className="card-agro p-0 overflow-hidden h-[220px] md:h-[300px] relative group">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(company.address + ', ' + company.province + ', Mozambique')}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                        allowFullScreen
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-100 shadow-xl pointer-events-none group-hover:opacity-0 transition-opacity">
                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest flex items-center gap-2 mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            Localização Geográfica
                        </p>
                        <p className="text-[10px] font-bold text-slate-500 leading-tight">
                            {company.address}<br />
                            {company.province}, Moçambique
                        </p>
                    </div>
                </div>
            }
        >
            <div className="space-y-agro">
                {/* Profile Banner */}
                <div className="relative w-full h-[220px] rounded-agro overflow-hidden shadow-lg border border-slate-100/50 group/banner">
                    {/* CERTIFICATION SEAL - TOP RIGHT */}
                    {company.is_verified && (
                        <div className="absolute top-4 right-4 z-40 animate-in fade-in zoom-in duration-700">
                            <div className="bg-emerald-600/95 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-2xl border border-white/20 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">Certificado</span>
                            </div>
                        </div>
                    )}

                    <Image
                        src={company.banner_url || "/images/Prototipo/sala1.jpg"}
                        alt="Company Cover"
                        fill
                        className="object-cover transition-transform duration-700 group-hover/banner:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex items-end p-6 md:p-8 text-left">
                        <div className="flex items-end gap-4 md:gap-6 w-full translate-y-2 md:translate-y-4">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-agro p-2 shadow-2xl shrink-0 border-4 border-white flex items-center justify-center relative z-10">
                                {company.logo_url ? (
                                    <img src={company.logo_url} alt="Logo" className="w-full h-full object-contain" />
                                ) : (
                                    <Building2 className="w-10 h-10 md:w-14 md:h-14 text-slate-200" />
                                )}
                            </div>
                            <div className="text-white mb-2 md:mb-4 flex-1 flex items-end justify-between min-w-0">
                                <div className="min-w-0 flex-1 relative">
                                    <h1 className="text-xl md:text-3xl font-black mb-1 text-white leading-tight drop-shadow-lg uppercase truncate">
                                        {company.name}
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <div className="h-[1px] w-6 bg-[#f97316] opacity-70" />
                                        <p className="text-white/80 font-medium text-[11px] md:text-xs tracking-wider drop-shadow-sm truncate first-letter:uppercase lowercase">
                                            {(company.activity || company.category || "Empresa de agronegócio").substring(0, 50)}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative z-50 ml-4">
                                    <button
                                        onClick={() => setShowCompanyShare(!showCompanyShare)}
                                        className={`flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md hover:bg-white hover:text-[#f97316] text-white rounded-full transition-all border border-white/20 shadow-lg ${showCompanyShare ? 'rotate-90 bg-white text-[#f97316]' : ''}`}
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>

                                    {showCompanyShare && (
                                        <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-2xl p-1.5 flex flex-row items-center gap-1.5 animate-in fade-in zoom-in slide-in-from-top-2 duration-300 z-[100]">
                                            <button
                                                onClick={() => handleShare('whatsapp', shareUrl, company.name)}
                                                className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-600 hover:bg-emerald-500 hover:text-white rounded-xl transition-all"
                                                title="WhatsApp"
                                            >
                                                <WhatsAppIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleShare('facebook', shareUrl, company.name)}
                                                className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                                                title="Facebook"
                                            >
                                                <Facebook className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleShare('linkedin', shareUrl, company.name)}
                                                className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-600 hover:bg-blue-700 hover:text-white rounded-xl transition-all"
                                                title="LinkedIn"
                                            >
                                                <Linkedin className="w-4 h-4" />
                                            </button>
                                            <div className="w-px h-6 bg-slate-100 mx-0.5" />
                                            <button
                                                onClick={() => handleShare('copy', shareUrl, company.name)}
                                                className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-400 hover:bg-slate-600 hover:text-white rounded-xl transition-all"
                                                title="Copiar Link"
                                            >
                                                <LinkIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Who We Are & MVV Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-agro items-stretch">
                    <div className="card-agro text-left flex flex-col">
                        <h2 className="mb-4">Quem Somos</h2>
                        <div className="prose prose-slate max-w-none font-sans text-slate-500 leading-relaxed flex-1">
                            <p className="whitespace-pre-wrap">{company.description}</p>
                        </div>
                    </div>

                    <div className="space-y-agro flex flex-col h-full">
                        {company.mission && (
                            <div className="card-agro text-left border-t-4 border-t-emerald-500 flex-1">
                                <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-3">Missão</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{company.mission}</p>
                            </div>
                        )}
                        {company.vision && (
                            <div className="card-agro text-left border-t-4 border-t-emerald-500 flex-1">
                                <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-3">Visão</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{company.vision}</p>
                            </div>
                        )}
                        {company.values && (
                            <div className="card-agro text-left border-t-4 border-t-emerald-500 flex-1">
                                <h4 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-3">Valores</h4>
                                <div className="text-sm text-slate-500 leading-relaxed space-y-2">
                                    {company.values.split('\n').map((line: string, i: number) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Services Provided Section */}
                <div className="card-agro text-left">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h2 className="mb-0 text-xl font-black uppercase tracking-tight">Serviços Prestados</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {company.services ? (
                            Array.isArray(company.services) ? company.services.map((service: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 border border-slate-100 group hover:border-emerald-200 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                                    <span className="text-sm font-bold text-slate-700">{service}</span>
                                </div>
                            )) : (
                                <div className="col-span-full p-4 rounded-xl bg-slate-50/50 border border-slate-100">
                                    <p className="text-sm font-medium text-slate-600">{company.services}</p>
                                </div>
                            )
                        ) : (
                            <div className="col-span-full py-8 text-center border border-slate-100 border-dashed rounded-2xl grayscale opacity-60">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lista de serviços disponível sob consulta</p>
                                <p className="text-[10px] font-medium text-slate-300 mt-1">Contacte a empresa para mais detalhes sobre soluções personalizadas</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Grid Section */}
                <div className="card-agro text-left">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-50 text-[#f97316] rounded-xl flex items-center justify-center border border-orange-100/50 shadow-sm">
                                <Package className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-0">
                                Catálogo de Produtos
                            </h3>
                        </div>
                        <Link
                            href={`/produtos?empresa_id=${company.id}`}
                            className="text-sm font-bold text-[#f97316] hover:underline flex items-center gap-1 transition-all"
                        >
                            Ver todos os produtos
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </div>

                    {company.products && company.products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-agro">
                            {company.products.slice(0, 3).map((product: any, i: number) => (
                                <Link
                                    key={i}
                                    href={`/empresas/${slug}/produto/${slugify(product.name || product.nome)}`}
                                    className="group bg-white rounded-agro overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-all flex flex-col h-full"
                                >
                                    {/* Product Image + Category Badge */}
                                    <div className="relative h-44 w-full overflow-hidden">
                                        <Image
                                            src={product.image_url || product.img || product.photo || "/images/Prototipo/caju.webp"}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        {product.category && (
                                            <div className="absolute top-3 left-3 z-10">
                                                <span className="bg-white/95 backdrop-blur-sm text-[10px] font-black text-emerald-600 uppercase tracking-widest px-2 py-1 rounded-md shadow-sm">
                                                    {product.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>


                                    {/* Product Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h4 className="text-[17px] font-black text-slate-800 mb-1 uppercase tracking-tight line-clamp-1">
                                            {product.name}
                                        </h4>
                                        <p className="text-slate-400 text-xs font-medium leading-relaxed mb-2 line-clamp-2">
                                            {product.description || "Descrição breve do produto disponível sob consulta."}
                                        </p>

                                        <div>
                                            <p className="text-emerald-600 font-black text-[18px] mb-1.5">
                                                {typeof product.price === 'number' ? `${product.price.toLocaleString('pt-MZ')} MT` : product.price}
                                            </p>

                                            <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-[#f97316] text-[11px] font-black uppercase tracking-wider group-hover:gap-2 transition-all">
                                                    <span>DETALHES</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </div>

                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${product.available !== false ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${product.available !== false ? 'text-emerald-500' : 'text-red-500'}`}>
                                                        {product.available !== false ? 'Disponível' : 'Indisponível'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center border border-slate-100 border-dashed rounded-agro">
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Nenhum produto listado</p>
                        </div>
                    )}
                </div>

            </div>
        </StandardBlogTemplate>
    );
}
