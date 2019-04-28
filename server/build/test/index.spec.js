"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

require("./routes/index.spec");

require("./routes/user.spec");

require("./routes/account.spec");

require("./routes/transaction.spec");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

describe("Other Route test", function () {
  it("should be able to see a home route", function (done) {
    _chai2.default.request(_app2.default).get("/").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(200);
      (0, _chai.expect)(response.text).to.equal("Home Page");
    });
    done();
  });
  it("should be throw flag on a wrong route", function (done) {
    _chai2.default.request(_app2.default).get("/api/v3/reqee").end(function (err, response) {
      (0, _chai.expect)(response).have.a.status(404);
      (0, _chai.expect)(response.text).to.include("Page Not Found");
    });
    done();
  });
});