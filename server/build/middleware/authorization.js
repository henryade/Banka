"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dbController = require("../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

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
};