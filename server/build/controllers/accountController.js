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
      error: "Invalid account number"
    });
  }

  if (accounts.status === action) {
    return res.status(400).json({
      status: 400,
      error: "Account is ".concat(action)
    });
  }

  accounts.status = action;
  return res.status(200).json({
    status: 200,
    data: accounts
  });
};

var AccountController =
/*#__PURE__*/
function () {
  function AccountController() {
    _classCallCheck(this, AccountController);
  }

  _createClass(AccountController, null, [{
    key: "createAccount",
    value: function createAccount(req, res) {
      if (!req.body.email) {
        return res.status(400).json({
          status: 400,
          error: "email is required"
        });
      }

      if (!req.body.phoneNumber) {
        return res.status(400).json({
          status: 400,
          error: "phone number is required"
        });
      }

      if (!req.body.firstName) {
        return res.status(400).json({
          status: 400,
          error: "first name is required"
        });
      }

      if (!req.body.lastName) {
        return res.status(400).json({
          status: 400,
          error: "last name is required"
        });
      }

      if (!req.body.dob) {
        return res.status(400).json({
          status: 400,
          error: "date of birth is required"
        });
      }

      if (!req.body.address) {
        return res.status(400).json({
          status: 400,
          error: "address is required"
        });
      }

      if (!req.body.type) {
        return res.status(400).json({
          status: 400,
          error: "Account type is required"
        });
      }

      if (!req.body.balance) {
        return res.status(400).json({
          status: 400,
          error: "opening balance is required"
        });
      }

      var lengthOfAccountNumber = 6;
      var bankAccountNumberBranding = 9000000000;
      var id = Math.floor(Math.random() * lengthOfAccountNumber);
      var accountNumber = bankAccountNumberBranding + Math.floor(Math.random() * lengthOfAccountNumber);
      var createdOn = new Date(Date.now());

      var owner = _dbController["default"].findOneUser("email", req.body.email).id;

      _dbController["default"].createAccount(id, accountNumber, createdOn, owner, "active", req.body.firstName, req.body.lastName, req.body.email, req.body.type, req.body.balance, req.body.phoneNumber, req.body.dob, req.body.address);

      var newAccount = _dbController["default"].findAccountById(owner);

      res.status(201).json({
        status: 201,
        data: newAccount
      });
    }
  }, {
    key: "activateAccount",
    value: function activateAccount(req, res) {
      logic("active", req, res);
    }
  }, {
    key: "deactivateAccount",
    value: function deactivateAccount(req, res) {
      // eslint-disable-next-line radix
      logic("dormant", req, res);
    }
  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var specificAccount = _dbController["default"].findAccountByAccountNumber(parseInt(req.params.accountNumber));

      if (!specificAccount) {
        return res.status(404).json({
          status: 404,
          message: "Account Not Found"
        });
      }

      _dbController["default"].deleteAccount(specificAccount);

      var checkAccountData = _dbController["default"].findAccountByAccountNumber(specificAccount);

      if (!checkAccountData) {
        return res.status(200).json({
          status: 200,
          message: "Account Successfully Delete"
        });
      }

      return res.status(400).json({
        status: 400,
        message: "Account still exist"
      });
    }
  }]);

  return AccountController;
}();

var _default = AccountController;
exports["default"] = _default;