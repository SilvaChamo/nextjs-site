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
        // Fallback for demo if DB is not populated with the exact slugs
        const fallbackCompanies: Record<string, any> = {
            'agro-industria-zambezia': {
                id: '99999999-9999-9999-9999-999999999991',
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
                services: ["Processamento de Caju", "Exportação Agrícola", "Apoio ao Produtor", "Consultoria Técnica"],
                products: [
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
                        name: "FEIJÃO",
                        price: "150 MT/kg",
                        img: "/images/Prototipo/feijao.jpg",
                        available: true,
                        category: "INSUMO",
                        description: "Descrição de alta qualidade para este insumo agrícola."
                    },
                    {
                        name: "CAJU",
                        price: "450 MT/kg",
                        img: "/images/Prototipo/caju.webp",
                        available: true,
                        category: "PROCESSADO",
                        description: "Castanha de caju de alta qualidade."
                    },
                ]
            },
            'cooperativa-do-norte': {
                id: '99999999-9999-9999-9999-999999999992',
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
                services: ["Processamento de Caju", "Exportação Agrícola", "Apoio ao Produtor", "Consultoria Técnica"],
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
                id: '99999999-9999-9999-9999-999999999993',
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
                services: ["Horticultura de Precisão", "Distribuição Nacional", "Sistemas de Irrigação"],
                products: [
                    { name: "ARROZ", price: "95.5 MT/kg", img: "https://images.unsplash.com/photo-1586201327693-86619dadb279?q=80&w=800", available: true, category: "INSUMO", description: "Descrição de alta qualidade para este insumo agrícola." },
                    { name: "TOMATE", price: "45 MT/kg", img: "https://images.unsplash.com/photo-1582284540020-8acaf01f344a?q=80&w=800", available: true, category: "HORTA", description: "Tomates frescos do vale." },
                    { name: "CEBOLA", price: "30 MT/kg", img: "https://images.unsplash.com/photo-1580201092675-a0bc6bd6c317?q=80&w=800", available: true, category: "HORTA", description: "Cebolas selecionadas." },
                    { name: "PIMENTÃO", price: "55 MT/kg", img: "https://images.unsplash.com/photo-1566385101042-1a0f08154b9d?q=80&w=800", available: true, category: "HORTA", description: "Pimentões coloridos e frescos." },
                ]
            }
        };

        if (fallbackCompanies[slug]) {
            return (
                <CompanyProfileClient
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
        <CompanyProfileClient
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
