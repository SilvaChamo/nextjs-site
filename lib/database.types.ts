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
                    shared_on_facebook_at: string | null
                    shared_on_linkedin_at: string | null
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
                    shared_on_facebook_at?: string | null
                    shared_on_linkedin_at?: string | null
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
                    shared_on_facebook_at?: string | null
                    shared_on_linkedin_at?: string | null
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
            integrations: {
                Row: {
                    provider: string
                    credentials: Json
                    is_active: boolean
                    updated_at: string | null
                    created_at: string | null
                }
                Insert: {
                    provider: string
                    credentials?: Json
                    is_active?: boolean
                    updated_at?: string | null
                    created_at?: string | null
                }
                Update: {
                    provider?: string
                    credentials?: Json
                    is_active?: boolean
                    updated_at?: string | null
                    created_at?: string | null
                }
                Relationships: []
            }
            forum_categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    icon: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    description?: string | null
                    icon?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    description?: string | null
                    icon?: string | null
                    created_at?: string
                }
                Relationships: []
            }
            forum_topics: {
                Row: {
                    id: string
                    category_id: string | null
                    user_id: string | null
                    title: string
                    content: string
                    views_count: number | null
                    created_at: string
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    category_id?: string | null
                    user_id?: string | null
                    title: string
                    content: string
                    views_count?: number | null
                    created_at?: string
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    category_id?: string | null
                    user_id?: string | null
                    title?: string
                    content?: string
                    views_count?: number | null
                    created_at?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "forum_topics_category_id_fkey"
                        columns: ["category_id"]
                        referencedRelation: "forum_categories"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "forum_topics_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            forum_comments: {
                Row: {
                    id: string
                    topic_id: string | null
                    user_id: string | null
                    content: string
                    created_at: string
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    topic_id?: string | null
                    user_id?: string | null
                    content: string
                    created_at?: string
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    topic_id?: string | null
                    user_id?: string | null
                    content?: string
                    created_at?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "forum_comments_topic_id_fkey"
                        columns: ["topic_id"]
                        referencedRelation: "forum_topics"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "forum_comments_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            presentations: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    slides: Json
                    user_id: string | null
                    created_at: string
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    title: string
                    description?: string | null
                    slides?: Json
                    user_id?: string | null
                    created_at?: string
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    slides?: Json
                    user_id?: string | null
                    created_at?: string
                    updated_at?: string | null
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
