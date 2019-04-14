"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _transactionController = require("../controllers/transactionController");

var _transactionController2 = _interopRequireDefault(_transactionController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// ///////////////////
// Debit Account //
// /////////////////

router.post("/transactions/:accountNumber/debit", _transactionController2.default.debitAccount);

// ///////////////////
// Credit Account //
// /////////////////

router.post("/transactions/:accountNumber/credit", _transactionController2.default.creditAccount);

module.exports = router;