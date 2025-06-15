import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';



export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar por filme, série..."
        style={{
          padding: '0.8rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '210px',
        }}
      />
      <button type="submit" style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#560056',
         color: '#ffffff', 
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Buscar
      </button>
    </form>
  );
}
