"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function (req, res, next) {
  var token = req.headers.authorization.split(" ")[1];

  _jsonwebtoken["default"].verify(token, _config.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        message: "User not Signed-In"
      });
    }

    req.userData = decoded;
    next();
  });
};