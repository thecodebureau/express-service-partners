'use strict';

const isAuthenticated = require('express-module-membership/passport/authorization-middleware').isAuthenticated;

const mw = require('./middleware');

module.exports = [
  [ '/api/partners', 'get', [ mw.getAll ]],
  [ '/api/partners', 'post', [ isAuthenticated, mw.create ]],
  [ '/api/partners/:id', 'get', [ mw.findById ]],
  [ '/api/partners/:id', 'put', [ isAuthenticated, mw.update ]],
  [ '/api/partners/:id', 'patch', [ isAuthenticated, mw.update ]],
  [ '/api/partners/:id', 'delete', [ isAuthenticated, mw.remove ]],
];
