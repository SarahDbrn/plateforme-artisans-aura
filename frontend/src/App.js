import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListArtisans from './pages/ListArtisans';
import ArtisanPage from './pages/ArtisanPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<ListArtisans />} />
        <Route path="/artisan/:id" element={<ArtisanPage />} />

        {/* 🔽 Tous les liens utiles du footer renvoient à la 404 */}
        <Route path="/mentions-legales" element={<NotFound />} />
        <Route path="/donnees-personnelles" element={<NotFound />} />
        <Route path="/accessibilite" element={<NotFound />} />
        <Route path="/cookies" element={<NotFound />} />

        {/* Route catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
