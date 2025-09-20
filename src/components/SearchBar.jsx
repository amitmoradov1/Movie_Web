import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

 
  return (
    <div className="search-container">
      <input 
        type="text" 
        className="search-box" 
        placeholder="חפש סרט לפי שם או ג'אנר..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <span className="search-btn" >
        🔍
      </span>
    </div>
  );
};

export default SearchBar;