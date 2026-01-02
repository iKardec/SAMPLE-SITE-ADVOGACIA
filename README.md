# 🏛️ Kardec Advocacia - Portfólio Profissional

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

> Site institucional moderno e profissional para escritório de advocacia, focado em excelência, credibilidade e experiência premium para o usuário.

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Demonstração](#demonstração)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Instalação](#instalação)
- [Como Usar](#como-usar)
- [Personalização](#personalização)
- [SEO e Performance](#seo-e-performance)
- [Navegadores Suportados](#navegadores-suportados)
- [Roadmap](#roadmap)
- [Licença](#licença)

---

## 🎯 Sobre o Projeto

**Kardec Advocacia** é um template completo e moderno para escritórios de advocacia que buscam uma presença digital profissional e impactante. O projeto foi desenvolvido com foco em:

- ✨ **Design Premium**: Interface elegante com cores sóbrias e tipografia clássica
- 📱 **Responsividade Total**: Perfeito em todos os dispositivos (mobile-first)
- ⚡ **Performance Otimizada**: Carregamento rápido e otimizações avançadas
- ♿ **Acessibilidade**: Seguindo padrões WCAG 2.1
- 🔍 **SEO-Friendly**: Estrutura otimizada para mecanismos de busca
- 🎨 **UX/UI Excepcional**: Experiência de usuário intuitiva e agradável

---

## 🖼️ Demonstração

### Preview Desktop
![Desktop Preview](./assets/images/preview/desktop.png)

### Preview Mobile
![Mobile Preview](./assets/images/preview/mobile.png)

**🔗 [Ver Demo ao Vivo](#)** _(adicione o link quando disponível)_

---

## ✨ Funcionalidades

### Principais

- 🏠 **Hero Section**: Primeira impressão impactante com call-to-actions estratégicos
- 📖 **Sobre o Escritório**: Apresentação institucional com estatísticas animadas
- ⚖️ **Áreas de Atuação**: Grid de cards com 6 especialidades jurídicas
- 👥 **Equipe de Advogados**: Apresentação profissional com fotos e especialidades
- 💬 **Depoimentos**: Carrossel de avaliações de clientes
- 📞 **Formulário de Contato**: Validação em tempo real e feedback visual
- 🗺️ **Mapa Integrado**: Localização do escritório via Google Maps

### Funcionalidades Técnicas

- 🎨 **Animações Suaves**: Scroll animations com Intersection Observer
- 📊 **Counter Animations**: Estatísticas animadas ao entrar na viewport
- 🧭 **Navegação Inteligente**: Menu sticky com highlight automático da seção ativa
- 📱 **Menu Mobile**: Hamburger menu fluido e responsivo
- ✅ **Validação de Formulário**: Validação em tempo real com feedback visual
- 🎯 **Smooth Scroll**: Navegação suave entre seções
- 🔒 **LGPD Compliance**: Checkbox de consentimento e políticas de privacidade

---

## 🛠️ Tecnologias

### Core

- **HTML5** - Marcação semântica e estruturada
- **CSS3** - Design system com Custom Properties
  - Flexbox & Grid Layout
  - Animations & Transitions
  - Mobile-first approach
- **JavaScript ES6+** - Módulos nativos e programação moderna
  - Classes e Async/Await
  - Intersection Observer API
  - Event Delegation

### Bibliotecas Externas (CDN)

```html
<!-- Fontes -->
Google Fonts: Playfair Display, Inter, Crimson Text

<!-- Ícones -->
Font Awesome 6.4.0
```

### Ferramentas de Desenvolvimento

- **VS Code** - Editor de código
- **Live Server** - Servidor de desenvolvimento local
- **Git** - Controle de versão

---

## 📁 Estrutura de Pastas

```
portfolio-advogados/
│
├── index.html                      # Página principal
│
├── assets/
│   ├── css/
│   │   ├── reset.css              # Reset CSS moderno
│   │   ├── variables.css          # Variáveis CSS (Design System)
│   │   ├── global.css             # Estilos globais e utilitários
│   │   ├── components.css         # Componentes reutilizáveis
│   │   └── sections.css           # Estilos de seções específicas
│   │
│   ├── js/
│   │   ├── utils.js               # Funções utilitárias
│   │   ├── navigation.js          # Gerenciamento de navegação
│   │   ├── animations.js          # Animações e scroll effects
│   │   ├── form.js                # Validação e envio de formulário
│   │   └── main.js                # Inicialização principal
│   │
│   └── images/
│       ├── logo/                  # Logos e favicons
│       ├── team/                  # Fotos da equipe
│       ├── hero/                  # Imagens de hero section
│       └── backgrounds/           # Imagens de fundo
│
├── README.md                      # Documentação
└── PORTFOLIO_ADVOGADOS_PLANEJAMENTO.md  # Planejamento completo
```

---

## 🚀 Instalação

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Editor de código (VS Code recomendado)
- Live Server ou similar (opcional)

### Passos

1. **Clone ou baixe o repositório**

```bash
git clone [url-do-repositorio]
cd portfolio-advogados
```

2. **Abra o projeto**

   - Abra a pasta no VS Code
   - Ou simplesmente abra `index.html` no navegador

3. **Desenvolvimento Local** (opcional)

```bash
# Se usar Live Server no VS Code
# Clique com botão direito em index.html > Open with Live Server

# Ou use um servidor HTTP simples
npx serve
```

---

## 📖 Como Usar

### 1. Personalização Básica

#### Alterar Informações do Escritório

Edite o `index.html` e substitua:

- Nome do escritório
- Endereço e contatos
- Áreas de atuação
- Informações da equipe

#### Alterar Cores

Edite `assets/css/variables.css`:

```css
:root {
  --primary-dark: #1a1a2e;    /* Sua cor primária */
  --primary-gold: #c9a961;    /* Cor de destaque */
  --accent-blue: #2c5f7d;     /* Cor de acento */
}
```

#### Alterar Fontes

Edite no `<head>` do `index.html` e em `variables.css`:

```css
--font-heading: 'Sua Fonte', serif;
--font-body: 'Sua Fonte', sans-serif;
```

### 2. Adicionar Imagens

Substitua as imagens placeholder em:

- `assets/images/hero/hero-bg.jpg` - Imagem do hero
- `assets/images/team/lawyer-1.jpg` - Fotos dos advogados
- `assets/images/logo/` - Logo do escritório

### 3. Configurar Formulário

Edite `assets/js/form.js` na função `submitForm()`:

```javascript
// Integre com seu backend ou serviço de email
const response = await fetch('SUA_URL_DE_API', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

**Opções de integração:**

- **EmailJS** - Envio direto por email
- **Formspree** - Formulário simples
- **Backend próprio** - Node.js, PHP, etc.

---

## 🎨 Personalização

### Design System

Todas as variáveis de design estão centralizadas em `variables.css`:

- **Cores** - Paleta completa
- **Tipografia** - Tamanhos e pesos
- **Espaçamento** - Sistema de spacing
- **Bordas** - Border radius
- **Sombras** - Box shadows
- **Transições** - Durações e curvas

### Adicionar Nova Seção

1. Adicione o HTML na posição desejada
2. Crie os estilos em `sections.css`
3. Adicione link no menu de navegação
4. Atualize o smooth scroll se necessário

### Customizar Animações

Edite `assets/js/animations.js`:

```javascript
// Adicionar delay nas animações
element.style.animationDelay = '0.2s';

// Mudar tipo de animação
element.style.animation = 'fadeIn 1s ease-out';
```

---

## 🔍 SEO e Performance

### SEO

✅ **Implementado:**

- Meta tags completas (title, description, keywords)
- Open Graph tags (Facebook)
- Twitter Cards
- Schema.org markup (LegalService)
- Sitemap.xml estruturado
- URLs semânticas
- Headings hierárquicos (H1 único)
- Alt text em imagens

### Performance

✅ **Otimizações:**

- CSS minificado em produção
- JavaScript modular
- Imagens otimizadas (WebP recomendado)
- Lazy loading de imagens
- Font display: swap
- Recursos externos com preconnect
- Critical CSS inline (opcional)

### Lighthouse Score Esperado

- 🟢 **Performance**: 90+
- 🟢 **Accessibility**: 95+
- 🟢 **Best Practices**: 95+
- 🟢 **SEO**: 100

---

## 🌐 Navegadores Suportados

| Navegador      | Versão  |
| -------------- | ------- |
| Chrome         | 90+     |
| Firefox        | 88+     |
| Safari         | 14+     |
| Edge           | 90+     |
| Opera          | 76+     |

**Nota**: Funcionalidades modernas como CSS Grid, Flexbox e ES6 Modules são utilizadas.

---

## 🗺️ Roadmap

### Versão 1.1 (Futuro)

- [ ] Blog integrado
- [ ] Sistema de busca
- [ ] Modo escuro (dark mode)
- [ ] Multi-idioma (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Chat ao vivo
- [ ] Portal do cliente

### Versão 2.0 (Futuro)

- [ ] CMS headless integration
- [ ] Backend completo
- [ ] Área administrativa
- [ ] Sistema de agendamento online

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

## 👨‍💻 Autor

**Desenvolvido com ❤️ para escritórios de advocacia que buscam excelência digital**

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

---

## 📞 Suporte

Se tiver dúvidas ou problemas:

- 📧 Email: suporte@exemplo.com
- 💬 Issues: [GitHub Issues](#)
- 📖 Documentação: Veja `PORTFOLIO_ADVOGADOS_PLANEJAMENTO.md`

---

## 🙏 Agradecimentos

- Font Awesome pelos ícones
- Google Fonts pelas fontes
- Comunidade open-source

---

<div align="center">

**⚖️ Kardec Advocacia - Portfólio Profissional**

[![HTML](https://img.shields.io/badge/-HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/-CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

Feito com 💙 por desenvolvedores para advogados

</div>
