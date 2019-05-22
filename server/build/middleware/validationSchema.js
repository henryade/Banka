"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currentDate = new Date();
var minimumAge = 14;
var day = currentDate.getDate();
var month = 12;
var year = currentDate.getFullYear() - minimumAge;

var SchemaObject = {
  name: _joi2.default.string().trim().regex(/^[A-Za-z][^0-9]+$/).min(3).max(45).required(),
  email: _joi2.default.string().trim().email().regex(/^.+[.]\w{2,3}$/).required(),
  password: _joi2.default.string().trim().min(7).regex(/.{7,}$/).required(),
  confirmPassword: _joi2.default.string().trim().min(7).valid(_joi2.default.ref("password")).required(),
  phoneNumber: _joi2.default.string().trim().regex(/^234[7-9][0-1][0-9]+$/).length(13).required(),
  dob: _joi2.default.date().min("01-01-1919").max(month + "-" + day + "-" + year).required(),
  balance: _joi2.default.number().positive().max(2000000).required(),
  address: _joi2.default.string().trim().max(50).required(),
  cashier: _joi2.default.number().integer().positive().min(1).max(19999).required(),
  accountNumber: _joi2.default.number().integer().positive().min(9000000001).max(9999999999).required(),
  amount: _joi2.default.number().positive().min(100).max(10000000).required(),
  type: _joi2.default.string().trim().valid(["savings", "current", "fixed", "fixed deposit", "joint"]).lowercase().required(),
  userType: _joi2.default.string().trim().valid(["admin", "staff"]).lowercase().required(),
  status: _joi2.default.string().trim().valid(["active", "dormant"]).lowercase()
};

exports.default = SchemaObject;