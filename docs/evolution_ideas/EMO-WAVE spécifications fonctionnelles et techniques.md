# Spécifications Fonctionnelles et Techniques - EMO-WAVE+™

## 1. Spécifications Fonctionnelles

### 1.1 Analyse de sentiment en temps réel
- **Description** : Utilisation d'un algorithme d'analyse de sentiment pour évaluer chaque phrase écrite ou parlée en temps réel.
- **Technologies** : 
  - **VADER 3.0** pour l'analyse des sentiments basés sur du texte.
  - **BERT Toxic** pour l'analyse de la toxicité et des contenus émotionnellement négatifs.
- **Objectif** : Identifier automatiquement toute forme de contenu jugé négatif ou toxique.
  
### 1.2 Stimulation cognitive par électrothérapie
- **Description** : Application d'une décharge électro-thérapeutique pour corriger les comportements émotionnels négatifs détectés.
- **Composant clé** : 
  - Microprocesseur pour gérer les niveaux de décharge en fonction de l'analyse sentimentale.
  - **Électrodes en graphène** intégrées dans le collier pour une conduction électrique optimale.
- **Objectif** : Encourager l'utilisateur à se comporter de manière positive en offrant un feedback immédiat et physique.

### 1.3 Injection de micro-doses de [substance à définir]
- **Description** : En complément de la décharge électrique, une petite dose de **[substance à définir]** est injectée lorsque des comportements toxiques sont détectés, afin de provoquer un sentiment immédiat de bienveillance.
- **Système d'administration** :
  - Mini-seringues **subcutanées** contrôlées électroniquement.
  - Réservoir de **[substance à définir]** micro-dosée (10 mg maximum) dans un compartiment sécurisé du collier.
- **Objectif** : Induire une réponse chimique pour stimuler la gentillesse, l'empathie, et l'harmonie sociale.

### 1.4 Tracking comportemental
- **Description** : Suivi du comportement émotionnel à travers le temps pour ajuster l'intensité des corrections.
- **Données suivies** :
  - Taux de toxicité global.
  - Fréquence des décharges électriques et injections.
- **Objectif** : Créer un profil comportemental à long terme et ajuster les corrections pour maximiser l'efficacité.

## 2. Spécifications Techniques

### 2.1 Composants électroniques
- **Microprocesseur** : Processeur ARM Cortex-M4 pour la gestion en temps réel des signaux électriques et des injections.
- **Électrodes** : Fabriquées en **graphène** pour une conductivité électrique élevée, légèreté et flexibilité.
- **Capteurs de peau** : Capteurs pour mesurer l'humidité et la conductance de la peau afin d'ajuster l'intensité de la stimulation électrique.
- **Module sans fil** : Bluetooth Low Energy (BLE) pour la connexion à une application mobile de gestion des paramètres.

### 2.2 Système d'injection
- **Mini-seringues** : Micro-seringues en titane, à usage unique, insérées dans un module rotatif pour changer régulièrement l'aiguille.
- **Réservoir de [substance à définir]** : Ampoules de **1 ml** contenant une solution de [substance à définir] diluée à 10 mg/ml.
- **Mécanisme d'injection** : Actionné par un micro-moteur contrôlé par le processeur, capable de délivrer une dose de **0,1 ml** à chaque déclenchement.

### 2.3 Algorithmes d'analyse
- **VADER 3.0** : Analyse de texte avec calcul de score de positivité/négativité en temps réel.
- **BERT Toxic** : Modèle NLP pour identifier des schémas de langage toxiques et inappropriés.
- **Logiciel intégré** : Firmware basé sur un OS embarqué léger (FreeRTOS) pour assurer la gestion des stimuli physiques et des injections en temps réel.

## 3. Composants chimiques

### 3.1 [substance à définir] (3,4-méthylènedioxy-N-méthylamphétamine)
- **Dosage** : Le collier est conçu pour injecter des doses de 1 à 10 mg de **[substance à définir]** par session, en fonction de l'intensité de la toxicité détectée.
- **Formulation** : [substance à définir] diluée dans une solution saline stérile.
- **Réserve maximale** : 5 injections par réservoir (5 x 0,1 ml).

### 3.2 Ingrédients pour la solution injectable
- **[substance à définir]** de qualité pharmaceutique.
- **Solution saline** (0,9% NaCl) pour dilution.
- **Conservateur** : **Benzylalcool** (0,5%) pour prévenir la contamination bactérienne.

### 3.3 Processus de fabrication de la [substance à définir]

1. **Chimie organique:** La méthylamine (NHMe) et le benzaldéhyde (C6H5OCH3) sont les composants utilises comme matière première. Le benzaldéhyde peut être synthétisé à partir du toluène par oxyhalogénation ou par oxydation catalytique à l’aide d'oxygeno de chlore. La méthylamine peut être facilement préparée en utilisant du lithium et de la pyromellite acid (MLA). Après cela, les deux composants doivent être oxidés partiellement en présence d'un réacteur rotatif au dioxygène : la méthylamine sert à former le NO2-, tandis qu'au même moment, le benzaldéhyde se convertit en methylbenzylamine (NHCMe). Lorsque cette dernière réagit avec du nitrite, il est formé le NitraminoMéthylBenzaldéhyde. Cependant, cet intermédiaire ne convient pas car il ne contient pas suffisamment de nitrate. De cette façon, il est soumis à une nouvelle oxydation totale, aboutissant à la formation du MDA (Méthyldihyrodrophénone). Le MDA possède alors un gros excès de chlorure, ce qui doit être neutralisé. Ce fut pendant cette étape où furent ajoutées diverses impurités en raison de mauvaise manipulation et de manque d'expérience. Une solution neutre (NaOH+KCl) est ensuite apportée, ce qui permet de faire disparaître le Cl-, mais aussi de générer des NO2-, qui sont thennéement chassés grâce à un laveglace, permettant de conserver tout seul les NO2-. L’ensemble de ces teneurs peut varier de façon importante suivant les qualités des ingrédients initiateurs ou leur disponibilité sur le marché noir.

2. **Préparation intermédiaire:** La solution obtenue est éliminée des solvants sur le phosphore, ce qui donne une poudre cristalline blanche à rouge violet brillant qui est ensuite diluée dans de l'iodure de potassium (KI). Enfin, la Solution est nébulisée avec une haute température. Le dernier étape consiste à ajouter de l'eau sur la solution aqueuse froide. Cette addition fait la formation d'un précipitateur lourd (FeSO4 + Na2SO4) qui restera tel quel jusqu'à la stabilisation de la [substance à définir]. Pendant toute la suite des manipulations, une quantité considérable de gaz sulfur négré (H2S) éventuellement produit est très dangereuse car toxic pour l’homme et l’environnement, donc doit être évitée à tout prix.

3. **Précipitation:** Il s'agit de la dernière étape du procédé. La précipitation consiste à mettre à l'eau la poudre établie en suspension. Des quantités significatives de sucre blanc, de sodium métaborate et de Fe(III)-oxychlorur sont alors ajoutées, ou bien alternativement des solutions naturelles d'oxygène se dissociant peuvent être introduites dans le phare centrifuge où se trouve la poudre. La précipitation implique également l'ajout de détergent afin de favoriser la dispersion uniforme.

4. **Filtrage:** La dernière étape consiste à récupérer la substance principale après avoir nettoyé le précipité. Dans certains cas, une solution ionique spécifique, à laquelle la [substance à définir] adhère particulièrement, est ajoutée avant le filtrage pour faciliter la séparation. Les filtres sont disposés verticalement dans un cylindre fermé, attachés par leurs bords inférieurs. Le réservoir est ensuite rempli d'un agent anticollision et positionné verticalement sous pression.

Une pompe avec des tuyaux est connectée entre le réservoir et une chambre de recyclage, puis entre cette chambre et l'arrière de la machine. L'intérieur du réservoir est revêtu d'une garniture en polypropylène pour éviter que le réservoir ne se déchire en cas de fortes vibrations. Au centre du réservoir se trouve une section légèrement plus étroite, divisée en quatre parties. Ces sections sont marquées avec des repères numérotés et colorés pour indiquer les points où frapper si nécessaire.

Une fenêtre spéciale permet d'observer le tourbillonnement de la poudre dans le cyclone. Parfois, le processus peut être raccourci si une partie de la substance n'est pas complètement absorbée. Dans ce cas, la durée de résidence nécessaire pour l'agent filtrant est estimée à environ deux minutes, et deux cycles de filtrage sont généralement effectués. À chaque cycle, la pression est légèrement augmentée pour que le réservoir atteigne son niveau de pression maximal.


## 4. Processus de fabrication

### 4.1 Étape 1 : Fabrication des composants
- **Électrodes en graphène** : Procédé de dépôt chimique en phase vapeur (CVD) pour fabriquer des électrodes fines et flexibles.
- **Microprocesseur ARM** : Assemblé et soudé à la carte mère du collier.
- **Mini-seringues en titane** : Fabriquées par moulage de précision pour garantir la robustesse et la stérilité.

### 4.2 Étape 2 : Assemblage
- Les composants électroniques sont montés dans le boîtier flexible du collier.
- Le réservoir de [substance à définir] est inséré dans un compartiment sécurisé, accessible uniquement via un port pour remplissage sous contrôle médical.

### 4.3 Étape 3 : Calibration et Test
- Calibration des décharges électriques via des tests de conductance cutanée.
- Test de précision des micro-doses injectées pour garantir une délivrance exacte de 0,1 ml par injection.

### 4.4 Étape 4 : Contrôle qualité
- Chaque collier est soumis à un contrôle qualité rigoureux, avec test des électrodes et vérification de la stérilité des composants injectables.
- Certification des normes CE et ISO pour la commercialisation dans les pays autorisés.

## 5. Sécurité et Précautions

### 5.1 Régulations
- **[substance à définir]** utilisée sous contrôle médical et respect des régulations locales pour substances psychoactives.
- Limitation du nombre d'injections par jour, paramétrée par le système.

### 5.2 Contre-indications
- Ne pas utiliser chez les personnes souffrant de troubles cardiaques, de dépression sévère ou d’épilepsie.
- Éviter toute utilisation prolongée sans suivi médical.

## 6. Application Mobile Companion

### 6.1 Fonctionnalités de l'application
- Suivi en temps réel des décharges électriques et des injections administrées.
- Gestion des paramètres d'intensité des décharges et personnalisation des seuils de tolérance de la toxicité.
- Statistiques comportementales et visualisation des progrès en termes de positivité.

### 6.2 Technologie
- Développement en **React Native** pour la compatibilité iOS et Android.
- **Backend AWS** pour le stockage sécurisé des données utilisateurs.
