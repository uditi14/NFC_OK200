/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import {Link}  from "react-router-dom";
import "../Navbar/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-logo-container">
        <h1 className="nav-title">PoolVerse</h1>
      </div>
      <div className="navbar-links-container">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/user">Book</Link>
        <Link to="/list">List</Link>
        <Link to="/register" className="primary-button">Sign up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
