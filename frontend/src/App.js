import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListArtisans from './pages/ListArtisans';
import ArtisanPage from './pages/ArtisanPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';

function App() {
  return (
    <Router>
      {/* Header commun à toutes les pages */}
      <Header />

      {/* Contenu des pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<ListArtisans />} />
        <Route path="/artisan/:id" element={<ArtisanPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;