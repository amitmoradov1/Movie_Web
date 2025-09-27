import React, { useEffect, useState } from 'react';
//import { movies } from '../data/Movies';
import { IMG_BASE } from '../services/api';
import Detail from '../components/DetailMovie';
import { useNavigate } from 'react-router-dom';
import '../styles/MovieModel.css';
import CastItem from '../components/CastItem';
//import { IoMdThumbsUp } from "react-icons/io";
import CastList from '../components/CastList';
import MovieCard from '../components/MovieCard';
import { fetchPopular, fetchNowPlayingMovies, fetchUpcomingMovies } from '../services/api';
import Gallery from './Gallery';


const MovieModel = ({ movie, onClose }) => {


  const [filteredPictures, setFilteredPictures] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

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

    async function loadMovies() {
        try {
          const data = await fetchUpcomingMovies();
          if (filteredPictures.length < 5){
            setAllMovies(data.results); // שמור את כל הסרטים
            setFilteredPictures(data.results); // הצג אותם מיד
          }
        } catch (err) {
          // אפשר להציג הודעת שגיאה
          console.error(err);
        }
      }
      loadMovies();

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
  <div className="movie-modal">
    <button className="exit-button" onClick={handleClose}>✕</button>
    
    <div className="content-wrapper">
      <img
        className="poster-image"
        src={movie.poster_path ? IMG_BASE + movie.poster_path : "/default.jpg"}
        alt={movie.title}
        style={{ cursor: "pointer" }}
        onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, "_blank", "noopener,noreferrer")}
      />
      
      <div className="details-section">
        <h2>{movie.name}</h2>
        <Detail className="movie-description" movie={movie.overview}/>
        <div>
          <CastList movie={movie}></CastList>
        </div>
        <div>
          <h3 style={{ marginTop: '20px', marginBottom: '5px' }}>סרטים נוספים</h3>
          <Gallery movie={filteredPictures} onClick={() => {}} />
        </div>
      </div>
    </div>
  </div>
);
};

export default MovieModel;