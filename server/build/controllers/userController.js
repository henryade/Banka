"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _dbController = _interopRequireDefault(require("./dbController"));

var _auth = require("../utils/auth");

var _email = _interopRequireDefault(require("../utils/email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var salt = 10;
/**
 * User Controller Class
 */

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signin",

    /**
     * @param {obj} req - request from body
     * @param {obj} res - response to request from body
     * @return {obj}    - returns response object
     */
    value: function signin(req, res) {
      _bcryptjs["default"].compare(req.body.password, req.body.User.password, function (err, response) {
        if (response) {
          var token = _jsonwebtoken["default"].sign({
            id: req.body.User.id,
            firstName: req.body.User.firstName,
            lastName: req.body.User.lastName,
            email: req.body.User.email,
            type: req.body.User.type,
            isAdmin: req.body.User.isAdmin
          }, process.env.JWT_KEY, {
            expiresIn: "10h"
          });

          var _req$body$User = req.body.User,
              password = _req$body$User.password,
              user = _objectWithoutProperties(_req$body$User, ["password"]);

          return res.status(200).json({
            status: 200,
            data: _objectSpread({
              token: token
            }, user)
          });
        }

        return res.status(401).json({
          status: 401,
          error: "Auth failed"
        });
      });
    }
    /**
     * @param {obj} req - request from body
     * @param {obj} res - response to request from body
     * @return {obj}    - returns response object
     */

  }, {
    key: "signup",
    value: function signup(req, res) {
      _bcryptjs["default"].hash(req.body.password, salt,
      /*#__PURE__*/
      function () {
        var _ref = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(err, hash) {
          var isAdmin, type, newUser, _newUser, password, user, token;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  isAdmin = false;
                  type = "client";
                  newUser = {};
                  _context.prev = 3;
                  _context.next = 6;
                  return _dbController["default"].createUser(req.body.firstName.replace(/\s/g, ""), req.body.lastName.replace(/\s/g, ""), req.body.email, hash, type, isAdmin);

                case 6:
                  newUser = _context.sent;
                  _newUser = newUser, password = _newUser.password, user = _objectWithoutProperties(_newUser, ["password"]);
                  token = _jsonwebtoken["default"].sign(user, process.env.JWT_KEY, {
                    expiresIn: "10h"
                  });
                  return _context.abrupt("return", res.status(201).json({
                    status: 201,
                    data: _objectSpread({
                      token: token
                    }, user)
                  }));

                case 12:
                  _context.prev = 12;
                  _context.t0 = _context["catch"](3);
                  return _context.abrupt("return", res.status(400).json({
                    status: 400,
                    error: _context.t0
                  }));

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[3, 12]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "createUser",
    value: function createUser(req, res) {
      var plainPassword = (0, _auth.generateRandomPassword)();
      var isAdmin = req.body.userType === "admin";

      _bcryptjs["default"].hash(plainPassword, salt,
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(err, hash) {
          var newStaff, name, message, _newStaff, password, staff;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  newStaff = {};
                  _context2.prev = 1;
                  _context2.next = 4;
                  return _dbController["default"].createUser(req.body.firstName.replace(/\s/g, ""), req.body.lastName.replace(/\s/g, ""), req.body.email, hash, "staff", isAdmin);

                case 4:
                  newStaff = _context2.sent;
                  _context2.next = 10;
                  break;

                case 7:
                  _context2.prev = 7;
                  _context2.t0 = _context2["catch"](1);
                  return _context2.abrupt("return", res.status(400).json({
                    status: 400,
                    error: _context2.t0
                  }));

                case 10:
                  name = "".concat(req.body.lastName, " ").concat(req.body.firstName);
                  message = _email["default"].staffSignUp(name, req.body.email, plainPassword);

                  _email["default"].sendMail(message);

                  _newStaff = newStaff, password = _newStaff.password, staff = _objectWithoutProperties(_newStaff, ["password"]);
                  return _context2.abrupt("return", res.status(201).json({
                    status: 201,
                    data: staff
                  }));

                case 15:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, null, [[1, 7]]);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "getAccounts",
    value: function () {
      var _getAccounts = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = res.status(200);
                _context3.next = 3;
                return _dbController["default"].findAccountByEmail(req.params.email);

              case 3:
                _context3.t1 = _context3.sent;
                _context3.t2 = {
                  status: 200,
                  data: _context3.t1
                };
                return _context3.abrupt("return", _context3.t0.json.call(_context3.t0, _context3.t2));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAccounts(_x5, _x6) {
        return _getAccounts.apply(this, arguments);
      }

      return getAccounts;
    }()
  }, {
    key: "getUser",
    value: function () {
      var _getUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = res.status(200);
                _context4.next = 3;
                return _dbController["default"].findOneUser(req.params.email);

              case 3:
                _context4.t1 = _context4.sent;
                _context4.t2 = {
                  status: 200,
                  data: _context4.t1
                };
                return _context4.abrupt("return", _context4.t0.json.call(_context4.t0, _context4.t2));

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getUser(_x7, _x8) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(parseInt(req.body.id, 10) !== req.User.id)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", res.status(400).json({
                  status: 400,
                  error: "Bad URL. Reload link from email if not expired"
                }));

              case 2:
                _bcryptjs["default"].compare(req.body.password, req.User.password, function (err, response) {
                  if (response) {
                    return res.status(400).json({
                      status: 400,
                      error: "New password must be different from the old password"
                    });
                  }

                  _bcryptjs["default"].hash(req.body.password, salt,
                  /*#__PURE__*/
                  function () {
                    var _ref3 = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee5(error, hash) {
                      return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                          switch (_context5.prev = _context5.next) {
                            case 0:
                              if (!error) {
                                _context5.next = 2;
                                break;
                              }

                              return _context5.abrupt("return", res.status(400).json({
                                status: 400,
                                error: "Error Occured"
                              }));

                            case 2:
                              _dbController["default"].findUserByEmailAndUpdate(hash, req.body.email);

                              return _context5.abrupt("return", res.status(200).json({
                                status: 200,
                                message: "Password Change Successful"
                              }));

                            case 4:
                            case "end":
                              return _context5.stop();
                          }
                        }
                      }, _callee5);
                    }));

                    return function (_x11, _x12) {
                      return _ref3.apply(this, arguments);
                    };
                  }());

                  return null;
                });

                return _context6.abrupt("return", null);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function reset(_x9, _x10) {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "forgotPassword",
    value: function () {
      var _forgotPassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(req, res) {
        var token, name, message, result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                token = _jsonwebtoken["default"].sign({
                  id: req.User.id,
                  email: req.body.email
                }, process.env.JWT_KEY, {
                  expiresIn: 60 * 60
                });
                name = "".concat(req.User.lastName, " ").concat(req.User.firstName);
                message = _email["default"].resetPassword(token, name, req.body.email);
                _context7.next = 5;
                return _email["default"].sendMail(message);

              case 5:
                result = _context7.sent;

                if (!(result === "Success" || result === undefined)) {
                  _context7.next = 8;
                  break;
                }

                return _context7.abrupt("return", res.status(200).json({
                  status: 200,
                  message: "Email Sent"
                }));

              case 8:
                return _context7.abrupt("return", res.status(400).json({
                  status: 400,
                  error: result
                }));

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function forgotPassword(_x13, _x14) {
        return _forgotPassword.apply(this, arguments);
      }

      return forgotPassword;
    }()
  }, {
    key: "passwordReset",
    value: function () {
      var _passwordReset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(req, res) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _jsonwebtoken["default"].verify(req.params.token, process.env.JWT_KEY,
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee8(err, decoded) {
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            if (!err) {
                              _context8.next = 3;
                              break;
                            }

                            res.send("link expired");
                            return _context8.abrupt("return", null);

                          case 3:
                            res.redirect("https://henryade.github.io/Banka/forgot.html?email=".concat(decoded.email, "&id=").concat(decoded.id));

                          case 4:
                          case "end":
                            return _context8.stop();
                        }
                      }
                    }, _callee8);
                  }));

                  return function (_x17, _x18) {
                    return _ref4.apply(this, arguments);
                  };
                }());

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function passwordReset(_x15, _x16) {
        return _passwordReset.apply(this, arguments);
      }

      return passwordReset;
    }()
  }]);

  return UserController;
}();

var _default = UserController;
exports["default"] = _default;