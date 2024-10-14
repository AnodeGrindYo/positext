# fastapi_app.py

# Import des librairies nécessaires
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Initialiser l'application FastAPI
app = FastAPI()

# Initialiser l'analyseur VADER
analyzer = SentimentIntensityAnalyzer()

# Modèle pour les données d'entrée
class TextData(BaseModel):
    text: str

# Route pour l'analyse de sentiment
@app.post("/analyze/")
async def analyze_sentiment(data: TextData):
    # Vérifier si le texte est vide
    if not data.text:
        raise HTTPException(status_code=400, detail="Le texte ne peut pas être vide.")
    
    # Analyser le sentiment du texte avec VADER
    scores = analyzer.polarity_scores(data.text)
    
    # Retourner le score de sentiment sous forme de JSON
    return {
        "negativity": scores['neg'],
        "neutrality": scores['neu'],
        "positivity": scores['pos'],
        "compound": scores['compound']  # Score global (de -1 à +1)
    }

# Lancer l'application avec uvicorn (en dehors du script, via une commande)
# Commande à exécuter : uvicorn fastapi_app:app --host 0.0.0.0 --port 8000
