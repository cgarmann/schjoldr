#!/usr/bin/env bash
# Schjoldr — deploy-script for GitHub Pages med custom domain (schjoldr.io)
# Forutsetninger:
#   - gh CLI installert og innlogget (gh auth login)
#   - DNS hos domeneleverandør konfigurert (se DNS.md)
# Kjør fra denne mappen: bash deploy.sh

set -euo pipefail

REPO_NAME="schjoldr"
DOMAIN="schjoldr.io"
VISIBILITY="--public"   # bytt til --private hvis du vil

echo "→ Initialiserer git (om ikke allerede init)…"
if [ ! -d .git ]; then
  git init -b main
fi

git add .
git commit -m "Initial: Schjoldr nettside" || echo "  (ingenting nytt å committe)"

echo "→ Oppretter repo på GitHub og pusher…"
gh repo create "$REPO_NAME" $VISIBILITY --source=. --remote=origin --push || \
  { echo "  Repo finnes kanskje allerede — pusher til eksisterende origin…"; git push -u origin main; }

echo "→ Aktiverer GitHub Pages fra main / root…"
gh api -X POST "repos/{owner}/$REPO_NAME/pages" \
  -f "source[branch]=main" \
  -f "source[path]=/" \
  2>/dev/null || echo "  (Pages allerede aktivert)"

echo "→ Setter custom domain ($DOMAIN)…"
gh api -X PUT "repos/{owner}/$REPO_NAME/pages" \
  -f "cname=$DOMAIN" \
  -F "https_enforced=true" \
  2>/dev/null || echo "  (kan måtte aktiveres manuelt i Settings → Pages)"

echo ""
echo "✓ Ferdig! Når DNS har propagert er siden tilgjengelig på:"
echo "  https://$DOMAIN"
echo ""
echo "Sjekk status med: gh api \"repos/{owner}/$REPO_NAME/pages\""
