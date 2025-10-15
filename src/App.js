import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Gallery from './pages/Gallery';
import MovieModel from './pages/MovieModel';
//import { movies } from './data/Movies';
import './styles/App.css';
import { fetchPopular,  fetchTopRatedMovies, fetchNowPlayingMovies} from './services/api';
import Loggin from './pages/Loggin';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Avater from './components/Avater';
import CastItem from './components/CastItem';
import HeaderButton from './components/HeaderButton';
//import Avater from './components/Avater';

const App = () => {
  const [filteredPictures, setFilteredPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  // states for login
  const [isShowingMovie, setIsShowingMovie] = useState(false);
  const [isShowingLogin, setIsShowingLogin] = useState(true);

  const navigate = useNavigate();

  const [allMovies, setAllMovies] = useState([]);

useEffect(() => {
  async function loadPopular() {
    try {
      const data = await fetchPopular();
      setAllMovies(data.results); // שמור את כל הסרטים
      setFilteredPictures(data.results); // הצג אותם מיד
    } catch (err) {
      // אפשר להציג הודעת שגיאה
      console.error(err);
    }
  }
  loadPopular();
}, []);


const loadPopular = async () => {
  try {
    const data = await fetchPopular();
    setAllMovies([]); 
    setFilteredPictures([]); 
    setAllMovies(data.results); 
    setFilteredPictures(data.results); 
  } catch (err) {
    // אפשר להציג הודעת שגיאה
    console.error(err);
  }
}
const loadtopMovie = async () => {
  try {
    const data = await fetchTopRatedMovies();
    setAllMovies([]); 
    setFilteredPictures([]); 
    setAllMovies(data.results); 
    setFilteredPictures(data.results); 
  } catch (err) {
    // אפשר להציג הודעת שגיאה
    console.error(err);
  }
}

const loadNowPlaying = async () => {
  try {
    const data = await fetchNowPlayingMovies();
    setAllMovies([]); 
    setFilteredPictures([]); 
    setAllMovies(data.results); 
    setFilteredPictures(data.results); 
  } catch (err) {
    // אפשר להציג הודעת שגיאה
    console.error(err);
  }
}

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
    navigate('/gallery/movieModel');

  };

  const handleCloseModal = () => {
    setSelectedPicture(null);

  };

  //for login
  const showing = {isShowingMovie, isShowingLogin, setIsShowingMovie, setIsShowingLogin};
  return (
    <Routes>
      <Route path="/" element={
    <div className="app">
      <div className="container">
        {isShowingLogin && <Loggin show={showing} /> }
    </div>
     </div>
   }/>

    <Route path="/signup" element={<div>
      <Signup />
    </div>} />

   <Route path="/gallery" element={
    
    <div className="app ">
      <header>
        {/* <Avater /> */}
      <div className="buttons-wrapper">
        <HeaderButton func={() => {loadtopMovie(1)}} name={"Top Movie"}/>
        <HeaderButton func={() => {loadPopular()}} name={"Popular"}/>
        <HeaderButton func={() => {loadNowPlaying()}} name={"New Movie"}/>
    </div>
        </header>
      <div className="container">
        {isShowingMovie &&
        <header>
          <h1>גלריית סרטים</h1>
          <SearchBar onSearch={handleSearch} />
        </header>}
       
          {isShowingMovie && <Gallery 
          //filter the pictures based on search
            movie={filteredPictures} 
            onPictureClick={handlePictureClick}
          />}
      </div>
      </div>}/>
   
   
      
      <Route path="/gallery/movieModel" element={ 
         <div className="app">
      <div className="container">
        <MovieModel
        movie={selectedPicture} 
        onClose={handleCloseModal}
      /> 
     </div>
  </div>
      }/>
      
      </Routes>

  );
};

export default App;