import React, { useEffect } from 'react';
//import { movies } from '../data/Movies';
import { IMG_BASE } from '../services/api';
import Detail from '../components/DetailMovie';
import { useNavigate } from 'react-router-dom';


const MovieModal = ({ movie, onClose }) => {

  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/gallery');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (movie) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
      };
 }, [movie]);


 if (!movie) return null;

 return (
   <div className="picture-view">
     <button className="close-btn" onClick={handleClose}>✕</button>
     
      <div>

      </div>
       <div className="picture-main">
         
      <img
          className="picture-large"
          // src={movie.imageUrl}
        src={movie.poster_path ? IMG_BASE + movie.poster_path : "/default.jpg"}

          alt={movie.title}
          style={{ cursor: "pointer" }}
  onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, "_blank", "noopener,noreferrer")}
        />
         </div>
      
         
           <div className="picture-info">
             <h2>{movie.name}</h2>
             <Detail style="card-description" movie={movie.overview}/>
           </div>    
     </div>
 );
};

export default MovieModal;