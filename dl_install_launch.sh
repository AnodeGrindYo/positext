#!/bin/bash

# Nom de la session tmux
SESSION_NAME="api_server"

# Fermer toutes les sessions tmux existantes
tmux kill-server

# Mise à jour et installation des dépendances nécessaires
sudo apt update
sudo apt install -y tmux git python3-pip python3-venv openssl nginx

# Clonage du repository Git
git clone https://github.com/AnodeGrindYo/positext
cd positext/api

# Création d'un environnement virtuel Python
python3 -m venv env
source env/bin/activate

# Installation des dépendances Python
pip install -r requirements.txt

# Génération des certificats SSL dans le dossier 'api'
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem \
    -subj "/C=FR/ST=France/L=Paris/O=Company/OU=Org/CN=localhost"

# Configuration de Nginx
sudo rm /etc/nginx/sites-enabled/default  # Supprime la configuration par défaut

# Création d'une nouvelle configuration Nginx pour exposer l'API
cat <<EOL | sudo tee /etc/nginx/sites-available/positext
# Bloc pour les requêtes HTTP (port 80)
server {
    listen 80;
    server_name localhost;

    # Rediriger toutes les requêtes HTTP vers HTTPS
    location / {
        return 301 https://\$host\$request_uri;
    }
}

# Bloc pour les requêtes HTTPS (port 443)
server {
    listen 443 ssl;
    server_name localhost;

    ssl_certificate /home/ubuntu/positext/api/cert.pem;  # Chemin absolu vers cert.pem
    ssl_certificate_key /home/ubuntu/positext/api/key.pem;  # Chemin absolu vers key.pem

    location / {
        proxy_pass http://127.0.0.1:8000;  # Redirection vers Uvicorn sur localhost
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL

# Lien symbolique pour activer la configuration Nginx
sudo ln -s /etc/nginx/sites-available/positext /etc/nginx/sites-enabled/positext

# Redémarrer Nginx pour prendre en compte la nouvelle configuration
sudo systemctl restart nginx

# Création et lancement d'une session tmux pour exécuter l'API
tmux new-session -d -s $SESSION_NAME

# Dans la session tmux, activer l'environnement virtuel et démarrer l'API avec uvicorn
tmux send-keys -t $SESSION_NAME "source env/bin/activate" C-m
tmux send-keys -t $SESSION_NAME "uvicorn fastapi_app:app --host 127.0.0.1 --port 8000" C-m

# Récupérer l'IP publique de l'instance EC2
PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)

# Vérifier si l'IP publique a été récupérée correctement
if [ -z "$PUBLIC_IP" ]; then
  echo "Impossible de récupérer l'IP publique de l'instance. Vérifiez si vous êtes bien sur une instance EC2."
else
  # Afficher l'URL finale pour accéder à l'API
  echo "======================================================"
  echo "L'API FastAPI est disponible aux URLs suivants :"
  echo "En HTTP : http://$PUBLIC_IP/"
  echo "En HTTPS : https://$PUBLIC_IP/"
  echo "======================================================"

  # Avertir si les règles de sécurité ne sont pas correctement configurées
  echo "ATTENTION : Si vous ne pouvez pas accéder à l'API, assurez-vous que les règles de sécurité AWS EC2 autorisent le trafic sur les ports 80 (HTTP) et 443 (HTTPS)."
  echo "Vérifiez les inbound rules du groupe de sécurité associé à votre instance EC2 :"
  echo "- Autoriser le port 80 pour HTTP"
  echo "- Autoriser le port 443 pour HTTPS"
  echo "- Autoriser le port 8000 pour tester directement Uvicorn"
fi
