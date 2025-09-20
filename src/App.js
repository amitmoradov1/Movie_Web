import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import MovieModal from './components/MovieModal';
import { movies } from './data/Movies';
import './styles/App.css';
import { fetchPopular } from './services/api';

const App = () => {
  const [filteredPictures, setFilteredPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

const [allMovies, setAllMovies] = useState([]);

useEffect(() => {
  async function loadMovies() {
    try {
      const data = await fetchPopular();
      setAllMovies(data.results); // שמור את כל הסרטים
      setFilteredPictures(data.results); // הצג אותם מיד
    } catch (err) {
      // אפשר להציג הודעת שגיאה
      console.error(err);
    }
  }
  loadMovies();
}, []);

//   useEffect(() => {
//   setFilteredPictures(movies);
// }, []);




  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase().trim();
    if (term === '') {
      //setFilteredPictures(movies);
      setFilteredPictures(allMovies); // הצג את כל הסרטים אם אין מונח חיפוש
    } else {
      const filtered = allMovies.filter(movies => 
        movies.title.toLowerCase().includes(term)
        // ||   movies.genre.toLowerCase().includes(term)
      );
      setFilteredPictures(filtered);
    }
  };

  const handlePictureClick = (movies) => {
    setSelectedPicture(movies);
  };

  const handleCloseModal = () => {
    setSelectedPicture(null);
  };

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1>גלריית סרטים</h1>
          <SearchBar onSearch={handleSearch} />
        </header>

       
          <Gallery 
          //filter the pictures based on search
            movie={filteredPictures} 
            onPictureClick={handlePictureClick}
          />
      
      </div>

      <MovieModal 
        movie={selectedPicture} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;