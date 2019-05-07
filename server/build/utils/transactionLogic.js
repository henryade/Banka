"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
<<<<<<< HEAD
=======

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
>>>>>>> ch-refactor-165853483

var _dbController = require("../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

<<<<<<< HEAD
var _auth = require("./auth");

=======
>>>>>>> ch-refactor-165853483
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
var logic = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(action, req, res) {
<<<<<<< HEAD
    var account, amount, newBalance, createdOn, type, depositor, phoneNumber, cashier, newTransaction, message;
=======
    var account, amount, newBalance, createdOn, type, depositor, phoneNumber, cashier, newTransaction, person, email, name, message;
>>>>>>> ch-refactor-165853483
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
<<<<<<< HEAD
            return _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber));
=======
            return _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber, 10));
>>>>>>> ch-refactor-165853483

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
<<<<<<< HEAD
            newBalance = parseFloat(account.balance) + amount * action;
=======
            newBalance = Number.parseFloat(parseFloat(account.balance) + amount * action).toFixed(2);
>>>>>>> ch-refactor-165853483
            createdOn = new Date(Date.now());
            type = action === 1 ? "credit" : "debit";
            depositor = req.body.depositor || "self";
            phoneNumber = req.body.depositorPhoneNumber || "self";
            cashier = req.userData.id;

<<<<<<< HEAD

            _dbController2.default.updateBalance(newBalance, parseInt(req.params.accountNumber));
=======
            _dbController2.default.updateBalance(newBalance, parseInt(req.params.accountNumber, 10));
>>>>>>> ch-refactor-165853483

            newTransaction = {};
            _context.prev = 18;
            _context.next = 21;
<<<<<<< HEAD
            return _dbController2.default.createTransaction(createdOn, type, req.params.accountNumber, cashier, amount, parseFloat(account.balance), parseFloat(newBalance), depositor, phoneNumber);
=======
            return _dbController2.default.createTransaction(createdOn, type, req.params.accountNumber, cashier, parseFloat(amount), parseFloat(account.balance), newBalance, depositor, phoneNumber);
>>>>>>> ch-refactor-165853483

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
<<<<<<< HEAD
            message = {
              from: process.env.EMAIL,
              to: "clasiqaas@gmail.com",
              subject: "Transaction Alert",
              html: "<div style=\"font-family:georgia\">\n    <h1 style=\"background-color:#172A3A;color:white;padding-left:20px;border-radius:5% 90% 90% 5%;font-family:Comic Sans MS;\">Banka </h1>\n    <p style=\"padding-bottom:10px;padding-left:5px;\">Dear DAVID FLUSH,</p> \n                        <p style=\"padding-left:15px;\">Banka Bank eLectronic Notification Service (BeNS)\n                        We wish to inform you that a  transaction occurred on your account with us.</p>\n    \n                        <p style=\"padding-left:15px;\">The details of this transaction are shown below:</p>\n                        <p><strong style=\"padding-left:20px;\">Transaction Notification</strong></p>\n                        <div style=\"font-family:Verdana;\">\n        \n     <table style=\"border-collapse:collapse;font-size:14px;margin-left:30px\">\n       <tbody>\n         <tr>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Account Number</strong></td>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\">" + req.params.accountNumber + "</td>\n         </tr>\n         <tr>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Transaction Location</strong></td>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\">Banka, Lagos</td>\n         </tr>\n         <tr>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Type</strong></td>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;text-transform:capitalise;\">" + type + "</td>\n         </tr>\n         <tr>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Amount</strong></td>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\">" + amount + "</td>\n         </tr>\n         <tr>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Date</strong></td>\n           <td style=\"border:2px solid black;padding:10px;text-align:center;\">20-Mar-2019</td>\n         </tr>\n       </tbody>\n                          </table>                     \n                        </div>\n      <div style=\"background-color:#F5DEB3;border-top:1px solid black;margin-top:15px;padding-bottom:5px;\">\n        <p style=\"padding-left:20px;\"><strong>Old Balance <span style=\"display:inline-block;width:40px;padding-left:20px;\"> : </span>" + account.balance + "</strong></p>\n        <p style=\"padding-left:20px;\"><strong>New Balance <span style=\"display:inline-block;width:40px;padding-left:13px;\"> : </span>" + newBalance + "</strong></p> </div>\n                         \n    <p style=\"text-align:center;margin-top:5px;font-size:13px;\"><strong>Thank you for choosing Banka Bank plc</strong></p>\n      </div>"
            };
=======
            _context.next = 29;
            return _dbController2.default.findOwner(account.owner);

          case 29:
            person = _context.sent;
            email = person.email;
            name = (person.lastName + " " + person.firstName).toUpperCase();
            message = _email2.default.message(_extends({ name: name, email: email }, newTransaction));
>>>>>>> ch-refactor-165853483

            _email2.default.sendMail(message);

            return _context.abrupt("return", res.status(200).json({
              status: 200,
              data: newTransaction
            }));

<<<<<<< HEAD
          case 30:
=======
          case 35:
>>>>>>> ch-refactor-165853483
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