# Contracts Engine
The engine to run contracts

## Playing with the engine

+ `npm install`
+ `npm test` runs the existing tests
+ `node run-test-contract.js` will compile and run the `test_contract` and all of its submodules and files

## IPC Messaging Format

### Contract -> Sandbox

API call with callback
```js
{
  "type": "api",
  "api": "http",
  "method": "get",
  "data": "http://some.url",
  "callback": 4
}
```

Process finished message?

### Sandbox -> Contract

API callback
```js
{
  "type": "callback",
  "callback": 4,
  "error": null,
  "result": "some stringified result"
}
```

Event listener triggered
```js
{
  "type": "event",
  "handler": "eventHandlerName",
  "data": "data passed in on event"
}
```

Unprompted message? (e.g. the contract client triggering a contract to run)
- how to reference a specific contract?
- how do you validate they have permissions to send it a message?

## Contract-specific Public / Private Key Pair

### Key Derivation

The contract engine must be started with an `ENGINE_MASTER_KEY` (supplied as a hex string). This key is used to derive two private keys. (Alternatively, the engine can be started with two DISTINCT private keys. The purpose of each is described below.)

The first private key derived, the `CONTRACT_KEYPAIR_GENERATOR`, is used to generate contract-specific keypairs. It is the HMAC of the `ENGINE_MASTER_KEY` and the string `"CONTRACT_KEYPAIR_GENERATOR"`.

The second private key derived, the `SIGNING_PRIVATE_KEY`, is used to sign each contract's public key. The corresponding `SIGNING_PUBLIC_KEY` should be made public so contract users can verify the signature on their contract's unique public key. The `SIGNING_PRIVATE_KEY` is the HMAC of the `ENGINE_MASTER_KEY` and the string `"SIGNING_PRIVATE_KEY"`.

Currently, the signature algorithm used is ECDSA with the [Secp256k1](https://en.bitcoin.it/wiki/Secp256k1) curve. In the future the offerings should be expanded so contracts can access key pairs for a number of different schemes (such as [Ed25519](https://ripple.com/dev-blog/curves-with-a-twist/)).

### API

Contracts can access the secrets in the following manner:

```js
var secrets = require('secrets');
var PRIVATE_KEY = secrets.PRIVATE_KEY;
var PUBLIC_KEY  = secrets.PUBLIC_KEY;
var PUBLIC_KEY_SIGNATURE = secrets.PUBLIC_KEY_SIGNATURE; // Public key signed by the contract engine
```
