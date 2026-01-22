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
            about: "Sobre nós",
            services: "Serviços",
            repository: "Repositório",
            partnership: "Parceria",
            market: "Mercado",
            contacts: "Contactos",
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
            who_title: "Quem procuramos?",
            who_text: "Buscamos organizações comprometidas com a qualidade e o crescimento do agro-negócio. Nossas categorias de parceria incluem:",
            form_title: "Quer ser um parceiro?",
            form_text: "Preencha o formulário e nossa equipa de parcerias entrará em contacto.",
            form_name: "Nome da Empresa",
            form_email: "Email Corporativo",
            form_message: "Mensagem Curta",
            form_submit: "Enviar Proposta de Parceria",
            premium_partners: "Nossos Parceiros Premium",
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
            about: "About us",
            services: "Services",
            repository: "Repository",
            partnership: "Partnership",
            market: "Market",
            contacts: "Contacts",
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
            who_title: "Who are we looking for?",
            who_text: "We seek organizations committed to quality and agribusiness growth. Our partnership categories include:",
            form_title: "Want to be a partner?",
            form_text: "Fill out the form and our partnerships team will get in touch.",
            form_name: "Company Name",
            form_email: "Corporate Email",
            form_message: "Short Message",
            form_submit: "Send Partnership Proposal",
            premium_partners: "Our Premium Partners",
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
