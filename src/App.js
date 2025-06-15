import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SeriesPage from './pages/SeriesPage';
import MovieDetails from './pages/MovieDetails';
import FavoritesPage from './pages/FavoritesPage';
import SearchResults from './pages/Searchresults';
import { FavoritesProvider } from './context/FavoritesContext';
import SearchBar from './components/SearchBar';
import SerieDetails from './pages/SerieDetails';
import MoviesOnlyPage from './pages/Moviesonlypage';
import '@fontsource/montserrat';
import './styles/global.css';
import './styles/header.css';
import Sobre from './pages/sobre';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <FavoritesProvider>
      <Router>
        <header>
          <div className="header-left">
            <Link to="/" className="logo-link">
              <img src={require('./img/logo.png')} alt="logo" />
              <h2>AsaFLIX</h2>
            </Link>
          </div>

          {/* BOTÃO HAMBURGUER - visível só no mobile */}
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>

          {/* NAV - sempre visível no desktop, toggle no mobile */}
          <nav className={menuOpen ? 'open' : ''}>
            <div className="nav-links">
              <Link to="/movies" className="nav-link" onClick={() => setMenuOpen(false)}>FILMES</Link>
              <Link to="/series" className="nav-link" onClick={() => setMenuOpen(false)}>SÉRIES</Link>
              <Link to="/favoritos" className="nav-link" onClick={() => setMenuOpen(false)}>FAVORITOS</Link>
             <Link to="/sobre" className="nav-link" onClick={() => setMenuOpen(false)}>SOBRE</Link>
            </div>

            <div className="search-login">
              <SearchBar className="search-bar" />
              <a href="/signin.html" className="login-link" onClick={() => setMenuOpen(false)}>
                <img src={require('./img/login.png')} alt="Login" />
              </a>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/serie/:id" element={<SerieDetails />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/movies" element={<MoviesOnlyPage />} />
          <Route path="/search" element={<SearchResults />} />
            <Route path="/sobre" element={<Sobre />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
