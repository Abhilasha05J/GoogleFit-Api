// src/components/Header.js

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="landing-header">
      
      <nav className="navigation">
      <h1 className="logo">HealthCare+</h1>
        <Link to="/signin" className="nav-link signin-btn">Sign In</Link>
        <Link to="/signup" className="nav-link signup-btn">Sign Up</Link> 
      </nav>
    </header>
  );
};

export default Header;
