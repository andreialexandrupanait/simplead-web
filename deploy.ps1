# deploy.ps1 — "butonul de publicare".
#   commit -> push pe GitHub -> deploy pe server (rudolf rebuild + restart).
#
# Foloseste:  .\deploy.ps1 "mesaj de commit"
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$Message
)
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
if ($branch -ne 'main') {
    Write-Host "Esti pe '$branch', nu pe 'main'. Opresc (deploy-ul merge doar din main)." -ForegroundColor Red
    exit 1
}

Write-Host "==> Commit + push..." -ForegroundColor Cyan
git add -A
if (git status --porcelain) {
    git commit -m $Message
}
else {
    Write-Host "   Nimic nou de comis (push doar daca ai commit-uri locale neimpinse)." -ForegroundColor Yellow
}
git push origin main
if ($LASTEXITCODE -ne 0) { throw "git push a esuat." }

Write-Host "==> Deploy pe server (git pull + rebuild + restart)..." -ForegroundColor Cyan
ssh rudolf "cd /var/www/simplead && ./deploy.sh"
if ($LASTEXITCODE -ne 0) { throw "Deploy pe server a esuat. Vezi: ssh rudolf 'docker logs simplead_web'" }

Write-Host "`n==> Publicat. Daca live e in mentenanta, scoate-l cu:" -ForegroundColor Green
Write-Host "    ssh rudolf `"cd /var/www/simplead && ./maintenance.sh off`"" -ForegroundColor Green
