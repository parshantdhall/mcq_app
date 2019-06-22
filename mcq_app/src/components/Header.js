import React from 'react';
import '../stylesheets/_Header.scss';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <h3>SecArmy Quiz</h3>
        </div>
        <ul className="nav__menu">
          <li className="nav__menu__item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__menu__item">
            <Link to="/admin">AdminPortal</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
