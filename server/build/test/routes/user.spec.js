"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].use(_chaiHttp["default"]);

var token = null;
var token1 = null;
var token2 = null;
var token3 = null;
var token4 = null;
before(function () {
  token = _jsonwebtoken["default"].sign({
    email: "staff5@gmail.com",
    password: "staff0001"
  }, process.env.JWT_KEY);
  token1 = _jsonwebtoken["default"].sign({
    email: "user20@gmail.com",
    password: "password",
    type: "client",
    isAdmin: false
  }, process.env.JWT_KEY);
  token3 = _jsonwebtoken["default"].sign({
    email: "user20gmail.com",
    password: "password",
    type: "client",
    isAdmin: false
  }, process.env.JWT_KEY);
  token2 = _jsonwebtoken["default"].sign({
    email: "user5@gmail.com",
    password: "password",
    type: "client",
    isAdmin: false
  }, process.env.JWT_KEY);
  token4 = _jsonwebtoken["default"].sign({
    email: "admin3@gmail.com",
    password: "staff0001",
    type: "staff",
    isAdmin: true
  }, process.env.JWT_KEY);
});
describe("Create Staff test", function () {
  var endpoint = "/api/v1/users";
  it("should not create staff when there are no parameters", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token4)).send({}).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
    });

    done();
  });
  it("should not create when the email already exist", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token4)).send({
      firstName: "Second",
      lastName: "Nme",
      email: "staff5@gmail.com",
      userType: "admin"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("email already exist");
    });

    done();
  });
  it("should not create when the first name is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token4)).send({
      lastName: "Gone",
      email: "user2@gmail.com",
      userType: "admin"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("first name is required");
    });

    done();
  });
  it("should not create when the last name is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token4)).send({
      firstName: "SThird",
      email: "sdf@gmail.com",
      userType: "admin"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("last name is required");
    });

    done();
  });
  it("'should not create staff if usertype is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token4)).send({
      firstName: "Forth",
      lastName: "Desth",
      email: "user3@gmail.com"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.body.error).to.equal("user type is required");
    });

    done();
  });
  it("'should create staff when all the parameters are given", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token4)).send({
      firstName: "Forth",
      lastName: "Dedth",
      email: "staff002@gmail.com",
      userType: "admin"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("firstName");
      (0, _chai.expect)(response.body.data).to.have.property("lastName");
      (0, _chai.expect)(response.body.data).to.have.property("email");
    });

    done();
  });
  it("'should create staff when all the parameters are given", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).set("authorization", "Bearer ".concat(token4)).send({
      firstName: "Forth",
      lastName: "Desth",
      email: "staff30@gmail.com",
      userType: "staff"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body.data).to.have.property("id");
      (0, _chai.expect)(response.body.data).to.have.property("firstName");
      (0, _chai.expect)(response.body.data).to.have.property("lastName");
      (0, _chai.expect)(response.body.data).to.have.property("email");
    });

    done();
  });
});
describe("View all accounts by a user test", function () {
  it("should display accounts when there are no parameters", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/user/user5@gmail.com/accounts").set("authorization", "Bearer ".concat(token2)).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.body.data).to.be.an("array");
      (0, _chai.expect)(response.body.data[0]).to.be.an("object");
    });

    done();
  });
  it("should not display if the email doesnt exist", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/user/user20@gmail.com/accounts").set("authorization", "Bearer ".concat(token2)).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(403);
      (0, _chai.expect)(response.body.message).to.equal("UnAuthorized User");
    });

    done();
  });
  it("should not display if the email doesnt exist", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/user/user20@gmail.com/accounts").set("authorization", "Bearer ".concat(token1)).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(404);
      (0, _chai.expect)(response.body.error).to.equal("Email not found");
    });

    done();
  });
  it("should not display if the email doesnt exist", function (done) {
    _chai["default"].request(_app["default"]).get("/api/v1/user/user20gmail.com/accounts").set("authorization", "Bearer ".concat(token3)).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("Invalid email");
    });

    done();
  });
});