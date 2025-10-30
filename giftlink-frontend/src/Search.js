import React, { useState } from 'react';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('Older');
  const [category, setCategory] = useState('Living Room');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Simulate search results
    const searchResults = [
      {
        id: 1,
        name: "Vintage Coffee Table",
        category: "Living Room",
        description: "Beautiful vintage coffee table from the 1960s",
        age: "Older"
      },
      {
        id: 3, 
        name: "Antique Lamp",
        category: "Living Room",
        description: "Classic antique lamp with brass finish",
        age: "Older"
      }
    ];
    setResults(searchResults);
  };

  return (
    <div className="search-container">
      <h2>Search Gifts</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-fields">
          <div className="form-group">
            <label>Search Term</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term"
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Living Room">Living Room</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Garden">Garden</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="search-btn">Search Gifts</button>
      </form>

      {results.length > 0 && (
        <div className="search-results">
          <h3>Search Results for "{searchTerm}" in {category}</h3>
          <div className="results-grid">
            {results.map(gift => (
              <div key={gift.id} className="result-card">
                <h4>{gift.name}</h4>
                <p><strong>Category:</strong> {gift.category}</p>
                <p><strong>Age:</strong> {gift.age}</p>
                <p>{gift.description}</p>
                <button 
                  onClick={() => window.location.href = `/gifts/${gift.id}`}
                  className="view-btn"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
