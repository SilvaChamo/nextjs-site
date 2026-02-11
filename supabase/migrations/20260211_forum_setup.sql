-- Forum Setup Migration
-- Create forum_categories table
CREATE TABLE IF NOT EXISTS public.forum_categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    icon text,
    created_at timestamp with time zone DEFAULT now()
);

-- Create forum_topics table
CREATE TABLE IF NOT EXISTS public.forum_topics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid REFERENCES public.forum_categories(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    title text NOT NULL,
    content text NOT NULL,
    views_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create forum_comments table
CREATE TABLE IF NOT EXISTS public.forum_comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id uuid REFERENCES public.forum_topics(id) ON DELETE CASCADE,
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for forum_categories
CREATE POLICY "Allow public read for forum_categories" ON public.forum_categories FOR SELECT USING (true);
CREATE POLICY "Allow admin manage for forum_categories" ON public.forum_categories FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for forum_topics
CREATE POLICY "Allow public read for forum_topics title" ON public.forum_topics FOR SELECT USING (true);
CREATE POLICY "Allow authenticated create for forum_topics" ON public.forum_topics FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow users update own topics" ON public.forum_topics FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow users delete own topics" ON public.forum_topics FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for forum_comments
CREATE POLICY "Allow authenticated read for forum_comments" ON public.forum_comments FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated create for forum_comments" ON public.forum_comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow users update own comments" ON public.forum_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow users delete own comments" ON public.forum_comments FOR DELETE USING (auth.uid() = user_id);

-- Add some default categories
INSERT INTO public.forum_categories (name, slug, description, icon) VALUES
('Tecnologia Agrícola', 'tecnologia-agricola', 'Discussão sobre novas tecnologias e inovações no campo.', 'Cpu'),
('Mercado e Preços', 'mercado-precos', 'Debates sobre tendências de mercado e flutuação de preços.', 'TrendingUp'),
('Gestão de Fazendas', 'gestao-fazendas', 'Melhores práticas para gestão e produtividade.', 'Layout'),
('Sustentabilidade', 'sustentabilidade', 'Práticas agrícolas sustentáveis e meio ambiente.', 'Leaf')
ON CONFLICT (slug) DO NOTHING;
