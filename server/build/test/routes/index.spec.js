"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _dbController = require("../../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

var _app = require("../../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

// eslint-disable-next-line no-global-assign


describe("Sign in test", function () {
  var endpoint = "/api/v1/auth/signin";
  it("should not login a user when there are no parameters", function () {
    _chai2.default.request(_app2.default).post(endpoint).set("authorization", "Bearer " + _dbController2.default.findOneUser("email", "user5@gmail.com").token).send({}).end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(400);
    });
  });

  it("should not login a user when the email is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).set("authorization", "Bearer " + _dbController2.default.findOneUser("email", "user5@gmail.com").token).send({
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("email is required");
    });
  });

  it("should not login a user when the password is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).set("authorization", "Bearer " + _dbController2.default.findOneUser("email", "user5@gmail.com").token).send({
      email: "user5@gmail.com"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("password is required");
    });
  });

  it("'should login a user when all the parameters are given", function () {
    _chai2.default.request(_app2.default).post(endpoint).set("authorization", "Bearer " + _dbController2.default.findOneUser("email", "user5@gmail.com").token).send({
      email: "user5@gmail.com",
      password: "password"
    }).end(function (error, response) {

      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.body).to.have.property("data");
    });
  });
  it("should not login a user with wrong credentials-email", function () {
    _chai2.default.request(_app2.default).post(endpoint).set("authorization", "Bearer " + _dbController2.default.findOneUser("email", "user5@gmail.com").token).send({
      email: "use@gmail.com",
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(401);
      (0, _chai.expect)(response.body.error).to.equal("Auth failed");
    });
  });
  it("should not be able to login with wrong credentials-password", function () {
    _chai2.default.request(_app2.default).post(endpoint).set("authorization", "Bearer " + _dbController2.default.findOneUser("email", "user5@gmail.com").token).send({
      email: "user5@gmail.com",
      password: "pasword"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(401);
      (0, _chai.expect)(response.body.error).to.equal("Auth failed");
    });
  });
  it("should generate token", function () {
    _chai2.default.request(_app2.default).post(endpoint).set("authorization", "Bearer " + _dbController2.default.findOneUser("email", "user5@gmail.com").token).send({
      email: "user5@gmail.com",
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.body.data).to.have.property("token");
    });
  });
});

describe("Sign up test", function () {
  var endpoint = "/api/v1/auth/signup";
  it("should not signup a user when there are no parameters", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({}).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
    });
  });

  it("should not register a user when the email is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Name",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("email is required");
    });
  });

  it("should not register a user when the email already exist", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      email: "user5@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("email already exist");
    });
  });

  it("should not register a user when the password is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "BAse",
      email: "user2@gmail.com",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("password is required");
    });
  });

  it("should not register a user when the first name is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      lastName: "Gone",
      email: "user2@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("first name is required");
    });
  });

  it("should not register a user when the last name is missing", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "SThird",
      email: "sdf@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("last name is required");
    });
  });

  it("should not register a user when the the passwords dont match", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Second",
      lastName: "Game",
      email: "user2@gmail.com",
      password: "password",
      confirmPassword: "pasword"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(401);
      (0, _chai.expect)(response.body.error).to.equal("passwords do not match");
    });
  });

  it("should not register a user when the confirm password is not given", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Fourth",
      lastName: "wskjf",
      email: "user3@gmail.com",
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(401);
      (0, _chai.expect)(response.body.error).to.equal("passwords do not match");
    });
  });

  it("'should register a new user when all the parameters are given", function () {
    _chai2.default.request(_app2.default).post(endpoint).send({
      firstName: "Forth",
      lastName: "Desth",
      email: "user3@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body.data).to.have.property("token");
      (0, _chai.expect)(response.body.data).to.have.property("id");
    });
  });
});