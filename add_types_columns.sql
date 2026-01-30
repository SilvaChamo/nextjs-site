-- Add type column to companies for filtering (Publica, Privada, Internacional, Associacao)
ALTER TABLE companies ADD COLUMN IF NOT EXISTS type text DEFAULT 'Privada';

-- Add ownership_type column to properties (Publica, Privada, Particular)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS ownership_type text DEFAULT 'Privada';

-- Add status column to properties if not exists (Venda, Arrendamento)
ALTER TABLE properties ADD COLUMN IF NOT EXISTS status text DEFAULT 'Venda';

-- Add size column to properties if not exists
ALTER TABLE properties ADD COLUMN IF NOT EXISTS size text;

-- Add price to properties if not exists
ALTER TABLE properties ADD COLUMN IF NOT EXISTS price numeric;
