import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import {
    SEARCH_DATA
} from './lib/constants.js'; // Note: I need to ensure this is importable correctly in mjs or use an interim file.

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncMockupData() {
    console.log("Starting sync of mockup data from constants.ts...");

    // 1. Sync Companies
    console.log(`Syncing ${SEARCH_DATA.empresas.length} mockup companies...`);
    for (const mockCompany of SEARCH_DATA.empresas) {
        // Find existing company by name
        const { data: existing } = await supabase
            .from('companies')
            .select('id')
            .eq('name', mockCompany.title)
            .single();

        if (existing) {
            console.log(`Updating ${mockCompany.title}...`);
            await supabase.from('companies').update({
                category: mockCompany.sub,
                location: mockCompany.location,
                logo_url: mockCompany.logo
            }).eq('id', existing.id);
        } else {
            console.log(`Inserting new mockup company: ${mockCompany.title}...`);
            await supabase.from('companies').insert({
                name: mockCompany.title,
                category: mockCompany.sub,
                location: mockCompany.location,
                logo_url: mockCompany.logo,
                slug: mockCompany.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                is_featured: false
            });
        }
    }

    // 2. Sync Products
    console.log(`Syncing ${SEARCH_DATA.produtos.length} mockup products...`);
    for (const mockProduct of SEARCH_DATA.produtos) {
        // Check if product exists (table: produtos, column: nome)
        const { data: existingProd } = await supabase
            .from('produtos')
            .select('id')
            .eq('nome', mockProduct.title)
            .single();

        if (!existingProd) {
            console.log(`Inserting product: ${mockProduct.title}...`);
            // Note: prices are currently not in SEARCH_DATA but exist in schema. Defaulting to 0 or null.
            await supabase.from('produtos').insert({
                nome: mockProduct.title,
                preco: 0
            });
        }
    }

    console.log("Sync of mockup data finished.");
}

// syncMockupData();
