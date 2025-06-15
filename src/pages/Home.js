import React, { useEffect, useState } from 'react';
import bannerImage from '../img/banner.png'; // caminho para seu banner

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getTrendingSeries,
  getPopularSeries,
  getTopRatedSeries,
  getAiringTodaySeries,
} from '../services/tmdb';
import MovieCarousel from '../components/MovieCarousel';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const [trendingSeries, setTrendingSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [airingTodaySeries, setAiringTodaySeries] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(res => setTrendingMovies(res.data.results));
    getPopularMovies().then(res => setPopularMovies(res.data.results));
    getTopRatedMovies().then(res => setTopRatedMovies(res.data.results));
    getNowPlayingMovies().then(res => setNowPlayingMovies(res.data.results));

    getTrendingSeries().then(res => setTrendingSeries(res.data.results));
    getPopularSeries().then(res => setPopularSeries(res.data.results));
    getTopRatedSeries().then(res => setTopRatedSeries(res.data.results));
    getAiringTodaySeries().then(res => setAiringTodaySeries(res.data.results));
  }, []);

  return (
    <div>
      {/* Banner */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '2rem auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <img
          src={bannerImage}
          alt="Banner AsaFLIX"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Filmes */}
      <MovieCarousel title="🎬 Filmes em Alta" movies={trendingMovies} type="movie" />
      <MovieCarousel title="🏆 Filmes Melhores Avaliados" movies={topRatedMovies} type="movie" />
      <MovieCarousel title="📽️ Nos Cinemas" movies={nowPlayingMovies} type="movie" />

      {/* Séries */}
      <MovieCarousel title="🔥 Séries Populares" movies={trendingSeries} type="serie" />
      <MovieCarousel title="🏅 Séries Melhores Avaliadas" movies={topRatedSeries} type="serie" />
      <MovieCarousel title="📡 Séries em Exibição Hoje" movies={airingTodaySeries} type="serie" />
    </div>
  );
}
