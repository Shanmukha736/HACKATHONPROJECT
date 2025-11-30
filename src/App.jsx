import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Ideas from './pages/Ideas'
import SubmitProperty from './pages/SubmitProperty'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function ScrollControl() {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  useEffect(() => {
    window.history.pushState(null, null, window.location.href)
    window.onpopstate = () => {
      if (!isLoggedIn) navigate('/login')
      else if (location.pathname === '/login' || location.pathname === '/register') {
        const role = localStorage.getItem('role')
        navigate(role === 'admin' ? '/admin' : '/home')
      }
    }

    window.onbeforeunload = () => {
      if (!isLoggedIn) localStorage.removeItem('preventForward')
      else localStorage.setItem('preventForward', 'true')
    }

    if (!isLoggedIn && localStorage.getItem('preventForward') === 'true') {
      navigate('/login')
    }
  }, [isLoggedIn, location, navigate])

  return null
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true')
  const [role, setRole] = useState(localStorage.getItem('role'))

  // Re-render when login/logout occurs
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
      setRole(localStorage.getItem('role'))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <Router>
      <ScrollControl />
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User routes */}
            <Route
              path="/home"
              element={
                isLoggedIn && role === 'user' ? (
                  <Home />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/ideas"
              element={
                isLoggedIn && role === 'user' ? (
                  <Ideas />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/submit"
              element={
                isLoggedIn && role === 'user' ? (
                  <SubmitProperty />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Admin route */}
            <Route
              path="/admin"
              element={
                isLoggedIn && role === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  )
}

export default App
