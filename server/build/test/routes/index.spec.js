"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_chai["default"].use(_chaiHttp["default"]);

describe("Sign in test", function () {
  var endpoint = "/api/v1/auth/signin";
  it("should not login a user when there are no parameters", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({}).end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(400);
    });

    done();
  });
  it("should not login a user when the email is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("email is required");
    });

    done();
  });
  it("should not login a user when the password is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      email: "user5@gmail.com"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("password is required");
    });

    done();
  });
  it("'should login a user when all the parameters are given", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      email: "user5@gmail.com",
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.body).to.have.property("data");
    });

    done();
  });
  it("should not login a user with wrong credentials", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      email: "user1@gmail.com",
      password: "password",
      name: "fdkjnjn"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("name is not allowed");
    });

    done();
  });
  it("should not login a user with wrong credentials-email", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      email: "use@gmail.com",
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(401);
      (0, _chai.expect)(response.body.error).to.equal("Incorrect email or password");
    });

    done();
  });
  it("should not be able to login with wrong credentials-password", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      email: "user5@gmail.com",
      password: "pasword"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(401);
      (0, _chai.expect)(response.body.error).to.equal("Incorrect email or password");
    });

    done();
  });
  it("should generate token", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      email: "user5@gmail.com",
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.body.data).to.have.property("token");
    });

    done();
  });
  it("should signin staff", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      email: "staff5@gmail.com",
      password: "staff0001"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.body.data).to.have.property("token");
    });

    done();
  });
});
describe("Sign up test", function () {
  var endpoint = "/api/v1/auth/signup";
  it("should not signup a user when there are no parameters", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({}).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
    });

    done();
  });
  it("should not register a user when the email is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "Second",
      lastName: "Name",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("email is required");
    });

    done();
  });
  it("should not register a user when the email already exist", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "Second",
      lastName: "Nme",
      email: "user5@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.equal("email already exist");
    });

    done();
  });
  it("should not register a user when the password is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "Second",
      lastName: "BAse",
      email: "user2@gmail.com",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("password is required");
    });

    done();
  });
  it("should not register a user when the first name is invalid", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "SThdfghdbjdkhbfjdhsjhbsjhvsbjhbvdjslshbjkdhbskhbvdkjbvfdhbjdird",
      lastName: "Gone",
      email: "user2@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("Invalid first name");
    });

    done();
  });
  it("should not register a user when the last name is invalid", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "SThird",
      lastName: "iS",
      email: "sdf@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("Invalid last name");
    });

    done();
  });
  it("should not register a user when the first name is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      lastName: "Gone",
      email: "user2@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("first name is required");
    });

    done();
  });
  it("should not register a user when the last name is missing", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "SThird",
      email: "sdf@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("last name is required");
    });

    done();
  });
  it("should not register a user when the the passwords dont match", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "Second",
      lastName: "Game",
      email: "user2@gmail.com",
      password: "password",
      confirmPassword: "pasword"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.body.error).to.include("confirm password does not match expected value");
    });

    done();
  });
  it("should not register a user when the confirm password is not given", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "Fourth",
      lastName: "wskjf",
      email: "user3@gmail.com",
      password: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).have.a.status(400);
      (0, _chai.expect)(response.text).to.include("confirm password is required");
    });

    done();
  });
  it("'should register a new user when all the parameters are given", function (done) {
    _chai["default"].request(_app["default"]).post(endpoint).send({
      firstName: "Forth",
      lastName: "Desth",
      email: "user90@gmail.com",
      password: "password",
      confirmPassword: "password"
    }).end(function (error, response) {
      (0, _chai.expect)(response).to.have.status(201);
      (0, _chai.expect)(response.body.data).to.have.property("id");
    });

    done();
  });
});