import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if (!storedUser) {
      setError('No user found. Please register first.')
    } else if (storedUser.email === email && storedUser.password === password) {
      localStorage.setItem('loggedIn', true)
      navigate('/')
    } else {
      setError('Invalid credentials. Try again.')
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>Don’t have an account? <span onClick={() => navigate('/register')}>Register</span></p>
      </form>
    </div>
  )
}

export default Login
