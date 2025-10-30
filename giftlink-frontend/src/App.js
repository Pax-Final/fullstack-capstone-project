import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Login from './Login';
import GiftList from './GiftList';
import GiftDetail from './GiftDetail';
import Search from './Search';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3060';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  // Tester la connexion au backend
  React.useEffect(() => {
    fetch(`${BACKEND_URL}/api/auth/test`)
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => setMessage('Error connecting to backend'));
  }, []);

  const handleLogin = () => {
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <h2>GiftLink</h2>
            </Link>
            <div className="nav-menu">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/app" className="nav-link">Gifts</Link>
              <Link to="/search" className="nav-link">Search</Link>
              {user ? (
                <>
                  <span className="user-welcome">Welcome, {user.name}</span>
                  <button onClick={handleLogout} className="nav-button">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="nav-button">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="App-header">
              <h1>Welcome to GiftLink</h1>
              <p>Your ultimate gift exchange platform</p>
              
              <div className="backend-status">
                <h3>Backend Status:</h3>
                <p>{message}</p>
              </div>

              <div className="features">
                <div className="feature">
                  <h4>🎁 Create Gift Exchanges</h4>
                  <p>Organize gift exchanges with friends and family</p>
                </div>
                <div className="feature">
                  <h4>📝 Wishlist Management</h4>
                  <p>Share your wishlist and discover preferences</p>
                </div>
                <div className="feature">
                  <h4>🎅 Secret Santa Made Easy</h4>
                  <p>Automated matching and anonymous gifting</p>
                </div>
              </div>

              <div className="actions">
                <Link to="/app" className="cta-button">Get Started</Link>
                <Link to="/search" className="secondary-button">Search Gifts</Link>
              </div>
            </div>
          } />
          <Route path="/app" element={<GiftList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gifts/:id" element={<GiftDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
