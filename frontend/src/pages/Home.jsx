import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HowToFindArtisan from '../components/HowToFindArtisan';
import FeaturedArtisans from '../components/FeaturedArtisans';
import { Helmet } from "react-helmet-async";


function Home() {
  const [heroSearch, setHeroSearch] = useState('');
  const navigate = useNavigate();

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (!heroSearch.trim()) return;

    navigate(`/artisans?search=${encodeURIComponent(heroSearch.trim())}`);
  };

  return (
    <>
    <Helmet>
        <title>Plateforme Artisans AURA – Trouvez un artisan près de chez vous</title>
        <meta
          name="description"
          content="Découvrez les artisans de la région Auvergne Rhône-Alpes et trouvez facilement un professionnel qualifié pour vos travaux."
        />
      </Helmet>
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
              <form
                className="input-group home-hero-search"
                onSubmit={handleHeroSearchSubmit}
              >
                <span className="input-group-text bg-transparent border-0">
                  <i className="bi bi-search" />
                </span>
                <input
                  type="search"
                  className="form-control border-0"
                  placeholder="Rechercher un artisan"
                  aria-label="Rechercher un artisan"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Comment trouver mon artisan ?" */}
      <HowToFindArtisan />

      {/* Section "Artisans du mois" */}
      <FeaturedArtisans />
    </main>
    </>
  );
}

export default Home;
