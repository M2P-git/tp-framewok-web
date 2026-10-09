# Les briefs des extensions

Chaque brief est écrit comme une annonce de client : le besoin, les utilisateurs, ce qui est
indispensable et ce qui serait un plus. **Il est volontairement incomplet** : posez vos questions
à la cliente avant d'écrire votre fiche de cadrage (`../modeles/questions-client.md`).

Toutes les extensions s'appuient sur l'API simulée (`../api-simulee/serveur.mjs`) et ses
données (`../donnees/db.json`). Les adresses utiles sont rappelées dans chaque brief ; la page
`http://localhost:3001` les liste toutes.

---

## A. Le tableau de bord du gérant

> *Type de mission : tableau de bord SaaS, visualisation de données (la mission React la plus
> fréquente sur Upwork en 2026).*

« Mes gérants ne savent pas combien ils gagnent par semaine, ni quelles prestations marchent.
Je veux qu'en ouvrant Mawid le matin, un gérant voie en 10 secondes comment va son commerce. »

- **Utilisateurs** : le gérant, sur tablette ou téléphone, au comptoir.
- **Indispensable** : chiffre d'affaires (rendez-vous honorés) sur une période choisie (7 jours,
  30 jours, ce mois) ; nombre de rendez-vous par statut ; taux d'absence ; les prestations les plus
  demandées ; l'activité par jour de la semaine et par heure ; la charge de chaque employé.
- **Un plus** : comparaison avec la période précédente ; export CSV pour le comptable ; un
  graphique lisible au daltonisme.
- **API** : `GET /api/businesses/:id/bookings?from=&to=` (et `status`, `staffId`) ;
  `GET /api/businesses/:id` (prestations, équipe). Tous les chiffres sont **calculés** dans
  l'interface à partir des rendez-vous.
- **Le piège** : un chiffre faux sur un tableau de bord détruit la confiance. Chaque indicateur a
  son test, sur un petit jeu de rendez-vous écrit à la main.

## B. La boutique du salon

> *Type de mission : e-commerce (catalogue, panier, commande).*

« Les clientes demandent souvent le shampooing ou l'huile qu'on a utilisés sur elles. Je veux
qu'elles puissent les réserver en ligne et les payer en venant. »

- **Utilisateurs** : le client (téléphone), le gérant (qui prépare les commandes).
- **Indispensable** : le catalogue des produits d'un établissement (catégories, prix, rupture de
  stock) ; le panier (quantités, total, persistant au rechargement) ; la commande « réservée, à
  retirer sur place » ; la liste des commandes pour le gérant.
- **Un plus** : ajouter un produit au panier depuis la confirmation d'un rendez-vous ; un seuil
  d'alerte de stock.
- **API** : `GET /api/businesses/:id/products` ; `POST /api/orders` (409 si le stock est
  insuffisant) ; `GET /api/businesses/:id/orders`.
- **Le piège** : le stock change pendant que le client remplit son panier.

## C. L'assistant IA du gérant

> *Type de mission : intégration d'un modèle d'IA dans une application existante (la catégorie qui
> progresse le plus vite).*

« Mes gérants écrivent très mal leurs descriptions, et ils ne répondent jamais aux avis. Une IA
pourrait les aider, mais je ne veux pas qu'elle publie n'importe quoi à leur place. »

- **Utilisateurs** : le gérant.
- **Indispensable** : rédiger la description d'une prestation ; proposer une réponse à un avis ;
  résumer la journée à venir. Le texte proposé est **toujours modifiable** et **jamais publié sans
  validation** du gérant. États de l'interface : en cours (cela prend plusieurs secondes),
  erreur, nouvel essai, texte accepté ou rejeté.
- **Un plus** : choisir le ton (chaleureux, professionnel) ; le texte qui s'affiche au fur et à
  mesure (streaming).
- **API** : `POST /api/ia/generer` (une IA **simulée**, gratuite, qui met 1,2 seconde à
  répondre) ; `GET /api/businesses/:id/reviews` ; `PATCH /api/reviews/:id` (la réponse).
- **Au mois 2** : brancher un vrai modèle **depuis le serveur** (jamais depuis le navigateur : la
  clé d'API serait lisible par tout le monde), avec une limite de requêtes et un coût suivi.
- **Le piège** : faire confiance à la sortie du modèle. Que se passe-t-il s'il invente un prix ?

## D. La vitrine publique, bien référencée (Next.js)

> *Type de mission : site vitrine, référencement (SEO), conversion d'une maquette en Next.js.*

« Quand quelqu'un cherche "barbier Salé" sur Google, je veux qu'il tombe sur la page Mawid du
barbier. Et quand on partage la page sur WhatsApp, il faut voir le nom et la photo du salon. »

- **Utilisateurs** : les visiteurs qui arrivent d'un moteur de recherche ou d'un lien partagé.
- **Indispensable** : avec **Next.js**, une page d'accueil, une page par ville et par catégorie
  (« Coiffure à Rabat »), et une page par établissement, **rendues sur le serveur** : le HTML
  contient déjà le nom, l'adresse, les prestations et les prix. Titre et description pour chaque
  page, aperçu de partage (Open Graph), plan du site (`sitemap.xml`). Le bouton « Réserver »
  renvoie vers l'application React.
- **Un plus** : les données structurées (schema.org `LocalBusiness`) ; un score Lighthouse
  supérieur à 90 sur téléphone.
- **API** : `GET /api/businesses`, `/api/businesses/:slug`, `/api/cities`, `/api/categories`.
- **Le piège** : une page qui s'affiche bien dans le navigateur mais dont le HTML reçu est vide
  (« Ctrl+U » : le détective de S1).

## E. Le back-office de l'équipe Mawid (Angular)

> *Type de mission : application de gestion interne. Beaucoup d'entreprises (banques, assurances,
> grands comptes avec une équipe Java ou .NET) demandent Angular.*

« Avant qu'un établissement apparaisse sur Mawid, mon équipe vérifie qu'il existe vraiment. Et
quand un avis est insultant, il faut pouvoir le masquer. Aujourd'hui on fait tout à la main. »

- **Utilisateurs** : l'équipe Mawid (3 personnes), sur ordinateur.
- **Indispensable** : avec **Angular**, la liste des établissements avec filtres par statut (en
  attente, actif, suspendu) ; la fiche d'un établissement ; valider, suspendre, réactiver ; la
  modération des avis (masquer, réafficher) ; une connexion réservée à l'administrateur.
- **Un plus** : des tableaux triables et paginés ; un historique des décisions.
- **API** : `GET /api/admin/businesses?status=pending` ; `PATCH /api/admin/businesses/:id` ;
  `GET /api/businesses/:id/reviews` ; `PATCH /api/reviews/:id` (`hidden`) ;
  `POST /api/auth/login` (`admin@mawid.test` / `admin1234`).
- **Le défi** : vous apprenez Angular en même temps (composants, gabarits, services et injection
  de dépendances, signaux, `HttpClient`). Vous présenterez en S11 ce qui change par rapport à React.

## F. Les avis et la fidélité

> *Type de mission : place de marché ; la confiance (notes, avis) et la fidélisation.*

« Une cliente hésite entre deux salons : elle regarde les avis. Et je veux récompenser les
habituées : à la dixième visite, une prestation offerte. »

- **Utilisateurs** : le client, le gérant.
- **Indispensable** : sur la page d'un établissement, la note moyenne, la répartition des notes et
  les derniers avis (paginés) ; laisser un avis **seulement** après un rendez-vous honoré, un seul
  par rendez-vous ; la réponse du gérant ; la carte de fidélité d'un client (nombre de visites
  honorées, calculé à partir de ses rendez-vous).
- **Un plus** : trier et filtrer les avis ; signaler un avis.
- **API** : `GET` et `POST /api/businesses/:id/reviews` ; `PATCH /api/reviews/:id` ;
  `GET /api/customers/:id/bookings`.
- **Le piège** : les faux avis. Quelles règles le serveur doit-il vérifier ?

## G. Mawid en arabe et en anglais

> *Type de mission : internationalisation (i18n) et localisation.*

« La moitié de mes clientes préfèrent l'arabe. Et à Marrakech, beaucoup de clients sont des
touristes. »

- **Utilisateurs** : tous.
- **Indispensable** : l'interface en français, en arabe et en anglais, avec un sélecteur de langue
  mémorisé ; en arabe, toute la page passe de droite à gauche (`dir="rtl"`) sans casser la mise en
  page (propriétés CSS logiques : `margin-inline-start` au lieu de `margin-left`) ; les dates, les
  heures et les prix formatés selon la langue (`Intl.DateTimeFormat`, `Intl.NumberFormat`).
- **Un plus** : les pluriels de l'arabe ; la langue proposée selon le navigateur.
- **API** : toutes ; les contenus des établissements restent en français (dites-le à la cliente).
- **Le piège** : un texte écrit en dur dans un composant. Un seul suffit à casser une traduction.

## H. L'application installable et les rappels

> *Type de mission : application web progressive (PWA) : installable, rapide, utilisable hors ligne.*

« Mes gérants veulent une "vraie appli" sur leur téléphone. Et le matin, dans le salon, le réseau
ne passe pas toujours. Et surtout : les rappels, pour que les clients viennent ! »

- **Utilisateurs** : le gérant (téléphone), le client.
- **Indispensable** : l'application installable (manifeste, icônes, écran de démarrage) ; l'agenda
  du jour consultable **hors ligne** (dernière version connue, avec la date de mise à jour) ; un
  bouton « Ajouter à mon agenda » (fichier `.ics`) sur la confirmation ; la liste des rappels à
  envoyer demain (simulés : l'interface montre ce qui serait envoyé, et à qui).
- **Un plus** : les notifications du navigateur ; un message hors ligne clair partout.
- **API** : `GET /api/businesses/:id/bookings?date=` ; `GET /api/bookings/:id`.
- **Le piège** : le cache qui montre de vieilles données sans le dire.
