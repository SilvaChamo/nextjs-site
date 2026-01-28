ALTER TABLE products 
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id);

-- Add policy for users to manage their own products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own products" 
ON products FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own products" 
ON products FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own products" 
ON products FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" 
ON products FOR DELETE 
USING (auth.uid() = user_id);

-- Allow public read access (for marketplace)
CREATE POLICY "Public can view products" 
ON products FOR SELECT 
USING (true);
