// Toutes les requêtes vers l'API passent par ce fichier :
// si l'adresse ou le format change, on ne corrige qu'ici.
// Les types importés ci-dessous n'existent pas encore : les écrire, d'après les réponses
// de l'API, est le checkpoint 1 du TP S3.
import type {
  Availability,
  AuthSession,
  Booking,
  BookingStatus,
  BusinessesPage,
  Business,
  Category,
  City,
  NewBooking,
} from '../types';

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
    // fetch ne lève pas d'erreur sur un 404, un 409 ou un 500 : c'est à nous de le faire
    throw new ApiError(response.status, body?.message ?? `Erreur ${response.status}`, body?.errors);
  }
  return body as T;
}

const json = (method: string, data: unknown): RequestInit => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

// ---------- Le client : trouver un établissement ----------

export type BusinessFilters = { q: string; city: string; category: string; page: number };

export function fetchBusinesses(filters: BusinessFilters, signal?: AbortSignal) {
  const params = new URLSearchParams({ page: String(filters.page), limit: '12' });
  if (filters.q) params.set('q', filters.q);
  if (filters.city) params.set('city', filters.city);
  if (filters.category) params.set('category', filters.category);
  return request<BusinessesPage>(`/businesses?${params}`, { signal });
}

export function fetchCategories(signal?: AbortSignal) {
  return request<Category[]>('/categories', { signal });
}

export function fetchCities(signal?: AbortSignal) {
  return request<City[]>('/cities', { signal });
}

// slug ('salon-yasmine-rabat') ou identifiant ('b-01')
export function fetchBusiness(slug: string, signal?: AbortSignal) {
  return request<Business>(`/businesses/${slug}`, { signal });
}

// ---------- Le client : réserver ----------

export function fetchAvailability(
  businessId: string,
  date: string, // 'AAAA-MM-JJ'
  serviceIds: string[],
  staffId?: string,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({ date, serviceIds: serviceIds.join(',') });
  if (staffId) params.set('staffId', staffId);
  return request<Availability>(`/businesses/${businessId}/availability?${params}`, { signal });
}

// 201 : le rendez-vous ; 409 : le créneau vient d'être pris ; 422 : formulaire refusé (fieldErrors)
export function createBooking(data: NewBooking) {
  return request<Booking>('/bookings', json('POST', data));
}

export function fetchBooking(id: string, signal?: AbortSignal) {
  return request<Booking>(`/bookings/${id}`, { signal });
}

export function fetchCustomerBookings(customerId: string, signal?: AbortSignal) {
  return request<Booking[]>(`/customers/${customerId}/bookings`, { signal });
}

// ---------- Le pro : son agenda (S4) ----------

export function fetchBusinessBookings(businessId: string, date: string, signal?: AbortSignal) {
  return request<Booking[]>(`/businesses/${businessId}/bookings?date=${date}`, { signal });
}

// Les rendez-vous d'une période, du jour `from` au jour `to` inclus (tableau de bord, exercice 4.1)
export function fetchBusinessBookingsBetween(businessId: string, from: string, to: string, signal?: AbortSignal) {
  return request<Booking[]>(`/businesses/${businessId}/bookings?from=${from}&to=${to}`, { signal });
}

export function updateBookingStatus(id: string, status: BookingStatus, by: 'customer' | 'business') {
  return request<Booking>(`/bookings/${id}`, json('PATCH', { status, by }));
}

// Connexion SIMULÉE : l'API ne vérifie pas encore le jeton (ce sera le travail du mois 2)
export function login(email: string, password: string) {
  return request<AuthSession>('/auth/login', json('POST', { email, password }));
}
