import React, { useEffect } from 'react';
import { movies } from '../data/Movies';


const MovieModal = ({ movie, onClose }) => {

  const handleClose = () => {
    onClose();
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
          src={movie.imageUrl}
          alt={movie.title}
          style={{ cursor: "pointer" }}
          onClick={() => window.open(movie.movieUrl, "_blank", "noopener,noreferrer")}
        />
         </div>
      
         
           <div className="picture-info">
             <h2>{movie.name}</h2>
           </div>    
     </div>
 );
};

export default MovieModal;