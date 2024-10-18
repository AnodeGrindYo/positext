#!/bin/bash

# Nom du fichier de sortie
OUTPUT_FILE="fichier_projet.txt"

# Vider le fichier de sortie s'il existe déjà
> $OUTPUT_FILE

# Trouver tous les fichiers en excluant dynamiquement les dossiers spécifiés
find . -type d \( \
    -name ".git" -o \
    -name "__pycache__" -o \
    -name ".pytest_cache" -o \
    -name "env" \
    \) -prune -o -type f -print >> $OUTPUT_FILE

# Afficher un message de confirmation
echo "Liste des fichiers du projet écrite dans $OUTPUT_FILE"
