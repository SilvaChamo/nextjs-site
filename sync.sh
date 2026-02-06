#!/bin/bash

# Script de Sincronização Automática com o GitHub
# Uso: ./sync.sh "Sua mensagem de commit" [--deploy]

MESSAGE=$1
DEPLOY_FLAG=""

# Verificar se --deploy foi passado como 1º ou 2º argumento
if [[ "$1" == "--deploy" ]]; then
    MESSAGE="Actualização automática"
    DEPLOY_FLAG=" [deploy]"
elif [[ "$2" == "--deploy" ]]; then
    DEPLOY_FLAG=" [deploy]"
fi

MESSAGE=${MESSAGE:-"Actualização automática"}
FULL_MESSAGE="${MESSAGE}${DEPLOY_FLAG}"

echo "🚀 Iniciando sincronização..."

# 1. Adicionar mudanças
echo "📦 Adicionando arquivos..."
git add .

# 2. Commit
echo "💾 Criando commit: \"$FULL_MESSAGE\""
git commit -m "$FULL_MESSAGE"

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
