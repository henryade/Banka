"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require("../../app");

var _app2 = _interopRequireDefault(_app);

var _dbController = require("../../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var testAccountNumber1 = 9000134322;
var wrongAccountNumber = 8000134354;
var testAccountNumber2 = 9000134354;
var Account = _dbController2.default.findTransactionByAccountNumber(testAccountNumber1);

describe("Debit Account test", function () {
  it("should not debit account if there are no parameters", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber1 + "/debit").send({}).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
    });
  });

  it("should debit a user when the parameters are correct", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/debit").send({
      amount: 50000.00,
      depositor: "Hail",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(Account.newBalance).to.be.above(response.body.data.newBalance);
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data).to.have.property("type");
      //   expect(response.body.data).to.have.property("cashier");
    });
  });

  it("should not debit a user if the account number invalid", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + wrongAccountNumber + "/debit").send({
      amount: 70000,
      depositor: "Name",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid Account Number");
    });
  });

  it("should not debit a user if the account status is dormant", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/9000134322/debit").send({
      amount: 70000,
      depositor: "Name",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Account is Inactive");
    });
  });

  it("should not debit if a user types a wrong amount format  ", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/debit").send({
      amount: "k00yu00",
      depositor: "Name",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Amount is Invalid");
    });
  });

  it("should not debit a user if the account balance is lower than the amount to be debited", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/debit").send({
      amount: 700000,
      depositor: "Nme",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Low Funds. Account cant be Debited");
    });
  });
});

describe("Credit Account test", function () {
  it("should not credit account if there are no parameters", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/credit").send({}).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
    });
  });

  it("should credit a user when the parameters are correct", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/credit").send({
      amount: 600000,
      depositor: "Ben",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(200);
      //expect(Account.oldBalance).to.be.below(response.body.data.balance);
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data).to.have.property("type");
      // (body.data.cashier).to.have.property("status");
    });
  });

  it("should not debit if a user types a wrong amount format  ", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/credit").send({
      amount: "k00yu00",
      depositor: "Name",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Amount is Invalid");
    });
  });

  it("should not debit a user if the account status is dormant", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber1 + "/credit").send({
      amount: 70000,
      depositor: "Name",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Account is Inactive");
    });
  });

  it("should not credit a user if the account number is invalid", function () {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + wrongAccountNumber + "/credit").send({
      amount: 700,
      depositor: "Simon",
      phoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid Account Number");
    });
  });
});