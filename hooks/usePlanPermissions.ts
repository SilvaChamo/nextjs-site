"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
    canEditField,
    getEditableFields,
    hasDashboardAccess,
    getRequiredPlan,
    normalizePlanName,
    getPlanDisplayName,
    getProductLimit,
    canUseSMSNotifications,
    canUsePresentations,
    canCreateProduct,
    getRemainingProducts,
    canHaveFeaturedCompany,
    type PlanType
} from "@/lib/plan-fields";

interface UsePlanPermissionsResult {
    plan: PlanType;
    loading: boolean;
    canEdit: (fieldName: string) => boolean;
    getRequiredPlanForField: (fieldName: string) => PlanType | null;
    editableFields: string[];
    hasDashboard: boolean;
    planDisplayName: string;
    // Features
    productLimit: number;
    canSMS: boolean;
    canPresentations: boolean;
    canFeatured: boolean;
    canCreateNewProduct: (productsThisMonth: number) => boolean;
    remainingProducts: (productsThisMonth: number) => number;
}

export function usePlanPermissions(): UsePlanPermissionsResult {
    const [plan, setPlan] = useState<PlanType>('Gratuito');
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    setPlan('Gratuito');
                    setLoading(false);
                    return;
                }

                // Fetch company linked to this user
                const { data: company } = await supabase
                    .from('companies')
                    .select('plan')
                    .eq('user_id', user.id)
                    .single();

                if (company?.plan) {
                    setPlan(normalizePlanName(company.plan));
                } else {
                    // Check profile for plan
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('plan')
                        .eq('id', user.id)
                        .single();

                    setPlan(normalizePlanName(profile?.plan));
                }
            } catch (error) {
                console.error("Error fetching plan:", error);
                setPlan('Gratuito');
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, []);

    return {
        plan,
        loading,
        canEdit: (fieldName: string) => canEditField(plan, fieldName),
        getRequiredPlanForField: (fieldName: string) => getRequiredPlan(fieldName),
        editableFields: getEditableFields(plan),
        hasDashboard: hasDashboardAccess(plan),
        planDisplayName: getPlanDisplayName(plan),
        // Features
        productLimit: getProductLimit(plan),
        canSMS: canUseSMSNotifications(plan),
        canPresentations: canUsePresentations(plan),
        canFeatured: canHaveFeaturedCompany(plan),
        canCreateNewProduct: (productsThisMonth: number) => canCreateProduct(plan, productsThisMonth),
        remainingProducts: (productsThisMonth: number) => getRemainingProducts(plan, productsThisMonth)
    };
}


