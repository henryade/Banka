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
      var lengthOfAccountNumber = 6;
      var bankAccountNumberBranding = 9000000000;
      var id = Math.ceil(Math.random() * lengthOfAccountNumber);
      var accountNumber = bankAccountNumberBranding + Math.floor(Math.random() * lengthOfAccountNumber);
      var createdOn = new Date(Date.now());
      var owner = _dbController2.default.findOneUser("email", req.body.email).id;

      if (_dbController2.default.findAccount("owner", owner, "type", req.body.type)) {
        return res.status(400).json({
          status: 400,
          error: "Account Exists"
        });
      }
      _dbController2.default.createAccount(id, accountNumber, createdOn, owner, req.body.gender, "active", req.body.firstName, req.body.lastName, req.body.email, req.body.type, req.body.balance, req.body.phoneNumber, req.body.dob, req.body.address);

      res.status(201).json({
        status: 201,
        data: _dbController2.default.findAccount("owner", owner, "type", req.body.type)
      });
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
      var accounts = req.account;
      accounts.status = accounts.status === "active" ? "dormant" : "active";
      _dbController2.default.updateDB("ACCOUNTS", accounts, accounts.status, "status");
      return res.status(200).json({
        status: 200,
        data: _dbController2.default.findAccountByAccountNumber(accounts.accountNumber)
      });
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
      var specificAccount = req.account;

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