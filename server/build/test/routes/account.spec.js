"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require("../../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var activeAccount = "9000134322";
var dormantAccount = 9000134354;
var wrongAccount = 900013432;
var wrongAccount2 = 9000134392;
var wrongAccount1 = 900013439201;

describe("View all bank account test", function () {
  it("should return all accounts in the database", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts").end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("array");
      (0, _chai.expect)(response.body.data[0]).to.be.an("object");
    });
  });
});

describe("View all bank account query test", function () {
  it("should return all active accounts in the database", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts?status=active").end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("array");
      (0, _chai.expect)(response.body.data[0]).to.be.an("object");
      (0, _chai.expect)(response.body.data[0].status).to.equal("active");
    });
  });

  it("should return all dormant accounts in the database", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts?status=dormant").end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("array");
      (0, _chai.expect)(response.body.data[0]).to.be.an("object");
    });
  });

  it("should throw error", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts?status=acive").end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Invalid status");
    });
  });

  it("should throw error", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts?id=active").end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("id is not allowed");
    });
  });
});

describe("View specific bank account test", function () {
  it("should return a specific account in the database", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts/" + activeAccount).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("object");
      (0, _chai.expect)(response.body.data).to.have.property("accountNumber");
      (0, _chai.expect)(response.body.data).to.have.property("email");
      (0, _chai.expect)(response.body.data).to.have.property("type");
      (0, _chai.expect)(response.body.data).to.have.property("status");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data).to.have.property("balance");
    });
  });

  it("should throw an error if the account isnt in the database", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts/" + wrongAccount).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });
  });

  it("should throw an error if the account isnt in the database", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts/" + wrongAccount2).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });
  });

  it("should throw an error if the account isnt in the database", function () {
    _chai2.default.request(_app2.default).get("/api/v1/accounts/" + wrongAccount1).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });
  });
});

describe("Create Account test", function () {
  var endpoint = "/api/v1/accounts";
  it("should not create a user when there are no parameters", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({}).end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(400);
    });
  });

  it("should not create a user account if the email is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings",
      openingBalance: 400000.34
    }).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("email is required");
    });
  });

  it("should not create a user account if the phone number is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings",
      openingBalance: 400000.34
    }).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("phone number is required");
    });
  });

  it("should not create a user account if the first name is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      lastName: "Nme",
      email: "user1@gmail.com",
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings",
      openingBalance: 400000.34
    }).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("first name is required");
    });
  });

  it("should not create a user account if the last name is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      email: "user1@gmail.com",
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings",
      openingBalance: 400000.34
    }).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("last name is required");
    });
  });

  it("should not create a user account if the date of birth is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      phoneNumber: "2348064372423",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings",
      openingBalance: 400000.34
    }).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("date of birth is required");
    });
  });

  it("should not create a user account if the address is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      type: "Savings",
      openingBalance: 400000.34
    }).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("address is required");
    });
  });

  it("should not create a user account if the account type is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      openingBalance: 400000.34
    }).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("type is required");
    });
  });

  it("should not create a user account if the opening balance is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings"
    }).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("opening balance is required");
    });
  });
  it("should create a user account if all credentials are given", function () {
    var payload = {
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      openingBalance: 400040.34,
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings"
    };
    _chai2.default.request(_app2.default).post(endpoint).send(payload).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("gender is required");
    });
  });

  it("should not create accounts if gender is empty", function () {
    var payload = {
      firstName: "Second",
      lastName: "Nme",
      email: "uebek@jntgrj.com",
      openingBalance: 40000040.34,
      phoneNumber: "2348067870423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Current",
      gender: ""
    };
    _chai2.default.request(_app2.default).post(endpoint).send(payload).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid opening balance");
    });
  });

  it("should not create accounts if gender is empty", function () {
    var payload = {
      firstName: "Second",
      lastName: "Nme",
      email: "uebek@jntgrj.com",
      openingBalance: 400040.34,
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Current",
      gender: ""
    };
    _chai2.default.request(_app2.default).post(endpoint).send(payload).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("gender should not be empty");
    });
  });

  it("should not create accounts if email is invalid", function () {
    var payload = {
      firstName: "Second",
      lastName: "Nme",
      email: "hyrgms.com",
      openingBalance: 400040.34,
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Current",
      gender: "M"
    };
    _chai2.default.request(_app2.default).post(endpoint).send(payload).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid email");
    });
  });

  it("should not create accounts with same type", function () {
    var payload = {
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      openingBalance: 400040.34,
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Current",
      gender: "M"
    };
    _chai2.default.request(_app2.default).post(endpoint).send(payload).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Account Exists");
    });
  });
  it("should create a user account if all credentials are given", function () {
    var payload = {
      firstName: "Second",
      lastName: "Nme",
      email: "user1@gmail.com",
      openingBalance: 400040.34,
      phoneNumber: "2348064372423",
      dob: "1991-05-12",
      address: "11 Banka str., Andela, Lagos, Nigeria",
      type: "Savings",
      gender: "M"
    };
    _chai2.default.request(_app2.default).post(endpoint).send(payload).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body).to.be.an("object");
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body.data).to.be.a("object");
      (0, _chai.expect)(response.body.data).to.have.property("accountNumber");
      (0, _chai.expect)(response.body.data).to.have.property("owner");
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("status");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data).to.have.property("gender");
    });
  });
});

describe("Activate account test", function () {
  it("should activate an user account if account is dormant", function () {
    _chai2.default.request(_app2.default).patch("/api/v1/accounts/" + dormantAccount).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data.status).to.equal("active");
    });
  });

  it("should not activate if account number is invalid", function () {
    _chai2.default.request(_app2.default).patch("/api/v1/accounts/" + wrongAccount).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });
  });

  it("should not activate if account number is invalid", function () {
    _chai2.default.request(_app2.default).patch("/api/v1/accounts/" + wrongAccount2).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });
  });
});

describe("Deactivate account test", function () {
  it("should deactivate a user account if account is active", function () {
    _chai2.default.request(_app2.default).patch("/api/v1/accounts/" + activeAccount).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data.status).to.equal("dormant");
    });
  });

  it("should not deactivate if account number is invalid", function () {
    _chai2.default.request(_app2.default).patch("/api/v1/accounts/" + wrongAccount).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });
  });

  it("should not deactivate if account number is invalid", function () {
    _chai2.default.request(_app2.default).patch("/api/v1/accounts/" + wrongAccount2).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });
  });
});

describe("Delete account test", function () {
  it("should do nothing if user account is not found", function () {
    _chai2.default.request(_app2.default).delete("/api/v1/accounts/" + wrongAccount).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });
  });

  it("should delete a user account if account is found", function () {
    _chai2.default.request(_app2.default).delete("/api/v1/accounts/" + dormantAccount).end(function (err, response) {
      (0, _chai.expect)(response).to.have.status(200);

      (0, _chai.expect)(response.body.message).to.equal("Account Successfully Delete");
    });
  });
});