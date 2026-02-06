/**
 * Plan-based field permissions for company registration
 * Defines which fields are editable for each subscription plan
 */

export type PlanType = 'Gratuito' | 'Visitante' | 'Basic' | 'Básico' | 'Premium' | 'Business Vendedor' | 'Parceiro';

export interface FieldPermission {
    field: string;
    label: string;
    requiredPlan: PlanType;
}

// All company fields with their minimum required plan
export const COMPANY_FIELDS: FieldPermission[] = [
    // Basic Plan Fields
    { field: 'name', label: 'Nome da Empresa', requiredPlan: 'Basic' },
    { field: 'activity', label: 'Actividade Principal', requiredPlan: 'Basic' },
    { field: 'category', label: 'Sector de Actuação', requiredPlan: 'Basic' },
    { field: 'province', label: 'Província', requiredPlan: 'Basic' },
    { field: 'address', label: 'Endereço Físico', requiredPlan: 'Basic' },
    { field: 'description', label: 'Descrição Geral', requiredPlan: 'Basic' },
    { field: 'logo_url', label: 'Logo', requiredPlan: 'Basic' },
    { field: 'banner_url', label: 'Banner', requiredPlan: 'Basic' },
    { field: 'contact', label: 'Contacto', requiredPlan: 'Basic' },

    // Premium Plan Fields
    { field: 'nuit', label: 'NUIT', requiredPlan: 'Premium' },
    { field: 'email', label: 'Email Corporativo', requiredPlan: 'Premium' },
    { field: 'district', label: 'Distrito', requiredPlan: 'Premium' },
    { field: 'mission', label: 'Missão', requiredPlan: 'Premium' },
    { field: 'vision', label: 'Visão', requiredPlan: 'Premium' },
    { field: 'values', label: 'Valores', requiredPlan: 'Premium' },
    { field: 'services', label: 'Serviços', requiredPlan: 'Premium' },
    { field: 'social_facebook', label: 'Facebook', requiredPlan: 'Premium' },
    { field: 'social_instagram', label: 'Instagram', requiredPlan: 'Premium' },
    { field: 'social_linkedin', label: 'LinkedIn', requiredPlan: 'Premium' },

    // Business/Parceiro Fields
    { field: 'value_chain', label: 'Cadeia de Valor', requiredPlan: 'Business Vendedor' },
    { field: 'website', label: 'Website', requiredPlan: 'Business Vendedor' },
    { field: 'slug', label: 'URL Personalizado', requiredPlan: 'Business Vendedor' },
];

// Plan hierarchy (higher index = more permissions)
export const PLAN_HIERARCHY: PlanType[] = [
    'Gratuito',
    'Visitante',
    'Basic',
    'Básico', // Portuguese alias for Basic
    'Premium',
    'Business Vendedor',
    'Parceiro'
];

/**
 * Check if a plan has access to a specific field
 */
export function canEditField(userPlan: string | null | undefined, fieldName: string): boolean {
    const normalizedPlan = normalizePlanName(userPlan);

    // Parceiro has access to everything
    if (normalizedPlan === 'Parceiro') return true;

    const field = COMPANY_FIELDS.find(f => f.field === fieldName);
    if (!field) return false;

    const userPlanIndex = PLAN_HIERARCHY.indexOf(normalizedPlan);
    const requiredPlanIndex = PLAN_HIERARCHY.indexOf(field.requiredPlan);

    return userPlanIndex >= requiredPlanIndex;
}

/**
 * Get the required plan for a field
 */
export function getRequiredPlan(fieldName: string): PlanType | null {
    const field = COMPANY_FIELDS.find(f => f.field === fieldName);
    return field?.requiredPlan || null;
}

/**
 * Get all editable fields for a plan
 */
export function getEditableFields(userPlan: string | null | undefined): string[] {
    const normalizedPlan = normalizePlanName(userPlan);

    // Parceiro can edit everything
    if (normalizedPlan === 'Parceiro') {
        return COMPANY_FIELDS.map(f => f.field);
    }

    const userPlanIndex = PLAN_HIERARCHY.indexOf(normalizedPlan);

    return COMPANY_FIELDS
        .filter(f => PLAN_HIERARCHY.indexOf(f.requiredPlan) <= userPlanIndex)
        .map(f => f.field);
}

/**
 * Check if user has dashboard access
 */
export function hasDashboardAccess(userPlan: string | null | undefined): boolean {
    const normalizedPlan = normalizePlanName(userPlan);
    return !['Gratuito', 'Visitante'].includes(normalizedPlan);
}

/**
 * Normalize plan name to handle variations
 */
export function normalizePlanName(plan: string | null | undefined): PlanType {
    if (!plan) return 'Gratuito';

    const normalized = plan.trim();

    // Handle common variations
    if (normalized.toLowerCase() === 'básico' || normalized === 'Basic') {
        return 'Basic';
    }

    if (PLAN_HIERARCHY.includes(normalized as PlanType)) {
        return normalized as PlanType;
    }

    return 'Gratuito';
}

/**
 * Get display name for plan in Portuguese
 */
export function getPlanDisplayName(plan: PlanType): string {
    const names: Record<PlanType, string> = {
        'Gratuito': 'Gratuito',
        'Visitante': 'Visitante',
        'Basic': 'Básico',
        'Básico': 'Básico',
        'Premium': 'Premium',
        'Business Vendedor': 'Business Vendedor',
        'Parceiro': 'Parceiro'
    };
    return names[plan] || plan;
}

// ===========================================
// PLAN LIMITS & FEATURES
// ===========================================

/**
 * Product limits per month by plan
 */
export const PLAN_LIMITS: Record<PlanType, { products_per_month: number }> = {
    'Gratuito': { products_per_month: 0 },
    'Visitante': { products_per_month: 0 },
    'Basic': { products_per_month: 1 },
    'Básico': { products_per_month: 1 },
    'Premium': { products_per_month: 5 },
    'Business Vendedor': { products_per_month: 10 },
    'Parceiro': { products_per_month: Infinity }
};

/**
 * Features available by plan
 */
export const PLAN_FEATURES: Record<PlanType, {
    sms_notifications: boolean;
    presentations: boolean;
    featured_company: boolean;
}> = {
    'Gratuito': { sms_notifications: false, presentations: false, featured_company: false },
    'Visitante': { sms_notifications: false, presentations: false, featured_company: false },
    'Basic': { sms_notifications: false, presentations: false, featured_company: false },
    'Básico': { sms_notifications: false, presentations: false, featured_company: false },
    'Premium': { sms_notifications: true, presentations: false, featured_company: false },
    'Business Vendedor': { sms_notifications: true, presentations: true, featured_company: false },
    'Parceiro': { sms_notifications: true, presentations: true, featured_company: true }
};

/**
 * Get product limit per month for a plan
 */
export function getProductLimit(userPlan: string | null | undefined): number {
    const normalizedPlan = normalizePlanName(userPlan);
    return PLAN_LIMITS[normalizedPlan]?.products_per_month ?? 0;
}

/**
 * Check if plan can use SMS notifications
 */
export function canUseSMSNotifications(userPlan: string | null | undefined): boolean {
    const normalizedPlan = normalizePlanName(userPlan);
    return PLAN_FEATURES[normalizedPlan]?.sms_notifications ?? false;
}

/**
 * Check if plan can access presentations
 */
export function canUsePresentations(userPlan: string | null | undefined): boolean {
    const normalizedPlan = normalizePlanName(userPlan);
    return PLAN_FEATURES[normalizedPlan]?.presentations ?? false;
}

/**
 * Get remaining products user can create this month
 * @param userPlan - User's current plan
 * @param productsThisMonth - Number of products already created this month
 */
export function getRemainingProducts(userPlan: string | null | undefined, productsThisMonth: number): number {
    const limit = getProductLimit(userPlan);
    if (limit === Infinity) return Infinity;
    return Math.max(0, limit - productsThisMonth);
}

/**
 * Check if user can create a new product
 */
export function canCreateProduct(userPlan: string | null | undefined, productsThisMonth: number): boolean {
    const remaining = getRemainingProducts(userPlan, productsThisMonth);
    return remaining > 0;
}

/**
 * Check if plan has featured company highlight (Parceiro only)
 */
export function canHaveFeaturedCompany(userPlan: string | null | undefined): boolean {
    const normalizedPlan = normalizePlanName(userPlan);
    return PLAN_FEATURES[normalizedPlan]?.featured_company ?? false;
}
