# Installer son poste de travail (avant la séance 2, environ une heure)

La séance 2 commence par vérifier ces quatre checkpoints, puis part du projet créé au
checkpoint 4. En cas de blocage, notez le message d'erreur exact et apportez-le : nous le
réglerons en début de séance.

## Checkpoint 1 : Node.js et npm

Installez la version **LTS** de Node.js depuis [nodejs.org](https://nodejs.org) (en septembre 2026 : Node.js 24). Puis, dans un terminal :

```bash
node -v    # v24.x.x
npm -v     # 11.x.x
```

## Checkpoint 2 : Git et GitHub

Installez Git, créez un compte GitHub avec votre adresse de l'école, puis :

```bash
git --version
git config --global user.name "Prénom Nom"
git config --global user.email "prenom.nom@exemple.ma"
```

## Checkpoint 3 : VS Code

Installez Visual Studio Code, puis ses extensions **ESLint** et **Prettier**. Ouvrez un terminal intégré : menu *Terminal*, puis *Nouveau terminal*.

## Checkpoint 4 : un premier projet React avec Vite

Dans le dossier de votre choix :

```bash
npm create vite@latest babstage-web -- --template react-ts
cd babstage-web
npm install
npm run dev
```

Ouvrez l'adresse affichée, `http://localhost:5173` : la page d'accueil de Vite et React s'affiche. **Checkpoint réussi.**

## Les problèmes les plus fréquents

| Message | Cause | Solution |
| --- | --- | --- |
| `node` n'est pas reconnu | le terminal a été ouvert avant l'installation | fermer et rouvrir le terminal |
| `npm.ps1 ne peut pas être chargé` (PowerShell) | les scripts sont bloqués par Windows | `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`, ou utiliser l'invite de commandes |
| `Port 5173 is in use` | un autre serveur tourne déjà | Vite prend le port suivant : lire l'adresse affichée |
| téléchargement très lent | Wi-Fi saturé | installeurs sur clé USB, ou plan B ci-dessous |

**Plan B.** Si votre ordinateur est trop lent ou si l'installation échoue, [StackBlitz](https://stackblitz.com) fait tourner Node.js et Vite dans le navigateur, sans rien installer.

**Plan C : Docker.** Si Docker Desktop est installé, les programmes de ce dépôt (l'API simulée, la démo de S1, le labo) se lancent sans Node.js : voir le [README](../README.md) à la racine. Pour votre projet React, installez tout de même Node.js : c'est l'outil de travail de tout le module.
