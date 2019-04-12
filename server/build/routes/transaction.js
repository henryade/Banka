"use strict";

var _express = _interopRequireDefault(require("express"));

var _transactionController = _interopRequireDefault(require("../controllers/transactionController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // ///////////////////
// Debit Account //
// /////////////////


router.post("/transactions/:accountNumber/debit", _transactionController["default"].debitAccount); // ///////////////////
// Credit Account //
// /////////////////

router.post("/transactions/:accountNumber/credit", _transactionController["default"].creditAccount);
module.exports = router;