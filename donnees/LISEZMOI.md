# Les données de Mawid

`db.json` contient le jeu de données **entièrement fictif** de Mawid : établissements, employés,
clients, numéros de téléphone et adresses électroniques sont inventés (les adresses utilisent le
domaine réservé `.test`). Il est produit par un générateur à graine fixe : deux exécutions donnent
exactement le même fichier.

Un enregistrement par ligne : le fichier se lit dans un éditeur, et ses différences dans git
restent lisibles.

| Collection | Nombre | Un exemple |
| --- | --- | --- |
| `businesses` | 32 (30 actifs, 2 en attente de validation) | Salon Yasmine, coiffure, Agdal (Rabat) |
| `services` | 216 | « Coupe femme », 45 minutes, 135 DH |
| `staff` | 90 | Siham, coiffeuse, travaille du mardi au dimanche sauf le jeudi |
| `customers` | 500 | Moussa Sow, Casablanca, 06 23 49 61 40 |
| `bookings` | 7 969 | un rendez-vous de 45 minutes, honoré, pris en ligne 10 jours avant |
| `reviews` | 1 286 | 5 étoiles, « Accueil chaleureux et travail impeccable. » |
| `products` | 155 | « Huile d'argan pure (100 ml) », 160 DH, 12 en stock |
| `users` | 33 | les comptes de démonstration (gérants et administrateur) |
| `orders` | 0 | les commandes de la boutique, créées pendant les TP |

Les rendez-vous couvrent les **5 semaines avant** et les **3 semaines après** la date de
référence du fichier (`meta.today`). Au démarrage, l'API simulée décale toutes les dates d'un
nombre entier de semaines pour que « aujourd'hui » tombe toujours dans cette période : l'agenda
du jour n'est jamais vide.

## Les règles que respectent les données

- Un employé n'a jamais deux rendez-vous (non annulés) qui se chevauchent.
- Un rendez-vous commence sur la grille des créneaux de l'établissement (tous les 15 ou 30
  minutes) et se termine avant la fermeture.
- Un rendez-vous passé est honoré (`completed`), annulé (`cancelled`) ou noté absent
  (`no_show`) ; un rendez-vous à venir est confirmé (`confirmed`), en attente (`pending`) ou annulé.
- Un avis porte sur un rendez-vous honoré ; il n'y en a jamais deux pour le même rendez-vous.
- Une prestation peut être **offerte** (`priceMad: 0`) : attention au piège du `0` en JavaScript.

## Les comptes de démonstration

| Rôle | Adresse | Mot de passe |
| --- | --- | --- |
| gérant | `<slug>@pro.mawid.test`, par exemple `salon-yasmine-rabat@pro.mawid.test` | `demo1234` |
| administrateur | `admin@mawid.test` | `admin1234` |
| client | l'adresse d'un client de `customers`, par exemple `moussa.sow1@mail.test` | `demo1234` |

La connexion est **simulée** : l'API ne vérifie aucun jeton. Le mois 2 fera les choses bien
(mots de passe hachés, jetons signés, rôles vérifiés par le serveur).

## Régénérer

Le générateur (Python 3, sans dépendance) est dans le dépôt de l'enseignant. Les mêmes
paramètres donnent le même fichier ; `--graine` en donne un autre, `--aujourdhui` change la date
de référence.
