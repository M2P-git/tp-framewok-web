// Toutes les requêtes vers l'API passent par ce fichier :
// si l'adresse ou le format change, on ne corrige qu'ici.
import type { Application, NewApplication, OfferWithCompany, OffersPage } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

// Une erreur qui garde le code HTTP et, s'il y en a, les erreurs par champ
export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(status: number, message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    // fetch ne lève pas d'erreur sur un 404 ou un 500 : c'est à nous de le faire
    throw new ApiError(response.status, body?.message ?? `Erreur ${response.status}`, body?.errors);
  }
  return body as T;
}

export type OfferFilters = { q: string; city: string; page: number };

export function fetchOffers(filters: OfferFilters, signal?: AbortSignal) {
  const params = new URLSearchParams({ page: String(filters.page), limit: '12' });
  if (filters.q) params.set('q', filters.q);
  if (filters.city) params.set('city', filters.city);
  return request<OffersPage>(`/offers?${params}`, { signal });
}

export function fetchOffer(id: string, signal?: AbortSignal) {
  return request<OfferWithCompany>(`/offers/${id}`, { signal });
}

export function fetchApplications(studentId: string, signal?: AbortSignal) {
  return request<Application[]>(`/applications?studentId=${studentId}`, { signal });
}

export function createApplication(data: NewApplication) {
  return request<Application>('/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
