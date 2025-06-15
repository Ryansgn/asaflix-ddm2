import axios from 'axios';

const API_KEY = '52469f4d00d508a136cd4c996823d0de';
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'pt-BR';

export const getAiringTodaySeries = () =>
  axios.get(`${BASE_URL}/tv/airing_today`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getTrendingSeries = () =>
  axios.get(`${BASE_URL}/trending/tv/day`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getPopularSeries = () =>
  axios.get(`${BASE_URL}/tv/popular`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getTopRatedSeries = () =>
  axios.get(`${BASE_URL}/tv/top_rated`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

// Se você quiser exibir detalhes de uma série individual:
export const getSeriesDetails = (id) =>
  axios.get(`${BASE_URL}/tv/${id}`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

// Créditos da série (elenco, equipe)
export const getSeriesCredits = (id) =>
  axios.get(`${BASE_URL}/tv/${id}/credits`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getMovieWatchProviders = (id) =>
  axios.get(`${BASE_URL}/movie/${id}/watch/providers`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });


// Recomendações baseadas na série
export const getSeriesRecommendations = (id) =>
  axios.get(`${BASE_URL}/tv/${id}/recommendations`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const searchSeries = (query) =>
  axios.get(`${BASE_URL}/search/tv`, {
    params: { api_key: API_KEY, language: LANGUAGE, query },
  });

// Filmes
export const getTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/day`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getPopularMovies = () =>
  axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getTopRatedMovies = () =>
  axios.get(`${BASE_URL}/movie/top_rated`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getNowPlayingMovies = () =>
  axios.get(`${BASE_URL}/movie/now_playing`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getGenres = () =>
  axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getMoviesByGenre = (genreId) =>
  axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: LANGUAGE,
      with_genres: genreId,
    },
  });

export const getMovieDetails = (id) =>
  axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getMovieCredits = (id) =>
  axios.get(`${BASE_URL}/movie/${id}/credits`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const getRecommendations = (id) =>
  axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
    params: { api_key: API_KEY, language: LANGUAGE },
  });

export const searchMovies = (query) =>
  axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, language: LANGUAGE, query },
  });
