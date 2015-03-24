/*
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */

'use strict';

var bedrock      = require('bedrock');
var aci          = require('./addressCredentialIssuer');
var BedrockError = bedrock.util.BedrockError;
var superagent   = require('superagent');
var should       = require('should');

/*
Digital Bazaar, Inc.
1700 Kraft Dr Suite #2408
Blacksburg, VA 24060
*/

describe('bedrock-address-credential-issuer', function() {
  var address = {
        name: "Digital Bazaar",
        streetAddress: "1700 Kraft Dr Suite 2408",
        addressLocality: "Blacksburg",
        addressRegion: "Virginia",
        postalCode: "24060", 
        addressCountry: "United States"};
  describe('validateAddress()', function() {
    it('should validate address', function(done) {
      aci.validateAddress(address, function(err, credential) {
        should.not.exist(err);
        should.exist(credential);
        credential.addressValidated.should.eql(true);
        done();
      });
    });
  });
  describe('REST validateAddress()', function() {
    it('should validate address via the REST endpoint', function(done) {
      // https://github.com/visionmedia/superagent/issues/188
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
      var url = bedrock.config.server.baseUri + '/validate_address';
      superagent
        .post(url)
        .send(address)
        .end(function(err, res) {
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;
          
          console.log(err);
          console.log(res.body);
          console.log(bedrock.config.server.baseUri);

          should.not.exist(err);
          should.exist(res.body.addressValidated);
          res.body.addressValidated.should.eql(true);
          done();
        });
    });
  });

});