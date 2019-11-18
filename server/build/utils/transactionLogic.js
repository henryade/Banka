"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbController = _interopRequireDefault(require("../controllers/dbController"));

var _email = _interopRequireDefault(require("./email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Debit or Credit controller
 * @param {number} action - positve for credit, negative for debit
 * @param {obj} req - request from body
 * @param {obj} res - response to request from body
 * @return {obj}    - returns response object
 */

/* istanbul ignore logic */
var logic = function logic(action, req, res) {
  var account, amount, newBalance, createdOn, type, depositor, phoneNumber, cashier, newTransaction, person, email, name, message;
  return regeneratorRuntime.async(function logic$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_dbController["default"].findAccountByAccountNumber(parseInt(req.params.accountNumber, 10)));

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

          _dbController["default"].updateBalance(newBalance, parseInt(req.params.accountNumber, 10));

          newTransaction = {};
          _context.prev = 18;
          _context.next = 21;
          return regeneratorRuntime.awrap(_dbController["default"].createTransaction(createdOn, type, req.params.accountNumber, cashier, parseFloat(amount), parseFloat(account.balance), newBalance, depositor, phoneNumber));

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
          if (!account) {
            _context.next = 35;
            break;
          }

          _context.next = 30;
          return regeneratorRuntime.awrap(_dbController["default"].findOwner(account.owner));

        case 30:
          person = _context.sent;
          email = person.email;
          name = "".concat(person.lastName, " ").concat(person.firstName).toUpperCase();
          message = _email["default"].message(_objectSpread({
            name: name,
            email: email
          }, newTransaction));

          _email["default"].sendMail(message);

        case 35:
          return _context.abrupt("return", res.status(200).json({
            status: 200,
            data: newTransaction
          }));

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[18, 24]]);
};

var _default = logic;
exports["default"] = _default;