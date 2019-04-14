"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _dbController = require("../controllers/dbController");

var _dbController2 = _interopRequireDefault(_dbController);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

var _authorization = require("../middleware/authorization");

var _authorization2 = _interopRequireDefault(_authorization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe("Other Route test", function () {
  it("should be able to see a home route", function () {
    _chai2.default.request(_app2.default).get("/").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.text).to.equal("Home Page");
    });
  });
  it("should be able to see a home route", function () {
    _chai2.default.request(_app2.default).get("/*").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.text).to.equal("Banka - Invalid Route ");
    });
  });
  it("should be able to see a home route", function () {
    _chai2.default.request(_app2.default).post("/*").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.text).to.equal("Banka - Invalid Route ");
    });
  });
  it("should be able to see a home route", function () {
    _chai2.default.request(_app2.default).put("/*").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.text).to.equal("Banka - Invalid Route ");
    });
  });
  it("should be able to see a home route", function () {
    _chai2.default.request(_app2.default).patch("/*").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.text).to.equal("Banka - Invalid Route ");
    });
  });
  it("should be able to see a home route", function () {
    _chai2.default.request(_app2.default).delete("/*").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.text).to.equal("Banka - Invalid Route ");
    });
  });
});