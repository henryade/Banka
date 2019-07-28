"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbController = _interopRequireDefault(require("./dbController"));

var _auth = require("../utils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "viewAllAccount",

    /**
     * View all bank accounts
     * @param {obj} req - request from body
     * @param {obj} res - response to request from body
     * @return {obj}    - returns response object
     */
    value: function viewAllAccount(req, res) {
      return res.status(200).json({
        status: 200,
        data: req.body.datafield
      });
    }
    /**
    * View specific bank accounts
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "viewSpecificAccount",
    value: function viewSpecificAccount(req, res) {
      return res.status(200).json({
        status: 200,
        data: req.account
      });
    }
    /**
    * Create a bank account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "createAccount",
    value: function () {
      var _createAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var accountNumber, createdOn, user, owner, balance, newAccount;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dbController["default"].findAccount(req.body.type, req.body.email);

              case 2:
                if (!_context.sent) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: "Account Exists"
                }));

              case 4:
                accountNumber = (0, _auth.generateAccountNumber)();
                createdOn = new Date(Date.now());
                _context.next = 8;
                return _dbController["default"].findOneUser(req.body.email);

              case 8:
                user = _context.sent;
                owner = user.id;
                balance = req.body.openingBalance;
                newAccount = {};
                _context.prev = 12;
                _context.next = 15;
                return _dbController["default"].createAccount(req.body.email, accountNumber, createdOn, owner, "active", req.body.type, balance);

              case 15:
                newAccount = _context.sent;
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](12);
                return _context.abrupt("return", res.status(400).json({
                  status: 400,
                  error: "Error Occured"
                }));

              case 21:
                return _context.abrupt("return", res.status(201).json({
                  status: 201,
                  data: newAccount
                }));

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[12, 18]]);
      }));

      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }

      return createAccount;
    }()
    /**
    * Activate or Deactivate an account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "changeAccountStatus",
    value: function () {
      var _changeAccountStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var account, accountUpdate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                account = req.account;
                account.status = account.status === "active" ? "dormant" : "active";
                accountUpdate = {};
                _context2.prev = 3;
                _context2.next = 6;
                return _dbController["default"].findAccountByStatus(account.status, parseInt(req.params.accountNumber, 10));

              case 6:
                accountUpdate = _context2.sent;
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);
                return _context2.abrupt("return", res.status(400).json({
                  status: 400,
                  error: _context2.t0
                }));

              case 12:
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  data: accountUpdate
                }));

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 9]]);
      }));

      function changeAccountStatus(_x3, _x4) {
        return _changeAccountStatus.apply(this, arguments);
      }

      return changeAccountStatus;
    }()
    /**
    * Delete an account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "deleteAccount",
    value: function () {
      var _deleteAccount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var deleted;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _dbController["default"].deleteAccount(parseInt(req.params.accountNumber, 10));

              case 2:
                deleted = _context3.sent;

                if (!deleted) {
                  _context3.next = 5;
                  break;
                }

                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: "Account Successfully Delete"
                }));

              case 5:
                return _context3.abrupt("return", null);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function deleteAccount(_x5, _x6) {
        return _deleteAccount.apply(this, arguments);
      }

      return deleteAccount;
    }()
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;