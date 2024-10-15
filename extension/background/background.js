// background.js

// Variable pour suivre l'état ON/OFF de l'extension
let isExtensionActive = false;

// Récupérer l'état de l'extension depuis le stockage au démarrage
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(['isExtensionActive'], function(result) {
        isExtensionActive = result.isExtensionActive || false;
    });
});

// Fonction pour traiter les messages entrants
function handleMessages(message, sender, sendResponse) {
    if (message.type === 'checkExtensionStatus') {
        // Renvoyer l'état actuel de l'extension (activée ou désactivée)
        sendResponse({ isActive: isExtensionActive });
    }

    if (message.type === 'toggleExtension') {
        // Basculer l'état de l'extension (ON/OFF)
        isExtensionActive = !isExtensionActive;
        chrome.storage.local.set({ isExtensionActive });
        sendResponse({ isActive: isExtensionActive });
    }

    if (message.type === 'negativeSentimentDetected') {
        // Notification de sentiment négatif
        sendNegativeSentimentNotification(message.text);
    }

    // Retourner true pour permettre une réponse asynchrone
    return true;
}

// Écouter les messages envoyés par les autres scripts (comme content.js)
chrome.runtime.onMessage.addListener(handleMessages);

// Fonction pour envoyer une notification en cas de texte négatif
function sendNegativeSentimentNotification(text) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Attention !',
        message: `Le texte suivant semble négatif : "${text}". Veuillez reformuler.`,
        priority: 2
    }, (notificationId) => {
        if (chrome.runtime.lastError) {
            console.error('Erreur lors de la création de la notification :', chrome.runtime.lastError);
        }
    });
}
