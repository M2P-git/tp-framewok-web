# TP : Frameworks de développement web, mois 1

Module 3, cycle d'ingénieurs 3e année, filière développement (CI3), ISMAGI, 2026-2027.
Dr Paul Menounga Mbilong.

Ce dépôt contient les **sources des travaux pratiques** du mois 1 et la **description du
travail à faire** pour chacun. Le cours lui-même (notions, figures, quiz) est distribué en PDF.
Tous les TP portent sur **BabStage**, la plateforme des stages de fin d'études qui sert de fil
rouge au module.

## Les TP

| Séance | TP | Dossier | Il faut |
| --- | --- | --- | --- |
| avant S2 | Installer son poste de travail | [`00-installation`](00-installation/README.md) | |
| S1 | La douleur du JavaScript pur (exercice 1.2) | [`s1-1-javascript-pur`](s1-1-javascript-pur/README.md) | un navigateur |
| S1 | La même page en MPA, en SPA et en SSR (exercice AR.1) | [`s1-2-architectures`](s1-2-architectures/README.md) | Node.js ou Docker |
| S1 | Déboguer grâce au modèle d'exécution (BUG.1 à BUG.8) | [`s1-3-debogage`](s1-3-debogage/README.md) | un navigateur, Node.js ou Docker |
| S2 | La page des offres en composants React | [`s2-composants`](s2-composants/README.md) | Node.js |
| S3 | Brancher BabStage sur l'API, le formulaire de candidature | [`s3-donnees-formulaires`](s3-donnees-formulaires/README.md) | Node.js, l'API simulée |
| S4 | Routes, état partagé, tests et intégration continue | [`s4-routage-etat`](s4-routage-etat/README.md) | Node.js, l'API simulée |
| S1 à S4 | Le projet d'équipe et le jalon J1 | [`projet-equipe`](projet-equipe/README.md) | |

Les TP de S2 à S4 construisent pas à pas **votre** application React `babstage-web`, dans votre
propre dépôt GitHub. Ce dépôt-ci ne vous fournit que ce qu'il faut copier (données, types,
styles, client HTTP) : le reste, c'est votre travail. La correction de chaque TP est publiée
après la séance.

## Les outils communs

| Dossier | Contenu |
| --- | --- |
| [`api-simulee`](api-simulee/serveur.mjs) | l'API de BabStage, pour les TP de S3 et S4 : `node api-simulee/serveur.mjs`, puis `http://localhost:3001` (aucune dépendance) |
| [`donnees`](donnees/db.json) | les données fictives : 40 entreprises, 300 offres, 150 étudiants, 1 000 candidatures |

Réglages de l'API, par variables d'environnement : `LATENCE=1500` (réponses lentes), `PANNE=0.3`
(30 % des requêtes échouent), `ALEATOIRE=1` (réponses dans le désordre). Sous PowerShell :
`$env:LATENCE=1500; node api-simulee/serveur.mjs`.

## Récupérer le dépôt

```bash
git clone https://github.com/M2P-git/tp-framewok-web.git
cd tp-framewok-web
git pull        # au début de chaque séance : les nouveaux TP arrivent ici
```

## Sans Node.js : Docker (optionnel)

Docker n'est pas nécessaire : il sert si vous ne pouvez pas installer Node.js tout de suite.
Il faut Docker Desktop (Windows, macOS) ou Docker Engine avec Compose (Linux).

```bash
docker compose up api        # l'API simulée : http://localhost:3001
docker compose up demo       # la démo MPA, SPA, SSR du TP S1.2 : http://localhost:3002
docker compose run --rm labo 03-ordre.js 2    # un exercice du TP S1.3
docker compose down          # tout arrêter
```

Les réglages passent de la même façon : `PANNE=0.3 docker compose up api` (sous PowerShell :
`$env:PANNE=0.3; docker compose up api`).
