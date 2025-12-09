import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoRegion from '../assets/logo-region.png';
import { api } from '../services/api';


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

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

  return (
    <header
      className="bg-white shadow-sm"
      style={{ position: 'sticky', top: 0, zIndex: 1000 }}
    >
      <div className="container py-3">

        {/* HEADER MOBILE */}
        <div className="d-lg-none d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img
              src={logoRegion}
              alt="Logo région AURA"
              style={{ height: '50px' }}
            />
          </Link>

          {/* Hamburger */}
          <button
            className="btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
          >
            <i className="bi bi-list" style={{ fontSize: '1.8rem' }}></i>
          </button>
        </div>

        {/* NAVIGATION MOBILE (si ouvert) */}
        {menuOpen && (
          <nav className="d-lg-none mt-3">
              <ul className="list-unstyled d-flex flex-column gap-2">
                {categories.map((category) => (
                <li key={category.id}>
                  <NavLink
                  className="nav-link"
                  to={`/artisans?category=${category.id}`}
                  onClick={() => setMenuOpen(false)}
                  >
                  {category.name}
                  </NavLink>
                </li>
                ))}
              </ul>
          </nav>
        )}

        {/* SEARCH BAR MOBILE */}
        <div className="d-lg-none mt-3">
          <div className="input-group">
            <span className="input-group-text bg-white border-primary text-primary">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="search"
              className="form-control border-primary"
              placeholder="Recherche un artisan"
            />
          </div>
        </div>

        {/* HEADER DESKTOP */}
        <div className="d-none d-lg-flex align-items-center justify-content-between">

          {/* Logo */}
          <Link to="/" className="text-decoration-none">
            <img
              src={logoRegion}
              alt="Logo région AURA"
              style={{ height: '100px' }}
            />
          </Link>

          {/* Menu catégories */}
          <nav>
            <ul className="d-flex gap-5 list-unstyled m-0">
              {categories.map((category) => (
              <li key={category.id}>
                <NavLink
                className="nav-link text-primary"
                to={`/artisans?category=${category.id}`}
                >
                {category.name}
                </NavLink>
              </li>
              ))}
            </ul>
          </nav>

          {/* SEARCH BAR DESKTOP */}
          <div style={{ minWidth: "350px" }}>
            <div className="input-group rounded-pill border border-primary px-3 py-1">
              <span
                className="input-group-text bg-transparent border-0"
                style={{ paddingLeft: 0 }}
              >
                <i className="bi bi-search text-primary"></i>
              </span>
              <input
                type="search"
                className="form-control border-0"
                placeholder="Recherche un artisan"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;
