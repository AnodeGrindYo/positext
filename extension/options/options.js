// options.js

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
