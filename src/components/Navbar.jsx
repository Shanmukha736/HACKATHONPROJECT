import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const role = localStorage.getItem('role')

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false) // scroll down → hide
      } else {
        setVisible(true) // scroll up → show
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav className={`navbar ${visible ? 'show' : 'hide'}`}>
      <div className="navbar-container">
        <div className="nav-left">
          <h1 className="brand">🏠 ValueAdd Homes</h1>
        </div>
        <div className="nav-right">
          {!isLoggedIn && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {isLoggedIn && role === 'user' && (
            <>
              <Link to="/home">Home</Link>
              <Link to="/ideas">Ideas</Link>
              <Link to="/submit">Submit</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}

          {isLoggedIn && role === 'admin' && (
            <>
              <Link to="/admin">Admin</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
