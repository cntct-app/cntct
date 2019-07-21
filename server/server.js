const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Party = require('./models/Party')
const Member = require('./models/Member')
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
    const { partyName } = req.body
    const code = await generatePartyCode()

    await Party.create({
      code,
      name: partyName
    })

    res.json({ code })
  } catch (err) {
    console.error(`Error creating party: ${err}`)
    res.status(500).json({ error: 'Failed to create party' })
  }
})

// Check if a party exists
app.get('/party/:code/exists', async (req, res) => {
  try {
    const party = await Party.findOne({
      code: req.params.code
    })

    if (!party) {
      return res.status(404).json({ exists: false })
    }

    res.json({ exists: true })
  } catch (err) {
    console.error(`Error fetching party: ${err}`)
    res.status(500).json({ error: 'Failed to fetch party' })
  }
})

// Get a party name
app.get('/party/:code/name', async (req, res) => {
  try {
    const party = await Party.findOne({
      code: req.params.code
    })

    if (!party) {
      return res.status(404).json({ error: 'Party does not exist' })
    }

    res.json({ name: party.name })
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

    const member = await Member.create({
      firstName,
      lastName,
      phone,
      email,
      partyCode: code
    })

    res.json({ message: `${member.firstName} successfully joined '${party.name}' party` })
  } catch (err) {
    console.error(`Error joining party: ${err}`)
    res.status(500).json({ error: 'Failed to join party' })
  }
})

// Get members in party
app.get('/party/:code/members', async (req, res) => {
  try {
    const code = req.params.code
    const party = await Party.findOne({ code })

    if (!party) {
      return res.status(404).json({ error: 'Party does not exist' })
    }

    const members = await Member.find({
      partyCode: code
    })

    res.json({ members })
  } catch (err) {
    console.error(`Error getting members in party: ${err}`)
    res.status(500).json({ error: 'Failed to get members in party' })
  }
})

// Start server
server.listen(5001, () => console.log(`Listening at localhost:5001`))
