
# 🚀 Extension Chrome "PosiText" 🛡️

Bienvenue dans **PosiText** ! Cette extension Chrome analyse en temps réel les messages que vous tapez sur les réseaux sociaux et vous aide à reformuler les propos négatifs pour encourager des interactions plus positives et bienveillantes en ligne. 🌟

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
   git clone https://github.com/AnodeGrindYo/positext
   ```

2. Accédez au dossier du projet :
   ```bash
   cd positext
   ```

3. Ouvrez Google Chrome et allez dans `chrome://extensions/` 🔗.
4. Activez le **mode développeur** (coin supérieur droit) 🧑‍💻.
5. Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier du projet.
6. 🥳 C'est installé ! Vous verrez maintenant l'icône de l'extension dans la barre d'outils Chrome.

## 🚀 Utilisation

1. Accédez à n'importe quelle plateforme de réseau social comme **Facebook** ou **Twitter**.
2. Tapez un message dans un champ de texte (commentaire, publication, etc.).
3. Si le message est négatif, une notification s'affiche ⚠️ vous suggérant de reformuler vos propos pour les rendre plus positifs ! ✨

## 🛠️✨ Installation de l'API sur AWS EC2 🚀🐧

Envie d'héberger votre propre API FastAPI sur une instance **AWS EC2 Ubuntu** ? 😎💻 Voici comment le faire, étape par étape ! Suivez le guide... et promis, ce ne sera pas plus dur que de faire cuire des pâtes 🍝.

### Prérequis 🍕🥤

- **Instance AWS EC2 Ubuntu** : Assurez-vous que votre instance EC2 est bien créée, et que vous pouvez vous y connecter via SSH 🧑‍💻🔐.
- **Ports ouverts** : 📡
   - **Port 80** : Pour vos connexions **HTTP** (c'est basique, mais utile 🌐).
   - **Port 443** : Pour **HTTPS** (le truc sécurisé, vous savez 🔒).
   - **Port 8000** : Pour parler directement avec **Uvicorn** (notre ami l'API FastAPI 🤓).

   **Vérifiez les règles de sécurité AWS EC2** pour vous assurer que les connexions sur ces ports sont autorisées 🚨 :
   - **Port 80** : ouvert à `0.0.0.0/0` (pour tout le monde 🌍).
   - **Port 443** : ouvert à `0.0.0.0/0` (on ne laisse personne de côté ! 🕵️‍♀️).
   - **Port 8000** : ouvert à `0.0.0.0/0` (parce que Uvicorn le mérite 🦄).

### Étapes d'installation 📋⚙️

1. **Se connecter à l'instance EC2** 🛠️ :
   - Connectez-vous à votre instance EC2 via SSH (promis, c'est facile 😅) :
     ```bash
     ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
     ```
     Si vous ne savez pas ce qu'est un "pem", c'est comme une clé USB, mais pour les serveurs 🗝️.

2. **Télécharger et exécuter le script d'installation** 🎉 :
   - Mettez le script dans le répertoire `/home/ubuntu/` sur votre instance EC2 (comme on met les courses dans le frigo 🛒).
   - Exécutez le script avec les droits **sudo** (parce que les serveurs aiment bien qu'on leur demande gentiment 👮‍♂️) :
     ```bash
     sudo bash /home/ubuntu/install_api.sh
     ```
     Attendez, buvez un café ☕, et admirez la magie 🪄.

3. **Mise à jour de l'URL dans `content-script.js`** 🛠️📝 :
   - Une fois que votre API est déployée, récupérez l'IP publique de votre instance EC2. C'est l'adresse que votre API utilise pour se faire connaître au monde 🌍.
   - Mettez à jour l'URL de l'API dans le fichier `content-script.js` (c'est comme modifier votre adresse postale 🏡) :
     ```javascript
     const apiUrl = 'https://your-ec2-public-ip/analyze';
     ```
     Remplacez `your-ec2-public-ip` par la vraie IP publique de votre instance EC2 (sinon votre API sera perdue dans l'espace 🚀🌌).

4. **Recharger l'extension Chrome** 🔄 :
   - Une fois la modification de `content-script.js` terminée, rechargez votre extension Chrome 🧙‍♂️✨ pour appliquer les changements (oui, Chrome est un peu comme un magicien parfois 🎩).

### Vérification 🔍

Si vous ne pouvez pas accéder à l'API après l'installation... pas de panique ! 😱 Voici quelques vérifications à faire pour vous assurer que tout est en ordre :

- **Vérifiez les règles de sécurité AWS EC2** 🔐 : Assurez-vous que les ports **80**, **443**, et **8000** sont bien ouverts. Sinon, c'est comme essayer d'appeler quelqu'un sans réseau 📵.
- **Vérifiez que Nginx et Uvicorn fonctionnent correctement** 🦸‍♂️ :
   - Pour Nginx, consultez les logs de vos serveurs (c'est un peu comme lire leur journal intime 📖) :
     ```bash
     sudo tail -f /var/log/nginx/error.log
     ```
   - Pour Uvicorn, connectez-vous à la session **tmux** (le super-héros silencieux qui fait tourner votre API en arrière-plan 🦸‍♀️) :
     ```bash
     tmux attach-session -t api_server
     ```

🎉 Et voilà ! Vous êtes prêt à dominer le monde avec votre API et rendre Internet plus positif et bienveillant 🥳🌍.


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

Merci d'avoir choisi **PosiText** ! Ensemble, rendons Internet plus positif et bienveillant ❤️🌍.


NB: ce projet nous a été inspiré par les emojibots de Doctor Who

![emojibot](https://i2-prod.mirror.co.uk/incoming/article10263085.ece/ALTERNATES/s1200c/Doctor-Who-Smile-attack.jpg)