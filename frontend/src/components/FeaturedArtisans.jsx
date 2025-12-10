import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArtisans } from '../services/api';

function FeaturedArtisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(Number(rating)); // au cas où rating est une string

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
    async function loadFeatured() {
      try {
        // ✅ PARAM CORRECT POUR LE BACKEND
        const data = await fetchArtisans({ top: true });
        setArtisans(data);
      } catch (error) {
        console.error('Erreur lors du chargement des artisans du mois :', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeatured();
  }, []);

  if (loading) {
    return (
      <section className="featured-section pb-5">
        <div className="container">
          <h2 className="featured-title text-center mb-4">
            Les artisans du mois
          </h2>
          <p className="text-center">Chargement des artisans...</p>
        </div>
      </section>
    );
  }

  if (!artisans.length) {
    return (
      <section className="featured-section pb-5">
        <div className="container">
          <h2 className="featured-title text-center mb-4">
            Les artisans du mois
          </h2>
          <p className="text-center">
            Aucun artisan du mois n’est disponible pour le moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-section pb-5">
      <div className="container">
        <h2 className="featured-title text-center mb-4">
          Les artisans du mois
        </h2>

        <div className="row g-3 featured-row">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="col-12 col-lg-4">
              <Link
                to={`/artisan/${artisan.id}`}
                className="featured-card d-flex align-items-center text-decoration-none"
              >
                <div className="featured-avatar" />

                <div className="featured-content">
                  <h3 className="featured-name mb-1">{artisan.name}</h3>

                  <p className="featured-specialty mb-0">
                    <span className="featured-specialty-link">
                      {artisan.Speciality?.name}
                    </span>
                  </p>

                  <p className="featured-city mb-1">{artisan.city}</p>

                  <div className="featured-stars">
                    {renderStars(artisan.rating)}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedArtisans;
