// Script para verificar permissões do Supabase
import { supabase } from './lib/supabaseClient';

async function checkPermissions() {
  console.log('=== VERIFICANDO PERMISSÕES DO SUPABASE ===');
  
  // 1. Verificar se consegue ler
  console.log('\n📋 Testando permissão de SELECT...');
  const { data: selectData, error: selectError } = await supabase
    .from('articles')
    .select('id, title')
    .limit(1);
    
  if (selectError) {
    console.error('❌ SELECT falhou:', selectError);
  } else {
    console.log('✅ SELECT funcionou:', selectData?.length, 'artigos');
  }
  
  // 2. Verificar se consegue fazer UPDATE
  console.log('\n✏️ Testando permissão de UPDATE...');
  if (selectData && selectData.length > 0) {
    const testId = selectData[0].id;
    const { data: updateData, error: updateError, count: updateCount } = await supabase
      .from('articles')
      .update({ title: 'TESTE PERMISSAO' }, { count: 'exact' })
      .eq('id', testId)
      .select();
      
    if (updateError) {
      console.error('❌ UPDATE falhou:', updateError);
    } else {
      console.log('✅ UPDATE funcionou, rows affected:', updateCount);
      
      // Restaurar título original
      await supabase
        .from('articles')
        .update({ title: selectData[0].title })
        .eq('id', testId);
    }
  }
  
  // 3. Verificar se consegue fazer INSERT
  console.log('\n➕ Testando permissão de INSERT...');
  const { data: insertData, error: insertError } = await supabase
    .from('articles')
    .insert({
      title: 'TESTE PERMISSAO',
      subtitle: 'Teste',
      type: 'Teste',
      slug: 'teste-permissao-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    })
    .select();
    
  if (insertError) {
    console.error('❌ INSERT falhou:', insertError);
  } else {
    console.log('✅ INSERT funcionou:', insertData);
    
    // Tentar eliminar o artigo de teste
    if (insertData && insertData.length > 0) {
      console.log('\n🗑️ Testando permissão de DELETE no artigo criado...');
      const { data: deleteData, error: deleteError, count: deleteCount } = await supabase
        .from('articles')
        .delete({ count: 'exact' })
        .eq('id', insertData[0].id);
        
      if (deleteError) {
        console.error('❌ DELETE falhou:', deleteError);
      } else {
        console.log('✅ DELETE funcionou, rows affected:', deleteCount);
      }
    }
  }
  
  // 4. Verificar usuário actual
  console.log('\n👤 Verificando usuário actual...');
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error('❌ Erro ao obter usuário:', userError);
  } else {
    console.log('✅ Usuário:', user ? 'Logado' : 'Anónimo');
    if (user) {
      console.log('📧 Email:', user.email);
      console.log('🆔 ID:', user.id);
    }
  }
  
  // 5. Verificar se há RLS activo
  console.log('\n🔒 Verificando RLS (Row Level Security)...');
  const { data: rlsData, error: rlsError } = await supabase
    .rpc('check_rls_status'); // Esta função pode não existir
    
  if (rlsError) {
    console.log('⚠️ Não foi possível verificar RLS (provavelmente RLS está activo)');
  } else {
    console.log('✅ Status RLS:', rlsData);
  }
  
  console.log('\n=== FIM DA VERIFICAÇÃO ===');
}

// Exportar para uso no browser
if (typeof window !== 'undefined') {
  (window as any).checkPermissions = checkPermissions;
}

export default checkPermissions;
