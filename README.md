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
| S1 | Déboguer grâce au modèle d'exécution (BUG.1 à BUG.9) | [`s1-3-debogage`](s1-3-debogage/README.md) | un navigateur, Node.js ou Docker |
| S1 | Du comment au quoi : impératif et déclaratif (exercice ID.1) | [`s1-4-imperatif-declaratif`](s1-4-imperatif-declaratif/README.md) | Node.js |
| S1 bis | Révision générale de JavaScript et de TypeScript (BS, TS, AS, RE, EN) | [`s1b-javascript-typescript`](s1b-javascript-typescript/README.md) | Node.js (TypeScript : `npm install`) |
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

## Travailler avec Docker (optionnel)

Docker n'est pas obligatoire : il sert si vous ne pouvez pas installer Node.js tout de suite, ou si vous voulez un poste **identique à celui du cours**, sans rien installer d'autre. Il faut Docker Desktop (Windows, macOS), démarré en mode **conteneurs Linux**, ou Docker Engine avec le greffon Compose (Linux).

### L'idée en une minute

Docker fabrique des **machines légères**, isolées de votre ordinateur, où Node.js est déjà installé. Quatre mots suffisent :

| Mot | Ce que c'est |
| --- | --- |
| **image** | le *modèle* d'une machine (ici : Node.js 24, npm, Git). Il est en lecture seule et se construit une fois. C'est le moule. |
| **conteneur** | une machine *en marche*, créée à partir d'une image. Elle est jetable : on la supprime, on en recrée une identique en quelques secondes. C'est le gâteau. |
| **volume** | un dossier de **votre ordinateur** rendu visible dans la machine. Vos fichiers restent chez vous : ils survivent à la machine. C'est une fenêtre. |
| **port** | une porte entre votre navigateur et la machine. `3001:3001` se lit « port 3001 de mon ordinateur → port 3001 de la machine ». |

### Deux fichiers, deux rôles

| Fichier | Rôle | Il sert à… |
| --- | --- | --- |
| [`docker/Dockerfile`](docker/Dockerfile) | la **recette** d'une image : « pars de Node.js 24, ajoute Git et curl, travaille dans `/tp` » | *fabriquer* la machine |
| [`docker-compose.yml`](docker-compose.yml) | le **plan de lancement** : quelles machines (on dit *services*), quels dossiers partagés, quels ports | *démarrer* les machines d'une seule commande |

Le Dockerfile dit **comment la machine est faite** ; Compose dit **quelles machines lancer et comment les relier à votre ordinateur**. Vous ne modifierez presque jamais ces fichiers, mais il faut savoir les lire.

**Le Dockerfile**, ligne par ligne (les commentaires du fichier détaillent chaque étape) :

```dockerfile
FROM node:24-bookworm-slim          # on part d'une image officielle : Node.js 24, npm, Debian allégé
RUN apt-get update && apt-get install -y --no-install-recommends \
        git curl nano procps ca-certificates \
    && rm -rf /var/lib/apt/lists/*  # on y installe des outils (RUN = une commande exécutée à la construction)
RUN git config --system --add safe.directory /tp   # Git fait confiance au dossier partagé
WORKDIR /tp                         # le dossier dans lequel s'ouvre le terminal
```

| Instruction | Effet |
| --- | --- |
| `FROM` | choisit l'image de départ (toujours la première ligne) |
| `RUN` | exécute une commande **pendant la construction** de l'image (installer un paquet…) ; le résultat est conservé dans l'image |
| `WORKDIR` | fixe le dossier de travail : celui où l'on arrive en ouvrant un terminal |

**Le service `node` de `docker-compose.yml`** (la machine de travail) :

```yaml
  node:
    build:
      context: ./docker              # fabrique l'image avec le Dockerfile de ce dossier
    working_dir: /tp                 # on arrive dans /tp
    command: ["sleep", "infinity"]   # la machine n'exécute rien : elle attend qu'on s'y connecte
    init: true                       # arrêt rapide avec « docker compose down »
    volumes:
      - .:/tp                        # le dépôt de votre ordinateur (.) devient le dossier /tp de la machine
    ports:
      - "5173:5173"                  # React (Vite)
      - "3003:3003"                  # Next.js
      - "4200:4200"                  # Angular
    environment:
      CHOKIDAR_USEPOLLING: "true"    # recharger la page quand un fichier change,
      WATCHPACK_POLLING: "true"      # même dans un dossier partagé (Windows, macOS)
```

Les autres services (`api`, `demo`, `labo`, `exercices`) suivent le même modèle, mais utilisent directement l'image `node:22-alpine` au lieu de la construire, et ne partagent le dépôt qu'en lecture seule (`:ro`).

### Démarrer et entrer dans la machine

À la racine du dépôt (le dossier qui contient `docker-compose.yml`), Docker Desktop étant démarré :

```bash
docker compose up -d --build   # construit puis démarre « la machine » (1re fois : 1 à 3 min)
docker compose exec node bash  # ouvre un terminal DANS la machine
```

- **`docker compose up`** crée et démarre les services décrits dans `docker-compose.yml`.
- **`-d`** (*detached*) les laisse tourner **en arrière-plan** et vous rend la main. Sans `-d`, le terminal reste occupé à afficher leurs messages, et `Ctrl+C` les arrête.
- **`--build`** (re)construit l'image à partir du Dockerfile avant de démarrer. La première fois, il faut télécharger Node.js et installer Git : **1 à 3 minutes**. Ensuite, Docker réutilise ce qu'il a déjà construit (le *cache*) et la commande prend quelques secondes. `--build` ne sert à rien tant que le Dockerfile ne change pas, mais il est inoffensif.
- **`docker compose exec node bash`** : dans la machine **déjà en marche** du service `node`, exécute `bash`, c'est-à-dire un terminal. L'invite devient `root@…:/tp#` : vous êtes **dedans**. `exit` (ou `Ctrl+D`) en sort ; la machine, elle, continue de tourner.

La première commande démarre aussi l'API simulée (`api`, port 3001) et la démo de S1 (`demo`, port 3002), utiles pour S3 et S4. Pour la machine de travail seule : `docker compose up -d --build node`.

Dans la machine, vérifiez :

```bash
node -v    # v24.x : Node.js est là
npm -v
pwd        # /tp : le dépôt, partagé avec votre ordinateur
ls         # vous y retrouvez vos dossiers s1-1-javascript-pur, api-simulee…
```

### Travailler dans la machine

Le dépôt est **partagé** avec la machine : vous éditez les fichiers avec VS Code, sur votre ordinateur, comme d'habitude ; vous tapez les commandes `node` et `npm` dans le terminal de la machine. Un fichier modifié d'un côté change tout de suite de l'autre.

Exemple, pour créer puis lancer l'application React du module (dans le terminal de la machine) :

```bash
npm create vite@latest mawid-web -- --template react-ts
cd mawid-web
npm install
npm run dev -- --host
```

Ouvrez ensuite `http://localhost:5173` **dans le navigateur de votre ordinateur**. Créez le projet dans `/tp` (le dépôt) : c'est le seul dossier que la machine partage avec vous.

**Pourquoi `--host` ?** Par défaut, Vite n'écoute que les connexions venant de l'*intérieur* de la machine. Votre navigateur est à l'*extérieur* : sans `--host`, la porte `5173:5173` mène à un serveur qui refuse d'ouvrir. Même règle pour Angular : `ng serve --host 0.0.0.0`.

| Adresse | Qui répond | Comment |
| --- | --- | --- |
| `http://localhost:3001` | l'API simulée | service `api`, démarré par `docker compose up -d` |
| `http://localhost:3002` | la démo MPA, SPA, SSR | service `demo`, idem |
| `http://localhost:5173` | votre application React | dans la machine : `npm run dev -- --host` |
| `http://localhost:3003` | Next.js | dans la machine, voir le README du projet |
| `http://localhost:4200` | Angular | dans la machine : `ng serve --host 0.0.0.0` |

Votre application React s'exécute dans le navigateur, qui appelle l'API à `http://localhost:3001` : c'est exactement la même adresse qu'avec Node.js installé sur votre ordinateur.

Deux pièges à connaître :

- **Un seul endroit pour `npm install`.** Les dossiers `node_modules` installés dans la machine (Linux) ne fonctionnent pas sur votre ordinateur (Windows ou macOS), et inversement. Choisissez : tout dans la machine, ou tout sur votre ordinateur. Si vous avez mélangé, supprimez `node_modules`, puis refaites `npm install` au bon endroit.
- **Git depuis votre ordinateur.** La machine contient Git, mais pas votre identité ni vos accès GitHub : faites vos `git commit` et `git push` depuis votre ordinateur.

### Les commandes du quotidien

Toutes se tapent à la racine du dépôt, sur votre ordinateur (pas dans la machine).

| Commande | Ce qu'elle fait |
| --- | --- |
| `docker compose up -d --build` | construit puis démarre les services, en arrière-plan |
| `docker compose exec node bash` | ouvre un terminal dans la machine en marche |
| `docker compose ps` | liste les services démarrés et leurs ports |
| `docker compose logs -f api` | suit les messages d'un service (`Ctrl+C` pour quitter, le service continue) |
| `docker compose stop` / `docker compose start` | met les machines en pause / les relance, sans rien supprimer |
| `docker compose restart api` | redémarre un service (après un changement de réglage, par exemple) |
| `docker compose down` | arrête **et supprime** les machines. Vos fichiers, eux, restent sur votre ordinateur |
| `docker compose build --no-cache node` | reconstruit l'image de zéro, si quelque chose cloche |

Trois verbes à ne pas confondre :

| Verbe | Il fait quoi | Quand |
| --- | --- | --- |
| `up` | **démarre** les services (et les construit si besoin) | une fois, au début de la séance |
| `exec` | **entre** dans une machine déjà en marche | autant de fois que vous voulez ouvrir un terminal |
| `run --rm` | crée une machine **temporaire**, y exécute une commande, puis la supprime | un exercice ponctuel, un test |

Pour ne lancer que ce dont vous avez besoin, sans la machine de travail :

```bash
docker compose up api        # l'API simulée : http://localhost:3001
docker compose up demo       # la démo MPA, SPA, SSR du TP S1.2 : http://localhost:3002
docker compose run --rm labo 03-ordre.js 2    # un exercice du TP S1.3
docker compose run --rm exercices            # tous les tests JavaScript du TP S1 bis
docker compose run --rm exercices run test:bases   # une série (bases, async, react, entretien)
docker compose down          # tout arrêter
```

Les réglages de l'API passent par des variables d'environnement : `PANNE=0.3 docker compose up api` (sous PowerShell : `$env:PANNE=0.3; docker compose up api`).

### Si ça ne marche pas

| Message ou symptôme | Cause | Solution |
| --- | --- | --- |
| `failed to connect to the docker API…` / `Cannot connect to the Docker daemon` | Docker Desktop n'est pas démarré | lancer Docker Desktop, attendre « Engine running », recommencer |
| `no configuration file provided: not found` | vous n'êtes pas dans le dossier du dépôt | `cd tp-framewok-web` (celui qui contient `docker-compose.yml`) |
| `service "node" is not running` | la machine n'est pas démarrée | `docker compose up -d` |
| `port is already allocated` | un autre programme utilise déjà ce port (un `node serveur.mjs` lancé sur votre ordinateur, par exemple) | l'arrêter avec `Ctrl+C`, ou `docker compose down` puis relancer |
| la page ne se met pas à jour quand j'enregistre | le dossier partagé n'avertit pas des changements | relancer `npm run dev -- --host` ; sinon, dans `vite.config.ts` : `server: { watch: { usePolling: true } }` |
| le navigateur n'atteint pas `localhost:5173` | le serveur n'a pas été lancé avec `--host` | `npm run dev -- --host` |
| tout est bizarre | une machine abîmée ou une image périmée | `docker compose down`, puis `docker compose up -d --build` |

### Modifier la machine

Besoin d'un outil de plus (par exemple `jq`) ? Ajoutez-le dans la ligne `apt-get install` du Dockerfile, puis relancez `docker compose up -d --build` : Docker reconstruit l'image avec le changement, et recrée la machine. Ce que vous installez à la main dans la machine avec `apt-get` disparaît à `docker compose down` ; ce qui est dans le Dockerfile, non.
