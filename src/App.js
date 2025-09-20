import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import PictureModal from './components/MovieModal';
import { pictures } from './data/Movies';
import './styles/App.css';

const App = () => {
  const [filteredPictures, setFilteredPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);


  useEffect(() => {
  setFilteredPictures(pictures);
}, []);


  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase().trim();
    if (term === '') {
      setFilteredPictures(pictures);
    } else {
      const filtered = pictures.filter(picture => 
        picture.name.toLowerCase().includes(term) || 
        picture.artist.toLowerCase().includes(term)
      );
      setFilteredPictures(filtered);
    }
  };

  const handlePictureClick = (picture) => {
    setSelectedPicture(picture);
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
            pictures={filteredPictures} 
            onPictureClick={handlePictureClick}
          />
      
      </div>

      <PictureModal 
        picture={selectedPicture} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;