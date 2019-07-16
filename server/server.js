const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Party = require('./models/Party')
const User = require('./models/User')
const { generatePartyCode } = require('./util')

// Create server
const app = express()
const server = http.createServer(app)

// Parse JSON requests
app.use(bodyParser.json())

// HTTP logging
app.use(morgan('dev'))

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

// Create a party
app.post('/create_party', async (req, res) => {
  try {
    const { name } = req.body
    const code = await generatePartyCode()

    await Party.create({
      name,
      code
    })

    res.json({ message: `Successfully created '${name}' party` })
  } catch (err) {
    console.error(`Error creating party: ${err}`)
    res.status(500).json({ error: 'Failed to create party' })
  }
})

// Get a party
app.get('/party/:code', async (req, res) => {
  try {
    const party = await Party.findOne({
      code: req.params.code
    })

    if (!party) {
      return res.status(404).json({ error: 'Party does not exist' })
    }

    res.json({ party })
  } catch (err) {
    console.error(`Error fetching party: ${err}`)
    res.status(500).json({ error: 'Failed to fetch party' })
  }
})

// Join a party
app.post('/party/:code/join', async (req, res) => {
  const { firstName, lastName, phone, email } = req.body
  const { code } = req.params

  try {
    const party = await Party.findOne({ code })

    if (!party) {
      return res.status(404).json({ error: 'Party does not exist' })
    }

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      partyCode: code
    })

    res.json({ message: `${user.firstName} successfully joined '${party.name}' party` })
  } catch (err) {
    console.error(`Error joining party: ${err}`)
    res.status(500).json({ error: 'Failed to join party' })
  }
})

// Get users in party
app.get('/party/:code/users', async (req, res) => {
  try {
    const code = req.params.code
    const party = await Party.findOne({ code })

    if (!party) {
      return res.status(404).json({ error: 'Party does not exist' })
    }

    const users = await User.find({
      partyCode: code
    })

    res.json({ users })
  } catch (err) {
    console.error(`Error getting users in party: ${err}`)
    res.status(500).json({ error: 'Failed to get users in party' })
  }
})

// Start server
server.listen(5001, () => console.log(`Listening at localhost:5001`))
