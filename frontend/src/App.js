import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListArtisans from './pages/ListArtisans';
import ArtisanPage from './pages/ArtisanPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil */}
        <Route path="/" element={<Home />} />

        {/* Liste des artisans */}
        <Route path="/artisans" element={<ListArtisans />} />

        {/* Fiche artisan avec un paramètre :id */}
        <Route path="/artisan/:id" element={<ArtisanPage />} />

        {/* Route de secours (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
