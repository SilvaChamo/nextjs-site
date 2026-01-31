import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function sanitizeNames() {
    const { data: contacts, error } = await supabase
        .from('contacts')
        .select('id, name');

    if (error) {
        console.error('Error fetching contacts:', error);
        return;
    }

    console.log(`Starting sanitization for ${contacts.length} contacts...`);

    for (const contact of contacts) {
        if (!contact.name) continue;

        // Skip if it looks like an email or a URL
        if (contact.name.includes('@') || contact.name.includes('www.') || contact.name.includes('.com') || contact.name.includes('.co.mz')) {
            continue;
        }

        // Capitalize each word
        const sanitized = contact.name
            .split(' ')
            .map(word => {
                if (word.length <= 1) return word.toLowerCase();
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(' ');

        if (sanitized !== contact.name) {
            console.log(`Updating "${contact.name}" to "${sanitized}"`);
            await supabase
                .from('contacts')
                .update({ name: sanitized })
                .eq('id', contact.id);
        }
    }

    console.log('Sanitization complete.');
}

sanitizeNames();
