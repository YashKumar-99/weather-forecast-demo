import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(inputValue);
      setInputValue(''); 
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <span
        className="search-icon"
        onClick={() => {
          onSearch(inputValue);
          setInputValue(''); 
        }}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if (e.key === 'Enter') onSearch(inputValue); }}
      >
        &#128269; 
      </span>
    </div>
  );
};

export default SearchBar;
