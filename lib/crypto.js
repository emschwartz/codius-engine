var crypto     = require('crypto');
var BigInteger = require('bigi');
var bitcoinjs  = require('bitcoinjs-lib');

exports.deriveSecret = deriveSecret;
exports.getPublicKey = getPublicKey;

function deriveSecret(master_key, data) {
  return crypto.createHmac('sha512', master_key).update(data).digest('hex').slice(0,64);
}

function getPublicKey(private_key) {
  var key = new bitcoinjs.ECKey(BigInteger.fromHex(private_key), false);
  return key.pub.toHex();
}
