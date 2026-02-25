# Script PowerShell pour démarrer le projet complet

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Auth Laravel + Next.js" -ForegroundColor Green
Write-Host "  Démarrage du projet..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "artisan")) {
    Write-Host "Erreur: Le fichier artisan n'a pas été trouvé." -ForegroundColor Red
    Write-Host "Assurez-vous d'exécuter ce script depuis la racine du projet Laravel." -ForegroundColor Red
    exit 1
}

# Vérifier que le dossier front existe
if (-not (Test-Path "front")) {
    Write-Host "Erreur: Le dossier 'front' n'a pas été trouvé." -ForegroundColor Red
    exit 1
}

Write-Host "[1/2] Démarrage du backend Laravel..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "php artisan serve"
Start-Sleep -Seconds 2

Write-Host "[2/2] Démarrage du frontend Next.js..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd front; npm run dev"
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Projet démarré avec succès!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend Laravel: " -NoNewline
Write-Host "http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend Next.js: " -NoNewline
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Deux fenêtres PowerShell ont été ouvertes." -ForegroundColor Yellow
Write-Host "Fermez-les pour arrêter les serveurs." -ForegroundColor Yellow
Write-Host ""
