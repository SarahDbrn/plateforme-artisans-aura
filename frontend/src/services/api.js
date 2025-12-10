export const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) throw new Error('Erreur API catégories');
  return res.json();
}

export async function fetchArtisans(params = {}) {
  const url = new URL(`${API_BASE_URL}/artisans`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur API artisans');
  return res.json();
}
