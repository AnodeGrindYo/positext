# test_fastapi_app.py

from fastapi.testclient import TestClient
from fastapi_app import app

# Initialiser le client de test FastAPI
client = TestClient(app)

# Test de base pour vérifier que l'API fonctionne
def test_api_root():
    response = client.get("/")
    assert response.status_code == 404  # La route "/" n'existe pas

# Test pour vérifier l'analyse de sentiment avec un texte positif
def test_analyze_sentiment_positive():
    response = client.post("/analyze/", json={"text": "This is a great day!"})
    assert response.status_code == 200
    data = response.json()
    assert data["positivity"] > 0  # Vérifie que le score positif est bien détecté
    assert data["compound"] > 0    # Le score compound doit être positif

# Test pour vérifier l'analyse de sentiment avec un texte négatif
def test_analyze_sentiment_negative():
    response = client.post("/analyze/", json={"text": "This is a terrible experience."})
    assert response.status_code == 200
    data = response.json()
    assert data["negativity"] > 0  # Vérifie que le score négatif est bien détecté
    assert data["compound"] < 0    # Le score compound doit être négatif

# Test pour vérifier que l'API renvoie une erreur avec un texte vide
def test_analyze_empty_text():
    response = client.post("/analyze/", json={"text": ""})
    assert response.status_code == 400
    assert response.json() == {"detail": "Le texte ne peut pas être vide."}
