import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',  // your React app URL
  credentials: true
}))

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err))

// Test route
app.get('/', (req, res) => {
  res.send('Server is running successfully!')
})

// Example register route (for console testing)
app.post('/api/auth/register', (req, res) => {
  console.log('Register request:', req.body)
  res.json({ message: 'Register route hit!' })
})

// Example login route
app.post('/api/auth/login', (req, res) => {
  console.log('Login request:', req.body)
  res.json({ message: 'Login route hit!' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
