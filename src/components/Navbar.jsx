import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="brand">🏠 ValueAdd Homes</h1>
      </div>
      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/ideas" className="nav-link">Ideas</Link>
        <Link to="/submit" className="nav-link">Submit</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar
