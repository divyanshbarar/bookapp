
* This file provides a step-by-step summary of all the React concepts demonstrated in this app:

* 1. React Query - Used for data fetching, caching and state management
*    See: BookList.jsx and BookDetail.jsx

* 2. Axios - HTTP client for making API requests
    See: bookApi.js - searchBooks() function

* 3. Fetch - Native browser API for making HTTP requests
     See: bookApi.js - fetchBookDetails() function

* 4. Lazy Loading
    - Component lazy loading: App.jsx - React.lazy() for all page components
    - Image lazy loading: BookList.jsx - loading="lazy" attribute on images

* 5. React Router - For navigation between pages
    See: App.jsx - Router, Routes, and Route components

* 6. Debouncing - Prevent excessive function calls
    See: useDebounce.js and SearchBar.jsx

* 7. Throttling - Limit function calls frequency
    See: useThrottle.js and SearchBar.jsx (for analytics logging)

* 8. useMemo - For performance optimization
    See: BookList.jsx - sorting book list without re-computing on every render

* 9. useRef - For DOM references and persistent values
    See: BookList.jsx and BookDetail.jsx - for scroll position management

* 10. Promises - For handling asynchronous operations
     See: bookApi.js - all API functions use Promises

  To run this application:
  1. Install dependencies: npm install
  2. Start dev server: npm start
  3. Open browser at: http://localhost:3000
