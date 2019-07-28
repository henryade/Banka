"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbController = _interopRequireDefault(require("./dbController"));

var _transactionLogic = _interopRequireDefault(require("../utils/transactionLogic"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Transaction Controller Class
 */
var TransactionController =
/*#__PURE__*/
function () {
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
      var _viewAllAccountTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var transactions;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dbController["default"].findAllAccountTransactionsByAccountNumber(parseInt(req.params.accountNumber, 10));

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
        }, _callee);
      }));

      function viewAllAccountTransaction(_x, _x2) {
        return _viewAllAccountTransaction.apply(this, arguments);
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
      var _viewSpecificTransaction = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var transaction;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dbController["default"].findTransactionById(Number(req.params.transactionId));

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
        }, _callee2);
      }));

      function viewSpecificTransaction(_x3, _x4) {
        return _viewSpecificTransaction.apply(this, arguments);
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
      return (0, _transactionLogic["default"])(1, req, res);
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
      return (0, _transactionLogic["default"])(-1, req, res);
    }
  }]);

  return TransactionController;
}();

var _default = TransactionController;
exports["default"] = _default;