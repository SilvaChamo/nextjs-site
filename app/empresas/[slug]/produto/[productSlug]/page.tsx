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

    const slugify = (text: string) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

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
                    { name: "Feijão Manteiga", price: "65 MT/kg", img: "/images/Prototipo/feijao.jpg", available: true, description: "Feijão manteiga fresco e nutritivo, colhido nas terras férteis do norte." },
                    { name: "Milho Branco", price: "18 MT/kg", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800", available: true, description: "Milho branco de grão cheio, perfeito para moagem e consumo directo." },
                ]
            },
            'hortas-do-vale': {
                name: "Hortas do Vale",
                header_bg: "/images/Prototipo/sala6.jpg",
                products: [
                    { name: "Óleo Vegetal Natural", price: "120 MT/L", img: "/images/Prototipo/oleo.webp", available: true, description: "Óleo vegetal 100% natural, prensado a frio para manter todas as propriedades nutricionais." },
                ]
            }
        };

        const companyData = fallbackCompanies[slug];
        if (!companyData) notFound();

        const product = companyData.products.find((p: any) => slugify(p.name) === productSlug);
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
    const product = products.find((p: any) => slugify(p.name) === productSlug);

    if (!product) notFound();

    return (
        <ProductDetailClient
            company={company}
            product={product}
            companySlug={slug}
        />
    );
}
