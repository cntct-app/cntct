const mongoose = require('mongoose')

const PartySchema = mongoose.Schema({
  code: String,
  name: String,
  incomingSocketIDs: [String]
}, {
  timestamps: true
})

module.exports = mongoose.model('Party', PartySchema)
