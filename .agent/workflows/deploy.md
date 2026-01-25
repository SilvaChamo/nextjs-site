---
description: Como realizar o deploy manual através do editor
---

Para realizares o deploy das tuas alterações manualmente através do terminal do editor, podes usar um destes dois caminhos:

### Opção A: Usando o Git (Recomendado)
Sempre que fizeres "Push" das tuas alterações, o Vercel iniciará automaticamente um novo deploy.
// turbo
1. Corre este comando no terminal:
`git add . && git commit -m "Actualização manual" && git push`

### Opção B: Usando o Script NPM
Criei um atalho para ti no `package.json`.
// turbo
1. Basta correres:
`npm run deploy`

### Opção C: Forçar Build via Agent
Se preferires que eu faça, basta dizeres:
"Faz um deploy agora"
