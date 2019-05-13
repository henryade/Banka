"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbController = require("./dbController");

var _dbController2 = _interopRequireDefault(_dbController);

var _transactionLogic = require("../utils/transactionLogic");

var _transactionLogic2 = _interopRequireDefault(_transactionLogic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Transaction Controller Class
 */

var TransactionController = function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "viewAllAccountTransaction",

    /**
    * View specific transaction
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var transactions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dbController2.default.findAllAccountTransactionsByAccountNumber(parseInt(req.params.accountNumber, 10));

              case 2:
                transactions = _context.sent;

                if (!(transactions.length !== 0)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", res.status(200).json({
                  status: 200,
                  data: transactions
                }));

              case 5:
                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: "Invalid Account Number"
                }));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function viewAllAccountTransaction(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return viewAllAccountTransaction;
    }()

    /**
    * View specific transaction
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "viewSpecificTransaction",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var transaction;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dbController2.default.findTransactionById(Number(req.params.transactionId));

              case 2:
                transaction = _context2.sent;

                if (!(transaction !== undefined)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  data: transaction
                }));

              case 5:
                return _context2.abrupt("return", res.status(404).json({
                  status: 404,
                  error: "Transaction Id Not Found"
                }));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function viewSpecificTransaction(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return viewSpecificTransaction;
    }()

    /**
    * Credit an account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "creditAccount",
    value: function creditAccount(req, res) {
      return (0, _transactionLogic2.default)(1, req, res);
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
      return (0, _transactionLogic2.default)(-1, req, res);
    }
  }]);

  return TransactionController;
}();

exports.default = TransactionController;