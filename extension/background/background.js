// background.js
// Ce fichier gère la logique d'arrière-plan de l'extension Chrome. 
// Il s'occupe de l'installation, du démarrage, du suivi de l'état actif de l'extension,
// et de la gestion des messages provenant d'autres scripts de l'extension.
// Il permet également de créer des notifications pour alerter l'utilisateur lorsque
// un texte avec un sentiment négatif est détecté.

let isExtensionActive = false;  // Variable pour stocker l'état de l'extension (active/inactive)

// Listener qui se déclenche lorsque l'extension est installée ou mise à jour
chrome.runtime.onInstalled.addListener(() => {
    // Récupère l'état actif de l'extension à partir du stockage local
    chrome.storage.local.get(['isExtensionActive'], function(result) {
        isExtensionActive = result.isExtensionActive || false;  // Définit l'état de l'extension, par défaut inactif
        console.log(`Extension installed. Active state: ${isExtensionActive}`);

        // Test de création de notification à l'installation
        testNotification();
    });
});

// Listener qui se déclenche lorsque Chrome démarre
chrome.runtime.onStartup.addListener(() => {
    // Récupère l'état actif de l'extension à partir du stockage local lors du démarrage
    chrome.storage.local.get(['isExtensionActive'], function(result) {
        isExtensionActive = result.isExtensionActive || false;  // Définit l'état de l'extension
        console.log(`Extension started. Active state: ${isExtensionActive}`);
    });
});

// Fonction pour traiter les messages reçus par l'extension
function handleMessages(message, sender, sendResponse) {
    console.log("Message received:", message);

    // Vérifie si le message demande l'état actif de l'extension
    if (message.type === 'checkExtensionStatus') {
        sendResponse({ isActive: isExtensionActive });  // Renvoie l'état de l'extension
    }
    // Gestion du basculement (activation/désactivation) de l'extension
    else if (message.type === 'toggleExtension') {
        isExtensionActive = !isExtensionActive;  // Inverse l'état actif de l'extension
        chrome.storage.local.set({ isExtensionActive });  // Sauvegarde le nouvel état dans le stockage local
        console.log(`Extension toggled. New state: ${isExtensionActive}`);
        sendResponse({ isActive: isExtensionActive });  // Renvoie le nouvel état
    }
    // Gestion du message "negativeSentimentDetected" (lorsque le texte est négatif)
    else if (message.type === 'negativeSentimentDetected') {
        // Vérifie si les notifications sont supportées et si l'extension est active
        if (chrome.notifications && isExtensionActive) {
            // Crée une notification pour avertir l'utilisateur que le texte semble négatif
            chrome.notifications.create({
                type: 'basic',
                iconUrl: chrome.runtime.getURL('icons/icon48.png'),  // Icône de notification
                title: 'Attention !',
                message: `Le texte suivant semble négatif : "${message.text || 'Texte non spécifié'}". Veuillez reformuler.`
            }, (notificationId) => {
                // Gestion des erreurs potentielles lors de la création de la notification
                if (chrome.runtime.lastError) {
                    console.error('Erreur lors de la création de la notification :', chrome.runtime.lastError.message);
                } else {
                    console.log(`Notification envoyée avec succès, ID : ${notificationId}`);
                }
            });
        } else {
            console.error("Les notifications ne sont pas supportées ou l'extension est inactive.");
        }
    }
    return true;  // Indique que la réponse sera envoyée de manière asynchrone
}

// Fonction de test pour créer une notification
function testNotification() {
    console.log("Tentative de création d'une notification de test");
    // Crée une notification de test pour vérifier le bon fonctionnement des notifications
    chrome.notifications.create({
        type: 'basic',
        iconUrl: chrome.runtime.getURL('icons/icon48.png'),  // Icône de la notification de test
        title: 'Test de Notification',
        message: 'Ceci est une notification de test.'
    }, (notificationId) => {
        // Vérifie si une erreur s'est produite lors de la création de la notification de test
        if (chrome.runtime.lastError) {
            console.error('Erreur lors de la création de la notification de test:', chrome.runtime.lastError.message);
        } else {
            console.log(`Notification de test envoyée avec succès, ID : ${notificationId}`);
        }
    });
}

// Ajoute un listener pour écouter les messages entrants provenant de l'extension
chrome.runtime.onMessage.addListener(handleMessages);

// Listener pour surveiller les changements dans le stockage local (chrome.storage)
// et mettre à jour l'état de l'extension si nécessaire
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.isExtensionActive) {
        isExtensionActive = changes.isExtensionActive.newValue;  // Met à jour l'état actif en fonction du stockage local
        console.log(`État de l'extension mis à jour : ${isExtensionActive}`);
    }
});
