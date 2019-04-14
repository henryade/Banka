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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var salt = 10;

var UserController = function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "signin",
    value: function signin(req, res) {
      if (!req.body.email) {
        return res.status(400).json({
          status: 400,
          error: "email is required"
        });
      }
      if (!req.body.password) {
        return res.status(400).json({
          status: 400,
          error: "password is required"
        });
      }
      var User = _dbController2.default.findOneUser("email", req.body.email);
      if (!User) {
        return res.status(401).json({
          status: 401,
          error: "Auth failed"
        });
      }
      _bcryptjs2.default.compare(req.body.password, User.password, function (err, response) {
        if (response) {
          var token = _jsonwebtoken2.default.sign({
            email: User.email,
            id: User.id,
            firstName: User.firstName,
            lastName: User.lastName,
            type: User.type,
            isAdmin: User.isAdmin
          }, _config.JWT_KEY);
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
        return res.status(401).json({
          status: 401,
          error: "Auth failed"
        });
      });
    }
  }, {
    key: "signup",
    value: function signup(req, res) {
      if (!req.body.email) {
        return res.status(400).json({
          status: 400,
          error: "email is required"
        });
      }
      if (!req.body.password) {
        return res.status(400).json({
          status: 400,
          error: "password is required"
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
      if (!req.body.confirmPassword || req.body.password !== req.body.confirmPassword) {
        return res.status(401).json({
          status: 401,
          error: "passwords do not match"
        });
      }
      var User = _dbController2.default.findOneUser("email", req.body.email);
      if (User) {
        return res.status(400).json({
          status: 400,
          error: "email already exist"
        });
      }

      _bcryptjs2.default.hash(req.body.password, salt, function (err, hash) {
        var allUser = _dbController2.default.getUsers().map(function (x) {
          return x.id;
        }).sort();
        var id = allUser[allUser.length - 1] + 1;

        var token = _jsonwebtoken2.default.sign({
          email: req.body.email,
          id: id,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          type: "client",
          isAdmin: false
        }, _config.JWT_KEY);
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
  }]);

  return UserController;
}();

exports.default = UserController;