/*
 * Bedrock Address Credential Issuer.
 *
 * This module issues address credentials.
 *
 * Copyright (c) 2012-2015 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

config.mocha.tests.push(path.join(__dirname, 'test.js'));