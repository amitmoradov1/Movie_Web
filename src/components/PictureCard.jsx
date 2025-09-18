import React from 'react';

const PictureCard = ({ picture, onClick }) => {
  return (
    <div className="picture-card" onClick={() => onClick(picture)}>
       <img className="picture-large" src={picture.imageUrl} alt={picture.name}  />  
      <div className="card-content">
        <div className="card-title">{picture.name}</div>
        <div className="card-artist">{picture.artist}</div>
        <div className="card-description">{picture.description}</div>
         <a href={picture.movieUrl} target="_blank" rel="noopener noreferrer">
        לצפייה בסרט
      </a>
      </div>
    </div>
  );
};

export default PictureCard;