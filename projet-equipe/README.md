# Le projet d'équipe : une mission de freelance, du brief à la livraison

Par équipes de 4, vous fonctionnez comme une **petite agence** : un client (Mawid) vous confie
une **extension** de sa plateforme. Vous la cadrez, vous proposez un MVP et des jalons, vous la
construisez, vous la livrez, et vous la présentez comme on présente une livraison à un client.

Chaque extension correspond à un type de mission **parmi les plus demandés** sur les plateformes
de freelance en 2026 (tableau de bord, e-commerce, intégration d'IA, site vitrine en Next.js,
back-office en Angular...). À la fin du module, chaque membre a dans son portfolio un projet
complet, en ligne, documenté, et une histoire à raconter en entretien.

Les briefs des huit extensions sont dans [`briefs.md`](briefs.md). Ils sont tirés au sort en S1.

## Les extensions

| | Extension | Le type de mission sur le marché | Techno principale |
| --- | --- | --- | --- |
| A | Le tableau de bord du gérant | tableau de bord SaaS, visualisation de données | React, graphiques |
| B | La boutique du salon | e-commerce : catalogue, panier, commande | React |
| C | L'assistant IA du gérant | intégration d'un modèle d'IA dans une application | React, puis API d'IA côté serveur |
| D | La vitrine publique, bien référencée | site vitrine et SEO, rendu serveur | **Next.js** |
| E | Le back-office de l'équipe Mawid | application de gestion interne d'entreprise | **Angular** |
| F | Les avis et la fidélité | place de marché : confiance, notes, fidélisation | React |
| G | Mawid en arabe et en anglais | internationalisation, écriture de droite à gauche | React, `Intl` |
| H | L'application installable et les rappels | application web installable (PWA), hors ligne | React, service worker |

## Les jalons (milestones)

Comme sur une plateforme de freelance : chaque jalon est un livrable que la cliente peut
**essayer**, accepté par un procès-verbal de recette.

| Jalon | Quand | Ce que la cliente reçoit |
| --- | --- | --- |
| **M0** : la proposition | S2 | fiche de cadrage, backlog trié, MVP, maquettes fil de fer, proposition avec jalons (`../modeles/proposition-milestones.md`) |
| **M1** : le MVP de l'interface | fin du mois 1 (S4) | les écrans du MVP de l'extension, sur l'API simulée, avec leurs trois états (chargement, vide, erreur), testés, en ligne |
| **M2** : le MVP connecté | fin du mois 2 (S8) | l'extension branchée sur la vraie API (celle que vous construisez au mois 2), avec les comptes et les rôles |
| **M3** : la livraison | S12 | la version en ligne, la passation (README, documentation, accès), la soutenance |

### La liste de contrôle de chaque jalon

- [ ] le PV de recette est rempli : chaque critère d'acceptation des stories du jalon est vérifié ;
- [ ] la version est étiquetée (`v0.1.0`, `v0.2.0`, `v1.0.0`) et en ligne ;
- [ ] l'intégration continue est verte sur `main` ;
- [ ] chaque membre a au moins deux pull requests relues et fusionnées sur le jalon ;
- [ ] le README est à jour (étude de cas) ; le journal IA de chaque membre aussi.

## Travailler en équipe : le flux GitHub

1. `main` contient toujours une version qui fonctionne ;
2. une **branche** par user story (`us-07-filtre-periode`) ;
3. de petits commits aux messages clairs (« ajoute le filtre par période ») ;
4. une **pull request** qui cite la story et ses critères : un coéquipier relit, l'intégration
   continue teste ;
5. relecture faite et tests au vert : on **fusionne** dans `main`.

Un point d'équipe de 10 minutes au début de chaque séance : fait, à faire, bloqué.

## Les assistants IA

Les assistants de programmation (Copilot, Claude, ChatGPT, Cursor...) sont **autorisés comme
binôme, jamais comme auteur** : chaque ligne que vous poussez dans le dépôt de l'équipe, vous devez
pouvoir l'expliquer. Concrètement :

- le fichier `AGENTS.md` (`../modeles/AGENTS.md`) à la racine du dépôt donne les règles du projet
  aux assistants ;
- chaque membre tient son **journal IA** (`../modeles/journal-ia.md`) ;
- aucune clé d'API ni aucune donnée personnelle réelle n'est envoyée à un assistant ;
- en soutenance, **une question individuelle** porte sur le code de chacun : « explique-moi cette
  fonction ; que se passe-t-il si... ; comment le testes-tu ? ».

Les contrôles et l'EFM se passent sans IA.

## L'évaluation du projet (proposition)

| Critère | Poids | Ce qu'on regarde |
| --- | --- | --- |
| Cadrage | 15 % | fiche de cadrage, stories et critères d'acceptation, MVP justifié, proposition |
| Produit | 30 % | les stories du MVP fonctionnent ; trois états ; téléphone ; accessibilité ; gabarit aux couleurs de l'établissement |
| Qualité | 20 % | tests utiles, intégration continue, code lisible, pull requests relues |
| Livraison | 15 % | en ligne, README d'étude de cas, vidéo de 2 minutes, documents de passation |
| Soutenance | 15 % | la démonstration comme une réunion client ; la question individuelle sur le code |
| Journal IA | 5 % | la lucidité : ce que vous avez vérifié, rejeté, appris |

## La soutenance (S12) : une réunion de livraison

15 minutes par équipe, devant la cliente :

1. **Le rappel du besoin** (1 minute) : le problème, l'objectif, le MVP promis.
2. **La démonstration** (6 minutes) : sur la version en ligne, sur un téléphone, en suivant les
   critères d'acceptation. Pas de code à l'écran.
3. **Les choix et les difficultés** (3 minutes) : une décision technique, un problème réel et sa
   solution, ce que vous feriez avec deux semaines de plus.
4. **Les questions** (5 minutes) : de la cliente, puis une question individuelle sur le code de
   chaque membre.
