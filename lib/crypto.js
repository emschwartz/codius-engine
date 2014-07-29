var crypto = require('crypto');

exports.deriveSecret = deriveSecret;

function deriveSecret(master_key, data) {
  return crypto.createHmac('sha512', master_key).update(data).digest('hex').slice(0,64);
}
