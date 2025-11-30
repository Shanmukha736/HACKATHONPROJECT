import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = new User({ email, password, role })
    await user.save()

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error('Error during register:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.password !== password) return res.status(400).json({ message: 'Invalid credentials' })

    res.status(200).json({
      message: 'Login successful',
      token: 'fake-jwt-token',
      role: user.role
    })
  } catch (err) {
    console.error('Error during login:', err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
