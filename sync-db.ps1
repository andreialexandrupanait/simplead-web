# sync-db.ps1 — copiaza continutul real (blog, portofoliu, pachete) din DB-ul de
# PROD in DB-ul de DEV de pe server (rudolf). Ruleaza la cerere sau din dev.ps1.
#
# NU copiaza: settings (chei integrare criptate / Stripe LIVE) si orders (date clienti).
# PK-urile sunt UUID, deci nu exista secvente de reparat.
$ErrorActionPreference = 'Stop'

# Scriptul rulat pe server. Trimis prin STDIN catre `ssh rudolf bash` ca sa
# evitam complet problemele de quoting PowerShell -> bash.
$remote = @'
set -euo pipefail
PW=$(grep -E "^POSTGRES_PASSWORD=" /var/www/simplead/.env | cut -d= -f2-)
echo "   golesc tabelele de continut pe dev..."
docker exec -e PGPASSWORD=simplead simplead-db psql -U simplead -d simplead -v ON_ERROR_STOP=1 -c "TRUNCATE posts, projects, packages CASCADE" >/dev/null
echo "   copiez posts/projects/packages din prod in dev..."
docker exec -e PGPASSWORD="$PW" simplead_db pg_dump -U simplead -d simplead --data-only -t posts -t projects -t packages \
  | docker exec -i -e PGPASSWORD=simplead simplead-db psql -U simplead -d simplead -v ON_ERROR_STOP=1 >/dev/null
echo "   gata. Counturi dev:"
docker exec -e PGPASSWORD=simplead simplead-db psql -U simplead -d simplead -F" = " -tAc \
  "select relname, n_live_tup from pg_stat_user_tables where relname in ('posts','projects','packages') order by relname"
'@

Write-Host "Sincronizez continut prod -> dev (rudolf)..." -ForegroundColor Cyan
# Trimitem scriptul base64-encodat (ASCII pur, fara BOM, fara probleme de
# quoting PowerShell -> bash) si-l decodam pe server. Metoda 100% robusta.
$bytes = [System.Text.Encoding]::UTF8.GetBytes(($remote -replace "`r", ""))
$b64 = [Convert]::ToBase64String($bytes)
ssh rudolf "echo $b64 | base64 -d | bash"
if ($LASTEXITCODE -ne 0) { throw "Sync DB a esuat (exit $LASTEXITCODE)." }
Write-Host "Continut sincronizat." -ForegroundColor Green
