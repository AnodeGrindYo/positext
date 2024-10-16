// const API_URL = 'https://e171-2a04-cec0-1207-dbd9-c84e-d144-f3a7-e20.ngrok-free.app/analyze'; # pour le dev en local
const API_URL = "https://13.51.162.90/analyze"

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

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la communication avec l\'API d\'analyse de sentiment :', error);
        throw error;
    }
}

function handleInput(event) {
    const textField = event.target;
    const text = textField.innerText;
    console.log("Texte saisi:", text);

    if (text && text.length > 0) {
        analyzeSentiment(text).then((result) => {
            if (result && result.negativity > result.positivity) {
                console.log("Sentiment négatif détecté :", result);
                textField.classList.add('negative-sentiment');
                showCustomNotification(text);

                // Envoyer un message au script d'arrière-plan
                chrome.runtime.sendMessage({
                    type: 'negativeSentimentDetected',
                    text: text
                }).then(() => {
                    console.log("Message envoyé au script d'arrière-plan.");
                }).catch((error) => {
                    console.error("Erreur lors de l'envoi du message :", error);
                });
            } else {
                textField.classList.remove('negative-sentiment');
            }
        }).catch(error => {
            console.error("Erreur d'analyse de sentiment :", error);
        });
    } else {
        // Si le champ est vide, supprimer la classe CSS
        textField.classList.remove('negative-sentiment');
    }
}

function showCustomNotification(text) {
    // Créer un conteneur pour la notification
    const notification = document.createElement('div');
    notification.textContent = `Attention, ne soyez pas toxique ! Le texte suivant semble négatif : "${text}". Veuillez reformuler.`;
    
    // Appliquer des styles pour la notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px';
    notification.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '10000';
    notification.style.maxWidth = '300px';
    
    // Ajouter la notification au document
    document.body.appendChild(notification);
    
    // Supprimer la notification après 5 secondes
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function addInputListener(textField) {
    if (!textField.dataset.listenerAdded) {
        textField.addEventListener('input', handleInput);
        textField.dataset.listenerAdded = 'true';
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches('div[role="textbox"]')) {
                    addInputListener(node);
                }
                node.querySelectorAll('div[role="textbox"]').forEach(addInputListener);
            }
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });

document.querySelectorAll('div[role="textbox"]').forEach(addInputListener);

// Vérifier l'état de l'extension
chrome.runtime.sendMessage({ type: 'checkExtensionStatus' })
    .then((response) => {
        if (response && response.isActive) {
            console.log("Extension active, écouteurs en place.");
        } else {
            console.log("Extension inactive.");
        }
    })
    .catch((error) => {
        console.error("Erreur lors de la vérification de l'état de l'extension :", error);
    });

// Ajouter des styles pour la classe CSS 'negative-sentiment'
const style = document.createElement('style');
style.textContent = `
    .negative-sentiment {
        background-color: rgba(255, 0, 0, 0.2) !important;
        border: 2px solid red !important;
    }
`;
document.head.appendChild(style);
