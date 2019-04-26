"use strict";

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || _config.Port;
// eslint-disable-next-line import/named

_app2.default.listen(port, function () {
  console.log("Server running at port:" + port + "...");
});