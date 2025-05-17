import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetail from '../components/BookDetail';

const BookDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="book-details-page">
      <button 
        onClick={() => navigate(-1)}
        className="back-button"
      >
        ← Back to Search
      </button>
      
      <BookDetail bookId={id} />
    </div>
  );
};

export default BookDetailsPage;