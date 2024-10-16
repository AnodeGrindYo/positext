/*
 * popup.js
 *
 * Ce fichier gère la logique derrière le pop-up de l'extension Chrome, qui apparaît lorsque
 * l'utilisateur clique sur l'icône de l'extension dans la barre d'outils.
 *
 * Les fonctionnalités principales incluent :
 * - Affichage de l'état actuel de l'extension (active ou inactive) dans le pop-up.
 * - Permet à l'utilisateur d'activer ou de désactiver l'extension directement depuis le pop-up.
 * - Envoie de messages à `background.js` pour basculer l'état de l'extension et synchroniser cet état dans toute l'extension.
 * - Mise à jour de l'interface utilisateur (UI) du pop-up en temps réel pour refléter l'état actuel de l'extension.
 *
 * Ce fichier permet à l'utilisateur de contrôler facilement l'extension sans avoir à ouvrir les options,
 * en offrant une interface rapide et accessible via un simple clic.
 *
 * L'objectif est de permettre une gestion fluide et immédiate de l'extension directement depuis le pop-up,
 * ce qui améliore l'expérience utilisateur en fournissant des options de configuration rapides et visibles.
 */


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
