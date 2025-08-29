# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o PeopleHub! Suas contribuições são muito bem-vindas.

## 🚀 Como Contribuir

### 1. **Fork e Clone**
```bash
# Fork o repositório no GitHub
git clone https://github.com/SEU-USUARIO/PeopleHubAPP.git
cd PeopleHubAPP
```

### 2. **Instale as Dependências**
```bash
npm install
```

### 3. **Crie uma Branch**
```bash
git checkout -b feature/sua-nova-feature
# ou
git checkout -b fix/nome-do-bug
```

### 4. **Desenvolva e Teste**
```bash
# Execute em modo desenvolvimento
npm run dev

# Verifique o linting
npm run lint
```

### 5. **Commit suas Mudanças**
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

### 6. **Push e Pull Request**
```bash
git push origin feature/sua-nova-feature
```

Então abra um Pull Request no GitHub!

## 📋 Padrões de Código

### **Convenções de Commit**
Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` para novas funcionalidades
- `fix:` para correção de bugs
- `docs:` para documentação
- `style:` para formatação (sem mudança de código)
- `refactor:` para refatoração
- `test:` para testes
- `chore:` para tarefas de build/manutenção

**Exemplos:**
```bash
feat: adiciona validação de CPF em tempo real
fix: corrige bug na busca de pessoas
docs: atualiza README com novas instruções
style: formata código com prettier
refactor: move validações para utils
test: adiciona testes para PersonCard
chore: atualiza dependências do projeto
```

### **Estrutura de Arquivos**
- **Componentes**: PascalCase (`PersonCard.tsx`)
- **Arquivos**: kebab-case (`person-card.css`)
- **Variáveis**: camelCase (`userName`)
- **Constantes**: SNAKE_CASE (`API_BASE_URL`)

### **TypeScript**
- ✅ Use sempre TypeScript
- ✅ Defina interfaces para props e dados
- ✅ Evite `any` - use `unknown` se necessário
- ✅ Use tipos específicos sobre genéricos

### **React**
- ✅ Use hooks funcionais sobre classes
- ✅ Use `useCallback` e `useMemo` quando apropriado
- ✅ Components devem ser exportados como `export const`
- ✅ Props devem ter interface tipada

### **CSS**
- ✅ Use CSS Custom Properties (variáveis)
- ✅ Mobile-first (min-width media queries)
- ✅ BEM ou classes descritivas
- ✅ Evite `!important`

## 🐛 Reportando Bugs

Use o template de [Bug Report](https://github.com/seu-usuario/PeopleHubAPP/issues/new?template=bug_report.md):

**Inclua:**
- Descrição clara do bug
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots se aplicável
- Ambiente (OS, browser, versão)

## 💡 Sugerindo Features

Use o template de [Feature Request](https://github.com/seu-usuario/PeopleHubAPP/issues/new?template=feature_request.md):

**Inclua:**
- Problema que a feature resolve
- Solução proposta
- Alternativas consideradas
- Mockups ou wireframes se aplicável

## 🎯 Áreas que Precisam de Ajuda

### **🆘 Alta Prioridade**
- [ ] Testes unitários com React Testing Library
- [ ] Testes E2E com Playwright
- [ ] Documentação de componentes
- [ ] Melhorias de acessibilidade

### **🔧 Média Prioridade**
- [ ] Otimizações de performance
- [ ] Animações e micro-interações
- [ ] Internacionalização (i18n)
- [ ] Modo escuro

### **✨ Baixa Prioridade**
- [ ] Novos componentes de UI
- [ ] Integração com APIs externas
- [ ] Features experimentais

## 🧪 Executando Testes

```bash
# Quando implementarmos
npm run test
npm run test:e2e
npm run test:coverage
```

## 📝 Escrevendo Documentação

- **README.md**: Informações gerais do projeto
- **Component docs**: JSDoc nos componentes
- **CHANGELOG.md**: Registre mudanças importantes
- **Inline comments**: Para lógica complexa

## ✅ Checklist de Pull Request

Antes de submeter, verifique:

- [ ] **Código** segue os padrões estabelecidos
- [ ] **Testes** passam (quando implementados)
- [ ] **Lint** sem erros (`npm run lint`)
- [ ] **Build** funciona (`npm run build`)
- [ ] **Documentação** atualizada se necessário
- [ ] **Commits** seguem convenção
- [ ] **Branch** está atualizada com main

## 🎉 Reconhecimento

Contribuidores são listados no README e recebem reconhecimento público!

## 📞 Dúvidas?

- 💬 Abra uma [Discussion](https://github.com/seu-usuario/PeopleHubAPP/discussions)
- 📧 Email: seu-email@dominio.com
- 🐛 [Issue](https://github.com/seu-usuario/PeopleHubAPP/issues) para bugs

---

**Obrigado por contribuir! 🚀**
