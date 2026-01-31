import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { parse } from 'csv-parse/sync';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const csvPath = './public/assets/eCAMPOS.csv';

async function importContacts() {
    try {
        if (!fs.existsSync(csvPath)) {
            console.error(`File not found: ${csvPath}`);
            return;
        }

        const content = fs.readFileSync(csvPath, 'utf-8');
        // The file has a title on line 1, and headers on line 2.
        const lines = content.split('\n');
        const csvContent = lines.slice(1).join('\n');

        const records = parse(csvContent, {
            columns: true,
            skip_empty_lines: true,
            delimiter: ',', // Assuming comma based on view_file output
        });

        console.log(`Found ${records.length} records in CSV.`);

        // Fetch existing emails to avoid duplicates
        const { data: existingContacts, error: fetchError } = await supabase
            .from('contacts')
            .select('email');

        if (fetchError) throw fetchError;
        const existingEmails = new Set();
        if (existingContacts) {
            existingContacts.forEach(c => {
                if (c.email) existingEmails.add(c.email.toLowerCase());
            });
        }

        const contactsToInsert = [];
        const seenInBatch = new Set();

        for (const record of records) {
            const email = record['Endereço de email']?.trim().toLowerCase();
            const nickname = record['Alcunha']?.trim();

            if (!email || !email.includes('@')) continue;
            if (existingEmails.has(email)) continue;
            if (seenInBatch.has(email)) continue;

            contactsToInsert.push({
                name: nickname || email.split('@')[0],
                email: email,
                source: 'google_group_ecampos',
                notes: `Membro do grupo Leitores do Jornal Entre CAMPOS. Adesão: ${record['Ano de adesão']}-${record['Mês de adesão']}-${record['Dia de adesão']}`,
                is_verified: false,
                role: 'Membro do Grupo'
            });

            seenInBatch.add(email);
        }

        console.log(`Prepared ${contactsToInsert.length} new unique contacts for insertion.`);

        if (contactsToInsert.length === 0) {
            console.log('No new contacts to insert.');
            return;
        }

        // Batch insert in chunks of 50
        const chunkSize = 50;
        for (let i = 0; i < contactsToInsert.length; i += chunkSize) {
            const chunk = contactsToInsert.slice(i, i + chunkSize);
            const { error: insertError } = await supabase
                .from('contacts')
                .insert(chunk);

            if (insertError) {
                console.error(`Error inserting chunk starting at ${i}:`, insertError.message);
            } else {
                console.log(`Inserted ${chunk.length} contacts...`);
            }
        }

        console.log('Import finished.');

        // Now run the linking logic (simple version)
        console.log('Running company linking logic...');
        // We'll use the SQL tool for linking after this script finishes.

    } catch (error) {
        console.error('Import failed:', error);
    }
}

importContacts();
