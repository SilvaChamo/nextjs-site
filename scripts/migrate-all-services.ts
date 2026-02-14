import { createClient } from "@supabase/supabase-js";
import { servicesData } from "../lib/services-data";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const innovationServices = [
    {
        title: "Apresentações Visuais",
        slug: "apresentacoes",
        description: "Editor de slides interativos para catálogos e relatórios.",
        fullDescription: "Ferramenta profissional para criação de apresentações dinâmicas voltadas ao agronegócio. Permite a criação de catálogos de produtos, relatórios de colheita e materiais de formação com um editor intuitivo e interativo.",
        category: "Inovação",
        icon: "Monitor",
        subServices: [
            { title: "Editor de Slides", description: "Criação de páginas personalizadas com texto e imagem." },
            { title: "Exportação PDF/PPT", description: "Descarregue o seu trabalho em formatos padrão." },
            { title: "Partilha Online", description: "Envie links diretos para os seus clientes e parceiros." }
        ],
        features: ["Editor Intuitivo", "Templates Agro", "Partilha Fácil"]
    },
    {
        title: "Repositório Científico",
        slug: "repositorio-cientifico",
        description: "Pesquisa dinâmica e semântica de artigos académicos.",
        fullDescription: "Base de dados centralizada que reúne a produção científica e técnica sobre a agricultura em Moçambique. Facilita o acesso a teses, artigos e relatórios técnicos para apoiar a tomada de decisão baseada em evidências.",
        category: "Inovação",
        icon: "Search",
        subServices: [
            { title: "Pesquisa Académica", description: "Acesso a milhares de artigos técnicos e científicos." },
            { title: "Gestão Documental", description: "Organização por categorias e autores de prestígio." },
            { title: "Download de Papers", description: "Acesso direto a conteúdos em formato digital." }
        ],
        features: ["Foco Académico", "Dados Verificados", "Interface Semântica"]
    },
    {
        title: "AgroBotanica AI",
        slug: "agrobotanica",
        description: "Scanner inteligente para diagnóstico de pragas e doenças.",
        fullDescription: "Solução de inteligência artificial que utiliza a câmara do telemóvel para identificar pragas e doenças em culturas agrícolas. Oferece diagnósticos em tempo real e recomendações de tratamento baseadas em normas nacionais.",
        category: "Inovação",
        icon: "Zap",
        subServices: [
            { title: "Identificação de Pragas", description: "Scanner visual para detecção imediata de ameaças." },
            { title: "Recomendações Técnicas", description: "Sugestões de tratamento e maneio sustentável." },
            { title: "Histórico de Diagnóstico", description: "Acompanhamento da evolução da saúde do campo." }
        ],
        features: ["Inteligência Artificial", "Diagnóstico Real", "Fácil de Usar"]
    },
    {
        title: "Identidade Digital",
        slug: "perfil-digital",
        description: "Perfis profissionais e cartões de visita com QR Code.",
        fullDescription: "Crie a sua presença profissional no agro-negócio com perfis digitais personalizáveis e cartões de visita interativos. Utilize tecnologia QR Code para partilhar os seus contactos e catálogo de serviços de forma instantânea.",
        category: "Inovação",
        icon: "Users",
        subServices: [
            { title: "Cartão Digital", description: "Partilha rápida de contactos via QR Code." },
            { title: "Perfil de Empresa", description: "Página dedicada com as suas principais informações." },
            { title: "Analytics de Acesso", description: "Saiba quem visitou o seu perfil digital." }
        ],
        features: ["Networking Moderno", "Sustentável", "Fácil Partilha"]
    }
];

async function migrateAll() {
    console.log("🚀 Starting Global Migration...");

    // 1. Migrate Standard Services from services-data.ts
    for (const categoryId in servicesData) {
        const category = servicesData[categoryId];
        console.log(`\n📦 Category: ${category.title}`);

        for (const slug in category.subCategories) {
            const service = category.subCategories[slug];

            const dataToInsert = {
                title: service.title,
                description: service.description,
                full_description: service.fullDescription,
                slug: service.slug,
                category: category.title,
                icon: service.slug.charAt(0).toUpperCase() + service.slug.slice(1),
                sub_services: service.subServices,
                features: service.features,
                is_active: true,
                updated_at: new Date().toISOString()
            };

            const { error } = await supabase
                .from("services")
                .upsert(dataToInsert, { onConflict: "slug" });

            if (error) {
                console.error(`❌ Error migrating ${service.slug}:`, error.message);
            } else {
                console.log(`✅ Migrated: ${service.slug}`);
            }
        }
    }

    // 2. Migrate Innovation Services
    console.log("\n⚡ Migrating Innovation Services...");
    for (const service of innovationServices) {
        const dataToInsert = {
            title: service.title,
            description: service.description,
            full_description: service.fullDescription,
            slug: service.slug,
            category: service.category,
            icon: service.icon,
            sub_services: service.subServices,
            features: service.features,
            is_active: true,
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from("services")
            .upsert(dataToInsert, { onConflict: "slug" });

        if (error) {
            console.error(`❌ Error migrating ${service.slug}:`, error.message);
        } else {
            console.log(`✅ Migrated: ${service.slug}`);
        }
    }

    console.log("\n🏁 Migration Finished Successfully!");
}

migrateAll();
