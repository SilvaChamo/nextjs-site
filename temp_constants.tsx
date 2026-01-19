
import { Company, Category } from './types';

export const FEATURED_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Ministerio de agricultura',
    tag: 'Legislação e politicas agrárias',
    description: 'Gestão governamental e normas.',
    logoUrl: 'https://placehold.co/100x60/054a29/fff?text=MINAG',
    type: 'Empresa pública'
  },
  {
    id: '2',
    name: 'TEKAP',
    tag: 'Distribuição de sementes e ortícolas',
    description: 'Biotecnologia para cultivos.',
    logoUrl: 'https://placehold.co/100x60/054a29/fff?text=TEKAP',
    type: 'Empresa privada'
  },
  {
    id: '3',
    name: 'Mutiana',
    tag: 'Venda de insumos agrários',
    description: 'Nutrição vegetal de performance.',
    logoUrl: 'https://placehold.co/100x60/054a29/fff?text=Mutiana',
    type: 'Instituição privada'
  },
  {
    id: '4',
    name: 'Milenium BIM',
    tag: 'Financiamento agrário',
    description: 'Crédito para produtores.',
    logoUrl: 'https://placehold.co/100x60/054a29/fff?text=BIM',
    type: 'Financiamento'
  }
];

export const SEARCH_DATA = {
  produtos: [
    { title: 'Carne Bovina Premium', sub: 'Pecuária de Corte - 100% Orgânica', icon: 'fa-drumstick-bite' },
    { title: 'Trator Magnat 5000', sub: 'Máquinas Agrícolas de alta potência', icon: 'fa-tractor' },
    { title: 'Sementes de Milho Híbrido', sub: 'Resistente a secas e pragas', icon: 'fa-seedling' },
    { title: 'Fertilizante Nitrogenado XP', sub: 'Nutrição intensiva para solos pobres', icon: 'fa-flask' },
    { title: 'Kit de Irrigação Gota-a-Gota', sub: 'Economia de 40% de água', icon: 'fa-faucet-drip' },
    { title: 'Pesticida Bio-Verde', sub: 'Controlo de pragas sem químicos tóxicos', icon: 'fa-bug-slash' },
    { title: 'Camião Agrário 15T', sub: 'Transporte pesado para colheitas', icon: 'fa-truck-moving' },
    { title: 'Sensores de Humidade IoT', sub: 'Tecnologia agrícola de precisão', icon: 'fa-microchip' },
    { title: 'Silo Metálico 500 Ton', sub: 'Armazenamento seguro de cereais', icon: 'fa-warehouse' },
    { title: 'Arado de Discos Reforçado', sub: 'Equipamento para preparação de solos', icon: 'fa-shuttle-space' },
    { title: 'Drones Pulverizadores', sub: 'Aplicação aérea de precisão', icon: 'fa-plane-up' },
    { title: 'Câmaras Frigoríficas Solar', sub: 'Conservação pós-colheita sustentável', icon: 'fa-snowflake' }
  ],
  profissionais: [
    { title: 'Eng. Carlos Mondlane', sub: 'Engenheiro Agrícola - Esp. em Hidráulica', icon: 'fa-user-gear' },
    { title: 'Dra. Ana Paula', sub: 'Veterinária - Especialista em Grandes Animais', icon: 'fa-stethoscope' },
    { title: 'Sr. João Muchanga', sub: 'Consultor Agrário - Gestão de Projectos', icon: 'fa-user-tie' },
    { title: 'Téc. Ricardo Silva', sub: 'Extensionista Rural - Apoio a Cooperativas', icon: 'fa-users-gear' },
    { title: 'Dr. Samuel Chivambo', sub: 'Investigador - Biotecnologia de Solos', icon: 'fa-microscope' },
    { title: 'Marta Sitoe', sub: 'Gestora Agrícola - Especialista em Agronegócio', icon: 'fa-briefcase' },
    { title: 'José Langa', sub: 'Técnico Agrícola - Operador de Máquinas', icon: 'fa-user' },
    { title: 'Fornecedora Agro-Vila', sub: 'Fornecedores de Insumos Certificados', icon: 'fa-truck-field' },
    { title: 'Agrónomo Pedro Tembe', sub: 'Especialista em Culturas de Sequeiro', icon: 'fa-leaf' },
    { title: 'Dra. Beatriz Matos', sub: 'Consultora Ambiental para o Agro', icon: 'fa-earth-africa' },
    { title: 'Eng. Lucas Nhaca', sub: 'Especialista em Energias Renováveis no Campo', icon: 'fa-bolt' },
    { title: 'Téc. Helena Vilanculos', sub: 'Especialista em Floricultura Exportação', icon: 'fa-spa' }
  ],
  empresas: [
    { title: 'AgroMoçambique Lda', sub: 'Empresa Privada - Produção de Frutas', icon: 'fa-building' },
    { title: 'Cooperativa Boa Esperança', sub: 'Cooperativa de Pequenos Produtores', icon: 'fa-users' },
    { title: 'Instituto de Investigação Agrária', sub: 'Empresa Pública - Ciência e Tecnologia', icon: 'fa-landmark' },
    { title: 'Associação Verde-Sul', sub: 'Associação de Apoio à Mulher Rural', icon: 'fa-hand-holding-heart' },
    { title: 'ONG Campo Sustentável', sub: 'ONG de Desenvolvimento Comunitário', icon: 'fa-dove' },
    { title: 'Export Agro Maputo', sub: 'Empresa Privada - Logística Internacional', icon: 'fa-globe' },
    { title: 'Banco de Sementes Estatal', sub: 'Empresa Pública - Reserva Estratégica', icon: 'fa-vault' },
    { title: 'União de Cooperativas de Gaza', sub: 'Federação de Organizações Agrárias', icon: 'fa-sitemap' },
    { title: 'AgroTech Inovação', sub: 'Startup de Software para o Campo', icon: 'fa-laptop-code' },
    { title: 'Fundação Rural Crescer', sub: 'Instituição de Fomento ao Microcrédito', icon: 'fa-coins' },
    { title: 'Grains Moz Holding', sub: 'Consórcio de Cereais e Oleaginosas', icon: 'fa-industry' },
    { title: 'Centro Logístico da Beira', sub: 'Gestão de Terminais de Carga Agrária', icon: 'fa-ship' }
  ],
  artigos: [
    { title: 'Estudo sobre Variedades de Arroz em Gaza', sub: 'Publicado por IIAM - 2023', icon: 'fa-file-lines' },
    { title: 'Impacto das Alterações Climáticas no Chokwé', sub: 'Revista Científica de Agronomia', icon: 'fa-cloud-sun-rain' },
    { title: 'Novas Técnicas de Conservação de Tomate', sub: 'Guia Prático para Agricultores', icon: 'fa-book-open' },
    { title: 'Manual de Mecanização para Pequenas Áreas', sub: 'Documento Técnico da FAO', icon: 'fa-file-pdf' },
    { title: 'Análise Económica do Sector Agro-Pecuário', sub: 'Relatório Trimestral de Mercado', icon: 'fa-chart-line' },
    { title: 'Biodiversidade e Solo em Moçambique', sub: 'Tese de Doutoramento UEM', icon: 'fa-graduation-cap' },
    { title: 'Gestão Eficiente de Pragas na Manga', sub: 'Artigo de Investigação Aplicada', icon: 'fa-bug' },
    { title: 'O Futuro do Hidropónico em Zonas Urbanas', sub: 'Inovação Rural Moçambique', icon: 'fa-droplet' },
    { title: 'Logística de Frio no Transporte de Carnes', sub: 'Estudo de Caso Regional', icon: 'fa-snowflake' },
    { title: 'Políticas de Subsídios no Insumo Agrário', sub: 'Análise de Impacto Socioeconómico', icon: 'fa-balance-scale' },
    { title: 'Sistemas de Irrigação de Baixo Custo', sub: 'Alternativas para o Vale do Zambeze', icon: 'fa-water' },
    { title: 'Certificação Orgânica para o Mercado da UE', sub: 'Manual de Requisitos e Normas', icon: 'fa-certificate' }
  ]
};

export const CATEGORIES: Category[] = [
  { id: '1', label: 'Empresas', icon: 'fa-solid fa-building' },
  { id: '2', label: 'Produtos', icon: 'fa-solid fa-seedling' },
  { id: '3', label: 'Profissionais', icon: 'fa-solid fa-user-tie' },
  { id: '4', label: 'Artigos diversos', icon: 'fa-solid fa-book' }
];
