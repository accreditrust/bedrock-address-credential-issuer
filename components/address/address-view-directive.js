/*!
 * Address directive.
 *
 * @author Dave Longley
 */
define([], function() {

'use strict';

/* @ngInject */
function factory() {
  return {
    restrict: 'A',
    scope: {
      address: '=psAddressView',
      noLabel: '=?psNoLabel'
    },
    templateUrl: requirejs.toUrl(
      'bedrock-address-credential-issuer/components/address/' + 
      'address-view.html')
  };
}

return {psAddressView: factory};

});
