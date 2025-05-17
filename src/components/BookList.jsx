import React, { useState, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { searchBooks, getBookCoverUrl } from '../api/bookApi';

const BookList = ({ searchTerm }) => {
  const [sortOrder, setSortOrder] = useState('title');
  const listRef = useRef(null);
  
  // Using React Query for data fetching with automatic caching
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books', searchTerm],
    queryFn: () => searchBooks(searchTerm),
    enabled: !!searchTerm, // Only run query if searchTerm exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  // Using useMemo to avoid expensive sorting on every render
  const sortedBooks = useMemo(() => {
    if (!books) return [];
    
    return [...books].sort((a, b) => {
      if (sortOrder === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortOrder === 'year') {
        return (a.first_publish_year || 0) - (b.first_publish_year || 0);
      }
      return 0;
    });
  }, [books, sortOrder]);

  // Scroll list to top when search term changes
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [searchTerm]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!books || books.length === 0) return <div>No books found. Try a different search term.</div>;

  return (
    <div className="book-list-container">
      <div className="sort-controls">
        <label>
          Sort by:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="title">Title</option>
            <option value="year">Publication Year</option>
          </select>
        </label>
      </div>
      
      <div className="book-count">
        Found {sortedBooks.length} books
      </div>
      
      <div className="book-list" ref={listRef}>
        {sortedBooks.map(book => (
          <Link to={`/book/${book.key.split('/').pop()}`} key={book.key} className="book-item">
            <div className="book-cover">
              {book.cover_i ? (
                <img 
                  src={getBookCoverUrl(book.cover_i)} 
                  alt={`Cover of ${book.title}`} 
                  loading="lazy" // Native lazy loading for images
                />
              ) : (
                <div className="no-cover">No Cover</div>
              )}
            </div>
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author_name ? book.author_name.join(', ') : 'Unknown author'}</p>
              <p className="book-year">
                {book.first_publish_year ? `First published: ${book.first_publish_year}` : ''}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;