const mongoose = require('mongoose')

const MemberSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  partyCode: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Member', MemberSchema)
