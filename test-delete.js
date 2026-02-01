// Test script para verificar permissões de delete
import { createClient } from './utils/supabase/server';

async function testDelete() {
  const supabase = await createClient();
  
  console.log('=== TESTE DE DELETE ===');
  
  // 1. Buscar primeiro artigo activo
  const { data: articles, error: fetchError } = await supabase
    .from('articles')
    .select('id, title, deleted_at')
    .is('deleted_at', null)
    .limit(1);
    
  if (fetchError) {
    console.error('Erro ao buscar artigo:', fetchError);
    return;
  }
  
  if (!articles || articles.length === 0) {
    console.log('Nenhum artigo activo encontrado para teste');
    return;
  }
  
  const article = articles[0];
  console.log('Artigo encontrado para teste:', article);
  
  // 2. Tentar soft delete
  console.log('Tentando soft delete...');
  const { data: updateResult, error: updateError } = await supabase
    .from('articles')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', article.id)
    .select();
    
  if (updateError) {
    console.error('Erro no soft delete:', updateError);
    return;
  }
    
  console.log('Soft delete sucesso:', updateResult);
  
  // 3. Verificar se foi eliminado
  const { data: verifyResult, error: verifyError } = await supabase
    .from('articles')
    .select('id, title, deleted_at')
    .eq('id', article.id);
    
  if (verifyError) {
    console.error('Erro na verificação:', verifyError);
    return;
  }
    
  console.log('Verificação pós-delete:', verifyResult);
  
  // 4. Restaurar para não afectar o sistema
  console.log('Restaurando artigo...');
  const { error: restoreError } = await supabase
    .from('articles')
    .update({ deleted_at: null })
    .eq('id', article.id);
    
  if (restoreError) {
    console.error('Erro ao restaurar:', restoreError);
  } else {
    console.log('Artigo restaurado com sucesso');
  }
  
  console.log('=== FIM DO TESTE ===');
}

// Exportar para uso no browser
if (typeof window !== 'undefined') {
  (window as any).testDelete = testDelete;
}

export default testDelete;
