"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logic = undefined;

var _dbController = require("../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
var logic = exports.logic = function logic(action, req, res) {
  var account = _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber));
  var amount = parseFloat(req.body.amount);

  if (!account) {
    return res.status(400).json({
      status: 400,
      error: "Invalid Account Number"
    });
  }

  if (account.status === "dormant") {
    return res.status(400).json({
      status: 400,
      error: "Account is Inactive"
    });
  }
  if (action === -1 && account.balance - amount <= 0) {
    return res.status(400).json({
      status: 400,
      error: "Low Funds. Account cant be Debited"
    });
  }

  var newBalance = account.balance + amount * action;
  var lengthOfTransactionId = 6;
  var id = Math.floor(Math.random() * lengthOfTransactionId);
  var createdOn = new Date(Date.now());
  var type = action === 1 ? "credit" : "debit";
  var depositor = req.body.depositor || "self";
  var phoneNumber = req.body.depositorPhoneNumber || "self";
  _dbController2.default.updateAccountDB(parseInt(req.params.accountNumber), "balance", newBalance);

  _dbController2.default.createTransaction(id, createdOn, type, req.params.accountNumber,
  // req.userData.id,
  amount, account.balance, newBalance, depositor, phoneNumber);

  var newTransaction = _dbController2.default.findTransactionById(id);
  return res.status(200).json({
    status: 200,
    data: newTransaction
  });
};