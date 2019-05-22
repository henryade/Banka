"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dbController = require("../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

var _email = require("./email");

var _email2 = _interopRequireDefault(_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */

/* istanbul ignore logic */
var logic = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action, req, res) {
    var account, amount, newBalance, createdOn, type, depositor, phoneNumber, cashier, newTransaction, person, email, name, message;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber, 10));

          case 2:
            account = _context.sent;
            amount = parseFloat(req.body.amount);

            if (account) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: "Invalid Account Number"
            }));

          case 6:
            if (!(account.status === "dormant")) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: "Account is Inactive"
            }));

          case 8:
            if (!(action === -1 && account.balance - amount <= 0)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: "Low Funds. Account cant be Debited"
            }));

          case 10:
            newBalance = Number.parseFloat(parseFloat(account.balance) + amount * action).toFixed(2);
            createdOn = new Date(Date.now());
            type = action === 1 ? "credit" : "debit";
            depositor = req.body.depositor || "self";
            phoneNumber = req.body.depositorPhoneNumber || "self";
            cashier = req.userData.id;

            _dbController2.default.updateBalance(newBalance, parseInt(req.params.accountNumber, 10));

            newTransaction = {};
            _context.prev = 18;
            _context.next = 21;
            return _dbController2.default.createTransaction(createdOn, type, req.params.accountNumber, cashier, parseFloat(amount), parseFloat(account.balance), newBalance, depositor, phoneNumber);

          case 21:
            newTransaction = _context.sent;
            _context.next = 27;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](18);
            return _context.abrupt("return", res.status(400).json({
              status: 400,
              error: "Error Occured"
            }));

          case 27:
            _context.next = 29;
            return _dbController2.default.findOwner(account.owner);

          case 29:
            person = _context.sent;
            email = person.email;
            name = (person.lastName + " " + person.firstName).toUpperCase();
            message = _email2.default.message(_extends({ name: name, email: email }, newTransaction));

            _email2.default.sendMail(message);

            return _context.abrupt("return", res.status(200).json({
              status: 200,
              data: newTransaction
            }));

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[18, 24]]);
  }));

  return function logic(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = logic;