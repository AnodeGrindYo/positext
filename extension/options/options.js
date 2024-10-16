/*
 * options.js
 *
 * Ce fichier gère la page des options de l'extension Chrome. Il permet à l'utilisateur
 * de configurer et personnaliser certains paramètres de l'extension selon ses besoins.
 *
 * Les fonctionnalités principales incluent :
 * - Sauvegarde de l'état de l'extension (active ou inactive) dans le stockage local de Chrome.
 * - Permet à l'utilisateur d'activer ou de désactiver l'extension via une interface simple.
 * - Récupération et affichage de l'état actuel de l'extension lorsque la page des options est ouverte.
 * - Gestion des événements de changement pour mettre à jour les paramètres en temps réel.
 *
 * Ce fichier interagit avec `background.js` pour s'assurer que les paramètres changent de manière cohérente
 * à travers tous les composants de l'extension.
 *
 * La page des options est accessible via le menu d'extension Chrome et permet à l'utilisateur d'avoir un contrôle direct
 * sur l'activation ou la désactivation de l'extension, ainsi que sur d'autres configurations éventuelles.
 */


// Récupérer les éléments du DOM
const form = document.getElementById('optionsForm');
const status = document.getElementById('status');
const thresholdInput = document.getElementById('threshold');

// Charger les options depuis chrome.storage quand la page est ouverte
chrome.storage.sync.get(['negativeThreshold'], function(result) {
    if (result.negativeThreshold !== undefined) {
        thresholdInput.value = result.negativeThreshold;
    } else {
        thresholdInput.value = -0.3; // Valeur par défaut
    }
});

// Sauvegarder les options lorsque le formulaire est soumis
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const threshold = parseFloat(thresholdInput.value);

    // Enregistrer la nouvelle valeur du seuil dans chrome.storage
    chrome.storage.sync.set({ negativeThreshold: threshold }, function() {
        status.textContent = 'Paramètres enregistrés.';
        setTimeout(() => {
            status.textContent = '';
        }, 2000);
    });
});
