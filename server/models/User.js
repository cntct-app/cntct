const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  partyCode: String
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)
