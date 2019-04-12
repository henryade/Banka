"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbController = _interopRequireDefault(require("./dbController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logic = function logic(action, req, res) {
  var accounts = _dbController["default"].findAccountByAccountNumber(parseInt(req.params.accountNumber));

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

  if (accounts.status === "dormant") {
    return res.status(400).json({
      status: 400,
      error: "Account is Inactive"
    });
  }

  console.log(req.params.amount);
  var newBalance = accounts.balance + action * parseFloat(req.body.amount);
  var lengthOfTransactionId = 6;
  var id = Math.floor(Math.random() * lengthOfTransactionId);
  var createdOn = new Date(Date.now());
  var type = action === 1 ? "credit" : "debit";

  _dbController["default"].createTransaction(id, createdOn, type, req.params.accountNumber, // cashier,
  req.body.amount, accounts.balance, newBalance, req.body.depositor || null, type === "debit" ? req.body.phoneNumber : null);

  var newTransaction = _dbController["default"].findTransactionById(id);

  return res.status(200).json({
    status: 200,
    data: newTransaction
  });
};

var TransactionController =
/*#__PURE__*/
function () {
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
      var account = _dbController["default"].findAccountByAccountNumber(parseInt(req.params.accountNumber));

      var accountMoney = parseFloat(req.body.amount);

      if (!account) {
        return res.status(400).json({
          status: 400,
          error: "Invalid account number"
        });
      }

      if (account.balance - accountMoney <= 0) {
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

var _default = TransactionController;
exports["default"] = _default;