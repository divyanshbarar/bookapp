import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchBookDetails, saveBookNote } from '../api/bookApi';

const BookDetail = ({ bookId }) => {
  const [note, setNote] = useState('');
  const detailsRef = useRef(null);
  
  // Use React Query to fetch book details
  const { 
    data: book, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => fetchBookDetails(bookId)
  });

  // Use React Query mutation for saving notes
  const saveNoteMutation = useMutation({
    mutationFn: ({ bookId, note }) => saveBookNote(bookId, note),
    onSuccess: () => {
      setNote('');
      alert('Note saved successfully!');
    },
    onError: (error) => {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
    }
  });

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (note.trim()) {
      saveNoteMutation.mutate({ bookId, note });
    }
  };

  // Scroll to top when book changes
  React.useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.scrollTop = 0;
    }
  }, [bookId]);

  if (isLoading) return <div>Loading book details...</div>;
  if (error) return <div>Error loading book: {error.message}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="book-detail" ref={detailsRef}>
      <h1>{book.title}</h1>
      
      {book.description ? (
        <div className="description">
          <h2>Description</h2>
          <p>
            {typeof book.description === 'string' 
              ? book.description 
              : book.description?.value || 'No description available'}
          </p>
        </div>
      ) : null}
      
      <div className="metadata">
        <h2>Details</h2>
        <ul>
          <li><strong>Created:</strong> {new Date(book.created?.value || book.created).toLocaleDateString()}</li>
          <li><strong>Last Updated:</strong> {new Date(book.last_modified?.value || book.last_modified).toLocaleDateString()}</li>
          {book.subjects && (
            <li>
              <strong>Subjects:</strong> {book.subjects.slice(0, 10).join(', ')}
              {book.subjects.length > 10 ? '...' : ''}
            </li>
          )}
        </ul>
      </div>
      
      <div className="note-section">
        <h2>Add Personal Note</h2>
        <form onSubmit={handleSaveNote}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your notes about this book..."
            rows={4}
          />
          <button 
            type="submit" 
            disabled={!note.trim() || saveNoteMutation.isPending}
          >
            {saveNoteMutation.isPending ? 'Saving...' : 'Save Note'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookDetail;