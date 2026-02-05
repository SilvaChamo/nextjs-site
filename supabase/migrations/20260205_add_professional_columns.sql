-- Add missing columns to professionals table
ALTER TABLE professionals 
ADD COLUMN IF NOT EXISTS academic_level text,
ADD COLUMN IF NOT EXISTS profession text,
ADD COLUMN IF NOT EXISTS whatsapp text,
ADD COLUMN IF NOT EXISTS facebook text,
ADD COLUMN IF NOT EXISTS instagram text;
