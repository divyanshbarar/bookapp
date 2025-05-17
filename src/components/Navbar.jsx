import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-logo">
          📚 Book Explorer
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a 
              href="https://openlibrary.org" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Open Library
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;