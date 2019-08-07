import { parsePhoneNumberFromString } from 'libphonenumber-js'

export const formatPhoneNumber = number => {
  const parsed = parsePhoneNumberFromString(number, 'US')

  if (!parsed) {
    return null
  }

  if (parsed.country !== 'US') {
    return parsed.formatInternational()
  }

  return parsed.formatNational()
}

export const validatePhoneNumber = number => {
  const parsed = parsePhoneNumberFromString(number, 'US')

  if (!parsed) {
    return false
  }

  return parsed.isValid()
}
