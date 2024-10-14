# Chemin racine du projet
$rootDir = ".\"

# Définir l'arborescence du projet
$projectStructure = @{
    "background" = @("background.js")
    "content" = @("content-script.js")
    "popup" = @("popup.js", "popup.html", "popup.css")
    "options" = @("options.js", "options.html", "options.css")
    "manifest" = @("manifest.json")
    "api" = @("fastapi_app.py", "requirements.txt")
}

# Fonction pour créer les dossiers et fichiers vides
function Create-ProjectStructure {
    param (
        [string]$root,
        [hashtable]$structure
    )
    
    # Créer le dossier racine s'il n'existe pas
    if (-not (Test-Path -Path $root)) {
        New-Item -Path $root -ItemType Directory
    }

    # Parcourir la structure et créer les dossiers/fichiers
    foreach ($folder in $structure.Keys) {
        $folderPath = Join-Path $root $folder
        if (-not (Test-Path -Path $folderPath)) {
            New-Item -Path $folderPath -ItemType Directory
        }
        foreach ($file in $structure[$folder]) {
            $filePath = Join-Path $folderPath $file
            New-Item -Path $filePath -ItemType File
        }
    }
}

# Exécuter la fonction pour créer l'arborescence
Create-ProjectStructure -root $rootDir -structure $projectStructure

Write-Host "Arborescence de projet créée avec succès."
