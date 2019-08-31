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
    await mongoose.connect('mongodb://localhost:27017/cntct', {
      useNewUrlParser: true,
      useFindAndModify: false
    })

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

const removeIncomingMemberIfExists = async socket => {
  const party = await Party.findOne({ incomingSocketIDs: socket.id })

  if (!party) {
    return
  }

  await Party.findOneAndUpdate({ incomingSocketIDs: socket.id }, {
    $pullAll: {
      incomingSocketIDs: [socket.id]
    }
  })

  io.to(party.code).emit('update_incoming_member_count', party.incomingSocketIDs.length - 1)
  console.log(`${socket.id} left`)
}

// Configure socket.io
io.on('connection', socket => {
  console.log(`${socket.id} connected`)

  socket.on('join_party', (partyCode, cb) => {
    socket.join(partyCode)
    console.log(`${socket.id} joined ${partyCode}`)
    cb()
  })

  socket.on('new_incoming_member', async (partyCode, cb) => {
    const party = await Party.findOne({ code: partyCode })

    await Party.findOneAndUpdate({ code: partyCode }, {
      $push: {
        incomingSocketIDs: socket.id
      }
    })

    io.to(partyCode).emit('update_incoming_member_count', party.incomingSocketIDs.length + 1)
    cb()
  })

  socket.on('remove_incoming_member', () => {
    removeIncomingMemberIfExists(socket)
  })

  socket.on('disconnect', () => {
    removeIncomingMemberIfExists(socket)
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
