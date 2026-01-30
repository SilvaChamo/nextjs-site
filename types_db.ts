export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    // Allows to automatically instantiate createClient with right options
    // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
    __InternalSupabase: {
        PostgrestVersion: "14.1"
    }
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
                    name: string
                    nuit: string | null
                    plan: string | null
                    product_limit: number | null
                    products: Json | null
                    province: string | null
                    registration_type: string | null
                    representative_name: string | null
                    services: string | null
                    slug: string | null
                    updated_at: string | null
                    user_id: string | null
                    value_chain: string | null
                    values: string | null
                    vision: string | null
                    website: string | null
                }
                Insert: {
                    activity?: string | null
                    address?: string | null
                    banner_url?: string | null
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
                    name: string
                    nuit?: string | null
                    plan?: string | null
                    product_limit?: number | null
                    products?: Json | null
                    province?: string | null
                    registration_type?: string | null
                    representative_name?: string | null
                    services?: string | null
                    slug?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    value_chain?: string | null
                    values?: string | null
                    vision?: string | null
                    website?: string | null
                }
                Update: {
                    activity?: string | null
                    address?: string | null
                    banner_url?: string | null
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
                    name?: string
                    nuit?: string | null
                    plan?: string | null
                    product_limit?: number | null
                    products?: Json | null
                    province?: string | null
                    registration_type?: string | null
                    representative_name?: string | null
                    services?: string | null
                    slug?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    value_chain?: string | null
                    values?: string | null
                    vision?: string | null
                    website?: string | null
                }
                Relationships: []
            }
            documents: {
                Row: {
                    category: string
                    created_at: string
                    description: string | null
                    file_url: string
                    id: string
                    size: string
                    title: string
                    type: string
                }
                Insert: {
                    category: string
                    created_at?: string
                    description?: string | null
                    file_url: string
                    id?: string
                    size: string
                    title: string
                    type: string
                }
                Update: {
                    category?: string
                    created_at?: string
                    description?: string | null
                    file_url?: string
                    id?: string
                    size?: string
                    title?: string
                    type?: string
                }
                Relationships: []
            }
            market_prices: {
                Row: {
                    change: number
                    created_at: string
                    date: string
                    id: string
                    market: string
                    price: number
                    product: string
                    trend: string
                    unit: string
                }
                Insert: {
                    change: number
                    created_at?: string
                    date: string
                    id?: string
                    market: string
                    price: number
                    product: string
                    trend: string
                    unit: string
                }
                Update: {
                    change?: number
                    created_at?: string
                    date?: string
                    id?: string
                    market?: string
                    price?: number
                    product?: string
                    trend?: string
                    unit?: string
                }
                Relationships: []
            }
            news: {
                Row: {
                    category: string
                    content: string | null
                    created_at: string
                    date: string
                    id: string
                    image_url: string | null
                    summary: string
                    title: string
                    views: number | null
                }
                Insert: {
                    category: string
                    content?: string | null
                    created_at?: string
                    date: string
                    id?: string
                    image_url?: string | null
                    summary: string
                    title: string
                    views?: number | null
                }
                Update: {
                    category?: string
                    content?: string | null
                    created_at?: string
                    date?: string
                    id?: string
                    image_url?: string | null
                    summary?: string
                    title?: string
                    views?: number | null
                }
                Relationships: []
            }
            products: {
                Row: {
                    category: string | null
                    company_id: string | null
                    created_at: string
                    description: string | null
                    id: string
                    image_url: string | null
                    is_available: boolean | null
                    name: string
                    price: number | null
                    user_id: string | null
                }
                Insert: {
                    category?: string | null
                    company_id?: string | null
                    created_at?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_available?: boolean | null
                    name: string
                    price?: number | null
                    user_id?: string | null
                }
                Update: {
                    category?: string | null
                    company_id?: string | null
                    created_at?: string
                    description?: string | null
                    id?: string
                    image_url?: string | null
                    is_available?: boolean | null
                    name?: string
                    price?: number | null
                    user_id?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "products_company_id_fkey"
                        columns: ["company_id"]
                        isOneToOne: false
                        referencedRelation: "companies"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    full_name: string | null
                    id: string
                    role: string | null
                    updated_at: string | null
                    username: string | null
                    website: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    full_name?: string | null
                    id: string
                    role?: string | null
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    full_name?: string | null
                    id?: string
                    role?: string | null
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
    PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
    ? R
    : never
    : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
            Row: infer R
        }
    ? R
    : never
    : never

export type TablesInsert<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Insert: infer I
    }
    ? I
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
    }
    ? I
    : never
    : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
        Update: infer U
    }
    ? U
    : never
    : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
    }
    ? U
    : never
    : never

export type Enums<
    PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof Database
    }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
    ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
