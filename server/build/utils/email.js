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
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    }
  }, {
    key: "sendMail",
    value: function sendMail(mail) {
      Email.transport().sendMail(mail, function (err) {
        if (err) {
          return err;
        }
        return null;
      });
    }
  }, {
    key: "message",
    value: function message(transaction) {
      return {
        from: process.env.EMAIL,
        to: transaction.email,
        subject: "Transaction Alert",
        html: "<div style=\"font-family:georgia\">\n      <h1 style=\"background-color:#172A3A;color:white;padding-left:20px;border-radius:5% 90% 90% 5%;font-family:Comic Sans MS;\">Banka </h1>\n      <p style=\"padding-bottom:10px;padding-left:5px;\">Dear " + transaction.name + ",</p> \n                          <p style=\"padding-left:15px;\">Banka Bank eLectronic Notification Service (BeNS)\n                          We wish to inform you that a  transaction occurred on your account with us.</p>\n      \n                          <p style=\"padding-left:15px;\">The details of this transaction are shown below:</p>\n                          <p><strong style=\"padding-left:20px;\">Transaction Notification</strong></p>\n                          <div style=\"font-family:Verdana;\">\n          \n       <table style=\"border-collapse:collapse;font-size:14px;margin-left:30px\">\n         <tbody>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Account Number</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\">" + transaction.accountNumber + "</td>\n           </tr>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Transaction Location</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\">Banka, Lagos</td>\n           </tr>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Type</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;text-transform:capitalise;\">" + transaction.type + "</td>\n           </tr>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Amount</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\">" + transaction.amount + "</td>\n           </tr>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Date</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\">20-Mar-2019</td>\n           </tr>\n         </tbody>\n                            </table>                     \n                          </div>\n        <div style=\"background-color:#F5DEB3;border-top:1px solid black;margin-top:15px;padding-bottom:5px;\">\n          <p style=\"padding-left:20px;\"><strong>Old Balance <span style=\"display:inline-block;width:40px;padding-left:20px;\"> : </span>" + transaction.oldbalance + "</strong></p>\n          <p style=\"padding-left:20px;\"><strong>New Balance <span style=\"display:inline-block;width:40px;padding-left:15px;\"> : </span>" + transaction.newbalance + "</strong></p> </div>\n                           \n      <p style=\"text-align:center;margin-top:5px;font-size:13px;\"><strong>Thank you for choosing Banka Bank plc</strong></p>\n        </div>"
      };
    }
  }]);

  return Email;
}();

exports.default = Email;