# DNS-oppsett for schjoldr.io

For at custom domain skal fungere med GitHub Pages må du legge til følgende
DNS-poster hos domeneleverandøren din (Domeneshop, Cloudflare, Namecheap, etc.).

## 1. Apex-domene (schjoldr.io)

Legg til **fire A-poster** som peker på GitHub Pages sine IP-adresser:

| Type | Vert / Host | Verdi               | TTL  |
|------|-------------|---------------------|------|
| A    | @           | 185.199.108.153     | 3600 |
| A    | @           | 185.199.109.153     | 3600 |
| A    | @           | 185.199.110.153     | 3600 |
| A    | @           | 185.199.111.153     | 3600 |

Alternativt (hvis leverandøren støtter det) kan du bruke én **ALIAS / ANAME**-post
som peker på `<brukernavn>.github.io`.

## 2. www-subdomene (valgfritt men anbefalt)

| Type  | Vert / Host | Verdi                        | TTL  |
|-------|-------------|------------------------------|------|
| CNAME | www         | <brukernavn>.github.io       | 3600 |

Bytt `<brukernavn>` med ditt faktiske GitHub-brukernavn.

## 3. Verifisering

Etter at DNS er oppdatert (tar vanligvis 5–60 minutter):

```bash
# Sjekk at A-postene peker riktig
dig schjoldr.io +short

# Forventet output:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

## 4. HTTPS

GitHub utsteder automatisk Let's Encrypt-sertifikat når DNS er korrekt.
Dette kan ta opp til 24 timer. Når det er klart, huk av for
**"Enforce HTTPS"** under Settings → Pages (deploy-scriptet prøver å
gjøre dette automatisk).

## 5. Dobbeltsjekk i GitHub

Etter kjøring av `deploy.sh`:

1. Gå til `https://github.com/<brukernavn>/schjoldr/settings/pages`
2. Custom domain skal stå som `schjoldr.io`
3. "DNS check successful" bør vises grønn
4. "Enforce HTTPS" bør være aktivert

## Feilsøking

- **404 på schjoldr.io**: DNS har ikke propagert ennå, vent 30–60 min
- **"DNS check in progress"**: vent, GitHub sjekker periodisk
- **Sertifikatfeil**: kan ta opptil 24 timer før Let's Encrypt utstedes
- **CNAME-fil mangler**: sjekk at `CNAME` ligger i repo-roten med kun `schjoldr.io`
