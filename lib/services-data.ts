
import {
    Truck, Globe, ShieldCheck, Search,
    Zap, Store, Smartphone, Users,
    TrendingUp, Gavel, ShoppingCart,
    Calendar, Star, FileText,
    Briefcase, GraduationCap, Monitor,
    Rocket, Settings, Headphones,
    PenTool, CheckCircle2, Lightbulb
} from "lucide-react";

export interface SubService {
    title: string;
    description: string;
}

export interface SubCategory {
    slug: string;
    title: string;
    description: string;
    icon: any;
    fullDescription: string;
    subServices: SubService[];
    features: string[];
}

export interface CategoryData {
    id: string;
    title: string;
    subCategories: Record<string, SubCategory>;
}

export const servicesData: Record<string, CategoryData> = {
    "logistica": {
        id: "logistica",
        title: "Logística e transporte",
        subCategories: {
            "transporte": {
                slug: "transporte",
                title: "Transporte Terrestre",
                description: "Frota especializada para o transporte de produtos agrários em grandes quantidades.",
                icon: Truck,
                fullDescription: "O nosso serviço de transporte terrestre é desenhado para responder às exigências do sector agrário moçambicano. Contamos com uma frota diversificada e motoristas formados para o manuseamento de carga sensível e perecível, garantindo que os seus produtos cheguem ao destino com a máxima qualidade.",
                subServices: [
                    { title: "Transporte de Granéis", description: "Ideal para cereais, oleaginosas e outros produtos em bruto." },
                    { title: "Carga Contentorizada", description: "Transporte seguro para produtos processados e embalados." },
                    { title: "Cadeia de Frio", description: "Transporte refrigerado para hortícolas e produtos sensíveis à temperatura." }
                ],
                features: ["Monitoramento via GPS", "Seguro de carga incluído", "Equipa de apoio 24/7"]
            },
            "multimodal": {
                slug: "multimodal",
                title: "Logística Multimodal",
                description: "Integração eficiente entre transporte rodoviário e marítimo para exportação.",
                icon: Globe,
                fullDescription: "Facilitamos o acesso aos mercados internacionais através de soluções integradas que combinam o transporte rodoviário com as principais linhas marítimas. Gerimos toda a cadeia logística, desde a recolha no campo até à entrega nos portos de exportação.",
                subServices: [
                    { title: "Conexão Ferroviária", description: "Aproveitamento dos corredores logísticos nacionais." },
                    { title: "Despacho Aduaneiro", description: "Tratamento de toda a documentação necessária para exportação." },
                    { title: "Armazenagem Portuária", description: "Gestão de stocks em zonas de trânsito portuário." }
                ],
                features: ["Simplificação de burocracia", "Redução de custos logísticos", "Expansão para mercados globais"]
            },
            "seguranca": {
                slug: "seguranca",
                title: "Segurança de Carga",
                description: "Protocolos rigorosos de segurança e monitoramento em tempo real.",
                icon: ShieldCheck,
                fullDescription: "A segurança da sua produção é a nossa prioridade. Implementamos protocolos de segurança de elite, utilizando tecnologia de ponta para mitigar riscos de roubo, extravio ou danos durante o trânsito.",
                subServices: [
                    { title: "Escolta de Carga", description: "Acompanhamento físico para mercadorias de alto valor." },
                    { title: "Sistemas Anti-Furto", description: "Instalação de sensores e alarmes avançados na frota." },
                    { title: "Inspecção Pré-Embarque", description: "Verificação detalhada das condições da mercadoria." }
                ],
                features: ["Risco zero", "Proteção de ativos", "Tranquilidade operacional"]
            },
            "rastreio": {
                slug: "rastreio",
                title: "Rastreio em Tempo Real",
                description: "Acompanhe a sua mercadoria desde a origem até ao destino final.",
                icon: Search,
                fullDescription: "Transparência total em cada quilómetro. O nosso sistema de rastreio permite que acompanhe a localização exacta da sua carga através de um portal intuitivo, com previsões de chegada actualizadas constantemente.",
                subServices: [
                    { title: "Portal do Cliente", description: "Acesso privado para gestão de todas as expedições." },
                    { title: "Notificações Automáticas", description: "Alertas por SMS ou E-mail em pontos de controlo." },
                    { title: "Relatórios de Trânsito", description: "Análise histórica de tempos e rotas de entrega." }
                ],
                features: ["Visibilidade 100%", "Previsibilidade de entrega", "Dados accionáveis"]
            }
        }
    },
    // Adicionar as restantes categorias seguindo o mesmo padrão...
    "assistencia": {
        id: "assistencia",
        title: "Assistência digital",
        subCategories: {
            "portais": {
                slug: "portais",
                title: "Criação de Portais",
                description: "Desenvolvimento de sites institucionais e catálogos agrários.",
                icon: Rocket,
                fullDescription: "Damos vida à sua presença digital com portais robustos e visualmente impactantes. Desenvolvemos soluções personalizadas que vão desde sites institucionais a complexos catálogos de produtos agrários com integração de inventário.",
                subServices: [
                    { title: "Design UI/UX", description: "Interfaces modernas e focadas na experiência do utilizador." },
                    { title: "Desenvolvimento Web", description: "Codificação robusta e optimizada para todos os dispositivos." },
                    { title: "Gestão de Projecto", description: "Acompanhamento dedicado desde a concepção até ao lançamento." }
                ],
                features: ["Design Responsivo", "SEO Optimizado", "Gestor de Conteúdo Intuitivo"]
            },
            "tecnico": {
                slug: "tecnico",
                title: "Apoio Técnico TI",
                description: "Assistência para a modernização das suas ferramentas de gestão.",
                icon: Settings,
                fullDescription: "Garanta que a sua infraestrutura tecnológica está sempre operacional. O nosso apoio técnico abrange desde a manutenção de servidores até à configuração de redes e sistemas de gestão empresarial no campo.",
                subServices: [
                    { title: "Manutenção Preventiva", description: "Verificações periódicas para evitar falhas críticas." },
                    { title: "Suporte Hardware", description: "Instalação e reparação de equipamentos informáticos." },
                    { title: "Configuração de Redes", description: "Soluções de conectividade para áreas remotas." }
                ],
                features: ["Resposta Rápida", "Técnicos Certificados", "Minimização de Downtime"]
            },
            "apps": {
                slug: "apps",
                title: "Desenvolvimento App",
                description: "Soluções móveis personalizadas para gestão de campo.",
                icon: Smartphone,
                fullDescription: "Colocamos a gestão da sua quinta na palma da sua mão. Criamos aplicações móveis dedicadas ao sector agrário, facilitando o registo de produtividade, gestão de pessoal e recolha de dados em tempo real.",
                subServices: [
                    { title: "Apps nativas iOS/Android", description: "Máxima performance e integração com o sistema." },
                    { title: "Sincronização Offline", description: "Trabalhe no campo sem internet e sincronize depois." },
                    { title: "Dashboards Analíticos", description: "Visualize métricas importantes directamente no telemóvel." }
                ],
                features: ["Focado no Operador", "Interface Simplificada", "Alta Segurança de Dados"]
            },
            "suporte": {
                slug: "suporte",
                title: "Suporte Online",
                description: "Equipa dedicada para garantir a operacionalidade das plataformas.",
                icon: Headphones,
                fullDescription: "Apoio contínuo para que nunca se sinta sozinho. A nossa equipa de suporte online está disponível para resolver dúvidas, bugs ou pedidos de actualização nas suas plataformas digitais, garantindo continuidade ao seu negócio.",
                subServices: [
                    { title: "Suporte via Chat", description: "Atendimento imediato para questões rápidas." },
                    { title: "Bilheteira de Pedidos", description: "Gestão organizada de solicitações de suporte." },
                    { title: "Formação de Utilizadores", description: "Workshops para ensinar a equipa a usar as ferramentas." }
                ],
                features: ["Disponibilidade Alargada", "Especialistas Pacientes", "Soluções Definitivas"]
            }
        }
    },
    "lojas": {
        id: "lojas",
        title: "Lojas e insumos",
        subCategories: {
            "sementes": {
                slug: "sementes",
                title: "Sementes Certificadas",
                description: "Alta produtividade para sua colheita com sementes verificadas.",
                icon: Zap,
                fullDescription: "O sucesso da sua campanha começa na semente. Oferecemos acesso a uma selecção rigorosa de sementes certificadas, adaptadas aos diferentes solos e climas de Moçambique, garantindo taxas de germinação superiores e maior resistência a pragas.",
                subServices: [
                    { title: "Sementes de Cereais", description: "Milho, arroz e trigo com alto rendimento por hectare." },
                    { title: "Oleaginosas", description: "Soja e girassol de qualidade premium para produção de óleo." },
                    { title: "Hortícolas", description: "Variedades seleccionadas para o mercado de consumo fresco." }
                ],
                features: ["Certificação Oficial", "Adaptabilidade Climática", "Suporte Pós-Venda"]
            },
            "fertilizantes": {
                slug: "fertilizantes",
                title: "Fertilizantes e Adubos",
                description: "Nutrição vegetal completa para diversos tipos de culturas.",
                icon: Zap,
                fullDescription: "Potencie a saúde do seu solo e a vigorosidade das suas plantas. Trabalhamos com os melhores produtores de fertilizantes e adubos orgânicos, fornecendo os nutrientes exactos para maximizar a sua produtividade agrária.",
                subServices: [
                    { title: "NPK Especializados", description: "Fórmulas balanceadas para cada fase da cultura." },
                    { title: "Correctivos de Solo", description: "Soluções para equilibrar o pH e a estrutura da terra." },
                    { title: "Fertilizantes Orgânicos", description: "Opções sustentáveis para uma agricultura biológica." }
                ],
                features: ["Alta Solubilidade", "Nutrição de Precisão", "Resultados Visíveis"]
            },
            "maquinaria": {
                slug: "maquinaria",
                title: "Maquinaria Agrícola",
                description: "Tratores e equipamentos modernos para mecanização do campo.",
                icon: Truck,
                fullDescription: "Modernize a sua exploração com tecnologia de ponta. Oferecemos soluções em maquinaria que abrangem desde a preparação do solo até à colheita automatizada, aumentando a eficiência e reduzindo o esforço manual.",
                subServices: [
                    { title: "Venda de Tractores", description: "Modelos robustos adaptados para todo o tipo de terreno." },
                    { title: "Aluguer de Equipamento", description: "Soluções flexíveis para necessidades sazonais." },
                    { title: "Manutenção de Máquinas", description: "Oficina especializada e peças de reposição originais." }
                ],
                features: ["Operação Simplificada", "Durabilidade Testada", "Menor Consumo"]
            },
            "registo": {
                slug: "registo",
                title: "Registe a sua loja",
                description: "Aumente a visibilidade do seu negócio e alcance mais produtores.",
                icon: Store,
                fullDescription: "Faça parte da maior rede de fornecedores agrários do país. Ao registar a sua loja no nosso directório, terá acesso directo a milhares de produtores que procuram insumos de qualidade, expandindo o seu alcance comercial.",
                subServices: [
                    { title: "Perfil de Empresa", description: "Página dedicada com catálogo de produtos e contactos." },
                    { title: "Painel de Gestão", description: "Controle as suas ofertas e interaja com potenciais clientes." },
                    { title: "Publicidade Destacada", description: "Apareça nos primeiros resultados de pesquisa do portal." }
                ],
                features: ["Visibilidade Online", "Geração de Leads", "Marketplace Integrado"]
            }
        }
    },
    "compra-venda": {
        id: "compra-venda",
        title: "Compra e venda",
        subCategories: {
            "cotacoes": {
                slug: "cotacoes",
                title: "Cotações do Dia",
                description: "Acompanhe os preços médios nas principais praças nacionais.",
                icon: TrendingUp,
                fullDescription: "Informação é poder. Fornecemos actualizações diárias sobre os preços de mercado dos principais produtos agrários em diferentes províncias, permitindo que tome decisões de venda mais lucrativas e fundamentadas.",
                subServices: [
                    { title: "Relatórios Diários", description: "Preços actuais para cereais, leguminosas e mais." },
                    { title: "Análise de Tendência", description: "Projecções de subida ou descida de preços no mercado." },
                    { title: "Comparativo Regional", description: "Saiba onde o seu produto está a ser mais valorizado." }
                ],
                features: ["Dados Actualizados", "Fonte Confiável", "Histórico de Preços"]
            },
            "ofertas": {
                slug: "ofertas",
                title: "Ofertas de Venda",
                description: "Explore anúncios de produtores que procuram escoar produção.",
                icon: ShoppingCart,
                fullDescription: "O mercado agrário está aqui. Navegue pelas centenas de ofertas activas de produtores nacionais ou publique a sua própria oferta para encontrar o comprador ideal de forma rápida e segura.",
                subServices: [
                    { title: "Publicação de Ofertas", description: "Anuncie os seus lotes com fotos, detalhes e preços." },
                    { title: "Pesquisa Avançada", description: "Filtre ofertas por província, categoria ou volume." },
                    { title: "Mensagens Directas", description: "Negocie preços e condições directamente no portal." }
                ],
                features: ["Negócio Directo", "Zero Comissões", "Amplo Alcance"]
            },
            "leiloes": {
                slug: "leiloes",
                title: "Leilões Agrários",
                description: "Participe em licitações para compra de grandes lotes de produção.",
                icon: Gavel,
                fullDescription: "Oportunidades únicas de negócio em formato competitivo. Os nossos leilões digitais permitem a comercialização de grandes volumes de mercadoria de forma transparente, garantindo o melhor preço de mercado para ambas as partes.",
                subServices: [
                    { title: "Leilões em Directo", description: "Lances em tempo real monitorados pela nossa equipa." },
                    { title: "Venda de Excedentes", description: "Escoamento rápido de stock para grandes compradores." },
                    { title: "Licitação Privada", description: "Formatos exclusivos de compra para grandes parceiros." }
                ],
                features: ["Preço Justo", "Transparência Total", "Operação Segura"]
            },
            "garantia": {
                slug: "garantia",
                title: "Garantia de Negócio",
                description: "Transações seguras e monitoradas para evitar falhas.",
                icon: ShieldCheck,
                fullDescription: "Negocie com confiança total. O nosso serviço de garantia de negócio actua como intermediário na validação da mercadoria e na segurança do pagamento, eliminando riscos de burla ou incumprimento contratual.",
                subServices: [
                    { title: "Verificação de Lote", description: "Inspecção técnica antes da libertação do pagamento." },
                    { title: "Conta Escrow", description: "Retenção segura do valor até confirmação de entrega." },
                    { title: "Arbitragem Comercial", description: "Resolução célere de disputas em negociações." }
                ],
                features: ["Segurança Jurídica", "Proteção Financeira", "Confiança Mútua"]
            }
        }
    },
    "eventos": {
        id: "eventos",
        title: "Feiras e eventos",
        subCategories: {
            "calendario": {
                slug: "calendario",
                title: "Calendário Regional",
                description: "Acompanhe as principais feiras provinciais e nacionais.",
                icon: Calendar,
                fullDescription: "Não perca nenhuma oportunidade de networking. Mantemos um calendário actualizado com todas as feiras agrárias, exposições de gado e congressos tecnológicos que ocorrem em todo o território nacional.",
                subServices: [
                    { title: "Agenda Nacional", description: "Mapa completo de eventos do sector para o ano inteiro." },
                    { title: "Sincronização", description: "Adicione os eventos directamente ao seu calendário digital." },
                    { title: "Guia do Expositor", description: "Acesso a manuais e regras para cada feira regional." }
                ],
                features: ["Informação Centralizada", "Planeamento Prévio", "Foco em Negócios"]
            },
            "promocao": {
                slug: "promocao",
                title: "Promoção de Eventos",
                description: "Divulgue o seu evento para toda a nossa rede agrária.",
                icon: Zap,
                fullDescription: "Garanta o sucesso de público do seu evento. Utilizamos a nossa base de dados segmentada para promover feiras e eventos através de campanhas multicanal, alcançando exactamente quem tem interesse no agronegócio.",
                subServices: [
                    { title: "E-mail Marketing", description: "Envio de convites para produtores e investidores." },
                    { title: "Banners no Portal", description: "Destaque visual nas páginas de maior tráfego." },
                    { title: "Media Social", description: "Criação de buzz e promoção nas redes da BaseAgroData." }
                ],
                features: ["Público Alvo", "Alto Impacto", "Retorno Mensurável"]
            },
            "bilheteira": {
                slug: "bilheteira",
                title: "Bilheteira Online",
                description: "Gestão completa de acessos e venda de bilhetes para feiras.",
                icon: ShoppingCart,
                fullDescription: "Simplifique o acesso ao seu evento. Oferecemos uma plataforma de venda de ingressos integrada com métodos de pagamento locais, permitindo controlo total de entradas e relatórios de vendas em tempo real.",
                subServices: [
                    { title: "Venda Multipagamento", description: "Aceite M-Pesa, e-Mola e cartões bancários." },
                    { title: "QR Code Check-in", description: "Validação rápida de bilhetes à entrada do recinto." },
                    { title: "Gestão de VIPs", description: "Coordenação de áreas reservadas e convites especiais." }
                ],
                features: ["Conveniência", "Zero Filas", "Gestão Financeira Clara"]
            },
            "patrocinio": {
                slug: "patrocinio",
                title: "Patrocínio Digital",
                description: "Destaque a sua marca nos maiores eventos do sector.",
                icon: Star,
                fullDescription: "Aumente a autoridade da sua marca. Criamos pacotes de patrocínio que combinam visibilidade física nos eventos com presença digital constante nas nossas plataformas de cobertura, maximizando a sua exposição.",
                subServices: [
                    { title: "Cobertura em Directo", description: "Associe a sua marca às nossas transmissões e lives." },
                    { title: "Logo em Destaque", description: "Presença em todo o material promocional do evento." },
                    { title: "Naming Rights", description: "Oportunidade de dar nome a áreas ou painéis específicos." }
                ],
                features: ["Brand Awareness", "Posicionamento Premium", "Networking de Elite"]
            }
        }
    },
    "gestao-conteudo": {
        id: "gestao-conteudo",
        title: "Gestão de conteúdo",
        subCategories: {
            "escrita": {
                slug: "escrita",
                title: "Escrita Técnica",
                description: "Produção de artigos e posts especializados para o agro.",
                icon: FileText,
                fullDescription: "Comunique com autoridade. A nossa equipa de redactores técnicos produz conteúdo especializado para o sector agrário, transformando conceitos complexos em textos claros, envolventes e optimizados para SEO.",
                subServices: [
                    { title: "Artigos de Blog", description: "Conteúdo educativo sobre técnicas de cultivo e mercado." },
                    { title: "Whitepapers", description: "Relatórios detalhados sobre inovações e tendências do sector." },
                    { title: "Copywriting", description: "Textos persuasivos para anúncios e páginas de vendas." }
                ],
                features: ["Rigor Técnico", "Tom de Voz Único", "Optimização SEO"]
            },
            "redes": {
                slug: "redes",
                title: "Gestão de Redes",
                description: "Presença digital estratégica para marcas do sector.",
                icon: Users,
                fullDescription: "Mantenha a sua marca activa onde os seus clientes estão. Gerimos as suas redes sociais com uma estratégia focada no agro, criando comunidades fiéis e aumentando o engagement através de conteúdo relevante.",
                subServices: [
                    { title: "Planeamento Editorial", description: "Calendário estratégico de publicações mensais." },
                    { title: "Design para Social Media", description: "Artes visuais impactantes e profissionais." },
                    { title: "Gestão de Comunidade", description: "Interacção directa e resposta a seguidores." }
                ],
                features: ["Consistência Visual", "Relatórios de Performance", "Estratégia Multicanal"]
            },
            "video": {
                slug: "video",
                title: "Vídeo Marketing",
                description: "Cobertura de eventos e produção de vídeos institucionais.",
                icon: FileText,
                fullDescription: "Conte a sua história através de imagens. Produzimos vídeos institucionais, coberturas de feiras e tutoriais técnicos que destacam a excelência da sua produção e a modernidade da sua empresa.",
                subServices: [
                    { title: "Vídeos Institucionais", description: "Apresentação profissional da sua quinta ou empresa." },
                    { title: "Testemunhos", description: "Casos de sucesso contados por clientes e parceiros." },
                    { title: "Coberturas", description: "Captação de momentos chave em feiras e eventos." }
                ],
                features: ["Qualidade 4K", "Edição Dinâmica", "Storytelling Agrário"]
            },
            "newsletter": {
                slug: "newsletter",
                title: "Newsletter Agro",
                description: "Comunicação directa com a sua base de clientes e parceiros.",
                icon: FileText,
                fullDescription: "Chegue directamente à caixa de entrada de quem importa. Criamos newsletters técnicas e informativas que mantêm os seus parceiros e clientes a par das suas novidades, ofertas e conhecimentos técnicos.",
                subServices: [
                    { title: "Automação de E-mail", description: "Fluxos inteligentes de comunicação personalizada." },
                    { title: "Curadoria de Conteúdo", description: "Selecção do que há de mais importante no seu sector." },
                    { title: "Análise de Clicagem", description: "Saiba exactamente o que desperta interesse no seu público." }
                ],
                features: ["Alta Taxa de Entrega", "Design Personalizado", "Segmentação Precisa"]
            }
        }
    },
    "vagas": {
        id: "vagas",
        title: "Vagas de emprego",
        subCategories: {
            "talento": {
                slug: "talento",
                title: "Talento Agrário",
                description: "Candidate-se a vagas nas maiores empresas do país.",
                icon: Briefcase,
                fullDescription: "A sua próxima oportunidade profissional está aqui. Conectamos profissionais apaixonados pelo campo às empresas que lideram a transformação agrária em Moçambique, facilitando o encontro entre talento e necessidade.",
                subServices: [
                    { title: "Banco de CVs", description: "Registe o seu currículo na nossa base de dados exclusiva." },
                    { title: "Alertas de Vaga", description: "Receba notificações sobre oportunidades no seu perfil." },
                    { title: "Candidatura Directa", description: "Processo simplificado para responder a anúncios." }
                ],
                features: ["Foco no Sector", "Empresas de Renome", "Acesso Gratuito"]
            },
            "recrutamento": {
                slug: "recrutamento",
                title: "Recrutamento Especializado",
                description: "Serviços de RH focados em perfis técnicos agrícolas.",
                icon: Users,
                fullDescription: "Encontre a peça que falta na sua equipa. Ajudamos empresas agrárias a seleccionar os melhores perfis técnicos, desde engenheiros agrónomos a gestores de logística, garantindo competência e alinhamento cultural.",
                subServices: [
                    { title: "Headhunting", description: "Procura activa de talentos de alto nível no mercado." },
                    { title: "Triagem Técnica", description: "Entrevistas e testes específicos para o sector." },
                    { title: "Onboarding", description: "Apoio na integração do novo colaborador na empresa." }
                ],
                features: ["Selecção Rigorosa", "Expertise no Agro", "Redução de Turnover"]
            },
            "estagios": {
                slug: "estagios",
                title: "Estágios Profissionais",
                description: "Programas de entrada no mercado para jovens licenciados.",
                icon: GraduationCap,
                fullDescription: "Formamos o futuro do agronegócio moçambicano. Gerimos programas de estágio que permitem a jovens recém-formados ganhar experiência prática real em empresas de referência, unindo teoria e prática.",
                subServices: [
                    { title: "Estágios de Verão", description: "Experiências Intensivas durante a pausa académica." },
                    { title: "Primeiro Emprego", description: "Programas de transição da universidade para o campo." },
                    { title: "Mentoria", description: "Acompanhamento por profissionais experientes do sector." }
                ],
                features: ["Desenvolvimento Jovem", "Networking Inicial", "Experiência Real"]
            },
            "carreira": {
                slug: "carreira",
                title: "Consultoria de Carreira",
                description: "Apoio na elaboração de CV e preparação para entrevistas.",
                icon: FileText,
                fullDescription: "Destaque-se no mercado de trabalho. Oferecemos mentoria para profissionais que desejam evoluir na sua carreira agrária, desde a optimização do currículo até técnicas avançadas de negociação salarial.",
                subServices: [
                    { title: "Revisão de CV", description: "Currículos focados em resultados e competências agrárias." },
                    { title: "Treino de Entrevista", description: "Simulações para ganhar confiança e clareza." },
                    { title: "Plano de Carreira", description: "Desenho de metas e caminhos para o crescimento profissional." }
                ],
                features: ["Apoio Individualizado", "Visão de Mercado", "Confiança Reforçada"]
            }
        }
    },
    "consultoria": {
        id: "consultoria",
        title: "Consultoria digital",
        subCategories: {
            "estrategia": {
                slug: "estrategia",
                title: "Estratégia Digital",
                description: "Planos estratégicos para transformação digital do agro-negócio.",
                icon: Globe,
                fullDescription: "Trace o caminho para o futuro digital. A nossa consultoria estratégica ajuda a sua empresa a identificar as tecnologias certas para investir, optimizando o retorno sobre o investimento e garantindo vantagem competitiva.",
                subServices: [
                    { title: "Auditoria Digital", description: "Análise do estado actual da tecnologia na empresa." },
                    { title: "Roadmap Tecnológico", description: "Plano estruturado de adopção de novas ferramentas." },
                    { title: "ROI Analysis", description: "Estudo de viabilidade económica para projectos de TI." }
                ],
                features: ["Visão de Futuro", "Base em Dados", "Planeamento Realista"]
            },
            "otimizacao": {
                slug: "otimizacao",
                title: "Otimização de Processos",
                description: "Análise e melhoria de processos operacionais através de tecnologia.",
                icon: Zap,
                fullDescription: "Faça mais com menos. Analisamos os seus fluxos de trabalho actuais e implementamos melhorias tecnológicas que eliminam gargalos, reduzem desperdícios e aumentam a fluidez da sua operação agrária.",
                subServices: [
                    { title: "Mapeamento de Fluxos", description: "Visualização detalhada de cada etapa operacional." },
                    { title: "Automação de Tarefas", description: "Software para gerir processos repetitivos automaticamente." },
                    { title: "Gestão Lean", description: "Metodologias de eficiência aplicadas ao campo." }
                ],
                features: ["Eficiência Máxima", "Redução de Custos", "Processos Claros"]
            },
            "dados": {
                slug: "dados",
                title: "Análise de Dados",
                description: "Insights baseados em dados para melhor tomada de decisão.",
                icon: TrendingUp,
                fullDescription: "Transforme dados brutos em colheitas recorde. Utilizamos ferramentas avançadas de análise para interpretar dados de produção, clima e mercado, fornecendo insights valiosos que orientam as suas decisões críticas.",
                subServices: [
                    { title: "BI Dashboard", description: "Painéis interactivos com métricas de produção." },
                    { title: "Previsão de Colheita", description: "Modelos baseados em dados históricos e actuais." },
                    { title: "Análise de Custos", description: "Controlo rigoroso da rentabilidade por hectare." }
                ],
                features: ["Precisão Decisória", "Monitoramento Real", "Inteligência de Mercado"]
            },
            "implementacao": {
                slug: "implementacao",
                title: "Implementação Tecnológica",
                description: "Suporte na adoção e integração de novas tecnologias.",
                icon: Smartphone,
                fullDescription: "Garantimos que a tecnologia funciona para si. Acompanhamos todo o processo de instalação e configuração de novos softwares ou equipamentos, assegurando que a sua integração na equipa é suave e produtiva.",
                subServices: [
                    { title: "Instalação de Software", description: "Configuração de ERPs e sistemas agrários." },
                    { title: "Integração de Sistemas", description: "Ligue as suas ferramentas para que falem entre si." },
                    { title: "Suporte à Adopção", description: "Acompanhamento da equipa nas primeiras semanas de uso." }
                ],
                features: ["Transição Suave", "Sem Fricção Técnica", "Garantia de Uso"]
            }
        }
    },
    "formacoes": {
        id: "formacoes",
        title: "Formações e capacitações",
        subCategories: {
            "academia": {
                slug: "academia",
                title: "Academia Agro",
                description: "Cursos certificados online para capacitação técnica.",
                icon: GraduationCap,
                fullDescription: "Conhecimento sem fronteiras. A Academia Agro oferece cursos de alta qualidade acessíveis de qualquer lugar, focados nas competências mais requisitadas pelo mercado agrário moderno.",
                subServices: [
                    { title: "Gestão Agrária", description: "Cursos sobre administração e economia rural." },
                    { title: "Liderança de Equipas", description: "Formação para capatazes e gestores de campo." },
                    { title: "Marketing Agrário", description: "Aprenda a vender melhor a sua produção." }
                ],
                features: ["Certificado Digital", "Tutores Experientes", "Horários Flexíveis"]
            },
            "capacitacao": {
                slug: "capacitacao",
                title: "Capacitação Rural",
                description: "Treinos práticos de campo para melhoria de produtividade.",
                icon: Truck,
                fullDescription: "Mãos na massa para melhores resultados. Levamos a teoria para o campo através de workshops práticos onde os produtores aprendem novas técnicas de cultivo, poda e gestão de regadio directamente na terra.",
                subServices: [
                    { title: "Workshop de Campo", description: "Demonstrações práticas de novas técnicas." },
                    { title: "Dia de Campo", description: "Intercâmbio de experiências entre produtores de sucesso." },
                    { title: "Treino em Maquinaria", description: "Capacitação para operadores de tractores e alfaias." }
                ],
                features: ["Ensino Prático", "Impacto Directo", "Proximidade Real"]
            },
            "certificacao": {
                slug: "certificacao",
                title: "Certificação ISO",
                description: "Preparação para certificações internacionais de qualidade.",
                icon: ShieldCheck,
                fullDescription: "Abra as portas do mercado internacional. Ajudamos a sua empresa a preparar-se e a implementar os padrões de qualidade necessários para obter certificações globais, elevando o valor da sua colheita.",
                subServices: [
                    { title: "ISO 9001 Preparação", description: "Gestão da qualidade focada em processos agrários." },
                    { title: "Boas Práticas Agrícolas", description: "Implementação de normas GlobalG.A.P." },
                    { title: "Higiene e Segurança", description: "Normas de segurança alimentar no processamento." }
                ],
                features: ["Reconhecimento Global", "Acesso à Exportação", "Padrão de Excelência"]
            },
            "elearning": {
                slug: "elearning",
                title: "E-learning Corporativo",
                description: "Plataformas de treino personalizado para equipas de empresas.",
                icon: Smartphone,
                fullDescription: "Capacite a sua equipa em escala. Desenvolvemos plataformas de e-learning personalizadas para grandes empresas agrárias, permitindo que os colaboradores se formem de forma contínua e monitorada.",
                subServices: [
                    { title: "Portal de Formação", description: "Ambiente virtual exclusivo com a marca da sua empresa." },
                    { title: "Gamificação", description: "Aumente a motivação com sistemas de pontos e rankings." },
                    { title: "Relatórios de Progresso", description: "Acompanhe o desenvolvimento de cada colaborador." }
                ],
                features: ["Escalabilidade", "Controlo de Conhecimento", "Custo-Benefício"]
            }
        }
    }
};
