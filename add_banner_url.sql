-- SQL para adicionar a coluna de banner à tabela de empresas
-- Execute isto no Editor SQL do seu painel Supabase

ALTER TABLE companies ADD COLUMN IF NOT EXISTS banner_url TEXT;
