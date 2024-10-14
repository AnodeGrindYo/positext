// background.js

// Variable pour suivre l'état ON/OFF de l'extension
let isExtensionActive = false;

// Récupérer l'état de l'extension depuis le stockage au démarrage
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(['isExtensionActive'], function(result) {
        isExtensionActive = result.isExtensionActive || false;
    });
});

// Écouter les messages envoyés par les autres scripts (comme content.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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

    // Retourne true pour garder la réponse asynchrone ouverte
    return true;
});

// Fonction pour envoyer une notification en cas de texte négatif
function sendNegativeSentimentNotification(text) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Attention !',
        message: `Le texte suivant semble négatif : "${text}". Veuillez reformuler.`,
        priority: 2
    });
}

