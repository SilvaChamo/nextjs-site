import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
    params: Promise<{ slug: string; productSlug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { slug, productSlug } = await params;
    const supabase = await createClient();

    // 1. Fetch the company
    const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('slug', slug)
        .single();

    if (companyError || !company) {
        notFound();
    }

    const slugify = (text: string) => (text || "").toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

    // 2. Fetch all products for this company to match the slug
    const { data: allProducts } = await supabase
        .from('products')
        .select('*')
        .eq('company_id', company.id);

    const finalProduct = (allProducts || []).find((p: { name?: string; nome?: string }) => slugify(p.name || p.nome || "") === productSlug);

    if (!finalProduct) notFound();

    return (
        <ProductDetailClient
            company={{
                ...company,
                banner_url: company.banner_url || "/images/Prototipo/sala1.jpg",
                header_bg: company.header_bg || company.banner_url || "/images/Prototipo/sala3.jpg",
            }}
            product={finalProduct}
            companySlug={slug}
        />
    );
}
