# 🚀 CONTROLO DE DEPLOYS - BaseAgroData

Para evitar que o Vercel realize um deploy a cada "push" no Git e gaste os seus limites, siga estes passos para activar o **Deploy sob Demanda**.

---

## 1. Configuração no Vercel (Uma única vez)

1. Aceda ao seu painel no **Vercel**.
2. Seleccione o projecto **baseagrodata.com**.
3. Vá a **Settings** (topo) -> **Git** (lateral esquerda).
4. Procure pela secção **"Ignored Build Step"**.
5. No campo **Command**, cole exactamente isto:
   ```bash
   git log -1 --pretty=%B | grep -q "\[deploy\]"
   ```
6. Clique em **Save**.

---

## 2. Como trabalhar agora?

A partir de agora, o Vercel vai ignorar todos os seus envios para o GitHub, **A MENOS QUE** você diga explicitamente que quer um deploy.

### Durante o dia (Apenas salvar no Git)
Use o comando normal para sincronizar o seu trabalho:
```bash
./sync.sh "Minha alteração"
```
*O código será guardado no GitHub, mas o Vercel NÃO iniciará o build.*

### No final do dia (Sincronizar + Deploy Real)
Quando terminar todas as alterações e quiser ver o site actualizado, use a nova flag `--deploy`:
```bash
./sync.sh "Resumo das alterações do dia" --deploy
```
*Isso adicionará a marca `[deploy]` ao commit, e o Vercel iniciará o build automaticamente.*

---

## 3. Vantagens deste fluxo

1. **Economia de Recursos:** Não gasta minutos de build desnecessários.
2. **Estabilidade:** Só faz o deploy quando você tem a certeza que o código está estável.
3. **Organização:** O histórico do GitHub fica completo, mas o histórico de deploys fica limpo e apenas com versões finais.

---

*Guia de configuração técnica - Fevereiro 2026*
