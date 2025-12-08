import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      <h1>Page d&apos;accueil</h1>
      <p>Bienvenue sur la plateforme des artisans de la région Auvergne-Rhône-Alpes.</p>

      <nav>
        <ul>
          <li><Link to="/artisans">Voir la liste des artisans</Link></li>
          <li><Link to="/artisan/1">Voir la fiche de l&apos;artisan n°1</Link></li>
        </ul>
      </nav>
    </main>
  );
}

export default Home;
