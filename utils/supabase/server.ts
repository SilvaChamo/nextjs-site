import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

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

    const config = {
        url: isValidUrl(url) ? url : 'https://placeholder.supabase.co',
        key: key || 'placeholder-key'
    }

    if (!isValidUrl(url) || !key) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('⚠️ Warning: Using placeholder Supabase credentials in utils/supabase/server.ts during build.')
        }
    }

    return createServerClient(
        config.url,
        config.key,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
