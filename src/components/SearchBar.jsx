import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { useThrottledFn } from '../hooks/useThrottle';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Using debounce to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  // Using throttle for logging search analytics
  const logSearch = useThrottledFn((term) => {
    console.log(`Search logged: ${term} at ${new Date().toLocaleTimeString()}`);
    // In a real app, this might send analytics data to a server
  }, 2000);
  
  // Effect to trigger search when debounced value changes
  React.useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
      logSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch, logSearch]);
  
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button 
          className="clear-button"
          onClick={() => setSearchTerm('')}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;