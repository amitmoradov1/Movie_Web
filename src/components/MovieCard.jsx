import React from 'react';
import Detail from './DetailMovie';

const PictureCard = ({ picture, onClick }) => {
  return (
    <div className="picture-card" onClick={() => onClick(picture)}>
       <img className="picture-large" src={picture.imageUrl} alt={picture.name}  />  
      <div className="card-content">
        <Detail style="card-title" picture={picture.name}/>
        {/* <div className="card-title">{picture.name}</div> */}
          <Detail style="card-artist" picture={picture.artist}/>
        {/* <div className="card-artist">{picture.artist}</div> */}
          <Detail style="card-description" picture={picture.description}/>
        {/* <div className="card-description">{picture.description}</div> */}
         <a href={picture.movieUrl} target="_blank" rel="noopener noreferrer">
        לצפייה בסרט
      </a>
      </div>
    </div>
  );
};

export default PictureCard;