INSERT INTO companies (name, slug, category, location, description, is_featured, logo_url)
VALUES
  ('Mutiana', 'mutiana', 'Empoderamento Agrário', 'Moçambique', 'Promovendo a participação da mulher no agronegócio e desenvolvimento sustentável.', true, 'https://placehold.co/200x200/22c55e/ffffff/png?text=Mutiana'),
  ('Gutsamba', 'gutsamba', 'Comercialização Agrícola', 'Moçambique', 'Marketing e comercialização de produtos agrários de qualidade.', true, 'https://placehold.co/200x200/f97316/ffffff/png?text=Gutsamba'),
  ('Mozasem Sementes', 'mozasem-sementes', 'Sementes e Insumos', 'Maputo', 'Sementes de hortícolas de alta qualidade adaptadas ao clima tropical.', true, 'https://placehold.co/200x200/16a34a/ffffff/png?text=Mozasem'),
  ('Bindzu Agrobusiness', 'bindzu', 'Consultoria e Soluções', 'Moçambique', 'Solução completa para o agronegócio, do campo à mesa.', true, 'https://placehold.co/200x200/ea580c/ffffff/png?text=Bindzu'),
  ('Abiodes', 'abiodes', 'Desenvolvimento Sustentável', 'Moçambique', 'Associação para o Desenvolvimento Sustentável e gestão de recursos naturais.', true, 'https://placehold.co/200x200/0d9488/ffffff/png?text=Abiodes'),
  ('Tecap', 'tecap', 'Tecnologia e Consultoria', 'Maputo', 'Tecnologia e Consultoria Agro-Pecuária, contribuindo para o desenvolvimento desde 1989.', true, 'https://placehold.co/200x200/0284c7/ffffff/png?text=Tecap'),
  ('AQI', 'aqi', 'Insumos e Equipamentos', 'Moçambique', 'Tudo para Agricultura, Pecuária e Pescas.', true, 'https://placehold.co/200x200/dc2626/ffffff/png?text=AQI')
ON CONFLICT (slug) DO UPDATE SET
  is_featured = EXCLUDED.is_featured,
  description = EXCLUDED.description,
  logo_url = EXCLUDED.logo_url;
