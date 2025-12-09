import { Link } from 'react-router-dom';
import HowToFindArtisan from '../components/HowToFindArtisan';
import FeaturedArtisans from '../components/FeaturedArtisans';


function Home() {
  return (
    <main className="home">
      {/* HERO DESKTOP */}
      <section className="home-hero d-none d-lg-block">
        <div className="container">
          <div className="home-hero-inner text-center text-white">
            <h1 className="home-hero-title">
              TROUVEZ FACILEMENT UN ARTISAN DE CONFIANCE
            </h1>
            <p className="home-hero-subtitle">
              Trouvez des artisans locaux dans toute la région Auvergne-Rhône-Alpes.
            </p>

            {/* Barre de recherche du hero */}
            <div className="home-hero-search-wrapper">
              <div className="input-group home-hero-search">
                <span className="input-group-text bg-transparent border-0">
                  <i className="bi bi-search" />
                </span>
                <input
                  type="search"
                  className="form-control border-0"
                  placeholder="Rechercher un artisan"
                  aria-label="Rechercher un artisan"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Comment trouver mon artisan ?" */}
      <HowToFindArtisan />

      {/* Section "Artisans du mois" */}
      <FeaturedArtisans />

    </main>
  );
}

export default Home;
