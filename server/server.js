const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Party = require('./models/Party')
const router = require('./router')

// Create server
const app = express()
const server = http.createServer(app)

// Parse JSON post requests
app.use(bodyParser.json())

// Log requests
app.use(morgan('dev'))

// Use router for requests
app.use('/', router)

// Connect to mongo and seed database if needed
;(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cntct', { useNewUrlParser: true })

    console.log('Connected to mongo')

    const devParty = await Party.findOne({ code: '12345' })

    if (!devParty) {
      await Party.create({
        name: 'Dev Party',
        code: '12345'
      })

      console.log('Created Dev Party')
    }
  } catch (err) {
    console.error(err)
    process.exit()
  }
})()

// Fallback for unmatched requests
app.use((req, res, next) => {
  const err = new Error('Page not found')

  err.status = 404
  next(err)
})

// Handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500)

  res.json({ error: err.message })
})

// Start server
server.listen(5001, () => console.log(`Listening at localhost:5001`))
