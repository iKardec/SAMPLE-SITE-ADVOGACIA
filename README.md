# ⚖️ Kardec Advocacia

Landing page institucional para escritório de advocacia.

## 🚀 Início Rápido

Abra `index.html` diretamente no navegador. Não requer servidor.

## 📁 Estrutura

```
├── index.html
├── manifest.json         # PWA manifest
├── robots.txt            # SEO crawlers
├── sitemap.xml           # SEO sitemap
├── LICENSE               # MIT License
├── .gitignore
├── .editorconfig
├── humans.txt
├── security.txt
├── assets/
│   ├── css/
│   │   ├── main.css          # Entry point
│   │   ├── base/             # reset, tokens, typography
│   │   ├── components/       # buttons, cards, forms, badges, social
│   │   ├── sections/         # header, hero, about, areas, team, testimonials, contact, footer
│   │   └── utilities/        # animations, floating, helpers
│   ├── js/
│   │   └── app.js            # JavaScript consolidado
│   └── images/
│       ├── hero/             # hero-bg.jpg
│       ├── team/             # lawyer-1.jpg, lawyer-2.jpg, lawyer-3.jpg, client-1.jpg
│       └── icons/            # PWA icons (72x72 até 512x512)
```

## ✨ Funcionalidades

| Feature | Descrição |
|---------|-----------|
| **Tema Light/Dark** | Toggle com persistência localStorage |
| **Menu Mobile** | Hamburger animado |
| **Formulário** | Validação + envio WhatsApp |
| **Animações** | Fade-in via Intersection Observer |
| **Contadores** | Estatísticas animadas |
| **WhatsApp Float** | Botão flutuante com tooltip |
| **Page Loader** | Animação de carregamento |
| **SEO** | Meta tags, Open Graph, Schema.org |

## 🎨 Design System

### Cores

```css
--brand-gold: #C9A227    /* Primária */
--brand-navy: #0D1B2A    /* Secundária */
```

### Tipografia

- **Headings**: Montserrat
- **Body**: Source Sans 3

## ⚙️ Personalização

### Cores
Edite `assets/css/base/tokens.css`

### WhatsApp
Altere `whatsappNumber` em `assets/js/app.js`

### Contato
Edite diretamente em `index.html`

## 🛠️ Stack

- HTML5 semântico
- CSS3 (Custom Properties, @import modular)
- JavaScript ES6 (IIFE, zero dependências)
- Font Awesome 6.4 (CDN)
- Google Fonts (Montserrat, Source Sans 3)

## 📄 Licença

MIT
