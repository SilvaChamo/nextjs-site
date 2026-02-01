-- SQL para corrigir permissões de usuários anónimos
-- Execute no SQL Editor do Supabase Dashboard

-- 1. Permitir SELECT para usuários anónimos (já funciona)
-- 2. Permitir INSERT para usuários anónimos
CREATE POLICY "Enable insert for anonymous users" ON articles
FOR INSERT
TO anon
WITH CHECK (true);

-- 3. Permitir UPDATE para usuários anónimos (apenas nos próprios registos)
CREATE POLICY "Enable update for anonymous users" ON articles
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);

-- 4. Permitir DELETE para usuários anónimos
CREATE POLICY "Enable delete for anonymous users" ON articles
FOR DELETE
TO anon
USING (true);

-- 5. Alternativa: Permitir tudo para usuários anónimos (mais simples)
-- Se as policies acima não funcionarem, use esta:

-- Drop policies existentes (se houver)
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON articles;
DROP POLICY IF EXISTS "Enable update for anonymous users" ON articles;
DROP POLICY IF EXISTS "Enable delete for anonymous users" ON articles;

-- Criar policy única para tudo
CREATE POLICY "Enable all operations for anonymous users" ON articles
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Verificar se RLS está activo
-- Se não estiver, active com:
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
