"use strict";

var _dbController = _interopRequireDefault(require("../controllers/dbController"));

var _db = _interopRequireDefault(require("../models/db/db"));

var _controller = require("../models/controller");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var error = function error(res, status, msg) {
  return res.status(status).json({
    status: status,
    error: msg
  });
};

exports.accountCheck =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var account;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _dbController["default"].findAccountByAccountNumber(parseInt(req.params.accountNumber, 10));

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
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkUser =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var User;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _dbController["default"].findOneUser(req.body.email);

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
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.checkStaff =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res, next) {
    var User;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _dbController["default"].findStaff(req.body.email, "staff");

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
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.signin =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res, next) {
    var User;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _db["default"].queryDb(_controller.DBQUERY.SELECT.USER.EMAIL([req.body.email]));

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
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.uploadImage =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res, next) {
    var _ref6, email, User;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _ref6 = req.body.email ? req.body : req.userData, email = _ref6.email;
            _context5.next = 3;
            return _db["default"].queryDb(_controller.DBQUERY.SELECT.USER.EMAIL([email]));

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
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.db =
/*#__PURE__*/
function () {
  var _ref7 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res, next) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _dbController["default"].getAccounts([req.query.status]);

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
    }, _callee6, null, [[0, 6]]);
  }));

  return function (_x16, _x17, _x18) {
    return _ref7.apply(this, arguments);
  };
}();

exports.email =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee7(req, res, next) {
    var response;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _dbController["default"].findAccountByEmail(req.params.email);

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
    }, _callee7);
  }));

  return function (_x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}();