# <Nom du projet> : <une phrase qui dit ce que ça fait, pour qui>

> Un recruteur ou un client passe **30 secondes** sur votre dépôt. Ce README doit, en 30
> secondes, montrer : le problème, la solution qui marche (un lien, une image), et que vous
> savez pourquoi vous avez fait vos choix. Remplacez tout ce qui est entre chevrons.

**[Voir la démo en ligne](<URL>)** · **[Vidéo de 2 minutes](<URL>)** · <badge de l'intégration continue>

![Capture d'écran du parcours principal](docs/capture.png)

## Le problème

<Deux phrases : qui a quel problème, et ce que ça lui coûte.>

## Ce que fait l'application

- <Fonctionnalité 1, du point de vue de l'utilisateur>
- <Fonctionnalité 2>
- <Fonctionnalité 3>

Comptes de démonstration : <client / pro / admin, avec mots de passe de démo>

## Les choix techniques, et pourquoi

| Besoin | Choix | Pourquoi (et ce que j'ai écarté) |
| --- | --- | --- |
| interface | React + TypeScript + Vite | <...> |
| données serveur | TanStack Query | <cache, états de chargement, invalidation ; plutôt que useEffect à la main> |
| formulaires | React Hook Form + Zod | <les mêmes règles qu'au serveur> |
| thème par client | variables CSS alimentées par les données | <un seul code pour tous les salons> |

## Ce qui était difficile

<Un ou deux problèmes réels, et comment vous les avez résolus : « deux clients réservaient le
même créneau en même temps (409) », « les créneaux en fin de journée ». C'est la partie que les
recruteurs lisent le plus.>

## La qualité

- Tests : <nombre> tests (Vitest, Testing Library), lancés à chaque push par GitHub Actions
- Accessibilité : <navigation au clavier, contrastes vérifiés, Lighthouse : score>
- Usage de l'IA : <comment, avec quelles règles ; lien vers le journal IA>

## Lancer le projet

```bash
npm install
npm run dev     # http://localhost:5173
npm test
```

## Et ensuite ?

<Ce que vous feriez avec deux semaines de plus. Montre que vous savez prioriser.>

## Auteur

<Nom> · <LinkedIn> · <profil Upwork ou Malt> · <courriel>
