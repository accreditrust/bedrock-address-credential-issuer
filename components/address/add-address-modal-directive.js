/*!
 * Add Address Modal.
 *
 * @author Dave Longley
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory(brAlertService, brIdentityService, config, ciAddressService) {
  return {
    restrict: 'A',
    scope: {},
    require: '^stackable',
    templateUrl: requirejs.toUrl(
      'bedrock-address-credential-issuer/components/address/' + 
      'add-address-modal.html')
    link: Link
  };

  function Link(scope, element, attrs, stackable) {
    // FIXME: use 'model'
    var model = scope.model = {};
    model.countries = config.constants.countries;
    scope.identity = brIdentityService.identity;
    scope.originalAddress = {
      '@context': config.data.contextUrl,
      type: 'Address',
      // default to US
      addressCountry: 'US'
    };
    scope.selection = {
      address: null
    };
    scope.validatedAddress = null;

    scope.$watch(function() {
      return ciAddressService.state.loading;
    }, function(value) {
      scope.loading = !!value;
    });

    // state in ('editing', 'selecting')
    scope.state = 'editing';

    scope.validate = function() {
      brAlertService.clearFeedback();
      ciAddressService.validate(scope.originalAddress)
        .then(function(validated) {
          // FIXME: should backend handle this?
          // copy over non-validation fields
          scope.validatedAddress = angular.extend(validated, {
            '@context': config.data.contextUrl,
            type: 'Address',
            label: scope.originalAddress.label,
            name: scope.originalAddress.name
          });
          scope.state = 'selecting';
          if(scope.validatedAddress.sysValidated) {
            scope.selection.address = scope.validatedAddress;
          } else {
            scope.selection.address = scope.originalAddress;
          }
        })
        .catch(function(err) {
          brAlertService.add('error', err, {scope: scope});
        })
        .then(function() {
          scope.$apply();
        });
    };

    scope.add = function(clickedAddress) {
      var addressToAdd = clickedAddress || scope.selection.address;
      brAlertService.clearFeedback();
      ciAddressService.collection.add(addressToAdd)
        .then(function(addedAddress) {
          stackable.close(null, addedAddress);
        })
        .catch(function(err) {
          brAlertService.add('error', err, {scope: scope});
          scope.$apply();
        });
    };

    scope.edit = function() {
      brAlertService.clearFeedback();
      scope.state = 'editing';
      scope.selection.address = null;
    };
  }
}

return {ciAddAddressModal: factory};

});
