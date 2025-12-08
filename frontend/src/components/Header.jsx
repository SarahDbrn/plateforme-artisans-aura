import { Link, NavLink } from 'react-router-dom';
import logoRegion from '../assets/logo-region.png';

function Header() {
  return (
    <header className="bg-white border-bottom">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          {/* Logo cliquable vers la page d'accueil */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={logoRegion}
              alt="Région Auvergne-Rhône-Alpes - Accueil"
              style={{ height: '48px' }}
            />
          </Link>

          {/* Bouton burger pour mobile/tablette */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Afficher la navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            {/* Menu de navigation */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/artisans" className="nav-link">
                  Bâtiment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/artisans" className="nav-link">
                  Services
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/artisans" className="nav-link">
                  Fabrication
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/artisans" className="nav-link">
                  Alimentation
                </NavLink>
              </li>
            </ul>

            {/* Barre de recherche */}
            <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Rechercher un artisan"
                aria-label="Rechercher un artisan"
              />
              <button className="btn btn-primary" type="submit">
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
