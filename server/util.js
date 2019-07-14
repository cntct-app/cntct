const Party = require('./models/Party')

const generatePartyCode = async () => {
  const length = 5

  let code
  let isCodeUnique = false

  while (!isCodeUnique) {
    const potentialCode = Math.random().toString().slice(2, 2 + length)

    try {
      const party = await Party.findOne({ code: potentialCode })

      if (party) {
        console.log('COLLISION: ' + party.name)
      } else {
        code = potentialCode
        isCodeUnique = true
      }
    } catch (err) {
      console.error(err)
    }
  }

  return code
}

module.exports = {
  generatePartyCode
}
