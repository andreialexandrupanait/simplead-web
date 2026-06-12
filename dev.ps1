# dev.ps1 — "butonul de inceput de lucru".
#   1. Aduce ultimul cod din GitHub (origin/main) -> nu mai pornesti pe versiune veche.
#   2. Sincronizeaza continutul real prod -> dev DB.
#   3. Porneste dev server-ul nativ pe http://localhost:4321 (HMR, fara Docker).
#
# Foloseste:  .\dev.ps1
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

function Step($n, $t) { Write-Host "`n==> [$n] $t" -ForegroundColor Cyan }

# --- 1. Cod la zi -----------------------------------------------------------
Step '1/3' 'Aduc ultimul cod din GitHub (origin/main)...'
git fetch origin --quiet
$behind = [int](git rev-list --count HEAD..origin/main)
$dirty = [bool](git status --porcelain)
if ($behind -gt 0) {
    if ($dirty) {
        Write-Host "   !! Esti in urma cu $behind commit-uri DAR ai modificari necomise." -ForegroundColor Yellow
        Write-Host "   Comite/stash-uieste si ruleaza iar. Pornesc pe codul curent (vechi)." -ForegroundColor Yellow
    }
    else {
        git pull --ff-only origin main
        Write-Host "   Adus la zi ($behind commit-uri noi)." -ForegroundColor Green
    }
}
else {
    Write-Host "   Deja la zi." -ForegroundColor Green
}

# --- 2. Continut prod -> dev ------------------------------------------------
Step '2/3' 'Sincronizez continutul (prod -> dev DB)...'
& "$PSScriptRoot\sync-db.ps1"

# --- 3. Dev server ----------------------------------------------------------
Step '3/3' 'Pornesc dev server-ul -> http://localhost:4321  (Ctrl+C opreste)'
# Opresc un eventual dev server vechi ca sa nu se bata pe portul 4321.
Get-CimInstance Win32_Process -Filter "Name='node.exe'" |
    Where-Object { $_.CommandLine -like '*astro*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
npm run dev
