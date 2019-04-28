"use strict";

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var port = process.env.PORT;
_app2.default.listen(port, function () {
  console.log("Server running at port:" + port + "...");
});