// L'API simulée de Mawid, pour le mois 1 (aucune dépendance à installer).
//
// Mawid est la plateforme de réservation qui sert de fil rouge au module : des
// professionnels (salons, barbiers, hammams, instituts, kinés, coachs) publient leurs
// prestations, et leurs clients réservent un créneau en ligne.
//
// Lancement (Node.js 20 ou plus) :
//   node serveur.mjs                  puis ouvrir http://localhost:3001
// Options, par variables d'environnement :
//   PORT=3001         le port d'écoute
//   LATENCE=300       délai ajouté à chaque réponse, en millisecondes
//   PANNE=0.2         probabilité qu'une requête échoue (erreur 500 simulée)
//   ALEATOIRE=1       latence tirée au hasard entre 0 et 2 x LATENCE : les réponses
//                     peuvent arriver dans le désordre (démonstration de S3)
//   AUJOURDHUI=2026-10-05   fixe la date du jour (démonstrations, corrigés chiffrés)
//   DECALER=0         ne pas décaler les dates des données (voir plus bas)
// Sous PowerShell : $env:LATENCE=1500; node serveur.mjs
//
// Les données (../donnees/db.json) ont été générées autour d'une date de référence.
// Au démarrage, toutes les dates des rendez-vous et des avis sont décalées d'un
// nombre entier de SEMAINES, pour que « aujourd'hui » tombe toujours dans la
// période couverte : l'agenda du jour n'est jamais vide, quel que soit le jour où
// vous travaillez, et chaque rendez-vous garde son jour de la semaine.
//
// Ce qui est envoyé (rendez-vous, avis, commandes) est gardé en mémoire : tout
// disparaît quand on arrête le serveur. Nous réglerons ce problème au mois 2 avec
// une vraie base de données. Ce fichier montre aussi à quoi ressemble un serveur
// écrit « à la main », sans framework : nous le comparerons à Express.

import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

const PORT = Number(process.env.PORT ?? 3001);
const LATENCE = Number(process.env.LATENCE ?? 300);
const PANNE = Number(process.env.PANNE ?? 0);
const ALEATOIRE = process.env.ALEATOIRE === '1';
const AUJOURDHUI = /^\d{4}-\d{2}-\d{2}$/.test(process.env.AUJOURDHUI ?? '') ? process.env.AUJOURDHUI : null;
const DECALER = process.env.DECALER !== '0';

const db = JSON.parse(readFileSync(new URL('../donnees/db.json', import.meta.url), 'utf8'));

// ---------------------------------------------------------------------------
// Les dates. Toutes les heures sont locales (Maroc), au format AAAA-MM-JJTHH:MM,
// sans fuseau : c'est volontairement simple. Une vraie application stocke l'heure
// en UTC et l'affiche dans le fuseau de l'utilisateur.

const deux = (n) => String(n).padStart(2, '0');
const JOURS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function versMs(t) {
  const [d, h = '00:00'] = t.split('T');
  const [a, m, j] = d.split('-').map(Number);
  const [hh, mm] = h.split(':').map(Number);
  return Date.UTC(a, m - 1, j, hh, mm);
}
function depuisMs(ms) {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}-${deux(d.getUTCMonth() + 1)}-${deux(d.getUTCDate())}`
    + `T${deux(d.getUTCHours())}:${deux(d.getUTCMinutes())}`;
}
const ajouterMinutes = (t, n) => depuisMs(versMs(t) + n * 60_000);
const enMinutes = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
const enHeure = (min) => `${deux(Math.floor(min / 60))}:${deux(min % 60)}`;
const jourDeLaSemaine = (jour) => JOURS[new Date(versMs(jour)).getUTCDay()];
const dateValide = (jour) => {
  if (typeof jour !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(jour)) return false;
  const ms = versMs(jour);
  return Number.isFinite(ms) && depuisMs(ms).startsWith(jour);
};

function maintenant() {
  const d = new Date();
  const local = `${d.getFullYear()}-${deux(d.getMonth() + 1)}-${deux(d.getDate())}T${deux(d.getHours())}:${deux(d.getMinutes())}`;
  return AUJOURDHUI ? `${AUJOURDHUI}${local.slice(10)}` : local;
}
const aujourdhui = () => maintenant().slice(0, 10);

// Décalage des données d'un nombre entier de semaines
const ecartJours = Math.round((versMs(aujourdhui()) - versMs(db.meta.today)) / 86_400_000);
const DECALAGE = DECALER ? Math.round(ecartJours / 7) * 7 : 0;
if (DECALAGE !== 0) {
  const decaler = (t) => (t ? ajouterMinutes(t, DECALAGE * 1440) : t);
  for (const r of db.bookings) {
    r.start = decaler(r.start);
    r.end = decaler(r.end);
    r.createdAt = decaler(r.createdAt);
    r.updatedAt = decaler(r.updatedAt);
  }
  for (const a of db.reviews) {
    a.createdAt = decaler(a.createdAt);
    if (a.reply) a.reply.at = decaler(a.reply.at);
  }
}

// ---------------------------------------------------------------------------
// Petits outils

const ENTETES_CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function envoyer(res, statut, corps) {
  res.writeHead(statut, { 'Content-Type': 'application/json; charset=utf-8', ...ENTETES_CORS });
  res.end(JSON.stringify(corps));
}

// Recherche insensible aux accents et à la casse : « sale » trouve « Salé »
function normaliser(texte) {
  return String(texte ?? '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

function paginer(liste, params, parDefaut = 12) {
  const limit = Math.min(Math.max(Number(params.get('limit')) || parDefaut, 1), 50);
  const page = Math.max(Number(params.get('page')) || 1, 1);
  const debut = (page - 1) * limit;
  return { items: liste.slice(debut, debut + limit), total: liste.length, page, limit };
}

function lireCorps(req) {
  return new Promise((resolve, reject) => {
    let texte = '';
    req.on('data', (morceau) => {
      texte += morceau;
      if (texte.length > 100_000) reject(new Error('Corps trop gros'));
    });
    req.on('end', () => {
      try {
        resolve(texte ? JSON.parse(texte) : {});
      } catch {
        reject(new Error('JSON invalide'));
      }
    });
  });
}

const prochainId = (liste, prefixe, chiffres) => {
  const max = liste.reduce((m, x) => Math.max(m, Number(x.id.slice(prefixe.length + 1)) || 0), 0);
  return `${prefixe}-${String(max + 1).padStart(chiffres, '0')}`;
};

const parId = (liste) => new Map(liste.map((x) => [x.id, x]));
const services = parId(db.services);
const employes = parId(db.staff);
const clients = parId(db.customers);

// ---------------------------------------------------------------------------
// Établissements

function trouverEtablissement(idOuSlug, { memeInactif = false } = {}) {
  const e = db.businesses.find((b) => b.id === idOuSlug || b.slug === idOuSlug);
  if (!e || (!memeInactif && e.status !== 'active')) return null;
  return e;
}

function note(businessId) {
  const avis = db.reviews.filter((a) => a.businessId === businessId && !a.hidden);
  const somme = avis.reduce((s, a) => s + a.rating, 0);
  return { average: avis.length ? Math.round((somme / avis.length) * 10) / 10 : null, count: avis.length };
}

const prestationsActives = (businessId) => db.services.filter((s) => s.businessId === businessId && s.active);

function resume(e) {
  const prix = prestationsActives(e.id).map((s) => s.priceMad);
  return {
    id: e.id, slug: e.slug, name: e.name, category: e.category, city: e.city,
    district: e.district, tagline: e.tagline, theme: e.theme, rating: note(e.id),
    minPriceMad: prix.length ? Math.min(...prix) : null, servicesCount: prix.length,
  };
}

const employePublic = ({ id, firstName, role, serviceIds, workingDays, color }) =>
  ({ id, firstName, role, serviceIds, workingDays, color });

function listerEtablissements(params) {
  const q = normaliser(params.get('q')).trim();
  const city = params.get('city');
  const category = params.get('category');
  let liste = db.businesses.filter((e) => e.status === 'active');
  if (q) {
    liste = liste.filter((e) => {
      const noms = prestationsActives(e.id).map((s) => s.name).join(' ');
      return normaliser(`${e.name} ${e.city} ${e.district} ${e.category} ${noms}`).includes(q);
    });
  }
  if (city) liste = liste.filter((e) => e.city === city);
  if (category) liste = liste.filter((e) => e.category === category);
  let items = liste.map(resume);
  if (params.get('sort') === 'rating') {
    items.sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0) || a.name.localeCompare(b.name, 'fr'));
  } else {
    items.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  }
  return paginer(items, params);
}

// ---------------------------------------------------------------------------
// Les créneaux libres : le cœur métier de Mawid

function rendezVousDuJour(businessId, jour) {
  return db.bookings.filter((r) => r.businessId === businessId && r.start.startsWith(jour) && r.status !== 'cancelled');
}

// ignorerOccupes : la grille des créneaux sans tenir compte des rendez-vous (pour distinguer
// « cet horaire n'existe pas » (422) de « cet horaire vient d'être pris » (409))
function disponibilites(e, jour, serviceIds, staffId = null, { ignorerOccupes = false } = {}) {
  const choisies = serviceIds.map((id) => services.get(id));
  const duree = choisies.reduce((s, p) => s + p.durationMinutes, 0);
  const reponse = { date: jour, durationMinutes: duree, slots: [], closed: false, reason: null };
  const plages = e.openingHours[jourDeLaSemaine(jour)];
  const maintenantT = maintenant();
  const auPlusTot = ajouterMinutes(maintenantT, e.settings.minNoticeMinutes);
  const auPlusTard = ajouterMinutes(`${aujourdhui()}T23:59`, e.settings.maxDaysAhead * 1440);

  if (jour < aujourdhui()) return { ...reponse, closed: true, reason: 'Cette date est passée.' };
  if (`${jour}T00:00` > auPlusTard) {
    return { ...reponse, closed: true, reason: `Réservation possible jusqu'à ${e.settings.maxDaysAhead} jours à l'avance.` };
  }
  if (plages.length === 0) return { ...reponse, closed: true, reason: 'Fermé ce jour-là.' };

  const nomJour = jourDeLaSemaine(jour);
  const equipe = db.staff.filter((s) => s.businessId === e.id
    && s.workingDays.includes(nomJour)
    && serviceIds.every((id) => s.serviceIds.includes(id))
    && (!staffId || s.id === staffId));
  const occupes = ignorerOccupes ? [] : rendezVousDuJour(e.id, jour);

  for (const [debut, fin] of plages) {
    for (let t = enMinutes(debut); t + duree <= enMinutes(fin); t += e.settings.slotStepMinutes) {
      const heure = enHeure(t);
      if (`${jour}T${heure}` < auPlusTot) continue;
      const libres = equipe.filter((s) => !occupes.some((r) => r.staffId === s.id
        && enMinutes(r.start.slice(11)) < t + duree && t < enMinutes(r.end.slice(11))));
      if (libres.length > 0) reponse.slots.push({ time: heure, staffIds: libres.map((s) => s.id) });
    }
  }
  if (reponse.slots.length === 0) {
    reponse.reason = jour === aujourdhui() ? "Plus aucun créneau libre aujourd'hui." : 'Complet ce jour-là.';
  }
  return reponse;
}

// ---------------------------------------------------------------------------
// Les rendez-vous

// Qui peut passer d'un statut à l'autre : la machine à états d'un rendez-vous
const TRANSITIONS = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['completed', 'no_show', 'cancelled'],
  completed: [],
  no_show: [],
  cancelled: [],
};

function enrichir(r) {
  const e = db.businesses.find((b) => b.id === r.businessId);
  const s = employes.get(r.staffId);
  const c = clients.get(r.customerId);
  return {
    ...r,
    business: { id: e.id, slug: e.slug, name: e.name, phone: e.phone, address: e.address },
    services: r.serviceIds.map((id) => {
      const p = services.get(id);
      return { id: p.id, name: p.name, durationMinutes: p.durationMinutes, priceMad: p.priceMad };
    }),
    staff: s ? { id: s.id, firstName: s.firstName, role: s.role, color: s.color } : null,
    customer: c ? { id: c.id, firstName: c.firstName, lastName: c.lastName, phone: c.phone } : null,
  };
}

function normaliserTelephone(tel) {
  const brut = String(tel ?? '').replace(/[\s.-]/g, '');
  const local = brut.startsWith('+212') ? `0${brut.slice(4)}` : brut;
  return /^0[5-7]\d{8}$/.test(local) ? local : null;
}
const formaterTelephone = (t) => t.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');

// Mêmes règles que le formulaire React (S3) : le serveur revérifie TOUT.
function validerReservation(corps) {
  const erreurs = {};
  const e = trouverEtablissement(corps.businessId);
  if (!e) erreurs.businessId = 'Établissement inconnu';
  const ids = Array.isArray(corps.serviceIds) ? corps.serviceIds : [];
  if (ids.length === 0) erreurs.serviceIds = 'Choisissez au moins une prestation';
  else if (e && !ids.every((id) => services.get(id)?.businessId === e.id && services.get(id).active)) {
    erreurs.serviceIds = 'Prestation inconnue pour cet établissement';
  } else if (new Set(ids).size !== ids.length) erreurs.serviceIds = 'Prestation en double';
  if (!dateValide(corps.date)) erreurs.date = 'Date attendue au format AAAA-MM-JJ';
  if (!/^\d{2}:\d{2}$/.test(corps.time ?? '')) erreurs.time = 'Heure attendue au format HH:MM';
  if (corps.staffId && employes.get(corps.staffId)?.businessId !== corps.businessId) {
    erreurs.staffId = 'Employé inconnu pour cet établissement';
  }
  const c = corps.customer ?? {};
  for (const champ of ['firstName', 'lastName']) {
    const v = typeof c[champ] === 'string' ? c[champ].trim() : '';
    if (v.length < 2 || v.length > 50) erreurs[`customer.${champ}`] = 'Entre 2 et 50 caractères';
  }
  if (!normaliserTelephone(c.phone)) erreurs['customer.phone'] = 'Numéro marocain attendu, par exemple 06 12 34 56 78';
  if (c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) erreurs['customer.email'] = 'Adresse électronique invalide';
  if (corps.note && String(corps.note).length > 300) erreurs.note = 'Au plus 300 caractères';
  // Loi 09-08 : on ne garde pas de données personnelles sans accord explicite
  if (corps.consent !== true) erreurs.consent = 'Votre accord est nécessaire pour enregistrer le rendez-vous';
  return { erreurs, etablissement: e };
}

function creerReservation(corps) {
  const { erreurs, etablissement: e } = validerReservation(corps);
  if (Object.keys(erreurs).length > 0) return [422, { message: 'Réservation invalide', errors: erreurs }];

  const grille = disponibilites(e, corps.date, corps.serviceIds, corps.staffId || null, { ignorerOccupes: true });
  if (!grille.slots.some((s) => s.time === corps.time)) {
    return [422, {
      message: 'Réservation invalide',
      errors: { time: grille.reason && grille.closed ? grille.reason : "Cet horaire n'est pas proposé ce jour-là." },
    }];
  }
  const dispo = disponibilites(e, corps.date, corps.serviceIds, corps.staffId || null);
  const creneau = dispo.slots.find((s) => s.time === corps.time);
  if (!creneau) {
    return [409, { message: "Ce créneau n'est plus disponible : choisissez-en un autre.", code: 'SLOT_TAKEN' }];
  }
  const staffId = corps.staffId || creneau.staffIds[0];

  // Le client : retrouvé par son téléphone, sinon créé
  const tel = normaliserTelephone(corps.customer.phone);
  let client = db.customers.find((x) => normaliserTelephone(x.phone) === tel);
  if (!client) {
    client = {
      id: prochainId(db.customers, 'cu', 4),
      firstName: corps.customer.firstName.trim(), lastName: corps.customer.lastName.trim(),
      phone: formaterTelephone(tel), email: corps.customer.email || null, city: e.city,
      createdAt: aujourdhui(), marketingOptIn: false,
    };
    db.customers.push(client);
    clients.set(client.id, client);
  }

  const debut = `${corps.date}T${corps.time}`;
  const r = {
    id: prochainId(db.bookings, 'bk', 5),
    businessId: e.id,
    serviceIds: [...corps.serviceIds],
    staffId,
    customerId: client.id,
    start: debut,
    end: ajouterMinutes(debut, dispo.durationMinutes),
    durationMinutes: dispo.durationMinutes,
    priceMad: corps.serviceIds.reduce((s, id) => s + services.get(id).priceMad, 0),
    status: e.settings.autoConfirm ? 'confirmed' : 'pending',
    cancelledBy: null,
    source: 'web',
    note: corps.note ? String(corps.note).trim() : null,
    createdAt: maintenant(),
    updatedAt: maintenant(),
  };
  db.bookings.push(r);
  return [201, enrichir(r)];
}

function changerStatut(r, corps) {
  const vers = corps.status;
  if (!(vers in TRANSITIONS)) return [422, { message: `Statut inconnu : ${vers}` }];
  if (!TRANSITIONS[r.status].includes(vers)) {
    return [422, { message: `Impossible de passer de « ${r.status} » à « ${vers} ».` }];
  }
  const e = db.businesses.find((b) => b.id === r.businessId);
  if ((vers === 'completed' || vers === 'no_show') && r.start > maintenant()) {
    return [422, { message: "Ce rendez-vous n'a pas encore eu lieu." }];
  }
  if (vers === 'cancelled' && corps.by === 'customer'
      && ajouterMinutes(maintenant(), e.settings.freeCancellationHours * 60) > r.start) {
    return [422, {
      message: `Annulation en ligne impossible moins de ${e.settings.freeCancellationHours} h avant : appelez l'établissement.`,
    }];
  }
  r.status = vers;
  r.cancelledBy = vers === 'cancelled' ? (corps.by === 'customer' ? 'customer' : 'business') : null;
  r.updatedAt = maintenant();
  return [200, enrichir(r)];
}

// ---------------------------------------------------------------------------
// Les extensions des projets d'équipe : avis, boutique, IA simulée, back-office

function creerAvis(e, corps) {
  const r = db.bookings.find((x) => x.id === corps.bookingId);
  if (!r || r.businessId !== e.id) return [422, { message: 'Rendez-vous inconnu pour cet établissement' }];
  if (r.status !== 'completed') return [422, { message: 'On ne note qu\'un rendez-vous honoré' }];
  if (db.reviews.some((a) => a.bookingId === r.id)) return [409, { message: 'Ce rendez-vous a déjà un avis' }];
  const note = Number(corps.rating);
  if (!Number.isInteger(note) || note < 1 || note > 5) return [422, { message: 'Note entière de 1 à 5 attendue' }];
  const commentaire = String(corps.comment ?? '').trim();
  if (commentaire.length > 1000) return [422, { message: 'Commentaire de 1 000 caractères au plus' }];
  const c = clients.get(r.customerId);
  const avis = {
    id: prochainId(db.reviews, 'rv', 4), businessId: e.id, bookingId: r.id, customerId: c.id,
    customerName: `${c.firstName} ${c.lastName[0]}.`, rating: note, comment: commentaire,
    createdAt: maintenant(), reply: null,
  };
  db.reviews.push(avis);
  return [201, avis];
}

function creerCommande(corps) {
  const e = trouverEtablissement(corps.businessId);
  if (!e) return [422, { message: 'Établissement inconnu' }];
  const c = corps.customer ?? {};
  if (!normaliserTelephone(c.phone) || !c.firstName || !c.lastName) {
    return [422, { message: 'Prénom, nom et téléphone marocain obligatoires' }];
  }
  const lignes = Array.isArray(corps.items) ? corps.items : [];
  if (lignes.length === 0) return [422, { message: 'Le panier est vide' }];
  const details = [];
  for (const { productId, quantity } of lignes) {
    const p = db.products.find((x) => x.id === productId && x.businessId === e.id);
    if (!p) return [422, { message: `Produit inconnu : ${productId}` }];
    if (!Number.isInteger(quantity) || quantity < 1) return [422, { message: 'Quantité entière positive attendue' }];
    if (quantity > p.stock) return [409, { message: `Stock insuffisant pour « ${p.name} » (${p.stock} restant)`, code: 'OUT_OF_STOCK' }];
    details.push({ productId: p.id, name: p.name, unitPriceMad: p.priceMad, quantity });
  }
  for (const d of details) db.products.find((p) => p.id === d.productId).stock -= d.quantity;
  const commande = {
    id: prochainId(db.orders, 'or', 4), businessId: e.id,
    customer: { firstName: c.firstName, lastName: c.lastName, phone: formaterTelephone(normaliserTelephone(c.phone)) },
    items: details, totalMad: details.reduce((s, d) => s + d.unitPriceMad * d.quantity, 0),
    status: 'reserved', createdAt: maintenant(),
  };
  db.orders.push(commande);
  return [201, commande];
}

// Une « IA » simulée, pour développer l'interface sans clé d'API ni frais.
// En production, l'appel au vrai modèle se fait TOUJOURS depuis le serveur :
// une clé d'API placée dans le code du navigateur est lisible par tout le monde.
function generer({ tache, contexte = {} }) {
  if (tache === 'description-prestation') {
    const { nom = 'Cette prestation', dureeMinutes, prixMad, etablissement } = contexte;
    const duree = dureeMinutes ? ` en ${dureeMinutes} minutes` : '';
    const prix = prixMad === 0 ? ' Elle est offerte.' : prixMad ? ` Tarif : ${prixMad} DH.` : '';
    return `${nom}${duree}${etablissement ? `, chez ${etablissement}` : ''} : un moment pensé pour vous, `
      + `avec des produits de qualité et une équipe attentive.${prix} Réservez votre créneau en ligne.`;
  }
  if (tache === 'reponse-avis') {
    const { note, prenom = '' } = contexte;
    const salut = prenom ? `Bonjour ${prenom},` : 'Bonjour,';
    if (Number(note) >= 4) return `${salut} merci pour votre avis et votre confiance. Toute l'équipe sera ravie de vous accueillir à nouveau !`;
    return `${salut} merci d'avoir pris le temps de nous écrire, et toutes nos excuses pour cette expérience. `
      + 'Pouvez-vous nous appeler ? Nous voulons comprendre ce qui s\'est passé et vous proposer une solution.';
  }
  if (tache === 'resume-journee') {
    const rdvs = Array.isArray(contexte.rendezVous) ? contexte.rendezVous : [];
    if (rdvs.length === 0) return "Aucun rendez-vous aujourd'hui : c'est le moment de relancer vos clients fidèles.";
    const heures = rdvs.map((r) => r.heure).filter(Boolean).sort();
    const attente = rdvs.filter((r) => r.statut === 'pending').length;
    const plage = heures.length === 0 ? ''
      : heures[0] === heures.at(-1) ? `, à ${heures[0]}` : `, de ${heures[0]} à ${heures.at(-1)}`;
    return `Vous avez ${rdvs.length} rendez-vous aujourd'hui${plage}.`
      + (attente === 1 ? ' Un rendez-vous attend encore votre confirmation.'
        : attente > 1 ? ` ${attente} attendent encore votre confirmation.` : ' Tous sont confirmés.');
  }
  return null;
}

// ---------------------------------------------------------------------------
// La connexion simulée : aucun vrai contrôle ici. Le mois 2 fera les choses bien
// (mots de passe hachés, jetons signés, rôles vérifiés par le serveur).

function connecter({ email, password }) {
  const courriel = String(email ?? '').trim().toLowerCase();
  const u = db.users.find((x) => x.email === courriel);
  if (u && password === (u.role === 'admin' ? 'admin1234' : 'demo1234')) {
    return [200, { token: `jeton-simule.${u.id}`, user: u }];
  }
  const c = db.customers.find((x) => x.email === courriel);
  if (c && password === 'demo1234') {
    return [200, {
      token: `jeton-simule.${c.id}`,
      user: { id: c.id, email: c.email, role: 'customer', customerId: c.id, displayName: `${c.firstName} ${c.lastName}` },
    }];
  }
  return [401, { message: 'Adresse ou mot de passe incorrect' }];
}

// ---------------------------------------------------------------------------
// La page d'aide

function aide() {
  const jour = aujourdhui();
  return `<!doctype html><meta charset="utf-8"><title>API simulée Mawid</title>
<style>body{font-family:system-ui;max-width:860px;margin:2rem auto;padding:0 1rem;line-height:1.5}code{background:#eef;padding:0 .2em}h2{margin-top:2rem}</style>
<h1>API simulée de Mawid</h1>
<p>Aujourd'hui, pour l'API : <strong>${jour}</strong> (données décalées de ${DECALAGE} jours). Toutes les réponses sont en JSON.</p>
<h2>Le client : trouver un pro et réserver</h2>
<ul>
<li><a href="/api/businesses">/api/businesses</a> : les établissements, 12 par page (<code>?q=coupe&amp;city=Rabat&amp;category=coiffure&amp;sort=rating&amp;page=2&amp;limit=12</code>)</li>
<li><a href="/api/categories">/api/categories</a> et <a href="/api/cities">/api/cities</a> : pour les menus de filtres</li>
<li><a href="/api/businesses/salon-yasmine-rabat">/api/businesses/salon-yasmine-rabat</a> : un établissement (par son slug ou son id), avec ses prestations et son équipe</li>
<li><a href="/api/businesses/b-06/availability?date=${jour}&amp;serviceIds=sv-049">/api/businesses/b-06/availability?date=${jour}&amp;serviceIds=sv-049</a> : les créneaux libres (<code>serviceIds=a,b</code> pour plusieurs prestations, <code>staffId=</code> pour un employé)</li>
<li><code>POST /api/bookings</code> : réserver (corps : <code>businessId, serviceIds, date, time, staffId?, customer {firstName, lastName, phone, email?}, note?, consent</code>) ; 201, 409 si le créneau vient d'être pris, 422 si le corps est invalide</li>
<li><a href="/api/bookings/bk-00001">/api/bookings/bk-00001</a> : un rendez-vous ; <a href="/api/customers/cu-0001/bookings">/api/customers/cu-0001/bookings</a> : ceux d'un client</li>
<li><code>PATCH /api/bookings/:id</code> : changer le statut (corps : <code>status, by</code> = <code>customer</code> ou <code>business</code>)</li>
</ul>
<h2>Le pro : son agenda</h2>
<ul>
<li><a href="/api/businesses/b-06/bookings">/api/businesses/b-06/bookings</a> : les rendez-vous du jour (<code>?date=</code>, ou <code>?from=&amp;to=</code>, <code>&amp;status=</code>, <code>&amp;staffId=</code>)</li>
<li><code>POST /api/auth/login</code> : connexion simulée (<code>salon-yasmine-rabat@pro.mawid.test</code> / <code>demo1234</code>, <code>admin@mawid.test</code> / <code>admin1234</code>)</li>
</ul>
<h2>Les extensions des projets d'équipe</h2>
<ul>
<li><a href="/api/businesses/b-06/reviews">/api/businesses/b-06/reviews</a> : les avis ; <code>POST</code> pour en ajouter, <code>PATCH /api/reviews/:id</code> (<code>reply</code>, <code>hidden</code>)</li>
<li><a href="/api/businesses/b-01/products">/api/businesses/b-01/products</a> : la boutique ; <code>POST /api/orders</code> ; <code>/api/businesses/:id/orders</code></li>
<li><code>POST /api/ia/generer</code> : une IA simulée (<code>tache</code> = <code>description-prestation</code>, <code>reponse-avis</code> ou <code>resume-journee</code>, et <code>contexte</code>)</li>
<li><a href="/api/admin/businesses?status=pending">/api/admin/businesses?status=pending</a> : le back-office ; <code>PATCH /api/admin/businesses/:id</code> (<code>status</code>)</li>
<li><a href="/api/meta">/api/meta</a> : la date du jour de l'API et le décalage appliqué</li>
</ul>
<p>Ajoutez <code>?_panne=1</code> à une adresse pour simuler une panne du serveur.</p>`;
}

// ---------------------------------------------------------------------------
// Le routeur

async function router(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.searchParams;
  const [racine, ressource, id, sous] = url.pathname.split('/').filter(Boolean);
  const methode = req.method;
  const ok = (corps) => envoyer(res, 200, corps);
  const introuvable = (quoi) => envoyer(res, 404, { message: `${quoi} introuvable` });
  const corps = async () => lireCorps(req);
  const repondre = ([statut, contenu]) => envoyer(res, statut, contenu);

  if (methode === 'OPTIONS') {
    res.writeHead(204, ENTETES_CORS);
    return res.end();
  }
  if (p.get('_panne') === '1' || Math.random() < PANNE) {
    return envoyer(res, 500, { message: 'Panne simulée du serveur' });
  }
  if (methode === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(aide());
  }
  if (racine !== 'api') return envoyer(res, 404, { message: `Adresse inconnue : ${url.pathname}` });

  // Méta-données et listes pour les filtres
  if (methode === 'GET' && ressource === 'meta') {
    return ok({ ...db.meta, today: aujourdhui(), now: maintenant(), shiftDays: DECALAGE });
  }
  if (methode === 'GET' && ressource === 'categories') {
    return ok(db.categories.map((c) => ({
      ...c, count: db.businesses.filter((e) => e.status === 'active' && e.category === c.id).length,
    })));
  }
  if (methode === 'GET' && ressource === 'cities') {
    const compte = new Map();
    for (const e of db.businesses) if (e.status === 'active') compte.set(e.city, (compte.get(e.city) ?? 0) + 1);
    return ok([...compte].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name, 'fr')));
  }

  // Établissements
  if (ressource === 'businesses') {
    if (methode === 'GET' && !id) return ok(listerEtablissements(p));
    const e = trouverEtablissement(id);
    if (!e) return introuvable(`Établissement ${id}`);

    if (methode === 'GET' && !sous) {
      return ok({
        ...e, rating: note(e.id), services: prestationsActives(e.id),
        staff: db.staff.filter((s) => s.businessId === e.id).map(employePublic),
      });
    }
    if (methode === 'GET' && sous === 'services') return ok(prestationsActives(e.id));
    if (methode === 'GET' && sous === 'availability') {
      const jour = p.get('date') ?? aujourdhui();
      const ids = (p.get('serviceIds') ?? '').split(',').filter(Boolean);
      if (!dateValide(jour)) return envoyer(res, 422, { message: 'Date attendue au format AAAA-MM-JJ' });
      if (ids.length === 0) return envoyer(res, 422, { message: 'Paramètre serviceIds obligatoire' });
      if (!ids.every((x) => services.get(x)?.businessId === e.id && services.get(x).active)) {
        return envoyer(res, 422, { message: 'Prestation inconnue pour cet établissement' });
      }
      return ok(disponibilites(e, jour, ids, p.get('staffId')));
    }
    if (methode === 'GET' && sous === 'bookings') {
      const du = p.get('from') ?? p.get('date') ?? aujourdhui();
      const au = p.get('to') ?? p.get('date') ?? du;
      if (!dateValide(du) || !dateValide(au)) return envoyer(res, 422, { message: 'Date attendue au format AAAA-MM-JJ' });
      const statut = p.get('status');
      const employe = p.get('staffId');
      return ok(db.bookings
        .filter((r) => r.businessId === e.id && r.start.slice(0, 10) >= du && r.start.slice(0, 10) <= au
          && (!statut || r.status === statut) && (!employe || r.staffId === employe))
        .sort((a, b) => a.start.localeCompare(b.start))
        .map(enrichir));
    }
    if (sous === 'reviews' && methode === 'GET') {
      const avis = db.reviews.filter((a) => a.businessId === e.id && !a.hidden)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      for (const a of avis) distribution[a.rating] += 1;
      return ok({ ...paginer(avis, p, 10), ...note(e.id), distribution });
    }
    if (sous === 'reviews' && methode === 'POST') return repondre(creerAvis(e, await corps()));
    if (methode === 'GET' && sous === 'products') return ok(db.products.filter((x) => x.businessId === e.id));
    if (methode === 'GET' && sous === 'orders') {
      return ok(db.orders.filter((o) => o.businessId === e.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    }
  }

  // Rendez-vous
  if (ressource === 'bookings') {
    if (methode === 'POST' && !id) return repondre(creerReservation(await corps()));
    const r = db.bookings.find((x) => x.id === id);
    if (!r) return introuvable(`Rendez-vous ${id}`);
    if (methode === 'GET' && !sous) return ok(enrichir(r));
    if (methode === 'PATCH' && !sous) return repondre(changerStatut(r, await corps()));
  }

  // Clients
  if (ressource === 'customers' && methode === 'GET') {
    const c = clients.get(id);
    if (!c) return introuvable(`Client ${id}`);
    if (!sous) return ok(c);
    if (sous === 'bookings') {
      return ok(db.bookings.filter((r) => r.customerId === c.id)
        .sort((a, b) => b.start.localeCompare(a.start)).map(enrichir));
    }
  }

  // Avis : réponse du pro, ou masquage par la modération
  if (ressource === 'reviews' && methode === 'PATCH' && id) {
    const a = db.reviews.find((x) => x.id === id);
    if (!a) return introuvable(`Avis ${id}`);
    const { reply, hidden } = await corps();
    if (reply !== undefined) {
      const texte = String(reply ?? '').trim();
      if (texte.length > 1000) return envoyer(res, 422, { message: 'Réponse de 1 000 caractères au plus' });
      a.reply = texte ? { text: texte, at: maintenant() } : null;
    }
    if (hidden !== undefined) a.hidden = Boolean(hidden);
    return ok(a);
  }

  if (ressource === 'orders' && methode === 'POST' && !id) return repondre(creerCommande(await corps()));

  if (ressource === 'ia' && id === undefined && methode === 'POST') {
    return envoyer(res, 404, { message: 'Utilisez POST /api/ia/generer' });
  }
  if (ressource === 'ia' && id === 'generer' && methode === 'POST') {
    const demande = await corps();
    await new Promise((resolve) => setTimeout(resolve, 1200)); // un modèle met du temps à répondre
    const texte = generer(demande);
    if (texte === null) {
      return envoyer(res, 422, { message: 'tache attendue : description-prestation, reponse-avis ou resume-journee' });
    }
    return ok({ texte, modele: 'simulation-locale', simule: true });
  }

  if (ressource === 'auth' && id === 'login' && methode === 'POST') return repondre(connecter(await corps()));

  // Back-office de l'équipe Mawid (extension « administration »)
  if (ressource === 'admin' && id === 'businesses') {
    if (methode === 'GET' && !sous) {
      const statut = p.get('status');
      return ok(db.businesses.filter((e) => !statut || e.status === statut)
        .map((e) => ({ ...resume(e), status: e.status, plan: e.plan, createdAt: e.createdAt })));
    }
    if (methode === 'PATCH' && sous) {
      const e = trouverEtablissement(sous, { memeInactif: true });
      if (!e) return introuvable(`Établissement ${sous}`);
      const { status } = await corps();
      if (!['active', 'pending', 'suspended'].includes(status)) {
        return envoyer(res, 422, { message: 'status attendu : active, pending ou suspended' });
      }
      e.status = status;
      return ok({ ...resume(e), status: e.status });
    }
  }

  return envoyer(res, 404, { message: `Route inconnue : ${methode} ${url.pathname}` });
}

const serveur = createServer((req, res) => {
  const debut = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - debut} ms)`);
  });
  let attente = req.method === 'OPTIONS' ? 0 : LATENCE;
  if (ALEATOIRE && attente > 0) attente = Math.round(Math.random() * 2 * LATENCE);
  setTimeout(() => {
    router(req, res).catch((e) => envoyer(res, e.message === 'JSON invalide' ? 400 : 500, { message: e.message }));
  }, attente);
});

serveur.listen(PORT, () => {
  const latence = ALEATOIRE ? `aléatoire, 0 à ${2 * LATENCE} ms` : `${LATENCE} ms`;
  console.log(`API simulée Mawid : http://localhost:${PORT}  (latence ${latence}, pannes ${PANNE * 100} %)`);
  console.log(`Aujourd'hui pour l'API : ${aujourdhui()} (données décalées de ${DECALAGE} jours)`);
});
