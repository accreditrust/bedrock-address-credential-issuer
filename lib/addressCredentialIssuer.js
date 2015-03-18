/*
 * Bedrock Address Credential Issuer.
 *
 * This module issues address credentials.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
require('bedrock-express');
var superagent = require('superagent');

// load config defaults
require('./config');

// dependencies
// TODO: Allow conifg to specify which validator service to use.
var validator = require('bedrock-test-address-validator');

bedrock.events.on('bedrock-express.configure.routes', addRoutes);

// module API
var api = {};
module.exports = api;

api.validateAddress = function(address, callback) {
  validator.validateAddress(address, function(err, address) {
    if(err) {
      return callback(err);
    }
    // TODO: Sign and return credential
    var credential = {
      addressValidated: true
    };
    return callback(null, credential);
  });
};

// TODO: Add rest enpoints
function addRoutes(app) {
  app.get('/validate_address', function(req, res, next) {
    // http://stackoverflow.com/questions/10005939/how-to-consume-json-post-data-in-an-express-application
    var address = req.body;

    api.validateAddress(address, function(err, credential) {
      if(err) {
        return next(err);
      }
      res.send(credential);
    });
  });
}