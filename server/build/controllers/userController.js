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

var JWT_KEY = "andela";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var User = req.body.User;

      _bcryptjs2.default.compare(req.body.password, User.password, function (err, response) {
        if (response) {

          var token = _jsonwebtoken2.default.sign({
            email: User.email,
            id: User.id,
            firstName: User.firstName,
            lastName: User.lastName,
            type: User.type,
            isAdmin: User.isAdmin
          }, JWT_KEY);
          return res.status(200).json({
            status: 200,
            data: {
              token: token,
              id: User.id,
              firstName: User.firstName,
              lastName: User.lastName,
              password: User.password,
              type: User.type,
              isAdmin: User.isAdmin
            }
          });
        }
        // return res.status(401).json({
        //   status: 401, 
        //   error: "Auth failed",
        // });
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
      _bcryptjs2.default.hash(req.body.password, salt, function (err, hash) {
        var id = (0, _auth.generateId)("client");

        var token = _jsonwebtoken2.default.sign({
          email: req.body.email,
          id: id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          type: "client",
          isAdmin: false
        }, JWT_KEY);
        _dbController2.default.createUser(token, id, req.body.firstName, req.body.lastName, req.body.email, hash, "client", false);
        var newUser = _dbController2.default.findOneUser("id", id);

        return res.status(201).json({
          status: 201,
          data: {
            token: newUser.token,
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            type: newUser.type,
            isAdmin: newUser.isAdmin
          }
        });
      });
    }
  }, {
    key: "createUser",
    value: function createUser(req, res) {
      var plainPassword = (0, _auth.generateRandomPassword)();
      var id = req.body.userType === "admin" ? (0, _auth.generateId)() : (0, _auth.generateId)("staff");
      var isAdmin = req.body.userType === "admin";

      _bcryptjs2.default.hash(plainPassword, salt, function (err, hash) {
        var token = _jsonwebtoken2.default.sign({
          email: req.body.email,
          id: id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          type: "staff",
          isAdmin: isAdmin
        }, JWT_KEY);
        _dbController2.default.createUser(token, id, req.body.firstName, req.body.lastName, req.body.email, hash, "staff", isAdmin);

        var newStaff = _dbController2.default.findStaff("id", id);

        return res.status(201).json({
          status: 201,
          plainPassword: plainPassword,
          data: newStaff
        });
      });
    }
  }, {
    key: "getAccounts",
    value: function getAccounts(req, res) {
      return res.status(200).json({
        status: 200,
        data: _dbController2.default.findAccountByEmail(req.params.email)
      });
    }
  }]);

  return UserController;
}();

exports.default = UserController;