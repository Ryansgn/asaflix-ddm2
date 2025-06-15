import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getRecommendations } from '../services/tmdb';
import axios from 'axios';
import '../styles/movies.css';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [recs, setRecs] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then(res => setMovie(res.data));
    getMovieCredits(id).then(res => setCredits(res.data));
    getRecommendations(id).then(res => setRecs(res.data.results));

    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
      params: { api_key: '52469f4d00d508a136cd4c996823d0de' }
    }).then(res => {
      const officialTrailer = res.data.results.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (officialTrailer) setTrailer(officialTrailer.key);
    });

    axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
      params: { api_key: '52469f4d00d508a136cd4c996823d0de' }
    }).then(res => {
      setWatchProviders(res.data.results);
    });
  }, [id]);

  const addToFavorites = () => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    const exists = stored.find(item => item.id === movie.id && item.type === 'movie');
    if (!exists) {
      const movieToSave = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        type: 'movie'
      };
      stored.push(movieToSave);
      localStorage.setItem('favorites', JSON.stringify(stored));
      alert('Filme adicionado aos favoritos!');
    } else {
      alert('Filme já está nos favoritos.');
    }
  };

  if (!movie || !credits) return <div className="loading-message">Carregando...</div>;

  const cast = credits.cast.slice(0, 5);

  return (
    <div className="movie-details-container">
      <div className="title-section">
        <h1 className="movie-title">{movie.title}</h1>
        <button onClick={addToFavorites} className="favorite-button">
          <img src={require('../img/favorites.png')} alt="Adicionar aos favoritos" className="favorite-image" />
        </button>
      </div>

      <div className="description-section">
        <div className="description-text">
          <p>{movie.overview}</p>
        </div>
        <div className="release-rating">
          <div className="center-text">
            Lançamento:<br /><br /><strong>{movie.release_date}</strong>
          </div>
          <div className="center-text">
            Avaliação:<br /><br /><strong>⭐ {movie.vote_average.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {trailer && (
        <div className="trailer-poster-section">
          {movie.poster_path && (
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="poster-image" />
          )}
          <div className="trailer-video-wrapper">
            <div className="trailer-video">
              <iframe
                src={`https://www.youtube.com/embed/${trailer}`}
                title="Trailer"
                className="trailer-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <h3>Elenco:</h3>
      <div className="cast-list">
        {cast.map(actor => (
          <div key={actor.id} className="cast-card">
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/120x180?text=Sem+Foto'}
              alt={actor.name}
            />
            <p>
              <strong>{actor.name}</strong><br />
              <span>{actor.character}</span>
            </p>
          </div>
        ))}
      </div>

      <h3>Recomendações:</h3>
      <div className="recommendation-list">
        {recs.slice(0, 5).map(rec => (
          <div key={rec.id} className="recommendation-card">
            <img
              src={rec.poster_path ? `https://image.tmdb.org/t/p/w185${rec.poster_path}` : 'https://via.placeholder.com/150x225?text=Sem+Imagem'}
              alt={rec.title}
            />
            <p>{rec.title}</p>
          </div>
        ))}
      </div>

      {watchProviders?.BR && (
        <div>
          <h3>Onde assistir no Brasil:</h3>
          {watchProviders.BR.flatrate && (
            <>
              <h4>Streaming:</h4>
              <div className="streaming-list">
                {watchProviders.BR.flatrate.map(provider => (
                  <img key={provider.provider_id} src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} className="streaming-logo" />
                ))}
              </div>
            </>
          )}

          {watchProviders.BR.rent && (
            <>
              <h4>Aluguel:</h4>
              <div className="rent-list">
                {watchProviders.BR.rent.map(provider => (
                  <img key={provider.provider_id} src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} className="rent-logo" />
                ))}
              </div>
            </>
          )}

          {watchProviders.BR.buy && (
            <>
              <h4>Compra:</h4>
              <div className="buy-list">
                {watchProviders.BR.buy.map(provider => (
                  <img key={provider.provider_id} src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} className="buy-logo" />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
