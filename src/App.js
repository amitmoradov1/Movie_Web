import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import PictureModal from './components/PictureModal';
import { pictures } from './data/pictures';
import './styles/App.css';
import { apiService } from './services/api';

const App = () => {
   const [allPictures, setAllPictures] = useState([]);
  const [filteredPictures, setFilteredPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    const loadPictures = async () => {
      try {
        setLoading(true);
        const response = await apiService.fetchPictures();
        setAllPictures(response.data);
        setFilteredPictures(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setAllPictures(require('./data/pictures').pictures);
        setFilteredPictures(require('./data/pictures').pictures);
      } finally {
        setLoading(false);
      }
    };

    loadPictures();
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
          <h1> גלריית סרטים</h1>
          <SearchBar onSearch={handleSearch} />
        </header>

        <main>
          <Gallery 
            pictures={filteredPictures} 
            onPictureClick={handlePictureClick}
          />
        </main>
      </div>

      <PictureModal 
        picture={selectedPicture} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;