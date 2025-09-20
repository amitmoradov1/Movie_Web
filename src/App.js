import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import MovieModal from './components/MovieModal';
import { movies } from './data/Movies';
import './styles/App.css';

const App = () => {
  const [filteredPictures, setFilteredPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);


  useEffect(() => {
  setFilteredPictures(movies);
}, []);


  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase().trim();
    if (term === '') {
      setFilteredPictures(movies);
    } else {
      const filtered = movies.filter(movies => 
        movies.title.toLowerCase().includes(term) || 
        movies.genre.toLowerCase().includes(term)
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
          <h1> גלריית סרטים מתקדמת</h1>
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