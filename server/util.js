const { validationResult } = require('express-validator')
const { parsePhoneNumberFromString } = require('libphonenumber-js')

const Party = require('./models/Party')

// Generate party codes and check database for collisions
const generatePartyCode = async () => {
  const length = 5

  let code
  let isCodeUnique = false

  while (!isCodeUnique) {
    const potentialCode = Math.random().toString().slice(2, 2 + length)

    try {
      const party = await Party.findOne({ code: potentialCode })

      if (!party) {
        code = potentialCode
        isCodeUnique = true
      }
    } catch (err) {
      console.error(err)
    }
  }

  return code
}

// Handle errors in async routes
const asyncHandler = cb => async (req, res, next) => {
  try {
    await cb(req, res, next)
  } catch (err) {
    next(err)
  }
}

// Handle validation errors and send back relevant information
const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) })
  }

  next()
}

// Validate phone numbers with libphonenumber-js (validator.js `isMobilePhone` advanced enough)
const validatePhoneNumber = number => {
  const parsed = parsePhoneNumberFromString(number, 'US')

  if (!parsed) {
    return false
  }

  return parsed.isValid()
}

module.exports = {
  generatePartyCode,
  asyncHandler,
  validationErrorHandler,
  validatePhoneNumber
}
