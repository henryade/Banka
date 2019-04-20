"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require("../../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe("Create Staff test", function () {
  var endpoint = "/api/v1/users";
  it("should not create staff when there are no parameters", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({}).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
    });
  });

  it("should not create when the email already exist", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      email: "staff5@gmail.com",
      userType: "admin"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("email already exist");
    });
  });

  it("should not create when the first name is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      lastName: "Gone",
      email: "user2@gmail.com",
      userType: "admin"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("first name is required");
    });
  });

  it("should not create when the last name is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "SThird",
      email: "sdf@gmail.com",
      userType: "admin"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("last name is required");
    });
  });

  it("'should not create staff if usertype is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Forth",
      lastName: "Desth",
      email: "user3@gmail.com"

    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("user type is required");
    });
  });

  it("'should create staff when all the parameters are given", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Forth",
      lastName: "Desth",
      email: "staff1@gmail.com",
      userType: "admin"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body.data).to.have.property("token");
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("firstName");
      (0, _chai.expect)(response.body.data).to.have.property("lastName");
      (0, _chai.expect)(response.body.data).to.have.property("email");
    });
  });
  it("'should create staff when all the parameters are given", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Forth",
      lastName: "Desth",
      email: "staff3@gmail.com",
      userType: "staff"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body.data).to.have.property("token");
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("firstName");
      (0, _chai.expect)(response.body.data).to.have.property("lastName");
      (0, _chai.expect)(response.body.data).to.have.property("email");
    });
  });
});

describe("View all accounts by a user test", function () {
  it("should display accounts when there are no parameters", function () {
    _chai2.default.request(_app2.default).get("/api/v1/user/user1@gmail.com/accounts").end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("array");
      (0, _chai.expect)(response.body.data[0]).to.be.an("object");
    });
  });

  it("should not display if the email doesnt exist", function () {
    _chai2.default.request(_app2.default).get("/api/v1/user/user20@gmail.com/accounts").end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Email not found");
    });
  });
});