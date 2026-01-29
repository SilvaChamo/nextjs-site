export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            agricultural_stats: {
                Row: {
                    category: string
                    created_at: string
                    id: string
                    label: string
                    province: string
                    value: number
                    variation: number | null
                    year: string | null
                }
                Insert: {
                    category: string
                    created_at?: string
                    id?: string
                    label: string
                    province: string
                    value: number
                    variation?: number | null
                    year?: string | null
                }
                Update: {
                    category?: string
                    created_at?: string
                    id?: string
                    label?: string
                    province?: string
                    value?: number
                    variation?: number | null
                    year?: string | null
                }
                Relationships: []
            }
            articles: {
                Row: {
                    content: string | null
                    created_at: string
                    date: string | null
                    id: string
                    image_url: string | null
                    slug: string | null
                    source: string | null
                    source_url: string | null
                    subtitle: string | null
                    title: string
                    type: string | null
                }
                Insert: {
                    content?: string | null
                    created_at?: string
                    date?: string | null
                    id?: string
                    image_url?: string | null
                    slug?: string | null
                    source?: string | null
                    source_url?: string | null
                    subtitle?: string | null
                    title: string
                    type?: string | null
                }
                Update: {
                    content?: string | null
                    created_at?: string
                    date?: string | null
                    id?: string
                    image_url?: string | null
                    slug?: string | null
                    source?: string | null
                    source_url?: string | null
                    subtitle?: string | null
                    title?: string
                    type?: string | null
                }
                Relationships: []
            }
            companies: {
                Row: {
                    activity: string | null
                    address: string | null
                    banner_url: string | null
                    billing_period: string | null
                    category: string | null
                    contact: string | null
                    created_at: string
                    description: string | null
                    district: string | null
                    email: string | null
                    geo_location: string | null
                    id: string
                    image_url: string | null
                    is_featured: boolean | null
                    is_verified: boolean | null
                    location: string | null
                    logo_url: string | null
                    mission: string | null
                    name: string | null
                    nuit: string | null
                    plan: string | null
                    product_limit: number | null
                    products: Json | null
                    province: string | null
                    registration_type: string | null
                    services: string | null
                    slug: string | null
                    updated_at: string | null
                    user_id: string | null
                    value_chain: string | null
                    values: string | null
                    vision: string | null
                }
                Insert: {
                    activity?: string | null
                    address?: string | null
                    banner_url?: string | null
                    billing_period?: string | null
                    category?: string | null
                    contact?: string | null
                    created_at?: string
                    description?: string | null
                    district?: string | null
                    email?: string | null
                    geo_location?: string | null
                    id?: string
                    image_url?: string | null
                    is_featured?: boolean | null
                    is_verified?: boolean | null
                    location?: string | null
                    logo_url?: string | null
                    mission?: string | null
                    name?: string | null
                    nuit?: string | null
                    plan?: string | null
                    product_limit?: number | null
                    products?: Json | null
                    province?: string | null
                    registration_type?: string | null
                    services?: string | null
                    slug?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    value_chain?: string | null
                    values?: string | null
                    vision?: string | null
                }
                Update: {
                    activity?: string | null
                    address?: string | null
                    banner_url?: string | null
                    billing_period?: string | null
                    category?: string | null
                    contact?: string | null
                    created_at?: string
                    description?: string | null
                    district?: string | null
                    email?: string | null
                    geo_location?: string | null
                    id?: string
                    image_url?: string | null
                    is_featured?: boolean | null
                    is_verified?: boolean | null
                    location?: string | null
                    logo_url?: string | null
                    mission?: string | null
                    name?: string | null
                    nuit?: string | null
                    plan?: string | null
                    product_limit?: number | null
                    products?: Json | null
                    province?: string | null
                    registration_type?: string | null
                    services?: string | null
                    slug?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    value_chain?: string | null
                    values?: string | null
                    vision?: string | null
                }
                Relationships: []
            }
            dashboard_indicators: {
                Row: {
                    created_at: string
                    id: string
                    location: string
                    slug: string
                    title: string
                    trend: string | null
                    value: string
                }
                Insert: {
                    created_at?: string
                    id?: string
                    location: string
                    slug: string
                    title: string
                    trend?: string | null
                    value: string
                }
                Update: {
                    created_at?: string
                    id?: string
                    location?: string
                    slug?: string
                    title?: string
                    trend?: string | null
                    value?: string
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    created_at: string | null
                    district: string | null
                    email: string
                    full_name: string | null
                    id: string
                    phone: string | null
                    province: string | null
                    updated_at: string | null
                    user_type: string | null
                }
                Insert: {
                    created_at?: string | null
                    district?: string | null
                    email: string
                    full_name?: string | null
                    id: string
                    phone?: string | null
                    province?: string | null
                    updated_at?: string | null
                    user_type?: string | null
                }
                Update: {
                    created_at?: string | null
                    district?: string | null
                    email?: string
                    full_name?: string | null
                    id?: string
                    phone?: string | null
                    province?: string | null
                    updated_at?: string | null
                    user_type?: string | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
