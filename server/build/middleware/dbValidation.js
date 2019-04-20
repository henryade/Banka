"use strict";

var _dbController = require("../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = function error(res, status, msg) {
  return res.status(status).json({
    status: status,
    error: msg
  });
};

module.exports = {
  accountCheck: function accountCheck(req, res, next) {
    var account = _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber));
    if (!account) {
      return error(res, 400, "Invalid account number");
    }
    req.account = account;
    next();
  },
  checkUser: function checkUser(req, res, next) {
    var User = _dbController2.default.findOneUser("email", req.body.email);
    if (User) {
      return error(res, 400, "email already exist");
    }
    next();
  },
  checkStaff: function checkStaff(req, res, next) {
    var User = _dbController2.default.findStaff("email", req.body.email);
    if (User) {
      return error(res, 400, "email already exist");
    }
    next();
  },
  signin: function signin(req, res, next) {
    var staff = _dbController2.default.findStaff("email", req.body.email);
    var User = _dbController2.default.findOneUser("email", req.body.email);
    if (staff) {
      req.body.User = staff;
    } else if (User) {
      req.body.User = User;
    } else {
      return error(res, 401, "Auth failed");
    }
    next();
  },
  db: function db(req, res, next) {
    req.body.datafield = _dbController2.default.getAccounts();
    // if (req.body.datafield.length === 0) {
    //   return error(res, 404, "Database Error");
    // }
    if (req.query.status) {
      req.body.datafield = _dbController2.default.findAllAccountByStatus(req.query.status);
    }
    next();
  },
  email: function email(req, res, next) {
    if (_dbController2.default.findAccountByEmail(req.params.email).length === 0) {

      return error(res, 400, "Email not found");
    }
    next();
  }
};