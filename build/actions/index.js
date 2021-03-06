'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionActions = exports.queryActions = exports.authActions = undefined;

var _auth = require('./auth');

var authActions = _interopRequireWildcard(_auth);

var _connection = require('./connection');

var connectionActions = _interopRequireWildcard(_connection);

var _query = require('./query');

var queryActions = _interopRequireWildcard(_query);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.authActions = authActions;
exports.queryActions = queryActions;
exports.connectionActions = connectionActions;
exports.default = Object.assign({}, authActions, queryActions, connectionActions);