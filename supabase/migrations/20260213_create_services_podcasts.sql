-- Create 'Services' table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- Lucide icon name or image URL
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'Geral', -- 'Geral', 'Especializado', etc.
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create Policy: Public Read Access
CREATE POLICY "Public Read Access" ON public.services
    FOR SELECT TO public USING (true);

-- Create Policy: Admin Full Access
CREATE POLICY "Admin Full Access" ON public.services
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Create 'Podcasts' table (for Video Management)
CREATE TABLE IF NOT EXISTS public.podcasts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL, -- YouTube/Vimeo URL
    thumbnail_url TEXT,
    duration TEXT, -- e.g. "45 min"
    specialist_name TEXT,
    category TEXT, -- e.g. "Estratégia", "Produção"
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Podcasts
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;

-- Create Policy: Public Read Access
CREATE POLICY "Public Read Access" ON public.podcasts
    FOR SELECT TO public USING (true);

-- Create Policy: Admin Full Access
CREATE POLICY "Admin Full Access" ON public.podcasts
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Populate Services (Initial Data based on ServicesData)
INSERT INTO public.services (title, description, slug, category, icon) VALUES
('Sistemas de Rega', 'Soluções eficientes de irrigação', 'sistemas-de-rega', 'Infraestrutura', 'Droplets'),
('Maquinaria Agrícola', 'Tratores e equipamentos de ponta', 'maquinaria-agricola', 'Infraestrutura', 'Tractor'),
('Sementes e Fertilizantes', 'Insumos de alta qualidade', 'sementes-e-fertilizantes', 'Insumos', 'Sprout'),
('Consultoria Agronómica', 'Apoio técnico especializado', 'consultoria-agronomica', 'Serviços', 'ClipboardList');
