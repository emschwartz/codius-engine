(function(context){
  'use strict';

  var old_require = context.require;

  context.require = function(module_identifier) {
    if (module_identifier === 'secrets') {
      return __contract_secrets;
    } else {
      return old_require(module_identifier);
    }

  };

})(this);
