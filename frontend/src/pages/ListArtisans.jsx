import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchCategories, fetchArtisans } from '../services/api';

function ListArtisans() {
  const location = useLocation();

  // Lecture de la recherche initiale dans l'URL (?search=...)
  const params = new URLSearchParams(location.search);
  const initialSearchFromURL = params.get('search') || '';

  // 🎯 États du formulaire (ce qu’on voit dans les inputs)
  const [searchInput, setSearchInput] = useState(initialSearchFromURL);
  const [nameOrderInput, setNameOrderInput] = useState('');
  const [noteOrderInput, setNoteOrderInput] = useState('');
  const [specialtyInput, setSpecialtyInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  // 🎯 États appliqués aux résultats (seulement après clic sur "Rechercher")
  const [appliedFilters, setAppliedFilters] = useState({
    search: initialSearchFromURL,
    nameOrder: '',
    noteOrder: '',
    specialtyId: '',
    location: '',
  });

  const [artisans, setArtisans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ Affichage des étoiles
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

  // 1) Charger les catégories (pour les spécialités de la DB)
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
        console.log('Catégories depuis API :', data);
      } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    }

    loadCategories();
  }, []);

  // 2) Si l’URL change (ex: ?search=...), on met à jour la recherche
  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    const searchFromURL = newParams.get('search') || '';

    setSearchInput(searchFromURL);
    setAppliedFilters((prev) => ({
      ...prev,
      search: searchFromURL,
    }));
  }, [location.search]);

  // 3) Charger les artisans en fonction de la recherche APPLIQUÉE
  useEffect(() => {
    async function loadArtisans() {
      setLoading(true);
      try {
        const data = await fetchArtisans({
          search: appliedFilters.search || undefined,
        });
        setArtisans(data);
        console.log('Artisans depuis API :', data);
      } catch (error) {
        console.error('Erreur lors du chargement des artisans :', error);
      } finally {
        setLoading(false);
      }
    }

    loadArtisans();
  }, [appliedFilters.search]);

  // 4) Construire la liste des spécialités

  // a) Depuis les catégories (DB)
  const specialtiesFromCategories = Array.from(
    new Map(
      categories
        .flatMap((cat) => cat.Specialties || cat.specialties || [])
        .map((spec) => [spec.id, spec]) // Map pour éviter les doublons
    ).values()
  );

  // b) Depuis les artisans (fallback)
  const specialtiesFromArtisans = Array.from(
    new Map(
      artisans
        .filter((a) => a.Specialty)
        .map((a) => [a.Specialty.id, a.Specialty])
    ).values()
  );

  // c) On choisit : DB en priorité, sinon fallback artisans
  let allSpecialties = specialtiesFromCategories;
  if (!allSpecialties.length) {
    allSpecialties = specialtiesFromArtisans;
  }

  allSpecialties.sort((a, b) => a.name.localeCompare(b.name, 'fr'));

  // 5) Localisations à partir des artisans
  const allLocations = Array.from(
    new Set(
      artisans
        .map((a) => a.city)
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, 'fr'));

  // 6) Appliquer filtres + tri (uniquement d’après appliedFilters)
  const processedArtisans = [...artisans]
    .filter((a) => {
      if (appliedFilters.specialtyId && a.Specialty?.id !== Number(appliedFilters.specialtyId)) {
        return false;
      }
      if (appliedFilters.location && a.city !== appliedFilters.location) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (appliedFilters.noteOrder === 'best') {
        return b.rating - a.rating;
      }
      if (appliedFilters.noteOrder === 'worst') {
        return a.rating - b.rating;
      }

      if (appliedFilters.nameOrder === 'az') {
        return a.name.localeCompare(b.name, 'fr');
      }
      if (appliedFilters.nameOrder === 'za') {
        return b.name.localeCompare(a.name, 'fr');
      }

      return 0;
    });

  // 7) Bouton "Rechercher" → applique les filtres
  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchInput,
      nameOrder: nameOrderInput,
      noteOrder: noteOrderInput,
      specialtyId: specialtyInput,
      location: locationInput,
    });
  };

  // 8) Bouton "Réinitialiser"
  const handleResetFilters = () => {
    setSearchInput('');
    setNameOrderInput('');
    setNoteOrderInput('');
    setSpecialtyInput('');
    setLocationInput('');

    setAppliedFilters({
      search: '',
      nameOrder: '',
      noteOrder: '',
      specialtyId: '',
      location: '',
    });
  };

  return (
    <main className="list-page py-4 py-lg-5">
      <div className="container list-page-inner">
        {/* Barre de recherche */}
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
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </section>

        <h2 className="list-results-title mb-4">Résultats :</h2>

        <div className="row list-main-row">
          {/* COLONNE FILTRES */}
          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <section className="filters-card p-3 p-lg-4">
              {/* Par nom */}
              <div className="mb-3">
                <label className="form-label" htmlFor="filter-name">
                  Par nom
                </label>
                <select
                  id="filter-name"
                  className="form-select"
                  value={nameOrderInput}
                  onChange={(e) => setNameOrderInput(e.target.value)}
                >
                  <option value="">Aucun tri</option>
                  <option value="az">Nom A → Z</option>
                  <option value="za">Nom Z → A</option>
                </select>
              </div>

              {/* Par note */}
              <div className="mb-3">
                <label className="form-label" htmlFor="filter-note">
                  Par note
                </label>
                <select
                  id="filter-note"
                  className="form-select"
                  value={noteOrderInput}
                  onChange={(e) => setNoteOrderInput(e.target.value)}
                >
                  <option value="">Toutes les notes</option>
                  <option value="best">Meilleure note en premier</option>
                  <option value="worst">Moins bien notés en premier</option>
                </select>
              </div>

              {/* Par spécialité */}
              <div className="mb-3">
                <label className="form-label" htmlFor="filter-specialty">
                  Par spécialité
                </label>
                <select
                  id="filter-specialty"
                  className="form-select"
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                >
                  <option value="">Toutes les spécialités</option>
                  {allSpecialties.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Par localisation */}
              <div className="mb-3">
                <label className="form-label" htmlFor="filter-location">
                  Par localisation
                </label>
                <select
                  id="filter-location"
                  className="form-select"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                >
                  <option value="">Toutes les localisations</option>
                  {allLocations.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Boutons */}
              <div className="filters-actions">
                <button
                  type="button"
                  className="list-btn-primary"
                  onClick={handleApplyFilters}
                >
                  Rechercher
                </button>

                <button
                  type="button"
                  className="list-btn-secondary"
                  onClick={handleResetFilters}
                >
                  Réinitialiser
                </button>
              </div>
            </section>
          </div>

          {/* COLONNE RÉSULTATS */}
          <div className="col-12 col-lg-8">
            {loading && <p>Chargement des artisans...</p>}

            {!loading && !processedArtisans.length && (
              <p>Aucun artisan ne correspond à votre recherche.</p>
            )}

            <div className="row g-3">
              {processedArtisans.map((artisan) => (
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
