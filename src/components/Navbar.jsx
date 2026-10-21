import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    isActive ? 'nav-item nav-item-active' : 'nav-item';

  return (
    <nav className="navbar">
      <Link to="/" className="brand" onClick={closeMenu}>
        <span className="brand-sparkle">✧</span>
        Vibe<span className="brand-gold">Space</span>
        <span className="brand-sparkle">✦</span>
      </Link>

      <button
        type="button"
        className="nav-menu-toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
        <NavLink to="/" end className={linkClass} onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/halls" className={linkClass} onClick={closeMenu}>
          Explore Halls
        </NavLink>

        <NavLink to="/availability" className={linkClass} onClick={closeMenu}>
          Availability
        </NavLink>

        <NavLink to="/compare" className={linkClass} onClick={closeMenu}>
          Compare Halls
        </NavLink>

        <NavLink
          to="/recommendations"
          className={linkClass}
          onClick={closeMenu}
        >
          ✨ AI Recommendations
        </NavLink>

        <Link
          to="/#features"
          className="nav-item"
          onClick={closeMenu}
        >
          Our Features
        </Link>

        <button
          type="button"
          className="btn-primary nav-login-button"
          onClick={() => {
            closeMenu();
            alert('Login feature coming soon!');
          }}
        >
          Login <span>✧</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;