/*
 * Bedrock Address Credential Issuer.
 *
 * This module issues address credentials.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');

// load config defaults
require('./config');

// dependencies
// TODO: Allow conifg to specify which validator service to use.
var validator = require('bedrock-test-address-validator');

// module API
var api = {};
module.exports = api;

api.validateAddress = function(address, callback) {
  validator.validateAddress(address, function(err, callback) {
    if(err) {
      return callback(err);
    }
    // TODO: Sign and return credential
    var credential = {};
    callback(null, credential);
  });
};

// TODO: Add rest enpoints