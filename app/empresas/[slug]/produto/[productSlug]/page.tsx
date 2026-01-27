import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
    params: Promise<{ slug: string; productSlug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { slug, productSlug } = await params;
    const supabase = await createClient();

    const { data: company, error } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .single();

    const slugify = (text: string) => (text || "").toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    if (error || !company) {
        // Fallback for demo
        const fallbackCompanies: Record<string, any> = {
            'agro-industria-zambezia': {
                name: "Agro-Indústria Zambézia",
                header_bg: "/images/Prototipo/sala3.jpg",
                products: [
                    { name: "Castanha de Caju Refinada", price: "500 MT/kg", img: "/images/Prototipo/caju.webp", available: true, description: "Castanha de caju de alta qualidade, processada com os melhores padrões para garantir frescura e sabor incomparáveis." },
                    { name: "Algodão em Fardo", price: "Sob Consulta", img: "/images/Prototipo/algodao.png", available: true, description: "Algodão de fibra longa, ideal para a indústria têxtil, produzido de forma sustentável." },
                    { name: "Sementes Selecionadas", price: "250 MT/pk", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800", available: false, description: "Sementes de alta germinação para garantir uma colheita produtiva e resistente." },
                ]
            },
            'cooperativa-do-norte': {
                name: "Cooperativa do Norte",
                header_bg: "/images/Prototipo/sala5.jpg",
                products: [
                    {
                        name: "FEIJÃO",
                        price: "150 MT/kg",
                        img: "/images/Prototipo/feijao.jpg",
                        available: true,
                        category: "INSUMO",
                        description: "Descrição de alta qualidade para este insumo agrícola."
                    },
                    {
                        name: "MILHO",
                        price: "120 MT/kg",
                        img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800",
                        available: true,
                        category: "INSUMO",
                        description: "Descrição de alta qualidade para este insumo agrícola."
                    },
                    {
                        name: "ARROZ",
                        price: "95.5 MT/kg",
                        img: "https://images.unsplash.com/photo-1586201327693-86619dadb279?q=80&w=800",
                        available: true,
                        category: "INSUMO",
                        description: "Descrição de alta qualidade para este insumo agrícola."
                    },
                    {
                        name: "SOJA",
                        price: "85 MT/kg",
                        img: "https://images.unsplash.com/photo-1582284540020-8acaf01f344a?q=80&w=800",
                        available: true,
                        category: "CEREAL",
                        description: "Soja de alta qualidade para processamento."
                    },
                ]
            },
            'hortas-do-vale': {
                name: "Hortas do Vale",
                header_bg: "/images/Prototipo/sala6.jpg",
                products: [
                    { name: "ARROZ", price: "95.5 MT/kg", img: "https://images.unsplash.com/photo-1586201327693-86619dadb279?q=80&w=800", available: true, category: "INSUMO", description: "Descrição de alta qualidade para este insumo agrícola." },
                    { name: "TOMATE", price: "45 MT/kg", img: "https://images.unsplash.com/photo-1582284540020-8acaf01f344a?q=80&w=800", available: true, category: "HORTA", description: "Tomates frescos do vale." },
                    { name: "CEBOLA", price: "30 MT/kg", img: "https://images.unsplash.com/photo-1580201092675-a0bc6bd6c317?q=80&w=800", available: true, category: "HORTA", description: "Cebolas selecionadas." },
                    { name: "PIMENTÃO", price: "55 MT/kg", img: "https://images.unsplash.com/photo-1566385101042-1a0f08154b9d?q=80&w=800", available: true, category: "HORTA", description: "Pimentões coloridos e frescos." },
                ]
            }
        };

        const companyData = fallbackCompanies[slug];
        if (!companyData) notFound();

        const product = companyData.products.find((p: any) => slugify(p.name || p.nome) === productSlug);
        if (!product) notFound();

        return (
            <ProductDetailClient
                company={companyData}
                product={product}
                companySlug={slug}
            />
        );
    }

    const products = company.products || [];
    const product = products.find((p: any) => slugify(p.name || p.nome) === productSlug);

    if (!product) notFound();

    return (
        <ProductDetailClient
            company={company}
            product={product}
            companySlug={slug}
        />
    );
}
