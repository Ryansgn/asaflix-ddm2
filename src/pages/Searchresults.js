import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies, searchSeries } from '../services/tmdb'; // IMPORTANTE

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      Promise.all([
        searchMovies(query),
        searchSeries(query), // ← Usando função correta
      ])
        .then(([movieRes, seriesRes]) => {
          const movieResults = movieRes.data.results.map(item => ({
            ...item,
            media_type: 'movie',
          }));
          const tvResults = seriesRes.data.results.map(item => ({
            ...item,
            media_type: 'tv',
          }));
          setResults([...movieResults, ...tvResults]);
        })
        .catch(error => {
          console.error('Erro ao buscar filmes e séries:', error);
        });
    }
  }, [query]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ color: '#fff' }}>
        Resultados para: <em>{query}</em>
      </h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'flex-start'
      }}>
        {results.map(result => (
          <div
            key={`${result.media_type}-${result.id}`}
            onClick={() => navigate(`/${result.media_type === 'tv' ? 'serie' : 'movie'}/${result.id}`)}
            style={{
              cursor: 'pointer',
              width: '150px',
              textAlign: 'center',
              color: '#fff',
            }}
          >
            <img
              src={
                result.poster_path
                  ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
                  : 'https://via.placeholder.com/150x225?text=Sem+Imagem'
              }
              alt={result.title || result.name}
              style={{
                width: '100%',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}
            />
            <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
              {result.title || result.name}
            </p>
          
          </div>
        ))}
      </div>
    </div>
  );
}
