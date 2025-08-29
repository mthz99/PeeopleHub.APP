# 🚀 PeopleHub - Frontend

<div align="center">
  <img src="public/icon-192.svg" alt="PeopleHub Logo" width="120" height="120">
  
  **Aplicação moderna para gerenciamento de pessoas com interface elegante**
  
  [![Deploy Status](https://img.shields.io/badge/deploy-success-brightgreen)](https://peoplehubapp.web.app)
  [![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1+-purple)](https://vitejs.dev/)
  [![PWA](https://img.shields.io/badge/PWA-Ready-green)](https://web.dev/progressive-web-apps/)
</div>

## 🌟 Demonstração

**🌐 Aplicação Online:** [https://peoplehubapp.web.app](https://peoplehubapp.web.app)

### 📱 Screenshots

<details>
<summary>Ver capturas de tela</summary>

| Login | Dashboard | Formulário |
|-------|-----------|------------|
| ![Login](docs/login.png) | ![Dashboard](docs/dashboard.png) | ![Form](docs/form.png) |

</details>

## ✨ Funcionalidades

### 🔐 **Autenticação**
- ✅ Login seguro com JWT
- ✅ Registro de novos usuários
- ✅ Validação de CPF em tempo real
- ✅ Persistência de sessão

### 👥 **Gerenciamento de Pessoas**
- ✅ Listagem com busca instantânea
- ✅ Adicionar/Editar/Excluir pessoas
- ✅ Validação completa de formulários
- ✅ Paginação otimizada
- ✅ Filtros locais (sem requisições desnecessárias)

### 🎨 **Interface e UX**
- ✅ Design moderno e harmônico
- ✅ Responsivo (Desktop, Tablet, Mobile)
- ✅ Tema com gradientes suaves
- ✅ Componentes reutilizáveis
- ✅ Feedback visual completo

### ⚡ **Performance**
- ✅ Busca instantânea (< 50ms)
- ✅ Bundle otimizado (~90KB gzipped)
- ✅ React.memo e useCallback
- ✅ Lazy loading de componentes

### 📱 **PWA (Progressive Web App)**
- ✅ Instalável como app nativo
- ✅ Funciona offline (cache)
- ✅ Ícones para todos os dispositivos
- ✅ Manifest.json otimizado

## 🛠️ Tecnologias

### **Core**
- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript 5.8** - Tipagem estática
- **Vite 7.1** - Build tool ultrarrápido

### **Styling & UI**
- **CSS Custom Properties** - Sistema de design tokens
- **CSS Grid & Flexbox** - Layout responsivo
- **CSS Modules** - Componentes isolados

### **State Management**
- **React Context API** - Gerenciamento de estado global
- **React Hooks** - Estado local otimizado

### **HTTP & API**
- **Axios** - Cliente HTTP com interceptadores
- **JWT** - Autenticação segura
- **RESTful API** - Integração com PeopleHubAPI

### **Developer Experience**
- **ESLint** - Linting de código
- **Hot Module Replacement** - Desenvolvimento rápido
- **TypeScript Strict Mode** - Máxima segurança de tipos

## 🚀 Instalação e Execução

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn
- Git

### **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/PeopleHubAPP.git
cd PeopleHubAPP
```

### **2. Instale as dependências**
```bash
npm install
```

### **3. Execute em desenvolvimento**
```bash
npm run dev
```
🌐 Acesse: [http://localhost:5174](http://localhost:5174)

### **4. Build para produção**
```bash
npm run build
```

### **5. Preview do build**
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── 📂 components/          # Componentes reutilizáveis
│   ├── 📂 common/         # Componentes básicos (Button, Input, Modal)
│   ├── 📂 forms/          # Formulários especializados
│   └── 📂 layout/         # Componentes de layout (Header)
├── 📂 context/            # Context API (Auth)
├── 📂 hooks/              # Custom hooks
├── 📂 pages/              # Páginas da aplicação
│   ├── 📂 Login/          # Página de login
│   ├── 📂 Register/       # Página de registro
│   └── 📂 Dashboard/      # Página principal
├── 📂 services/           # Integração com API
├── 📂 styles/             # Estilos globais
├── 📂 types/              # Definições TypeScript
├── 📂 utils/              # Funções utilitárias
└── 📄 main.tsx            # Ponto de entrada
```

## 🧪 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm run preview` | Preview do build local |
| `npm run lint` | Verificar problemas no código |
| `npm run build:firebase` | Build + Deploy para Firebase |

## 🔧 Configuração

### **Variáveis de Ambiente**
Crie um arquivo `.env.local`:

```env
VITE_API_BASE_URL=https://PeopleHubAPI.somee.com
VITE_APP_NAME=PeopleHub
```

### **API Backend**
Este frontend se conecta com a API PeopleHub:
- **Base URL:** `https://PeopleHubAPI.somee.com`
- **Autenticação:** JWT Bearer Token
- **Endpoints:** `/api/Auth/*` e `/api/v1/PeopleHub/*`

## 📊 Performance

### **Métricas de Lighthouse**
- 🎯 **Performance:** 95+
- 🎯 **Accessibility:** 100
- 🎯 **Best Practices:** 100
- 🎯 **SEO:** 95+

### **Bundle Analysis**
- 📦 **Chunk principal:** ~276KB (90KB gzipped)
- 📦 **CSS:** ~16KB (3.6KB gzipped)
- ⚡ **Time to Interactive:** < 2s

## 🔐 Segurança

- ✅ **JWT Token** armazenado de forma segura
- ✅ **Interceptadores HTTP** para autenticação automática
- ✅ **Validação client-side** completa
- ✅ **Sanitização de inputs**
- ✅ **HTTPS** em produção

## 🚀 Deploy

### **Firebase Hosting (Automático)**
```bash
npm run build:firebase
```

### **Outros Providers**
```bash
# Build
npm run build

# A pasta 'dist' contém os arquivos para deploy
# Upload para seu provider preferido (Vercel, Netlify, etc.)
```

## 🤝 Contribuindo

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-feature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/nova-feature`)
5. Abra um **Pull Request**

### **Padrões de Código**
- Use **TypeScript** para tudo
- Siga o **ESLint** configurado
- Componentes em **PascalCase**
- Arquivos em **kebab-case**
- **CSS Modules** para estilos

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Time

Desenvolvido com carinho por:

- **[mTT](https://github.com/mthz99)** - 

<div align="center">
  <strong>🌟 Se este projeto te ajudou, deixe uma estrela! 🌟</strong>
  
  ![GitHub stars](https://img.shields.io/github/stars/seu-usuario/PeopleHubAPP?style=social)
  ![GitHub forks](https://img.shields.io/github/forks/seu-usuario/PeopleHubAPP?style=social)
</div>
