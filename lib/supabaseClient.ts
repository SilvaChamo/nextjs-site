import { createClient } from '@supabase/supabase-js'

const getSupabaseConfig = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Validation to prevent build-time crashes if variables are missing
    const isValidUrl = (u: string | undefined): u is string => {
        if (!u) return false
        try {
            new URL(u)
            return true
        } catch {
            return false
        }
    }

    if (!isValidUrl(url) || !key) {
        if (process.env.NODE_ENV === 'production') {
            console.error('❌ CRITICAL: Supabase credentials missing or invalid in production!')
        } else {
            console.warn('⚠️ Warning: Using placeholder Supabase credentials for build/development.')
        }
        return {
            url: 'https://placeholder.supabase.co',
            key: 'placeholder-key'
        }
    }

    return { url, key }
}

const { url, key } = getSupabaseConfig()
export const supabase = createClient(url, key)
