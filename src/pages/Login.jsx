import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const found = users.find((u) => u.email === email && u.password === password)

    if (!found) {
      setMessage('❌ Invalid credentials.')
      return
    }

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('role', found.role)
    localStorage.setItem('email', found.email)

    alert(`✅ Logged in as ${found.role}`)
    if (found.role === 'admin') navigate('/admin')
    else navigate('/home')

    window.dispatchEvent(new Event('storage')) // trigger re-render in App.jsx
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Login</button>

        <p className="auth-switch">
          Don’t have an account? <span onClick={() => navigate('/register')}>Register</span>
        </p>
        <p>{message}</p>
      </form>
    </div>
  )
}

export default Login
