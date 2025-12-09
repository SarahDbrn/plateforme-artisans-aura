import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';

function ListArtisans() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialCategoryFromURL = params.get('category') || '';

  const [search, setSearch] = useState('');
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryFromURL);
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState('');

  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating);

    for (let i = 1; i <= 5; i += 1) {
      stars.push(
        <i
          key={i}
          className={`bi ${i <= rounded ? 'bi-star-fill' : 'bi-star'}`}
        />,
      );
    }
    return stars;
  };

  // Charger les catégories une seule fois
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    }

    fetchCategories();
  }, []);

  // Mettre à jour la catégorie quand l’URL change (clic depuis le header)
  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    const categoryFromURL = newParams.get('category') || '';
    setSelectedCategoryId(categoryFromURL);
    setSelectedSpecialtyId('');
  }, [location.search]);

  // Charger les artisans selon catégorie / spécialité / recherche
  useEffect(() => {
    async function fetchArtisans() {
      setLoading(true);
      try {
        const data = await api.getArtisans({
          categoryId: selectedCategoryId || undefined,
          specialtyId: selectedSpecialtyId || undefined,
          search: search || undefined,
        });
        setArtisans(data);
      } catch (error) {
        console.error('Erreur lors du chargement des artisans :', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtisans();
  }, [selectedCategoryId, selectedSpecialtyId, search]);

  const selectedCategory = categories.find(
    (cat) => cat.id === Number(selectedCategoryId),
  );

  const specialtiesForSelectedCategory = selectedCategory?.Specialties || [];

  return (
    <main className="list-page py-4 py-lg-5">
      <div className="container">
        {/* barre recherche */}
        <section className="list-search mb-4 mb-lg-5">
          <div className="input-group list-search-input">
            <span className="input-group-text bg-transparent border-0">
              <i className="bi bi-search" />
            </span>
            <input
              type="search"
              className="form-control border-0"
              placeholder="Rechercher un artisan"
              aria-label="Rechercher un artisan"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        <div className="row">
          {/* COLONNE FILTRES */}
          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <section className="filters-card p-3 p-lg-4">
              {/* Filtre catégorie */}
              <div className="mb-3">
                <label className="form-label" htmlFor="filter-category">
                  Catégorie
                </label>
                <select
                  id="filter-category"
                  className="form-select"
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value);
                    setSelectedSpecialtyId('');
                  }}
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtre spécialité */}
              <div className="mb-3">
                <label className="form-label" htmlFor="filter-specialty">
                  Spécialité
                </label>
                <select
                  id="filter-specialty"
                  className="form-select"
                  value={selectedSpecialtyId}
                  onChange={(e) => setSelectedSpecialtyId(e.target.value)}
                  disabled={!selectedCategoryId}
                >
                  <option value="">Toutes les spécialités</option>
                  {specialtiesForSelectedCategory.map((specialty) => (
                    <option key={specialty.id} value={specialty.id}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>
            </section>
          </div>

          {/* COLONNE RÉSULTATS */}
          <div className="col-12 col-lg-8">
            <h2 className="list-results-title mb-3">Résultats :</h2>

            {loading && <p>Chargement des artisans...</p>}

            {!loading && !artisans.length && (
              <p>Aucun artisan ne correspond à votre recherche.</p>
            )}

            <div className="row g-3">
              {artisans.map((artisan) => (
                <div key={artisan.id} className="col-12 col-md-6">
                  <Link
                    to={`/artisan/${artisan.id}`}
                    className="artisan-card text-decoration-none"
                  >
                    <div className="artisan-card-left">
                      <div className="artisan-avatar" />
                      <div>
                        <h3 className="artisan-name mb-1">{artisan.name}</h3>
                        <div className="artisan-stars mb-1">
                          {renderStars(artisan.rating)}
                        </div>
                        <p className="artisan-specialty mb-0">
                          <span className="artisan-specialty-link">
                            {artisan.Specialty?.name}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="artisan-card-right text-end">
                      <p className="artisan-city mb-1">{artisan.city}</p>
                      <i className="bi bi-chevron-right artisan-chevron" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ListArtisans;
