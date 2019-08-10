const { body, param, oneOf } = require('express-validator')
const { validatePhoneNumber } = require('./util')

const partyNameValidation = [
  body('name')
    .isLength({ min: 1, max: 35 })
    .trim().escape()
]

const partyCodeValidation = [
  param('code')
    .isInt()
    .isLength({ min: 5, max: 5 })
    .trim()
]

const memberNameValidation = [
  body('firstName')
    .isLength({ min: 1, max: 35 })
    .trim().escape(),
  body('lastName')
    .isLength({ min: 1, max: 35 })
    .trim().escape()
]

const memberValidation = oneOf([
  [
    ...memberNameValidation,
    body('phone')
      .custom(validatePhoneNumber),
    body('email')
      .isEmail()
  ], [
    ...memberNameValidation,
    body('phone')
      .custom(validatePhoneNumber)
  ], [
    ...memberNameValidation,
    body('email')
      .isEmail()
  ]
])

module.exports = {
  partyNameValidation,
  partyCodeValidation,
  memberValidation
}
