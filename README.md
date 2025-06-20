# Paleta Frutificando

Site responsivo para criação de paletas de cores para a Assembleia de Deus - Frutificando Vidas.

## 🎨 Funcionalidades

- **Seleção de Cores**: Escolha de 1 a 5 cores usando color picker ou inserindo códigos hex
- **Preview em Tempo Real**: Visualização instantânea da paleta selecionada
- **Geração de Imagem**: Criação automática de imagem da paleta com marca d'água da igreja
- **Download PNG**: Download da imagem gerada em alta qualidade
- **Compartilhamento WhatsApp**: Link direto para compartilhar a paleta via WhatsApp
- **URLs Compartilháveis**: As cores ficam salvas na URL para fácil compartilhamento
- **Design Responsivo**: Interface otimizada para mobile e desktop

## 🚀 Como usar

1. Acesse o site
2. Selecione suas cores usando os seletores de cor
3. Adicione ou remova cores conforme necessário (máximo 5)
4. Clique em "Gerar Designer" para criar a imagem da paleta
5. Baixe a imagem ou compartilhe via WhatsApp

## 📱 Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Tailwind CSS** - Framework de CSS
- **Vite** - Build tool
- **Lucide React** - Ícones
- **shadcn/ui** - Componentes de UI

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+ 
- pnpm (recomendado) ou npm

### Instalação
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd paleta-frutificando

# Instale as dependências
pnpm install

# Execute em modo de desenvolvimento
pnpm run dev
```

### Build para Produção
```bash
# Gere o build de produção
pnpm run build

# Os arquivos estarão na pasta 'dist'
```

## 🌐 Deploy no GitHub Pages

### Método 1: Deploy Manual

1. **Prepare o repositório:**
   ```bash
   # Faça o build do projeto
   pnpm run build
   
   # Commit e push do código
   git add .
   git commit -m "Adicionar site Paleta Frutificando"
   git push origin main
   ```

2. **Configure o GitHub Pages:**
   - Vá para Settings > Pages no seu repositório
   - Em "Source", selecione "Deploy from a branch"
   - Selecione a branch "main" e pasta "/ (root)"
   - Clique em "Save"

3. **Configure o Vite para GitHub Pages:**
   
   Edite o arquivo `vite.config.js`:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import path from 'path'

   export default defineConfig({
     plugins: [react()],
     base: '/paleta-frutificando/', // Substitua pelo nome do seu repositório
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
   })
   ```

4. **Crie um workflow do GitHub Actions:**
   
   Crie o arquivo `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: 18
             cache: 'npm'
         
         - name: Setup Pages
           uses: actions/configure-pages@v4
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

### Método 2: Deploy Automático com GitHub Actions

1. **Faça push do código:**
   ```bash
   git add .
   git commit -m "Configurar deploy automático"
   git push origin main
   ```

2. **Configure GitHub Pages:**
   - Vá para Settings > Pages
   - Em "Source", selecione "GitHub Actions"

3. **O deploy será automático** a cada push na branch main

## 📝 Estrutura do Projeto

```
paleta-frutificando/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   └── ui/            # Componentes de UI (shadcn/ui)
│   ├── assets/            # Imagens e recursos
│   ├── lib/               # Utilitários
│   ├── App.jsx            # Componente principal
│   ├── App.css            # Estilos principais
│   └── main.jsx           # Ponto de entrada
├── dist/                  # Build de produção (gerado)
├── package.json           # Dependências
├── vite.config.js         # Configuração do Vite
└── README.md              # Este arquivo
```

## 🎯 Funcionalidades Técnicas

### Geração de Imagem
- Utiliza Canvas API para gerar imagens em tempo real
- Formato PNG com fundo branco
- Marca d'água da igreja incluída
- Resolução otimizada para impressão e web

### Compartilhamento
- URLs com parâmetros de query para preservar cores selecionadas
- Integração direta com WhatsApp Web/App
- Mensagem personalizada com link da paleta

### Responsividade
- Design Mobile-First
- Grid responsivo para seletores de cores
- Botões e controles otimizados para touch
- Tipografia escalável

## 🔧 Personalização

### Alterando a Logo
1. Substitua o ícone no header editando o componente em `src/App.jsx`
2. Para usar uma imagem, adicione o arquivo em `src/assets/` e importe no componente

### Modificando Cores do Tema
1. Edite as variáveis CSS em `src/App.css`
2. Ou modifique as classes Tailwind diretamente nos componentes

### Ajustando a Marca D'água
1. Edite a função `generatePalette()` em `src/App.jsx`
2. Modifique o texto na linha que adiciona a marca d'água

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, entre em contato com o Ministério de Mídia da Assembleia de Deus - Frutificando Vidas.

---

**Desenvolvido com ❤️ para o Ministério de Mídia**

