-- 1. Reset featured status for ALL companies
UPDATE companies SET is_featured = false;

-- 2. Upsert Aeromap
INSERT INTO companies (name, slug, category, location, description, is_featured, logo_url)
VALUES ('Aeromap', 'aeromap', 'Tecnologia Agrária', 'Moçambique', 'Fotografia e Mapeamento Aéreo para agricultura de precisão.', true, '/images/companies/aeromap.png')
ON CONFLICT (slug) DO UPDATE SET
  is_featured = true,
  category = 'Tecnologia Agrária',
  logo_url = '/images/companies/aeromap.png';

-- 3. Update existing companies with local logos and ensure they are featured
UPDATE companies SET logo_url = '/images/companies/abiodes.jpg', is_featured = true WHERE slug = 'abiodes';
UPDATE companies SET logo_url = '/images/companies/mozasem.jpg', is_featured = true WHERE slug = 'mozasem-sementes'; -- checking slug from previous insert
UPDATE companies SET logo_url = '/images/companies/mutiana.jpg', is_featured = true WHERE slug = 'mutiana';
UPDATE companies SET logo_url = '/images/companies/gutsamba.jpg', is_featured = true WHERE slug = 'gutsamba';

-- 4. Ensure others are featured (keeping placeholders or prev values)
UPDATE companies SET is_featured = true WHERE slug IN ('bindzu', 'tecap', 'aqi');

-- 5. Verify Categories (Optional updates based on user request "cada empresa na sua categoria")
UPDATE companies SET category = 'Sementes e Insumos' WHERE slug = 'mozasem-sementes';
UPDATE companies SET category = 'Consultoria e Soluções' WHERE slug = 'bindzu';
UPDATE companies SET category = 'Desenvolvimento Sustentável' WHERE slug = 'abiodes';
UPDATE companies SET category = 'Tecnologia e Consultoria' WHERE slug = 'tecap';
UPDATE companies SET category = 'Insumos e Equipamentos' WHERE slug = 'aqi';
