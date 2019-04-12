"use strict";

var _app = _interopRequireDefault(require("./app"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || _config.port;
// eslint-disable-next-line import/named
_app["default"].listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("Server running at port:".concat(port, "..."));
});