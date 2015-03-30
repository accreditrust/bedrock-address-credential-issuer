/*
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var aci = require('./lib/addressCredentialIssuer');
var path = require('path');

require('bedrock-idp');
require('bedrock-views');

bedrock.config.views.paths.push(
  path.join(__dirname, 'views')
);

// run with development defaults
bedrock.start();
