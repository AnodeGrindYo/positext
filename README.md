
# 🚀 Extension Chrome "Filtre Anti-négativité" 🛡️

Bienvenue dans **Filtre Anti-négativité** ! Cette extension Chrome analyse en temps réel les messages que vous tapez sur les réseaux sociaux et vous aide à reformuler les propos négatifs pour encourager des interactions plus positives et bienveillantes en ligne. 🌟

## 🎯 Objectif du projet
L'objectif est simple : améliorer la qualité des échanges en ligne en alertant les utilisateurs lorsqu'un message contient des éléments négatifs. En utilisant un modèle d'analyse de sentiment hébergé sur une API, l'extension vous propose de reformuler vos messages pour éviter les malentendus ou les échanges toxiques. 💬❤️

## 🚧 Fonctionnalités principales

- **📝 Capture en temps réel des messages** : Analyse automatique des textes que vous tapez sur des plateformes comme Facebook et Twitter.
- **🧠 Analyse de sentiment via API** : Envoi du texte à une API FastAPI hébergée sur AWS EC2 qui utilise le modèle VADER pour déterminer si le message est négatif.
- **⚠️ Notification d'alerte** : Si le message est jugé trop négatif, une notification vous invite à reformuler votre texte.
- **💻 Interface utilisateur simple** : Un pop-up vous permet d’activer ou désactiver l’extension à tout moment.

## 📋 Prérequis

Avant d'installer cette extension, assurez-vous d’avoir :

- **Google Chrome** (version 90+)
- Une connexion à Internet pour que l'extension puisse communiquer avec l'API d'analyse de sentiment.

## 🛠️ Installation

1. Clonez ce repository :
   ```bash
   git clone https://github.com/username/filtre-anti-negativite.git
   ```

2. Accédez au dossier du projet :
   ```bash
   cd filtre-anti-negativite
   ```

3. Ouvrez Google Chrome et allez dans `chrome://extensions/` 🔗.
4. Activez le **mode développeur** (coin supérieur droit) 🧑‍💻.
5. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier du projet.
6. 🥳 C'est installé ! Vous verrez maintenant l'icône de l'extension dans la barre d'outils Chrome.

## 🚀 Utilisation

1. Accédez à n'importe quelle plateforme de réseau social comme **Facebook** ou **Twitter**.
2. Tapez un message dans un champ de texte (commentaire, publication, etc.).
3. Si le message est négatif, une notification s'affiche ⚠️ vous suggérant de reformuler vos propos pour les rendre plus positifs ! ✨

## 🧰 Technologies utilisées

- **Chrome Extensions API** – Pour capturer le texte et interagir avec les pages web.
- **FastAPI** – Pour la création de l'API d'analyse de sentiment.
- **VADER** – Modèle de traitement du langage naturel (NLP) utilisé pour analyser la polarité du texte.
- **AWS EC2** – Hébergement de l'API sur une instance Ubuntu.

## 🛡️ Respect de la confidentialité

Nous respectons votre vie privée. Aucune donnée personnelle ou message n'est stocké ni partagé. Toute l’analyse de sentiment se fait en temps réel et aucune information n'est conservée après l'analyse.

## 💡 Contribution

Les contributions sont les bienvenues ! 🎉 Si vous avez des idées pour améliorer l'extension, n'hésitez pas à créer une **issue** ou à soumettre une **pull request**. Nous serions ravis d'avoir votre aide ! 🤝

1. Forkez ce repository 🍴
2. Créez votre branche (`git checkout -b feature/awesome-feature`) 🌱
3. Faites vos modifications et **commit** (`git commit -m 'Add awesome feature'`) ✨
4. Poussez vos changements (`git push origin feature/awesome-feature`) 🚀
5. Ouvrez une **pull request** ✔️


---

Merci d'avoir choisi **Filtre Anti-négativité** ! Ensemble, rendons Internet plus positif et bienveillant ❤️🌍.
