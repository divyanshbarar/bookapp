import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Discover Your Next Favorite Book</h1>
        <p>Search millions of books from the Open Library database</p>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {searchTerm && (
        <div className="results-section">
          <BookList searchTerm={searchTerm} />
        </div>
      )}
      
      {!searchTerm && (
        <div className="suggestions">
          <h2>Try searching for:</h2>
          <div className="suggestion-buttons">
            <button onClick={() => handleSearch('fantasy')}>Fantasy</button>
            <button onClick={() => handleSearch('science fiction')}>Science Fiction</button>
            <button onClick={() => handleSearch('mystery')}>Mystery</button>
            <button onClick={() => handleSearch('biography')}>Biography</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;