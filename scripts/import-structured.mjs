import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Structured import data following this format:
 * [
 *   { name: "Joao Silva", email: "joao@empresa.com", phone: "841234567", company_name: "Empresa X" },
 *   ...
 * ]
 */

async function importContacts(contactsData) {
    console.log(`Starting import of ${contactsData.length} contacts...`);

    // 1. Fetch all companies for matching
    const { data: companies } = await supabase.from('companies').select('id, name, website');

    const companyMap = new Map(); // Name -> ID
    const domainMap = new Map();  // Domain -> ID

    companies?.forEach(c => {
        if (c.name) companyMap.set(c.name.toLowerCase().trim(), c.id);
        if (c.website) {
            try {
                const domain = new URL(c.website.startsWith('http') ? c.website : `http://${c.website}`).hostname.replace('www.', '');
                domainMap.set(domain, c.id);
            } catch (e) {
                // Ignore invalid URLs
            }
        }
    });

    const finalContacts = [];

    for (const contact of contactsData) {
        let companyId = null;

        // Match by company name
        if (contact.company_name) {
            companyId = companyMap.get(contact.company_name.toLowerCase().trim());
        }

        // Match by email domain if no company name match or not provided
        if (!companyId && contact.email) {
            const domain = contact.email.split('@')[1];
            if (domain) {
                companyId = domainMap.get(domain);
            }
        }

        finalContacts.push({
            name: contact.name,
            email: contact.email?.toLowerCase().trim(),
            phone: contact.phone,
            role: contact.role || "Importado",
            company_id: companyId,
            source: 'structured_import',
            notes: contact.notes || `Importado de ficheiro estruturado. Empresa sugerida: ${contact.company_name || 'N/A'}`
        });
    }

    // Insert in chunks
    const chunkSize = 50;
    for (let i = 0; i < finalContacts.length; i += chunkSize) {
        const chunk = finalContacts.slice(i, i + chunkSize);
        const { error } = await supabase.from('contacts').insert(chunk);
        if (error) {
            console.error(`Error inserting chunk:`, error.message);
        } else {
            console.log(`Inserted chunk of ${chunk.length} contacts.`);
        }
    }

    console.log('Import finished.');
}

// Example usage:
// importContacts([ { name: "Teste", email: "teste@tecap.co.mz", phone: "84000000"} ]);
