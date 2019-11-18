"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dbController = _interopRequireDefault(require("./dbController"));

var _auth = require("../utils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    value: function createAccount(req, res) {
      var accountNumber, createdOn, user, owner, balance, newAccount;
      return regeneratorRuntime.async(function createAccount$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_dbController["default"].findAccount(req.body.type, req.body.email));

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
              return regeneratorRuntime.awrap(_dbController["default"].findOneUser(req.body.email));

            case 8:
              user = _context.sent;
              owner = user.id;
              balance = req.body.openingBalance;
              newAccount = {};
              _context.prev = 12;
              _context.next = 15;
              return regeneratorRuntime.awrap(_dbController["default"].createAccount(req.body.email, accountNumber, createdOn, owner, "active", req.body.type, balance));

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
      }, null, null, [[12, 18]]);
    }
    /**
    * Activate or Deactivate an account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "changeAccountStatus",
    value: function changeAccountStatus(req, res) {
      var account, accountUpdate;
      return regeneratorRuntime.async(function changeAccountStatus$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              account = req.account;
              account.status = account.status === "active" ? "dormant" : "active";
              accountUpdate = {};
              _context2.prev = 3;
              _context2.next = 6;
              return regeneratorRuntime.awrap(_dbController["default"].findAccountByStatus(account.status, parseInt(req.params.accountNumber, 10)));

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
      }, null, null, [[3, 9]]);
    }
    /**
    * Delete an account
    * @param {obj} req - request from body
    * @param {obj} res - response to request from body
    * @return {obj}    - returns response object
    */

  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var deleted;
      return regeneratorRuntime.async(function deleteAccount$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_dbController["default"].deleteAccount(parseInt(req.params.accountNumber, 10)));

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
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;