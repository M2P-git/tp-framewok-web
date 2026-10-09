// Les types des données de Mawid : ils décrivent la forme des objets que l'on
// manipule, et TypeScript vérifie qu'on les utilise correctement.
// Ils ont été écrits À PARTIR des données (src/data/salons.json, et l'API en S3),
// et pas l'inverse : on décrit ce qui existe.

export type CategoryId = 'coiffure' | 'barbier' | 'hammam-spa' | 'esthetique' | 'kine' | 'coach';

// Les clés des jours, comme dans les données : 'mon' = lundi ... 'sun' = dimanche
export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

// Une plage d'ouverture : ['10:00', '13:00']
export type TimeRange = [string, string];
export type OpeningHours = Record<DayKey, TimeRange[]>;

// Le thème d'un établissement : c'est LUI qui rend le même code réutilisable pour
// chaque client (ce qu'on appelle un gabarit en « marque blanche »)
export type Theme = {
  primary: string; // couleur principale, par exemple '#0f766e'
  soft: string; // couleur douce, pour les fonds
  fontFamily: string;
  radius: string; // arrondi des cartes et des boutons, par exemple '0.75rem'
  logoText: string; // initiales affichées dans le logo, par exemple 'SY'
};

export type BusinessSettings = {
  slotStepMinutes: number; // les créneaux commencent tous les N minutes
  minNoticeMinutes: number; // délai minimal avant un rendez-vous
  maxDaysAhead: number; // réservation possible jusqu'à N jours à l'avance
  freeCancellationHours: number; // annulation en ligne jusqu'à N heures avant
  autoConfirm: boolean; // true : confirmé tout de suite ; false : « en attente »
};

export type Service = {
  id: string;
  businessId: string;
  group: string; // 'Coupe', 'Couleur', 'Soins'...
  name: string;
  durationMinutes: number;
  priceMad: number; // 0 : prestation offerte
  description: string;
  active: boolean;
};

export type StaffMember = {
  id: string;
  firstName: string;
  role: string;
  serviceIds: string[];
  workingDays: DayKey[];
  color: string; // couleur de l'employé dans l'agenda
};

export type Rating = {
  average: number | null; // null : aucun avis pour l'instant
  count: number;
};

// Un établissement, tel que l'API le renvoie pour sa page (GET /api/businesses/:slug)
export type Business = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  city: string;
  district: string;
  address: string;
  phone: string;
  tagline: string;
  description: string;
  openingHours: OpeningHours;
  settings: BusinessSettings;
  theme: Theme;
  plan: 'essentiel' | 'pro';
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  rating: Rating;
  services: Service[];
  staff: StaffMember[];
};
