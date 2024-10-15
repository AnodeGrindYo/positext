let isExtensionActive = false;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(['isExtensionActive'], function(result) {
        isExtensionActive = result.isExtensionActive || false;
        console.log(`Extension installed. Active state: ${isExtensionActive}`);

        // Test de création de notification
        testNotification();
    });
});

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(['isExtensionActive'], function(result) {
        isExtensionActive = result.isExtensionActive || false;
        console.log(`Extension started. Active state: ${isExtensionActive}`);
    });
});

function handleMessages(message, sender, sendResponse) {
    console.log("Message received:", message);

    if (message.type === 'checkExtensionStatus') {
        sendResponse({ isActive: isExtensionActive });
    } else if (message.type === 'toggleExtension') {
        isExtensionActive = !isExtensionActive;
        chrome.storage.local.set({ isExtensionActive });
        console.log(`Extension toggled. New state: ${isExtensionActive}`);
        sendResponse({ isActive: isExtensionActive });
    } else if (message.type === 'negativeSentimentDetected') {
        if (chrome.notifications && isExtensionActive) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: chrome.runtime.getURL('icons/icon48.png'),
                title: 'Attention !',
                message: `Le texte suivant semble négatif : "${message.text || 'Texte non spécifié'}". Veuillez reformuler.`
            }, (notificationId) => {
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
    return true;
}

function testNotification() {
    console.log("Tentative de création d'une notification de test");
    chrome.notifications.create({
        type: 'basic',
        iconUrl: chrome.runtime.getURL('icons/icon48.png'),
        title: 'Test de Notification',
        message: 'Ceci est une notification de test.'
    }, (notificationId) => {
        if (chrome.runtime.lastError) {
            console.error('Erreur lors de la création de la notification de test:', chrome.runtime.lastError.message);
        } else {
            console.log(`Notification de test envoyée avec succès, ID : ${notificationId}`);
        }
    });
}

chrome.runtime.onMessage.addListener(handleMessages);

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local' && changes.isExtensionActive) {
        isExtensionActive = changes.isExtensionActive.newValue;
        console.log(`État de l'extension mis à jour : ${isExtensionActive}`);
    }
});