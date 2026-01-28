-- Add mission, vision, and values columns to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS mission TEXT,
ADD COLUMN IF NOT EXISTS vision TEXT,
ADD COLUMN IF NOT EXISTS values TEXT;
