"use strict";

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _validationSchema = require("./validationSchema");

var _validationSchema2 = _interopRequireDefault(_validationSchema);

var _validationErrors = require("./validationErrors");

var _validationErrors2 = _interopRequireDefault(_validationErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var footer = function footer(req, res, schema, next) {
  var result = _joi2.default.validate(req.body, schema);
  if (result.error) {
    return (0, _validationErrors2.default)(res, result.error.details[0], result.error.details[0].context.label);
  }
  next();
  return null;
};

var logic = function logic(req, res, next) {
  var schema = _joi2.default.object().keys({
    accountNumber: _validationSchema2.default.accountNumber
  });
  var result = _joi2.default.validate(req.params, schema);
  if (result.error) {
    return (0, _validationErrors2.default)(res, result.error.details[0], result.error.details[0].context.label);
  }
  next();
  return null;
};

var transactionLogic = function transactionLogic(req, res, next) {
  var schema = _joi2.default.object().keys({
    amount: _validationSchema2.default.amount,
    depositor: _validationSchema2.default.name,
    depositorPhoneNumber: _validationSchema2.default.phoneNumber
  });
  footer(req, res, schema, next);
};

exports.signUp = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    firstName: _validationSchema2.default.name,
    lastName: _validationSchema2.default.name,
    email: _validationSchema2.default.email,
    password: _validationSchema2.default.password,
    confirmPassword: _validationSchema2.default.confirmPassword
  });

  footer(req, res, schema, next);
};
exports.forgotPassword = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    id: _validationSchema2.default.cashier,
    email: _validationSchema2.default.email,
    password: _validationSchema2.default.password,
    confirmPassword: _validationSchema2.default.confirmPassword
  });

  footer(req, res, schema, next);
};
exports.reset = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    email: _validationSchema2.default.email
  });

  footer(req, res, schema, next);
};

exports.signIn = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    email: _validationSchema2.default.email,
    password: _validationSchema2.default.password
  });
  footer(req, res, schema, next);
};

exports.createAccount = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    email: _validationSchema2.default.email,
    openingBalance: _validationSchema2.default.balance,
    type: _validationSchema2.default.type
  });
  footer(req, res, schema, next);
};

exports.changeAccountStatus = function (req, res, next) {
  logic(req, res, next);
};
exports.deleteAccount = function (req, res, next) {
  logic(req, res, next);
};
exports.creditAccount = function (req, res, next) {
  transactionLogic(req, res, next);
};
exports.debitAccount = function (req, res, next) {
  transactionLogic(req, res, next);
};
exports.allAccount = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    status: _validationSchema2.default.status
  });
  var result = _joi2.default.validate(req.query, schema);
  if (result.error) {
    return (0, _validationErrors2.default)(res, result.error.details[0], result.error.details[0].context.label);
  }
  next();
  return null;
};
exports.email = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    email: _validationSchema2.default.email
  });
  var result = _joi2.default.validate(req.params, schema);
  if (result.error) {
    return (0, _validationErrors2.default)(res, result.error.details[0], result.error.details[0].context.label);
  }
  next();
  return null;
};

exports.transaction = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    transactionId: _validationSchema2.default.cashier
  });
  var result = _joi2.default.validate(req.params, schema);
  if (result.error) {
    return (0, _validationErrors2.default)(res, result.error.details[0], result.error.details[0].context.label);
  }
  next();
  return null;
};

exports.checkStaff = function (req, res, next) {
  var schema = _joi2.default.object().keys({
    firstName: _validationSchema2.default.name,
    lastName: _validationSchema2.default.name,
    email: _validationSchema2.default.email,
    userType: _validationSchema2.default.userType
  });
  var result = _joi2.default.validate(req.body, schema);
  if (result.error) {
    return (0, _validationErrors2.default)(res, result.error.details[0], result.error.details[0].context.label);
  }
  next();
  return null;
};