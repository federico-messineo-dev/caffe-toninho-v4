# Caffè Toninho - Sito Web Ufficiale

Sito web moderno e responsive per **Caffè Toninho**.

## Struttura del Progetto

```
caffe-toninho/
├── index.html              # Homepage
├── about-us.html           # Chi Siamo
├── coffee.html             # Collezione Caffè
├── contact-us.html         # Contatti & Sedi
├── faq.html                # Domande Frequenti
├── gallery.html            # Galleria Fotografica
├── menu.html               # Menu
├── search.html             # Ricerca
├── testimonials.html       # Recensioni
├── coffee/                 # Pagine Categorie Caffè
│   ├── cold-brew.html
│   ├── decaf.html
│   ├── espresso.html
│   ├── filter.html
│   ├── signature-blends.html
│   └── single-origin.html
├── product/                # Pagine Dettaglio Prodotti
├── css/                    # Fogli di stile (style.css, inter-tight.css)
├── js/                     # Script JavaScript (jquery, gsap, webflow)
├── fonts/                  # Font locali (WOFF2, TTF)
├── images/                 # Immagini del sito, prodotti e loghi
├── videos/                 # Video di sfondo e poster
├── package.json            # Configurazione NPM e script di avvio
└── vercel.json             # Configurazione per il deploy su Vercel
```

## Avvio in Locale

### Usando Node.js / NPM:
```bash
npm run dev
```
Oppure semplicemente:
```bash
npx serve .
```

Il sito sarà accessibile su `http://localhost:3000`.

## Deploy su Vercel

1. Inizializza il repository Git ed effettua il push su GitHub / GitLab / Bitbucket:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Caffè Toninho Website"
   git branch -M main
   git remote add origin <URL-DEL-TUO-REPO>
   git push -u origin main
   ```
2. Collega il repository a [Vercel](https://vercel.com).
3. Vercel rileverà automaticamente la configurazione e pubblicherà il sito in pochi secondi!
