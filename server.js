const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:5175',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))
app.use(express.json())

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
// Add routes for stock and sales similarly

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})