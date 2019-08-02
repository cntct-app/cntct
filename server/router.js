const { Router } = require('express')
const { body, param } = require('express-validator')

const Party = require('./models/Party')
const Member = require('./models/Member')
const { asyncHandler, generatePartyCode, validationErrorHandler, validatePhoneNumber } = require('./util')

const router = Router()

// Create a party
router.post('/create_party', [
  body('name')
    .isLength({ min: 1, max: 35 })
    .trim().escape()
], validationErrorHandler, asyncHandler(async (req, res) => {
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
router.get('/party/:code/', [
  param('code')
    .isInt()
    .isLength({ min: 5, max: 5 })
    .trim()
], validationErrorHandler, asyncHandler(async (req, res) => {
  const party = await Party.findOne({ code: req.params.code })

  if (!party) {
    return res.status(404).json({ error: 'Party does not exist' })
  }

  res.json({ party })
}))

// Join a party
router.post('/party/:code/join', [
  body('firstName')
    .isLength({ min: 1, max: 35 })
    .trim().escape(),
  body('lastName')
    .isLength({ min: 1, max: 35 })
    .trim().escape(),
  body('phone')
    .custom(validatePhoneNumber),
  body('email')
    .isEmail()
], validationErrorHandler, asyncHandler(async (req, res) => {
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

// Get members in party
router.get('/party/:code/members', [
  param('code')
    .isInt()
    .isLength({ min: 5, max: 5 })
    .trim()
], validationErrorHandler, asyncHandler(async (req, res) => {
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

module.exports = router
