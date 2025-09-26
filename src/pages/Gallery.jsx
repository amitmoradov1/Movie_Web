import React from 'react';
import MovieCard from '../components/MovieCard';

const Gallery = ({ movie, onPictureClick }) => {
  if (movie.length === 0) {
    return (
      <div className="no-results">
        לא נמצאו תוצאות התואמות לחיפוש שלך
      </div>
    );
  }

  return (
    <div className="gallery">
      {movie.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onClick={onPictureClick}
        />
      ))}
    </div>
  );
};

export default Gallery;