import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     handleSearch();
  //   }
  // };

  return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-box" 
        placeholder="חפש סרט לפי שם או אומן..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <button className="search-btn" onClick={handleSearch}>
        חיפוש
      </button>
    </div>
  );
};

export default SearchBar;