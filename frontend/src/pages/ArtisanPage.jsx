import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

function ArtisanPage() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
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
    async function fetchArtisan() {
      try {
        const data = await api.getArtisanById(id);
        setArtisan(data);
      } catch (error) {
        console.error('Erreur lors du chargement de la fiche artisan :', error);
        setArtisan(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArtisan();
  }, [id]);

  if (loading) {
    return (
      <main className="artisan-page py-5">
        <div className="container">
          <p>Chargement de la fiche artisan...</p>
        </div>
      </main>
    );
  }

  if (!artisan) {
    return (
      <main className="artisan-page py-5">
        <div className="container">
          <p>Artisan introuvable.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="artisan-page py-4 py-lg-5">
      <div className="container">
        <div className="row g-4 g-lg-5">
          {/* colonne gauche : infos */}
          <div className="col-12 col-lg-6">
            <section className="artisan-profile text-center text-lg-start">
              <div className="artisan-photo mx-auto mb-3" />

              <h1 className="artisan-name-detail mb-2">{artisan.name}</h1>

              <div className="artisan-stars-detail mb-2">
                {renderStars(artisan.rating)}
              </div>

              <p className="mb-1">
                <span className="fw-semibold">Spécialité :</span>{' '}
                <span className="artisan-specialty-link">
                  {artisan.Specialty?.name}
                </span>
              </p>

              <p className="mb-4">
                <span className="fw-semibold">Localisation :</span>{' '}
                <span className="artisan-location-link">{artisan.city}</span>
              </p>

              <h2 className="artisan-about-title mb-2">A propos :</h2>
              <p className="artisan-about-text mb-4">
                {artisan.description || "Cet artisan n'a pas encore renseigné de description."}
              </p>

              {artisan.website && (
                <section className="artisan-website mb-4 mb-lg-0">
                  <h3 className="artisan-website-title mb-1">Site web</h3>
                  <a
                    href={artisan.website}
                    target="_blank"
                    rel="noreferrer"
                    className="artisan-website-link"
                  >
                    <i className="bi bi-box-arrow-up-right me-1" />
                    Voir le site web
                  </a>
                </section>
              )}
            </section>
          </div>

          {/* colonne droite : formulaire (inchangé) */}
          {/* ... ton formulaire existant ... */}
        </div>
      </div>
    </main>
  );
}

export default ArtisanPage;
