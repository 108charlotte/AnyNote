import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Home Logo Button */}
          <Link
            to="/"
            className="navbar-logo"
            onClick={closeMobileMenu}
          >
            <div className="logo-media-wrapper">
              <img
                src="/notes.jpg"
                className="navbar-poster"
                alt="Logo"
              />
              <span className="logo-text">AnyNote</span>
            </div>
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/notes" className="nav-links" onClick={closeMobileMenu}>
                Cards
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
