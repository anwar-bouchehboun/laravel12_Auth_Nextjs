# Script de vérification de l'installation

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Vérification de l'installation" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Vérifier PHP
Write-Host "Vérification de PHP..." -NoNewline
try {
    $phpVersion = php -v 2>&1 | Select-String "PHP (\d+\.\d+)" | ForEach-Object { $_.Matches.Groups[1].Value }
    if ($phpVersion) {
        Write-Host " OK (Version: $phpVersion)" -ForegroundColor Green
    } else {
        Write-Host " PHP non trouvé!" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host " PHP non trouvé!" -ForegroundColor Red
    $allGood = $false
}

# Vérifier Composer
Write-Host "Vérification de Composer..." -NoNewline
try {
    $composerVersion = composer --version 2>&1 | Select-String "Composer version (\d+\.\d+\.\d+)" | ForEach-Object { $_.Matches.Groups[1].Value }
    if ($composerVersion) {
        Write-Host " OK (Version: $composerVersion)" -ForegroundColor Green
    } else {
        Write-Host " Composer non trouvé!" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host " Composer non trouvé!" -ForegroundColor Red
    $allGood = $false
}

# Vérifier Node.js
Write-Host "Vérification de Node.js..." -NoNewline
try {
    $nodeVersion = node -v 2>&1
    if ($nodeVersion) {
        Write-Host " OK (Version: $nodeVersion)" -ForegroundColor Green
    } else {
        Write-Host " Node.js non trouvé!" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host " Node.js non trouvé!" -ForegroundColor Red
    $allGood = $false
}

# Vérifier npm
Write-Host "Vérification de npm..." -NoNewline
try {
    $npmVersion = npm -v 2>&1
    if ($npmVersion) {
        Write-Host " OK (Version: $npmVersion)" -ForegroundColor Green
    } else {
        Write-Host " npm non trouvé!" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host " npm non trouvé!" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

# Vérifier les fichiers importants
Write-Host "Vérification des fichiers..." -ForegroundColor Yellow
Write-Host ""

$files = @(
    @{Path=".env"; Name="Fichier .env"},
    @{Path="vendor"; Name="Dépendances Laravel (vendor)"},
    @{Path="front/node_modules"; Name="Dépendances Next.js (node_modules)"},
    @{Path="front/.env.local"; Name="Fichier .env.local (front)"}
)

foreach ($file in $files) {
    Write-Host "$($file.Name)..." -NoNewline
    if (Test-Path $file.Path) {
        Write-Host " OK" -ForegroundColor Green
    } else {
        Write-Host " Manquant!" -ForegroundColor Yellow

        if ($file.Path -eq ".env") {
            Write-Host "  -> Copiez .env.example vers .env et configurez-le" -ForegroundColor Cyan
        }
        elseif ($file.Path -eq "vendor") {
            Write-Host "  -> Exécutez: composer install" -ForegroundColor Cyan
        }
        elseif ($file.Path -eq "front/node_modules") {
            Write-Host "  -> Exécutez: cd front; npm install" -ForegroundColor Cyan
        }
        elseif ($file.Path -eq "front/.env.local") {
            Write-Host "  -> Copiez front/.env.example vers front/.env.local" -ForegroundColor Cyan
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "  Installation complète!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Pour démarrer le projet:" -ForegroundColor Yellow
    Write-Host "  .\start.ps1" -ForegroundColor Cyan
} else {
    Write-Host "  Certains outils sont manquants." -ForegroundColor Red
    Write-Host "  Installez-les avant de continuer." -ForegroundColor Yellow
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
