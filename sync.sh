#!/bin/bash

# Script de Sincronização Automática com o GitHub
# Uso: ./sync.sh "Sua mensagem de commit"

MESSAGE=${1:-"Actualização automática"}

echo "🚀 Iniciando sincronização..."

# 1. Adicionar mudanças
echo "📦 Adicionando arquivos..."
git add .

# 2. Commit
echo "💾 Criando commit: \"$MESSAGE\""
git commit -m "$MESSAGE"

# 3. Pull rebase (crucial para evitar erros de push)
echo "📥 Buscando actualizações do servidor..."
git pull --rebase origin main

# 4. Push
echo "📤 Enviando para o GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Sincronização concluída com sucesso!"
else
    echo "❌ Erro ao sincronizar. Verifique se há conflitos manuais."
fi
