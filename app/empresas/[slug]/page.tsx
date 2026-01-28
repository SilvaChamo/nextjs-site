import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import CompanyProfileClient from './CompanyProfileClient';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CompanyEmpresasPage({ params }: PageProps) {
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

    // Fetch products belonging to this company
    const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false });

    const products = productsData || [];
    const isVerified = company.is_verified || company.is_featured;

    return (
        <CompanyProfileClient
            company={{
                ...company,
                banner_url: company.banner_url || "/images/Prototipo/sala1.jpg",
                header_bg: company.header_bg || company.banner_url || "/images/Prototipo/sala3.jpg",
                products: products,
                is_verified: isVerified
            }}
            slug={slug}
        />
    );
}
