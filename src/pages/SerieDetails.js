import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/series.css'; // importa o CSS externo

export default function SeriesDetails() {
  const { id } = useParams();
  const [serie, setSerie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [recs, setRecs] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);

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
        </div>
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
