import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [captcha, setCaptcha] = useState('')
  const [userInput, setUserInput] = useState('')
  const navigate = useNavigate()

  // Generate random captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let text = ''
    for (let i = 0; i < 6; i++) text += chars.charAt(Math.floor(Math.random() * chars.length))
    setCaptcha(text)
  }

  React.useEffect(() => {
    generateCaptcha()
  }, [])

  const handleRegister = async (e) => {
    e.preventDefault()

    if (userInput.trim().toUpperCase() !== captcha.trim().toUpperCase()) {
      alert('❌ CAPTCHA incorrect. Please try again.')
      generateCaptcha()
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })
      const data = await res.json()

      if (res.ok) {
        alert(`✅ Registered successfully as ${role}`)
        navigate('/login')
      } else {
        alert(`❌ ${data.message}`)
      }
    } catch (err) {
      alert('⚠️ Unable to connect to server')
    }
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <select value={role} onChange={(e) => setRole(e.target.value)} className="auth-input">
          <option value="user">Register as User</option>
          <option value="admin">Register as Admin</option>
        </select>

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

        <button className="auth-button" type="submit">Register</button>

        <p className="auth-switch">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  )
}

export default Register
