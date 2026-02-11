export type Language = 'PT' | 'EN';

export type TranslationKey = keyof typeof translations.PT;

export const translations = {
    PT: {
        common: {
            search_placeholder: "O que procura?",
            search_button: "Pesquisar",
            loading: "Carregando...",
            error: "Ocorreu um erro",
            success: "Sucesso!",
            learn_more: "Saber mais",
            view_all: "Ver todos",
            read_more: "Ler mais",
            contact_us: "Fale conosco",
            send: "Enviar",
            partners_area: "Área de Parceiros",
            start_now: "Começar Agora",
            help_center: "Central de Ajuda",
            blog: "Blog do Agro",
            careers: "Carreiras",
            terms: "Termos e Condições",
            privacy: "Política de Privacidade",
            menu: "Menu",
            login: "Entrar",
            my_account: "Minha Conta",
            back: "Voltar"
        },
        navbar: {
            base: "Base",
            about: "Sobre nós",
            services: "Serviços",
            repository: "Repositório",
            history: "Nossa história",
            partnership: "Parceria",
            market: "Mercado",
            contacts: "Contactos",
            innovation: "Inovação",
            innovation_tech: "Inovação",
            app: "Sobre app",
            about_registration: "Cadastro",
            innovation_sections: {
                presence: "Cadastro & Visibilidade",
                tools: "Comunicação & Design",
                science: "Ciência & Tecnologia"
            },
            innovation_menu: {
                registration: {
                    title: "Cadastro de Empresa",
                    description: "Junte-se à maior rede de agro-negócio de Moçambique.",
                    link: "/inovacao/vantagens-cadastro"
                },
                communication: {
                    title: "Comunicação Massiva",
                    description: "Sistemas de SMS e E-mail para alcance imediato.",
                    link: "/inovacao/comunicacao-sms"
                },
                visibility: {
                    title: "Destacar Empresa",
                    description: "Coloque a sua marca no topo das pesquisas e destaques.",
                    link: "/inovacao/seo-google"
                },
                identity: {
                    title: "Identidade Digital",
                    description: "Perfis profissionais e cartões de visita com QR Code.",
                    link: "/inovacao/perfil-digital"
                },
                presentations: {
                    title: "Apresentações Visuais",
                    description: "Editor de slides interativos para catálogos e relatórios.",
                    link: "/inovacao/apresentacoes"
                },
                scientific: {
                    title: "Repositório Científico",
                    description: "Pesquisa dinâmica e semântica de artigos académicos.",
                    link: "/inovacao/repositorio-cientifico"
                },
                agrobotanica: {
                    title: "AgroBotanica AI",
                    description: "Scanner inteligente para diagnóstico de pragas e doenças.",
                    link: "/inovacao/agrobotanica"
                }
            },
            forum: "Fórum"
        },
        parceria: {
            header_title: "Seja nosso",
            header_span: "Parceiro",
            intro_title: "Crescemos juntos",
            intro_subtitle: "quando cooperamos",
            intro_text: "Acreditamos no poder das parcerias estratégicas para alavancar o sector agrário. Ao tornar-se parceiro da Base Agro Data, a sua organização ganha acesso directo a uma rede qualificada de produtores, empresários e decisores.",
            stats_title: "Nossa Posição no",
            stats_subtitle: "Mercado Agrário",
            stats_text: "A maior base de dados interativa de Moçambique, conectando produtores e mercados com dados em tempo real.",
            who_antetitle: "",
            who_title: "Quem procuramos?",
            who_text: "Todas as entidade que operam no sector agrário podem ser nossos parceiros, mas a nossa colaboração é focada nas organizações que operam nas áreas estratégicas que impulsionam directamente na produção, produtividade e a sustentabilidade no campo.",
            who_item1_title: "Fornecedores de insumos",
            who_item1_desc: "Empresas de sementes, fertilizantes e maquinaria que queiram expandir seu alcance.",
            who_item2_title: "Instituições financeiras",
            who_item2_desc: "Bancos e micro-finanças interessados em financiar o crescimento do sector agrário.",
            who_item3_title: "Agências de desenvolvimento",
            who_item3_desc: "ONGs e projectos focados no impacto social e desenvolvimento rural sustentável.",
            who_item4_title: "Tecnologia & dados",
            who_item4_desc: "Startups e empresas de software que oferecem soluções de gestão para o campo.",
            who_item5_title: "Empresas do agro-negócio",
            who_item6_title: "Transporte & distribuição",
            form_title: "Quer ser um parceiro?",
            form_text: "Preencha o formulário e nossa equipa de parcerias entrará em contacto.",
            form_name: "Nome da Empresa",
            form_email: "Email Corporativo",
            form_message: "Mensagem Curta",
            form_category: "Categoria de Parceria",
            form_submit: "Enviar proposta",
            premium_partners: "Parceiros Premium",
            premium_text: "Organizações líderes que confiam na nossa Base de dados agrícolas para impulsionar o desenvolvimento agrário em Moçambique são os nossos principais parceiros."
        },
        footer: {
            address: "Av. Karl Marx nº 177, Maputo - Moçambique",
            phone: "Telefone",
            whatsapp: "Whatsapp",
            email: "E-mail"
        }
    },
    EN: {
        common: {
            search_placeholder: "What are you looking for?",
            search_button: "Search",
            loading: "Loading...",
            error: "An error occurred",
            success: "Success!",
            learn_more: "Learn more",
            view_all: "View all",
            read_more: "Read more",
            contact_us: "Contact us",
            send: "Send",
            partners_area: "Partners Area",
            start_now: "Start Now",
            help_center: "Help Center",
            blog: "Agro Blog",
            careers: "Careers",
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            menu: "Menu",
            login: "Login",
            my_account: "My Account",
            back: "Back"
        },
        navbar: {
            base: "Base",
            about: "About us",
            services: "Services",
            repository: "Repository",
            history: "Our history",
            partnership: "Partnership",
            market: "Market",
            contacts: "Contacts",
            innovation: "Innovation",
            innovation_tech: "Innovation",
            app: "About app",
            about_registration: "Registration",
            innovation_sections: {
                presence: "Registration & Visibility",
                tools: "Communication & Design",
                science: "Science & Technology"
            },
            innovation_menu: {
                registration: {
                    title: "Company Registration",
                    description: "Join Mozambique's largest agribusiness network.",
                    link: "/inovacao/vantagens-cadastro"
                },
                communication: {
                    title: "Mass Communication",
                    description: "SMS and E-mail systems for immediate reach.",
                    link: "/inovacao/comunicacao-sms"
                },
                visibility: {
                    title: "Feature Company",
                    description: "Stand out your brand at the top of Google and search engines.",
                    link: "/inovacao/seo-google"
                },
                identity: {
                    title: "Digital Identity",
                    description: "Professional profiles and business cards with QR Code.",
                    link: "/inovacao/perfil-digital"
                },
                presentations: {
                    title: "Visual Presentations",
                    description: "Interactive slide editor for catalogs and reports.",
                    link: "/inovacao/apresentacoes"
                },
                scientific: {
                    title: "Scientific Repository",
                    description: "Dynamic and semantic search for academic articles.",
                    link: "/inovacao/repositorio-cientifico"
                },
                agrobotanica: {
                    title: "AgroBotanica AI",
                    description: "Intelligent scanner for diagnosing pests and diseases.",
                    link: "/inovacao/agrobotanica"
                }
            },
            forum: "Forum"
        },
        parceria: {
            header_title: "Become our",
            header_span: "Partner",
            intro_title: "We grow together",
            intro_subtitle: "when we cooperate",
            intro_text: "We believe in the power of strategic partnerships to leverage the agricultural sector. By becoming a partner of Base Agro Data, your organization gains direct access to a qualified network of producers, entrepreneurs, and decision-makers.",
            stats_title: "Our Position in the",
            stats_subtitle: "Agrarian Market",
            stats_text: "Mozambique's largest interactive database, connecting producers and markets with real-time data.",
            who_antetitle: "",
            who_title: "Who are we looking for?",
            who_text: "All entities operating in the agricultural sector can be our partners, but our collaboration is focused on organizations operating in strategic areas that directly boost production, productivity and sustainability in the field.",
            who_item1_title: "Input Suppliers",
            who_item1_desc: "Seed, fertilizer, and machinery companies looking to expand their reach.",
            who_item2_title: "Financial Institutions",
            who_item2_desc: "Banks and microfinance interested in financing the growth of the agricultural sector.",
            who_item3_title: "Development Agencies",
            who_item3_desc: "NGOs and projects focused on social impact and sustainable rural development.",
            who_item4_title: "Technology & Data",
            who_item4_desc: "Startups and software companies offering management solutions for the field.",
            who_item5_title: "Agribusiness Companies",
            who_item6_title: "Transport & Distribution",
            form_title: "Want to be a partner?",
            form_text: "Fill out the form and our partnerships team will get in touch.",
            form_name: "Company Name",
            form_email: "Corporate Email",
            form_message: "Short Message",
            form_category: "Partnership Category",
            form_submit: "Send proposal",
            premium_partners: "Premium Partners",
            premium_text: "Leading organizations that trust our Agricultural Database to drive agrarian development in Mozambique are our main partners."
        },
        footer: {
            address: "Karl Marx Av. nº 177, Maputo - Mozambique",
            phone: "Phone",
            whatsapp: "Whatsapp",
            email: "E-mail"
        }
    }
};
