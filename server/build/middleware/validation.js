"use strict";

var _joi = _interopRequireDefault(require("joi"));

var _validationSchema = _interopRequireDefault(require("./validationSchema"));

var _validationErrors = _interopRequireDefault(require("./validationErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var footer = function footer(req, res, schema, next) {
  var result = _joi["default"].validate(req.body, schema);

  if (result.error) {
    return (0, _validationErrors["default"])(res, result.error.details[0], result.error.details[0].context.label);
  }

  next();
  return null;
};

var logic = function logic(req, res, next) {
  var schema = _joi["default"].object().keys({
    accountNumber: _validationSchema["default"].accountNumber
  });

  var result = _joi["default"].validate(req.params, schema);

  if (result.error) {
    return (0, _validationErrors["default"])(res, result.error.details[0], result.error.details[0].context.label);
  }

  next();
  return null;
};

var transactionLogic = function transactionLogic(req, res, next) {
  var schema = _joi["default"].object().keys({
    amount: _validationSchema["default"].amount,
    depositor: _validationSchema["default"].name,
    depositorPhoneNumber: _validationSchema["default"].phoneNumber
  });

  footer(req, res, schema, next);
};

exports.signUp = function (req, res, next) {
  var schema = _joi["default"].object().keys({
    firstName: _validationSchema["default"].name,
    lastName: _validationSchema["default"].name,
    email: _validationSchema["default"].email,
    password: _validationSchema["default"].password,
    confirmPassword: _validationSchema["default"].confirmPassword
  });

  footer(req, res, schema, next);
};

exports.forgotPassword = function (req, res, next) {
  var schema = _joi["default"].object().keys({
    id: _validationSchema["default"].cashier,
    email: _validationSchema["default"].email,
    password: _validationSchema["default"].password,
    confirmPassword: _validationSchema["default"].confirmPassword
  });

  footer(req, res, schema, next);
};

exports.reset = function (req, res, next) {
  var schema = _joi["default"].object().keys({
    email: _validationSchema["default"].email
  });

  footer(req, res, schema, next);
};

exports.signIn = function (req, res, next) {
  var schema = _joi["default"].object().keys({
    email: _validationSchema["default"].email,
    password: _validationSchema["default"].password
  });

  footer(req, res, schema, next);
};

exports.createAccount = function (req, res, next) {
  var schema = _joi["default"].object().keys({
    email: _validationSchema["default"].email,
    openingBalance: _validationSchema["default"].balance,
    type: _validationSchema["default"].type
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
  var schema = _joi["default"].object().keys({
    status: _validationSchema["default"].status
  });

  var result = _joi["default"].validate(req.query, schema);

  if (result.error) {
    return (0, _validationErrors["default"])(res, result.error.details[0], result.error.details[0].context.label);
  }

  next();
  return null;
};

exports.email = function (req, res, next) {
  var schema = _joi["default"].object().keys({
    email: _validationSchema["default"].email
  });

  var result = _joi["default"].validate(req.params, schema);

  if (result.error) {
    return (0, _validationErrors["default"])(res, result.error.details[0], result.error.details[0].context.label);
  }

  next();
  return null;
};

exports.transaction = function (req, res, next) {
  var schema = _joi["default"].object().keys({
    transactionId: _validationSchema["default"].cashier
  });

  var result = _joi["default"].validate(req.params, schema);

  if (result.error) {
    return (0, _validationErrors["default"])(res, result.error.details[0], result.error.details[0].context.label);
  }

  next();
  return null;
};

exports.checkStaff = function (req, res, next) {
  var schema = _joi["default"].object().keys({
    firstName: _validationSchema["default"].name,
    lastName: _validationSchema["default"].name,
    email: _validationSchema["default"].email,
    userType: _validationSchema["default"].userType
  });

  var result = _joi["default"].validate(req.body, schema);

  if (result.error) {
    return (0, _validationErrors["default"])(res, result.error.details[0], result.error.details[0].context.label);
  }

  next();
  return null;
};