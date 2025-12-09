const API_BASE_URL = 'http://localhost:4000/api';
const API_KEY = 'super-secret-api-key'; // le même que dans le .env de l'API

async function fetchJSON(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    // optionnel : tu peux logger ici
    throw new Error(`Erreur API (${response.status})`);
  }

  return response.json();
}

export const api = {
  // GET /api/artisans?search=&featured=&categoryId=&specialtyId=
  getArtisans: async (params = {}) => {
    const searchParams = new URLSearchParams();

    if (params.search) searchParams.set('search', params.search);
    if (params.featured) searchParams.set('featured', 'true');
    if (params.categoryId) searchParams.set('categoryId', params.categoryId);
    if (params.specialtyId) searchParams.set('specialtyId', params.specialtyId);

    const query = searchParams.toString();
    const path = query ? `/artisans?${query}` : '/artisans';

    return fetchJSON(path);
  },

  // GET /api/artisans/:id
  getArtisanById: async (id) => fetchJSON(`/artisans/${id}`),

  // GET /api/categories
  getCategories: async () => fetchJSON('/categories'),
};
