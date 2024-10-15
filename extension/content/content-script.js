// content-script.js

// URL de l'API d'analyse de sentiment hébergée sur AWS EC2 (temporairement sur localhost)
const API_URL = 'https://localhost:8000/analyze';  // Remplacer par l'URL EC2 lors du déploiement

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

        if (!response.ok) {
            throw new Error('Erreur du serveur');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erreur lors de la communication avec l\'API d\'analyse de sentiment :', error);
        alert('Impossible d\'analyser le sentiment en raison d\'une erreur serveur.');
    }
}

// Fonction pour gérer l'entrée de texte dans les divs role="textbox"
function handleInput(event) {
    const text = event.target.innerText;
    console.log("Texte saisi:", text);

    if (text && text.length > 0) {
        analyzeSentiment(text).then((result) => {
            if (result && result.compound < -0.3) {
                chrome.runtime.sendMessage({
                    type: 'negativeSentimentDetected',
                    text: text
                });
            }
        });
    }
}

// Fonction pour ajouter des listeners sur les champs de texte
function addInputListeners() {
    const textFields = document.querySelectorAll('div[role="textbox"]');

    if (textFields.length === 0) {
        console.log("Aucun champ de texte trouvé");
    }

    textFields.forEach((textField) => {
        textField.addEventListener('input', handleInput);
    });
}

// Réexécuter la fonction de vérification de champs toutes les 2 secondes pour détecter les nouveaux éléments
setInterval(() => {
    addInputListeners();
}, 2000);

// Vérifier l'état de l'extension avant d'ajouter les listeners
chrome.runtime.sendMessage({ type: 'checkExtensionStatus' }, (response) => {
    if (response.isActive) {
        addInputListeners();
    }
});
