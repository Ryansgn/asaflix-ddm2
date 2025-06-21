import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/series.css';

export default function SeriesDetails() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [recs, setRecs] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [showEpisodes, setShowEpisodes] = useState(false);

  // Estado da avaliação do usuário
  const [userRating, setUserRating] = useState(() => {
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
    return storedRatings[`serie-${id}`] || 0;
  });

  // Função de avaliação
  const handleRating = (rating) => {
    setUserRating(rating);
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
    storedRatings[`serie-${id}`] = rating;
    localStorage.setItem('ratings', JSON.stringify(storedRatings));
  };

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      params: {
        api_key: '52469f4d00d508a136cd4c996823d0de',
        language: 'pt-BR'
      }
    }).then(res => setSerie(res.data));

    axios.get(`https://api.themoviedb.org/3/tv/${id}/credits`, {
      params: {
        api_key: '52469f4d00d508a136cd4c996823d0de',
        language: 'pt-BR'
      }
    }).then(res => setCredits(res.data));

    axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations`, {
      params: { api_key: '52469f4d00d508a136cd4c996823d0de' }
    }).then(res => setRecs(res.data.results));

    axios.get(`https://api.themoviedb.org/3/tv/${id}/videos`, {
      params: { api_key: '52469f4d00d508a136cd4c996823d0de' }
    }).then(res => {
      const officialTrailer = res.data.results.find(
        v => v.type === 'Trailer' && v.site === 'YouTube'
      );
      if (officialTrailer) setTrailer(officialTrailer.key);
    });

    axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers`, {
      params: { api_key: '52469f4d00d508a136cd4c996823d0de' }
    }).then(res => {
      setWatchProviders(res.data.results);
    });
  }, [id]);

  useEffect(() => {
    if (serie) {
      axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`, {
        params: {
          api_key: '52469f4d00d508a136cd4c996823d0de',
          language: 'pt-BR'
        }
      }).then(res => setSeasonEpisodes(res.data.episodes));
    }
  }, [id, seasonNumber, serie]);

  if (!serie || !credits) return <div className="series-container">Carregando...</div>;

  const cast = credits.cast.slice(0, 5);

  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorited = favorites.some(fav => fav.id === serie.id && fav.type === 'serie');
    if (isAlreadyFavorited) return alert('Série já está nos favoritos!');

    const serieToSave = {
      id: serie.id,
      name: serie.name,
      overview: serie.overview,
      poster_path: serie.poster_path,
      type: 'serie'
    };

    const updatedFavorites = [...favorites, serieToSave];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert('Série adicionada aos favoritos!');
  };

  return (
    <div className="series-container">
      <div className="series-header">
        <h1 className="series-title">{serie.name}</h1>
        <button onClick={handleFavorite} className="favorite-button">
          <img
            src={require('../img/favorites.png')}
            alt="Adicionar aos favoritos"
            className="favorite-icon"
          />
        </button>
      </div>

      <div className="series-details">
        <div className="series-overview">
          <p>{serie.overview}</p>
        </div>

        <div className="series-info">
          <div className="series-info-item">
            Lançamento:<br /><br />
            <strong>{serie.first_air_date}</strong>
          </div>
          <div className="series-info-item">
            Avaliação:<br /><br />
            <strong>⭐ {serie.vote_average.toFixed(2)}</strong>
          </div>
          <div className="series-info-item">
            Episódios:<br /><br />
            <strong>{serie.number_of_episodes || 'N/A'}</strong>
          </div>
        </div>
      </div>

      {/* Avaliação do usuário com estrelas */}
      <div className="rating-section">
        <h3>Sua Avaliação:</h3>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => {
            const full = star <= userRating;
            const half = userRating >= star - 0.5 && userRating < star;

            return (
              <span
                key={star}
                onClick={() => handleRating(half ? star - 0.5 : star)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleRating(star - 0.5);
                }}
                style={{
                  cursor: 'pointer',
                  fontSize: '2rem',
                  color: full || half ? '#f5c518' : '#ccc',
                  marginRight: '5px',
                  userSelect: 'none'
                }}
                title={`${half ? star - 0.5 : star} estrelas (clique direito para meia estrela)`}
              >
                {full ? '★' : half ? '⯪' : '☆'}
              </span>
            );
          })}
        </div>
      </div>

      {/* Temporadas e episódios */}
      <div className="season-selector-toggle">
        <button onClick={() => setShowEpisodes(!showEpisodes)} className="toggle-button">
          {showEpisodes ? 'Esconder Temporadas' : 'Temporadas'}
        </button>

        {showEpisodes && (
          <>
            <select
              className="season-dropdown"
              value={seasonNumber}
              onChange={(e) => setSeasonNumber(parseInt(e.target.value))}
            >
              {Array.from({ length: serie.number_of_seasons }, (_, index) => (
                <option key={index} value={index + 1}>
                  Temporada {index + 1}
                </option>
              ))}
            </select>

            <div className="season-episodes">
              <h3>Episódios da Temporada {seasonNumber}:</h3>
              <div className="episode-list">
                {seasonEpisodes.map(episode => (
                  <div key={episode.id} className="episode-card">
                    {episode.still_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                        alt={episode.name}
                        className="episode-image"
                      />
                    )}
                    <div className="episode-info">
                      <h4>{episode.name}</h4>
                      <p>{episode.overview}</p>
                      <p><strong>Duração:</strong> {episode.runtime} minutos</p>
                      <p><strong>Avaliação:</strong> ⭐ {episode.vote_average.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {trailer && (
        <div className="series-trailer-section">
          {serie.poster_path && (
            <div className="poster-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
                className="poster-image"
              />
            </div>
          )}

          <div className="trailer-container">
            <div className="trailer-iframe-wrapper">
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

      <h3>Elenco principal:</h3>
      <div className="horizontal-scroll">
        {cast.map(actor => (
          <div key={actor.id} className="actor-card">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : 'https://via.placeholder.com/120x180?text=Sem+Foto'
              }
              alt={actor.name}
              className="actor-image"
            />
            <p className="actor-name">
              <strong>{actor.name}</strong><br />
              <span className="actor-character">{actor.character}</span>
            </p>
          </div>
        ))}
      </div>

      <h3>Recomendações:</h3>
      <div className="horizontal-scroll">
        {recs.slice(0, 5).map(rec => (
          <div key={rec.id} className="rec-card">
            <img
              src={
                rec.poster_path
                  ? `https://image.tmdb.org/t/p/w185${rec.poster_path}`
                  : 'https://via.placeholder.com/150x225?text=Sem+Imagem'
              }
              alt={rec.name}
              className="rec-image"
            />
            <p className="rec-title">{rec.name}</p>
          </div>
        ))}
      </div>

      {watchProviders && watchProviders.BR && (
        <div className="providers-section">
          <h3>Onde assistir no Brasil:</h3>
          {['flatrate', 'rent', 'buy'].map(type => (
            watchProviders.BR[type] && (
              <div key={type}>
                <h4>
                  {type === 'flatrate' ? 'Streaming' : type === 'rent' ? 'Aluguel' : 'Compra'}:
                </h4>
                <div className="providers-group">
                  {watchProviders.BR[type].map(provider => (
                    <img
                      key={provider.provider_id}
                      src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="provider-logo"
                    />
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
