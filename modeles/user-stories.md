# Le backlog : les user stories

Une **user story** décrit un besoin du point de vue de celui qui l'a, pas une tâche technique :

> **En tant que** <qui>, **je veux** <quoi>, **afin de** <pourquoi>.

Le « afin de » est le plus important : c'est lui qui permet de trouver une meilleure solution,
ou de dire qu'une story n'est pas utile.

Chaque story a des **critères d'acceptation** : des exemples concrets, vérifiables, qui disent
quand elle est terminée. Ils deviennent ensuite vos **tests** (S4) et votre **recette** (PV).

> **Étant donné** <la situation>, **quand** <l'action>, **alors** <le résultat attendu>.

## La priorité : MoSCoW

- **M**ust : sans elle, le produit ne sert à rien. C'est le **MVP**.
- **S**hould : importante, mais le produit est utilisable sans.
- **C**ould : un plus, si le temps le permet.
- **W**on't (this time) : écartée, pour cette version. L'écrire évite d'en reparler.

## Un exemple complet

### US-03 : choisir un créneau (Must)

**En tant que** client, **je veux** voir les créneaux libres d'un jour pour la prestation choisie,
**afin de** réserver sans appeler le salon.

Critères d'acceptation :

1. **Étant donné** que j'ai choisi « Coupe femme » (45 min) chez Salon Yasmine, **quand** je choisis mardi, **alors** je ne vois que des horaires où une coiffeuse est libre pendant 45 minutes, dans les heures d'ouverture.
2. **Étant donné** que le salon est fermé le lundi, **quand** je choisis un lundi, **alors** un message « Fermé ce jour-là » s'affiche, et aucun horaire.
3. **Étant donné** qu'il est 18 h 30, **quand** je choisis aujourd'hui, **alors** je ne vois aucun horaire avant 19 h 30 (préavis d'une heure).
4. **Étant donné** que le serveur ne répond pas, **quand** je choisis un jour, **alors** un message d'erreur et un bouton « Réessayer » s'affichent.

Estimation : 5 points · Écran : maquette « Choisir un créneau » · Statut : à faire

## Votre backlog

| Id | En tant que | je veux | afin de | Priorité | Estimation |
| --- | --- | --- | --- | --- | --- |
| US-01 | | | | | |
| US-02 | | | | | |

Puis une section par story, avec ses critères d'acceptation, comme l'exemple.
Dans GitHub Projects : une carte (issue) par story, une colonne par statut
(« À faire », « En cours », « En relecture », « Terminé »).
