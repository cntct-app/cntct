const { Router } = require('express')

const Party = require('./models/Party')
const Member = require('./models/Member')

const { asyncHandler, generatePartyCode, validationErrorHandler } = require('./util')
const { partyNameValidation, partyCodeValidation, memberValidation } = require('./validations')

const router = Router()

// Create a party
router.post('/create_party', partyNameValidation, validationErrorHandler, asyncHandler(async (req, res) => {
  const { name } = req.body
  const code = await generatePartyCode()

  await Party.create({
    code,
    name
  })

  // Send back code for client to redirect to party page
  res.json({ code })
}))

// Get a party
router.get('/party/:code/', partyCodeValidation, validationErrorHandler, asyncHandler(async (req, res) => {
  const party = await Party.findOne({ code: req.params.code })

  if (!party) {
    return res.status(404).json({ error: 'Party does not exist' })
  }

  res.json({ party })
}))

// Get members in party
router.get('/party/:code/members', partyCodeValidation, validationErrorHandler, asyncHandler(async (req, res) => {
  const { code } = req.params
  const party = await Party.findOne({ code })

  if (!party) {
    return res.status(404).json({ error: 'Party does not exist' })
  }

  const members = await Member.find({
    partyCode: code
  })

  res.json({ members })
}))

// Join a party
router.post('/party/:code/join', memberValidation, validationErrorHandler, asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, email } = req.body
  const { code } = req.params

  const party = await Party.findOne({ code })

  if (!party) {
    return res.status(404).json({ error: 'Party does not exist' })
  }

  await Member.create({
    firstName,
    lastName,
    phone,
    email,
    partyCode: code
  })

  // 204 status means successful request but no content returned
  res.status(204).end()
}))

module.exports = router
