var chai      = require('chai');
var expect    = chai.expect;
var sinon     = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var node_crypto = require('crypto');
var crypto = require('../lib/crypto');

var HEX_REGEX = /^[0-9a-fA-F]+$/;

describe('lib/crypto', function(){

  describe('deriveSecret', function(){

    it('should accept keys as buffers', function(){
      var secret = crypto.deriveSecret(node_crypto.randomBytes(32), '');
      expect(HEX_REGEX.test(secret)).to.be.true;
    });

    it('should accept keys as hex strings', function(){
      var secret = crypto.deriveSecret(node_crypto.randomBytes(32).toString('hex'), '');
      expect(HEX_REGEX.test(secret)).to.be.true;
    });

    it('should accept data as a buffer', function(){
      var secret = crypto.deriveSecret(node_crypto.randomBytes(32), node_crypto.randomBytes(32));
      expect(HEX_REGEX.test(secret)).to.be.true;
    });

    it('should accept data as a string', function(){
      var secret = crypto.deriveSecret(node_crypto.randomBytes(32), node_crypto.randomBytes(32).toString('hex'));
      expect(HEX_REGEX.test(secret)).to.be.true;
    });

    it('should return a 256-bit hex-encoded secret string', function(){
      var secret = crypto.deriveSecret(node_crypto.randomBytes(32), node_crypto.randomBytes(32));
      expect(HEX_REGEX.test(secret)).to.be.true;
      expect(secret).to.have.length(64);
    });

  });

  describe('getPublicKey', function(){

    it('should return the correct public key for a given private key', function(){
      var private_key = '7b933e48f5ac6078f769c39909d50c78eeaa863b10710634a3b11fbc10444c4b';
      var public_key = '04f032a32d610285710e15eb2e66e2bef85ae209984cbb5361d51d403927ceab05385ebccfa0c7b13f86e5faf20ad6ecff4a6947e39cfa89a761f4be921d2da4ad';
      // Public key derived using https://github.com/matja/bitcoin-tool, implemented in C

      expect(crypto.getPublicKey(private_key)).to.equal(public_key);
    });

  });

});
