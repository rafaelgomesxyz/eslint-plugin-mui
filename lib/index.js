/**
 * @fileoverview Plugin with custom rules for MUI
 * @author rafaelgomesxyz
 */

'use strict';

const requireIndex = require('requireindex');

module.exports.rules = requireIndex(`${__dirname}/rules`);
