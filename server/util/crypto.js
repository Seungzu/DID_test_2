const crypto = require('crypto')

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || 'abcdefghijklmnop'.repeat(2) // Must be 256 bits (32 characters)

function encryptUserInfo(text) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  )
  const encrypted = cipher.update(text)

  return (
    iv.toString('hex') +
    ':' +
    Buffer.concat([encrypted, cipher.final()]).toString('hex')
  )
}

function decryptUserInfo(text) {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  )
  const decrypted = decipher.update(encryptedText)

  return Buffer.concat([decrypted, decipher.final()]).toString()
}

module.exports = {
    encryptUserInfo,
    decryptUserInfo
}