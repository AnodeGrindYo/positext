# Import des librairies nécessaires
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from fastapi.middleware.cors import CORSMiddleware
# from transformers import pipeline  # Importer la fonction pipeline de Hugging Face

# Initialiser l'application FastAPI
app = FastAPI()

# Ajout du middleware CORS pour autoriser les requêtes cross-origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Autoriser toutes les origines (temporaire, parce que ça casse les ...)
    allow_credentials=True,
    allow_methods=["*"],  # Permettre toutes les méthodes HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permettre tous les en-têtes
)

# Initialiser l'analyseur VADER
analyzer = SentimentIntensityAnalyzer()

# Initialiser le pipeline de Hugging Face pour la classification de toxicité
# toxicity_model = pipeline("text-classification", model="unitary/toxic-bert")

# Modèle pour les données d'entrée
class TextData(BaseModel):
    text: str

# Route pour l'analyse de sentiment avec VADER
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

# Route pour l'analyse de toxicité avec le modèle Jigsaw
# @app.post("/toxicity/")
# async def analyze_toxicity(data: TextData):
#     # Vérifier si le texte est vide
#     if not data.text:
#         raise HTTPException(status_code=400, detail="Le texte ne peut pas être vide.")
    
#     # Analyser la toxicité du texte avec le modèle Jigsaw
#     results = toxicity_model(data.text)

#     # Extraire le score de toxicité du résultat
#     toxicity_score = next((result['score'] for result in results if result['label'] == 'toxic'), 0.0)

#     # Mapper le score de toxicité sur une structure similaire à celle de l'endpoint /analyze/
#     # - La toxicité sera traitée comme la "négativité".
#     # - Le reste des scores sera dérivé en conséquence.
#     negativity = toxicity_score
#     positivity = 1.0 - negativity  # La positivité est inversement proportionnelle à la toxicité
#     neutrality = max(0.0, 1.0 - (negativity + positivity))  # On calcule la neutralité s'il reste de la place
#     compound = positivity - negativity  # Le score compound est la différence entre positivité et négativité

#     # Retourner les résultats sous la même structure que l'endpoint /analyze/
#     return {
#         "negativity": negativity,
#         "neutrality": neutrality,
#         "positivity": positivity,
#         "compound": compound  # Score global (de -1 à +1)
#     }

# Lancer l'application avec uvicorn (en dehors du script, via une commande)
# Commande à exécuter : uvicorn fastapi_app:app --host 0.0.0.0 --port 8000
