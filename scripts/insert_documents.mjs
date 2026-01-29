
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Load env vars manually
const envPath = path.resolve(process.cwd(), '.env.local');
let env = {};
try {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim().replace(/^["']|["']$/g, ''); // Remove quotes
        }
    });
} catch (e) {
    console.log("No .env.local found or error reading it.");
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing SUPABASE credentials.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const documents = [
    {
        title: "Política Agrária de Moçambique",
        subtitle: "Resolução n.º 11/95: Define os princípios fundamentais e objectivos da política agrária para o desenvolvimento sustentável do sector.",
        content: `
<h2>Introdução</h2>
<p>A Política Agrária define o quadro geral de intervenção no sector agrário, visando a segurança alimentar e o desenvolvimento económico sustentável.</p>
<h3>Principais Pilares</h3>
<ul>
    <li>Gestão sustentável dos recursos naturais (terra, água, florestas).</li>
    <li>Promoção da agricultura familiar e comercial.</li>
    <li>Investigação e extensão agrária.</li>
</ul>
<p>Este documento estabelece as bases para a transformação da agricultura em Moçambique.</p>
    `,
        slug: "politica-agraria-mocambique",
        type: "document",
        date: "1995-10-31",
        image_url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop",
        source: "Boletim da República",
        source_url: "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC004652/" // Example REAL link if possible, or generic
    },
    {
        title: "Lei de Terras",
        subtitle: "Lei n.º 19/97: Estabelece o regime jurídico da constituição, exercício, modificação, transmissão e extinção do direito de uso e aproveitamento da terra.",
        content: `
<h2>A Terra é Propriedade do Estado</h2>
<p>A Lei de Terras de Moçambique é um dos instrumentos mais importantes para a soberania e desenvolvimento rural.</p>
<h3>Pontos Chave</h3>
<ul>
    <li>O Direito de Uso e Aproveitamento da Terra (DUAT).</li>
    <li>Protecção dos direitos das comunidades locais.</li>
    <li>Mecanismos para investimento privado.</li>
</ul>
    `,
        slug: "lei-de-terras-1997",
        type: "document",
        date: "1997-10-01",
        image_url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
        source: "Imprensa Nacional",
        source_url: "https://www.portaldogoverno.gov.mz/por/Governo/Legislacao/Lei-de-Terras"
    },
    {
        title: "Regulamento de Pesticidas",
        subtitle: "Diploma Ministerial n.º 153/2002: Aprova o regulamento sobre a gestão, importação e uso de pesticidas.",
        content: `
<h2>Segurança e Controlo</h2>
<p>Este regulamento visa garantir que o uso de agroquímicos em Moçambique obedeça a padrões de segurança para a saúde pública e o meio ambiente.</p>
    `,
        slug: "regulamento-pesticidas-2002",
        type: "document",
        date: "2002-09-15",
        image_url: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1000&auto=format&fit=crop",
        source: "MASA",
        source_url: "https://open.unido.org/api/documents/4785860/download/Regulamento%20sobre%20Pesticidas.pdf"
    }
];

async function insertDocuments() {
    console.log("Inserting documents...");

    for (const doc of documents) {
        const { data, error } = await supabase
            .from('articles')
            .upsert(doc, { onConflict: 'slug' })
            .select();

        if (error) {
            console.error(`Error inserting ${doc.title}:`, error);
        } else {
            console.log(`Success: ${doc.title}`);
        }
    }
}

insertDocuments();
