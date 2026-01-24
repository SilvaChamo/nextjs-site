
export type PlanType = 'Free' | 'Básico' | 'Premium' | 'Parceiro';

export type BillingPeriod = 'monthly' | 'annual';

export type ValueChainRole = 'Consumidor' | 'Produtor' | 'Fornecedor' | 'Serviços' | 'Agro-negócio' | 'Outros';

export interface CompanyDetail {
    id?: string;
    slug?: string;
    registrationType?: 'enterprise' | 'professional';
    name: string;
    email?: string;
    contact?: string;
    activity: string;
    location: string;
    geoLocation?: string;
    valueChain?: ValueChainRole;
    logo: string;
    fullDescription: string;
    services: string;
    products: {
        name: string;
        price?: string;
        photo?: string;
        description?: string;
        available?: boolean;
    }[];
    plan?: PlanType;
    billingPeriod?: BillingPeriod;
    isFeatured?: boolean;
    isVerified?: boolean;
    paymentMethod?: 'mpesa' | 'emola' | 'banco' | null;
    paymentPhone?: string;
    productLimit?: number | null;
}
