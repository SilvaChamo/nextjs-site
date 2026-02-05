-- Add updated_at column to professionals table
ALTER TABLE professionals 
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT NOW();
