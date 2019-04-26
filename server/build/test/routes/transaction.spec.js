"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _app = require("../../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var testAccountNumber1 = 9000134322;
var wrongAccountNumber = 8000134354;
var testAccountNumber2 = 9000134354;
var testAccountNumber = 9000134302;

var token = null;
var token2 = null;

before(function () {
  token = _jsonwebtoken2.default.sign({
    id: 1,
    email: "staff5@gmail.com",
    password: "staff0001",
    type: "staff",
    isAdmin: false
  }, process.env.JWT_KEY);

  token2 = _jsonwebtoken2.default.sign({
    email: "user5@gmail.com",
    password: "password",
    type: "client",
    isAdmin: false
  }, process.env.JWT_KEY);
});

describe("View all account transaction test", function () {
  it("should display all transaction if account number is valid", function (done) {
    _chai2.default.request(_app2.default).get("/api/v1/accounts/" + testAccountNumber1 + "/transactions").set("authorization", "Bearer " + token2).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("array");
      (0, _chai.expect)(response.body.data[0]).to.be.an("object");
      (0, _chai.expect)(response.body.data[0]).to.have.property("id");
      (0, _chai.expect)(response.body.data[0]).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data[0]).to.have.property("type");
      (0, _chai.expect)(response.body.data[0]).to.have.property("accountNumber");
      (0, _chai.expect)(response.body.data[0]).to.have.property("amount");
      (0, _chai.expect)(response.body.data[0]).to.have.property("oldbalance");
      (0, _chai.expect)(response.body.data[0]).to.have.property("newbalance");
    });
    done();
  });

  it("should not display any transaction if account number is invalid", function (done) {
    _chai2.default.request(_app2.default).get("/api/v1/accounts/" + wrongAccountNumber + "/transactions").set("authorization", "Bearer " + token2).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid Account Number");
    });
    done();
  });
});

describe("View specific transaction test", function () {
  it("should display a transaction if id is valid", function (done) {
    _chai2.default.request(_app2.default).get("/api/v1/transactions/1").set("authorization", "Bearer " + token2).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data).to.have.property("type");
      (0, _chai.expect)(response.body.data).to.have.property("accountNumber");
      (0, _chai.expect)(response.body.data).to.have.property("amount");
      (0, _chai.expect)(response.body.data).to.have.property("oldbalance");
      (0, _chai.expect)(response.body.data).to.have.property("newbalance");
    });
    done();
  });

  it("should not display a transaction if id is invalid", function (done) {
    _chai2.default.request(_app2.default).get("/api/v1/transactions/87").set("authorization", "Bearer " + token2).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Invalid Transaction Id");
    });
    done();
  });
});

describe("Debit Account test", function () {
  it("should not debit account if there are no parameters", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber1 + "/debit").set("authorization", "Bearer " + token).send({}).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
    });
    done();
  });

  it("should debit a user when the parameters are correct", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/9000134302/debit").set("authorization", "Bearer " + token).send({
      amount: 50000,
      depositor: "Hail",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data).to.have.property("type");
      (0, _chai.expect)(response.body.data).to.have.property("cashier");
    });
    done();
  });

  it("should not debit a user if the account number invalid", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + wrongAccountNumber + "/debit").set("authorization", "Bearer " + token).send({
      amount: 70000,
      depositor: "Name",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid Account Number");
    });
    done();
  });

  it("should not debit a user if the account status is dormant", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/9000134322/debit").set("authorization", "Bearer " + token).send({
      amount: 70000,
      depositor: "Name",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Account is Inactive");
    });
    done();
  });

  it("should not debit if a user types a wrong amount format  ", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/debit").set("authorization", "Bearer " + token).send({
      amount: "k00yu00",
      depositor: "Name",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid amount");
    });
    done();
  });

  it("should not debit if a user types a wrong phone number format  ", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/debit").set("authorization", "Bearer " + token).send({
      amount: 40000,
      depositor: "Name",
      depositorPhoneNumber: "08064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("depositor phone number has invalid parameters");
    });
    done();
  });

  it("should not debit a user if the account balance is lower than the amount to be debited", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber + "/debit").set("authorization", "Bearer " + token).send({
      amount: 7000000,
      depositor: "Nme",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Low Funds. Account cant be Debited");
    });
    done();
  });
});

describe("Credit Account test", function () {
  it("should not credit account if there are no parameters", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/credit").set("authorization", "Bearer " + token).send({}).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
    });
    done();
  });

  it("should credit a user when the parameters are correct", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/9000134394/credit").set("authorization", "Bearer " + token).send({
      amount: 600000,
      depositor: "Ben",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data).to.have.property("type");
      (0, _chai.expect)(response.body.data).to.have.property("cashier");
    });
    done();
  });

  it("should not credit if a user types a wrong amount format  ", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber2 + "/credit").set("authorization", "Bearer " + token).send({
      amount: "k00yu00",
      depositor: "Name",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid amount");
    });
    done();
  });

  it("should not credit a user if the account status is dormant", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + testAccountNumber1 + "/credit").set("authorization", "Bearer " + token).send({
      amount: 70000,
      depositor: "Name",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Account is Inactive");
    });
    done();
  });

  it("should not credit a user if the account number is invalid", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + wrongAccountNumber + "/credit").set("authorization", "Bearer " + token).send({
      amount: 700,
      depositor: "Simon",
      depositorPhoneNumber: "2348064372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid Account Number");
    });
    done();
  });

  it("should not credit a user if the phone number is invalid", function (done) {
    _chai2.default.request(_app2.default).post("/api/v1/transactions/" + wrongAccountNumber + "/credit").set("authorization", "Bearer " + token).send({
      amount: 700,
      depositor: "Simon",
      depositorPhoneNumber: "23480640372423"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("depositor phone number contains incorrect parameters");
    });
    done();
  });
});