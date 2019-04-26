"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _config = require("../config");

var _dbController = require("./dbController");

var _dbController2 = _interopRequireDefault(_dbController);

var _auth = require("../utils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var salt = 10;

/**
 * User Controller Class
 */

var UserController = function () {
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
      _bcryptjs2.default.compare(req.body.password, req.body.User.password, function (err, response) {
        if (response) {
          var token = _jsonwebtoken2.default.sign(req.body, _config.JWT_KEY);
          // const { password, ...user } = req.body;
          // const User = { token, ...user };
          var User = req.body.User;

          return res.status(200).json({
            status: 200,
            data: {
              token: token,
              firstName: User.firstName,
              lastName: User.lastName,
              email: User.email,
              type: User.type,
              isAdmin: User.isAdmin
            }
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
      var _this = this;

      _bcryptjs2.default.hash(req.body.password, salt, function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err, hash) {
          var newUser;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  newUser = {};
                  _context.prev = 1;
                  _context.next = 4;
                  return _dbController2.default.createUser(req.body.firstName, req.body.lastName, req.body.email, hash, "client", false);

                case 4:
                  newUser = _context.sent;
                  return _context.abrupt("return", res.status(201).json({
                    status: 201,
                    data: newUser
                  }));

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](1);
                  return _context.abrupt("return", res.status(400).json({
                    status: 400,
                    error: _context.t0
                  }));

                case 11:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this, [[1, 8]]);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "createUser",
    value: function createUser(req, res) {
      var _this2 = this;

      var plainPassword = (0, _auth.generateRandomPassword)();
      var isAdmin = req.body.userType === "admin";

      _bcryptjs2.default.hash(plainPassword, salt, function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, hash) {
          var newStaff;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _dbController2.default.createUser(req.body.firstName, req.body.lastName, req.body.email, hash, "staff", isAdmin);

                case 2:
                  newStaff = _context2.sent;
                  return _context2.abrupt("return", res.status(201).json({
                    status: 201,
                    plainPassword: plainPassword,
                    data: newStaff
                  }));

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "getAccounts",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = res.status(200);
                _context3.next = 3;
                return _dbController2.default.findAccountByEmail(req.params.email);

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
        }, _callee3, this);
      }));

      function getAccounts(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return getAccounts;
    }()
  }]);

  return UserController;
}();

exports.default = UserController;