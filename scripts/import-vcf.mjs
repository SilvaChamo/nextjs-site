import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const vcfPath = '/Users/macbook/Desktop/ScreasShort/00001.vcf';

async function importContacts() {
    try {
        const content = fs.readFileSync(vcfPath, 'utf-8');
        const vcardRegex = /BEGIN:VCARD[\s\S]*?END:VCARD/g;
        const cards = content.match(vcardRegex) || [];

        console.log(`Found ${cards.length} vCards in file.`);

        const contactsToInsert = [];
        const seenPhones = new Set();
        const seenEmails = new Set();

        for (const card of cards) {
            // Extract FN (Full Name)
            const fnMatch = card.match(/FN(?:;[^:]*)?:(.*)/);
            const name = fnMatch ? decodeQuotedPrintable(fnMatch[1].trim()) : '';

            // Extract TEL (Phone)
            // We'll take the first one or PREF one
            const telMatch = card.match(/TEL(?:;[^:]*)?:(.*)/);
            const phone = telMatch ? telMatch[1].trim().replace(/[\s\-\(\)]/g, '') : null;

            // Extract EMAIL
            const emailMatch = card.match(/EMAIL(?:;[^:]*)?:(.*)/);
            const email = emailMatch ? emailMatch[1].trim().toLowerCase() : null;

            // Extract ORG (Company/Role)
            const orgMatch = card.match(/ORG(?:;[^:]*)?:(.*)/);
            const org = orgMatch ? decodeQuotedPrintable(orgMatch[1].trim()) : '';

            if (!name && !phone && !email) continue;

            // Skip if duplicate in this batch
            if (phone && seenPhones.has(phone)) continue;
            if (email && seenEmails.has(email)) continue;

            contactsToInsert.push({
                name: name || 'Sem nome',
                role: org || 'Contacto importado',
                email: email,
                phone: phone,
                source: 'local_backup',
                notes: 'Importado de 00001.vcf',
                is_verified: false
            });

            if (phone) seenPhones.add(phone);
            if (email) seenEmails.add(email);
        }

        console.log(`Prepared ${contactsToInsert.length} unique contacts for insertion.`);

        // Batch insert in chunks of 50
        const chunkSize = 50;
        for (let i = 0; i < contactsToInsert.length; i += chunkSize) {
            const chunk = contactsToInsert.slice(i, i + chunkSize);

            // Check against database for duplicates
            // This is a simplification; a better way is to use ON CONFLICT in Supabase if we had a unique constraint
            // But we'll just try to insert and let the database handle it if there's a constraint, 
            // or just insert since we did batch deduplication here.

            const { data, error } = await supabase
                .from('contacts')
                .insert(chunk)
                .select();

            if (error) {
                console.error(`Error inserting chunk ${i / chunkSize}:`, error.message);
            } else {
                console.log(`Inserted chunk ${i / chunkSize + 1} (${chunk.length} contacts).`);
            }
        }

        console.log('Import finished.');

    } catch (error) {
        console.error('Import failed:', error);
    }
}

function decodeQuotedPrintable(str) {
    // Simple check for quoted-printable
    if (!str.includes('=')) return str;

    // Replace =XX sequences
    return str.replace(/=([0-9A-F]{2})/gi, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
    }).replace(/=\r?\n/g, ''); // Handle soft line breaks
}

importContacts();
