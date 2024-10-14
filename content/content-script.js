// content.js

// URL de l'API d'analyse de sentiment hébergée sur AWS EC2
const API_URL = 'https://votre-api-sentiment-analysis.com/analyze';

// Fonction pour envoyer le texte à l'API et obtenir le score de sentiment
async function analyzeSentiment(text) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erreur lors de la communication avec l\'API d\'analyse de sentiment :', error);
    }
}

// Fonction pour traiter le texte saisi dans les champs de saisie
function handleInput(event) {
    const text = event.target.value;

    // Envoyer une requête à l'API uniquement si du texte est saisi
    if (text && text.length > 0) {
        analyzeSentiment(text).then((result) => {
            if (result && result.sentiment_score < -0.3) {
                // Si le score de sentiment est négatif, informer le background.js
                chrome.runtime.sendMessage({
                    type: 'negativeSentimentDetected',
                    text: text
                });
            }
        });
    }
}

// Injecter un listener pour capturer les saisies dans les champs de texte
function addInputListeners() {
    // Sélectionner tous les champs de texte des pages Facebook et Twitter
    const textFields = document.querySelectorAll('textarea, input[type="text"]');

    // Ajouter un event listener à chaque champ de texte pour capturer la saisie
    textFields.forEach((field) => {
        field.addEventListener('input', handleInput);
    });
}

// Vérifier l'état de l'extension avant d'ajouter les listeners
chrome.runtime.sendMessage({ type: 'checkExtensionStatus' }, (response) => {
    if (response.isActive) {
        addInputListeners();
    }
});
