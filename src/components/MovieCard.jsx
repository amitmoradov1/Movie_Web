import React from 'react';
import Detail from './DetailMovie';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="picture-card" onClick={() => onClick(movie)}>
       <img className="picture-large" src={movie.imageUrl} alt={movie.name}  />  
      <div className="card-content">
        <Detail style="card-title" movie={movie.title}/>
        {/* <div className="card-title">{picture.name}</div> */}
          <Detail style="card-artist" movie={movie.genre}/>
        {/* <div className="card-artist">{picture.artist}</div> */}
          <Detail style="card-description" movie={movie.description}/>
        {/* <div className="card-description">{picture.description}</div> */}
         <a href={movie.movieUrl} target="_blank" rel="noopener noreferrer">
        לצפייה בסרט
      </a>
      </div>
    </div>
  );
};

export default MovieCard;