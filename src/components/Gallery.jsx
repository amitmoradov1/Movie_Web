import React from 'react';
import PictureCard from './MovieCard';

const Gallery = ({ pictures, onPictureClick }) => {
  if (pictures.length === 0) {
    return (
      <div className="no-results">
        לא נמצאו תוצאות התואמות לחיפוש שלך
      </div>
    );
  }

  return (
    <div className="gallery">
      {pictures.map(picture => (
        <PictureCard 
          key={picture.id} 
          picture={picture} 
          onClick={onPictureClick}
        />
      ))}
    </div>
  );
};

export default Gallery;