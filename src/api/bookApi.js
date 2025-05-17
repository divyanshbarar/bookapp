import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'https://openlibrary.org',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Books API using axios
export const searchBooks = async (query) => {
  const response = await api.get(`/search.json?q=${encodeURIComponent(query)}`);
  return response.data.docs;
};

// Example of a POST request
export const saveBookNote = async (bookId, note) => {
  // This would typically go to your backend
  // For demo purposes, we'll just simulate a successful response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, bookId, note });
    }, 500);
  });
};

// Books API using fetch (alternative to axios)
export const fetchBookDetails = async (bookId) => {
  const response = await fetch(`https://openlibrary.org/works/${bookId}.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch book details');
  }
  return response.json();
};

// Get book cover image
export const getBookCoverUrl = (coverId, size = 'M') => {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

export default api;