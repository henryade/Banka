"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dbController = require("../controllers/dbController");
<<<<<<< HEAD
=======

var _dbController2 = _interopRequireDefault(_dbController);
>>>>>>> ch-refactor-165853483

var _dbController2 = _interopRequireDefault(_dbController);

<<<<<<< HEAD
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  staff: function staff(req, res, next) {
    var token = req.headers.authorization.split(" ")[1];
    _jsonwebtoken2.default.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "Not Authorized"
        });
      }
      if (decoded.type !== "staff" || decoded.isAdmin !== false) {
        return res.status(401).json({
          message: "Not Authorized To Access this Site"
        });
      }
      req.userData = decoded;
      next();
    });
    return null;
  },
  staff_admin: function staff_admin(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(407).json({
        message: "Missing Authorization"
      });
    }
    var token = req.headers.authorization.split(" ")[1];
    _jsonwebtoken2.default.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "Not Authorized"
        });
      }
      if (decoded.type !== "staff") {
        return res.status(401).json({
          message: "Not Authorized To Access this Site"
        });
      }
      req.userData = decoded;
      next();
    });
    return null;
  },
  admin: function admin(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(407).json({
        message: "Missing Authorization"
      });
    }
    var token = req.headers.authorization.split(" ")[1];
    _jsonwebtoken2.default.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "Not Authorized"
        });
      }
      if (decoded.isAdmin === false) {
        return res.status(401).json({
          message: "Not Authorized To Access this Site"
        });
      }
      req.userData = decoded;
      next();
      return null;
    });
  },
  user: function user(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(407).json({
        message: "Missing Authorization"
      });
    }
    var token = req.headers.authorization.split(" ")[1];
    _jsonwebtoken2.default.verify(token, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "Not Authorized"
        });
      }
      if (decoded.type !== "client") {
        return res.status(401).json({
          message: "Not Authorized To Access this Site"
        });
      }

      if (req.params.email) {
        if (req.params.email !== decoded.email) {
          return res.status(401).json({
            message: "UnAuthorized User"
          });
        }
      }
      if (req.params.accountNumber) {
        if (_dbController2.default.findAccountByAccountNumber(req.params.accountNumber).owner !== decoded.id) {
          return res.status(401).json({
            message: "UnAuthorized User"
          });
        }
      }
      if (req.params.transactionId) {
        if (_dbController2.default.findTransactionById(req.params.transactionId).accountNumber !== _dbController2.default.findAccountByEmail(decoded.email).accountNumber) {
          return res.status(401).json({
            message: "UnAuthorized User"
          });
        }
      }

      req.userData = decoded;
      next();
      return null;
    });
  }
=======
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.staff = function (req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
  _jsonwebtoken2.default.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Not Authorized"
      });
    }
    if (decoded.type !== "staff" || decoded.isAdmin !== false) {
      return res.status(403).json({
        status: 403,
        message: "Not Authorized To Access this Site"
      });
    }
    req.userData = decoded;
    next();
    return null;
  });
  return null;
};
exports.staff_admin = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(407).json({
      status: 407,
      message: "Missing Authorization"
    });
  }
  var token = req.headers.authorization.split(" ")[1];
  _jsonwebtoken2.default.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Not Authorized"
      });
    }
    if (decoded.type !== "staff") {
      return res.status(403).json({
        status: 403,
        message: "Not Authorized To Access this Site"
      });
    }
    req.userData = decoded;
    next();
    return null;
  });
  return null;
};
exports.admin = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(407).json({
      status: 407,
      message: "Missing Authorization"
    });
  }
  var token = req.headers.authorization.split(" ")[1];
  _jsonwebtoken2.default.verify(token, process.env.JWT_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Not Authorized"
      });
    }
    if (decoded.isAdmin === false) {
      return res.status(403).json({
        status: 403,
        message: "Not Authorized To Access this Site"
      });
    }
    req.userData = decoded;
    next();
    return null;
  });
  return null;
};
exports.user = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(407).json({
      status: 407,
      message: "Missing Authorization"
    });
  }
  var token = req.headers.authorization.split(" ")[1];
  _jsonwebtoken2.default.verify(token, process.env.JWT_KEY, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, decoded) {
      var transactionAccount, tokenAccount;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                status: 401,
                message: "Not Authorized"
              }));

            case 2:
              if (!(decoded.type !== "client")) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(403).json({
                status: 403,
                message: "Not Authorized To Access this Site"
              }));

            case 4:
              if (!req.params.email) {
                _context.next = 7;
                break;
              }

              if (!(req.params.email !== decoded.email)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", res.status(403).json({
                status: 403,
                message: "UnAuthorized User"
              }));

            case 7:
              if (!req.params.accountNumber) {
                _context.next = 10;
                break;
              }

              if (!(_dbController2.default.findAccountByAccountNumber(req.params.accountNumber).owner !== decoded.id)) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(403).json({
                status: 403,
                message: "UnAuthorized User"
              }));

            case 10:
              if (!req.params.transactionId) {
                _context.next = 21;
                break;
              }

              _context.next = 13;
              return _dbController2.default.findTransactionById(req.params.transactionId);

            case 13:
              transactionAccount = _context.sent;

              if (!(transactionAccount === undefined)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(400).json({
                status: 400,
                error: "Invalid Transaction Id"
              }));

            case 16:
              _context.next = 18;
              return _dbController2.default.findAccountByEmail(decoded.email);

            case 18:
              tokenAccount = _context.sent;

              if (!(transactionAccount.accountNumber !== tokenAccount[0].accountNumber)) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", res.status(403).json({
                status: 403,
                message: "UnAuthorized User"
              }));

            case 21:

              req.userData = decoded;
              next();
              return _context.abrupt("return", null);

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  return null;
>>>>>>> ch-refactor-165853483
};