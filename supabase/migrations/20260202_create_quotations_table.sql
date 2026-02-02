-- Create quotations table
CREATE TABLE IF NOT EXISTS public.quotations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    sender_phone TEXT,
    message TEXT NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    details JSONB DEFAULT '{}'::jsonb, -- Store extra details like quantity, etc.
    status TEXT DEFAULT 'pending', -- pending, replied, archived
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.quotations ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Everyone can insert (send quotation)
CREATE POLICY "Enable insert for everyone" ON public.quotations FOR INSERT WITH CHECK (true);

-- 2. Companies can view quotations sent to them (linked via their user_id, but here company_id is explicit. 
-- However, typically we link company owning user. 
-- We need to check if the auth.uid() owns the company that received the quotation.
CREATE POLICY "Companies can view received quotations" ON public.quotations FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.companies
        WHERE public.companies.id = public.quotations.company_id
        AND public.companies.user_id = auth.uid()
    )
);

-- Optional: Sender can view their own quotations? (If we stored sender_user_id, but here it's public form mostly)
