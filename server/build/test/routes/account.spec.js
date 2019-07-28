"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } }
    newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

var activeAccount = "9000134322";
var dormantAccount = 9000134354;
var wrongAccount = 900013432;
var wrongAccount2 = 9000134392;
var wrongAccount1 = 900013439201;
var token = null;
var token2 = null;
before(function() {
  token = _jsonwebtoken["default"].sign({
    email: "staff5@gmail.com",
    password: "staff0001",
    type: "staff",
    isAdmin: false
  }, process.env.JWT_KEY);
  token2 = _jsonwebtoken["default"].sign({
    email: "user5@gmail.com",
    password: "password",
    type: "client",
    isAdmin: false
  }, process.env.JWT_KEY);
});
describe("View all bank account test", function() {
  it("should return all accounts in the database", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts").set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("array");
      (0, _chai.expect)(response.body.data[0]).to.be.an("object");
    });

    done();
  });
  it("should not return all accounts in the database if the user is unauthorised", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts").set("authorization", "Bearer ".concat(token2)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(403);
      (0, _chai.expect)(response.body.message).to.equal("Not Authorized To Access this Site");
    });

    done();
  });
});
describe("View all bank account query test", function() {
  it("should return all active accounts in the database", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts?status=active").set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(200); // expect(response.body.data).to.be.an("array");
      // expect(response.body.data[0]).to.be.an("object");
      // expect(response.body.data[0].status).to.equal("active");
    });

    done();
  });
  it("should return all dormant accounts in the database", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts?status=dormant").set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("array");
      (0, _chai.expect)(response.body.data[0]).to.be.an("object");
    });

    done();
  });
  it("should throw error", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts?status=acive").set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Invalid status");
    });

    done();
  });
  it("should throw error", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts?id=active").set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("id is not allowed");
    });

    done();
  });
});
describe("View specific bank account test", function() {
  it("should return a specific account in the database", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts/".concat(activeAccount)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("object");
      (0, _chai.expect)(response.body.data).to.have.property("accountNumber");
      (0, _chai.expect)(response.body.data).to.have.property("email");
      (0, _chai.expect)(response.body.data).to.have.property("type");
      (0, _chai.expect)(response.body.data).to.have.property("status");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
      (0, _chai.expect)(response.body.data).to.have.property("balance");
    });

    done();
  });
  it("should throw an error if the account isnt in the database", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts/".concat(wrongAccount)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Account Not Found");
    });

    done();
  });
  it("should throw an error if the account isnt in the database", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts/".concat(wrongAccount2)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Account Not Found");
    });

    done();
  });
  it("should throw an error if the account isnt in the database", function(done) {
    _chai["default"].request(_app["default"]).get("/api/v1/accounts/".concat(wrongAccount1)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Account Not Found");
    });

    done();
  });
});
describe("Create Account test", function() {
  var endpoint = "/api/v1/accounts";
  it("should not create a user when there are no parameters", function(done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token2)).send({}).end(function(err, response) {
      (0, _chai.expect)(response).have.a.status(400);
    });

    done();
  });
  it("should not create a user account if the email is missing", function(done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token2)).send({
      type: "Savings",
      openingBalance: 400000.34
    }).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("email is required");
    });

    done();
  });
  it("should not create a user account if the account type is missing", function(done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token2)).send({
      email: "user1@gmail.com",
      openingBalance: 400000.34
    }).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("type is required");
    });

    done();
  });
  it("should not create a user account if the opening balance is missing", function(done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token2)).send({
      email: "user1@gmail.com",
      type: "Savings"
    }).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("opening balance is required");
    });

    done();
  });
  it("should not create accounts if email is invalid", function(done) {
    var payload = {
      email: "hyrgms.com",
      openingBalance: 400040.34,
      type: "Current"
    };

    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token2)).send(payload).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid email");
    });

    done();
  });
  it("should create a user account if all credentials are given", function(done) {
    var payload = {
      openingBalance: 400040.34,
      email: "clasiqaas@gmail.com",
      type: "savings"
    };

    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token2)).send(payload).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body).to.be.an("object");
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body.data).to.be.a("object");
      (0, _chai.expect)(response.body.data).to.have.property("accountNumber");
      (0, _chai.expect)(response.body.data).to.have.property("owner");
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("status");
      (0, _chai.expect)(response.body.data).to.have.property("createdOn");
    });

    done();
  });
  it("should not create a user account if wrong token is given", function(done) {
    var payload = {
      openingBalance: 400040.34,
      email: "user5@gmail.com",
      type: "Savings"
    };

    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token)).send(payload).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(403);
      (0, _chai.expect)(response.body.message).to.equal("Not Authorized To Access this Site");
    });

    done();
  });
  it("should not create a user account if bad token is given", function(done) {
    var payload = {
      openingBalance: 400040.34,
      email: "user5@gmail.com",
      type: "Savings"
    };

    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer rtcyvubm76546t789k09u544").send(payload).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(401);
      (0, _chai.expect)(response.body.message).to.equal("Not Authorized");
    });

    done();
  });
  it("should not create a user account if bad token is given", function(done) {
    var payload = {
      openingBalance: 400040.34,
      email: "user5@gmail.com",
      type: "Savings"
    };

    _chai["default"].request(_app["default"]).post(endpoint).send(payload).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(407);
      (0, _chai.expect)(response.body.message).to.equal("Missing Authorization");
    });

    done();
  });
});
describe("Activate account test", function() {
  it("should activate an user account if account is dormant", function(done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(dormantAccount)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data.status).to.equal("active");
    });

    done();
  });
  it("should not activate if account number is invalid", function(done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(wrongAccount)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });

    done();
  });
  it("should not activate if account number is invalid", function(done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(wrongAccount2)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Account Not Found");
    });

    done();
  });
});
describe("Deactivate account test", function() {
  it("should deactivate a user account if account is active", function(done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(activeAccount)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data.status).to.equal("dormant");
    });
    done();
  });
  it("should not deactivate if account number is invalid", function(done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(wrongAccount)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });

    done();
  });
  it("should not deactivate if account number is invalid", function(done) {
    _chai["default"].request(_app["default"]).patch("/api/v1/accounts/".concat(wrongAccount2)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Account Not Found");
    });

    done();
  });
});
describe("Delete account test", function() {
  it("should do nothing if user account is not found", function(done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/accounts/".concat(wrongAccount)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid account number");
    });

    done();
  });
  it("should delete a user account if account is found", function(done) {
    _chai["default"].request(_app["default"])["delete"]("/api/v1/accounts/".concat(dormantAccount)).set("authorization", "Bearer ".concat(token)).end(function(err, response) {
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.message).to.equal("Account Successfully Delete");
    });

    done();
  });
});
