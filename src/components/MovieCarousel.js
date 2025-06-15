import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

const MovieCarousel = ({ title, movies, type }) => {
  const navigate = useNavigate();

  return (
    <div className="movie-carousel">
      <h2>{title}</h2>

      <div className="movie-carousel-list">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title || movie.name}
            onClick={() => navigate(`/${type}/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
