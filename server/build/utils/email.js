"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Email =
/*#__PURE__*/
function () {
  function Email() {
    _classCallCheck(this, Email);
  }

  _createClass(Email, null, [{
    key: "transport",
    value: function transport() {
      return _nodemailer["default"].createTransport({
        service: "Gmail",
        auth: {
          user: process.env.OfficialBankaEmail,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      });
    }
  }, {
    key: "sendMail",
    value: function sendMail(mail) {
      return Email.transport().sendMail(mail, function (err) {
        if (err) {
          return err;
        }

        return "Success";
      });
    }
  }, {
    key: "staffSignUp",
    value: function staffSignUp(name, email, password) {
      return {
        from: "noreply@banka.com",
        to: email,
        subject: "New Banka Account",
        html: "<div style=\"font-family:georgia\">\n      <h1 style=\"background-color:#172A3A;color:white;padding-left:20px;border-radius:5% 90% 90% 5%;font-family:Comic Sans MS;\">Banka </h1>\n      <p style=\"padding-bottom:10px;padding-left:5px;\">Dear ".concat(name, ",</p> \n        <p style=\"padding-left:15px;\">Banka electronic Notification Service (BeNS)\n        We wish to inform you that ypur account has been created with us.</p>\n      \n        <p style=\"padding-left:15px;\">The details of this account are shown below:</p>\n        <p style=\"padding-left:40px;\"><strong>Email Address <span style=\"display:inline-block;width:40px;padding-left:20px;\"> : </span>").concat(email, "</strong></p>\n        <p style=\"padding-left:40px;\"><strong>Password <span style=\"display:inline-block;width:40px;padding-left:60px;\"> : </span>").concat(password, "</strong></p> </div>\n        <p style=\"padding-left:15px;\">Click <a href=\"https://henryade.github.io/Banka/\">here</a> to sign into your account.</p>")
      };
    }
  }, {
    key: "message",
    value: function message(transaction) {
      return {
        from: "noreply@banka.com",
        to: transaction.email,
        subject: "Transaction Alert",
        html: "<div style=\"font-family:georgia\">\n      <h1 style=\"background-color:#172A3A;color:white;padding-left:20px;border-radius:5% 90% 90% 5%;font-family:Comic Sans MS;\">Banka </h1>\n      <p style=\"padding-bottom:10px;padding-left:5px;\">Dear ".concat(transaction.name, ",</p> \n                          <p style=\"padding-left:15px;\">Banka electronic Notification Service (BeNS)\n                          We wish to inform you that a  transaction occurred on your account with us.</p>\n      \n                          <p style=\"padding-left:15px;\">The details of this transaction are shown below:</p>\n                          <p><strong style=\"padding-left:20px;\">Transaction Notification</strong></p>\n                          <div style=\"font-family:Verdana;\">\n          \n       <table style=\"border-collapse:collapse;font-size:14px;margin-left:30px\">\n         <tbody>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Account Number</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\">").concat(transaction.accountNumber, "</td>\n           </tr>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Transaction Location</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\">Banka, Lagos</td>\n           </tr>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Type</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;text-transform:capitalise;\">").concat(transaction.type, "</td>\n           </tr>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Amount</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\">").concat(transaction.amount, "</td>\n           </tr>\n           <tr>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\"><strong>Date</strong></td>\n             <td style=\"border:2px solid black;padding:10px;text-align:center;\">20-Mar-2019</td>\n           </tr>\n         </tbody>\n                            </table>                     \n                          </div>\n        <div style=\"background-color:#F5DEB3;border-top:1px solid black;margin-top:15px;padding-bottom:5px;\">\n          <p style=\"padding-left:20px;\"><strong>Old Balance <span style=\"display:inline-block;width:40px;padding-left:20px;\"> : </span>").concat(transaction.oldbalance, "</strong></p>\n          <p style=\"padding-left:20px;\"><strong>New Balance <span style=\"display:inline-block;width:40px;padding-left:15px;\"> : </span>").concat(transaction.newbalance, "</strong></p> </div>\n                           \n      <p style=\"text-align:center;margin-top:5px;font-size:13px;\"><strong>Thank you for choosing Banka Bank plc</strong></p>\n        </div>")
      };
    }
  }, {
    key: "resetPassword",
    value: function resetPassword(token, name, email, link, hlink) {
      var redirectLink = "http://localhost:3000/api/v1/auth/passwordreset/".concat(token, "/forgot?").concat(link === "second" ? "site=2" : "");
      var homeLink = hlink || "https://henryade.github.io/Banka/";
      return {
        from: "noreply@banka.com",
        to: email,
        subject: "Reset Your Password",
        html: "<div class=\"container\" style=\"width: 45%; margin: 10px auto; background: radial-gradient(circle, rgb(0, 255, 158) 50%, rgb(29, 90, 178) 100%);border-radius: 5px; padding:0 50px; color:#1d5ab2;\">\n      <div style=\"font-family:georgia; color:#1d5ab2;font-weight: 600;\">\n          <h1 style=\"font-family:Comic Sans MS; text-align:center;\"><a href=".concat(homeLink, " onMouseOut={this.style.color='#1d5ab2'} onMouseOver={this.style.color='#ffab57'}>Banka</a> </h1>\n          <p style=\"padding-bottom:10px;color:#ffbf80;\">Dear <span style=\"color:#fff;\">").concat(name, ",</span> </p> \n          <p>Banka electronic Notification Service (BeNS).</p>\n          <p>We got a request to reset your Banka password. This link expires in one(1) hour. Find below the password reset link:</p>\n          <p style=\"text-align:center;\"><a href=").concat(redirectLink, " onMouseOut={this.style.color='#1d5ab2'} onMouseOver={this.style.color='#ffab57'}>Reset Password</a></p>\n          <p>If you ignore this message, your password will not be changed and you can click the link below to access the app</p>\n      </div>\n      <p style=\"text-align:center;margin-top:50px\">Click <a onMouseOut={this.style.color='#1d5ab2'} onMouseOver={this.style.color='#ffab57'} href=").concat(homeLink, ">here</a> to sign into your account.</p>\n      <p style=\"text-align:center;font-weight:bolder;\">&copy; Banka</p>\n    <style scoped>\n    @media screen and (max-width: 650px) {\n      .container {\n        width: 75% !important;\n      }\n    }\n    @media screen and (max-width: 400px) {\n      .container {\n        width: 95%! important;\n      }\n    }\n    </style>\n    </div>")
      };
    }
  }]);

  return Email;
}();

var _default = Email;
exports["default"] = _default;