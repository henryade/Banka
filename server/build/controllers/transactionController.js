"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbController = require("./dbController");

var _dbController2 = _interopRequireDefault(_dbController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */
var logic = function logic(action, req, res) {
  var accounts = _dbController2.default.findTransactionByAccountNumber(parseInt(req.params.accountNumber));
  var accountStatus = _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber));
  var amount = parseFloat(req.body.amount);

  if (!accounts || !accountStatus) {
    return res.status(400).json({
      status: 400,
      error: "Invalid Account Number"
    });
  }
  if (action === -1 && accounts.newBalance - amount <= 0) {
    return res.status(400).json({
      status: 400,
      error: "Low Funds. Account cant be Debited"
    });
  }

  if (Number.isNaN(amount)) {
    return res.status(400).json({
      status: 400,
      error: "Amount is Invalid"
    });
  }
  if (accountStatus.status === "dormant") {
    return res.status(400).json({
      status: 400,
      error: "Account is Inactive"
    });
  }
  var newBalance = accounts.newBalance + amount * action;
  var lengthOfTransactionId = 6;
  var id = Math.floor(Math.random() * lengthOfTransactionId);
  var createdOn = new Date(Date.now());
  var type = action === 1 ? "credit" : "debit";
  var depositor = req.body.depositor || null;
  var phoneNumber = req.body.depositorPhoneNumber || null;

  // if (!data.findTransactionByAccountNumber(req.params.accountNumber)) {
  _dbController2.default.createTransaction(id, createdOn, type, req.params.accountNumber,
  // req.userData.id,
  amount, accounts.newBalance, newBalance, depositor, phoneNumber);
  // } else {
  //   data.updateTransactionDB(req.params.accountNumber, {amount, newBalance: accounts.newBalance, newBalance });
  //   if (type === "debit") data.updateTransactionDB(req.params.accountNumber, { depositor, phoneNumber });
  // }
  var newTransaction = _dbController2.default.findTransactionById(id);
  return res.status(200).json({
    status: 200,
    data: newTransaction
  });
};

/**
 * Transaction Controller Class
 */

var TransactionController = function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "creditAccount",

    /**
    * Credit an account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */
    value: function creditAccount(req, res) {
      return logic(1, req, res);
    }

    /**
    * Debit an Account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "debitAccount",
    value: function debitAccount(req, res) {
      return logic(-1, req, res);
    }
  }]);

  return TransactionController;
}();

exports.default = TransactionController;