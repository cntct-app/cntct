const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const socketio = require('socket.io')

const Party = require('./models/Party')
const router = require('./router')

// Create server
const app = express()
const server = http.createServer(app)

// Intitialize socket.io and connect to HTTP server
const io = socketio(server)

// Attach io object to request for use in other routes
app.use((req, res, next) => {
  req.io = io
  next()
})

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

// Configure socket.io
io.on('connection', socket => {
  console.log(`${socket.id} connected`)

  socket.on('subscribe_to_party', partyCode => {
    console.log(`${socket.id} joined ${partyCode}`)
    socket.join(partyCode)
  })
})

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
