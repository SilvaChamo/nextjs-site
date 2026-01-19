import { Building2, ShoppingBag, Users, FileText, Tractor, Sprout, FlaskConical, Droplets, Bug, Truck, Cpu, Warehouse, Plane, Snowflake, Stethoscope, Briefcase, User, UserCog, Leaf, Globe, Bolt, Flower2, Landmark, Coins, Factory, Ship, FileLineChart, CloudSun, BookOpen, FileDigit } from "lucide-react";

export type Company = {
    id: string;
    name: string;
    tag: string;
    description: string;
    logoUrl: string;
    type: string;
    image?: string;
};

export const FEATURED_COMPANIES: Company[] = [
    {
        id: '1',
        name: 'Ministerio de agricultura',
        tag: 'Legislação e politicas agrárias',
        description: 'Gestão governamental e normas.',
        logoUrl: 'https://placehold.co/100x60/054a29/fff?text=MINAG',
        type: 'Empresa pública',
        image: 'https://placehold.co/600x400/054a29/white?text=Agricultura'
    },
    {
        id: '2',
        name: 'TEKAP',
        tag: 'Distribuição de sementes e ortícolas',
        description: 'Biotecnologia para cultivos.',
        logoUrl: 'https://placehold.co/100x60/054a29/fff?text=TEKAP',
        type: 'Empresa privada',
        image: 'https://placehold.co/600x400/054a29/white?text=Sementes'
    },
    {
        id: '3',
        name: 'Mutiana',
        tag: 'Venda de insumos agrários',
        description: 'Nutrição vegetal de performance.',
        logoUrl: 'https://placehold.co/100x60/054a29/fff?text=Mutiana',
        type: 'Instituição privada',
        image: 'https://placehold.co/600x400/054a29/white?text=Insumos'
    },
    {
        id: '4',
        name: 'Milenium BIM',
        tag: 'Financiamento agrário',
        description: 'Crédito para produtores.',
        logoUrl: 'https://placehold.co/100x60/054a29/fff?text=BIM',
        type: 'Financiamento',
        image: 'https://placehold.co/600x400/054a29/white?text=Financas'
    }
];

export const SEARCH_DATA = {
    produtos: [
        { title: 'Carne Bovina Premium', sub: 'Pecuária de Corte - 100% Orgânica', icon: Building2 }, // Fallback icon
        { title: 'Trator Magnat 5000', sub: 'Máquinas Agrícolas de alta potência', icon: Tractor },
        { title: 'Sementes de Milho Híbrido', sub: 'Resistente a secas e pragas', icon: Sprout },
        { title: 'Fertilizante Nitrogenado XP', sub: 'Nutrição intensiva para solos pobres', icon: FlaskConical },
        { title: 'Kit de Irrigação Gota-a-Gota', sub: 'Economia de 40% de água', icon: Droplets },
        { title: 'Pesticida Bio-Verde', sub: 'Controlo de pragas sem químicos tóxicos', icon: Bug },
        { title: 'Camião Agrário 15T', sub: 'Transporte pesado para colheitas', icon: Truck },
        { title: 'Sensores de Humidade IoT', sub: 'Tecnologia agrícola de precisão', icon: Cpu },
        { title: 'Silo Metálico 500 Ton', sub: 'Armazenamento seguro de cereais', icon: Warehouse },
        { title: 'Arado de Discos Reforçado', sub: 'Equipamento para preparação de solos', icon: Tractor },
        { title: 'Drones Pulverizadores', sub: 'Aplicação aérea de precisão', icon: Plane },
        { title: 'Câmaras Frigoríficas Solar', sub: 'Conservação pós-colheita sustentável', icon: Snowflake }
    ],
    profissionais: [
        { title: 'Eng. Carlos Mondlane', sub: 'Engenheiro Agrícola - Esp. em Hidráulica', icon: UserCog },
        { title: 'Dra. Ana Paula', sub: 'Veterinária - Especialista em Grandes Animais', icon: Stethoscope },
        { title: 'Sr. João Muchanga', sub: 'Consultor Agrário - Gestão de Projectos', icon: Briefcase },
        { title: 'Téc. Ricardo Silva', sub: 'Extensionista Rural - Apoio a Cooperativas', icon: Users },
        { title: 'Dr. Samuel Chivambo', sub: 'Investigador - Biotecnologia de Solos', icon: FlaskConical },
        { title: 'Marta Sitoe', sub: 'Gestora Agrícola - Especialista em Agronegócio', icon: User },
        { title: 'José Langa', sub: 'Técnico Agrícola - Operador de Máquinas', icon: Tractor },
        { title: 'Agrónomo Pedro Tembe', sub: 'Especialista em Culturas de Sequeiro', icon: Leaf },
        { title: 'Eng. Lucas Nhaca', sub: 'Especialista em Energias Renováveis no Campo', icon: Bolt },
        { title: 'Téc. Helena Vilanculos', sub: 'Especialista em Floricultura Exportação', icon: Flower2 }
    ],
    empresas: [
        { title: 'AgroMoçambique Lda', sub: 'Empresa Privada - Produção de Frutas', icon: Building2 },
        { title: 'Cooperativa Boa Esperança', sub: 'Cooperativa de Pequenos Produtores', icon: Users },
        { title: 'Instituto de Investigação Agrária', sub: 'Empresa Pública - Ciência e Tecnologia', icon: Landmark },
        { title: 'Fundação Rural Crescer', sub: 'Instituição de Fomento ao Microcrédito', icon: Coins },
        { title: 'Grains Moz Holding', sub: 'Consórcio de Cereais e Oleaginosas', icon: Factory },
        { title: 'Centro Logístico da Beira', sub: 'Gestão de Terminais de Carga Agrária', icon: Ship }
    ],
    artigos: [
        { title: 'Estudo sobre Variedades de Arroz em Gaza', sub: 'Publicado por IIAM - 2023', icon: FileLineChart },
        { title: 'Impacto das Alterações Climáticas no Chokwé', sub: 'Revista Científica de Agronomia', icon: CloudSun },
        { title: 'Novas Técnicas de Conservação de Tomate', sub: 'Guia Prático para Agricultores', icon: BookOpen },
        { title: 'Manual de Mecanização para Pequenas Áreas', sub: 'Documento Técnico da FAO', icon: FileDigit }
    ]
};
