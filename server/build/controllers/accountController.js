"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dbController = require("./dbController");

var _dbController2 = _interopRequireDefault(_dbController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AccountController = function () {
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
      var owner = _dbController2.default.findOneUser("email", req.body.email).id;

      _dbController2.default.createAccount(id, accountNumber, createdOn, owner, "active", req.body.firstName, req.body.lastName, req.body.email, req.body.type, req.body.balance, req.body.phoneNumber, req.body.dob, req.body.address);
      var newAccount = _dbController2.default.findAccountById(owner);

      res.status(201).json({
        status: 201,
        data: newAccount
      });
    }
  }, {
    key: "changeAccountStatus",
    value: function changeAccountStatus(req, res) {
      var accounts = _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber));
      if (!accounts) {
        return res.status(400).json({
          status: 400,
          error: "Invalid account number"
        });
      }
      accounts.status = accounts.status === "active" ? "dormant" : "active";
      return res.status(200).json({
        status: 200,
        data: accounts
      });
    }
  }, {
    key: "deleteAccount",
    value: function deleteAccount(req, res) {
      var specificAccount = _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber));
      if (!specificAccount) {
        return res.status(404).json({
          status: 404,
          message: "Account Not Found"
        });
      }

      _dbController2.default.deleteAccount(specificAccount);
      var checkAccountData = _dbController2.default.findAccountByAccountNumber(specificAccount);
      if (!checkAccountData) {
        return res.status(200).json({
          status: 200,
          message: "Account Successfully Delete"
        });
      }
    }
  }]);

  return AccountController;
}();

exports.default = AccountController;