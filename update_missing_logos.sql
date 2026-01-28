UPDATE companies SET logo_url = '/images/companies/bindzu.png' WHERE slug = 'bindzu';
UPDATE companies SET logo_url = '/images/companies/tecap.png' WHERE slug = 'tecap';
-- Also registering BCI if it was intended, but focusing on existing ones first.
-- ensure these are featured
UPDATE companies SET is_featured = true WHERE slug IN ('bindzu', 'tecap');
