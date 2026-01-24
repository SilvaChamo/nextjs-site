import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckCircle2, MapPin, Phone, Mail, Globe, MessageCircle, Share2, Facebook, Building2 } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CompanyDirectoryPage({ params }: PageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: company, error } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !company) {
        notFound();
    }

    const products = company.products || [];
    const isVerified = company.is_verified || company.is_featured;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-[1350px] mx-auto px-4 md:px-[60px] py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Info */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Hero Header */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center">
                                        {company.logo_url ? (
                                            <Image
                                                src={company.logo_url}
                                                alt={company.name}
                                                width={128}
                                                height={128}
                                                className="object-contain"
                                            />
                                        ) : (
                                            <Building2 className="w-12 h-12 text-slate-200" />
                                        )}
                                    </div>
                                    {isVerified && (
                                        <div className="absolute -right-2 -top-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h1 className="text-3xl font-black text-slate-900 leading-tight">
                                                {company.name}
                                            </h1>
                                            {isVerified && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                                        </div>
                                        <p className="text-emerald-600 font-bold uppercase text-xs tracking-widest">
                                            {company.activity}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-orange-500" />
                                            {company.province}, {company.address}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                                                {company.value_chain}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-4">
                            <h2 className="text-slate-900 font-black text-[13px] tracking-[0.3em] uppercase border-b border-slate-50 pb-4">
                                Sobre a Empresa
                            </h2>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {company.description}
                            </p>
                        </section>

                        {/* Products Catalog */}
                        <section className="space-y-6">
                            <h2 className="text-slate-900 font-black text-[13px] tracking-[0.3em] uppercase px-4">
                                Catálogo de Produtos
                            </h2>

                            {products.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {products.map((p: any, i: number) => (
                                        <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col">
                                            {p.photo && (
                                                <div className="aspect-[16/10] overflow-hidden relative">
                                                    <Image
                                                        src={p.photo}
                                                        alt={p.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-lg font-black text-slate-800 leading-tight">
                                                            {p.name}
                                                        </h3>
                                                        <span className="text-emerald-600 font-black text-sm whitespace-nowrap ml-4">
                                                            {p.price ? (p.price.includes('MT') ? p.price : `${p.price} MT`) : 'Sob Consulta'}
                                                        </span>
                                                    </div>
                                                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                                                        {p.description}
                                                    </p>
                                                </div>

                                                <div className="flex gap-2 pt-4">
                                                    <a
                                                        href={`https://wa.me/${company.contact?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Olá! Vi o vosso produto na Botánica AI e gostaria de mais informações:\n\n*Produto:* ${p.name}\n*Empresa:* ${company.name}`)}`}
                                                        target="_blank"
                                                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95"
                                                    >
                                                        <MessageCircle className="w-4 h-4" />
                                                        Comprar
                                                    </a>
                                                    <a
                                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://agrodata.co.mz/directory/${slug}`)}`}
                                                        target="_blank"
                                                        className="px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl flex items-center justify-center transition-all active:scale-95"
                                                    >
                                                        <Facebook className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-100 border-dashed">
                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                        Nenhum produto listado no momento
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Contacts Card */}
                        <div className="bg-[#1e293b] rounded-[2rem] p-8 text-white space-y-6">
                            <h3 className="text-white font-black text-[11px] tracking-[0.2em] uppercase opacity-50">
                                Contactos Oficiais
                            </h3>

                            <div className="space-y-4">
                                <a href={`tel:${company.contact}`} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-orange-500 transition-colors">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">Telemóvel</p>
                                        <p className="text-sm font-bold">{company.contact}</p>
                                    </div>
                                </a>

                                <a href={`mailto:${company.email}`} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-emerald-500 transition-colors">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">E-mail</p>
                                        <p className="text-sm font-bold truncate">{company.email}</p>
                                    </div>
                                </a>
                            </div>

                            <div className="pt-6 border-t border-white/5 space-y-4">
                                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95">
                                    Falar Agora via WhatsApp
                                </button>

                                <div className="flex gap-2">
                                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl border border-white/10 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                                        <Share2 className="w-3 h-3" /> Partilhar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Location Mini Map Mockup */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-4">
                            <h3 className="text-slate-400 font-black text-[11px] tracking-[0.2em] uppercase">
                                Localização
                            </h3>
                            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-100">
                                <Image
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                                    alt="Mapa"
                                    fill
                                    className="object-cover opacity-50 grayscale"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <MapPin className="w-8 h-8 text-orange-500 animate-bounce" />
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                {company.address}, {company.province} - Moçambique
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}


