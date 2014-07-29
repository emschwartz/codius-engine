var crypto     = require('crypto');
var BigInteger = require('../node_modules/bitcoinjs-lib/node_modules/bigi');
var bitcoinjs  = require('bitcoinjs-lib');

exports.deriveSecret = deriveSecret;
exports.getPublicKey = getPublicKey;
exports.sign         = sign;
exports.verify       = verify;

function deriveSecret(master_key, data) {
  return crypto.createHmac('sha512', master_key).update(data).digest('hex').slice(0,64);
}

function getPublicKey(private_key) {
  var key = new bitcoinjs.ECKey(BigInteger.fromHex(private_key), false);
  return key.pub.toHex();
}

function sign(private_key, data) {
  var key = new bitcoinjs.ECKey(BigInteger.fromHex(private_key), false);
  var hash = hashData(data);
  var signature = key.sign(hash).toDER();
  return new Buffer(signature).toString('hex');
}

function verify(public_key, data, signature) {
  var pubkey = bitcoinjs.ECPubKey.fromHex(public_key);
  var hash = hashData(data);
  return pubkey.verify(hash, signature);
}

function hashData(data) {
  return crypto.createHash('sha256').update(data).digest();
}
