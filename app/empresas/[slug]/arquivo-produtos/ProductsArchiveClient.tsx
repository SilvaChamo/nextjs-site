"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { Package, ArrowRight, Share2, Search, Filter, MessageCircle, Link as LinkIcon, Building2, Facebook, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function ProductsArchiveClient({ company, slug, products }: { company: any, slug: string, products: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeProductShare, setActiveProductShare] = useState<number | null>(null);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/empresas/${slug}/arquivo-produtos` : '';

    const handleShare = (type: 'whatsapp' | 'facebook' | 'linkedin' | 'twitter' | 'copy', url: string, title: string) => {
        const text = encodeURIComponent(`Veja os produtos de ${company.name} no BaseAgroData: ${title} - ${url}`);

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
            title={`Produtos - ${company.name}`}
            backgroundImage={company.header_bg || "/images/Prototipo/sala2.jpg"}
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Empresas", href: "/empresas" },
                { label: company.name, href: `/empresas/${slug}` },
                { label: "Arquivo de Produtos", href: `/empresas/${slug}/arquivo-produtos` }
            ]}
            sidebarComponents={
                <div className="space-y-agro">
                    <div className="card-agro-static">
                        <h4 className="flex items-center gap-2 mb-6">
                            <Filter className="w-4 h-4 text-emerald-600" />
                            Filtrar Produtos
                        </h4>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Categorias</label>
                                <div className="space-y-2">
                                    {['Todos', 'Cereais', 'Processados', 'Sementes'].map((cat, i) => (
                                        <label key={i} className="flex items-center gap-2 cursor-pointer group">
                                            <input type="radio" name="category" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" defaultChecked={i === 0} />
                                            <span className="text-sm font-medium text-slate-600 group-hover:text-emerald-700">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <button className="btn-primary w-full shadow-emerald-200/50">
                                Pesquisar
                            </button>
                        </div>
                    </div>

                    {/* Company Info Card */}
                    <div className="card-agro-static text-center py-8">
                        <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-md mx-auto mb-4 border border-slate-100 flex items-center justify-center">
                            {company.logo_url ? (
                                <img src={company.logo_url} alt="Logo" className="w-full h-full object-contain" />
                            ) : (
                                <Building2 className="w-8 h-8 text-slate-200" />
                            )}
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{company.name}</p>
                        <Link href={`/empresas/${slug}`} className="text-xs font-bold text-emerald-600 hover:underline">
                            Ver Perfil Completo
                        </Link>
                    </div>
                </div>
            }
        >
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative group max-w-lg flex-1">
                        <input
                            type="text"
                            placeholder={`Pesquisar nos produtos da ${company.name}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-white rounded-agro border border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-agro pb-12">
                        {filteredProducts.map((product, i) => (
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
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${product.available !== false ? 'text-emerald-400' : 'text-red-400'}`}>
                                            ● {product.available !== false ? 'Disponível' : 'Indisponível'}
                                        </span>
                                    </div>

                                    <p className="text-[#f97316] font-black text-[16px] drop-shadow-sm mb-1">
                                        {product.price}
                                    </p>

                                    <div className="flex items-center gap-1 text-white/90 text-[11px] font-bold mt-2 hover:text-white transition-colors">
                                        <span>Ver detalhes</span>
                                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-2" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center border border-slate-100 border-dashed rounded-3xl bg-slate-50/50">
                        <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Nenhum produto encontrado</p>
                    </div>
                )}
            </div>
        </StandardBlogTemplate>
    );
}
