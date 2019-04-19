"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _transactionController = require("../controllers/transactionController");

var _transactionController2 = _interopRequireDefault(_transactionController);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

var _validation = require("../middleware/validation");

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// /////////////////////////////
// View a  Specific Account's Transactions //
// ///////////////////////////

router.get("/accounts/:accountNumber/transactions", _transactionController2.default.viewSpecificAccountTransaction);

// /////////////////////////////
// View Specific Transaction //
// ///////////////////////////

router.get("/transactions/:transactionId", _transactionController2.default.viewSpecificTransaction);

// ///////////////////
// Debit Account //
// /////////////////

router.post("/transactions/:accountNumber/debit", _validation2.default.debitAccount, _transactionController2.default.debitAccount);

// ///////////////////
// Credit Account //
// /////////////////

router.post("/transactions/:accountNumber/credit", _validation2.default.creditAccount, _transactionController2.default.creditAccount);

module.exports = router;