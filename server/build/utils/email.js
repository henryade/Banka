"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Email = function () {
  function Email() {
    _classCallCheck(this, Email);
  }

  _createClass(Email, null, [{
    key: "transport",
    value: function transport() {
      return _nodemailer2.default.createTransport({
        service: "gmail",
        port: 465,
        host: "smtp.gmail.com",
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: process.env.REFRESH_TOKEN
        }
      });
    }
  }, {
    key: "sendMail",
    value: function sendMail(message) {
      Email.transport().sendMail(message, function (err, info) {
        if (err) {
          console.log(err);
        }
        console.log("success");
      });
    }
  }]);

  return Email;
}();

exports.default = Email;