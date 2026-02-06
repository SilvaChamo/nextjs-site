-- Create deleted_presentations table for recycle bin functionality
CREATE TABLE IF NOT EXISTS public.deleted_presentations (
    id uuid PRIMARY KEY,
    title text NOT NULL,
    description text,
    slides jsonb NOT NULL DEFAULT '[]'::jsonb,
    user_id uuid REFERENCES auth.users(id),
    original_created_at timestamp with time zone,
    deleted_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.deleted_presentations ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users
CREATE POLICY "Users can manage deleted presentations" ON public.deleted_presentations
    FOR ALL USING (auth.role() = 'authenticated');
