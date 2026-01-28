-- Improve Gutsamba description based on search (natural liqueurs, native fruits)
UPDATE companies 
SET description = 'Produção de licores naturais, piri-piri e achares derivados de frutas nativas como mapfilwa e massala.' 
WHERE slug = 'gutsamba';

-- Improve AQI description (Leader in distribution, technical support)
UPDATE companies 
SET description = 'A maior rede de distribuição de insumos e equipamentos para Agricultura, Pecuária e Pescas em Moçambique.' 
WHERE slug = 'aqi';

-- Improve Mutiana (already good, but ensuring specific focus on women)
UPDATE companies 
SET description = 'Empoderamento da mulher no agronegócio através de investimentos e desenvolvimento sustentável.' 
WHERE slug = 'mutiana';

-- Improve Abiodes (emphasize sustainable development)
UPDATE companies 
SET description = 'Promoção do desenvolvimento sustentável e gestão eficiente de recursos naturais em Moçambique.' 
WHERE slug = 'abiodes';

-- Improve Bindzu (Farm to Table concept)
UPDATE companies 
SET description = 'Soluções completas de agronegócio e consultoria, integrando a cadeia de valor do campo à mesa.' 
WHERE slug = 'bindzu';
