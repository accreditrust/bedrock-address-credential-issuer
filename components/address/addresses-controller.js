/*!
 * Addresses Controller.
 *
 * Copyright (c) 2012-2014 Digital Bazaar, Inc. All rights reserved.
 *
 * @author Dave Longley
 * @author David I. Lehn
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($scope, ciAddressService, brAlertService, brIdentityService) {
  var self = this;
  self.identity = brIdentityService.identity;
  self.state = ciAddressService.state;
  self.addresses = ciAddressService.addresses;
  self.addressToDelete = null;
  self.modals = {
    showAddAddress: false,
    showDeleteAddressAlert: false,
    showEditAddress: false,
    address: null
  };

  self.deleteAddress = function(address) {
    self.modals.showDeleteAddressAlert = true;
    self.addressToDelete = address;
  };
  self.confirmDeleteAddress = function(err, result) {
    if(!err && result === 'ok') {
      ciAddressService.collection.del(self.addressToDelete.id)
        .catch(function(err) {
          brAlertService.add('error', err);
        })
        .then(function() {
          $scope.$apply();
        });
    }
    self.addressToDelete = null;
  };
  self.editAddress = function(address) {
    self.modals.showEditAddress = true;
    self.modals.address = address;
  };

  ciAddressService.collection.getAll();
}

return {AddressesController: factory};

});
