"use strict";

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentDate = new Date();
var minimumAge = 14;
var day = currentDate.getDate();
var month = 12;
var year = currentDate.getFullYear() - minimumAge;

module.exports = {
  name: _joi2.default.string().regex(/^[A-Za-z][^0-9]+$/).min(2).max(15).required(),
  email: _joi2.default.string().email().regex(/^.+[.]\w{2,3}$/).required(),
  password: _joi2.default.string().regex(/^[a-zA-Z0-9]{7,15}$/).required(),
  confirmPassword: _joi2.default.any().valid(_joi2.default.ref("password")).required(),
  phoneNumber: _joi2.default.string().regex(/^234[7-9][0-1][0-9]+$/).length(13).required(),
  dob: _joi2.default.date().min("01-01-1919").max(month + "-" + day + "-" + year).required(),
  balance: _joi2.default.number().positive().max(2000000).required(),
  address: _joi2.default.string().required(),
  cashier: _joi2.default.number().integer().min(10000).positive().max(19999).required(),
  accountNumber: _joi2.default.number().integer().positive().min(9000000001).max(9999999999).required(),
  amount: _joi2.default.number().positive().min(10).max(2000000).required(),
  type: _joi2.default.string().valid(["savings", "current", "fixed", "fixed deposit", "joint"]).lowercase().required(),
  gender: _joi2.default.string().valid(["M", "F", "MALE", "FEMALE"]).uppercase().required()
};