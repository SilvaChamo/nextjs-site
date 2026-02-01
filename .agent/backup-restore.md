---
description: Sistema de Backup e Restore para alterações no código
---

## Sistema de Backup Automático

### Para criar um backup antes de alterações:
// turbo
1. Criar pasta de backup se não existir:
`mkdir -p .agent/backups`

### Backup de ficheiros específicos:
// turbo
2. Fazer backup do ficheiro actual:
`cp app/admin/blog/page.tsx .agent/backups/blog-page-$(date +%Y%m%d-%H%M%S).tsx`

### Para restaurar um backup:
// turbo
3. Listar backups disponíveis:
`ls -la .agent/backups/`

// turbo
4. Restaurar backup específico:
`cp .agent/backups/blog-page-20260201-185900.tsx app/admin/blog/page.tsx`

## Boas Práticas

- Sempre criar backup antes de alterações grandes
- Usar timestamps nos nomes dos ficheiros
- Manter vários backups recentes
- Documentar o que cada backup contém
