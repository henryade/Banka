"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _transactionController = _interopRequireDefault(require("../controllers/transactionController"));

var _authorization = _interopRequireDefault(require("../middleware/authorization"));

var _validation = _interopRequireDefault(require("../middleware/validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // /////////////////////////////
// View a  all Account's Transactions //
// ///////////////////////////


router.get("/accounts/:accountNumber/transactions", _authorization["default"].user, _transactionController["default"].viewAllAccountTransaction); // /////////////////////////////
// View Specific Transaction //
// ///////////////////////////

router.get("/transactions/:transactionId", _validation["default"].transaction, _authorization["default"].user, _transactionController["default"].viewSpecificTransaction); // ///////////////////
// Debit Account //
// /////////////////

router.post("/transactions/:accountNumber/debit", _authorization["default"].staff, _validation["default"].debitAccount, _transactionController["default"].debitAccount); // ///////////////////
// Credit Account //
// /////////////////

router.post("/transactions/:accountNumber/credit", _authorization["default"].staff, _validation["default"].creditAccount, _transactionController["default"].creditAccount);
var _default = router;
exports["default"] = _default;