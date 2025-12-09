import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

function ListArtisans() {
  const [search, setSearch] = useState('');
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchArtisans() {
      try {
        const data = await api.getArtisans();
        setArtisans(data);
      } catch (error) {
        console.error('Erreur lors du chargement des artisans :', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtisans();
  }, []);

  const filteredArtisans = artisans.filter((artisan) =>
    artisan.name.toLowerCase().includes(search.toLowerCase()),
  );

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
          {/* filtres à gauche : inchangés pour l’instant */}
          {/* ... ton code existant de filters-card ... */}

          {/* résultats */}
          <div className="col-12 col-lg-8">
            <h2 className="list-results-title mb-3">Résultats :</h2>

            {loading && <p>Chargement des artisans...</p>}

            {!loading && !filteredArtisans.length && (
              <p>Aucun artisan ne correspond à votre recherche.</p>
            )}

            <div className="row g-3">
              {filteredArtisans.map((artisan) => (
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
