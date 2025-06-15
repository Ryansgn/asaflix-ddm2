import React, { useEffect, useState } from 'react';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getNowPlayingMovies, getGenres, getMoviesByGenre } from '../services/tmdb';
import MovieCarousel from '../components/MovieCarousel';

export default function MoviesOnlyPage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    // Fetch filmes em alta, populares, melhores avaliados, e agora nos cinemas
    getTrendingMovies().then(res => setTrending(res.data.results));
    getPopularMovies().then(res => setPopular(res.data.results));
    getTopRatedMovies().then(res => setTopRated(res.data.results));
    getNowPlayingMovies().then(res => setNowPlaying(res.data.results));

    // Fetch todos os gêneros
    getGenres().then(res => setGenres(res.data.genres));
  }, []);

  useEffect(() => {
    // Buscar filmes por gênero quando os gêneros estiverem carregados
    genres.forEach((genre) => {
      getMoviesByGenre(genre.id).then(res => {
        setMoviesByGenre(prevState => ({
          ...prevState,
          [genre.name]: res.data.results,
        }));
      });
    });
  }, [genres]);

  return (
    <div>
  <h1 style={{ color: '#fff', padding: '1rem', marginBottom: '-1.0rem' }}>🎞️ Filmes em Destaque</h1>

  {/* Divisão de filmes em alta, populares, etc. */}
  <MovieCarousel title="🎬 Filmes em alta" movies={trending} type="movie" />
  <MovieCarousel title="🎯 Filmes essa semana" movies={popular} type="movie" />
  <MovieCarousel title="🏆 Filmes melhores avaliados" movies={topRated} type="movie" />
  <MovieCarousel title="🎥 Nos cinemas" movies={nowPlaying} type="movie" />

  {/* Divisão de filmes por gênero */}
  {genres.map((genre) => {
    const moviesInGenre = moviesByGenre[genre.name];
    return (
      moviesInGenre && (
        <div key={genre.id}>
          <MovieCarousel title={genre.name} movies={moviesInGenre} type="movie" />
        </div>
      )
    );
  })}
</div>

  );
}
