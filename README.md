# Schjoldr

Nettsiden til Schjoldr — norsk IT-utvikler som bygger robust programvare.

Statisk nettside (HTML/CSS/JS), publisert via GitHub Pages.

## Sider

- `index.html` — Forside
- `om.html` — Om Schjoldr
- `tjenester.html` — Tjenester og prosess
- `portefolje.html` — Utvalgte prosjekter
- `kontakt.html` — Kontaktskjema

## Kjør lokalt

Åpne `index.html` direkte i nettleseren, eller start en lokal server:

```bash
python3 -m http.server 8080
# eller
npx serve .
```

## Publisering

Siden publiseres på **https://schjoldr.io** via GitHub Pages fra `main`-branchen.

1. Konfigurer DNS (se [`DNS.md`](DNS.md))
2. Kjør `bash deploy.sh` — scriptet oppretter repo, pusher kode og setter custom domain
3. Vent på at DNS propagerer og HTTPS-sertifikatet utstedes

Filen `CNAME` i repo-roten styrer custom domain for GitHub Pages — ikke slett den.
