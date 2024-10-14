// popup.js

// Récupérer le checkbox du popup
const toggleSwitch = document.getElementById('toggleExtension');

// Charger l'état actuel de l'extension à partir du stockage
chrome.storage.local.get(['isExtensionActive'], function(result) {
    toggleSwitch.checked = result.isExtensionActive || false;
});

// Ajouter un event listener pour gérer le basculement de l'état de l'extension
toggleSwitch.addEventListener('change', function() {
    const isActive = toggleSwitch.checked;

    // Sauvegarder le nouvel état dans chrome.storage
    chrome.storage.local.set({ isExtensionActive: isActive });

    // Envoyer un message au background.js pour basculer l'état de l'extension
    chrome.runtime.sendMessage({ type: 'toggleExtension' });
});
