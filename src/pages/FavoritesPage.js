import React, { useEffect, useState } from 'react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  
  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>⭐ Meus Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Nenhum favorito adicionado ainda.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {favorites.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '8px' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
                style={{ width: '100%', borderRadius: '4px' }}
              />
              <h2 style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{item.title || item.name}</h2>
              <p style={{ fontSize: '0.9rem', color: '#ccc' }}>
                {item.overview.length > 100 ? item.overview.slice(0, 100) + '...' : item.overview}
              </p>
              <span style={{ fontStyle: 'italic', color: '#aaa' }}>
                {item.type === 'movie' ? '🎬 Filme' : '📺 Série'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}