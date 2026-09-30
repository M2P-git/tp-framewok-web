// Les types des données de BabStage : ils décrivent la forme des objets
// que l'on manipule, et TypeScript vérifie qu'on les utilise correctement.

export type WorkMode = 'onsite' | 'hybrid' | 'remote';

export type Offer = {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  city: string;
  workMode: WorkMode;
  durationMonths: number;
  startDate: string;
  skills: string[];
  stipendMad: number;
  status: 'published' | 'closed';
  publishedAt: string;
  description: string;
};
