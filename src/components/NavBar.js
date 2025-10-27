import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">GiftLink</Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/app/gifts">Gifts</Link>
          </li>

          {/* ✅ Nouveau lien Search */}
          <li className="nav-item">
            <Link className="nav-link" to="/app/search">Search</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;