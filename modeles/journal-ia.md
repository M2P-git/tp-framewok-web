# Journal IA : <votre nom>

L'IA est **un binôme, jamais l'auteur** : vous pouvez lui demander d'expliquer, de proposer, de
relire, de générer des tests ou des données ; mais chaque ligne que vous poussez, vous devez
pouvoir l'expliquer, la modifier et la défendre. Ce journal est évalué : pas sur la quantité,
sur la **lucidité**. Une entrée « l'IA s'est trompée, voici comment je l'ai vu » vaut plus que
dix entrées « ça a marché ».

Une entrée par usage significatif (pas pour chaque autocomplétion).

## Modèle d'entrée

### <AAAA-MM-JJ> : <le sujet en quelques mots>

- **Outil** : <Copilot, Claude, ChatGPT, Cursor...>
- **Ce que je voulais** : <le besoin, pas le prompt>
- **Ce que j'ai demandé** : <le prompt, ou son résumé ; le contexte donné : fichiers, règles>
- **Ce que j'ai reçu** : <résumé>
- **Ce que j'ai gardé, modifié, rejeté, et pourquoi** :
- **Comment j'ai vérifié** : <test écrit, lancé ; doc officielle lue ; essai dans le navigateur>
- **Ce que j'ai appris** :

## Un exemple

### 2026-10-20 : les créneaux libres renvoient des horaires après la fermeture

- **Outil** : Claude
- **Ce que je voulais** : comprendre pourquoi `creneauxLibres` proposait 19:45 pour une prestation de 45 minutes alors que le salon ferme à 20:00.
- **Ce que j'ai demandé** : « Voici ma fonction et le test qui échoue. N'écris pas la correction : explique-moi d'où vient l'erreur. »
- **Ce que j'ai reçu** : la condition de ma boucle testait le DÉBUT du créneau au lieu de sa FIN.
- **Ce que j'ai gardé** : l'explication. J'ai corrigé moi-même (`t + duree <= fin`).
- **Comment j'ai vérifié** : le test passe ; j'ai ajouté un test pour une prestation qui finit pile à la fermeture.
- **Ce que j'ai appris** : tester les bornes (la limite exacte, une minute avant, une minute après).
