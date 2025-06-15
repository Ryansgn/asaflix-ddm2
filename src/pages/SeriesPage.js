import React, { useEffect, useState } from 'react';
import {
  getTrendingSeries,
  getPopularSeries,
  getTopRatedSeries,
  getAiringTodaySeries,
} from '../services/tmdb';
import MovieCarousel from '../components/MovieCarousel';

export default function SeriesPage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [airingToday, setAiringToday] = useState([]);

  useEffect(() => {
    getTrendingSeries().then(res => setTrending(res.data.results));
    getPopularSeries().then(res => setPopular(res.data.results));
    getTopRatedSeries().then(res => setTopRated(res.data.results));
    getAiringTodaySeries().then(res => setAiringToday(res.data.results));
  }, []);

  return (
    <div>
    <h1 style={{ color: '#fff', padding: '1rem', marginBottom: '-1.0rem' }}>📺 Séries em Destaque</h1>
      <MovieCarousel title="🔥 Séries Populares" movies={trending} type="serie" />
      <MovieCarousel title="🎯 Populares na Semana" movies={popular} type="serie" />
      <MovieCarousel title="🏆 Melhor Avaliadas" movies={topRated} type="serie" />
      <MovieCarousel title="📡 Em Exibição Hoje" movies={airingToday} type="serie" />
    </div>
  );
}