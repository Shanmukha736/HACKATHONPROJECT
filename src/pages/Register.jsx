import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    const exists = users.find((u) => u.email === email && u.role === role)
    if (exists) {
      alert('Account already exists for this role. Please login.')
      navigate('/login')
      return
    }

    users.push({ email, password, role })
    localStorage.setItem('users', JSON.stringify(users))
    alert(`✅ Registered successfully as ${role}`)
    navigate('/login')
  }

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
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
        <button className="auth-button" type="submit">Register</button>

        <p className="auth-switch">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
  )
}

export default Register
