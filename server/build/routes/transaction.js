"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _transactionController = require("../controllers/transactionController");

var _transactionController2 = _interopRequireDefault(_transactionController);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _validation = require("../middleware/validation");

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// /////////////////////////////
// View a  all Account's Transactions //
// ///////////////////////////

router.get("/accounts/:accountNumber/transactions", _authorization2.default.user, _transactionController2.default.viewAllAccountTransaction);

// /////////////////////////////
// View Specific Transaction //
// ///////////////////////////

router.get("/transactions/:transactionId", _authorization2.default.user, _transactionController2.default.viewSpecificTransaction);

// ///////////////////
// Debit Account //
// /////////////////

router.post("/transactions/:accountNumber/debit", _authorization2.default.staff, _validation2.default.debitAccount, _transactionController2.default.debitAccount);

// ///////////////////
// Credit Account //
// /////////////////

router.post("/transactions/:accountNumber/credit", _authorization2.default.staff, _validation2.default.creditAccount, _transactionController2.default.creditAccount);

module.exports = router;