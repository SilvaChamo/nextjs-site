-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    name TEXT,
    role TEXT,
    email TEXT,
    phone TEXT,
    phone_secondary TEXT,
    whatsapp TEXT,
    source TEXT DEFAULT 'manual',
    notes TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS contacts_company_id_idx ON contacts(company_id);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts(email);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now, can be restricted later)
CREATE POLICY "Allow all for contacts" ON contacts FOR ALL USING (true);

-- Add comment
COMMENT ON TABLE contacts IS 'Business contacts for companies';
