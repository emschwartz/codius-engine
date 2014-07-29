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

});
