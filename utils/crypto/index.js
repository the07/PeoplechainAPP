const nacl = require('tweetnacl')
const naclUtil = require('tweetnacl-util')

function verify (data, signature, theirPublicKey) {
  data = naclUtil.decodeUTF8(data)
  signature = naclUtil.decodeBase64(signature)
  theirPublicKey = naclUtil.decodeBase64(theirPublicKey)

  return nacl.sign.detached.verify(data, signature, theirPublicKey)
}

module.exports = {
  verify
}