import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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
        if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
            console.warn('⚠️ Warning: Using placeholder Supabase credentials in utils/supabase/client.ts during build.')
        }
        return createBrowserClient(
            'https://placeholder.supabase.co',
            'placeholder-key'
        )
    }

    return createBrowserClient(url, key)
}
