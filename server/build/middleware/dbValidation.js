"use strict";

var _dbController = require("../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

var _db = require("../models/db/db");

var _db2 = _interopRequireDefault(_db);

var _controller = require("../models/controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var error = function error(res, status, msg) {
  return res.status(status).json({
    status: status,
    error: msg
  });
};

exports.accountCheck = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var account;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _dbController2.default.findAccountByAccountNumber(parseInt(req.params.accountNumber, 10));

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
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.checkUser = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var User;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _dbController2.default.findOneUser(req.body.email);

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
    }, _callee2, undefined);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
exports.checkStaff = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var User;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _dbController2.default.findStaff(req.body.email, "staff");

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
    }, _callee3, undefined);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();
exports.signin = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var User;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _db2.default.queryDb(_controller.DBQUERY.SELECT.USER.EMAIL([req.body.email]));

          case 2:
            User = _context4.sent;

            if (!(User === undefined)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", error(res, 401, "Auth failed"));

          case 5:
            req.body.User = User;
            next();
            return _context4.abrupt("return", null);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();
exports.db = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _dbController2.default.getAccounts([req.query.status]);

          case 3:
            res.body.datafield = _context5.sent;
            _context5.next = 9;
            break;

          case 6:
            _context5.prev = 6;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(400).json({
              status: 400,
              err: _context5.t0
            }));

          case 9:
            next();
            return _context5.abrupt("return", null);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 6]]);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();
exports.email = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
    var response;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _dbController2.default.findAccountByEmail(req.params.email);

          case 2:
            response = _context6.sent;

            if (!(response.length === 0 || response[0] === undefined)) {
              _context6.next = 5;
              break;
            }

            return _context6.abrupt("return", error(res, 404, "Email not found"));

          case 5:
            next();
            return _context6.abrupt("return", null);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}();