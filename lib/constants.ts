import {
    Building2, ShoppingBag, Users, FileText, Tractor, Sprout,
    FlaskConical, Droplets, Bug, Truck, Cpu, Warehouse,
    Plane, Snowflake, Stethoscope, Briefcase, User, UserCog,
    Leaf, Globe, Bolt, Flower2, Landmark, Coins, Factory,
    Ship, FileLineChart, CloudSun, BookOpen, FileDigit,
    Home, Map, LandPlot, Microscope, Wheat, TreePalm,
    Thermometer, Mountain, Shovel, Boxes, Receipt, BarChart
} from "lucide-react";

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
        { title: 'Carne Bovina Premium', sub: 'Pecuária de Corte - 100% Orgânica', icon: Building2 },
        { title: 'Trator Magnat 5000', sub: 'Máquinas Agrícolas de alta potência', icon: Tractor },
        { title: 'Sementes de Milho Híbrido', sub: 'Resistente a secas e pragas', icon: Sprout },
        { title: 'Fertilizante Nitrogenado XP', sub: 'Nutrição intensiva para solos pobres', icon: FlaskConical },
        { title: 'Kit de Irrigação Gota-a-Gota', sub: 'Economia de 40% de água', icon: Droplets },
        { title: 'Pesticida Bio-Verde', sub: 'Controlo de pragas sem químicos tóxicos', icon: Bug },
        { title: 'Camião Agrário 15T', sub: 'Transporte pesado para colheitas', icon: Truck },
        { title: 'Sensores de Humidade IoT', sub: 'Tecnologia agrícola de precisão', icon: Cpu },
        { title: 'Silo Metálico 500 Ton', sub: 'Armazenamento seguro de cereais', icon: Warehouse },
        { title: 'Drones Pulverizadores', sub: 'Aplicação aérea de precisão', icon: Plane }
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
        { title: 'Centro Logístico da Beira', sub: 'Gestão de Terminais de Carga Agrária', icon: Ship },
        { title: 'MozFertil S.A.', sub: 'Produção Local de Fertilizantes', icon: FlaskConical },
        { title: 'Logística do Niassa', sub: 'Transporte e Escoamento de Milho', icon: Truck },
        { title: 'BioSeeds Moçambique', sub: 'Pesquisa de Sementes Nativas', icon: Sprout },
        { title: 'Mecanização de Gaza', sub: 'Aluguer de Equipamento Agrícola', icon: Tractor }
    ],
    artigos: [
        { title: 'Estudo sobre Variedades de Arroz', sub: 'Publicado por IIAM - 2023', icon: FileLineChart },
        { title: 'Impacto Climático no Chokwé', sub: 'Revista Científica de Agronomia', icon: CloudSun },
        { title: 'Conservação de Tomate', sub: 'Guia Prático para Agricultores', icon: BookOpen },
        { title: 'Manual de Mecanização FAO', sub: 'Documento Técnico de Fomento', icon: FileDigit },
        { title: 'Evolução dos Preços do Açúcar', sub: 'Relatório Semestral de Mercado', icon: BarChart },
        { title: 'Pragas de Citrinos em Manica', sub: 'Boletim de Alerta Fitossanitário', icon: Bug },
        { title: 'Guia de Fertirrigação Moderno', sub: 'Manual de Eficiência Hídrica', icon: Droplets },
        { title: 'Políticas para o Pequeno Produtor', sub: 'Análise Legislativa 2024', icon: Receipt },
        { title: 'Zonamento Agrário do Norte', sub: 'Atlas de Potencial Agro-ecológico', icon: Map },
        { title: 'Armazenamento Pós-colheita', sub: 'Melhores Práticas para Silos', icon: Boxes }
    ],
    propriedades: [
        { title: 'Fazenda Vale do Limpopo', sub: '500 Hectares - Produção de Cereais', icon: LandPlot },
        { title: 'Quinta das Oliveiras', sub: 'Área de Regadio - Horticultura', icon: Home },
        { title: 'Herdade do Sol', sub: 'Pecuária e Pastagens - Gaza', icon: Warehouse },
        { title: 'Terras Altas de Manica', sub: 'Ideal para Fruticultura', icon: Map },
        { title: 'Plantação de Eucaliptos', sub: 'Reflorestamento e Papel - Niassa', icon: TreePalm },
        { title: 'Horta Comunitária Namaacha', sub: 'Produção Biológica Local', icon: Wheat },
        { title: 'Pomar de Mangas e Citrinos', sub: 'Certificado GlobalG.A.P - Inhambane', icon: Flower2 },
        { title: 'Centro de Formação Rural', sub: 'Campo Experimental - Boane', icon: Microscope },
        { title: 'Área de Concessão Algodoeira', sub: 'Exploração de Grandes Extensões', icon: Leaf },
        { title: 'Pastos do Chimoio', sub: 'Criação de Pequenos Ruminantes', icon: Mountain }
    ]
};
