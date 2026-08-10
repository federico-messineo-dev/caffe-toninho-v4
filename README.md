# Caffè Toninho - Copia Locale

## Come avviare il server

### Opzione 1: Usa il file batch (Windows)
1. Doppio clic su `avvia-server.bat`
2. Il server si avvia su http://localhost:3000

### Opzione 2: Usa Python
```bash
python server.py
```

### Opzione 3: Usa Node.js (se installato)
```bash
npx serve beano/beano-wcopilot.webflow.io
```

## Struttura del progetto

```
caffe-toninho/
├── avvia-server.bat          # Script per avviare il server (Windows)
├── server.py                 # Server Python
├── sfondo_legno.webp         # Immagine sfondo
├── toninho-logo-new.svg      # Logo
└── beano/
    ├── ajax.googleapis.com/  # WebFont.js (copia locale)
    ├── cdn.prod.website-files.com/  # CSS, JS, immagini (copie locali)
    ├── d3e54v103j8qbb.cloudfront.net/  # jQuery (copia locale)
    └── beano-wcopilot.webflow.io/
        ├── index.html        # Pagina principale
        ├── coffee.html       # Pagina caffè
        ├── menu.html         # Menu
        ├── product/          # Pagine prodotti
        ├── coffee/           # Pagine categorie caffè
        ├── fonts/            # Font locali
        └── ...
```

## Note

- Tutti gli asset sono stati copiati localmente (CSS, JS, immagini, font)
- I riferimenti CDN sono stati sostituiti con percorsi relativi locali
- Il sito funziona completamente offline
- Per i font Google, il sito usa WebFont.js con caricamento locale

## Risoluzione problemi

Se某些 pagine non si caricano correttamente:
1. Verifica che Python sia installato
2. Assicurati di essere nella cartella corretta
3. Controlla la console del browser per errori
