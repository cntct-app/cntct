const { Router } = require('express')
const createVCard = require('create-vcard').default

const Party = require('./models/Party')
const Member = require('./models/Member')

const { asyncHandler, generatePartyCode, validationErrorHandler } = require('./util')
const { partyNameValidation, partyCodeValidation, memberValidation, memberIdValidation } = require('./validations')

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

  // Send members array to client
  const members = await Member.find({ partyCode: code })
  req.io.to(code).emit('update_members', members)

  // 204 status means successful request but no content will be returned
  res.status(204).end()
}))

// Generate vCards for members
router.get('/generate_vcard/:memberId', memberIdValidation, validationErrorHandler, asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.memberId)
  const { firstName, lastName, phone, email } = member

  const card = createVCard({
    firstName,
    lastName,
    cellPhone: phone,
    email
  })

  // Tell the browser what type of file the vCard is
  res.set('Content-Type', `text/vcard; name="${firstName}.vcf"`)
  res.set('Content-Disposition', `inline; filename="${firstName}.vcf"`)

  res.send(card.getFormattedString())
}))

module.exports = router
