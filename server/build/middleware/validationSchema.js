"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var currentDate = new Date();
var minimumAge = 14;
var day = currentDate.getDate();
var month = 12;
var year = currentDate.getFullYear() - minimumAge;
var SchemaObject = {
  name: _joi["default"].string().trim().regex(/^[A-Za-z][^0-9]+$/).min(3).max(45).required(),
  email: _joi["default"].string().trim().email().regex(/^.+[.]\w{2,3}$/).required(),
  password: _joi["default"].string().trim().min(7).regex(/.{7,}$/).required(),
  confirmPassword: _joi["default"].string().trim().min(7).valid(_joi["default"].ref("password")).required(),
  phoneNumber: _joi["default"].string().trim().regex(/^234[7-9][0-1][0-9]+$/).length(13).required(),
  dob: _joi["default"].date().min("01-01-1919").max("".concat(month, "-").concat(day, "-").concat(year)).required(),
  balance: _joi["default"].number().positive().max(2000000).required(),
  address: _joi["default"].string().trim().max(50).required(),
  cashier: _joi["default"].number().integer().positive().min(1).max(19999).required(),
  accountNumber: _joi["default"].number().integer().positive().min(9000000001).max(9999999999).required(),
  amount: _joi["default"].number().positive().min(100).max(10000000).required(),
  type: _joi["default"].string().trim().valid(["savings", "current", "fixed", "fixed deposit", "joint"]).lowercase().required(),
  userType: _joi["default"].string().trim().valid(["admin", "staff"]).lowercase().required(),
  status: _joi["default"].string().trim().valid(["active", "dormant"]).lowercase(),
  link: _joi["default"].string().uri(),
  func: _joi["default"].any()
};
var _default = SchemaObject;
exports["default"] = _default;