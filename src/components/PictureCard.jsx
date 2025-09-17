import React from 'react';

const PictureCard = ({ picture, onClick }) => {
  return (
    <div className="picture-card" onClick={() => onClick(picture)}>
      <div className="picture-placeholder"></div>
      <div className="card-content">
        <div className="card-title">{picture.name}</div>
        <div className="card-artist">{picture.artist}</div>
        <div className="card-description">{picture.description}</div>
      </div>
    </div>
  );
};

export default PictureCard;