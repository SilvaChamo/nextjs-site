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

async function parseSharedStrings(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const strings = [];

    // Use a more robust approach to find all text inside <si> tags
    const siBlocks = content.split('</si>');
    for (const block of siBlocks) {
        if (!block.includes('<si>')) continue;
        const siContent = block.substring(block.indexOf('<si>') + 4);

        // Extract all text inside <t> tags
        let text = '';
        const tRegex = /<t[^>]*>(.*?)<\/t>/gs;
        let tMatch;
        while ((tMatch = tRegex.exec(siContent)) !== null) {
            text += tMatch[1];
        }
        if (text) strings.push(text);
    }
    return strings;
}

async function main() {
    const allContacts = [];
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

    // 1. Process Base de dados.xlsx
    console.log('Processing Base de dados.xlsx strings...');
    const baseStrings = await parseSharedStrings('/tmp/base_dados_xlsx/xl/sharedStrings.xml');
    console.log(`Found ${baseStrings.length} shared strings.`);

    // Since row-based parsing can be fragile, let's look for emails in context
    // Often the name is in the string index preceding the email if they were added in order
    for (let i = 0; i < baseStrings.length; i++) {
        const s = baseStrings[i];
        const emails = s.match(emailRegex);
        if (emails) {
            for (const email of emails) {
                // Try to find a name/company nearby
                const possibleName = i > 0 ? baseStrings[i - 1] : 'Contacto Extraído';
                const possibleCompany = i > 4 ? baseStrings[i - 4] : null;

                allContacts.push({
                    name: possibleName.length < 100 ? possibleName : 'Contacto do Excel',
                    role: 'Importado de Volume Externo',
                    email: email.toLowerCase(),
                    phone: null,
                    source: 'volume_backup',
                    notes: `Detectado em Base de dados.xlsx. Contexto: ${possibleCompany || '?'}`,
                    is_verified: false
                });
            }
        }
    }

    // 2. Process MADER XLSX
    console.log('Processing MADER XLSX strings...');
    const maderStrings = await parseSharedStrings('/tmp/mader_contacts_xlsx/xl/sharedStrings.xml');
    for (let i = 0; i < maderStrings.length; i++) {
        const s = maderStrings[i];
        const emails = s.match(emailRegex);
        if (emails) {
            for (const email of emails) {
                const possibleName = i > 0 ? maderStrings[i - 1] : 'MADER Contacto';
                allContacts.push({
                    name: possibleName.substring(0, 100),
                    role: 'Instituição Tutelada/MADER',
                    email: email.toLowerCase(),
                    phone: null,
                    source: 'volume_backup',
                    notes: `Importado de MADER - Extra - Contactos.xlsx`,
                    is_verified: false
                });
            }
        }
    }

    // 3. Process MADER PDF (Aggressive grep)
    console.log('Extracting from MADER PDF via Grep...');
    try {
        const pdfPath = "/Volumes/My-BackUp/___BACKUP/______EMPRESAS/———— BASE:DADOS/DIRECÇÃO/Emails/MADER - Extra - Contactos.pdf";
        const pdfContent = fs.readFileSync(pdfPath, 'binary'); // Read as binary to avoid encoding issues with strings
        const pdfEmails = pdfContent.match(emailRegex);
        if (pdfEmails) {
            for (const email of pdfEmails) {
                allContacts.push({
                    name: 'Contacto MADER (PDF)',
                    role: 'Extraído de PDF',
                    email: email.toLowerCase(),
                    phone: null,
                    source: 'volume_backup',
                    notes: `Detectado no ficheiro PDF correspondente.`,
                    is_verified: false
                });
            }
        }
    } catch (e) {
        console.error('PDF Read failed:', e.message);
    }

    // Deduplication
    const uniqueContacts = [];
    const seenEmails = new Set();
    for (const c of allContacts) {
        if (!seenEmails.has(c.email)) {
            uniqueContacts.push(c);
            seenEmails.add(c.email);
        }
    }

    console.log(`Final count to insert: ${uniqueContacts.length} unique contacts with emails.`);

    if (uniqueContacts.length === 0) {
        console.log('No contacts found.');
        return;
    }

    const chunkSize = 50;
    for (let i = 0; i < uniqueContacts.length; i += chunkSize) {
        const chunk = uniqueContacts.slice(i, i + chunkSize);
        const { error } = await supabase.from('contacts').insert(chunk);
        if (error) {
            console.error(`Error inserting chunk ${i / chunkSize}:`, error.message);
        } else {
            console.log(`Inserted chunk ${i / chunkSize + 1} (${chunk.length} contacts).`);
        }
    }

    console.log('Import finished.');
}

main();
