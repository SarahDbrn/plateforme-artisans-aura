import { Link } from 'react-router-dom';
import logoBlanc from '../assets/logo-blanc.png'; // ⬅️ Import du logo blanc

function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{ backgroundColor: '#0074c7' }} // bleu région
    >
      <div className="container py-4 py-md-5">
        <div className="row">
          {/* Colonne gauche : liens utiles */}
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h2 className="h6 fw-bold">Liens utiles</h2>
            <ul className="list-unstyled small mb-0">
              <li>
                <Link
                  to="/mentions-legales"
                  className="text-white text-decoration-none"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  to="/donnees-personnelles"
                  className="text-white text-decoration-none"
                >
                  Données personnelles
                </Link>
              </li>
              <li>
                <Link
                  to="/accessibilite"
                  className="text-white text-decoration-none"
                >
                  Accessibilité
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-white text-decoration-none"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne centre : adresse */}
          <div className="col-12 col-md-4 mb-4 mb-md-0 small text-md-center">
            <p className="mb-0">101 cours Charlemagne</p>
            <p className="mb-0">CS 20033</p>
            <p className="mb-0">69269 LYON CEDEX 02</p>
            <p className="mb-0">France</p>
            <p className="mb-0 mt-2">+33 (0)4 26 73 40 00</p>
          </div>

          {/* Colonne droite : Logo blanc */}
          <div className="col-12 col-md-4 text-md-end d-flex d-md-block justify-content-center mt-4 mt-md-0">
            <img
              src={logoBlanc}
              alt="Logo Région Auvergne Rhône-Alpes"
              style={{ height: '65px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
