import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    const newUser = { email, password }
    localStorage.setItem('user', JSON.stringify(newUser))
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirm}
          onChange={(e) => setConfirm(e.target.value)} required />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
        <p>Already registered? <span onClick={() => navigate('/login')}>Login</span></p>
      </form>
    </div>
  )
}

export default Register
