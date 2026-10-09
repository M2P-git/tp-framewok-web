# TP S1.0 : du brief au backlog (la réunion client)

**Objectif** : vivre le début d'une vraie mission. Un client publie une annonce ; vous préparez
vos questions ; vous le rencontrez ; vous transformez ce qu'il a dit en une fiche de cadrage, un
backlog et un MVP. **Aucune ligne de code aujourd'hui** : c'est voulu. La plupart des projets
qui échouent n'échouent pas à cause du code, mais parce qu'on a construit la mauvaise chose.

Pendant tout le module, la classe fonctionne comme une **agence** : l'enseignant joue Salma
Berrada, la fondatrice de Mawid (la cliente), et parfois le développeur principal de l'agence.

## Avant de commencer

- Lisez [l'annonce](annonce.md) (5 minutes).
- Ouvrez les modèles de la [boîte à outils](../modeles/README.md) : `questions-client.md`,
  `fiche-cadrage.md`, `user-stories.md`.

## Le déroulé

### Étape 1 : préparer la réunion (15 minutes, par équipe de 4)

Lisez l'annonce comme un professionnel : **qu'est-ce qui n'est pas dit ?** À partir de
`modeles/questions-client.md`, choisissez les **dix questions** les plus importantes pour ce
projet, et classez-les. Indice : l'annonce dit « double bookings » et « no-shows » sans un seul
chiffre ; elle dit « choose a free time slot » sans dire comment un créneau est libre.

### Étape 2 : la réunion avec la cliente (30 minutes, toute la classe)

Chaque équipe pose ses questions à tour de rôle. La cliente répond **seulement à ce qu'on lui
demande**, comme un vrai client : ce que vous ne demandez pas, vous ne le saurez pas. Notez les
réponses avec ses mots. Un membre de l'équipe note, un autre surveille la liste des questions.

### Étape 3 : la fiche de cadrage (20 minutes)

Remplissez `fiche-cadrage.md` (une page). La partie la plus importante est le tableau du
périmètre : **dans le MVP**, **plus tard**, **jamais**.

### Étape 4 : le backlog (30 minutes)

Écrivez au moins **huit user stories** (client, gérant, équipe Mawid), avec leurs critères
d'acceptation pour les stories « Must ». Triez-les avec MoSCoW. Créez le tableau GitHub Projects
de l'équipe : une carte par story.

### Étape 5 : par où commencer ? (20 minutes)

Sur papier (ou Excalidraw, ou Figma), dessinez :

1. **le parcours** du client qui réserve, écran par écran (des boîtes et des flèches) ;
2. **les maquettes fil de fer** (wireframes) de trois écrans : la page d'un salon, le choix du
   créneau, l'agenda du gérant. Pas de couleurs, pas de style : des rectangles et des mots ;
3. **le modèle de domaine** : les objets du métier (établissement, prestation, employé, client,
   rendez-vous, avis), leurs informations principales, et leurs liens (« un établissement a
   plusieurs prestations »). C'est un diagramme de classes simplifié : pas de méthodes, pas de
   détails techniques. Comparez-le ensuite au fichier `../donnees/db.json`.

### Étape 6 : répondre aux questions de présélection (à la maison, 20 minutes)

Répondez par écrit, en dix lignes au plus chacune, aux trois « screening questions » de
l'annonce. Vous saurez répondre parfaitement à la deuxième (« deux clients, un créneau ») à la
fin de S3 : gardez votre première réponse, et comparez.

## À rendre (dans le dépôt de l'équipe, dossier `docs/`)

- [ ] `fiche-cadrage.md`
- [ ] `user-stories.md` et le tableau GitHub Projects
- [ ] `parcours-et-maquettes` (photos ou export) et `modele-domaine` (photo ou export)
- [ ] `reponses-annonce.md` (les trois questions de présélection)

## Ce qu'il faut retenir

- On part du **problème**, pas de la solution ; et des **utilisateurs**, pas des écrans.
- Le **MVP** n'est pas une version bâclée : c'est la plus petite version qui rend le service.
- Un **critère d'acceptation** est un exemple vérifiable ; il deviendra un test, puis une ligne
  du procès-verbal de recette.
- On ne commence ni par la base de données ni par le design : on commence par les **parcours**
  et le **modèle de domaine**, puis on fixe le **contrat d'API** entre l'interface et le serveur.
  Ensuite, l'interface et le serveur peuvent avancer en parallèle (c'est pour cela que l'API
  simulée existe).
