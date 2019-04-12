"use strict";

var _app = _interopRequireDefault(require("./app"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/named
_app["default"].listen(_config.port, function () {
  // eslint-disable-next-line no-console
  console.log("Server running at port:".concat(_config.port, "..."));
});