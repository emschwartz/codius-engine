var path = require('path');
var extend = require('extend');

function Config() {
  extend(this, Config.defaults);
}

Config.defaults = {
  /**
   * Path where the virtual contracts filesystem lives on the physical disk.
   */
  contractsFilesystemPath: path.resolve(__dirname, '../contract_filesystem/')+path.sep,

  /**
   * Path to API modules.
   */
  apisPath: path.resolve(__dirname, '../apis/')+path.sep,

  /**
   * Api modules that the engine should load and have available.
   */
  apis: [
    'fs',
    'foo'
  ],

  /**
   * Apis to be added to automatically generated manifests.
   */
  defaultManifestApis: [
    'fs',
    'foo'
  ],

  /**
   * Name for the manifest file.
   *
   * The manifest file specifies the basic properties of the contract.
   */
  manifestFilename: 'codius-manifest.json',

  /**
   * Default filenames for primary contract script.
   *
   * When generating an implicit manifest, the contract engine will look for
   * these filenames as the entry point.
   */
  defaultMainFilenames: [
    'contract.js',
    'main.js',
    'index.js'
<<<<<<< HEAD
  ]
};
=======
  ],

  /**
   * Bytes to use when deriving the CONTRACT_KEYPAIR_GENERATOR and
   * SIGNING_PRIVATE_KEY from the ENGINE_MASTER_KEY
   */
   contract_keypair_generator_bytes: 'CONTRACT_KEYPAIR_GENERATOR',
   signing_private_key_bytes: 'SIGNING_PRIVATE_KEY'
});

function Config(opts) {
  extend(this, nconf.get());
  extend(this, opts);
}
>>>>>>> a108a0f... [FEATURE] Derive contract-specific secret

exports.Config = Config;
