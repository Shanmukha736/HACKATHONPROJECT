import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [userInput, setUserInput] = useState('')
  const navigate = useNavigate()

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let text = ''
    for (let i = 0; i < 6; i++) text += chars.charAt(Math.floor(Math.random() * chars.length))
    setCaptcha(text)
  }

  useEffect(() => {
    generateCaptcha()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    if (userInput.trim().toUpperCase() !== captcha.trim().toUpperCase()) {
      alert('❌ CAPTCHA incorrect. Please try again.')
      generateCaptcha()
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('role', data.role)
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('email', email)

        alert(`✅ Logged in as ${data.role}`)
        navigate(data.role === 'admin' ? '/admin' : '/home')
      } else {
        alert(`❌ ${data.message}`)
      }
    } catch (err) {
      alert('⚠️ Unable to connect to server')
    }
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

        <div className="captcha-box">
          <div className="captcha-display">{captcha}</div>
          <button type="button" onClick={generateCaptcha} className="reload-btn">↻</button>
        </div>
        <input
          type="text"
          placeholder="Enter CAPTCHA"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          required
        />

        <button className="auth-button" type="submit">Login</button>

        <p className="auth-switch">
          Don’t have an account? <span onClick={() => navigate('/register')}>Register</span>
        </p>
      </form>
    </div>
  )
}

export default Login
