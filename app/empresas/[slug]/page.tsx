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
                        name: "Castanha de Caju Refinada",
                        price: "500 MT/kg",
                        img: "/images/Prototipo/caju.webp",
                        available: true,
                        category: "Processados",
                        description: "Castanha de caju de alta qualidade, processada localmente com rigorosos padrões de higiene."
                    },
                    {
                        name: "Algodão em Fardo",
                        price: "Sob Consulta",
                        img: "/images/Prototipo/algodao.png",
                        available: true,
                        category: "Fibras",
                        description: "Algodão de fibra longa, ideal para a indústria têxtil nacional e internacional."
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
                        name: "Feijão Manteiga",
                        price: "65 MT/kg",
                        img: "/images/Prototipo/feijao.jpg",
                        available: true,
                        category: "Leguminosas",
                        description: "Feijão manteiga fresco e nutritivo, ideal para consumo doméstico e industrial."
                    },
                    {
                        name: "Milho Branco",
                        price: "18 MT/kg",
                        img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=800",
                        available: true,
                        category: "Cereais",
                        description: "Milho branco de alta qualidade para consumo e indústria."
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
                    { name: "Óleo Vegetal Natural", price: "120 MT/L", img: "/images/Prototipo/oleo.webp", available: true },
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
