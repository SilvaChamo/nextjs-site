-- Create integrations table
CREATE TABLE IF NOT EXISTS public.integrations (
    provider text PRIMARY KEY,
    credentials jsonb NOT NULL DEFAULT '{}'::jsonb,
    is_active boolean NOT NULL DEFAULT false,
    updated_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;

-- Simple policy for admins
CREATE POLICY "Allow all for authenticated users" ON public.integrations
    FOR ALL USING (auth.role() = 'authenticated');

-- Update articles table
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS shared_on_facebook_at timestamp with time zone;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS shared_on_linkedin_at timestamp with time zone;

-- Create presentations table
CREATE TABLE IF NOT EXISTS public.presentations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    slides jsonb NOT NULL DEFAULT '[]'::jsonb,
    user_id uuid REFERENCES auth.users(id),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.presentations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own presentations" ON public.presentations
    FOR ALL USING (auth.uid() = user_id);
