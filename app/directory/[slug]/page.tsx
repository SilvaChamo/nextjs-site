import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { StandardBlogTemplate } from "@/components/StandardBlogTemplate";
import { CheckCircle2, MapPin, Phone, Mail, Globe, MessageCircle, Share2, Facebook, Building2, Package, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
        // Fallback for demo if DB is not populated with the exact slugs
        const fallbackCompanies: Record<string, any> = {
            'agro-industria-zambezia': {
                name: "Agro-Indústria Zambézia",
                activity: "Processamento de Castanha de Caju e Algodão",
                description: "A Agro-Indústria Zambézia é líder no processamento e exportação de castanha de caju na região centro de Moçambique. Fundada em 2010, nossa missão é agregar valor à produção local e garantir preços justos aos pequenos produtores.",
                province: "Zambézia",
                address: "Av. 25 de Setembro, Quelimane",
                phone: "+258 84 123 4567",
                email: "info@zambezia.co.mz",
                website: "www.zambezia.co.mz",
                logo_url: "https://placehold.co/100x100/f97316/white?text=LOGO",
                banner_url: "/images/Prototipo/sala1.jpg",
                header_bg: "/images/Prototipo/sala3.jpg",
                is_verified: true,
                products: [
                    { name: "Castanha de Caju Refinada", price: "500 MT/kg", img: "/images/Prototipo/caju.webp", available: true },
                    { name: "Algodão em Fardo", price: "Sob Consulta", img: "/images/Prototipo/algodao.png", available: true },
                    { name: "Sementes Selecionadas", price: "250 MT/pk", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800", available: false },
                ]
            },
            'cooperativa-do-norte': {
                name: "Cooperativa do Norte",
                activity: "Produção de cereais e leguminosas",
                description: "Especializada na produção e comercialização de milho, feijão e soja de alta qualidade.",
                province: "Nampula",
                address: "Rua do Comércio, Nampula",
                phone: "+258 82 987 6543",
                email: "contato@coopnorte.co.mz",
                website: "www.coopnorte.co.mz",
                logo_url: "https://placehold.co/100x100/10b981/white?text=LOGO",
                banner_url: "/images/Prototipo/sala2.jpg",
                header_bg: "/images/Prototipo/sala5.jpg",
                is_verified: true,
                products: [
                    { name: "Feijão Manteiga", price: "65 MT/kg", img: "/images/Prototipo/feijao.jpg", available: true },
                    { name: "Milho Branco", price: "18 MT/kg", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800", available: true },
                ]
            },
            'hortas-do-vale': {
                name: "Hortas do Vale",
                activity: "Horticultura e fruticultura",
                description: "Produção sustentável de vegetais frescos e frutas tropicais para o mercado nacional.",
                province: "Sofala",
                address: "Estrada Nacional 1, Chimoio",
                phone: "+258 85 555 1234",
                email: "vendas@hortasvalle.co.mz",
                website: "www.hortasvalle.co.mz",
                logo_url: "https://placehold.co/100x100/3b82f6/white?text=LOGO",
                banner_url: "/images/Prototipo/sala3.jpg",
                header_bg: "/images/Prototipo/sala6.jpg",
                is_verified: false,
                products: [
                    { name: "Óleo Vegetal Natural", price: "120 MT/L", img: "/images/Prototipo/oleo.webp", available: true },
                ]
            }
        };

        if (fallbackCompanies[slug]) {
            return (
                <CompanyLayout
                    company={fallbackCompanies[slug]}
                    slug={slug}
                />
            );
        }

        notFound();
    }

    const products = company.products || [];
    const isVerified = company.is_verified || company.is_featured;

    return (
        <CompanyLayout
            company={{
                ...company,
                banner_url: company.banner_url || "/images/Prototipo/sala1.jpg",
                header_bg: company.header_bg || "/images/Prototipo/sala3.jpg",
                products: products,
                is_verified: isVerified
            }}
            slug={slug}
        />
    );
}

// Sub-component to share the layout between real and fallback data
function CompanyLayout({ company, slug }: { company: any, slug: string }) {
    return (
        <StandardBlogTemplate
            title={company.name}
            backgroundImage={company.header_bg}
            breadcrumbs={[
                { label: "Início", href: "/" },
                { label: "Directório", href: "/directory" },
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
                        src={company.banner_url}
                        alt="Company Cover"
                        fill
                        className="object-cover"
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
                                <div className="relative">
                                    <button
                                        className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white hover:text-orange-600 text-white rounded-full transition-all border border-white/30"
                                    >
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
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
                    </div>

                    {company.products && company.products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-agro">
                            {company.products.map((product: any, i: number) => (
                                <div key={i} className="group relative h-[210px] rounded-agro overflow-hidden shadow-md card-interactive transition-all duration-300 cursor-pointer border border-slate-100/50 bg-white">
                                    <Image
                                        src={product.img || product.photo}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button className="bg-white/20 backdrop-blur-md hover:bg-white hover:text-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center border border-white/30">
                                            <Share2 className="w-4 h-4" />
                                        </button>
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



