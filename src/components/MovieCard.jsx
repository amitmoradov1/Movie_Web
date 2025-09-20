import React from 'react';
import Detail from './DetailMovie';
import { IMG_BASE } from '../services/api';


const MovieCard = ({ movie, onClick }) => {
  return (
    <div className="picture-card" onClick={() => onClick(movie)}>
       {/* <img className="picture-large" src={movie.imageUrl} alt={movie.name}  />   */}
        <img
      className="picture-large"
      src={movie.poster_path ? IMG_BASE + movie.poster_path : "/default.jpg"}
      alt={movie.title}
    />
      <div className="card-content">
        <Detail style="card-title" movie={movie.title}/>
        {/* <div className="card-title">{picture.name}</div> */}
          <Detail style="card-artist" movie={movie.genre}/>
        {/* <div className="card-artist">{picture.artist}</div> */}
          <Detail style="card-description" movie={movie.overview}/>
        {/* <div className="card-description">{picture.description}</div> */}
         <a href={movie.movieUrl} target="_blank" rel="noopener noreferrer">
        לצפייה בסרט
      </a>
      </div>
    </div>
  );
};

export default MovieCard;