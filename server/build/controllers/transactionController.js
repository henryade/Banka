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

/**
 * Transaction Controller Class
 */

var TransactionController = function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "viewSpecificAccountTransaction",

    /**
    * View specific transaction
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */
    value: function viewSpecificAccountTransaction(req, res) {
      var transactions = _dbController2.default.findAllAccountTransactionsByAccountNumber(parseFloat(req.params.accountNumber));
      if (transactions !== undefined) {
        return res.status(200).json({
          status: 200,
          data: transactions
        });
      }
      return res.status(404).json({
        status: 404,
        error: "Invalid Account Number"
      });
    }

    /**
    * View specific transaction
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "viewSpecificTransaction",
    value: function viewSpecificTransaction(req, res) {
      var transaction = _dbController2.default.findTransactionById(Number(req.params.transactionId));
      if (transaction !== undefined) {
        return res.status(200).json({
          status: 200,
          data: transaction
        });
      }
      return res.status(404).json({
        status: 404,
        error: "Invalid Transaction Id"
      });
    }

    /**
    * Credit an account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "creditAccount",
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