"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbController = require("./dbController");

var _dbController2 = _interopRequireDefault(_dbController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logic = function logic(action, req, res) {
  var accounts = _dbController2.default.findTransactionByAccountNumber(parseInt(req.params.accountNumber));
  var accountStatus = _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber));
  if (!accounts) {
    return res.status(400).json({
      status: 400,
      error: "Invalid Account Number"
    });
  }
  if (!req.body.amount) {
    return res.status(400).json({
      status: 400,
      error: "Amount is required"
    });
  }
  if (Number.isNaN(parseFloat(req.body.amount))) {
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
  var newBalance = accounts.newBalance + parseFloat(req.body.amount) * action;
  var lengthOfTransactionId = 6;
  var id = Math.floor(Math.random() * lengthOfTransactionId);
  var createdOn = new Date(Date.now());
  var type = action === 1 ? "credit" : "debit";

  _dbController2.default.createTransaction(id, createdOn, type, req.params.accountNumber,
  // cashier,
  req.body.amount, accounts.newBalance, newBalance, req.body.depositor || null, type === "debit" ? req.body.phoneNumber : null);
  var newTransaction = _dbController2.default.findTransactionById(id);

  return res.status(200).json({
    status: 200,
    data: newTransaction
  });
};

var TransactionController = function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "creditAccount",
    value: function creditAccount(req, res) {
      return logic(1, req, res);
    }
  }, {
    key: "debitAccount",
    value: function debitAccount(req, res) {
      var account = _dbController2.default.findTransactionByAccountNumber(parseInt(req.params.accountNumber));
      var accountMoney = parseFloat(req.body.amount);
      if (!account) {
        return res.status(400).json({
          status: 400,
          error: "Invalid account number"
        });
      }
      if (account.newBalance - accountMoney <= 0) {
        return res.status(400).json({
          status: 400,
          error: "Low Funds. Account cant be Debited"
        });
      }
      return logic(-1, req, res);
    }
  }]);

  return TransactionController;
}();

exports.default = TransactionController;