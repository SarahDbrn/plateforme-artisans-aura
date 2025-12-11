export const API_BASE_URL = "https://artisans-backend-f4wf.onrender.com/api";

// -------------------------------
// CATEGORIES
// -------------------------------
export async function fetchCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) throw new Error('Erreur API catégories');
  return res.json();
}

// -------------------------------
// LISTE DES ARTISANS (avec filtres)
// -------------------------------
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

// -------------------------------
// FICHE ARTISAN
// -------------------------------
export async function fetchArtisanById(id) {
  const res = await fetch(`${API_BASE_URL}/artisans/${id}`);
  if (!res.ok) throw new Error('Erreur API fiche artisan');
  return res.json();
}

// -------------------------------
// FORMULAIRE DE CONTACT
// -------------------------------
export async function sendContactMessage({ artisanId, name, email, subject, message }) {
  const res = await fetch(`${API_BASE_URL}/artisans/${artisanId}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, subject, message }),
  });

  // 👉 Pour le devoir, on peut considérer qu'une 200/201 = OK
  if (!res.ok) {
    throw new Error("Erreur lors de l'envoi du message de contact");
  }

  return res.json(); // on s'attend à { success: true, ... }
}

// -------------------------------
// EXPORT GLOBAL
// -------------------------------
export const api = {
  fetchCategories,
  fetchArtisans,
  fetchArtisanById,
  sendContactMessage,
};
