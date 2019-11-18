"use strict";

var _dbController = _interopRequireDefault(require("../controllers/dbController"));

var _db = _interopRequireDefault(require("../models/db/db"));

var _controller = require("../models/controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var error = function error(res, status, msg) {
  return res.status(status).json({
    status: status,
    error: msg
  });
};

exports.accountCheck = function _callee(req, res, next) {
  var account;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_dbController["default"].findAccountByAccountNumber(parseInt(req.params.accountNumber, 10)));

        case 2:
          account = _context.sent;

          if (account) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", error(res, 404, "Account Not Found"));

        case 5:
          req.account = account;
          next();
          return _context.abrupt("return", null);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.checkUser = function _callee2(req, res, next) {
  var User;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_dbController["default"].findOneUser(req.body.email));

        case 2:
          User = _context2.sent;

          if (!User) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", error(res, 400, "email already exist"));

        case 5:
          next();
          return _context2.abrupt("return", null);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.checkStaff = function _callee3(req, res, next) {
  var User;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_dbController["default"].findStaff(req.body.email, "staff"));

        case 2:
          User = _context3.sent;

          if (!User) {
            _context3.next = 5;
            break;
          }

          return _context3.abrupt("return", error(res, 400, "email already exist"));

        case 5:
          next();
          return _context3.abrupt("return", null);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.signin = function _callee4(req, res, next) {
  var User;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_db["default"].queryDb(_controller.DBQUERY.SELECT.USER.EMAIL([req.body.email])));

        case 2:
          User = _context4.sent;

          if (!(User === undefined)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", error(res, 401, "Incorrect email or password"));

        case 5:
          req.body.User = User;
          next();
          return _context4.abrupt("return", null);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.uploadImage = function _callee5(req, res, next) {
  var _ref, email, User;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _ref = req.body.email ? req.body : req.userData, email = _ref.email;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_db["default"].queryDb(_controller.DBQUERY.SELECT.USER.EMAIL([email])));

        case 3:
          User = _context5.sent;

          if (!(User === undefined)) {
            _context5.next = 6;
            break;
          }

          return _context5.abrupt("return", error(res, 400, "email does not exist"));

        case 6:
          if (!req.userData) req.User = User;
          next();
          return _context5.abrupt("return", null);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.db = function _callee6(req, res, next) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_dbController["default"].getAccounts([req.query.status]));

        case 3:
          req.body.datafield = _context6.sent;
          _context6.next = 9;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(400).json({
            status: 400,
            err: _context6.t0
          }));

        case 9:
          next();
          return _context6.abrupt("return", null);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.email = function _callee7(req, res, next) {
  var response;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_dbController["default"].findAccountByEmail(req.params.email));

        case 2:
          response = _context7.sent;

          if (!(response.length === 0 || response[0] === undefined)) {
            _context7.next = 5;
            break;
          }

          return _context7.abrupt("return", error(res, 404, "Email not found"));

        case 5:
          next();
          return _context7.abrupt("return", null);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
};