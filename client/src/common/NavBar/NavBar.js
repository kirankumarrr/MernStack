import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.scss';

const NavBar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <span className="link-text logo-text">FlyHigh</span>
      </Link>
    </nav>
  )
};

export default NavBar;
